import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import NeoCard from "@/components/ui/NeoCard";
import NeoBadge from "@/components/ui/NeoBadge";
import type { Profile } from "@/types/database";

interface ClientWithCounts extends Profile {
  projectCount: number;
  invoiceTotal: number;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function ClientsPage() {
  const { t } = useTranslation();
  const [clients, setClients] = useState<ClientWithCounts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClients() {
      try {
        setLoading(true);
        setError(null);

        const { data: profiles, error: profilesErr } = await supabase
          .from("profiles")
          .select("*")
          .eq("role", "CLIENT")
          .order("created_at", { ascending: false });

        if (profilesErr) throw profilesErr;
        if (!profiles) {
          setClients([]);
          return;
        }

        const typedProfiles = profiles as unknown as Profile[];
        const clientIds = typedProfiles.map((p) => p.id);

        const [projectsRes, invoicesRes] = await Promise.all([
          supabase
            .from("projects")
            .select("client_id")
            .in("client_id", clientIds),
          supabase
            .from("invoices")
            .select("client_id, amount")
            .in("client_id", clientIds),
        ]);

        const projectCounts: Record<string, number> = {};
        if (projectsRes.data) {
          for (const row of projectsRes.data) {
            const cid = (row as { client_id: string }).client_id;
            projectCounts[cid] = (projectCounts[cid] ?? 0) + 1;
          }
        }

        const invoiceTotals: Record<string, number> = {};
        if (invoicesRes.data) {
          for (const row of invoicesRes.data) {
            const inv = row as { client_id: string; amount: number };
            invoiceTotals[inv.client_id] = (invoiceTotals[inv.client_id] ?? 0) + inv.amount;
          }
        }

        const enriched: ClientWithCounts[] = typedProfiles.map((p) => ({
          ...p,
          projectCount: projectCounts[p.id] ?? 0,
          invoiceTotal: invoiceTotals[p.id] ?? 0,
        }));

        setClients(enriched);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load clients");
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return clients;
    const q = search.toLowerCase();
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.company?.toLowerCase().includes(q) ?? false),
    );
  }, [clients, search]);

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="neo-border bg-neo-lime px-8 py-4 shadow-hard font-space font-bold text-neo-black uppercase animate-pulse">
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
        <title>{t("admin.clientsTitle", "Clients")} | DMC Kreatif Admin</title>
      </Helmet>

      <section className="py-12 px-6 lg:px-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <NeoBadge color="neo-lime" className="mb-4">
            {t("admin.badge", "ADMIN PANEL")}
          </NeoBadge>
          <h1 className="font-space font-bold text-4xl lg:text-5xl uppercase">
            {t("admin.clients", "Clients")}
          </h1>
          <p className="font-mono text-sm text-neo-black/60 mt-2">
            {t("admin.clientsSubtitle", "Manage all client accounts")} ({clients.length})
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("admin.searchClients", "Search by name, email or company...")}
            className="w-full max-w-md border-2 border-neo-black bg-neo-white px-4 py-3 font-mono text-sm shadow-hard focus:outline-none focus:shadow-hard-lime focus:border-neo-black placeholder:text-neo-black/40"
          />
        </motion.div>

        {/* Table */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <NeoCard hover={false} className="overflow-hidden">
            {/* Table Header */}
            <div className="hidden lg:grid lg:grid-cols-7 gap-4 px-6 py-3 bg-neo-black text-neo-white font-mono text-xs uppercase tracking-wider">
              <span>{t("admin.table.name", "Name")}</span>
              <span>{t("admin.table.email", "Email")}</span>
              <span>{t("admin.table.company", "Company")}</span>
              <span>{t("admin.table.country", "Country")}</span>
              <span>{t("admin.table.phone", "Phone")}</span>
              <span>{t("admin.table.projects", "Projects")}</span>
              <span>{t("admin.table.joined", "Joined")}</span>
            </div>

            {filtered.length === 0 ? (
              <div className="p-8 text-center">
                <p className="font-mono text-sm text-neo-black/50">
                  {t("admin.noClients", "No clients found")}
                </p>
              </div>
            ) : (
              filtered.map((client, idx) => (
                <div key={client.id}>
                  <motion.div
                    variants={fadeInUp}
                    className={`grid grid-cols-1 lg:grid-cols-7 gap-2 lg:gap-4 px-6 py-4 border-b-2 border-neo-black cursor-pointer transition-colors hover:bg-neo-lime/20 ${
                      idx % 2 === 0 ? "bg-neo-white" : "bg-neo-bg"
                    }`}
                    onClick={() =>
                      setExpandedId(expandedId === client.id ? null : client.id)
                    }
                  >
                    <span className="font-space font-bold text-sm truncate">
                      <span className="lg:hidden font-mono text-xs text-neo-black/50 mr-2">
                        {t("admin.table.name", "Name")}:
                      </span>
                      {client.name}
                    </span>
                    <span className="font-mono text-xs truncate text-neo-black/70">
                      <span className="lg:hidden font-mono text-xs text-neo-black/50 mr-2">
                        {t("admin.table.email", "Email")}:
                      </span>
                      {client.email}
                    </span>
                    <span className="font-mono text-xs truncate">
                      {client.company ?? "-"}
                    </span>
                    <span className="font-mono text-xs">
                      {client.country ?? "-"}
                    </span>
                    <span className="font-mono text-xs">
                      {client.phone ?? "-"}
                    </span>
                    <span className="font-mono text-xs font-bold">
                      {client.projectCount}
                    </span>
                    <span className="font-mono text-xs text-neo-black/60">
                      {formatDate(client.created_at)}
                    </span>
                  </motion.div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedId === client.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-b-2 border-neo-black bg-neo-bg-alt"
                      >
                        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="border-2 border-neo-black bg-neo-white p-4">
                            <p className="font-mono text-xs text-neo-black/50 uppercase mb-1">
                              {t("admin.detail.totalProjects", "Total Projects")}
                            </p>
                            <p className="font-space font-bold text-2xl">
                              {client.projectCount}
                            </p>
                          </div>
                          <div className="border-2 border-neo-black bg-neo-white p-4">
                            <p className="font-mono text-xs text-neo-black/50 uppercase mb-1">
                              {t("admin.detail.invoiceTotal", "Invoice Total")}
                            </p>
                            <p className="font-space font-bold text-2xl">
                              {formatCurrency(client.invoiceTotal)}
                            </p>
                          </div>
                          <div className="border-2 border-neo-black bg-neo-white p-4">
                            <p className="font-mono text-xs text-neo-black/50 uppercase mb-1">
                              {t("admin.detail.memberId", "Member ID")}
                            </p>
                            <p className="font-mono text-xs break-all">
                              {client.id}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </NeoCard>
        </motion.div>
      </section>
    </>
  );
}
