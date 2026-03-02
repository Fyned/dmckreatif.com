import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import ProgressBar from "./ProgressBar";
import CampaignBanner from "./CampaignBanner";
import TopPromoBanner from "./TopPromoBanner";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import CampaignPopup from "@/components/ui/CampaignPopup";
import SocialProofNotification from "@/components/ui/SocialProofNotification";
import MagneticCursor from "@/components/ui/MagneticCursor";

export default function AppLayout() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-neo-bg">
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-neo-lime focus:text-neo-black focus:border-2 focus:border-neo-black focus:font-mono focus:text-sm focus:font-bold focus:uppercase focus:tracking-wider focus:shadow-hard-sm"
      >
        {t("a11y.skipToContent", "Skip to main content")}
      </a>
      <TopPromoBanner />
      <ProgressBar />
      <Header />
      <CampaignBanner />
      <main id="main-content" className="flex-1" role="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.4, 0, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyMobileCTA />
      <CampaignPopup />
      <ExitIntentPopup />
      <SocialProofNotification />
      <MagneticCursor />
    </div>
  );
}
