import { supabase } from "@/lib/supabase";

/** Summary stats for a single site. */
export interface SiteStats {
  totalViews: number;
  last7Days: number;
  last30Days: number;
  today: number;
}

/** Daily breakdown for charts. */
export interface DailyVisit {
  date: string; // YYYY-MM-DD
  views: number;
}

/** Referrer source breakdown. */
export interface ReferrerStats {
  source: string;
  count: number;
}

/** Country breakdown. */
export interface CountryStats {
  country: string;
  count: number;
}

/**
 * Get summary stats for a single site.
 */
export async function getSiteStats(siteId: string): Promise<SiteStats> {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const d7 = new Date(now.getTime() - 7 * 86400000).toISOString();
  const d30 = new Date(now.getTime() - 30 * 86400000).toISOString();

  // Total views
  const { count: totalViews } = await supabase
    .from("site_visits")
    .select("*", { count: "exact", head: true })
    .eq("site_id", siteId);

  // Last 7 days
  const { count: last7Days } = await supabase
    .from("site_visits")
    .select("*", { count: "exact", head: true })
    .eq("site_id", siteId)
    .gte("created_at", d7);

  // Last 30 days
  const { count: last30Days } = await supabase
    .from("site_visits")
    .select("*", { count: "exact", head: true })
    .eq("site_id", siteId)
    .gte("created_at", d30);

  // Today
  const { count: todayViews } = await supabase
    .from("site_visits")
    .select("*", { count: "exact", head: true })
    .eq("site_id", siteId)
    .gte("created_at", today);

  return {
    totalViews: totalViews ?? 0,
    last7Days: last7Days ?? 0,
    last30Days: last30Days ?? 0,
    today: todayViews ?? 0,
  };
}

/**
 * Get quick view count for a site (used in site cards).
 * Returns total views and last-7-day views.
 */
export async function getQuickStats(
  siteId: string,
): Promise<{ total: number; week: number }> {
  const d7 = new Date(Date.now() - 7 * 86400000).toISOString();

  const [totalRes, weekRes] = await Promise.all([
    supabase
      .from("site_visits")
      .select("*", { count: "exact", head: true })
      .eq("site_id", siteId),
    supabase
      .from("site_visits")
      .select("*", { count: "exact", head: true })
      .eq("site_id", siteId)
      .gte("created_at", d7),
  ]);

  return {
    total: totalRes.count ?? 0,
    week: weekRes.count ?? 0,
  };
}

/**
 * Get daily visit counts for the last N days.
 */
export async function getDailyVisits(
  siteId: string,
  days = 30,
): Promise<DailyVisit[]> {
  const since = new Date(Date.now() - days * 86400000).toISOString();

  const { data, error } = await supabase
    .from("site_visits")
    .select("created_at")
    .eq("site_id", siteId)
    .gte("created_at", since)
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  // Group by date
  const byDate: Record<string, number> = {};
  for (const row of data) {
    const date = row.created_at.slice(0, 10); // YYYY-MM-DD
    byDate[date] = (byDate[date] || 0) + 1;
  }

  // Fill in missing days with 0
  const result: DailyVisit[] = [];
  const start = new Date(Date.now() - days * 86400000);
  for (let i = 0; i < days; i++) {
    const d = new Date(start.getTime() + i * 86400000);
    const dateStr = d.toISOString().slice(0, 10);
    result.push({ date: dateStr, views: byDate[dateStr] || 0 });
  }

  return result;
}

/**
 * Get top referrer sources.
 */
export async function getTopReferrers(
  siteId: string,
  limit = 10,
): Promise<ReferrerStats[]> {
  const d30 = new Date(Date.now() - 30 * 86400000).toISOString();

  const { data, error } = await supabase
    .from("site_visits")
    .select("referrer")
    .eq("site_id", siteId)
    .gte("created_at", d30)
    .not("referrer", "is", null)
    .not("referrer", "eq", "");

  if (error || !data) return [];

  // Parse hostnames from referrer URLs
  const counts: Record<string, number> = {};
  for (const row of data) {
    let source = "Direct";
    try {
      if (row.referrer) {
        const url = new URL(row.referrer);
        source = url.hostname.replace("www.", "");
      }
    } catch {
      source = row.referrer || "Direct";
    }
    counts[source] = (counts[source] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Get top countries.
 */
export async function getTopCountries(
  siteId: string,
  limit = 10,
): Promise<CountryStats[]> {
  const d30 = new Date(Date.now() - 30 * 86400000).toISOString();

  const { data, error } = await supabase
    .from("site_visits")
    .select("country")
    .eq("site_id", siteId)
    .gte("created_at", d30)
    .not("country", "is", null);

  if (error || !data) return [];

  const counts: Record<string, number> = {};
  for (const row of data) {
    const c = row.country || "Unknown";
    counts[c] = (counts[c] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
