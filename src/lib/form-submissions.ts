import { supabase } from "@/lib/supabase";

/** A single form submission record. */
export interface FormSubmission {
  id: string;
  site_id: string;
  form_name: string;
  form_data: Record<string, string>;
  created_at: string;
}

/** Summary stats for a site's form submissions. */
export interface FormStats {
  total: number;
  today: number;
  thisWeek: number;
}

/**
 * Fetch form submissions for a specific site.
 * Returns newest first, up to `limit` records.
 */
export async function getFormSubmissions(
  siteId: string,
  limit = 50,
  offset = 0,
): Promise<{ data: FormSubmission[]; count: number }> {
  const { data, error, count } = await supabase
    .from("site_form_submissions")
    .select("*", { count: "exact" })
    .eq("site_id", siteId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("getFormSubmissions error:", error);
    return { data: [], count: 0 };
  }

  return { data: (data ?? []) as FormSubmission[], count: count ?? 0 };
}

/**
 * Get quick stats for a site's form submissions.
 */
export async function getFormStats(siteId: string): Promise<FormStats> {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [totalRes, todayRes, weekRes] = await Promise.all([
    supabase
      .from("site_form_submissions")
      .select("id", { count: "exact", head: true })
      .eq("site_id", siteId),
    supabase
      .from("site_form_submissions")
      .select("id", { count: "exact", head: true })
      .eq("site_id", siteId)
      .gte("created_at", todayStart),
    supabase
      .from("site_form_submissions")
      .select("id", { count: "exact", head: true })
      .eq("site_id", siteId)
      .gte("created_at", weekAgo),
  ]);

  return {
    total: totalRes.count ?? 0,
    today: todayRes.count ?? 0,
    thisWeek: weekRes.count ?? 0,
  };
}

/**
 * Delete a single form submission.
 */
export async function deleteFormSubmission(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("site_form_submissions")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("deleteFormSubmission error:", error);
    return false;
  }
  return true;
}

/**
 * Get form submission counts per site (for dashboard quick view).
 */
export async function getFormCountsForSites(
  siteIds: string[],
): Promise<Record<string, number>> {
  if (siteIds.length === 0) return {};

  const { data, error } = await supabase
    .from("site_form_submissions")
    .select("site_id")
    .in("site_id", siteIds);

  if (error) {
    console.error("getFormCountsForSites error:", error);
    return {};
  }

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.site_id] = (counts[row.site_id] || 0) + 1;
  }
  return counts;
}
