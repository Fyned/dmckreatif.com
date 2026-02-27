import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import NeoCard from "@/components/ui/NeoCard";
import NeoBadge from "@/components/ui/NeoBadge";
import NeoButton from "@/components/ui/NeoButton";
import type { Project, ProjectStatus, Profile } from "@/types/database";

type ProjectWithClient = Project & {
  profiles: { name: string; email: string } | null;
};

interface NewProjectForm {
  name: string;
  description: string;
  status: ProjectStatus;
  tier: string;
  client_id: string;
  url: string;
}

const EMPTY_FORM: NewProjectForm = {
  name: "",
  description: "",
  status: "PENDING",
  tier: "Launch",
  client_id: "",
  url: "",
};

const STATUS_OPTIONS: ProjectStatus[] = [
  "PENDING",
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
  "ARCHIVED",
];

const TIER_OPTIONS = ["Launch", "Growth", "Scale", "Commerce"];

const STATUS_COLOR: Record<ProjectStatus, string> = {
  PENDING: "neo-yellow",
  IN_PROGRESS: "neo-blue",
  REVIEW: "neo-purple",
  COMPLETED: "neo-green",
  ARCHIVED: "neo-orange",
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<ProjectWithClient[]>([]);
  const [clients, setClients] = useState<Pick<Profile, "id" | "name" | "email">[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<NewProjectForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  async function fetchProjects() {
    try {
      setLoading(true);
      setError(null);

      const [projectsRes, clientsRes] = await Promise.all([
        supabase
          .from("projects")
          .select("*, profiles!client_id(name, email)")
          .order("created_at", { ascending: false }),
        supabase
          .from("profiles")
          .select("id, name, email")
          .eq("role", "CLIENT")
          .order("name"),
      ]);

      if (projectsRes.error) throw projectsRes.error;
      if (clientsRes.error) throw clientsRes.error;

      setProjects(
        (projectsRes.data as unknown as ProjectWithClient[]) ?? [],
      );
      setClients(
        (clientsRes.data as unknown as Pick<Profile, "id" | "name" | "email">[]) ?? [],
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function handleStatusChange(id: string, status: ProjectStatus) {
    const { error: updateErr } = await supabase
      .from("projects")
      .update({ status })
      .eq("id", id);

    if (updateErr) {
      setError(updateErr.message);
      return;
    }

    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p)),
    );
  }

  async function handleDeleteProject(id: string, name: string) {
    if (!window.confirm(`Delete project "${name}"? This cannot be undone.`)) return;

    const { error: deleteErr } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (deleteErr) {
      setError(deleteErr.message);
      return;
    }

    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  async function handleAddProject() {
    if (!form.name.trim() || !form.client_id) return;

    try {
      setSaving(true);
      const { error: insertErr } = await supabase.from("projects").insert({
        name: form.name.trim(),
        description: form.description.trim() || null,
        status: form.status,
        tier: form.tier || null,
        client_id: form.client_id,
        url: form.url.trim() || null,
        start_date: new Date().toISOString().split("T")[0],
        end_date: null,
        notes: null,
      });

      if (insertErr) throw insertErr;

      setForm(EMPTY_FORM);
      setShowForm(false);
      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add project");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="neo-border bg-neo-blue px-8 py-4 shadow-hard font-space font-bold text-neo-black uppercase animate-pulse">
          {t("common.loading", "Loading...")}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-20">
        <NeoCard color="neo-red" hover={false} className="p-8 max-w-md">
          <p className="font-space font-bold text-neo-black uppercase mb-2">
            {t("common.error", "Error")}
          </p>
          <p className="font-mono text-sm text-neo-black/70">{error}</p>
        </NeoCard>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("admin.projectsTitle", "Projects")} | DMC Kreatif Admin</title>
      </Helmet>

      <section className="py-12 px-6 lg:px-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <NeoBadge color="neo-blue" className="mb-4">
              {t("admin.badge", "ADMIN PANEL")}
            </NeoBadge>
            <h1 className="font-space font-bold text-4xl lg:text-5xl uppercase">
              {t("admin.projects", "Projects")}
            </h1>
            <p className="font-mono text-sm text-neo-black/60 mt-2">
              {t("admin.projectsSubtitle", "Manage all client projects")} ({projects.length})
            </p>
          </div>
          <NeoButton
            color="neo-blue"
            size="sm"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm
              ? t("common.cancel", "Cancel")
              : t("admin.addProject", "+ New Project")}
          </NeoButton>
        </motion.div>

        {/* Add Project Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <NeoCard hover={false} className="p-6">
                <h2 className="font-space font-bold text-lg uppercase mb-4 border-b-2 border-neo-black pb-2">
                  {t("admin.newProject", "New Project")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="font-mono text-xs uppercase text-neo-black/60 block mb-1">
                      {t("admin.form.projectName", "Project Name")} *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border-2 border-neo-black bg-neo-white px-3 py-2 font-mono text-sm focus:outline-none focus:shadow-hard-sm"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase text-neo-black/60 block mb-1">
                      {t("admin.form.client", "Client")} *
                    </label>
                    <select
                      value={form.client_id}
                      onChange={(e) => setForm({ ...form, client_id: e.target.value })}
                      className="w-full border-2 border-neo-black bg-neo-white px-3 py-2 font-mono text-sm focus:outline-none focus:shadow-hard-sm"
                    >
                      <option value="">{t("admin.form.selectClient", "-- Select Client --")}</option>
                      {clients.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.email})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase text-neo-black/60 block mb-1">
                      {t("admin.form.status", "Status")}
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value as ProjectStatus })
                      }
                      className="w-full border-2 border-neo-black bg-neo-white px-3 py-2 font-mono text-sm focus:outline-none focus:shadow-hard-sm"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase text-neo-black/60 block mb-1">
                      {t("admin.form.tier", "Tier")}
                    </label>
                    <select
                      value={form.tier}
                      onChange={(e) => setForm({ ...form, tier: e.target.value })}
                      className="w-full border-2 border-neo-black bg-neo-white px-3 py-2 font-mono text-sm focus:outline-none focus:shadow-hard-sm"
                    >
                      {TIER_OPTIONS.map((tier) => (
                        <option key={tier} value={tier}>
                          {tier}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase text-neo-black/60 block mb-1">
                      {t("admin.form.url", "URL")}
                    </label>
                    <input
                      type="url"
                      value={form.url}
                      onChange={(e) => setForm({ ...form, url: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full border-2 border-neo-black bg-neo-white px-3 py-2 font-mono text-sm focus:outline-none focus:shadow-hard-sm placeholder:text-neo-black/30"
                    />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="font-mono text-xs uppercase text-neo-black/60 block mb-1">
                      {t("admin.form.description", "Description")}
                    </label>
                    <input
                      type="text"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full border-2 border-neo-black bg-neo-white px-3 py-2 font-mono text-sm focus:outline-none focus:shadow-hard-sm"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <NeoButton
                    color="neo-green"
                    size="sm"
                    onClick={handleAddProject}
                    disabled={saving || !form.name.trim() || !form.client_id}
                  >
                    {saving
                      ? t("common.saving", "Saving...")
                      : t("admin.form.saveProject", "Save Project")}
                  </NeoButton>
                </div>
              </NeoCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Table */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <NeoCard hover={false} className="overflow-hidden">
            {/* Header Row */}
            <div className="hidden lg:grid lg:grid-cols-7 gap-4 px-6 py-3 bg-neo-black text-neo-white font-mono text-xs uppercase tracking-wider">
              <span>{t("admin.table.projectName", "Project")}</span>
              <span>{t("admin.table.client", "Client")}</span>
              <span>{t("admin.table.status", "Status")}</span>
              <span>{t("admin.table.tier", "Tier")}</span>
              <span>{t("admin.table.startDate", "Start")}</span>
              <span>{t("admin.table.endDate", "End")}</span>
              <span>{t("admin.table.actions", "Actions")}</span>
            </div>

            {projects.length === 0 ? (
              <div className="p-8 text-center">
                <p className="font-mono text-sm text-neo-black/50">
                  {t("admin.noProjects", "No projects found")}
                </p>
              </div>
            ) : (
              projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  className={`grid grid-cols-1 lg:grid-cols-7 gap-2 lg:gap-4 px-6 py-4 border-b-2 border-neo-black items-center ${
                    idx % 2 === 0 ? "bg-neo-white" : "bg-neo-bg"
                  }`}
                >
                  <div>
                    <span className="font-space font-bold text-sm">
                      {project.name}
                    </span>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-mono text-xs text-neo-blue underline mt-0.5"
                      >
                        {project.url}
                      </a>
                    )}
                  </div>
                  <span className="font-mono text-xs truncate">
                    {project.profiles?.name ?? t("admin.unknown", "Unknown")}
                  </span>
                  <div>
                    <NeoBadge color={STATUS_COLOR[project.status]}>
                      {project.status}
                    </NeoBadge>
                  </div>
                  <span className="font-mono text-xs font-bold">
                    {project.tier ?? "-"}
                  </span>
                  <span className="font-mono text-xs text-neo-black/60">
                    {formatDate(project.start_date)}
                  </span>
                  <span className="font-mono text-xs text-neo-black/60">
                    {formatDate(project.end_date)}
                  </span>
                  <div className="flex items-center gap-2">
                    <select
                      value={project.status}
                      onChange={(e) =>
                        handleStatusChange(project.id, e.target.value as ProjectStatus)
                      }
                      className="flex-1 border-2 border-neo-black bg-neo-white px-2 py-1 font-mono text-xs focus:outline-none focus:shadow-hard-sm"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDeleteProject(project.id, project.name)}
                      className="border-2 border-neo-black bg-neo-red/10 hover:bg-neo-red hover:text-neo-white px-2 py-1 font-mono text-xs font-bold transition-colors"
                      title={t("common.delete", "Delete")}
                    >
                      ✕
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </NeoCard>
        </motion.div>
      </section>
    </>
  );
}
