import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Timer, Percent } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import NeoBadge from "./NeoBadge";
import { fadeInUp, viewportConfig } from "@/lib/animations";

interface PromoBannerProps {
  variant?: "full" | "compact";
}

export default function PromoBanner({ variant = "full" }: PromoBannerProps) {
  const { t } = useTranslation();

  const countdownLabels = {
    days: t("promo.days", "DAYS"),
    hours: t("promo.hours", "HRS"),
    min: t("promo.min", "MIN"),
    sec: t("promo.sec", "SEC"),
  };

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
            <div className="w-10 h-10 bg-neo-lime border-2 border-neo-black flex items-center justify-center shadow-hard-sm">
              <Percent size={18} strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-space font-bold text-sm text-neo-lime uppercase tracking-wider">
                {t("promo.badgeText", "LIMITED TIME OFFER")}
              </p>
              <p className="font-mono text-xs text-neo-lime/70">
                {t("promo.saveUpTo", "Save up to 25%")}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <CountdownTimer labels={countdownLabels} size="sm" />
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
      className="bg-neo-black border-4 border-neo-lime shadow-hard-lg p-6 lg:p-10"
    >
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
        {/* Left: Icon + Text */}
        <div className="flex-1 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
            <div className="w-12 h-12 bg-neo-lime border-2 border-neo-black flex items-center justify-center shadow-hard-sm">
              <Timer size={24} strokeWidth={2.5} />
            </div>
            <NeoBadge color="neo-lime">
              {t("promo.badgeText", "LIMITED TIME OFFER")}
            </NeoBadge>
          </div>

          <h3 className="font-space font-bold text-xl lg:text-2xl text-neo-lime mb-2">
            {t("promo.title", "LAUNCH MONTH SPECIAL — UP TO 25% OFF")}
          </h3>
          <p className="font-mono text-sm text-neo-lime/80 leading-relaxed max-w-xl">
            {t(
              "promo.description",
              "All custom development packages are discounted for a limited time. Lock in these prices before they go back to normal!"
            )}
          </p>
        </div>

        {/* Right: Countdown */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <p className="font-mono text-xs text-neo-lime/60 uppercase tracking-widest">
            {t("promo.endsIn", "OFFER ENDS IN")}
          </p>
          <CountdownTimer labels={countdownLabels} size="md" />
        </div>
      </div>
    </motion.div>
  );
}
