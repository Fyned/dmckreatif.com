import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import {
  Plus,
  Pencil,
  Trash2,
  Globe,
  Clock,
  FileText,
  Loader2,
  Search,
  Copy,
  ExternalLink,
  Check,
  X,
  LayoutGrid,
  List,
  SlidersHorizontal,
  BarChart3,
  Eye,
  Mail,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  listUserSites,
  deleteSite,
  renameSite,
  duplicateSite,
} from "@/lib/user-sites";
import type { UserSite } from "@/lib/user-sites";
import { getPublishedUrl } from "@/lib/subdomain";
import { getQuickStats } from "@/lib/site-analytics";
import SiteAnalyticsPanel from "@/components/dashboard/SiteAnalyticsPanel";
import FormSubmissionsPanel from "@/components/dashboard/FormSubmissionsPanel";

/* ── helpers ─────────────────────────────────────── */

/** Status badge colors. */
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; label: string }> = {
    draft: {
      bg: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
      label: "Draft",
    },
    published: {
      bg: "bg-green-500/20 text-green-600 border-green-500/30",
      label: "Published",
    },
    unpublished: {
      bg: "bg-red-500/20 text-red-500 border-red-500/30",
      label: "Unpublished",
    },
  };
  const info = map[status] ?? map.draft;
  return (
    <span
      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${info.bg}`}
    >
      {info.label}
    </span>
  );
}

/** Format relative time. */
function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

/** Pretty template slug → label. */
function templateLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

type ViewMode = "grid" | "list";
type SortBy = "updated" | "name" | "status";
type FilterStatus = "all" | "draft" | "published" | "unpublished";

/* ── main component ──────────────────────────────── */

export default function MySitesPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [sites, setSites] = useState<UserSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [duplicating, setDuplicating] = useState<string | null>(null);

  // Rename state
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  // Analytics & Form submissions state
  const [analyticsSite, setAnalyticsSite] = useState<UserSite | null>(null);
  const [formSubmissionsSite, setFormSubmissionsSite] = useState<UserSite | null>(null);
  const [quickStats, setQuickStats] = useState<Record<string, { total: number; week: number }>>({});

  // Filters & search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortBy, setSortBy] = useState<SortBy>("updated");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  /* ── data fetching ──────────────────────────────── */

  const fetchSites = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const data = await listUserSites(user.id);
    setSites(data);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  // Fetch quick stats for published sites
  useEffect(() => {
    if (sites.length === 0) return;
    const published = sites.filter((s) => s.status === "published");
    if (published.length === 0) return;

    Promise.all(
      published.map(async (site) => {
        const qs = await getQuickStats(site.id);
        return { id: site.id, ...qs };
      }),
    ).then((results) => {
      const map: Record<string, { total: number; week: number }> = {};
      for (const r of results) {
        map[r.id] = { total: r.total, week: r.week };
      }
      setQuickStats(map);
    });
  }, [sites]);

  /* ── filtering & sorting ────────────────────────── */

  const filteredSites = useMemo(() => {
    let result = [...sites];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.project_name.toLowerCase().includes(q) ||
          s.template_slug.toLowerCase().includes(q) ||
          (s.subdomain && s.subdomain.toLowerCase().includes(q)),
      );
    }

    // Status filter
    if (filterStatus !== "all") {
      result = result.filter((s) => s.status === filterStatus);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.project_name.localeCompare(b.project_name);
        case "status":
          return a.status.localeCompare(b.status);
        case "updated":
        default:
          return (
            new Date(b.updated_at).getTime() -
            new Date(a.updated_at).getTime()
          );
      }
    });

    return result;
  }, [sites, searchQuery, filterStatus, sortBy]);

  /* ── stats ──────────────────────────────────────── */

  const stats = useMemo(() => {
    const total = sites.length;
    const published = sites.filter((s) => s.status === "published").length;
    const draft = sites.filter((s) => s.status === "draft").length;
    return { total, published, draft };
  }, [sites]);

  /* ── actions ────────────────────────────────────── */

  async function handleDelete(site: UserSite) {
    if (deleting) return;
    const confirmed = window.confirm(
      t(
        "dashboard.deleteSiteConfirm",
        `Delete "${site.project_name}"? This cannot be undone.`,
      ),
    );
    if (!confirmed) return;

    setDeleting(site.id);
    const ok = await deleteSite(site.id);
    if (ok) {
      setSites((prev) => prev.filter((s) => s.id !== site.id));
    }
    setDeleting(null);
  }

  async function handleDuplicate(site: UserSite) {
    if (!user || duplicating) return;
    setDuplicating(site.id);
    const newSite = await duplicateSite(site.id, user.id);
    if (newSite) {
      setSites((prev) => [newSite, ...prev]);
    }
    setDuplicating(null);
  }

  function handleEdit(site: UserSite) {
    navigate(`/${locale}/editor/${site.template_slug}?project=${site.id}`);
  }

  function handleNewSite() {
    navigate(`/${locale}/templates`);
  }

  function startRename(site: UserSite) {
    setRenamingId(site.id);
    setRenameValue(site.project_name);
  }

  async function confirmRename(siteId: string) {
    const trimmed = renameValue.trim();
    if (!trimmed) {
      setRenamingId(null);
      return;
    }
    const ok = await renameSite(siteId, trimmed);
    if (ok) {
      setSites((prev) =>
        prev.map((s) =>
          s.id === siteId ? { ...s, project_name: trimmed } : s,
        ),
      );
    }
    setRenamingId(null);
  }

  function cancelRename() {
    setRenamingId(null);
    setRenameValue("");
  }

  /* ── render ─────────────────────────────────────── */

  return (
    <>
      <Helmet>
        <title>{t("dashboard.mySites", "My Sites")} — DMC Kreatif</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-space font-bold text-2xl text-neo-black">
              {t("dashboard.mySites", "My Sites")}
            </h1>
            <p className="text-sm text-neo-black/60 font-mono mt-1">
              {t(
                "dashboard.mySitesDesc",
                "Manage your website projects",
              )}
            </p>
          </div>
          <button
            onClick={handleNewSite}
            className="flex items-center gap-2 bg-neo-lime border-2 border-neo-black px-4 py-2 font-mono text-sm font-semibold hover:bg-[#b8e645] transition-colors shadow-hard-sm"
          >
            <Plus size={16} />
            {t("dashboard.newSite", "New Site")}
          </button>
        </div>

        {/* Stats bar (only show when sites exist) */}
        {!loading && sites.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="border-2 border-neo-black/10 bg-white rounded-lg p-3 text-center">
              <p className="font-space font-bold text-xl text-neo-black">
                {stats.total}
              </p>
              <p className="text-[10px] font-mono text-neo-black/50 uppercase tracking-wider">
                {t("dashboard.totalSites", "Total Sites")}
              </p>
            </div>
            <div className="border-2 border-green-200 bg-green-50 rounded-lg p-3 text-center">
              <p className="font-space font-bold text-xl text-green-700">
                {stats.published}
              </p>
              <p className="text-[10px] font-mono text-green-600/70 uppercase tracking-wider">
                {t("dashboard.published", "Published")}
              </p>
            </div>
            <div className="border-2 border-yellow-200 bg-yellow-50 rounded-lg p-3 text-center">
              <p className="font-space font-bold text-xl text-yellow-700">
                {stats.draft}
              </p>
              <p className="text-[10px] font-mono text-yellow-600/70 uppercase tracking-wider">
                {t("dashboard.drafts", "Drafts")}
              </p>
            </div>
          </div>
        )}

        {/* Toolbar: search + filter + sort + view */}
        {!loading && sites.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neo-black/30"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(
                  "dashboard.searchSites",
                  "Search sites...",
                )}
                className="w-full pl-9 pr-3 py-2 border-2 border-neo-black/10 rounded-lg text-sm font-mono focus:border-neo-black/30 focus:outline-none transition-colors bg-white"
              />
            </div>

            {/* Status filter */}
            <div className="flex items-center gap-1 bg-white border-2 border-neo-black/10 rounded-lg p-0.5">
              {(
                [
                  ["all", "All"],
                  ["draft", "Draft"],
                  ["published", "Live"],
                  ["unpublished", "Off"],
                ] as const
              ).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setFilterStatus(val)}
                  className={`px-3 py-1.5 text-[11px] font-mono rounded-md transition-colors ${
                    filterStatus === val
                      ? "bg-neo-black text-white"
                      : "text-neo-black/50 hover:text-neo-black/80"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal size={13} className="text-neo-black/40" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="bg-white border-2 border-neo-black/10 rounded-lg px-2 py-1.5 text-[11px] font-mono focus:outline-none focus:border-neo-black/30"
              >
                <option value="updated">Recent</option>
                <option value="name">Name</option>
                <option value="status">Status</option>
              </select>
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-0.5 bg-white border-2 border-neo-black/10 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-neo-black text-white"
                    : "text-neo-black/40 hover:text-neo-black/70"
                }`}
                title="Grid view"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-neo-black text-white"
                    : "text-neo-black/40 hover:text-neo-black/70"
                }`}
                title="List view"
              >
                <List size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-neo-black/40" size={32} />
          </div>
        )}

        {/* Empty state */}
        {!loading && sites.length === 0 && (
          <div className="border-2 border-dashed border-neo-black/20 rounded-lg py-16 text-center">
            <FileText
              className="mx-auto mb-4 text-neo-black/30"
              size={48}
            />
            <h3 className="font-space font-semibold text-lg text-neo-black mb-2">
              {t("dashboard.noSites", "No sites yet")}
            </h3>
            <p className="text-sm text-neo-black/50 font-mono mb-6 max-w-md mx-auto">
              {t(
                "dashboard.noSitesDesc",
                "Pick a template and start building your website. Your projects will appear here.",
              )}
            </p>
            <button
              onClick={handleNewSite}
              className="inline-flex items-center gap-2 bg-neo-lime border-2 border-neo-black px-5 py-2.5 font-mono text-sm font-semibold hover:bg-[#b8e645] transition-colors shadow-hard-sm"
            >
              <Plus size={16} />
              {t("dashboard.browseTemplates", "Browse Templates")}
            </button>
          </div>
        )}

        {/* No results for search */}
        {!loading && sites.length > 0 && filteredSites.length === 0 && (
          <div className="border-2 border-dashed border-neo-black/10 rounded-lg py-12 text-center">
            <Search className="mx-auto mb-3 text-neo-black/20" size={32} />
            <p className="text-sm text-neo-black/50 font-mono">
              {t("dashboard.noResults", "No sites match your search")}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
              }}
              className="mt-3 text-xs font-mono text-neo-black/40 hover:text-neo-black/70 underline"
            >
              {t("dashboard.clearFilters", "Clear filters")}
            </button>
          </div>
        )}

        {/* ── GRID VIEW ──────────────────────────── */}
        {!loading &&
          filteredSites.length > 0 &&
          viewMode === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSites.map((site) => (
                <SiteCardGrid
                  key={site.id}
                  site={site}
                  locale={locale ?? "en"}
                  renamingId={renamingId}
                  renameValue={renameValue}
                  deleting={deleting}
                  duplicating={duplicating}
                  quickStats={quickStats[site.id]}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                  onStartRename={startRename}
                  onConfirmRename={confirmRename}
                  onCancelRename={cancelRename}
                  onRenameValueChange={setRenameValue}
                  onShowAnalytics={setAnalyticsSite}
                  onShowFormSubmissions={setFormSubmissionsSite}
                />
              ))}
            </div>
          )}

        {/* ── LIST VIEW ──────────────────────────── */}
        {!loading &&
          filteredSites.length > 0 &&
          viewMode === "list" && (
            <div className="flex flex-col gap-2">
              {filteredSites.map((site) => (
                <SiteCardList
                  key={site.id}
                  site={site}
                  locale={locale ?? "en"}
                  renamingId={renamingId}
                  renameValue={renameValue}
                  deleting={deleting}
                  duplicating={duplicating}
                  quickStats={quickStats[site.id]}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                  onStartRename={startRename}
                  onConfirmRename={confirmRename}
                  onCancelRename={cancelRename}
                  onRenameValueChange={setRenameValue}
                  onShowAnalytics={setAnalyticsSite}
                  onShowFormSubmissions={setFormSubmissionsSite}
                />
              ))}
            </div>
          )}
      </div>

      {/* Analytics panel overlay */}
      {analyticsSite && (
        <SiteAnalyticsPanel
          siteId={analyticsSite.id}
          siteName={analyticsSite.project_name}
          onClose={() => setAnalyticsSite(null)}
        />
      )}

      {/* Form submissions panel overlay */}
      {formSubmissionsSite && (
        <FormSubmissionsPanel
          siteId={formSubmissionsSite.id}
          siteName={formSubmissionsSite.project_name}
          onClose={() => setFormSubmissionsSite(null)}
        />
      )}
    </>
  );
}

