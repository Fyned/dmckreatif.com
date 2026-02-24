import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Mail,
  X,
  Loader2,
  RefreshCcw,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Clock,
  User,
} from "lucide-react";
import type { FormSubmission, FormStats } from "@/lib/form-submissions";
import { getFormSubmissions, getFormStats, deleteFormSubmission } from "@/lib/form-submissions";

interface Props {
  siteId: string;
  siteName: string;
  onClose: () => void;
}

/** Format relative time like "2 min ago", "3 hours ago", "Jan 15". */
function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

/** Render a single submission card. */
function SubmissionCard({
  sub,
  onDelete,
  deleting,
}: {
  sub: FormSubmission;
  onDelete: (id: string) => void;
  deleting: boolean;
}) {
  const entries = Object.entries(sub.form_data).filter(
    ([k]) => !k.startsWith("_") && k !== "website_url_hp",
  );

  return (
    <div className="border-2 border-neo-black/10 rounded-lg p-4 bg-white hover:border-neo-lime/40 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="bg-neo-lime/20 text-neo-black text-[10px] font-mono font-semibold px-2 py-0.5 rounded uppercase">
            {sub.form_name}
          </span>
          <span className="text-[10px] font-mono text-neo-black/40 flex items-center gap-1">
            <Clock size={10} />
            {timeAgo(sub.created_at)}
          </span>
        </div>
        <button
          onClick={() => onDelete(sub.id)}
          disabled={deleting}
          className="p-1 text-neo-black/30 hover:text-red-500 transition-colors"
          title="Delete"
        >
          {deleting ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Trash2 size={12} />
          )}
        </button>
      </div>

      {/* Form data */}
      <div className="space-y-1.5">
        {entries.map(([key, value]) => (
          <div key={key} className="flex gap-2">
            <span className="text-[10px] font-mono text-neo-black/40 uppercase w-16 flex-shrink-0 pt-0.5">
              {key}
            </span>
            <span className="text-xs font-mono text-neo-black/80 break-all">
              {String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FormSubmissionsPanel({ siteId, siteName, onClose }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [stats, setStats] = useState<FormStats | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const PAGE_SIZE = 10;

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [subRes, statsRes] = await Promise.all([
      getFormSubmissions(siteId, PAGE_SIZE, page * PAGE_SIZE),
      getFormStats(siteId),
    ]);
    setSubmissions(subRes.data);
    setTotalCount(subRes.count);
    setStats(statsRes);
    setLoading(false);
  }, [siteId, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleDelete(id: string) {
    setDeletingId(id);
    const ok = await deleteFormSubmission(id);
    if (ok) {
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      setTotalCount((prev) => prev - 1);
    }
    setDeletingId(null);
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-[#FFFDF5] border-2 border-neo-black rounded-lg w-full max-w-lg mx-4 shadow-hard max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-neo-black/10 sticky top-0 bg-[#FFFDF5] z-10">
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-neo-black" />
            <div>
              <h2 className="font-space font-semibold text-neo-black text-base">
                {t("dashboard.formSubmissions", "Form Submissions")}
              </h2>
              <p className="text-[10px] font-mono text-neo-black/40 truncate max-w-[200px]">
                {siteName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-1.5 text-neo-black/40 hover:text-neo-black transition-colors"
              title={t("dashboard.refresh", "Refresh")}
            >
              <RefreshCcw size={14} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neo-black/40 hover:text-neo-black transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-neo-black/30" size={28} />
            </div>
          ) : (
            <>
              {/* Quick stats */}
              {stats && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="border-2 border-neo-lime bg-neo-lime/10 rounded-lg p-3 text-center">
                    <Inbox size={14} className="mx-auto mb-1 text-neo-black" />
                    <p className="font-space font-bold text-xl text-neo-black">
                      {stats.total}
                    </p>
                    <p className="text-[10px] font-mono text-neo-black/50 uppercase tracking-wider">
                      Total
                    </p>
                  </div>
                  <div className="border-2 border-neo-black/10 rounded-lg p-3 text-center">
                    <Clock size={14} className="mx-auto mb-1 text-neo-black/40" />
                    <p className="font-space font-bold text-xl text-neo-black">
                      {stats.today}
                    </p>
                    <p className="text-[10px] font-mono text-neo-black/50 uppercase tracking-wider">
                      Today
                    </p>
                  </div>
                  <div className="border-2 border-neo-black/10 rounded-lg p-3 text-center">
                    <User size={14} className="mx-auto mb-1 text-neo-black/40" />
                    <p className="font-space font-bold text-xl text-neo-black">
                      {stats.thisWeek}
                    </p>
                    <p className="text-[10px] font-mono text-neo-black/50 uppercase tracking-wider">
                      This Week
                    </p>
                  </div>
                </div>
              )}

              {/* Submissions list */}
              {submissions.length === 0 ? (
                <div className="text-center py-12">
                  <Inbox size={32} className="mx-auto mb-3 text-neo-black/20" />
                  <p className="text-sm font-mono text-neo-black/40">
                    {t("dashboard.noSubmissions", "No form submissions yet")}
                  </p>
                  <p className="text-xs font-mono text-neo-black/25 mt-1">
                    {t(
                      "dashboard.noSubmissionsHint",
                      "Submissions will appear here when visitors fill out forms on your site.",
                    )}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.map((sub) => (
                    <SubmissionCard
                      key={sub.id}
                      sub={sub}
                      onDelete={handleDelete}
                      deleting={deletingId === sub.id}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="flex items-center gap-1 text-xs font-mono text-neo-black/50 hover:text-neo-black disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft size={14} /> Prev
                  </button>
                  <span className="text-[10px] font-mono text-neo-black/40">
                    Page {page + 1} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                    className="flex items-center gap-1 text-xs font-mono text-neo-black/50 hover:text-neo-black disabled:opacity-30 transition-colors"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
