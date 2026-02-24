import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, ArrowRight, Flame } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "dmc_campaign_popup_shown";
const SHOW_DELAY_MS = 1500; // show 1.5s after page load

export default function CampaignPopup() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const currentLocale = locale ?? "en";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
      trackEvent("campaign_popup_shown", "engagement", "popup");
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  function handleClose() {
    setIsVisible(false);
    trackEvent("campaign_popup_dismissed", "engagement", "popup");
  }

  function handleCta() {
    setIsVisible(false);
    trackEvent("campaign_popup_cta_click", "conversion", "popup");
  }

  const countdownLabels = {
    days: t("promo.days", "DAYS"),
    hours: t("promo.hours", "HRS"),
    min: t("promo.min", "MIN"),
    sec: t("promo.sec", "SEC"),
  };

  const tiers = [
    { original: "\u20AC465", now: "\u20AC349", name: "Starter" },
    { original: "\u20AC999", now: "\u20AC749", name: "Growth" },
    { original: "\u20AC1,996", now: "\u20AC1,497", name: "Scale" },
    { original: "\u20AC3,329", now: "\u20AC2,497", name: "Commerce" },
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

            {/* Top accent bar with animated pattern */}
            <div className="h-2 bg-neo-lime" />

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Badge */}
              <div className="flex justify-center mb-4">
                <div className="inline-flex items-center gap-2 bg-neo-lime/10 border-2 border-neo-lime px-4 py-1.5">
                  <Flame size={14} className="text-neo-lime" strokeWidth={3} />
                  <span className="font-mono text-[11px] font-bold text-neo-lime uppercase tracking-widest">
                    {t("promo.badgeText", "LIMITED TIME OFFER")}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-space font-extrabold text-2xl sm:text-3xl text-neo-white text-center uppercase tracking-tight mb-2">
                {t("promo.popupTitle", "UP TO 25% OFF")}
              </h2>

              <p className="font-mono text-sm text-neo-white/60 text-center mb-6 max-w-sm mx-auto leading-relaxed">
                {t(
                  "promo.popupDescription",
                  "All custom development packages are discounted. Start your project today!"
                )}
              </p>

              {/* Countdown Timer */}
              <div className="flex justify-center mb-6">
                <div className="bg-neo-black/60 border-2 border-neo-lime/30 px-4 py-3">
                  <p className="font-mono text-[10px] text-neo-lime/70 uppercase tracking-widest text-center mb-2">
                    {t("promo.endsIn", "OFFER ENDS IN")}
                  </p>
                  <CountdownTimer labels={countdownLabels} size="sm" />
                </div>
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
                    <span className="font-mono text-xs text-neo-white/40 line-through mr-1.5">
                      {tier.original}
                    </span>
                    <span className="font-space font-bold text-lg text-neo-lime">
                      {tier.now}
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
                {t("promo.ctaButton", "VIEW DISCOUNTED PRICES")}
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
