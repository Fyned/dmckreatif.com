import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";

const DISMISS_KEY = "dmc_sticky_cta_dismissed";

export default function StickyMobileCTA() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem(DISMISS_KEY) === "1"
  );

  useEffect(() => {
    if (dismissed) return;

    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(DISMISS_KEY, "1");
  };

  const l = locale ?? "en";

  return (
    <div className="fixed bottom-0 left-0 w-full z-30 md:hidden bg-neo-lime border-t-2 border-neo-black shadow-[0_-4px_0_0_#1a1a1a] py-3 px-4 pr-20">
      <div className="flex items-center justify-between gap-3">
        <span className="font-space font-bold text-sm text-neo-black truncate">
          {t("stickyMobile.text", "Start your project today")}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={`/${l}/contact`}
            className="inline-flex items-center bg-neo-black text-neo-white border-2 border-neo-black px-3 py-1.5 font-space font-bold text-xs uppercase tracking-wider hover:bg-neo-black/90 transition-colors"
          >
            {t("stickyMobile.cta", "GET A QUOTE")}
          </a>
          <button
            type="button"
            onClick={handleDismiss}
            className="w-7 h-7 flex items-center justify-center border-2 border-neo-black bg-neo-white hover:bg-neo-red hover:text-neo-white transition-colors"
            aria-label={t("stickyMobile.close", "Close")}
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
