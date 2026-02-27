import { useState, useRef, useCallback } from "react";
import { Upload, Loader2, X, CheckCircle2 } from "lucide-react";
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

type UploadState = "idle" | "uploading" | "done" | "error";

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
  const [state, setState] = useState<UploadState>(preview ? "done" : "idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(preview);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const maxBytes = maxSizeMB * 1024 * 1024;

  const handleFile = useCallback(
    async (file: File) => {
      setErrorMsg("");

      if (file.size > maxBytes) {
        setErrorMsg(`File exceeds ${maxSizeMB}MB limit`);
        setState("error");
        return;
      }

      /* Show local preview immediately */
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
      setState("uploading");

      /* Upload to Supabase */
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
        /* Upload failed but local preview stays — still usable */
        setErrorMsg(error.message);
        setState("done");
        onUpload(localUrl);
        return;
      }

      const { data: publicData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setState("done");
      onUpload(publicData.publicUrl);
    },
    [bucket, path, maxBytes, maxSizeMB, onUpload],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) void handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
    },
    [],
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
    },
    [],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) void handleFile(file);
    },
    [handleFile],
  );

  const clearPreview = useCallback(() => {
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setErrorMsg("");
    setState("idle");
  }, [previewUrl]);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neo-black mb-2">
          {label}
        </label>
      )}

      {/* Drop zone — shows preview inside when available */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed text-center cursor-pointer transition-colors duration-150 overflow-hidden ${
          previewUrl
            ? "border-neo-lime bg-neo-lime/5"
            : isDragging
              ? "border-neo-lime bg-neo-lime/5"
              : state === "error"
                ? "border-neo-red/50 bg-neo-red/5"
                : "border-neo-black/30 hover:border-neo-lime hover:bg-neo-lime/5"
        } ${previewUrl ? "p-0" : "p-8"}`}
      >
        {state === "uploading" && !previewUrl ? (
          <div className="flex flex-col items-center gap-2 p-8">
            <Loader2 size={32} className="text-neo-black/50 animate-spin" />
            <span className="font-mono text-xs text-neo-black/60">
              Uploading...
            </span>
          </div>
        ) : previewUrl ? (
          /* Image preview with overlay */
          <div className="relative group">
            <img
              src={previewUrl}
              alt=""
              className="w-full max-h-48 object-contain bg-white"
            />
            {/* Status overlay */}
            <div className="absolute inset-0 bg-neo-black/0 group-hover:bg-neo-black/40 transition-colors flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-neo-white opacity-0 group-hover:opacity-100 transition-opacity">
                Click to replace
              </span>
            </div>
            {/* Upload spinner overlay */}
            {state === "uploading" && (
              <div className="absolute inset-0 bg-neo-black/30 flex items-center justify-center">
                <Loader2
                  size={28}
                  className="text-neo-white animate-spin"
                />
              </div>
            )}
            {/* Done badge */}
            {state === "done" && (
              <div className="absolute top-2 right-2 bg-neo-lime border-2 border-neo-black px-2 py-0.5 flex items-center gap-1">
                <CheckCircle2 size={12} />
                <span className="font-mono text-[10px] font-bold">OK</span>
              </div>
            )}
            {/* Remove button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearPreview();
              }}
              className="absolute top-2 left-2 w-6 h-6 bg-neo-red border-2 border-neo-black flex items-center justify-center hover:scale-110 transition-transform"
            >
              <X size={12} className="text-neo-white" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload size={32} className="text-neo-black/40" />
            <span className="font-mono text-xs font-bold text-neo-black/70">
              Click or drag to upload
            </span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />

      {hint && !errorMsg && (
        <p className="font-mono text-xs text-neo-black/50">{hint}</p>
      )}

      {errorMsg && (
        <p className="font-mono text-xs text-neo-red font-bold">{errorMsg}</p>
      )}
    </div>
  );
}
