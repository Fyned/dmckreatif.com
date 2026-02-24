import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart3,
  Eye,
  TrendingUp,
  Calendar,
  Globe,
  Link2,
  X,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import type {
  SiteStats,
  DailyVisit,
  ReferrerStats,
  CountryStats,
} from "@/lib/site-analytics";
import {
  getSiteStats,
  getDailyVisits,
  getTopReferrers,
  getTopCountries,
} from "@/lib/site-analytics";

interface Props {
  siteId: string;
  siteName: string;
  onClose: () => void;
}

/** Tiny stat card used in the top row. */
function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accent?: boolean;
}) {
  return (
    <div
      className={`border-2 rounded-lg p-3 text-center ${
        accent
          ? "border-neo-lime bg-neo-lime/10"
          : "border-neo-black/10 bg-white"
      }`}
    >
      <Icon
        size={14}
        className={`mx-auto mb-1 ${accent ? "text-neo-black" : "text-neo-black/40"}`}
      />
      <p className="font-space font-bold text-xl text-neo-black">{value.toLocaleString()}</p>
      <p className="text-[10px] font-mono text-neo-black/50 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

/** Simple ASCII-style bar chart using div widths. */
function MiniBarChart({ data }: { data: DailyVisit[] }) {
  if (data.length === 0) {
    return (
      <p className="text-xs font-mono text-neo-black/30 text-center py-6">
        No data yet
      </p>
    );
  }

  const maxViews = Math.max(...data.map((d) => d.views), 1);

  // Only show last 14 days for compact display
  const recent = data.slice(-14);

  return (
    <div className="flex items-end gap-[3px] h-24">
      {recent.map((d) => {
        const height = Math.max((d.views / maxViews) * 100, 2);
        const dayLabel = new Date(d.date + "T00:00:00").toLocaleDateString(
          undefined,
          { weekday: "narrow" },
        );
        return (
          <div
            key={d.date}
            className="flex-1 flex flex-col items-center gap-0.5"
            title={`${d.date}: ${d.views} views`}
          >
            <div
              className="w-full bg-neo-lime/80 rounded-t-sm hover:bg-neo-lime transition-colors cursor-default min-h-[2px]"
              style={{ height: `${height}%` }}
            />
            <span className="text-[8px] font-mono text-neo-black/30">
              {dayLabel}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Top-list (referrers or countries). */
function TopList({
  items,
  icon: Icon,
  emptyText,
}: {
  items: { label: string; count: number }[];
  icon: React.ElementType;
  emptyText: string;
}) {
  if (items.length === 0) {
    return (
      <p className="text-xs font-mono text-neo-black/30 py-3">{emptyText}</p>
    );
  }
  const max = items[0]?.count ?? 1;

  return (
    <div className="space-y-1.5">
      {items.slice(0, 5).map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <Icon size={11} className="text-neo-black/30 flex-shrink-0" />
          <span className="text-xs font-mono text-neo-black/70 truncate flex-1">
            {item.label}
          </span>
          <div className="w-20 h-1.5 bg-neo-black/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-neo-lime rounded-full"
              style={{ width: `${(item.count / max) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-neo-black/40 tabular-nums w-8 text-right">
            {item.count}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SiteAnalyticsPanel({ siteId, siteName, onClose }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [daily, setDaily] = useState<DailyVisit[]>([]);
  const [referrers, setReferrers] = useState<ReferrerStats[]>([]);
  const [countries, setCountries] = useState<CountryStats[]>([]);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    const [s, d, r, c] = await Promise.all([
      getSiteStats(siteId),
      getDailyVisits(siteId, 30),
      getTopReferrers(siteId, 5),
      getTopCountries(siteId, 5),
    ]);
    setStats(s);
    setDaily(d);
    setReferrers(r);
    setCountries(c);
    setLoading(false);
  }, [siteId]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

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
            <BarChart3 size={18} className="text-neo-black" />
            <div>
              <h2 className="font-space font-semibold text-neo-black text-base">
                {t("dashboard.analytics", "Analytics")}
              </h2>
              <p className="text-[10px] font-mono text-neo-black/40 truncate max-w-[200px]">
                {siteName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={fetchAnalytics}
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
        <div className="px-5 py-4 space-y-5">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-neo-black/30" size={28} />
            </div>
          ) : (
            <>
              {/* Stat cards */}
              <div className="grid grid-cols-4 gap-2">
                <StatCard
                  label={t("dashboard.totalViews", "Total")}
                  value={stats?.totalViews ?? 0}
                  icon={Eye}
                  accent
                />
                <StatCard
                  label={t("dashboard.today", "Today")}
                  value={stats?.today ?? 0}
                  icon={Calendar}
                />
                <StatCard
                  label={t("dashboard.last7", "7 Days")}
                  value={stats?.last7Days ?? 0}
                  icon={TrendingUp}
                />
                <StatCard
                  label={t("dashboard.last30", "30 Days")}
                  value={stats?.last30Days ?? 0}
                  icon={BarChart3}
                />
              </div>

              {/* Daily chart */}
              <div>
                <h3 className="text-[10px] font-mono text-neo-black/50 uppercase tracking-wider mb-2">
                  {t("dashboard.dailyVisits", "Daily Visits")} — {t("dashboard.last14Days", "Last 14 Days")}
                </h3>
                <div className="border-2 border-neo-black/10 rounded-lg p-3 bg-white">
                  <MiniBarChart data={daily} />
                </div>
              </div>

              {/* Referrers + Countries side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h3 className="text-[10px] font-mono text-neo-black/50 uppercase tracking-wider mb-2">
                    {t("dashboard.topReferrers", "Top Referrers")}
                  </h3>
                  <div className="border-2 border-neo-black/10 rounded-lg p-3 bg-white">
                    <TopList
                      items={referrers.map((r) => ({
                        label: r.source,
                        count: r.count,
                      }))}
                      icon={Link2}
                      emptyText="No referrers yet"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-mono text-neo-black/50 uppercase tracking-wider mb-2">
                    {t("dashboard.topCountries", "Top Countries")}
                  </h3>
                  <div className="border-2 border-neo-black/10 rounded-lg p-3 bg-white">
                    <TopList
                      items={countries.map((c) => ({
                        label: c.country,
                        count: c.count,
                      }))}
                      icon={Globe}
                      emptyText="No data yet"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
