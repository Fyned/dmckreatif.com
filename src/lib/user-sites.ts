import { supabase } from "@/lib/supabase";
import type { BusinessInfo } from "@/lib/template-placeholders";
import type { Editor } from "grapesjs";
import { getProjectJson, exportFullHtml } from "@/lib/grapesjs-utils";

/** Shape of a row in the user_projects table. */
export interface UserSite {
  id: string;
  user_id: string;
  template_slug: string;
  template_id: string | null;
  project_name: string;
  grapesjs_data: Record<string, unknown>;
  custom_html: string | null;
  custom_css: string | null;
  business_info: Partial<BusinessInfo>;
  seo_settings: Record<string, unknown>;
  status: "draft" | "published" | "unpublished";
  published_html: string | null;
  published_at: string | null;
  subdomain: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

/** Create a new site from a template. Returns the new site. */
export async function createSite(
  userId: string,
  templateSlug: string,
  projectName: string,
  editor: Editor,
  businessInfo?: Partial<BusinessInfo>,
): Promise<UserSite | null> {
  const grapesData = getProjectJson(editor);
  const html = exportFullHtml(editor);

  const { data, error } = await supabase
    .from("user_projects")
    .insert({
      user_id: userId,
      template_slug: templateSlug,
      project_name: projectName,
      grapesjs_data: grapesData,
      custom_html: html,
      business_info: businessInfo ?? {},
      status: "draft",
    })
    .select("*")
    .single();

  if (error) {
    console.error("[user-sites] createSite error:", error.message);
    return null;
  }
  return data as unknown as UserSite;
}

/** Save (update) an existing site. */
export async function saveSite(
  siteId: string,
  editor: Editor,
  businessInfo?: Partial<BusinessInfo>,
  seoSettings?: Record<string, unknown>,
): Promise<boolean> {
  const grapesData = getProjectJson(editor);
  const html = exportFullHtml(editor);

  const payload: Record<string, unknown> = {
    grapesjs_data: grapesData,
    custom_html: html,
    updated_at: new Date().toISOString(),
  };

  if (businessInfo) {
    payload.business_info = businessInfo;
  }

  if (seoSettings) {
    payload.seo_settings = seoSettings;
  }

  const { error } = await supabase
    .from("user_projects")
    .update(payload)
    .eq("id", siteId);

  if (error) {
    console.error("[user-sites] saveSite error:", error.message);
    return false;
  }
  return true;
}

/** Load a single site by ID. */
export async function loadSite(siteId: string): Promise<UserSite | null> {
  const { data, error } = await supabase
    .from("user_projects")
    .select("*")
    .eq("id", siteId)
    .single();

  if (error || !data) return null;
  return data as unknown as UserSite;
}

/** List all sites for a user, newest first. */
export async function listUserSites(userId: string): Promise<UserSite[]> {
  const { data, error } = await supabase
    .from("user_projects")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return data as unknown as UserSite[];
}

/** Delete a site by ID. */
export async function deleteSite(siteId: string): Promise<boolean> {
  const { error } = await supabase
    .from("user_projects")
    .delete()
    .eq("id", siteId);

  if (error) {
    console.error("[user-sites] deleteSite error:", error.message);
    return false;
  }
  return true;
}

/** Rename a site. */
export async function renameSite(
  siteId: string,
  newName: string,
): Promise<boolean> {
  const { error } = await supabase
    .from("user_projects")
    .update({ project_name: newName, updated_at: new Date().toISOString() })
    .eq("id", siteId);

  if (error) return false;
  return true;
}

/**
 * Store the published HTML for a site.
 * This saves the final, export-ready HTML that can be served as a static page.
 */
export async function savePublishedHtml(
  siteId: string,
  publishedHtml: string,
): Promise<boolean> {
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("user_projects")
    .update({
      published_html: publishedHtml,
      published_at: now,
      updated_at: now,
    })
    .eq("id", siteId);

  if (error) {
    console.error("[user-sites] savePublishedHtml error:", error.message);
    return false;
  }
  return true;
}

/**
 * Duplicate a site — creates a new draft copy with "(Copy)" appended to the name.
 */
export async function duplicateSite(
  siteId: string,
  userId: string,
): Promise<UserSite | null> {
  // 1. Load the original site
  const original = await loadSite(siteId);
  if (!original) return null;

  // 2. Insert a copy
  const { data, error } = await supabase
    .from("user_projects")
    .insert({
      user_id: userId,
      template_slug: original.template_slug,
      template_id: original.template_id,
      project_name: `${original.project_name} (Copy)`,
      grapesjs_data: original.grapesjs_data,
      custom_html: original.custom_html,
      custom_css: original.custom_css,
      business_info: original.business_info,
      seo_settings: original.seo_settings,
      status: "draft",
    })
    .select("*")
    .single();

  if (error) {
    console.error("[user-sites] duplicateSite error:", error.message);
    return null;
  }
  return data as unknown as UserSite;
}

/**
 * Update the SEO settings for a site.
 */
export async function updateSeoSettings(
  siteId: string,
  seoSettings: Record<string, unknown>,
): Promise<boolean> {
  const { error } = await supabase
    .from("user_projects")
    .update({
      seo_settings: seoSettings,
      updated_at: new Date().toISOString(),
    })
    .eq("id", siteId);

  if (error) {
    console.error("[user-sites] updateSeoSettings error:", error.message);
    return false;
  }
  return true;
}