/* ── Grid card ───────────────────────────────────── */

interface SiteCardProps {
  site: UserSite;
  locale: string;
  renamingId: string | null;
  renameValue: string;
  deleting: string | null;
  duplicating: string | null;
  quickStats?: { total: number; week: number };
  onEdit: (site: UserSite) => void;
  onDelete: (site: UserSite) => void;
  onDuplicate: (site: UserSite) => void;
  onStartRename: (site: UserSite) => void;
  onConfirmRename: (siteId: string) => void;
  onCancelRename: () => void;
  onRenameValueChange: (v: string) => void;
  onShowAnalytics: (site: UserSite) => void;
  onShowFormSubmissions: (site: UserSite) => void;
}

function SiteCardGrid({
  site,
  renamingId,
  renameValue,
  deleting,
  duplicating,
  quickStats,
  onEdit,
  onDelete,
  onDuplicate,
  onStartRename,
  onConfirmRename,
  onCancelRename,
  onRenameValueChange,
  onShowAnalytics,
  onShowFormSubmissions,
}: SiteCardProps) {
  const isRenaming = renamingId === site.id;

  return (
    <div className="border-2 border-neo-black/10 bg-white rounded-lg overflow-hidden hover:border-neo-black/30 transition-colors group">
      {/* Preview thumbnail */}
      <div
        className="h-36 bg-gradient-to-br from-[#f0f0f0] to-[#e4e4e4] flex items-center justify-center relative cursor-pointer"
        onClick={() => onEdit(site)}
      >
        <div className="text-center">
          <span className="font-mono text-[10px] text-neo-black/25 uppercase tracking-widest block">
            {templateLabel(site.template_slug)}
          </span>
          <span className="font-space font-bold text-sm text-neo-black/20 mt-1 block">
            {site.project_name.charAt(0)}
          </span>
        </div>

        {/* Status badge overlay */}
        <div className="absolute top-2 right-2">
          <StatusBadge status={site.status} />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-neo-black/0 group-hover:bg-neo-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
          <span className="bg-neo-black text-white text-[10px] font-mono px-3 py-1.5 rounded-full">
            Open Editor
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        {/* Name — editable */}
        {isRenaming ? (
          <div className="flex items-center gap-1.5 mb-1">
            <input
              type="text"
              value={renameValue}
              onChange={(e) => onRenameValueChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onConfirmRename(site.id);
                if (e.key === "Escape") onCancelRename();
              }}
              className="flex-1 font-space font-semibold text-sm text-neo-black border-b-2 border-neo-lime bg-transparent focus:outline-none px-0"
              autoFocus
            />
            <button
              onClick={() => onConfirmRename(site.id)}
              className="p-0.5 text-green-600 hover:text-green-700"
            >
              <Check size={14} />
            </button>
            <button
              onClick={onCancelRename}
              className="p-0.5 text-red-400 hover:text-red-500"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <h3
            className="font-space font-semibold text-sm text-neo-black truncate cursor-pointer hover:text-neo-black/70"
            onDoubleClick={() => onStartRename(site)}
            title="Double-click to rename"
          >
            {site.project_name}
          </h3>
        )}

        {/* Template label */}
        <p className="text-[10px] font-mono text-neo-black/35 mb-1.5">
          {templateLabel(site.template_slug)}
        </p>

        {/* Timestamps + quick stats */}
        <div className="flex items-center gap-3 text-[11px] text-neo-black/50 font-mono">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {timeAgo(site.updated_at)}
          </span>
          {quickStats && quickStats.total > 0 && (
            <span className="flex items-center gap-1 text-neo-black/60">
              <Eye size={11} />
              {quickStats.total.toLocaleString()}
            </span>
          )}
        </div>

        {/* Published URL */}
        {site.subdomain && site.status === "published" && (
          <a
            href={getPublishedUrl(site.subdomain)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 mt-1.5 text-[11px] text-green-600 font-mono hover:text-green-700 hover:underline"
          >
            <Globe size={11} />
            <span className="truncate">
              {site.subdomain}.dmckreatif.com
            </span>
            <ExternalLink size={9} className="flex-shrink-0" />
          </a>
        )}
      </div>

      {/* Actions */}
      <div className="px-3 pb-3 flex items-center gap-1.5">
        <button
          onClick={() => onEdit(site)}
          className="flex-1 flex items-center justify-center gap-1.5 bg-neo-black text-white text-xs font-mono py-2 rounded hover:bg-neo-black/80 transition-colors"
        >
          <Pencil size={12} />
          Edit
        </button>
        {site.status === "published" && (
          <>
            <button
              onClick={() => onShowAnalytics(site)}
              className="flex items-center justify-center p-2 border border-neo-lime/50 text-neo-black/50 rounded hover:bg-neo-lime/10 hover:text-neo-black/80 transition-colors"
              title="Analytics"
            >
              <BarChart3 size={14} />
            </button>
            <button
              onClick={() => onShowFormSubmissions(site)}
              className="flex items-center justify-center p-2 border border-neo-black/15 text-neo-black/50 rounded hover:bg-neo-black/5 hover:text-neo-black/80 transition-colors"
              title="Form Submissions"
            >
              <Mail size={14} />
            </button>
          </>
        )}
        <button
          onClick={() => onDuplicate(site)}
          disabled={duplicating === site.id}
          className="flex items-center justify-center p-2 border border-neo-black/15 text-neo-black/50 rounded hover:bg-neo-black/5 hover:text-neo-black/80 transition-colors disabled:opacity-50"
          title="Duplicate"
        >
          {duplicating === site.id ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Copy size={14} />
          )}
        </button>
        <button
          onClick={() => onDelete(site)}
          disabled={deleting === site.id}
          className="flex items-center justify-center p-2 border border-red-200 text-red-400 rounded hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
          title="Delete"
        >
          {deleting === site.id ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Trash2 size={14} />
          )}
        </button>
      </div>
    </div>
  );
}

