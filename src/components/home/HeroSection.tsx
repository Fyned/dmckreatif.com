"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import NeoButton from "@/components/ui/NeoButton";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const clients = [
  "CAKIR FACADES",
  "ALTINBAS",
  "CONSULTING ENERGY",
  "ADAMSONS",
  "ARCHI CONSTRUCTION",
  "ISO HOME ENERGY",
  "ATA ACCOUNTANCY",
  "FILENES SPORTS",
];

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[90vh] flex items-center py-20 lg:py-32 overflow-hidden">
      <div className="max-w-container mx-auto px-6 lg:px-10 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Status badge */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-flex items-center gap-2 border-2 border-neo-black bg-neo-white px-4 py-2 shadow-hard-sm">
              <span className="w-2 h-2 bg-neo-green border border-neo-black animate-pulse" />
              <span className="font-mono text-xs tracking-wider">
                {t("status")}
              </span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="font-space font-bold text-hero leading-[0.95] tracking-tight">
              {t("titleLine1")}
              <br />
              <span className="inline-block bg-neo-lime px-4 py-1 border-4 border-neo-black shadow-hard-lg mt-2">
                {t("titleAccent")}
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="font-mono text-base lg:text-lg text-neo-black max-w-xl mb-10 leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <NeoButton href="/contact" size="lg" color="neo-lime">
              {t("ctaPrimary")} <ArrowRight size={18} />
            </NeoButton>
            <NeoButton href="/portfolio" variant="outline" size="lg">
              {t("ctaSecondary")} <ExternalLink size={16} />
            </NeoButton>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-0 border-2 border-neo-black mb-12"
          >
            {(["stat1", "stat2", "stat3", "stat4"] as const).map((key, i) => (
              <div
                key={key}
                className={`flex-1 min-w-[120px] p-4 text-center ${
                  i < 3 ? "border-r-2 border-neo-black" : ""
                }`}
              >
                <div className="font-space font-bold text-2xl lg:text-3xl">
                  {t(key)}
                </div>
                <div className="font-mono text-xs font-bold text-neo-black/80 uppercase tracking-wider mt-1">
                  {t(`${key}Label`)}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Client ticker */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-x-3 gap-y-1"
          >
            {clients.map((name) => (
              <span
                key={name}
                className="font-mono text-xs text-neo-black/60 uppercase tracking-wider"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border-4 border-neo-lime shadow-hard hidden lg:block" />
      <div className="absolute bottom-20 right-20 w-12 h-12 bg-neo-yellow border-2 border-neo-black shadow-hard-sm hidden lg:block" />
      <div className="absolute bottom-40 right-40 w-8 h-8 bg-neo-pink border-2 border-neo-black hidden lg:block" />
    </section>
  );
}
