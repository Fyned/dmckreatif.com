"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import NeoButton from "@/components/ui/NeoButton";
import { fadeInUp, viewportConfig } from "@/lib/animations";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="bg-neo-lime border-y-6 border-neo-black py-16 lg:py-24 relative">
      <div className="max-w-container mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h2 className="font-space font-bold text-h2 text-neo-black mb-3">
            {t("title")}
          </h2>
          <p className="font-mono text-base text-neo-black/80">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <NeoButton href="/contact" size="lg" variant="outline">
            {t("button")} <ArrowRight size={18} />
          </NeoButton>
          <a
            href="mailto:hello@dmckreatif.com"
            className="font-mono text-sm text-neo-black/80 hover:text-neo-black transition-colors"
          >
            {t("email")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
