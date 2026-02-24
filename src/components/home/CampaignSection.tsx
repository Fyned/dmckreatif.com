import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import CountdownTimer from "@/components/ui/CountdownTimer";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

export default function CampaignSection() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const currentLocale = locale ?? "en";

  const countdownLabels = {
    days: t("promo.days", "DAYS"),
    hours: t("promo.hours", "HRS"),
    min: t("promo.min", "MIN"),
    sec: t("promo.sec", "SEC"),
  };

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
                    {t("promo.badgeText", "LIMITED TIME OFFER")}
                  </NeoBadge>
                </div>

                <h2 className="font-space font-bold text-2xl lg:text-3xl text-neo-lime mb-3">
                  {t("promo.homeTitle", "UP TO 25% OFF ALL PACKAGES")}
                </h2>

                <p className="font-mono text-sm text-neo-lime/80 leading-relaxed mb-4 max-w-lg">
                  {t(
                    "promo.homeDescription",
                    "Launch your professional website at unbeatable prices. Custom development packages are on sale for a limited time only!"
                  )}
                </p>

                {/* Savings highlights */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
                  {[
                    { from: "465", to: "349" },
                    { from: "999", to: "749" },
                    { from: "1,996", to: "1,497" },
                    { from: "3,329", to: "2,497" },
                  ].map((deal) => (
                    <div
                      key={deal.to}
                      className="flex items-center gap-1 bg-neo-lime/10 border border-neo-lime/30 px-2 py-1"
                    >
                      <span className="font-mono text-[10px] text-neo-lime/50 line-through">
                        {"\u20AC"}{deal.from}
                      </span>
                      <span className="font-mono text-xs font-bold text-neo-lime">
                        {"\u20AC"}{deal.to}
                      </span>
                    </div>
                  ))}
                </div>

                <NeoButton
                  href={`/${currentLocale}/pricing`}
                  size="lg"
                  color="neo-lime"
                >
                  {t("promo.ctaButton", "VIEW DISCOUNTED PRICES")}{" "}
                  <ArrowRight size={16} />
                </NeoButton>
              </motion.div>

              {/* Right: Countdown */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-center gap-4 flex-shrink-0"
              >
                <p className="font-mono text-xs text-neo-lime/60 uppercase tracking-widest">
                  {t("promo.endsIn", "OFFER ENDS IN")}
                </p>
                <CountdownTimer labels={countdownLabels} size="lg" />
                <p className="font-mono text-[10px] text-neo-lime/40 uppercase tracking-wider">
                  {t("promo.dontMiss", "DON'T MISS OUT")}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
