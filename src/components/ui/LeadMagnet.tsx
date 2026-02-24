import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Mail, CheckCircle2, FileText, X } from "lucide-react";
import NeoButton from "@/components/ui/NeoButton";
import { supabase } from "@/lib/supabase";

interface LeadMagnetProps {
  resourceKey: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function LeadMagnet({
  resourceKey,
  icon,
  className = "",
}: LeadMagnetProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showModal, setShowModal] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const { error } = await supabase
        .from("lead_magnet_downloads")
        .insert({ email: email.trim(), resource: resourceKey });

      if (error && error.code !== "23505") {
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Trigger button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowModal(true)}
        className={`flex items-center gap-3 border-2 border-neo-black bg-neo-white p-4 shadow-hard hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-full text-left ${className}`}
      >
        <div className="flex-shrink-0 w-10 h-10 bg-neo-lime border-2 border-neo-black flex items-center justify-center">
          {icon ?? <FileText size={18} />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-space font-bold text-sm text-neo-black truncate">
            {t(`leadMagnet.${resourceKey}.title`)}
          </p>
          <p className="font-mono text-xs text-neo-black/60 truncate">
            {t("leadMagnet.freeDownload", "Free Download — PDF")}
          </p>
        </div>
        <Download size={16} className="text-neo-black/50 flex-shrink-0" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-neo-black/60"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neo-white border-4 border-neo-black shadow-hard-lg p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 p-1 border-2 border-neo-black hover:bg-neo-lime transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-neo-lime border-2 border-neo-black flex items-center justify-center">
                  <Download size={20} />
                </div>
                <div>
                  <h3 className="font-space font-bold text-lg">
                    {t(`leadMagnet.${resourceKey}.title`)}
                  </h3>
                  <p className="font-mono text-xs text-neo-black/60">
                    {t(`leadMagnet.${resourceKey}.desc`)}
                  </p>
                </div>
              </div>

              {status === "success" ? (
                <div className="text-center py-4">
                  <CheckCircle2 size={48} className="text-neo-green mx-auto mb-3" />
                  <p className="font-space font-bold text-lg mb-1">
                    {t("leadMagnet.thankYou", "Thank You!")}
                  </p>
                  <p className="font-mono text-sm text-neo-black/70">
                    {t("leadMagnet.checkEmail", "Check your email for the download link.")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block font-mono text-xs font-bold uppercase tracking-wider mb-2"
                    >
                      {t("leadMagnet.emailLabel", "Your Email")}
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Mail
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-neo-black/40"
                        />
                        <input
                          id="lead-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="hello@company.com"
                          required
                          className="w-full pl-10 pr-4 py-3 border-2 border-neo-black font-mono text-sm bg-neo-bg focus:outline-none focus:border-neo-lime"
                        />
                      </div>
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="font-mono text-xs text-neo-red">
                      {t("leadMagnet.error", "Something went wrong. Please try again.")}
                    </p>
                  )}

                  <NeoButton
                    type="submit"
                    color="neo-lime"
                    disabled={status === "loading"}
                    className="w-full"
                  >
                    <Download size={16} />
                    {status === "loading"
                      ? t("leadMagnet.sending", "Sending...")
                      : t("leadMagnet.downloadNow", "Download Now")}
                  </NeoButton>

                  <p className="font-mono text-[10px] text-neo-black/40 text-center">
                    {t("leadMagnet.noSpam", "No spam, ever. Unsubscribe anytime.")}
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
