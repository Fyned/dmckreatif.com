import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import NeoCard from "@/components/ui/NeoCard";
import NeoBadge from "@/components/ui/NeoBadge";
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

const STATUS_OPTIONS: TemplateOrderStatus[] = [
  "PENDING",
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
  "CANCELLED",
];

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

export default function TemplateOrdersPage() {
  const { t } = useTranslation();

  const [orders, setOrders] = useState<OrderWithTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    TemplateOrderStatus | "ALL"
  >("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("template_orders")
      .select("*, template:templates(name, slug)")
      .order("created_at", { ascending: false });

    if (data) {
      setOrders(data as unknown as OrderWithTemplate[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  /* ── Stats ── */

  const stats = useMemo(() => {
    const pending = orders.filter((o) => o.status === "PENDING").length;
    const inProgress = orders.filter((o) => o.status === "IN_PROGRESS").length;
    const completed = orders.filter((o) => o.status === "COMPLETED").length;
    const totalRevenue = orders
      .filter((o) => o.status !== "CANCELLED")
      .reduce((sum, o) => sum + o.price, 0);
    return { pending, inProgress, completed, totalRevenue };
  }, [orders]);

  /* ── Filtered orders ── */

  const filteredOrders = useMemo(() => {
    if (statusFilter === "ALL") return orders;
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  /* ── Update order fields ── */

  function updateOrder(id: string, field: string, value: unknown) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, [field]: value } : o))
    );
  }

  async function saveOrderStatus(order: OrderWithTemplate) {
    setSaving(`${order.id}-status`);
    const { error } = await supabase
      .from("template_orders")
      .update({ status: order.status })
      .eq("id", order.id);

    if (error) {
      showToast(`Error: ${error.message}`);
    } else {
      showToast(
        `${order.order_number} ${t("admin.orders.statusUpdated", "status updated")}!`
      );
    }
    setSaving(null);
  }

  async function saveOrderNotes(order: OrderWithTemplate) {
    setSaving(`${order.id}-notes`);
    const { error } = await supabase
      .from("template_orders")
      .update({ admin_notes: order.admin_notes })
      .eq("id", order.id);

    if (error) {
      showToast(`Error: ${error.message}`);
    } else {
      showToast(
        `${order.order_number} ${t("admin.orders.notesSaved", "notes saved")}!`
      );
    }
    setSaving(null);
  }

  async function saveDeliveredUrl(order: OrderWithTemplate) {
    setSaving(`${order.id}-url`);
    const { error } = await supabase
      .from("template_orders")
      .update({ delivered_url: order.delivered_url })
      .eq("id", order.id);

    if (error) {
      showToast(`Error: ${error.message}`);
    } else {
      showToast(
        `${order.order_number} ${t("admin.orders.urlSaved", "URL saved")}!`
      );
    }
    setSaving(null);
  }

  /* ── Loading state ── */

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="neo-border bg-neo-lime px-8 py-4 shadow-hard font-space font-bold text-neo-black uppercase animate-pulse">
          {t("common.loading", "Loading...")}
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {t("admin.orders.title", "Template Orders")} | DMC Kreatif
        </title>
      </Helmet>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 border-2 border-neo-black bg-neo-lime px-6 py-3 shadow-hard font-mono text-sm font-bold uppercase animate-pulse">
          {toast}
        </div>
      )}

      <section className="py-12 px-6 lg:px-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <NeoBadge color="neo-purple" className="mb-4">
            {t("admin.orders.badge", "TEMPLATE ORDERS")}
          </NeoBadge>
          <h1 className="font-space font-bold text-4xl lg:text-5xl uppercase">
            {t("admin.orders.title", "Template Orders")}
          </h1>
          <p className="font-mono text-sm text-neo-black/60 mt-2">
            {t(
              "admin.orders.subtitle",
              "Manage client template orders & delivery"
            )}
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              label: t("admin.orders.pending", "Pending"),
              value: stats.pending,
              color: "neo-yellow",
            },
            {
              label: t("admin.orders.inProgress", "In Progress"),
              value: stats.inProgress,
              color: "neo-blue",
            },
            {
              label: t("admin.orders.completed", "Completed"),
              value: stats.completed,
              color: "neo-green",
            },
            {
              label: t("admin.orders.totalRevenue", "Total Revenue"),
              value: formatCurrency(stats.totalRevenue, "EUR"),
              color: "neo-lime",
            },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <NeoCard hover={false} color={stat.color} className="p-4">
                <div
                  className={`bg-${stat.color} border-2 border-neo-black p-3 mb-2 inline-block`}
                >
                  <span className="font-space font-bold text-2xl uppercase text-neo-black">
                    {stat.value}
                  </span>
                </div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-neo-black/60">
                  {stat.label}
                </p>
              </NeoCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neo-black/60">
            {t("admin.orders.filter", "Filter:")}
          </span>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as TemplateOrderStatus | "ALL")
            }
            className="border-2 border-neo-black bg-neo-bg px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neo-lime appearance-none"
          >
            <option value="ALL">
              {t("admin.orders.all", "All")} ({orders.length})
            </option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ")} (
                {orders.filter((o) => o.status === status).length})
              </option>
            ))}
          </select>
        </div>

        {/* Empty state */}
        {filteredOrders.length === 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-neo-white border-2 border-neo-black border-dashed p-12 text-center"
          >
            <p className="font-space font-bold text-lg uppercase text-neo-black/40 mb-2">
              {t("admin.orders.noOrders", "No orders found")}
            </p>
            <p className="font-mono text-xs text-neo-black/30 uppercase">
              {t(
                "admin.orders.noOrdersDesc",
                "Try changing the status filter"
              )}
            </p>
          </motion.div>
        )}

        {/* Orders List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredOrders.map((order) => {
            const isExpanded = expandedId === order.id;

            return (
              <motion.div key={order.id} variants={fadeInUp} layout>
                <NeoCard hover={false} className="overflow-hidden">
                  {/* Order Header */}
                  <div className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono font-bold text-sm text-neo-black">
                          {order.order_number}
                        </span>
                        <NeoBadge color={STATUS_COLORS[order.status]}>
                          {order.status.replace("_", " ")}
                        </NeoBadge>
                        <NeoBadge color="neo-orange">
                          {order.tier.replace("_", " ").toUpperCase()}
                        </NeoBadge>
                      </div>
                      <span className="font-space font-bold text-lg text-neo-black">
                        {formatCurrency(order.price, order.currency)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                      <span className="font-mono text-neo-black">
                        <span className="font-bold">
                          {order.business_name}
                        </span>
                      </span>
                      <span className="font-mono text-neo-black/50 text-xs">
                        {order.contact_email}
                      </span>
                      {order.template && (
                        <span className="font-mono text-xs text-neo-black/40">
                          {t("admin.orders.template", "Template")}:{" "}
                          {order.template.name}
                        </span>
                      )}
                      <span className="font-mono text-xs text-neo-black/40 ml-auto">
                        {formatDate(order.created_at)}
                      </span>
                    </div>

                    {/* Expandable toggle */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId((prev) =>
                          prev === order.id ? null : order.id
                        )
                      }
                      className="flex items-center gap-1 font-mono text-xs text-neo-black/50 hover:text-neo-black transition-colors uppercase"
                    >
                      {isExpanded
                        ? t("admin.orders.hideDetails", "Hide Details")
                        : t("admin.orders.showDetails", "Show Details")}
                      {isExpanded ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.25, 0.4, 0, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="border-t-2 border-neo-black mt-4 pt-4 space-y-3">
                            {/* Contact Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <span className="font-mono text-[10px] font-bold uppercase text-neo-black/50 block">
                                  {t(
                                    "admin.orders.contactName",
                                    "Contact Name"
                                  )}
                                </span>
                                <span className="font-mono text-sm text-neo-black">
                                  {order.contact_name}
                                </span>
                              </div>
                              <div>
                                <span className="font-mono text-[10px] font-bold uppercase text-neo-black/50 block">
                                  {t(
                                    "admin.orders.contactPhone",
                                    "Phone"
                                  )}
                                </span>
                                <span className="font-mono text-sm text-neo-black">
                                  {order.contact_phone || "---"}
                                </span>
                              </div>
                            </div>

                            {/* Business Details */}
                            {order.business_description && (
                              <div>
                                <span className="font-mono text-[10px] font-bold uppercase text-neo-black/50 block">
                                  {t(
                                    "admin.orders.businessDesc",
                                    "Business Description"
                                  )}
                                </span>
                                <p className="font-mono text-sm text-neo-black whitespace-pre-wrap">
                                  {order.business_description}
                                </p>
                              </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {order.business_services && (
                                <div>
                                  <span className="font-mono text-[10px] font-bold uppercase text-neo-black/50 block">
                                    {t(
                                      "admin.orders.services",
                                      "Services"
                                    )}
                                  </span>
                                  <p className="font-mono text-xs text-neo-black">
                                    {order.business_services}
                                  </p>
                                </div>
                              )}
                              {order.business_hours && (
                                <div>
                                  <span className="font-mono text-[10px] font-bold uppercase text-neo-black/50 block">
                                    {t(
                                      "admin.orders.hours",
                                      "Business Hours"
                                    )}
                                  </span>
                                  <p className="font-mono text-xs text-neo-black">
                                    {order.business_hours}
                                  </p>
                                </div>
                              )}
                              {order.business_address && (
                                <div>
                                  <span className="font-mono text-[10px] font-bold uppercase text-neo-black/50 block">
                                    {t("admin.orders.address", "Address")}
                                  </span>
                                  <p className="font-mono text-xs text-neo-black">
                                    {order.business_address}
                                  </p>
                                </div>
                              )}
                              {order.business_slogan && (
                                <div>
                                  <span className="font-mono text-[10px] font-bold uppercase text-neo-black/50 block">
                                    {t("admin.orders.slogan", "Slogan")}
                                  </span>
                                  <p className="font-mono text-xs text-neo-black italic">
                                    {order.business_slogan}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Brand Colors */}
                            {(order.brand_colors?.primary ||
                              order.brand_colors?.secondary) && (
                              <div>
                                <span className="font-mono text-[10px] font-bold uppercase text-neo-black/50 block mb-1">
                                  {t(
                                    "admin.orders.brandColors",
                                    "Brand Colors"
                                  )}
                                </span>
                                <div className="flex items-center gap-2">
                                  {order.brand_colors.primary && (
                                    <div className="flex items-center gap-1.5">
                                      <div
                                        className="w-8 h-8 border-2 border-neo-black"
                                        style={{
                                          backgroundColor:
                                            order.brand_colors.primary,
                                        }}
                                      />
                                      <span className="font-mono text-xs text-neo-black/60">
                                        {order.brand_colors.primary}
                                      </span>
                                    </div>
                                  )}
                                  {order.brand_colors.secondary && (
                                    <div className="flex items-center gap-1.5">
                                      <div
                                        className="w-8 h-8 border-2 border-neo-black"
                                        style={{
                                          backgroundColor:
                                            order.brand_colors.secondary,
                                        }}
                                      />
                                      <span className="font-mono text-xs text-neo-black/60">
                                        {order.brand_colors.secondary}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Logo */}
                            {order.logo_url && (
                              <div>
                                <span className="font-mono text-[10px] font-bold uppercase text-neo-black/50 block mb-1">
                                  {t("admin.orders.logo", "Logo")}
                                </span>
                                <img
                                  src={order.logo_url}
                                  alt={`${order.business_name} logo`}
                                  className="w-20 h-20 object-contain border-2 border-neo-black bg-neo-white p-1"
                                />
                              </div>
                            )}

                            {/* Images count */}
                            {order.images && order.images.length > 0 && (
                              <div>
                                <span className="font-mono text-[10px] font-bold uppercase text-neo-black/50 block">
                                  {t(
                                    "admin.orders.uploadedImages",
                                    "Uploaded Images"
                                  )}
                                </span>
                                <span className="font-mono text-xs text-neo-black">
                                  {order.images.length}{" "}
                                  {t("admin.orders.files", "file(s)")}
                                </span>
                              </div>
                            )}

                            {/* Special Requests */}
                            {order.special_requests && (
                              <div>
                                <span className="font-mono text-[10px] font-bold uppercase text-neo-black/50 block">
                                  {t(
                                    "admin.orders.specialRequests",
                                    "Special Requests"
                                  )}
                                </span>
                                <p className="font-mono text-sm text-neo-black whitespace-pre-wrap bg-neo-yellow/20 border-2 border-neo-yellow p-3">
                                  {order.special_requests}
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Admin Controls (always visible) */}
                  <div className="border-t-2 border-neo-black bg-neo-bg/50 p-5 space-y-3">
                    {/* Status change */}
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1 text-neo-black/60">
                          {t("admin.orders.status", "Status")}
                        </label>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrder(
                              order.id,
                              "status",
                              e.target.value as TemplateOrderStatus
                            )
                          }
                          className="w-full border-2 border-neo-black bg-neo-white px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neo-lime appearance-none"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s.replace("_", " ")}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() => saveOrderStatus(order)}
                        disabled={saving === `${order.id}-status`}
                        className="bg-neo-lime border-2 border-neo-black shadow-hard px-4 py-2 font-space font-bold text-xs uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50 shrink-0"
                      >
                        {saving === `${order.id}-status`
                          ? t("common.saving", "Saving...")
                          : t("admin.orders.updateStatus", "Update")}
                      </button>
                    </div>

                    {/* Admin Notes */}
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <label className="block font-mono text-[10px] font-bold uppercase mb-1 text-neo-black/60">
                          {t("admin.orders.adminNotes", "Admin Notes")}
                        </label>
                        <textarea
                          rows={2}
                          value={order.admin_notes ?? ""}
                          onChange={(e) =>
                            updateOrder(
                              order.id,
                              "admin_notes",
                              e.target.value
                            )
                          }
                          placeholder={t(
                            "admin.orders.notesPlaceholder",
                            "Internal notes..."
                          )}
                          className="w-full border-2 border-neo-black bg-neo-white px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-neo-lime resize-none placeholder:text-neo-black/30"
                        />
                      </div>
                      <button
                        onClick={() => saveOrderNotes(order)}
                        disabled={saving === `${order.id}-notes`}
                        className="bg-neo-lime border-2 border-neo-black shadow-hard px-4 py-2 font-space font-bold text-xs uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50 shrink-0"
                      >
                        {saving === `${order.id}-notes`
                          ? t("common.saving", "Saving...")
                          : t("common.save", "Save")}
                      </button>
                    </div>

                    {/* Delivered URL (shown for REVIEW or COMPLETED) */}
                    {(order.status === "REVIEW" ||
                      order.status === "COMPLETED") && (
                      <div className="flex items-end gap-3">
                        <div className="flex-1">
                          <label className="block font-mono text-[10px] font-bold uppercase mb-1 text-neo-black/60">
                            {t("admin.orders.deliveredUrl", "Delivered URL")}
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="url"
                              value={order.delivered_url ?? ""}
                              onChange={(e) =>
                                updateOrder(
                                  order.id,
                                  "delivered_url",
                                  e.target.value
                                )
                              }
                              placeholder="https://..."
                              className="flex-1 border-2 border-neo-black bg-neo-white px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-neo-lime placeholder:text-neo-black/30"
                            />
                            {order.delivered_url && (
                              <a
                                href={order.delivered_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 text-neo-black hover:text-neo-lime transition-colors"
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => saveDeliveredUrl(order)}
                          disabled={saving === `${order.id}-url`}
                          className="bg-neo-lime border-2 border-neo-black shadow-hard px-4 py-2 font-space font-bold text-xs uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 disabled:opacity-50 shrink-0"
                        >
                          {saving === `${order.id}-url`
                            ? t("common.saving", "Saving...")
                            : t("common.save", "Save")}
                        </button>
                      </div>
                    )}
                  </div>
                </NeoCard>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </>
  );
}
