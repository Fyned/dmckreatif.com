import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import type { Invoice, InvoiceStatus } from "@/types/database";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const STATUS_CONFIG: Record<InvoiceStatus, { badge: string; label: string }> = {
  DRAFT: { badge: "bg-neo-black/15", label: "Draft" },
  SENT: { badge: "bg-neo-blue text-neo-white", label: "Sent" },
  PAID: { badge: "bg-neo-green", label: "Paid" },
  OVERDUE: { badge: "bg-neo-red text-neo-white", label: "Overdue" },
  CANCELLED: { badge: "bg-neo-black/15 line-through", label: "Cancelled" },
};

function formatCurrency(amount: number, currency: string): string {
  const symbolMap: Record<string, string> = {
    EUR: "\u20AC",
    GBP: "\u00A3",
    USD: "$",
  };
  const symbol = symbolMap[currency.toUpperCase()] ?? currency;
  return `${symbol}${amount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "---";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function InvoicesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    async function fetchInvoices() {
      try {
        const { data, error: fetchError } = await supabase
          .from("invoices")
          .select("*")
          .eq("client_id", user!.id)
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;
        setInvoices((data ?? []) as unknown as Invoice[]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : t("common.error", "Something went wrong"),
        );
      } finally {
        setLoading(false);
      }
    }

    fetchInvoices();
  }, [user, t]);

  return (
    <>
      <Helmet>
        <title>{t("dashboard.invoices", "My Invoices")} — DMC Kreatif</title>
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
              {t("dashboard.invoices", "My Invoices")}
            </h1>
            <p className="font-mono text-sm text-neo-black/60 mt-2 uppercase">
              {t("dashboard.invoicesSub", "View your billing history")}
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
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-neo-black/10 rounded" />
                      <div className="h-3 w-48 bg-neo-black/10 rounded" />
                    </div>
                    <div className="h-8 w-24 bg-neo-black/10 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && invoices.length === 0 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-neo-white border-2 border-neo-black border-dashed p-12 text-center"
            >
              <p className="font-space font-bold text-lg uppercase text-neo-black/40 mb-2">
                {t("dashboard.noInvoices", "No invoices yet")}
              </p>
              <p className="font-mono text-xs text-neo-black/30 uppercase">
                {t(
                  "dashboard.noInvoicesDesc",
                  "Your invoices will appear here once issued",
                )}
              </p>
            </motion.div>
          )}

          {/* Invoices List */}
          {!loading && invoices.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-2 border-neo-black bg-neo-black text-neo-white">
                <span className="col-span-2 font-mono text-xs font-bold uppercase tracking-wider">
                  {t("dashboard.invoiceNumber", "Invoice #")}
                </span>
                <span className="col-span-3 font-mono text-xs font-bold uppercase tracking-wider">
                  {t("dashboard.description", "Description")}
                </span>
                <span className="col-span-2 font-mono text-xs font-bold uppercase tracking-wider text-right">
                  {t("dashboard.amount", "Amount")}
                </span>
                <span className="col-span-2 font-mono text-xs font-bold uppercase tracking-wider text-center">
                  {t("dashboard.status", "Status")}
                </span>
                <span className="col-span-3 font-mono text-xs font-bold uppercase tracking-wider text-right">
                  {t("dashboard.dueDate", "Due Date")}
                </span>
              </div>

              {invoices.map((invoice) => {
                const statusConfig = STATUS_CONFIG[invoice.status];

                return (
                  <motion.div
                    key={invoice.id}
                    variants={fadeInUp}
                    className="bg-neo-white border-2 border-neo-black shadow-hard"
                  >
                    {/* Desktop Row */}
                    <div className="hidden md:grid grid-cols-12 gap-4 items-center px-6 py-5">
                      <span className="col-span-2 font-mono text-sm font-bold text-neo-black">
                        {invoice.invoice_number}
                      </span>
                      <span className="col-span-3 font-mono text-sm text-neo-black/70 truncate">
                        {invoice.description ?? "---"}
                      </span>
                      <span className="col-span-2 font-space font-bold text-base text-neo-black text-right tabular-nums">
                        {formatCurrency(invoice.amount, invoice.currency)}
                      </span>
                      <div className="col-span-2 flex justify-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider border-2 border-neo-black ${statusConfig.badge}`}
                        >
                          {statusConfig.label}
                        </span>
                      </div>
                      <span className="col-span-3 font-mono text-sm text-neo-black/60 text-right">
                        {formatDate(invoice.due_date)}
                      </span>
                    </div>

                    {/* Mobile Card */}
                    <div className="md:hidden p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-neo-black">
                          {invoice.invoice_number}
                        </span>
                        <span
                          className={`inline-flex items-center px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider border-2 border-neo-black ${statusConfig.badge}`}
                        >
                          {statusConfig.label}
                        </span>
                      </div>

                      {invoice.description && (
                        <p className="font-mono text-xs text-neo-black/60">
                          {invoice.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t-2 border-neo-black/10">
                        <span className="font-space font-bold text-lg text-neo-black tabular-nums">
                          {formatCurrency(invoice.amount, invoice.currency)}
                        </span>
                        <span className="font-mono text-xs text-neo-black/40">
                          {t("dashboard.due", "Due")}: {formatDate(invoice.due_date)}
                        </span>
                      </div>
                    </div>
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
