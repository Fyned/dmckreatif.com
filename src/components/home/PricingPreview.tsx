import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Star } from "lucide-react";
import { pricingTiers } from "@/lib/pricing-data";
import { templateTiers } from "@/lib/template-data";
import NeoButton from "@/components/ui/NeoButton";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

const bgMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime",
  "neo-yellow": "bg-neo-yellow",
  "neo-blue": "bg-neo-blue",
  "neo-purple": "bg-neo-purple",
};

const originalPrices: Record<string, string> = {
  launch: "€497",
  growth: "€997",
  scale: "€1,997",
  commerce: "€2,997",
};

export default function PricingPreview() {
  const { t } = useTranslation();

  return (
    <section className="py-section-sm lg:py-section bg-neo-black text-neo-bg relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neo-lime/5 rounded-full blur-[150px]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(#FFFDF5 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-container mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-12 text-center"
        >
          <span className="inline-block font-mono text-xs font-bold tracking-[0.2em] text-neo-lime mb-3 border-2 border-neo-lime/30 px-3 py-1">
            {t("pricing.sectionSubtitle", "SYS.INVESTMENT")}
          </span>
          <h2 className="font-space font-extrabold text-h2 lg:text-[3.5rem] text-neo-bg tracking-tight">
            {t("pricing.sectionTitle", "YOUR INVESTMENT")}
          </h2>
          <div className="w-16 h-1 bg-neo-lime mt-4 mx-auto" />

          {/* Discount banner */}
          <div className="mt-6 inline-flex items-center gap-2 bg-neo-lime/10 border-2 border-neo-lime px-4 py-2">
            <Zap size={16} className="text-neo-lime" strokeWidth={3} />
            <span className="font-space font-bold text-sm text-neo-lime uppercase tracking-wider">
              {t("promo.bannerShort", "25% OFF — LIMITED TIME")}
            </span>
          </div>
        </motion.div>

        {/* Template Quick Strip */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8 border-2 border-neo-lime/30 bg-neo-lime/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <span className="font-space font-bold text-sm uppercase text-neo-lime">
              {t("pricing.templatesFrom", "TEMPLATES FROM")}
            </span>
            <div className="flex gap-2">
              {templateTiers.map((tier) => (
                <span
                  key={tier.id}
                  className={`${bgMap[tier.color] ?? "bg-neo-lime"} border-2 border-neo-black px-3 py-1 font-mono text-xs font-bold text-neo-black`}
                >
                  €{tier.price}
                </span>
              ))}
            </div>
          </div>
          <NeoButton href="/templates" variant="outline" size="sm">
            {t("pricing.browseTemplates", "BROWSE")} <ArrowRight size={14} />
          </NeoButton>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pricingTiers.map((tier) => {
            const features = t(`pricing.${tier.featuresKey}`).split(" // ");
            const original = originalPrices[tier.id];
            return (
              <motion.div
                key={tier.id}
                variants={fadeInUp}
                className={`border-2 ${
                  tier.popular ? "border-neo-lime" : "border-neo-bg/20"
                } bg-neo-bg/5 relative ${
                  tier.popular ? "lg:-translate-y-3 shadow-[0_0_30px_rgba(205,255,80,0.15)]" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-neo-lime border-2 border-neo-black px-4 py-1 shadow-hard-sm flex items-center gap-1.5">
                      <Star size={12} className="text-neo-black" strokeWidth={3} />
                      <span className="font-space font-bold text-xs text-neo-black uppercase tracking-wider">
                        {t("pricing.popular")}
                      </span>
                    </div>
                  </div>
                )}

                <div className={`h-2 ${bgMap[tier.color] ?? "bg-neo-lime"}`} />

                <div className="p-6">
                  <h3 className="font-space font-bold text-lg mb-1 text-neo-bg">
                    {t(`pricing.${tier.nameKey}`)}
                  </h3>
                  <p className="font-mono text-xs text-neo-bg/50 uppercase tracking-wider mb-4">
                    {t("pricing.startingAt")}
                  </p>

                  {/* Price with strikethrough */}
                  <div className="mb-1">
                    {original && (
                      <span className="font-mono text-sm text-neo-bg/30 line-through mr-2">
                        {original}
                      </span>
                    )}
                    <span className="font-space font-extrabold text-4xl text-neo-lime">
                      €{tier.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-neo-bg/50 uppercase tracking-wider mb-6">
                    {t("pricing.delivery")}: {t(`pricing.${tier.deliveryKey}`)}
                  </p>

                  <div className="border-t border-neo-bg/10 pt-4 mb-6">
                    {features.slice(0, 5).map((feature) => (
                      <div key={feature} className="flex items-start gap-2 py-1.5">
                        <span className="w-1.5 h-1.5 bg-neo-lime mt-1.5 flex-shrink-0" />
                        <span className="font-mono text-sm text-neo-bg/70">{feature}</span>
                      </div>
                    ))}
                    {features.length > 5 && (
                      <p className="font-mono text-xs text-neo-bg/40 mt-1">
                        +{features.length - 5} more...
                      </p>
                    )}
                  </div>

                  <NeoButton href="/contact" size="sm" color={tier.color} className="w-full">
                    {t("pricing.getStarted")} <ArrowRight size={14} />
                  </NeoButton>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-12 text-center"
        >
          <NeoButton href="/pricing" variant="outline" size="md">
            {t("pricing.viewAll")} <ArrowRight size={14} />
          </NeoButton>
        </motion.div>
      </div>
    </section>
  );
}
