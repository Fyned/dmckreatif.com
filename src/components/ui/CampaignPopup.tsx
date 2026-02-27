import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, ArrowRight, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "dmc_campaign_popup_shown";
const SHOW_DELAY_MS = 1500;

export default function CampaignPopup() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const currentLocale = locale ?? "en";
  const [isVisible, setIsVisible] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    },
    []
  );

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
      trackEvent("campaign_popup_shown", "engagement", "popup");
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isVisible, handleKeyDown]);

  function handleClose() {
    setIsVisible(false);
    trackEvent("campaign_popup_dismissed", "engagement", "popup");
  }

  function handleCta() {
    setIsVisible(false);
    trackEvent("campaign_popup_cta_click", "conversion", "popup");
  }

  const tiers = [
    { price: "\u20AC349", name: "Starter" },
    { price: "\u20AC749", name: "Growth" },
    { price: "\u20AC1,497", name: "Scale" },
    { price: "\u20AC2,497", name: "Commerce" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-neo-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="campaign-popup-title"
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg bg-neo-black border-4 border-neo-lime shadow-[8px_8px_0px_0px_#CDFF50] overflow-hidden"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 border-2 border-neo-lime/40 bg-neo-black flex items-center justify-center hover:bg-neo-lime hover:text-neo-black text-neo-lime/60 transition-colors"
              aria-label="Close"
            >
              <X size={16} strokeWidth={3} />
            </button>

            {/* Top accent bar */}
            <div className="h-2 bg-neo-lime" />

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Badge */}
              <div className="flex justify-center mb-4">
                <div className="inline-flex items-center gap-2 bg-neo-lime/10 border-2 border-neo-lime px-4 py-1.5">
                  <Zap size={14} className="text-neo-lime" strokeWidth={3} />
                  <span className="font-mono text-[11px] font-bold text-neo-lime uppercase tracking-widest">
                    {t("promo.badgeText", "COMPETITIVE PRICING")}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 id="campaign-popup-title" className="font-space font-extrabold text-2xl sm:text-3xl text-neo-white text-center uppercase tracking-tight mb-2">
                {t("promo.popupTitle", "PREMIUM QUALITY, FAIR PRICES")}
              </h2>

              <p className="font-mono text-sm text-neo-white/60 text-center mb-6 max-w-sm mx-auto leading-relaxed">
                {t(
                  "promo.popupDescription",
                  "Custom-built websites for European businesses. Transparent pricing, no surprises."
                )}
              </p>

              {/* Value props */}
              <div className="flex flex-col gap-2 mb-6">
                {[
                  t("promo.perk1", "Free consultation"),
                  t("promo.perk2", "No hidden fees"),
                  t("promo.perk3", "Satisfaction guaranteed"),
                ].map((perk) => (
                  <div key={perk} className="flex items-center gap-2.5 px-3">
                    <Check size={14} className="text-neo-lime flex-shrink-0" />
                    <span className="font-mono text-xs font-bold text-neo-lime/80">{perk}</span>
                  </div>
                ))}
              </div>

              {/* Mini price grid */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className="border border-neo-lime/20 bg-neo-lime/5 px-3 py-2 text-center"
                  >
                    <span className="font-mono text-[10px] text-neo-white/50 uppercase tracking-wider block mb-1">
                      {tier.name}
                    </span>
                    <span className="font-space font-bold text-lg text-neo-lime">
                      {tier.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                to={`/${currentLocale}/pricing`}
                onClick={handleCta}
                className="w-full inline-flex items-center justify-center gap-3 bg-neo-lime text-neo-black border-4 border-neo-black px-8 py-4 font-space font-extrabold text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#CDFF50] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <Zap size={18} strokeWidth={3} />
                {t("promo.ctaButton", "VIEW PRICING")}
                <ArrowRight size={18} strokeWidth={3} />
              </Link>

              {/* Micro-copy */}
              <p className="font-mono text-[10px] text-neo-white/30 text-center mt-3 uppercase tracking-wider">
                {t(
                  "promo.popupNote",
                  "No commitment \u2014 free consultation included"
                )}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
