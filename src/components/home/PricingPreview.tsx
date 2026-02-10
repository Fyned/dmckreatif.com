"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { pricingTiers } from "@/lib/pricing-data";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

const bgMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime",
  "neo-yellow": "bg-neo-yellow",
  "neo-blue": "bg-neo-blue",
  "neo-purple": "bg-neo-purple",
};

export default function PricingPreview() {
  const t = useTranslations("pricing");

  return (
    <section className="py-section-sm lg:py-section">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <SectionHeader
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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

                {/* Color bar */}
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
                      <div
                        key={feature}
                        className="flex items-start gap-2 py-1.5"
                      >
                        <span className="w-1.5 h-1.5 bg-neo-black mt-1.5 flex-shrink-0" />
                        <span className="font-mono text-sm text-neo-black">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <NeoButton
                    href="/contact"
                    size="sm"
                    color={tier.color}
                    className="w-full"
                  >
                    {t("getStarted")} <ArrowRight size={14} />
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
          className="mt-12"
        >
          <NeoButton href="/pricing" variant="outline" size="md">
            {t("viewAll")} <ArrowRight size={14} />
          </NeoButton>
        </motion.div>
      </div>
    </section>
  );
}
