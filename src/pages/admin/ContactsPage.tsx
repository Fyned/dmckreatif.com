import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import NeoCard from "@/components/ui/NeoCard";
import NeoBadge from "@/components/ui/NeoBadge";
import type { ContactSubmission, ContactStatus } from "@/types/database";

const STATUS_OPTIONS: ContactStatus[] = ["NEW", "READ", "REPLIED", "ARCHIVED"];

const STATUS_COLOR: Record<ContactStatus, string> = {
  NEW: "neo-lime",
  READ: "neo-yellow",
  REPLIED: "neo-green",
  ARCHIVED: "neo-orange",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ContactsPage() {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  async function fetchContacts() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchErr } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchErr) throw fetchErr;

      setContacts((data as unknown as ContactSubmission[]) ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load contact submissions",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  async function handleStatusChange(id: string, status: ContactStatus) {
    const { error: updateErr } = await supabase
      .from("contact_submissions")
      .update({ status })
      .eq("id", id);

    if (updateErr) {
      setError(updateErr.message);
      return;
    }

    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    );
  }

  async function handleSaveNotes(id: string) {
    try {
      setSavingNotes(true);
      const { error: updateErr } = await supabase
        .from("contact_submissions")
        .update({ notes: notesValue.trim() || null })
        .eq("id", id);

      if (updateErr) throw updateErr;

      setContacts((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, notes: notesValue.trim() || null } : c,
        ),
      );
      setEditingNotes(null);
      setNotesValue("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save notes");
    } finally {
      setSavingNotes(false);
    }
  }

  function handleStartEditNotes(contact: ContactSubmission) {
    setEditingNotes(contact.id);
    setNotesValue(contact.notes ?? "");
  }

  function handleToggleExpand(id: string) {
    setExpandedId(expandedId === id ? null : id);
    if (editingNotes && editingNotes !== id) {
      setEditingNotes(null);
      setNotesValue("");
    }
  }

  const statusCounts = {
    NEW: contacts.filter((c) => c.status === "NEW").length,
    READ: contacts.filter((c) => c.status === "READ").length,
    REPLIED: contacts.filter((c) => c.status === "REPLIED").length,
    ARCHIVED: contacts.filter((c) => c.status === "ARCHIVED").length,
  };

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center py-20">
        <div className="neo-border bg-neo-pink px-8 py-4 shadow-hard font-space font-bold text-neo-black uppercase animate-pulse">
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
        <title>{t("admin.contactsTitle", "Contacts")} | DMC Kreatif Admin</title>
      </Helmet>

      <section className="py-12 px-6 lg:px-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <NeoBadge color="neo-pink" className="mb-4">
            {t("admin.badge", "ADMIN PANEL")}
          </NeoBadge>
          <h1 className="font-space font-bold text-4xl lg:text-5xl uppercase">
            {t("admin.contacts", "Contact Submissions")}
          </h1>
          <p className="font-mono text-sm text-neo-black/60 mt-2">
            {t("admin.contactsSubtitle", "Manage contact form submissions")} ({contacts.length})
          </p>
        </motion.div>

        {/* Status Summary */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          {STATUS_OPTIONS.map((status) => (
            <motion.div key={status} variants={fadeInUp}>
              <NeoCard color={STATUS_COLOR[status]} hover={false} className="p-4 text-center">
                <p className="font-mono text-xs uppercase text-neo-black/50 mb-1">
                  {status}
                </p>
                <p className="font-space font-bold text-2xl">
                  {statusCounts[status]}
                </p>
              </NeoCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Contacts Table */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <NeoCard hover={false} className="overflow-hidden">
            {/* Header Row */}
            <div className="hidden lg:grid lg:grid-cols-8 gap-3 px-6 py-3 bg-neo-black text-neo-white font-mono text-xs uppercase tracking-wider">
              <span>{t("admin.table.name", "Name")}</span>
              <span>{t("admin.table.email", "Email")}</span>
              <span>{t("admin.table.company", "Company")}</span>
              <span>{t("admin.table.service", "Service")}</span>
              <span>{t("admin.table.budget", "Budget")}</span>
              <span>{t("admin.table.status", "Status")}</span>
              <span>{t("admin.table.date", "Date")}</span>
              <span>{t("admin.table.actions", "Actions")}</span>
            </div>

            {contacts.length === 0 ? (
              <div className="p-8 text-center">
                <p className="font-mono text-sm text-neo-black/50">
                  {t("admin.noContacts", "No contact submissions found")}
                </p>
              </div>
            ) : (
              contacts.map((contact, idx) => (
                <div key={contact.id}>
                  {/* Row */}
                  <motion.div
                    variants={fadeInUp}
                    className={`grid grid-cols-1 lg:grid-cols-8 gap-2 lg:gap-3 px-6 py-4 border-b-2 border-neo-black cursor-pointer transition-colors items-center hover:bg-neo-lime/10 ${
                      idx % 2 === 0 ? "bg-neo-white" : "bg-neo-bg"
                    }`}
                    onClick={() => handleToggleExpand(contact.id)}
                  >
                    <span className="font-space font-bold text-sm truncate">
                      {contact.name}
                    </span>
                    <span className="font-mono text-xs truncate text-neo-black/70">
                      {contact.email}
                    </span>
                    <span className="font-mono text-xs truncate">
                      {contact.company ?? "-"}
                    </span>
                    <span className="font-mono text-xs truncate">
                      {contact.service ?? "-"}
                    </span>
                    <span className="font-mono text-xs font-bold">
                      {contact.budget ?? "-"}
                    </span>
                    <div>
                      <NeoBadge color={STATUS_COLOR[contact.status]}>
                        {contact.status}
                      </NeoBadge>
                    </div>
                    <span className="font-mono text-xs text-neo-black/60">
                      {formatDate(contact.created_at)}
                    </span>
                    <div onClick={(e) => e.stopPropagation()}>
                      <select
                        value={contact.status}
                        onChange={(e) =>
                          handleStatusChange(
                            contact.id,
                            e.target.value as ContactStatus,
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

                  {/* Expanded Detail */}
                  <AnimatePresence>
                    {expandedId === contact.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-b-2 border-neo-black bg-neo-bg-alt"
                      >
                        <div className="px-6 py-5 space-y-4">
                          {/* Full Message */}
                          <div className="border-2 border-neo-black bg-neo-white p-4">
                            <p className="font-mono text-xs uppercase text-neo-black/50 mb-2">
                              {t("admin.detail.message", "Full Message")}
                            </p>
                            <p className="font-mono text-sm text-neo-black/80 whitespace-pre-wrap leading-relaxed">
                              {contact.message}
                            </p>
                          </div>

                          {/* Contact Details */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="border-2 border-neo-black bg-neo-white p-3">
                              <p className="font-mono text-xs uppercase text-neo-black/50 mb-1">
                                {t("admin.detail.phone", "Phone")}
                              </p>
                              <p className="font-mono text-sm">
                                {contact.phone ?? t("admin.notProvided", "Not provided")}
                              </p>
                            </div>
                            <div className="border-2 border-neo-black bg-neo-white p-3">
                              <p className="font-mono text-xs uppercase text-neo-black/50 mb-1">
                                {t("admin.detail.locale", "Locale")}
                              </p>
                              <p className="font-mono text-sm">
                                {contact.locale ?? "-"}
                              </p>
                            </div>
                            <div className="border-2 border-neo-black bg-neo-white p-3">
                              <p className="font-mono text-xs uppercase text-neo-black/50 mb-1">
                                {t("admin.detail.submittedAt", "Submitted")}
                              </p>
                              <p className="font-mono text-sm">
                                {formatDate(contact.created_at)}
                              </p>
                            </div>
                          </div>

                          {/* Notes */}
                          <div className="border-2 border-neo-black bg-neo-white p-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-mono text-xs uppercase text-neo-black/50">
                                {t("admin.detail.notes", "Admin Notes")}
                              </p>
                              {editingNotes !== contact.id && (
                                <button
                                  onClick={() => handleStartEditNotes(contact)}
                                  className="font-mono text-xs text-neo-blue underline hover:text-neo-black transition-colors"
                                >
                                  {contact.notes
                                    ? t("admin.editNotes", "Edit")
                                    : t("admin.addNotes", "Add Notes")}
                                </button>
                              )}
                            </div>

                            {editingNotes === contact.id ? (
                              <div className="space-y-2">
                                <textarea
                                  value={notesValue}
                                  onChange={(e) => setNotesValue(e.target.value)}
                                  rows={3}
                                  className="w-full border-2 border-neo-black bg-neo-bg px-3 py-2 font-mono text-sm focus:outline-none focus:shadow-hard-sm resize-none placeholder:text-neo-black/30"
                                  placeholder={t(
                                    "admin.notesPlaceholder",
                                    "Add internal notes about this submission...",
                                  )}
                                />
                                <div className="flex gap-2 justify-end">
                                  <button
                                    onClick={() => {
                                      setEditingNotes(null);
                                      setNotesValue("");
                                    }}
                                    className="font-mono text-xs font-bold uppercase border-2 border-neo-black px-3 py-1 bg-neo-white hover:bg-neo-bg-alt transition-colors"
                                  >
                                    {t("common.cancel", "Cancel")}
                                  </button>
                                  <button
                                    onClick={() => handleSaveNotes(contact.id)}
                                    disabled={savingNotes}
                                    className="font-mono text-xs font-bold uppercase border-2 border-neo-black px-3 py-1 bg-neo-lime hover:bg-neo-green transition-colors disabled:opacity-50"
                                  >
                                    {savingNotes
                                      ? t("common.saving", "Saving...")
                                      : t("common.save", "Save")}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="font-mono text-sm text-neo-black/60 whitespace-pre-wrap">
                                {contact.notes ?? t("admin.noNotes", "No notes yet")}
                              </p>
                            )}
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
