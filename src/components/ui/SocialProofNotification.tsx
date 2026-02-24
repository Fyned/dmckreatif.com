import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ProofItem {
  city: string;
  flag: string;
  action: string;
}

const proofItems: ProofItem[] = [
  { city: "Paris", flag: "🇫🇷", action: "started a web project" },
  { city: "London", flag: "🇬🇧", action: "ordered an e-commerce site" },
  { city: "Brussels", flag: "🇧🇪", action: "booked a free consultation" },
  { city: "Amsterdam", flag: "🇳🇱", action: "launched their new website" },
  { city: "Berlin", flag: "🇩🇪", action: "upgraded to Growth plan" },
  { city: "Lyon", flag: "🇫🇷", action: "requested an SEO audit" },
  { city: "Manchester", flag: "🇬🇧", action: "started a web project" },
  { city: "Antwerp", flag: "🇧🇪", action: "ordered a template" },
  { city: "Rotterdam", flag: "🇳🇱", action: "booked a free consultation" },
  { city: "Munich", flag: "🇩🇪", action: "launched their new website" },
];

export default function SocialProofNotification() {
  const [current, setCurrent] = useState<ProofItem | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);

  const showNext = useCallback(() => {
    if (dismissed) return;
    setCurrent(proofItems[index % proofItems.length]);
    setIndex((prev) => prev + 1);

    // Auto-hide after 5 seconds
    setTimeout(() => setCurrent(null), 5000);
  }, [index, dismissed]);

  useEffect(() => {
    // Don't show for returning visitors
    const seen = sessionStorage.getItem("dmckreatif_sp_seen");
    if (seen) {
      setDismissed(true);
      return;
    }

    // First notification after 15 seconds
    const initialTimer = setTimeout(showNext, 15000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (dismissed || index === 0) return;

    // Show next notification every 35-45 seconds
    const delay = 35000 + Math.random() * 10000;
    const timer = setTimeout(showNext, delay);

    return () => clearTimeout(timer);
  }, [index, dismissed, showNext]);

  function handleDismiss() {
    setCurrent(null);
    setDismissed(true);
    sessionStorage.setItem("dmckreatif_sp_seen", "1");
  }

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-24 left-4 z-40 flex items-center gap-3 bg-neo-white border-2 border-neo-black shadow-hard px-4 py-3 max-w-xs"
        >
          <span className="text-2xl flex-shrink-0">{current.flag}</span>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs text-neo-black">
              <span className="font-bold">Someone from {current.city}</span>{" "}
              {current.action}
            </p>
            <p className="font-mono text-[10px] text-neo-black/40 mt-0.5">
              {Math.floor(Math.random() * 10) + 1} min ago
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-neo-bg transition-colors flex-shrink-0"
            aria-label="Dismiss notification"
          >
            <X size={12} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