/* ── List card ───────────────────────────────────── */

function SiteCardList({
  site,
  renamingId,
  renameValue,
  deleting,
  duplicating,
  quickStats,
  onEdit,
  onDelete,
  onDuplicate,
  onStartRename,
  onConfirmRename,
  onCancelRename,
  onRenameValueChange,
  onShowAnalytics,
  onShowFormSubmissions,
}: SiteCardProps) {
  const isRenaming = renamingId === site.id;

  return (
    <div className="border-2 border-neo-black/10 bg-white rounded-lg hover:border-neo-black/20 transition-colors flex items-center gap-4 px-4 py-3">
      {/* Template icon / initial */}
      <div
        className="w-10 h-10 bg-gradient-to-br from-[#f0f0f0] to-[#e4e4e4] rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer"
        onClick={() => onEdit(site)}
      >
        <span className="font-space font-bold text-sm text-neo-black/25">
          {site.project_name.charAt(0)}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {isRenaming ? (
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={renameValue}
                onChange={(e) => onRenameValueChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onConfirmRename(site.id);
                  if (e.key === "Escape") onCancelRename();
                }}
                className="font-space font-semibold text-sm text-neo-black border-b-2 border-neo-lime bg-transparent focus:outline-none px-0 w-48"
                autoFocus
              />
              <button
                onClick={() => onConfirmRename(site.id)}
                className="p-0.5 text-green-600 hover:text-green-700"
              >
                <Check size={13} />
              </button>
              <button
                onClick={onCancelRename}
                className="p-0.5 text-red-400 hover:text-red-500"
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <h3
              className="font-space font-semibold text-sm text-neo-black truncate cursor-pointer hover:text-neo-black/70"
              onDoubleClick={() => onStartRename(site)}
              title="Double-click to rename"
            >
              {site.project_name}
            </h3>
          )}
          <StatusBadge status={site.status} />
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-[10px] font-mono text-neo-black/35">
            {templateLabel(site.template_slug)}
          </span>
          <span className="text-[10px] font-mono text-neo-black/30 flex items-center gap-1">
            <Clock size={10} />
            {timeAgo(site.updated_at)}
          </span>
          {quickStats && quickStats.total > 0 && (
            <span className="text-[10px] font-mono text-neo-black/40 flex items-center gap-1">
              <Eye size={10} />
              {quickStats.total.toLocaleString()} views
            </span>
          )}
          {site.subdomain && site.status === "published" && (
            <a
              href={getPublishedUrl(site.subdomain)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-green-600 hover:text-green-700 hover:underline flex items-center gap-1"
            >
              <Globe size={10} />
              {site.subdomain}.dmckreatif.com
              <ExternalLink size={8} />
            </a>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={() => onEdit(site)}
          className="flex items-center gap-1.5 bg-neo-black text-white text-[11px] font-mono px-3 py-1.5 rounded hover:bg-neo-black/80 transition-colors"
        >
          <Pencil size={11} />
          Edit
        </button>
        {site.status === "published" && (
          <>
            <button
              onClick={() => onShowAnalytics(site)}
              className="p-1.5 border border-neo-lime/50 text-neo-black/50 rounded hover:bg-neo-lime/10 hover:text-neo-black/80 transition-colors"
              title="Analytics"
            >
              <BarChart3 size={13} />
            </button>
            <button
              onClick={() => onShowFormSubmissions(site)}
              className="p-1.5 border border-neo-black/15 text-neo-black/50 rounded hover:bg-neo-black/5 hover:text-neo-black/80 transition-colors"
              title="Form Submissions"
            >
              <Mail size={13} />
            </button>
          </>
        )}
        <button
          onClick={() => onDuplicate(site)}
          disabled={duplicating === site.id}
          className="p-1.5 border border-neo-black/15 text-neo-black/50 rounded hover:bg-neo-black/5 hover:text-neo-black/80 transition-colors disabled:opacity-50"
          title="Duplicate"
        >
          {duplicating === site.id ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Copy size={13} />
          )}
        </button>
        <button
          onClick={() => onDelete(site)}
          disabled={deleting === site.id}
          className="p-1.5 border border-red-200 text-red-400 rounded hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
          title="Delete"
        >
          {deleting === site.id ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Trash2 size={13} />
          )}
        </button>
      </div>
    </div>
  );
}
