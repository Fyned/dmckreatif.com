import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { Campaign } from "@/types/database";

const SESSION_KEY = "campaign_banner_dismissed";

export default function CampaignBanner() {
  const { locale } = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed in this session
    const dismissedId = sessionStorage.getItem(SESSION_KEY);
    if (dismissedId) {
      setDismissed(true);
    }

    async function fetchActiveBanner() {
      const now = new Date().toISOString();
      const { data } = await supabase
        .from("campaigns")
        .select("*")
        .eq("active", true)
        .eq("placement", "banner")
        .or(`start_date.is.null,start_date.lte.${now}`)
        .or(`end_date.is.null,end_date.gte.${now}`)
        .limit(1)
        .single();

      if (data) {
        const c = data as unknown as Campaign;
        // If this campaign was dismissed, don't show it
        if (sessionStorage.getItem(SESSION_KEY) === c.id) return;
        setCampaign(c);
      }
    }

    fetchActiveBanner();
  }, []);

  function dismiss() {
    if (campaign) {
      sessionStorage.setItem(SESSION_KEY, campaign.id);
    }
    setDismissed(true);
  }

  if (dismissed || !campaign) return null;

  const ctaPath = campaign.cta_link.startsWith("/")
    ? `/${locale ?? "en"}${campaign.cta_link}`
    : campaign.cta_link;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-${campaign.banner_color} border-b-2 border-neo-black relative overflow-hidden`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-4">
          <p className="font-space font-bold text-sm text-neo-black text-center">
            {campaign.banner_text}
          </p>
          {campaign.cta_text && (
            <Link
              to={ctaPath}
              className="hidden sm:inline-block border-2 border-neo-black bg-neo-white px-4 py-1 font-mono text-xs font-bold uppercase hover:bg-neo-bg transition-colors whitespace-nowrap"
            >
              {campaign.cta_text}
            </Link>
          )}
          <button
            onClick={dismiss}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center border-2 border-neo-black bg-neo-white font-mono text-xs font-bold hover:bg-neo-red hover:text-neo-white transition-colors"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
