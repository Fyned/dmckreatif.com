"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { pricingTiers } from "@/lib/pricing-data";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

const bgMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime",
  "neo-yellow": "bg-neo-yellow",
  "neo-blue": "bg-neo-blue",
  "neo-purple": "bg-neo-purple",
};

export default function PricingPage() {
  const t = useTranslations("pricing");

  return (
    <div className="py-section-sm lg:py-section">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <span className="inline-block font-mono text-xs font-bold tracking-[0.2em] text-neo-black mb-3 border-2 border-neo-black bg-neo-bg-alt px-3 py-1">
            {t("sectionSubtitle")}
          </span>
          <h1 className="font-space font-bold text-h1 text-neo-black">
            {t("sectionTitle")}
          </h1>
          <div className="w-16 h-1 bg-neo-black mt-4" />
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {pricingTiers.map((tier) => {
            const features = t(tier.featuresKey).split(" // ");
            return (
              <motion.div
                key={tier.id}
                variants={fadeInUp}
                className={`border-2 border-neo-black bg-neo-white shadow-hard-lg relative ${
                  tier.popular ? "lg:-translate-y-2" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <NeoBadge color="neo-lime">{t("popular")}</NeoBadge>
                  </div>
                )}
                <div className={`h-2 ${bgMap[tier.color] ?? "bg-neo-lime"}`} />
                <div className="p-6">
                  <h3 className="font-space font-bold text-lg mb-1">
                    {t(tier.nameKey)}
                  </h3>
                  <p className="font-mono text-xs text-neo-black/80 uppercase tracking-wider mb-4">
                    {t("startingAt")}
                  </p>
                  <div className="font-space font-bold text-4xl mb-1">
                    &euro;{tier.price.toLocaleString()}
                  </div>
                  <p className="font-mono text-xs text-neo-black/80 uppercase tracking-wider mb-6">
                    {t("delivery")}: {t(tier.deliveryKey)}
                  </p>
                  <div className="border-t-2 border-neo-black pt-4 mb-6">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2 py-1.5">
                        <span className="w-1.5 h-1.5 bg-neo-black mt-1.5 flex-shrink-0" />
                        <span className="font-mono text-sm text-neo-black">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <NeoButton href="/contact" size="sm" color={tier.color} className="w-full">
                    {t("getStarted")} <ArrowRight size={14} />
                  </NeoButton>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Care Plan */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="border-2 border-neo-black bg-neo-lime p-8 lg:p-12 shadow-hard-lg mb-20 flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-space font-bold text-h3 mb-2">
              {t("carePlan")}
            </h3>
            <p className="font-mono text-sm text-neo-black/80">
              {t("carePlanDescription")}
            </p>
          </div>
          <div className="text-center lg:text-right">
            <div className="font-space font-bold text-3xl mb-2">
              {t("carePlanPrice")}
            </div>
            <NeoButton href="/contact" size="sm" variant="outline">
              {t("getStarted")} <ArrowRight size={14} />
            </NeoButton>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2
            variants={fadeInUp}
            className="font-space font-bold text-h2 mb-8"
          >
            {t("faqTitle")}
          </motion.h2>
          <div className="space-y-4">
            {([1, 2, 3, 4, 5] as const).map((n) => (
              <motion.div
                key={n}
                variants={fadeInUp}
                className="border-2 border-neo-black bg-neo-white p-6 shadow-hard-sm"
              >
                <h4 className="font-space font-bold text-sm mb-2">
                  {t(`faq${n}Q`)}
                </h4>
                <p className="font-mono text-sm text-neo-black/80 leading-relaxed">
                  {t(`faq${n}A`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
