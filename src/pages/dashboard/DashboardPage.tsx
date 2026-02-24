import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import type { Project, TemplateOrder } from "@/types/database";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface DashboardStats {
  activeProjects: number;
  pendingInvoices: number;
  unreadMessages: number;
  templateOrders: number;
}

function StatCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: string;
}) {
  const colorMap: Record<string, { accent: string; bg: string }> = {
    lime: { accent: "bg-neo-lime", bg: "border-neo-lime" },
    blue: { accent: "bg-neo-blue", bg: "border-neo-blue" },
    pink: { accent: "bg-neo-pink", bg: "border-neo-pink" },
  };
  const c = colorMap[color] ?? colorMap.lime;

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-neo-white border-2 border-neo-black shadow-hard overflow-hidden"
    >
      <div className={`h-2 ${c.accent}`} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl">{icon}</span>
          <span
            className={`font-space font-bold text-4xl text-neo-black tabular-nums`}
          >
            {value}
          </span>
        </div>
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-neo-black/60">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-neo-white border-2 border-neo-black shadow-hard overflow-hidden animate-pulse">
      <div className="h-2 bg-neo-black/10" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="w-8 h-8 bg-neo-black/10 rounded" />
          <div className="w-12 h-10 bg-neo-black/10 rounded" />
        </div>
        <div className="w-24 h-3 bg-neo-black/10 rounded" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const { user, profile } = useAuth();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [recentTemplateOrders, setRecentTemplateOrders] = useState<TemplateOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    async function fetchDashboardData() {
      try {
        const [projectsRes, invoicesRes, messagesRes, templateOrdersRes] = await Promise.all([
          supabase
            .from("projects")
            .select("*")
            .eq("client_id", user!.id),
          supabase
            .from("invoices")
            .select("*")
            .eq("client_id", user!.id)
            .in("status", ["SENT", "OVERDUE"]),
          supabase
            .from("messages")
            .select("*")
            .eq("user_id", user!.id)
            .eq("read", false),
          supabase
            .from("template_orders")
            .select("*")
            .eq("client_id", user!.id)
            .order("created_at", { ascending: false })
            .limit(3),
        ]);

        if (projectsRes.error) throw projectsRes.error;
        if (invoicesRes.error) throw invoicesRes.error;
        if (messagesRes.error) throw messagesRes.error;

        const projects = (projectsRes.data ?? []) as unknown as Project[];
        const activeCount = projects.filter(
          (p) => p.status === "IN_PROGRESS" || p.status === "REVIEW" || p.status === "PENDING",
        ).length;

        setStats({
          activeProjects: activeCount,
          pendingInvoices: invoicesRes.data?.length ?? 0,
          unreadMessages: messagesRes.data?.length ?? 0,
          templateOrders: (templateOrdersRes.data?.length ?? 0),
        });

        const sorted = [...projects].sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        );
        setRecentProjects(sorted.slice(0, 3));

        if (templateOrdersRes.data) {
          setRecentTemplateOrders(templateOrdersRes.data as unknown as TemplateOrder[]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : t("common.error", "Something went wrong"),
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [user, t]);

  const statusColor: Record<string, string> = {
    PENDING: "bg-neo-yellow",
    IN_PROGRESS: "bg-neo-blue text-neo-white",
    REVIEW: "bg-neo-pink",
    COMPLETED: "bg-neo-green",
    ARCHIVED: "bg-neo-black/20",
  };

  return (
    <>
      <Helmet>
        <title>{t("dashboard.title", "Dashboard")} — DMC Kreatif</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Greeting */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <h1 className="font-space font-bold text-3xl md:text-4xl uppercase tracking-tight text-neo-black">
              {t("dashboard.greeting", "Welcome back")},{" "}
              <span className="text-neo-lime bg-neo-black px-3 py-1 inline-block">
                {profile?.name ?? t("dashboard.client", "Client")}
              </span>
            </h1>
            <p className="font-mono text-sm text-neo-black/60 mt-3 uppercase">
              {t("dashboard.overview", "Here's an overview of your account")}
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

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : stats ? (
              <>
                <StatCard
                  label={t("dashboard.activeProjects", "Active Projects")}
                  value={stats.activeProjects}
                  color="lime"
                  icon="[P]"
                />
                <StatCard
                  label={t("dashboard.pendingInvoices", "Pending Invoices")}
                  value={stats.pendingInvoices}
                  color="blue"
                  icon="[$]"
                />
                <StatCard
                  label={t("dashboard.unreadMessages", "Unread Messages")}
                  value={stats.unreadMessages}
                  color="pink"
                  icon="[M]"
                />
                <StatCard
                  label={t("dashboard.templateOrders", "Template Orders")}
                  value={stats.templateOrders}
                  color="lime"
                  icon="[T]"
                />
              </>
            ) : null}
          </motion.div>

          {/* Recent Projects */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-space font-bold text-xl uppercase tracking-tight text-neo-black">
                {t("dashboard.recentProjects", "Recent Projects")}
              </h2>
              <Link
                to={`/${locale ?? "en"}/dashboard/projects`}
                className="font-mono text-xs font-bold uppercase tracking-wider text-neo-black underline underline-offset-4 decoration-neo-lime decoration-2 hover:text-neo-lime transition-colors"
              >
                {t("dashboard.viewAll", "View All")} &rarr;
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-neo-white border-2 border-neo-black shadow-hard p-5 animate-pulse"
                  >
                    <div className="h-4 w-48 bg-neo-black/10 rounded mb-2" />
                    <div className="h-3 w-24 bg-neo-black/10 rounded" />
                  </div>
                ))}
              </div>
            ) : recentProjects.length === 0 ? (
              <div className="bg-neo-white border-2 border-neo-black border-dashed p-8 text-center">
                <p className="font-mono text-sm text-neo-black/40 uppercase">
                  {t("dashboard.noProjects", "No projects yet")}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={fadeInUp}
                    className="bg-neo-white border-2 border-neo-black shadow-hard p-5 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all duration-150"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <h3 className="font-space font-bold text-base uppercase text-neo-black">
                          {project.name}
                        </h3>
                        {project.tier && (
                          <span className="font-mono text-xs text-neo-black/50 uppercase">
                            {project.tier}
                          </span>
                        )}
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider border-2 border-neo-black ${statusColor[project.status] ?? "bg-neo-black/10"}`}
                      >
                        {project.status.replace("_", " ")}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recent Template Orders */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-space font-bold text-xl uppercase tracking-tight text-neo-black">
                {t("dashboard.recentTemplateOrders", "Template Orders")}
              </h2>
              <Link
                to={`/${locale ?? "en"}/dashboard/template-orders`}
                className="font-mono text-xs font-bold uppercase tracking-wider text-neo-black underline underline-offset-4 decoration-neo-lime decoration-2 hover:text-neo-lime transition-colors"
              >
                {t("dashboard.viewAll", "View All")} &rarr;
              </Link>
            </div>

            {recentTemplateOrders.length === 0 ? (
              <div className="bg-neo-white border-2 border-neo-black border-dashed p-8 text-center">
                <p className="font-mono text-sm text-neo-black/40 uppercase">
                  {t("dashboard.noTemplateOrders", "No template orders yet")}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentTemplateOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    variants={fadeInUp}
                    className="bg-neo-white border-2 border-neo-black shadow-hard p-5 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all duration-150"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <h3 className="font-space font-bold text-base uppercase text-neo-black">
                          {order.order_number}
                        </h3>
                        <span className="font-mono text-xs text-neo-black/50 uppercase">
                          {order.business_name} — €{order.price}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider border-2 border-neo-black ${
                          order.status === "PENDING" ? "bg-neo-yellow" :
                          order.status === "IN_PROGRESS" ? "bg-neo-blue text-neo-white" :
                          order.status === "REVIEW" ? "bg-neo-pink" :
                          order.status === "COMPLETED" ? "bg-neo-green" :
                          "bg-neo-black/10"
                        }`}
                      >
                        {order.status.replace("_", " ")}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <h2 className="font-space font-bold text-xl uppercase tracking-tight text-neo-black mb-6">
              {t("dashboard.quickActions", "Quick Actions")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <motion.div variants={fadeInUp}>
                <Link
                  to={`/${locale ?? "en"}/dashboard/projects`}
                  className="block bg-neo-lime border-2 border-neo-black shadow-hard p-5 text-center font-space font-bold text-sm uppercase tracking-wider text-neo-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
                >
                  {t("dashboard.viewProjects", "View Projects")}
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link
                  to={`/${locale ?? "en"}/dashboard/invoices`}
                  className="block bg-neo-blue border-2 border-neo-black shadow-hard p-5 text-center font-space font-bold text-sm uppercase tracking-wider text-neo-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
                >
                  {t("dashboard.viewInvoices", "View Invoices")}
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link
                  to={`/${locale ?? "en"}/dashboard/messages`}
                  className="block bg-neo-pink border-2 border-neo-black shadow-hard p-5 text-center font-space font-bold text-sm uppercase tracking-wider text-neo-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
                >
                  {t("dashboard.viewMessages", "Messages")}
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link
                  to={`/${locale ?? "en"}/dashboard/template-orders`}
                  className="block bg-neo-yellow border-2 border-neo-black shadow-hard p-5 text-center font-space font-bold text-sm uppercase tracking-wider text-neo-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
                >
                  {t("dashboard.viewTemplateOrders", "Template Orders")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
