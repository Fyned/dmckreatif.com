import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { TemplateTierConfig } from "@/lib/template-data";
import { fadeInUp } from "@/lib/animations";

interface TemplateTierCardProps {
  tier: TemplateTierConfig;
  selected?: boolean;
  onSelect?: (tier: TemplateTierConfig) => void;
}

const bgMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime",
  "neo-yellow": "bg-neo-yellow",
  "neo-blue": "bg-neo-blue",
};

export default function TemplateTierCard({
  tier,
  selected = false,
  onSelect,
}: TemplateTierCardProps) {
  const { t } = useTranslation();

  const tierName = t(`templates.${tier.nameKey}`, tier.nameKey);
  const tierDesc = t(`templates.${tier.descKey}`, "");
  const featuresRaw = t(`templates.${tier.featuresKey}`, "");
  const features = featuresRaw
    ? featuresRaw.split("//").map((f) => f.trim()).filter(Boolean)
    : [];

  const headerBg = bgMap[tier.color] ?? "bg-neo-lime";

  return (
    <motion.button
      type="button"
      variants={fadeInUp}
      onClick={() => onSelect?.(tier)}
      className={`text-left w-full border-2 border-neo-black bg-neo-white shadow-hard p-0 cursor-pointer transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm ${
        selected
          ? "ring-4 ring-neo-lime border-neo-lime"
          : ""
      }`}
    >
      {/* Header band */}
      <div className={`${headerBg} border-b-2 border-neo-black px-6 py-3 flex items-center justify-between`}>
        <span className="font-space font-bold text-sm uppercase tracking-wider text-neo-black">
          {tierName}
        </span>
        {selected && (
          <span className="w-6 h-6 bg-neo-black flex items-center justify-center">
            <Check size={14} className="text-neo-lime" />
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Price */}
        <div className="mb-4">
          <span className="font-space font-bold text-3xl text-neo-black">
            &euro;{tier.price}
          </span>
          <span className="font-mono text-xs text-neo-black/60 ml-1">
            / {t("templates.template", "template")}
          </span>
        </div>

        {/* Pages */}
        <div className="mb-4 font-mono text-xs text-neo-black/80">
          <span className="font-bold uppercase">
            {t("templates.pages", "Pages")}:
          </span>{" "}
          {tier.pages}
        </div>

        {/* Description */}
        {tierDesc && (
          <p className="font-mono text-xs text-neo-black/70 leading-relaxed mb-4">
            {tierDesc}
          </p>
        )}

        {/* Features list */}
        {features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 font-mono text-xs text-neo-black"
              >
                <Check size={14} className="text-neo-black mt-0.5 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.button>
  );
}
