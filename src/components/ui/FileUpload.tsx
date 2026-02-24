import { useState, useRef, useCallback } from "react";
import { Upload, Loader2, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface FileUploadProps {
  bucket: string;
  path: string;
  accept?: string;
  maxSizeMB?: number;
  onUpload: (url: string) => void;
  label?: string;
  hint?: string;
  preview?: string | null;
}

type UploadState = "idle" | "uploading" | "error";

export default function FileUpload({
  bucket,
  path,
  accept = "image/*",
  maxSizeMB = 5,
  onUpload,
  label,
  hint,
  preview = null,
}: FileUploadProps) {
  const [state, setState] = useState<UploadState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(preview);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const maxBytes = maxSizeMB * 1024 * 1024;

  const handleFile = useCallback(
    async (file: File) => {
      setErrorMsg("");

      /* Validate size */
      if (file.size > maxBytes) {
        setErrorMsg(`File exceeds ${maxSizeMB}MB limit`);
        setState("error");
        return;
      }

      setState("uploading");

      /* Generate unique filename */
      const ext = file.name.split(".").pop() ?? "bin";
      const timestamp = Date.now();
      const filename = `${timestamp}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const filePath = `${path}/${filename}`;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        setErrorMsg(error.message);
        setState("error");
        return;
      }

      /* Get public URL */
      const { data: publicData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      const publicUrl = publicData.publicUrl;
      setPreviewUrl(publicUrl);
      setState("idle");
      onUpload(publicUrl);
    },
    [bucket, path, maxBytes, maxSizeMB, onUpload]
  );

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) void handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleFile(file);
  }, [handleFile]);

  const clearPreview = useCallback(() => {
    setPreviewUrl(null);
    setErrorMsg("");
    setState("idle");
  }, []);

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2">
          {label}
        </label>
      )}

      {/* Preview */}
      {previewUrl && (
        <div className="relative inline-block border-2 border-neo-black mb-2">
          <img
            src={previewUrl}
            alt="Uploaded preview"
            className="w-32 h-24 object-cover"
          />
          <button
            type="button"
            onClick={clearPreview}
            className="absolute -top-2 -right-2 w-5 h-5 bg-neo-red border-2 border-neo-black flex items-center justify-center"
          >
            <X size={10} className="text-neo-white" />
          </button>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors duration-150 ${
          isDragging
            ? "border-neo-lime bg-neo-lime/5"
            : state === "error"
              ? "border-neo-red/50 bg-neo-red/5"
              : "border-neo-black/30 hover:border-neo-lime hover:bg-neo-lime/5"
        }`}
      >
        {state === "uploading" ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={32} className="text-neo-black/50 animate-spin" />
            <span className="font-mono text-xs text-neo-black/60">
              Uploading...
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {previewUrl ? (
              <ImageIcon size={32} className="text-neo-lime" />
            ) : (
              <Upload size={32} className="text-neo-black/40" />
            )}
            <span className="font-mono text-xs font-bold text-neo-black/70">
              {previewUrl
                ? "Click or drop to replace"
                : "Click or drag to upload"}
            </span>
          </div>
        )}
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Hint */}
      {hint && !errorMsg && (
        <p className="font-mono text-xs text-neo-black/50">{hint}</p>
      )}

      {/* Error */}
      {errorMsg && (
        <p className="font-mono text-xs text-neo-red font-bold">{errorMsg}</p>
      )}
    </div>
  );
}
