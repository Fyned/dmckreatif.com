import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import NeoCard from "@/components/ui/NeoCard";
import NeoBadge from "@/components/ui/NeoBadge";
import type { ContactSubmission } from "@/types/database";

interface DashboardStats {
  totalClients: number;
  activeProjects: number;
  pendingInvoices: number;
  newContacts: number;
  unreadMessages: number;
  pendingTemplateOrders: number;
}

const INITIAL_STATS: DashboardStats = {
  totalClients: 0,
  activeProjects: 0,
  pendingInvoices: 0,
  newContacts: 0,
  unreadMessages: 0,
  pendingTemplateOrders: 0,
};

const STAT_CARDS: {
  key: keyof DashboardStats;
  labelKey: string;
  fallback: string;
  color: string;
  icon: string;
}[] = [
  { key: "totalClients", labelKey: "admin.stats.totalClients", fallback: "Total Clients", color: "neo-lime", icon: "///" },
  { key: "activeProjects", labelKey: "admin.stats.activeProjects", fallback: "Active Projects", color: "neo-blue", icon: "[+]" },
  { key: "pendingInvoices", labelKey: "admin.stats.pendingInvoices", fallback: "Pending Invoices", color: "neo-yellow", icon: "EUR" },
  { key: "newContacts", labelKey: "admin.stats.newContacts", fallback: "New Contacts", color: "neo-pink", icon: ">>>" },
  { key: "unreadMessages", labelKey: "admin.stats.unreadMessages", fallback: "Unread Messages", color: "neo-green", icon: "(!)" },
  { key: "pendingTemplateOrders", labelKey: "admin.stats.pendingTemplateOrders", fallback: "Template Orders", color: "neo-orange", icon: "TPL" },
];

