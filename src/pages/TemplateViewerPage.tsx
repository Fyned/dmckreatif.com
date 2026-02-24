import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { fadeInUp } from "@/lib/animations";
import { TEMPLATE_TIER_PRICES } from "@/lib/template-data";
import type { Template } from "@/types/database";

type Device = "desktop" | "tablet" | "mobile";

const DEVICE_WIDTH: Record<Device, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export default function TemplateViewerPage() {
  const { t } = useTranslation();
  const { locale, slug } = useParams();
  const currentLocale = locale ?? "en";

  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState<Device>("desktop");
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    async function fetchTemplate() {
      setLoading(true);
      const { data } = await supabase
        .from("templates")
        .select("*, category:template_categories(*)")
        .eq("slug", slug)
        .eq("active", true)
        .single();

      setTemplate(data as Template | null);
      setLoading(false);
    }
    void fetchTemplate();
  }, [slug]);

  const lowestPrice = template?.tier_compatibility?.length
    ? Math.min(...template.tier_compatibility.map((t) => TEMPLATE_TIER_PRICES[t]))
    : TEMPLATE_TIER_PRICES.business_card;

  const detailPath = `/${currentLocale}/templates/${slug}`;
  const orderPath = `/${currentLocale}/templates/order?template=${slug}`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neo-bg">
        <div className="neo-border bg-neo-lime px-8 py-4 shadow-hard font-space font-bold text-neo-black uppercase animate-pulse">
          {t("templates.loadingPreview", "Loading preview...")}
        </div>
      </div>
    );
  }

  // Template bulunamadı
  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neo-bg">
        <div className="neo-border bg-neo-white shadow-hard p-10 max-w-md text-center">
          <p className="font-space font-bold text-xl uppercase text-neo-black mb-4">
            {t("templates.notFound", "Template not found")}
          </p>
          <Link
            to={`/${currentLocale}/templates`}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neo-black bg-neo-lime font-space font-bold uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all"
          >
            <ArrowLeft size={16} />
            {t("templates.backToTemplates", "All Templates")}
          </Link>
        </div>
      </div>
    );
  }

  // preview_url yok
  if (!template.preview_url) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neo-bg">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="neo-border bg-neo-white shadow-hard p-10 max-w-lg text-center"
        >
          <div className="w-16 h-16 border-2 border-neo-black bg-neo-yellow flex items-center justify-center mx-auto mb-6 shadow-hard">
            <Monitor size={32} className="text-neo-black" />
          </div>
          <h1 className="font-space font-bold text-2xl uppercase text-neo-black mb-3">
            {t("templates.livePreviewUnavailable", "Live preview is not available for this template.")}
          </h1>
          <p className="font-mono text-sm text-neo-black/70 mb-8 leading-relaxed">
            {t(
              "templates.livePreviewUnavailableDesc",
              "This template does not have a live demo yet. Check the preview images on the detail page."
            )}
          </p>
          <Link
            to={detailPath}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neo-black bg-neo-lime font-space font-bold uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all"
          >
            <ArrowLeft size={16} />
            {t("templates.backToDetail", "BACK TO TEMPLATE")}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neo-bg flex flex-col">
      <Helmet>
        <title>{template.name} — Live Preview | DMC Kreatif</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* ── Sticky Toolbar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 border-b-2 border-neo-black bg-neo-white flex items-center px-4 gap-3 shadow-hard">
        {/* Back */}
        <Link
          to={detailPath}
          className="flex items-center gap-2 px-3 py-2 border-2 border-neo-black font-space font-bold text-xs uppercase hover:bg-neo-yellow hover:translate-x-[2px] hover:translate-y-[2px] transition-all shadow-hard-sm"
        >
          <ArrowLeft size={14} />
          <span className="hidden sm:inline">{t("templates.backToDetail", "BACK TO TEMPLATE")}</span>
        </Link>

        {/* Template name */}
        <span className="font-space font-bold text-sm uppercase text-neo-black truncate flex-1 hidden sm:block">
          {template.name}
        </span>

        {/* Device toggles */}
        <div className="flex border-2 border-neo-black overflow-hidden">
          {(["desktop", "tablet", "mobile"] as Device[]).map((d) => {
            const Icon = d === "desktop" ? Monitor : d === "tablet" ? Tablet : Smartphone;
            return (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setDevice(d);
                  setIframeLoading(true);
                  setIframeError(false);
                }}
                className={`px-3 py-2 border-r-2 last:border-r-0 border-neo-black font-space font-bold text-xs uppercase transition-colors ${
                  device === d
                    ? "bg-neo-black text-neo-white"
                    : "bg-transparent hover:bg-neo-yellow"
                }`}
                title={t(`templates.device${d.charAt(0).toUpperCase() + d.slice(1)}`, d)}
              >
                <Icon size={14} />
              </button>
            );
          })}
        </div>

        {/* Price */}
        <span className="font-space font-bold text-sm text-neo-black hidden md:block">
          {t("templates.from", "From")} €{lowestPrice}
        </span>

        {/* Open in new tab */}
        <a
          href={template.preview_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 border-2 border-neo-black bg-transparent font-space font-bold text-xs uppercase hover:bg-neo-yellow transition-all shadow-hard-sm hidden sm:flex"
        >
          <ExternalLink size={14} />
          <span className="hidden lg:inline">{t("templates.openInNewTab", "OPEN IN NEW TAB")}</span>
        </a>

        {/* Order CTA */}
        <Link
          to={orderPath}
          className="flex items-center gap-2 px-4 py-2 border-2 border-neo-black bg-neo-lime font-space font-bold text-xs uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all whitespace-nowrap"
        >
          {t("templates.orderNow", "ORDER")}
        </Link>
      </div>

      {/* ── iframe area ── */}
      <div
        className="flex justify-center items-start bg-neo-bg transition-all duration-300"
        style={{ paddingTop: "56px", minHeight: "calc(100vh - 56px)" }}
      >
        {iframeLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-neo-bg z-10" style={{ top: "56px" }}>
            <div className="neo-border bg-neo-lime px-8 py-4 shadow-hard font-space font-bold text-neo-black uppercase animate-pulse">
              {t("templates.loadingPreview", "Loading preview...")}
            </div>
          </div>
        )}

        {iframeError ? (
          <div className="flex flex-col items-center justify-center gap-6 p-10" style={{ minHeight: "calc(100vh - 56px)" }}>
            <div className="neo-border bg-neo-white shadow-hard p-8 max-w-md text-center">
              <p className="font-space font-bold text-lg uppercase text-neo-black mb-2">
                {t("templates.previewBlocked", "Preview blocked by external site")}
              </p>
              <p className="font-mono text-sm text-neo-black/70 mb-6">
                {t("templates.openInNewTabDesc", "This site cannot be embedded. Open it in a new tab.")}
              </p>
              <a
                href={template.preview_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neo-black bg-neo-lime font-space font-bold uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all"
              >
                <ExternalLink size={16} />
                {t("templates.openInNewTab", "OPEN IN NEW TAB")}
              </a>
            </div>
          </div>
        ) : (
          <iframe
            key={`${slug}-${device}`}
            src={template.preview_url}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            title={`${template.name} — Live Preview`}
            className="border-2 border-neo-black bg-neo-white transition-all duration-300"
            style={{
              width: DEVICE_WIDTH[device],
              height: "calc(100vh - 56px)",
              maxWidth: "100vw",
            }}
            onLoad={() => setIframeLoading(false)}
            onError={() => {
              setIframeLoading(false);
              setIframeError(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
