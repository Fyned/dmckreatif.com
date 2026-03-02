import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";

const DISMISS_KEY = "top_promo_dismissed";

export default function TopPromoBanner() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const currentLocale = locale ?? "en";

  const [dismissed, setDismissed] = useState(() => {
    const ts = sessionStorage.getItem(DISMISS_KEY);
    if (!ts) return false;
    return Date.now() - Number(ts) < 3600000;
  });

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, String(Date.now()));
    setDismissed(true);
  }

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-neo-black border-b-2 border-neo-lime relative overflow-hidden z-50"
        >
          <div className="max-w-container mx-auto px-4 py-2 flex items-center justify-center gap-3 sm:gap-6">
            {/* Icon + Text */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="hidden sm:flex w-7 h-7 bg-neo-lime border border-neo-black items-center justify-center">
                <Zap size={14} strokeWidth={3} />
              </div>
              <span className="font-space font-bold text-xs sm:text-sm text-neo-lime uppercase tracking-wider whitespace-nowrap">
                {t("promo.bannerShort", "25% OFF — LIMITED TIME")}
              </span>
            </div>

            {/* CTA Button */}
            <Link
              to={`/${currentLocale}/pricing`}
              className="hidden md:inline-block bg-neo-lime border-2 border-neo-black px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-neo-lime/80 transition-colors whitespace-nowrap shadow-hard-sm"
            >
              {t("promo.ctaButton", "CLAIM DISCOUNT")}
            </Link>

            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-neo-lime/60 hover:text-neo-lime transition-colors"
              aria-label="Dismiss"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
