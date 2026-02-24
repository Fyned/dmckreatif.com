import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  X,
  Globe,
  Check,
  AlertCircle,
  Loader2,
  Copy,
  ExternalLink,
  XCircle,
} from "lucide-react";
import {
  checkSubdomainAvailability,
  sanitizeSubdomain,
  getPublishedUrl,
  publishSite,
  unpublishSite,
} from "@/lib/subdomain";
import type { SubdomainCheckResult } from "@/lib/subdomain";

interface PublishDialogProps {
  open: boolean;
  onClose: () => void;
  siteId: string;
  currentSubdomain: string | null;
  currentStatus: string;
  onPublished: (subdomain: string) => void;
  onUnpublished: () => void;
  generateHtml: (subdomain?: string) => string;
}

export default function PublishDialog({
  open,
  onClose,
  siteId,
  currentSubdomain,
  currentStatus,
  onPublished,
  onUnpublished,
  generateHtml,
}: PublishDialogProps) {
  const { t } = useTranslation();
  const [subdomain, setSubdomain] = useState(currentSubdomain ?? "");
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<SubdomainCheckResult | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [unpublishing, setUnpublishing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPublished = currentStatus === "published" && currentSubdomain;

  // Focus input on open
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setSubdomain(currentSubdomain ?? "");
      setCheckResult(null);
      setPublishError(null);
      setCopied(false);
    }
  }, [open, currentSubdomain]);

  // Debounced availability check
  const checkAvailability = useCallback(
    async (value: string) => {
      if (value.length < 3) {
        setCheckResult(null);
        return;
      }
      setChecking(true);
      const result = await checkSubdomainAvailability(value, siteId);
      setCheckResult(result);
      setChecking(false);
    },
    [siteId],
  );

  function handleSubdomainChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const sanitized = sanitizeSubdomain(raw);
    setSubdomain(sanitized);
    setCheckResult(null);
    setPublishError(null);

    // Debounce the availability check
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      checkAvailability(sanitized);
    }, 400);
  }

  async function handlePublish() {
    if (!subdomain || !checkResult?.available || publishing) return;
    setPublishing(true);
    setPublishError(null);

    try {
      const html = generateHtml(subdomain);
      const ok = await publishSite(siteId, subdomain, html);
      if (!ok) {
        setPublishError(t("editor.publishFailed", "Failed to publish. Please try again."));
        return;
      }
      onPublished(subdomain);
    } catch {
      setPublishError(t("editor.publishFailed", "Failed to publish. Please try again."));
    } finally {
      setPublishing(false);
    }
  }

  async function handleUnpublish() {
    if (unpublishing) return;
    setUnpublishing(true);

    const ok = await unpublishSite(siteId);
    if (ok) {
      onUnpublished();
    }
    setUnpublishing(false);
  }

  function handleCopyUrl() {
    if (!currentSubdomain) return;
    const url = getPublishedUrl(currentSubdomain);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!open) return null;

  const canPublish =
    subdomain.length >= 3 && checkResult?.available && !publishing;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-[#1a1a1a] border border-[#333] rounded-lg w-full max-w-md mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#333]">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-[#CDFF50]" />
            <h2 className="font-space font-semibold text-white text-base">
              {t("editor.publishSite", "Publish Site")}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#666] hover:text-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5 space-y-5">
          {/* Published status banner */}
          {isPublished && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Check size={14} className="text-green-400" />
                <span className="text-green-400 text-xs font-mono font-semibold uppercase">
                  {t("editor.siteIsLive", "Site is Live")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={getPublishedUrl(currentSubdomain)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#CDFF50] text-sm font-mono hover:underline flex items-center gap-1"
                >
                  {getPublishedUrl(currentSubdomain)}
                  <ExternalLink size={12} />
                </a>
                <button
                  onClick={handleCopyUrl}
                  className="text-[#666] hover:text-white transition-colors p-1"
                  title={t("editor.copyUrl", "Copy URL")}
                >
                  {copied ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Subdomain input */}
          <div>
            <label className="block text-[#999] text-xs font-mono mb-2">
              {t("editor.chooseSubdomain", "Choose your subdomain")}
            </label>
            <div className="flex items-center bg-[#111] border border-[#333] rounded overflow-hidden focus-within:border-[#CDFF50]/50">
              <input
                ref={inputRef}
                type="text"
                value={subdomain}
                onChange={handleSubdomainChange}
                placeholder="my-business"
                maxLength={30}
                className="flex-1 bg-transparent text-white text-sm font-mono px-3 py-2.5 outline-none placeholder:text-[#444]"
              />
              <span className="text-[#666] text-xs font-mono pr-3 whitespace-nowrap">
                .dmckreatif.com
              </span>
            </div>

            {/* Status indicators */}
            <div className="mt-2 min-h-[20px]">
              {checking && (
                <div className="flex items-center gap-1.5 text-[#999] text-xs font-mono">
                  <Loader2 size={12} className="animate-spin" />
                  {t("editor.checking", "Checking availability...")}
                </div>
              )}

              {!checking && checkResult && (
                <div
                  className={`flex items-center gap-1.5 text-xs font-mono ${
                    checkResult.available
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {checkResult.available ? (
                    <>
                      <Check size={12} />
                      {checkResult.reason === "own"
                        ? t("editor.yourSubdomain", "This is your current subdomain")
                        : t("editor.available", "Available!")}
                    </>
                  ) : (
                    <>
                      <AlertCircle size={12} />
                      {checkResult.reason === "invalid" &&
                        t("editor.invalidSubdomain", "Must be 3-30 chars, lowercase letters, numbers, and hyphens")}
                      {checkResult.reason === "reserved" &&
                        t("editor.reservedSubdomain", "This subdomain is reserved")}
                      {checkResult.reason === "taken" &&
                        t("editor.takenSubdomain", "Already taken by another site")}
                    </>
                  )}
                </div>
              )}

              {subdomain.length > 0 && subdomain.length < 3 && !checking && (
                <div className="text-[#666] text-xs font-mono">
                  {t("editor.subdomainMinLength", "Minimum 3 characters")}
                </div>
              )}
            </div>
          </div>

          {/* Error message */}
          {publishError && (
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono bg-red-500/10 border border-red-500/20 rounded p-2">
              <XCircle size={14} />
              {publishError}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-5 py-4 border-t border-[#333] flex items-center justify-between">
          {isPublished ? (
            <button
              onClick={handleUnpublish}
              disabled={unpublishing}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-red-400 border border-red-500/30 rounded hover:bg-red-500/10 transition-colors disabled:opacity-50"
            >
              {unpublishing ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <XCircle size={12} />
              )}
              {t("editor.unpublish", "Unpublish")}
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-[#999] hover:text-white transition-colors"
            >
              {t("editor.cancel", "Cancel")}
            </button>
            <button
              onClick={handlePublish}
              disabled={!canPublish}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold bg-[#CDFF50] text-[#111] rounded hover:bg-[#b8e645] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {publishing ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Globe size={12} />
              )}
              {isPublished
                ? t("editor.updateSite", "Update")
                : t("editor.publishNow", "Publish")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
