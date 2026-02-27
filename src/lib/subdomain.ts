import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

/** Storage bucket name for published HTML sites in Supabase. */
const PUBLISHED_BUCKET = "published-sites";

/** Reserved subdomains that cannot be claimed by users. */
const RESERVED_SUBDOMAINS = new Set([
  "www",
  "admin",
  "api",
  "app",
  "mail",
  "smtp",
  "ftp",
  "blog",
  "shop",
  "store",
  "help",
  "support",
  "status",
  "cdn",
  "static",
  "assets",
  "media",
  "img",
  "images",
  "test",
  "dev",
  "staging",
  "demo",
  "preview",
  "editor",
  "dashboard",
  "login",
  "register",
  "account",
  "settings",
  "billing",
  "docs",
  "templates",
]);

/**
 * Validate a subdomain string.
 * Rules: 3-30 chars, lowercase alphanumeric + hyphens, must start/end with alphanum.
 */
export function isValidSubdomain(name: string): boolean {
  return /^[a-z0-9]([a-z0-9-]{1,28}[a-z0-9])?$/.test(name) && name.length >= 3;
}

/** Check if a subdomain is reserved by the system. */
export function isReservedSubdomain(name: string): boolean {
  return RESERVED_SUBDOMAINS.has(name.toLowerCase());
}

/** Sanitize user input into a valid subdomain candidate. */
export function sanitizeSubdomain(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);
}

export interface SubdomainCheckResult {
  available: boolean;
  reason?: "invalid" | "reserved" | "taken" | "own";
}

/**
 * Check if a subdomain is available for use.
 * Returns availability status and reason if unavailable.
 */
export async function checkSubdomainAvailability(
  subdomain: string,
  currentSiteId?: string,
): Promise<SubdomainCheckResult> {
  // Validate format
  if (!isValidSubdomain(subdomain)) {
    return { available: false, reason: "invalid" };
  }

  // Check reserved list
  if (isReservedSubdomain(subdomain)) {
    return { available: false, reason: "reserved" };
  }

  // Check database for existing usage
  const { data, error } = await supabase
    .from("user_projects")
    .select("id")
    .eq("subdomain", subdomain)
    .limit(1);

  if (error) {
    // On error, assume taken to be safe
    return { available: false, reason: "taken" };
  }

  if (data && data.length > 0) {
    // If the subdomain belongs to the current site, it's "own"
    if (currentSiteId && data[0].id === currentSiteId) {
      return { available: true, reason: "own" };
    }
    return { available: false, reason: "taken" };
  }

  return { available: true };
}

/**
 * Upload the published HTML to Supabase Storage.
 * Stores as `{subdomain}/index.html` in the `published-sites` bucket.
 */
async function uploadPublishedHtml(
  subdomain: string,
  htmlContent: string,
): Promise<boolean> {
  const filePath = `${subdomain}/index.html`;
  const blob = new Blob([htmlContent], { type: "text/html" });

  // Try upsert — overwrite if file already exists
  const { error } = await supabase.storage
    .from(PUBLISHED_BUCKET)
    .upload(filePath, blob, {
      contentType: "text/html",
      upsert: true,
      cacheControl: "public, max-age=300",
    });

  if (error) {
    logger.error("subdomain", "uploadPublishedHtml error:", error.message);
    return false;
  }
  return true;
}

/**
 * Remove the published HTML from Supabase Storage.
 */
async function removePublishedHtml(subdomain: string): Promise<boolean> {
  const filePath = `${subdomain}/index.html`;

  const { error } = await supabase.storage
    .from(PUBLISHED_BUCKET)
    .remove([filePath]);

  if (error) {
    logger.error("subdomain", "removePublishedHtml error:", error.message);
    return false;
  }
  return true;
}

/**
 * Claim a subdomain for a site and publish it.
 * 1. Uploads the HTML to Supabase Storage (publicly accessible).
 * 2. Updates the database record with subdomain and status.
 */
export async function publishSite(
  siteId: string,
  subdomain: string,
  publishedHtml: string,
): Promise<boolean> {
  // Step 1: Upload HTML to Storage
  const uploaded = await uploadPublishedHtml(subdomain, publishedHtml);
  if (!uploaded) return false;

  // Step 2: Update database record
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("user_projects")
    .update({
      subdomain,
      published_html: publishedHtml,
      published_at: now,
      status: "published",
      updated_at: now,
    })
    .eq("id", siteId);

  if (error) {
    logger.error("subdomain", "publishSite DB error:", error.message);
    // Attempt to roll back storage upload
    await removePublishedHtml(subdomain);
    return false;
  }
  return true;
}

/**
 * Unpublish a site — remove from Storage and clear subdomain in DB.
 */
export async function unpublishSite(siteId: string): Promise<boolean> {
  // First get the current subdomain so we can remove the file
  const { data: site } = await supabase
    .from("user_projects")
    .select("subdomain")
    .eq("id", siteId)
    .single();

  const currentSubdomain = site?.subdomain;

  // Remove from Storage if we have a subdomain
  if (currentSubdomain) {
    await removePublishedHtml(currentSubdomain);
  }

  // Update database
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("user_projects")
    .update({
      subdomain: null,
      status: "unpublished",
      updated_at: now,
    })
    .eq("id", siteId);

  if (error) {
    logger.error("subdomain", "unpublishSite error:", error.message);
    return false;
  }
  return true;
}

/**
 * Generate the full published URL for a subdomain.
 *
 * Supabase Storage forces text/plain for HTML files (XSS prevention),
 * so we serve published sites through the app's /site/:subdomain route
 * which renders the HTML in a full-viewport iframe via srcdoc.
 *
 * In production this becomes: https://dmckreatif.com/site/{subdomain}
 * In development: http://localhost:5175/site/{subdomain}
 */
export function getPublishedUrl(subdomain: string): string {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/site/${subdomain}`;
}
