import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import NeoCard from "@/components/ui/NeoCard";
import NeoBadge from "@/components/ui/NeoBadge";
import NeoButton from "@/components/ui/NeoButton";
import type { TemplateOrder, TemplateOrderStatus } from "@/types/database";

type OrderWithTemplate = TemplateOrder & {
  template?: { name: string; slug: string } | null;
};

const STATUS_COLORS: Record<TemplateOrderStatus, string> = {
  PENDING: "neo-yellow",
  IN_PROGRESS: "neo-blue",
  REVIEW: "neo-purple",
  COMPLETED: "neo-green",
  CANCELLED: "neo-red",
};

const STATUS_LABELS: Record<TemplateOrderStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: currency || "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DashboardTemplateOrdersPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [orders, setOrders] = useState<OrderWithTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      // RLS ensures only the client's own orders are returned
      const { data, error: fetchError } = await supabase
        .from("template_orders")
        .select("*, template:templates(name, slug)")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setOrders((data ?? []) as unknown as OrderWithTemplate[]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t("common.error", "Something went wrong")
      );
    } finally {
      setLoading(false);
    }
  }, [user, t]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  function getStatusMessage(
    status: TemplateOrderStatus
  ): string {
    switch (status) {
      case "PENDING":
        return t(
          "dashboard.orders.pendingMsg",
          "We've received your order and will start soon"
        );
      case "IN_PROGRESS":
        return t(
          "dashboard.orders.inProgressMsg",
          "Your website is being built"
        );
      case "REVIEW":
        return t(
          "dashboard.orders.reviewMsg",
          "Your website is ready for review"
        );
      case "COMPLETED":
        return t(
          "dashboard.orders.completedMsg",
          "Your website has been delivered"
        );
      case "CANCELLED":
        return t(
          "dashboard.orders.cancelledMsg",
          "This order has been cancelled"
        );
    }
  }

  /* ── Loading state ── */

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="space-y-4 w-full max-w-3xl px-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-neo-white border-2 border-neo-black shadow-hard p-6 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-5 w-48 bg-neo-black/10 mb-2" />
                  <div className="h-3 w-32 bg-neo-black/10" />
                </div>
                <div className="h-6 w-24 bg-neo-black/10" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {t("dashboard.orders.title", "My Template Orders")} — DMC Kreatif
        </title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <NeoBadge color="neo-purple" className="mb-4">
              {t("dashboard.orders.badge", "MY ORDERS")}
            </NeoBadge>
            <h1 className="font-space font-bold text-3xl md:text-4xl uppercase tracking-tight text-neo-black">
              {t("dashboard.orders.title", "My Template Orders")}
            </h1>
            <p className="font-mono text-sm text-neo-black/60 mt-2 uppercase">
              {t(
                "dashboard.orders.subtitle",
                "Track your website orders"
              )}
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

          {/* Empty State */}
          {!error && orders.length === 0 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-neo-white border-2 border-neo-black border-dashed p-12 text-center"
            >
              <p className="font-space font-bold text-lg uppercase text-neo-black/40 mb-2">
                {t(
                  "dashboard.orders.noOrders",
                  "No template orders yet"
                )}
              </p>
              <p className="font-mono text-xs text-neo-black/30 uppercase mb-6">
                {t(
                  "dashboard.orders.noOrdersDesc",
                  "Browse our templates to get started!"
                )}
              </p>
              <NeoButton href="/templates" color="neo-lime">
                {t("dashboard.orders.browseTemplates", "Browse Templates")}
                <ArrowRight size={16} />
              </NeoButton>
            </motion.div>
          )}

          {/* Orders List */}
          {orders.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {orders.map((order) => (
                <motion.div key={order.id} variants={fadeInUp}>
                  <NeoCard hover={false} className="p-6">
                    {/* Top row */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-mono font-bold text-sm text-neo-black">
                            {order.order_number}
                          </span>
                          {order.template && (
                            <span className="font-mono text-xs text-neo-black/50">
                              {order.template.name}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <NeoBadge color={STATUS_COLORS[order.status]}>
                            {STATUS_LABELS[order.status]}
                          </NeoBadge>
                          <NeoBadge color="neo-orange">
                            {order.tier.replace("_", " ").toUpperCase()}
                          </NeoBadge>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-space font-bold text-xl text-neo-black block">
                          {formatCurrency(order.price, order.currency)}
                        </span>
                        <span className="font-mono text-xs text-neo-black/40">
                          {formatDate(order.created_at)}
                        </span>
                      </div>
                    </div>

                    {/* Status message */}
                    <div className="border-t-2 border-neo-black pt-4">
                      <p className="font-mono text-sm text-neo-black/70">
                        {getStatusMessage(order.status)}
                      </p>

                      {/* Delivered URL for REVIEW / COMPLETED */}
                      {(order.status === "REVIEW" ||
                        order.status === "COMPLETED") &&
                        order.delivered_url && (
                          <div className="mt-3">
                            <a
                              href={order.delivered_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-neo-lime border-2 border-neo-black shadow-hard px-5 py-2.5 font-space font-bold text-sm uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
                            >
                              {order.status === "REVIEW"
                                ? t(
                                    "dashboard.orders.reviewSite",
                                    "Review Your Website"
                                  )
                                : t(
                                    "dashboard.orders.visitSite",
                                    "Visit Your Website"
                                  )}
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        )}
                    </div>
                  </NeoCard>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Bottom CTA */}
          {orders.length > 0 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <NeoCard hover={false} className="p-8 bg-neo-bg">
                <p className="font-space font-bold text-lg uppercase text-neo-black mb-2">
                  {t(
                    "dashboard.orders.customCta",
                    "Want a fully custom design?"
                  )}
                </p>
                <p className="font-mono text-xs text-neo-black/50 uppercase mb-5">
                  {t(
                    "dashboard.orders.customCtaDesc",
                    "Our premium packages include bespoke design, SEO, and ongoing support"
                  )}
                </p>
                <NeoButton href="/pricing" color="neo-lime">
                  {t("dashboard.orders.viewPricing", "View Pricing")}
                  <ArrowRight size={16} />
                </NeoButton>
              </NeoCard>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
