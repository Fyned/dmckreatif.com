import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Check } from "lucide-react";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import CountdownTimer from "@/components/ui/CountdownTimer";
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
          className="bg-neo-black border-4 border-neo-lime shadow-[8px_8px_0px_0px_#CDFF50] overflow-hidden relative"
        >
          {/* Animated glow background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neo-lime rounded-full blur-[120px]" />
          </div>

          {/* Top accent bar */}
          <div className="h-2 bg-neo-lime" />

          <div className="relative p-6 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left: Content */}
              <motion.div variants={fadeInUp} className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-neo-lime border-2 border-neo-black flex items-center justify-center shadow-hard-sm animate-pulse">
                    <Zap size={22} strokeWidth={2.5} />
                  </div>
                  <NeoBadge color="neo-lime">
                    {t("promo.badgeText", "LIMITED TIME OFFER")}
                  </NeoBadge>
                </div>

                <h2 className="font-space font-extrabold text-2xl lg:text-4xl text-neo-lime mb-3 uppercase tracking-tight">
                  {t("promo.homeTitle", "25% OFF ALL PACKAGES")}
                </h2>

                <p className="font-mono text-sm text-neo-lime/80 leading-relaxed mb-5 max-w-lg">
                  {t(
                    "promo.homeDescription",
                    "Launch your website at unbeatable prices. Limited-time introductory offer for new European clients."
                  )}
                </p>

                {/* Value highlights */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
                  {[
                    t("promo.perk1", "Free consultation"),
                    t("promo.perk2", "No hidden fees"),
                    t("promo.perk3", "Money-back guarantee"),
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
                  {t("promo.ctaButton", "CLAIM YOUR DISCOUNT")}{" "}
                  <ArrowRight size={16} />
                </NeoButton>
              </motion.div>

              {/* Right: Countdown + Price */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-center gap-4 flex-shrink-0"
              >
                <p className="font-mono text-xs text-neo-lime/60 uppercase tracking-widest">
                  {t("promo.offerEndsIn", "OFFER ENDS IN")}
                </p>

                <CountdownTimer variant="large" />

                <div className="flex items-center gap-3 mt-2">
                  <span className="font-mono text-lg text-neo-lime/40 line-through">
                    €697
                  </span>
                  <div className="bg-neo-lime border-2 border-neo-black px-5 py-3 shadow-hard">
                    <span className="font-space font-extrabold text-3xl lg:text-4xl text-neo-black">
                      €497
                    </span>
                  </div>
                </div>

                <p className="font-mono text-[10px] text-neo-lime/40 uppercase tracking-wider">
                  {t("promo.oneTime", "ONE-TIME PAYMENT • SAVE 25%")}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
