"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code2, ShoppingBag, TrendingUp, Megaphone, ArrowRight } from "lucide-react";
import NeoButton from "@/components/ui/NeoButton";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const services = [
  { key: "webDev", Icon: Code2, color: "neo-lime", bgColor: "bg-neo-lime" },
  { key: "ecommerce", Icon: ShoppingBag, color: "neo-yellow", bgColor: "bg-neo-yellow" },
  { key: "seo", Icon: TrendingUp, color: "neo-blue", bgColor: "bg-neo-blue" },
  { key: "marketing", Icon: Megaphone, color: "neo-pink", bgColor: "bg-neo-pink" },
] as const;

export default function ServicesPage() {
  const t = useTranslations("services");

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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {services.map(({ key, Icon, color, bgColor }) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className="border-2 border-neo-black bg-neo-white shadow-hard-lg p-8 lg:p-12 flex flex-col lg:flex-row items-start gap-8"
            >
              <div className={`${bgColor} p-4 border-2 border-neo-black shadow-hard flex-shrink-0`}>
                <Icon size={48} className="text-neo-black" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h2 className="font-space font-bold text-h3 mb-4">
                  {t(`${key}.title`)}
                </h2>
                <p className="font-mono text-sm text-neo-black/80 leading-relaxed mb-6 max-w-2xl">
                  {t(`${key}.description`)}
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-space font-bold text-xl">
                    {t(`${key}.priceRange`)}
                  </span>
                  <NeoButton href="/contact" size="sm" color={color}>
                    GET STARTED <ArrowRight size={14} />
                  </NeoButton>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
