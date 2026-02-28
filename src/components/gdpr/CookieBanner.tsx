import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useCookieConsent, type CookiePreferences } from "@/contexts/CookieConsentContext";

function Toggle({
  checked,
  onChange,
  disabled = false,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`
          relative w-11 h-6 border-2 border-neo-black transition-colors duration-200
          ${checked ? "bg-neo-lime" : "bg-neo-black/10"}
          ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 w-4 h-4 bg-neo-black transition-transform duration-200
            ${checked ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-neo-black">
        {label}
      </span>
    </label>
  );
}

export default function CookieBanner() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const { showBanner, acceptAll, rejectAll, savePreferences, preferences } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [localPrefs, setLocalPrefs] = useState<CookiePreferences>({ ...preferences });

  if (!showBanner) return null;

  const handleSave = () => {
    savePreferences(localPrefs);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="cookie-banner"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0, 1] }}
        className="fixed bottom-0 left-0 right-0 z-[9999] p-3 md:p-6"
      >
        {/* Mobile slim bar */}
        <div className="md:hidden bg-neo-bg border-2 border-neo-black shadow-hard flex items-center justify-between gap-3 px-4 py-3">
          <span className="font-mono text-[11px] text-neo-black/70 leading-tight flex-1 min-w-0">
            {t("cookies.mobileShort", "We use cookies.")}
            {" "}
            <Link
              to={`/${locale ?? "en"}/cookie-policy`}
              className="underline underline-offset-2 text-neo-black font-bold"
            >
              {t("cookies.learnMore", "Learn more")}
            </Link>
          </span>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={rejectAll}
              className="bg-neo-white border-2 border-neo-black px-3 py-1.5 font-space font-bold text-[10px] uppercase tracking-wider text-neo-black shadow-hard-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-150"
            >
              {t("cookies.rejectAll", "Reject")}
            </button>
            <button
              onClick={acceptAll}
              className="bg-neo-lime border-2 border-neo-black px-3 py-1.5 font-space font-bold text-[10px] uppercase tracking-wider text-neo-black shadow-hard-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-150"
            >
              {t("cookies.acceptAll", "Accept")}
            </button>
          </div>
        </div>

        {/* Desktop full panel */}
        <div className="hidden md:block max-w-4xl mx-auto bg-neo-bg border-2 border-neo-black shadow-hard">
          {/* Header */}
          <div className="bg-neo-black px-5 py-3 flex items-center justify-between">
            <span className="font-space font-bold text-sm uppercase tracking-wider text-neo-lime">
              {t("cookies.title", "Cookie Settings")}
            </span>
            <span className="font-mono text-xs text-neo-bg/60">GDPR</span>
          </div>

          {/* Body */}
          <div className="p-5">
            <p className="font-mono text-xs leading-relaxed text-neo-black/70 mb-4">
              {t(
                "cookies.description",
                "We use cookies to improve your experience. Necessary cookies are required for the site to function. Analytics and marketing cookies help us understand traffic and improve our services."
              )}{" "}
              <Link
                to={`/${locale ?? "en"}/cookie-policy`}
                className="underline underline-offset-2 decoration-neo-lime decoration-2 text-neo-black font-bold hover:text-neo-lime transition-colors"
              >
                {t("cookies.learnMore", "Learn more")}
              </Link>
            </p>

            {/* Manage Details Panel */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="border-2 border-neo-black bg-neo-white p-4 mb-4 space-y-4">
                    <Toggle
                      checked={true}
                      onChange={() => {}}
                      disabled={true}
                      label={t("cookies.necessary", "Necessary (Always on)")}
                    />
                    <div className="pl-14">
                      <p className="font-mono text-[10px] text-neo-black/50 leading-relaxed">
                        {t("cookies.necessaryDesc", "Required for the website to function. Cannot be disabled.")}
                      </p>
                    </div>

                    <Toggle
                      checked={localPrefs.analytics}
                      onChange={(v) => setLocalPrefs((p) => ({ ...p, analytics: v }))}
                      label={t("cookies.analytics", "Analytics")}
                    />
                    <div className="pl-14">
                      <p className="font-mono text-[10px] text-neo-black/50 leading-relaxed">
                        {t("cookies.analyticsDesc", "Help us understand how visitors interact with our website (Google Analytics).")}
                      </p>
                    </div>

                    <Toggle
                      checked={localPrefs.marketing}
                      onChange={(v) => setLocalPrefs((p) => ({ ...p, marketing: v }))}
                      label={t("cookies.marketing", "Marketing")}
                    />
                    <div className="pl-14">
                      <p className="font-mono text-[10px] text-neo-black/50 leading-relaxed">
                        {t("cookies.marketingDesc", "Used for targeted advertising and measuring ad campaign performance (Google Ads).")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={acceptAll}
                className="bg-neo-lime border-2 border-neo-black shadow-hard px-5 py-2.5 font-space font-bold text-xs uppercase tracking-wider text-neo-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
              >
                {t("cookies.acceptAll", "Accept All")}
              </button>

              <button
                onClick={rejectAll}
                className="bg-neo-white border-2 border-neo-black shadow-hard px-5 py-2.5 font-space font-bold text-xs uppercase tracking-wider text-neo-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
              >
                {t("cookies.rejectAll", "Reject All")}
              </button>

              {showDetails ? (
                <button
                  onClick={handleSave}
                  className="bg-neo-blue border-2 border-neo-black shadow-hard px-5 py-2.5 font-space font-bold text-xs uppercase tracking-wider text-neo-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150"
                >
                  {t("cookies.savePreferences", "Save Preferences")}
                </button>
              ) : (
                <button
                  onClick={() => setShowDetails(true)}
                  className="font-mono text-xs font-bold uppercase tracking-wider text-neo-black underline underline-offset-4 decoration-neo-black/30 decoration-2 hover:decoration-neo-lime transition-colors px-2 py-2.5"
                >
                  {t("cookies.manage", "Manage Cookies")}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