const NAV_CARDS: {
  href: string;
  labelKey: string;
  fallback: string;
  descKey: string;
  descFallback: string;
  color: string;
}[] = [
  { href: "/admin/clients", labelKey: "admin.nav.clients", fallback: "Clients", descKey: "admin.nav.clientsDesc", descFallback: "Manage all client accounts", color: "neo-lime" },
  { href: "/admin/projects", labelKey: "admin.nav.projects", fallback: "Projects", descKey: "admin.nav.projectsDesc", descFallback: "Track project progress", color: "neo-blue" },
  { href: "/admin/invoices", labelKey: "admin.nav.invoices", fallback: "Invoices", descKey: "admin.nav.invoicesDesc", descFallback: "Billing & payments", color: "neo-yellow" },
  { href: "/admin/messages", labelKey: "admin.nav.messages", fallback: "Messages", descKey: "admin.nav.messagesDesc", descFallback: "Client communications", color: "neo-green" },
  { href: "/admin/contacts", labelKey: "admin.nav.contacts", fallback: "Contacts", descKey: "admin.nav.contactsDesc", descFallback: "Contact form submissions", color: "neo-pink" },
  { href: "/admin/payments", labelKey: "admin.nav.payments", fallback: "Payments", descKey: "admin.nav.paymentsDesc", descFallback: "Payment gateway settings", color: "neo-purple" },
  { href: "/admin/packages", labelKey: "admin.nav.packages", fallback: "Packages", descKey: "admin.nav.packagesDesc", descFallback: "Manage pricing tiers", color: "neo-orange" },
  { href: "/admin/campaigns", labelKey: "admin.nav.campaigns", fallback: "Campaigns", descKey: "admin.nav.campaignsDesc", descFallback: "Promotions & discounts", color: "neo-red" },
  { href: "/admin/templates", labelKey: "admin.nav.templates", fallback: "Templates", descKey: "admin.nav.templatesDesc", descFallback: "Manage template catalog", color: "neo-lime" },
  { href: "/admin/template-orders", labelKey: "admin.nav.templateOrders", fallback: "Template Orders", descKey: "admin.nav.templateOrdersDesc", descFallback: "Manage template orders", color: "neo-orange" },
];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS);
  const [recentContacts, setRecentContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);

        const [
          clientsRes,
          projectsRes,
          invoicesRes,
          contactsRes,
          messagesRes,
          recentContactsRes,
          templateOrdersRes,
        ] = await Promise.all([
          supabase
            .from("profiles")
            .select("id", { count: "exact", head: true })
            .eq("role", "CLIENT"),
          supabase
            .from("projects")
            .select("id", { count: "exact", head: true })
            .in("status", ["PENDING", "IN_PROGRESS", "REVIEW"]),
          supabase
            .from("invoices")
            .select("id", { count: "exact", head: true })
            .in("status", ["SENT", "OVERDUE"]),
          supabase
            .from("contact_submissions")
            .select("id", { count: "exact", head: true })
            .eq("status", "NEW"),
          supabase
            .from("messages")
            .select("id", { count: "exact", head: true })
            .eq("read", false)
            .eq("from_admin", false),
          supabase
            .from("contact_submissions")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(5),
          supabase
            .from("template_orders")
            .select("id", { count: "exact", head: true })
            .in("status", ["PENDING", "IN_PROGRESS"]),
        ]);

        setStats({
          totalClients: clientsRes.count ?? 0,
          activeProjects: projectsRes.count ?? 0,
          pendingInvoices: invoicesRes.count ?? 0,
          newContacts: contactsRes.count ?? 0,
          unreadMessages: messagesRes.count ?? 0,
          pendingTemplateOrders: templateOrdersRes.count ?? 0,
        });

        if (recentContactsRes.data) {
          setRecentContacts(recentContactsRes.data as unknown as ContactSubmission[]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

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
        <title>{t("admin.dashboardTitle", "Admin Dashboard")} | DMC Kreatif</title>
      </Helmet>

      <section className="py-12 px-6 lg:px-10 max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <NeoBadge color="neo-lime" className="mb-4">
            {t("admin.badge", "ADMIN PANEL")}
          </NeoBadge>
          <h1 className="font-space font-bold text-4xl lg:text-5xl uppercase">
            {t("admin.dashboard", "Dashboard")}
          </h1>
          <p className="font-mono text-sm text-neo-black/60 mt-2">
            {t("admin.dashboardSubtitle", "Overview of all platform activity")}
          </p>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-12"
        >
          {STAT_CARDS.map((card) => (
            <motion.div key={card.key} variants={fadeInUp}>
              <NeoCard color={card.color} className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-neo-black/50 uppercase tracking-wider">
                    {t(card.labelKey, card.fallback)}
                  </span>
                  <span className="font-mono text-xs font-bold border-2 border-neo-black px-2 py-0.5 bg-neo-white">
                    {card.icon}
                  </span>
                </div>
                <p className="font-space font-bold text-4xl text-neo-black">
                  {stats[card.key]}
                </p>
              </NeoCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-2"
          >
            <NeoCard hover={false} className="p-6">
              <h2 className="font-space font-bold text-xl uppercase mb-6 border-b-2 border-neo-black pb-3">
                {t("admin.recentContacts", "Recent Contact Submissions")}
              </h2>

              {recentContacts.length === 0 ? (
                <p className="font-mono text-sm text-neo-black/50 py-8 text-center">
                  {t("admin.noRecentContacts", "No recent submissions")}
                </p>
              ) : (
                <div className="space-y-3">
                  {recentContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-start justify-between border-2 border-neo-black p-4 bg-neo-white hover:bg-neo-bg-alt transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-space font-bold text-sm truncate">
                            {contact.name}
                          </span>
                          <NeoBadge
                            color={
                              contact.status === "NEW"
                                ? "neo-lime"
                                : contact.status === "READ"
                                  ? "neo-yellow"
                                  : contact.status === "REPLIED"
                                    ? "neo-green"
                                    : "neo-orange"
                            }
                          >
                            {contact.status}
                          </NeoBadge>
                        </div>
                        <p className="font-mono text-xs text-neo-black/60 truncate">
                          {contact.email}
                          {contact.company ? ` - ${contact.company}` : ""}
                        </p>
                        <p className="font-mono text-xs text-neo-black/40 mt-1">
                          {contact.service ?? "General inquiry"} | {formatDate(contact.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </NeoCard>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <h2 className="font-space font-bold text-xl uppercase mb-4">
              {t("admin.quickNav", "Quick Navigation")}
            </h2>
            <div className="space-y-3">
              {NAV_CARDS.map((nav) => (
                <motion.div key={nav.href} variants={fadeInUp}>
                  <Link to={`/${locale ?? "en"}${nav.href}`}>
                    <NeoCard color={nav.color} className="p-4 cursor-pointer">
                      <p className="font-space font-bold text-sm uppercase">
                        {t(nav.labelKey, nav.fallback)}
                      </p>
                      <p className="font-mono text-xs text-neo-black/60 mt-1">
                        {t(nav.descKey, nav.descFallback)}
                      </p>
                    </NeoCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
