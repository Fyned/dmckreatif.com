import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import NeoCard from "@/components/ui/NeoCard";
import NeoBadge from "@/components/ui/NeoBadge";
import NeoButton from "@/components/ui/NeoButton";
import type { Invoice, InvoiceStatus, Profile } from "@/types/database";

type InvoiceWithClient = Invoice & {
  profiles: { name: string; email: string } | null;
};

interface NewInvoiceForm {
  invoice_number: string;
  amount: string;
  currency: string;
  status: InvoiceStatus;
  description: string;
  due_date: string;
  client_id: string;
}

const EMPTY_FORM: NewInvoiceForm = {
  invoice_number: "",
  amount: "",
  currency: "EUR",
  status: "DRAFT",
  description: "",
  due_date: "",
  client_id: "",
};

const STATUS_OPTIONS: InvoiceStatus[] = [
  "DRAFT",
  "SENT",
  "PAID",
  "OVERDUE",
  "CANCELLED",
];

const STATUS_COLOR: Record<InvoiceStatus, string> = {
  DRAFT: "neo-orange",
  SENT: "neo-blue",
  PAID: "neo-green",
  OVERDUE: "neo-red",
  CANCELLED: "neo-purple",
};

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function InvoicesPage() {
  const { t } = useTranslation();
  const [invoices, setInvoices] = useState<InvoiceWithClient[]>([]);
  const [clients, setClients] = useState<Pick<Profile, "id" | "name" | "email">[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<NewInvoiceForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const totalRevenue = invoices
    .filter((inv) => inv.status === "PAID")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalPending = invoices
    .filter((inv) => inv.status === "SENT" || inv.status === "OVERDUE")
    .reduce((sum, inv) => sum + inv.amount, 0);

  async function fetchInvoices() {
    try {
      setLoading(true);
      setError(null);

      const [invoicesRes, clientsRes] = await Promise.all([
        supabase
          .from("invoices")
          .select("*, profiles!client_id(name, email)")
          .order("created_at", { ascending: false }),
        supabase
          .from("profiles")
          .select("id, name, email")
          .eq("role", "CLIENT")
          .order("name"),
      ]);

      if (invoicesRes.error) throw invoicesRes.error;
      if (clientsRes.error) throw clientsRes.error;

      setInvoices(
        (invoicesRes.data as unknown as InvoiceWithClient[]) ?? [],
      );
      setClients(
        (clientsRes.data as unknown as Pick<Profile, "id" | "name" | "email">[]) ?? [],
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load invoices");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInvoices();
  }, []);

  async function handleStatusChange(id: string, status: InvoiceStatus) {
    const updateData: Record<string, unknown> = { status };
    if (status === "PAID") {
      updateData.paid_date = new Date().toISOString().split("T")[0];
    }

    const { error: updateErr } = await supabase
      .from("invoices")
      .update(updateData)
      .eq("id", id);

    if (updateErr) {
      setError(updateErr.message);
      return;
    }

    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              status,
              ...(status === "PAID"
                ? { paid_date: new Date().toISOString().split("T")[0] }
                : {}),
            }
          : inv,
      ),
    );
  }

  async function handleAddInvoice() {
    if (!form.invoice_number.trim() || !form.client_id || !form.amount) return;

    try {
      setSaving(true);
      const { error: insertErr } = await supabase.from("invoices").insert({
        invoice_number: form.invoice_number.trim(),
        amount: parseFloat(form.amount),
        currency: form.currency,
        status: form.status,
        description: form.description.trim() || null,
        due_date: form.due_date || null,
        paid_date: null,
        payment_method: null,
        items: null,
        client_id: form.client_id,
        project_id: null,
      });

      if (insertErr) throw insertErr;

      setForm(EMPTY_FORM);
      setShowForm(false);
      await fetchInvoices();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add invoice");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="neo-border bg-neo-yellow px-8 py-4 shadow-hard font-space font-bold text-neo-black uppercase animate-pulse">
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
        <title>{t("admin.invoicesTitle", "Invoices")} | DMC Kreatif Admin</title>
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
            <NeoBadge color="neo-yellow" className="mb-4">
              {t("admin.badge", "ADMIN PANEL")}
            </NeoBadge>
            <h1 className="font-space font-bold text-4xl lg:text-5xl uppercase">
              {t("admin.invoices", "Invoices")}
            </h1>
            <p className="font-mono text-sm text-neo-black/60 mt-2">
              {t("admin.invoicesSubtitle", "Billing & payment management")} ({invoices.length})
            </p>
          </div>
          <NeoButton
            color="neo-yellow"
            size="sm"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm
              ? t("common.cancel", "Cancel")
              : t("admin.addInvoice", "+ New Invoice")}
          </NeoButton>
        </motion.div>

        {/* Revenue Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <motion.div variants={fadeInUp}>
            <NeoCard color="neo-green" hover={false} className="p-5">
              <p className="font-mono text-xs uppercase text-neo-black/50 mb-1">
                {t("admin.stats.totalRevenue", "Total Revenue (Paid)")}
              </p>
              <p className="font-space font-bold text-3xl">
                {formatCurrency(totalRevenue, "EUR")}
              </p>
            </NeoCard>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <NeoCard color="neo-yellow" hover={false} className="p-5">
              <p className="font-mono text-xs uppercase text-neo-black/50 mb-1">
                {t("admin.stats.pendingAmount", "Pending Amount")}
              </p>
              <p className="font-space font-bold text-3xl">
                {formatCurrency(totalPending, "EUR")}
              </p>
            </NeoCard>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <NeoCard color="neo-blue" hover={false} className="p-5">
              <p className="font-mono text-xs uppercase text-neo-black/50 mb-1">
                {t("admin.stats.totalInvoices", "Total Invoices")}
              </p>
              <p className="font-space font-bold text-3xl">{invoices.length}</p>
            </NeoCard>
          </motion.div>
        </motion.div>

        {/* Add Invoice Form */}
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
                  {t("admin.newInvoice", "New Invoice")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="font-mono text-xs uppercase text-neo-black/60 block mb-1">
                      {t("admin.form.invoiceNumber", "Invoice Number")} *
                    </label>
                    <input
                      type="text"
                      value={form.invoice_number}
                      onChange={(e) =>
                        setForm({ ...form, invoice_number: e.target.value })
                      }
                      placeholder="INV-2026-001"
                      className="w-full border-2 border-neo-black bg-neo-white px-3 py-2 font-mono text-sm focus:outline-none focus:shadow-hard-sm placeholder:text-neo-black/30"
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
                      {t("admin.form.amount", "Amount")} *
                    </label>
                    <div className="flex">
                      <select
                        value={form.currency}
                        onChange={(e) => setForm({ ...form, currency: e.target.value })}
                        className="border-2 border-r-0 border-neo-black bg-neo-bg-alt px-2 py-2 font-mono text-sm focus:outline-none w-20"
                      >
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="USD">USD</option>
                      </select>
                      <input
                        type="number"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="flex-1 border-2 border-neo-black bg-neo-white px-3 py-2 font-mono text-sm focus:outline-none focus:shadow-hard-sm placeholder:text-neo-black/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase text-neo-black/60 block mb-1">
                      {t("admin.form.status", "Status")}
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value as InvoiceStatus })
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
                      {t("admin.form.dueDate", "Due Date")}
                    </label>
                    <input
                      type="date"
                      value={form.due_date}
                      onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                      className="w-full border-2 border-neo-black bg-neo-white px-3 py-2 font-mono text-sm focus:outline-none focus:shadow-hard-sm"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase text-neo-black/60 block mb-1">
                      {t("admin.form.description", "Description")}
                    </label>
                    <input
                      type="text"
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      className="w-full border-2 border-neo-black bg-neo-white px-3 py-2 font-mono text-sm focus:outline-none focus:shadow-hard-sm"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <NeoButton
                    color="neo-green"
                    size="sm"
                    onClick={handleAddInvoice}
                    disabled={
                      saving ||
                      !form.invoice_number.trim() ||
                      !form.client_id ||
                      !form.amount
                    }
                  >
                    {saving
                      ? t("common.saving", "Saving...")
                      : t("admin.form.saveInvoice", "Save Invoice")}
                  </NeoButton>
                </div>
              </NeoCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Invoices Table */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <NeoCard hover={false} className="overflow-hidden">
            <div className="hidden lg:grid lg:grid-cols-6 gap-4 px-6 py-3 bg-neo-black text-neo-white font-mono text-xs uppercase tracking-wider">
              <span>{t("admin.table.invoiceNumber", "Invoice #")}</span>
              <span>{t("admin.table.client", "Client")}</span>
              <span>{t("admin.table.amount", "Amount")}</span>
              <span>{t("admin.table.status", "Status")}</span>
              <span>{t("admin.table.dueDate", "Due Date")}</span>
              <span>{t("admin.table.actions", "Actions")}</span>
            </div>

            {invoices.length === 0 ? (
              <div className="p-8 text-center">
                <p className="font-mono text-sm text-neo-black/50">
                  {t("admin.noInvoices", "No invoices found")}
                </p>
              </div>
            ) : (
              invoices.map((invoice, idx) => (
                <motion.div
                  key={invoice.id}
                  variants={fadeInUp}
                  className={`grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-4 px-6 py-4 border-b-2 border-neo-black items-center ${
                    idx % 2 === 0 ? "bg-neo-white" : "bg-neo-bg"
                  }`}
                >
                  <span className="font-mono text-sm font-bold">
                    {invoice.invoice_number}
                  </span>
                  <span className="font-mono text-xs truncate">
                    {invoice.profiles?.name ?? t("admin.unknown", "Unknown")}
                  </span>
                  <span className="font-space font-bold text-sm">
                    {formatCurrency(invoice.amount, invoice.currency)}
                  </span>
                  <div>
                    <NeoBadge color={STATUS_COLOR[invoice.status]}>
                      {invoice.status}
                    </NeoBadge>
                  </div>
                  <span className="font-mono text-xs text-neo-black/60">
                    {formatDate(invoice.due_date)}
                  </span>
                  <div>
                    <select
                      value={invoice.status}
                      onChange={(e) =>
                        handleStatusChange(
                          invoice.id,
                          e.target.value as InvoiceStatus,
                        )
                      }
                      className="w-full border-2 border-neo-black bg-neo-white px-2 py-1 font-mono text-xs focus:outline-none focus:shadow-hard-sm"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
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
