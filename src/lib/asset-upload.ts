import { supabase } from "@/lib/supabase";

/** Storage bucket name for user-uploaded assets. */
const ASSETS_BUCKET = "site-assets";

/** Supabase project ref — used to construct public URLs. */
const SUPABASE_PROJECT_REF = "mjewxaphcmricetqpejv";

/** Maximum file size in bytes (5 MB). */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

/** Accepted image MIME types. */
export const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
] as const;

export interface UploadedAsset {
  /** Public URL of the uploaded image. */
  url: string;
  /** Storage path inside the bucket. */
  path: string;
  /** Original filename. */
  name: string;
  /** File size in bytes. */
  size: number;
  /** MIME type. */
  type: string;
}

/**
 * Generate a unique filename to prevent collisions.
 * Format: {timestamp}-{random}-{sanitized-name}
 */
function uniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  const sanitized = originalName
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
  return `${timestamp}-${random}-${sanitized}`;
}

/**
 * Validate a file before upload.
 * Returns an error message string or null if valid.
 */
export function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return `File too large (${sizeMB} MB). Maximum is 5 MB.`;
  }

  if (!ACCEPTED_TYPES.includes(file.type as (typeof ACCEPTED_TYPES)[number])) {
    return `Unsupported file type: ${file.type}. Use JPEG, PNG, GIF, WebP, or SVG.`;
  }

  return null;
}

/**
 * Build the public URL for a file in the site-assets bucket.
 */
function publicUrl(path: string): string {
  return `https://${SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/${ASSETS_BUCKET}/${path}`;
}

/**
 * Upload a single image file to Supabase Storage.
 *
 * Files are stored under: `{userId}/{projectId}/{filename}`
 * This matches the RLS policy that checks foldername[1] === auth.uid.
 */
export async function uploadAsset(
  file: File,
  userId: string,
  projectId: string,
): Promise<UploadedAsset> {
  const validationError = validateFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const filename = uniqueFilename(file.name);
  const storagePath = `${userId}/${projectId}/${filename}`;

  const { error } = await supabase.storage
    .from(ASSETS_BUCKET)
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: false,
      cacheControl: "public, max-age=31536000", // 1 year cache (immutable filename)
    });

  if (error) {
    console.error("[asset-upload] upload error:", error.message);
    throw new Error(`Upload failed: ${error.message}`);
  }

  return {
    url: publicUrl(storagePath),
    path: storagePath,
    name: file.name,
    size: file.size,
    type: file.type,
  };
}

/**
 * Upload multiple image files in parallel.
 * Returns an array of successfully uploaded assets.
 * Failed uploads are logged but don't block others.
 */
export async function uploadMultipleAssets(
  files: File[],
  userId: string,
  projectId: string,
): Promise<UploadedAsset[]> {
  const results = await Promise.allSettled(
    files.map((f) => uploadAsset(f, userId, projectId)),
  );

  const uploaded: UploadedAsset[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      uploaded.push(result.value);
    } else {
      console.warn("[asset-upload] file failed:", result.reason);
    }
  }
  return uploaded;
}

/**
 * List all assets for a project.
 * Returns public URLs for each file.
 */
export async function listProjectAssets(
  userId: string,
  projectId: string,
): Promise<UploadedAsset[]> {
  const folderPath = `${userId}/${projectId}`;

  const { data, error } = await supabase.storage
    .from(ASSETS_BUCKET)
    .list(folderPath, {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });

  if (error) {
    console.error("[asset-upload] list error:", error.message);
    return [];
  }

  return (data || [])
    .filter((f) => !f.name.startsWith(".")) // skip hidden files
    .map((f) => ({
      url: publicUrl(`${folderPath}/${f.name}`),
      path: `${folderPath}/${f.name}`,
      name: f.name,
      size: f.metadata?.size ?? 0,
      type: f.metadata?.mimetype ?? "image/jpeg",
    }));
}

/**
 * Delete an asset from Supabase Storage.
 */
export async function deleteAsset(path: string): Promise<boolean> {
  const { error } = await supabase.storage
    .from(ASSETS_BUCKET)
    .remove([path]);

  if (error) {
    console.error("[asset-upload] delete error:", error.message);
    return false;
  }
  return true;
}
