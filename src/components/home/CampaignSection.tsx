import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

export default function CampaignSection() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const currentLocale = locale ?? "en";

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="bg-neo-black border-4 border-neo-lime shadow-hard-lg overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="h-2 bg-neo-lime" />

          <div className="p-6 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left: Content */}
              <motion.div variants={fadeInUp} className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-neo-lime border-2 border-neo-black flex items-center justify-center shadow-hard-sm">
                    <Sparkles size={22} strokeWidth={2.5} />
                  </div>
                  <NeoBadge color="neo-lime">
                    {t("promo.badgeText", "LAUNCH PRICING")}
                  </NeoBadge>
                </div>

                <h2 className="font-space font-bold text-2xl lg:text-3xl text-neo-lime mb-3">
                  {t("promo.homeTitle", "INTRODUCTORY PRICES FOR 2026")}
                </h2>

                <p className="font-mono text-sm text-neo-lime/80 leading-relaxed mb-4 max-w-lg">
                  {t(
                    "promo.homeDescription",
                    "We are growing our European client base. Take advantage of our introductory pricing — premium quality at accessible rates."
                  )}
                </p>

                {/* Value highlights */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
                  {[
                    t("promo.perk1", "Free consultation"),
                    t("promo.perk2", "No hidden fees"),
                    t("promo.perk3", "Satisfaction guaranteed"),
                  ].map((perk) => (
                    <div
                      key={perk}
                      className="flex items-center gap-1.5 bg-neo-lime/10 border border-neo-lime/30 px-3 py-1.5"
                    >
                      <Check size={12} className="text-neo-lime flex-shrink-0" />
                      <span className="font-mono text-xs font-bold text-neo-lime">
                        {perk}
                      </span>
                    </div>
                  ))}
                </div>

                <NeoButton
                  href={`/${currentLocale}/pricing`}
                  size="lg"
                  color="neo-lime"
                >
                  {t("promo.ctaButton", "VIEW PRICING")}{" "}
                  <ArrowRight size={16} />
                </NeoButton>
              </motion.div>

              {/* Right: Price highlights */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-center gap-3 flex-shrink-0"
              >
                <p className="font-mono text-xs text-neo-lime/60 uppercase tracking-widest">
                  {t("promo.startingFrom", "STARTING FROM")}
                </p>
                <div className="bg-neo-lime border-2 border-neo-black px-6 py-4 shadow-hard text-center">
                  <span className="font-space font-bold text-3xl lg:text-4xl text-neo-black">
                    {"\u20AC"}349
                  </span>
                </div>
                <p className="font-mono text-[10px] text-neo-lime/40 uppercase tracking-wider">
                  {t("promo.oneTime", "ONE-TIME PAYMENT")}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
