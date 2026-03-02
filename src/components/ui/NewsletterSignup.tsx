import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterSignup() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const { supabase } = await import("@/lib/supabase");
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.trim().toLowerCase(), locale: locale ?? "en" });

      if (error) {
        if (error.code === "23505") {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } else {
        setStatus("success");
      }
      setEmail("");
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <div>
      <h4 className="font-space font-bold text-sm text-neo-lime mb-3 tracking-wider">
        {t("newsletter.title", "NEWSLETTER")}
      </h4>
      <p className="font-mono text-xs text-neo-bg/60 mb-3 leading-relaxed">
        {t("newsletter.description", "Get web dev tips & agency insights. No spam.")}
      </p>

      <form onSubmit={handleSubmit} className="flex gap-0">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("newsletter.placeholder", "your@email.com")}
          required
          disabled={status === "loading"}
          className="flex-1 min-w-0 px-3 py-2.5 bg-neo-bg/10 border-2 border-neo-bg/30 font-mono text-xs text-neo-bg placeholder:text-neo-bg/30 focus:border-neo-lime focus:outline-none disabled:opacity-50"
          aria-label={t("newsletter.placeholder", "your@email.com")}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2.5 bg-neo-lime text-neo-black border-2 border-neo-lime font-mono text-xs font-bold uppercase tracking-wider hover:bg-neo-yellow transition-colors disabled:opacity-50 shrink-0"
        >
          {status === "loading"
            ? "..."
            : t("newsletter.subscribe", "GO")}
        </button>
      </form>

      <AnimatePresence>
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-mono text-[10px] text-neo-lime mt-2"
          >
            {t("newsletter.success", "Subscribed! Welcome aboard.")}
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-mono text-[10px] text-neo-red mt-2"
          >
            {t("newsletter.error", "Something went wrong. Try again.")}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
