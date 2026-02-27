import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Gift } from "lucide-react";
import { trackEvent, trackNewsletterSignup } from "@/lib/analytics";
import { supabase } from "@/lib/supabase";

const SESSION_KEY = "dmc_exit_intent_shown";

export default function ExitIntentPopup() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const showPopup = useCallback(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    setIsVisible(true);
    sessionStorage.setItem(SESSION_KEY, "1");
    trackEvent("exit_intent_shown", "engagement", "popup");
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    // Desktop: detect mouse leaving viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    // Mobile: timer-based (30s on page)
    const mobileTimer = setTimeout(() => {
      if (window.innerWidth < 768) {
        showPopup();
      }
    }, 30000);

    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseout", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, [showPopup]);

  const handleClose = () => {
    setIsVisible(false);
    trackEvent("exit_intent_dismissed", "engagement", "popup");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;

    setLoading(true);

    const { error } = await supabase
      .from("lead_magnet_downloads")
      .insert({ email: email.trim(), resource: "exit_intent_audit" });

    if (error && error.code !== "23505") {
      console.error("Exit intent save error:", error);
    }

    setLoading(false);
    setSubmitted(true);
    trackEvent("exit_intent_conversion", "lead_generation", email);
    trackNewsletterSignup("exit_intent_popup");
  };

  const l = locale ?? "en";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-neo-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-neo-white border-4 border-neo-black shadow-hard-lg"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 w-8 h-8 border-2 border-neo-black bg-neo-bg flex items-center justify-center hover:bg-neo-red hover:text-neo-white transition-colors"
              aria-label={t("exitIntent.close", "Close")}
            >
              <X size={16} strokeWidth={3} />
            </button>

            {/* Accent bar */}
            <div className="h-2 bg-neo-lime" />

            <div className="p-8">
              {!submitted ? (
                <>
                  {/* Icon */}
                  <div className="w-14 h-14 bg-neo-lime border-2 border-neo-black shadow-hard flex items-center justify-center mx-auto mb-5">
                    <Gift size={24} strokeWidth={2.5} />
                  </div>

                  <h3 className="font-space font-bold text-xl lg:text-2xl text-center uppercase mb-2">
                    {t("exitIntent.title", "Wait! Get a Free Website Audit")}
                  </h3>

                  <p className="font-mono text-sm text-neo-black/70 text-center mb-6 leading-relaxed">
                    {t(
                      "exitIntent.description",
                      "Enter your email and we'll send you a free audit of your current website with actionable improvements."
                    )}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("exitIntent.emailPlaceholder", "your@email.com")}
                      required
                      className="w-full font-mono text-sm px-4 py-3 border-2 border-neo-black bg-neo-bg focus:outline-none focus:border-neo-lime focus:shadow-hard-sm transition-all placeholder:text-neo-black/30"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 bg-neo-black text-neo-white border-2 border-neo-black px-6 py-3 font-space font-bold text-sm uppercase tracking-wider shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-neo-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <>
                          {t("exitIntent.cta", "GET FREE AUDIT")}
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="font-mono text-[10px] text-neo-black/40 text-center mt-3 uppercase">
                    {t("exitIntent.noSpam", "No spam. Unsubscribe anytime.")}
                  </p>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-neo-green border-2 border-neo-black shadow-hard flex items-center justify-center mx-auto mb-5">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="font-space font-bold text-xl uppercase mb-2">
                    {t("exitIntent.successTitle", "You're In!")}
                  </h3>
                  <p className="font-mono text-sm text-neo-black/70 mb-4">
                    {t(
                      "exitIntent.successDescription",
                      "We'll send your free website audit within 24 hours."
                    )}
                  </p>
                  <a
                    href={`/${l}/contact`}
                    className="inline-flex items-center gap-2 bg-neo-lime border-2 border-neo-black px-6 py-3 font-space font-bold text-sm uppercase tracking-wider shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    {t("exitIntent.viewServices", "VIEW OUR SERVICES")}
                    <ArrowRight size={16} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
