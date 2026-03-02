import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Zap, Check } from "lucide-react";
import NeoBadge from "./NeoBadge";

import { fadeInUp, viewportConfig } from "@/lib/animations";

interface PromoBannerProps {
  variant?: "full" | "compact";
}

export default function PromoBanner({ variant = "full" }: PromoBannerProps) {
  const { t } = useTranslation();

  if (variant === "compact") {
    return (
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="bg-neo-black border-4 border-neo-lime shadow-hard-lg p-5 lg:p-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-neo-lime border-2 border-neo-black flex items-center justify-center shadow-hard-sm animate-pulse">
              <Zap size={18} strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-space font-bold text-sm text-neo-lime uppercase tracking-wider">
                {t("promo.badgeText", "LIMITED TIME — 25% OFF")}
              </p>
              <p className="font-mono text-xs text-neo-lime/70">
                {t("promo.saveUpTo", "Save 25% — introductory pricing")}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 bg-neo-lime border-2 border-neo-black px-4 py-2 shadow-hard-sm">
            <span className="font-space font-bold text-lg text-neo-black">{t("promo.fromPrice", "From €497")}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="bg-neo-black border-4 border-neo-lime shadow-[8px_8px_0px_0px_#CDFF50] p-6 lg:p-10"
    >
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
        {/* Left: Icon + Text */}
        <div className="flex-1 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
            <div className="w-12 h-12 bg-neo-lime border-2 border-neo-black flex items-center justify-center shadow-hard-sm animate-pulse">
              <Zap size={24} strokeWidth={2.5} />
            </div>
            <NeoBadge color="neo-lime">
              {t("promo.badgeText", "LIMITED TIME — 25% OFF")}
            </NeoBadge>
          </div>

          <h3 className="font-space font-extrabold text-xl lg:text-2xl text-neo-lime mb-2">
            {t("promo.title", "25% OFF ALL PACKAGES")}
          </h3>
          <p className="font-mono text-sm text-neo-lime/80 leading-relaxed max-w-xl">
            {t(
              "promo.description",
              "Premium websites at introductory prices for new European clients."
            )}
          </p>
        </div>

        {/* Right: Perks */}
        <div className="flex flex-col items-center gap-4 flex-shrink-0">
          <div className="flex flex-col items-start gap-2">
            {[
              t("promo.perk1", "Free consultation"),
              t("promo.perk2", "No hidden fees"),
              t("promo.perk3", "Money-back guarantee"),
            ].map((perk) => (
              <div key={perk} className="flex items-center gap-2">
                <Check size={14} className="text-neo-lime" />
                <span className="font-mono text-xs font-bold text-neo-lime">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
