import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import type { Project, ProjectStatus } from "@/types/database";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const STATUS_COLORS: Record<ProjectStatus, { badge: string; label: string }> = {
  PENDING: { badge: "bg-neo-yellow", label: "Pending" },
  IN_PROGRESS: { badge: "bg-neo-blue text-neo-white", label: "In Progress" },
  REVIEW: { badge: "bg-neo-pink", label: "Review" },
  COMPLETED: { badge: "bg-neo-green", label: "Completed" },
  ARCHIVED: { badge: "bg-neo-black/20", label: "Archived" },
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "---";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ProjectsPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    async function fetchProjects() {
      try {
        const { data, error: fetchError } = await supabase
          .from("projects")
          .select("*")
          .eq("client_id", user!.id)
          .order("updated_at", { ascending: false });

        if (fetchError) throw fetchError;
        setProjects((data ?? []) as unknown as Project[]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : t("common.error", "Something went wrong"),
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [user, t]);

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      <Helmet>
        <title>{t("dashboard.projects", "My Projects")} — DMC Kreatif</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <h1 className="font-space font-bold text-3xl md:text-4xl uppercase tracking-tight text-neo-black">
              {t("dashboard.projects", "My Projects")}
            </h1>
            <p className="font-mono text-sm text-neo-black/60 mt-2 uppercase">
              {t("dashboard.projectsSub", "Track your project progress")}
            </p>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neo-red/10 border-2 border-neo-red text-neo-red px-4 py-3 mb-8 font-mono text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Loading */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-neo-white border-2 border-neo-black shadow-hard p-6 animate-pulse"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-5 w-48 bg-neo-black/10 rounded mb-2" />
                      <div className="h-3 w-32 bg-neo-black/10 rounded" />
                    </div>
                    <div className="h-6 w-24 bg-neo-black/10 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && projects.length === 0 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-neo-white border-2 border-neo-black border-dashed p-12 text-center"
            >
              <p className="font-space font-bold text-lg uppercase text-neo-black/40 mb-2">
                {t("dashboard.noProjects", "No projects yet")}
              </p>
              <p className="font-mono text-xs text-neo-black/30 uppercase">
                {t(
                  "dashboard.noProjectsDesc",
                  "Your projects will appear here once created",
                )}
              </p>
            </motion.div>
          )}

          {/* Projects List */}
          {!loading && projects.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {projects.map((project) => {
                const statusConfig = STATUS_COLORS[project.status];
                const isExpanded = expandedId === project.id;

                return (
                  <motion.div
                    key={project.id}
                    variants={fadeInUp}
                    layout
                    className="bg-neo-white border-2 border-neo-black shadow-hard overflow-hidden"
                  >
                    {/* Row Header */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(project.id)}
                      className="w-full p-6 text-left hover:bg-neo-bg/50 transition-colors"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-space font-bold text-base uppercase text-neo-black truncate">
                            {project.name}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 flex-wrap">
                            {project.tier && (
                              <span className="font-mono text-xs text-neo-black/50 uppercase">
                                {project.tier}
                              </span>
                            )}
                            <span className="font-mono text-xs text-neo-black/40">
                              {formatDate(project.start_date)}
                              {project.end_date
                                ? ` — ${formatDate(project.end_date)}`
                                : ""}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider border-2 border-neo-black ${statusConfig.badge}`}
                          >
                            {statusConfig.label}
                          </span>
                          <span
                            className={`font-mono text-xs text-neo-black/40 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          >
                            ▼
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.4, 0, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t-2 border-neo-black p-6 bg-neo-bg/30 space-y-4">
                            {project.description && (
                              <div>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neo-black/60 block mb-1">
                                  {t("dashboard.description", "Description")}
                                </span>
                                <p className="font-mono text-sm text-neo-black">
                                  {project.description}
                                </p>
                              </div>
                            )}

                            {project.url && (
                              <div>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neo-black/60 block mb-1">
                                  {t("dashboard.url", "URL")}
                                </span>
                                <a
                                  href={project.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-mono text-sm text-neo-black underline underline-offset-4 decoration-neo-lime decoration-2 hover:text-neo-lime transition-colors break-all"
                                >
                                  {project.url}
                                </a>
                              </div>
                            )}

                            {project.notes && (
                              <div>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neo-black/60 block mb-1">
                                  {t("dashboard.notes", "Notes")}
                                </span>
                                <p className="font-mono text-sm text-neo-black whitespace-pre-wrap">
                                  {project.notes}
                                </p>
                              </div>
                            )}

                            <div className="flex gap-6 pt-2">
                              <div>
                                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neo-black/40 block">
                                  {t("dashboard.created", "Created")}
                                </span>
                                <span className="font-mono text-xs text-neo-black">
                                  {formatDate(project.created_at)}
                                </span>
                              </div>
                              <div>
                                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neo-black/40 block">
                                  {t("dashboard.updated", "Updated")}
                                </span>
                                <span className="font-mono text-xs text-neo-black">
                                  {formatDate(project.updated_at)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
