import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  FileText,
  Tag,
  Image,
  Link,
  Globe,
  EyeOff,
  RotateCcw,
  Save,
} from "lucide-react";
import type { SeoSettings } from "@/lib/site-generator";
import { EMPTY_SEO_SETTINGS } from "@/lib/site-generator";

interface Props {
  onApply: (settings: SeoSettings) => void;
  initialData?: Partial<SeoSettings>;
}

/** Compact text field matching the dark editor sidebar style. */
function Field({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  maxLength,
  helpText,
  multiline,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  helpText?: string;
  multiline?: boolean;
}) {
  const charCount = value.length;
  const isOverLimit = maxLength ? charCount > maxLength : false;

  return (
    <div className="mb-3">
      <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#888] font-mono mb-1">
        <Icon size={11} />
        {label}
        {maxLength && (
          <span
            className={`ml-auto tabular-nums ${
              isOverLimit
                ? "text-red-400"
                : charCount > maxLength * 0.8
                  ? "text-yellow-400"
                  : "text-[#555]"
            }`}
          >
            {charCount}/{maxLength}
          </span>
        )}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-[#222] border border-[#333] rounded px-2 py-1.5 text-xs text-[#eee] placeholder-[#555] focus:border-[#CDFF50] focus:outline-none transition-colors resize-none font-mono"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#222] border border-[#333] rounded px-2 py-1.5 text-xs text-[#eee] placeholder-[#555] focus:border-[#CDFF50] focus:outline-none transition-colors font-mono"
        />
      )}
      {helpText && (
        <p className="text-[9px] text-[#555] mt-0.5 font-mono">{helpText}</p>
      )}
    </div>
  );
}

/** Toggle switch for boolean settings. */
function Toggle({
  icon: Icon,
  label,
  checked,
  onChange,
  helpText,
}: {
  icon: React.ElementType;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  helpText?: string;
}) {
  return (
    <div className="mb-3">
      <label className="flex items-center gap-2 cursor-pointer group">
        <Icon size={11} className="text-[#888]" />
        <span className="text-[10px] uppercase tracking-wider text-[#888] font-mono flex-1">
          {label}
        </span>
        <div
          className={`w-8 h-4 rounded-full transition-colors relative ${
            checked ? "bg-[#CDFF50]" : "bg-[#333]"
          }`}
          onClick={() => onChange(!checked)}
        >
          <div
            className={`absolute top-0.5 w-3 h-3 rounded-full transition-transform ${
              checked
                ? "translate-x-4 bg-[#111]"
                : "translate-x-0.5 bg-[#666]"
            }`}
          />
        </div>
      </label>
      {helpText && (
        <p className="text-[9px] text-[#555] mt-0.5 ml-4 font-mono">
          {helpText}
        </p>
      )}
    </div>
  );
}

