import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Eye, Layers, Monitor, Pencil } from "lucide-react";
import type { Template } from "@/types/database";
import { fadeInUp } from "@/lib/animations";
import { TEMPLATE_TIER_PRICES } from "@/lib/template-data";

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const { locale } = useParams();
  const { t } = useTranslation();

  const lowestPrice = template.tier_compatibility.length > 0
    ? Math.min(
        ...template.tier_compatibility.map(
          (tier) => TEMPLATE_TIER_PRICES[tier]
        )
      )
    : TEMPLATE_TIER_PRICES.business_card;

  const previewPath = `/${locale ?? "en"}/templates/${template.slug}`;

  return (
    <motion.div
      variants={fadeInUp}
      className="group border-2 border-neo-black bg-neo-white shadow-hard overflow-hidden transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm"
    >
      {/* Thumbnail */}
      {template.thumbnail_url ? (
        <Link to={previewPath} className="block overflow-hidden border-b-2 border-neo-black">
          <img
            src={template.thumbnail_url}
            alt={template.name}
            loading="lazy"
            className="w-full aspect-[16/9] object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      ) : (
        <Link
          to={previewPath}
          className="flex items-center justify-center w-full aspect-[16/9] bg-neo-bg border-b-2 border-neo-black"
        >
          <span className="font-space font-bold text-lg text-neo-black/40 uppercase text-center px-4">
            {template.name}
          </span>
        </Link>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Category badge */}
        {template.category && (
          <span
            className="inline-flex items-center px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider border-2 border-neo-black mb-3"
            style={{ backgroundColor: template.category.color }}
          >
            {template.category.name}
          </span>
        )}

        {/* Name */}
        <h3 className="font-space font-bold text-lg uppercase text-neo-black mb-2 line-clamp-1">
          {template.name}
        </h3>

        {/* Description */}
        {template.description && (
          <p className="font-mono text-xs text-neo-black/70 leading-relaxed mb-3 line-clamp-2">
            {template.description}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-space font-bold text-neo-black">
            {t("templates.from", "From")} &euro;{lowestPrice}
          </span>
          <span className="font-mono text-xs text-neo-black/60 flex items-center gap-1">
            <Layers size={12} />
            {template.features.length} {t("templates.features", "features")}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {/* LIVE butonu — sadece preview_url varsa */}
          {template.preview_url && (
            <Link
              to={`/${locale ?? "en"}/templates/${template.slug}/preview`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-space font-bold uppercase tracking-wider border-2 border-neo-black bg-neo-yellow shadow-hard transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
            >
              <Monitor size={12} />
              {t("templates.liveDemo", "LIVE")}
            </Link>
          )}
          <Link
            to={previewPath}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-space font-bold uppercase tracking-wider border-2 border-neo-black bg-transparent shadow-hard transition-all duration-150 hover:bg-neo-yellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            <Eye size={14} />
            {t("templates.preview", "Preview")}
          </Link>
          <Link
            to={`/${locale ?? "en"}/template-order/${template.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-space font-bold uppercase tracking-wider border-2 border-neo-black bg-neo-lime shadow-hard transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            <Pencil size={14} />
            {t("templates.customize", "Customize")}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