/** Google search result preview card. */
function GooglePreview({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  const displayTitle = title || "Page Title";
  const displayDesc =
    description || "Add a meta description to control how your page appears in search results.";
  const displayUrl = url || "https://yoursite.dmckreatif.com";

  return (
    <div className="mb-4">
      <p className="text-[10px] uppercase tracking-wider text-[#888] font-mono mb-2">
        Search Preview
      </p>
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-3">
        <p className="text-[11px] text-[#888] font-mono truncate mb-0.5">
          {displayUrl}
        </p>
        <p className="text-sm text-[#8ab4f8] font-sans truncate mb-0.5 hover:underline cursor-default">
          {displayTitle.length > 60
            ? displayTitle.slice(0, 57) + "..."
            : displayTitle}
        </p>
        <p className="text-[11px] text-[#bdc1c6] font-sans line-clamp-2 leading-relaxed">
          {displayDesc.length > 160
            ? displayDesc.slice(0, 157) + "..."
            : displayDesc}
        </p>
      </div>
    </div>
  );
}

export default function SeoPanel({ onApply, initialData }: Props) {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<SeoSettings>({
    ...EMPTY_SEO_SETTINGS,
    ...initialData,
  });
  const [dirty, setDirty] = useState(false);

  // Sync with external initialData changes (e.g. after project load)
  useEffect(() => {
    if (initialData) {
      setSettings({ ...EMPTY_SEO_SETTINGS, ...initialData });
    }
  }, [initialData]);

  const update = useCallback(
    <K extends keyof SeoSettings>(key: K, value: SeoSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
      setDirty(true);
    },
    [],
  );

  function handleApply() {
    onApply(settings);
    setDirty(false);
  }

  function handleReset() {
    const reset = { ...EMPTY_SEO_SETTINGS };
    setSettings(reset);
    setDirty(true);
  }

  return (
    <div className="p-3 text-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-space font-semibold text-[#ccc] uppercase tracking-wider">
          {t("editor.seoSettings", "SEO Settings")}
        </h3>
        <button
          onClick={handleReset}
          className="p-1 text-[#666] hover:text-[#999] transition-colors"
          title={t("editor.resetSeo", "Reset to defaults")}
        >
          <RotateCcw size={12} />
        </button>
      </div>

      {/* Google Search Preview */}
      <GooglePreview
        title={settings.title}
        description={settings.description}
        url={settings.canonical}
      />

      {/* Title */}
      <Field
        icon={FileText}
        label={t("editor.seoTitle", "Page Title")}
        value={settings.title}
        onChange={(v) => update("title", v)}
        placeholder="My Restaurant — Fine Dining in Paris"
        maxLength={60}
        helpText="Appears in browser tab and search results"
      />

      {/* Meta Description */}
      <Field
        icon={Search}
        label={t("editor.seoDescription", "Meta Description")}
        value={settings.description}
        onChange={(v) => update("description", v)}
        placeholder="Award-winning cuisine in the heart of Paris..."
        maxLength={160}
        multiline
        helpText="Shown below the title in search results"
      />

      {/* Keywords */}
      <Field
        icon={Tag}
        label={t("editor.seoKeywords", "Keywords")}
        value={settings.keywords}
        onChange={(v) => update("keywords", v)}
        placeholder="restaurant, fine dining, paris, french cuisine"
        helpText="Comma-separated keywords"
      />

      {/* Language */}
      <div className="mb-3">
        <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#888] font-mono mb-1">
          <Globe size={11} />
          {t("editor.seoLang", "Language")}
        </label>
        <select
          value={settings.lang}
          onChange={(e) => update("lang", e.target.value)}
          className="w-full bg-[#222] border border-[#333] rounded px-2 py-1.5 text-xs text-[#eee] focus:border-[#CDFF50] focus:outline-none transition-colors font-mono"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="nl">Nederlands</option>
          <option value="de">Deutsch</option>
          <option value="es">Español</option>
          <option value="it">Italiano</option>
          <option value="pt">Português</option>
          <option value="tr">Türkçe</option>
        </select>
      </div>

      <div className="w-full border-t border-[#333] my-3" />

      {/* OG Image */}
      <Field
        icon={Image}
        label={t("editor.seoOgImage", "Social Share Image")}
        value={settings.ogImage}
        onChange={(v) => update("ogImage", v)}
        placeholder="https://example.com/share-image.jpg"
        helpText="1200×630px recommended for social media"
      />

      {/* Canonical URL */}
      <Field
        icon={Link}
        label={t("editor.seoCanonical", "Canonical URL")}
        value={settings.canonical}
        onChange={(v) => update("canonical", v)}
        placeholder="https://yourdomain.com"
        helpText="The preferred URL for search engines"
      />

      {/* Favicon */}
      <Field
        icon={Image}
        label={t("editor.seoFavicon", "Favicon URL")}
        value={settings.favicon}
        onChange={(v) => update("favicon", v)}
        placeholder="https://example.com/favicon.ico"
        helpText="32×32px .ico or .png"
      />

      <div className="w-full border-t border-[#333] my-3" />

      {/* No Index */}
      <Toggle
        icon={EyeOff}
        label={t("editor.seoNoIndex", "Hide from Search Engines")}
        checked={settings.noIndex}
        onChange={(v) => update("noIndex", v)}
        helpText="Add noindex meta tag to prevent indexing"
      />

      {/* Apply button */}
      <button
        onClick={handleApply}
        disabled={!dirty}
        className={`w-full flex items-center justify-center gap-2 py-2 rounded text-xs font-mono font-semibold transition-colors mt-2 ${
          dirty
            ? "bg-[#CDFF50] text-[#111] hover:bg-[#b8e645]"
            : "bg-[#333] text-[#666] cursor-not-allowed"
        }`}
      >
        <Save size={13} />
        {t("editor.applySeo", "Apply SEO Settings")}
      </button>
    </div>
  );
}
