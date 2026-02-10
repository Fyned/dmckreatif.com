"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/testimonials-data";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, viewportConfig } from "@/lib/animations";

const borderColorMap: Record<string, string> = {
  "neo-lime": "border-neo-lime",
  "neo-yellow": "border-neo-yellow",
  "neo-pink": "border-neo-pink",
  "neo-blue": "border-neo-blue",
};

export default function TestimonialsMarquee() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-section-sm lg:py-section section-alt">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <SectionHeader
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />
      </div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="overflow-hidden pause-on-hover"
      >
        <div className="marquee-track flex animate-marquee gap-6 px-6">
          {[...testimonials, ...testimonials].map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className={`flex-shrink-0 w-[400px] border-2 border-neo-black bg-neo-white p-6 shadow-hard ${
                borderColorMap[item.accentColor] ?? "border-neo-black"
              } border-l-6`}
            >
              {/* Terminal-style header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  <span className="w-2.5 h-2.5 bg-neo-red border border-neo-black" />
                  <span className="w-2.5 h-2.5 bg-neo-yellow border border-neo-black" />
                  <span className="w-2.5 h-2.5 bg-neo-green border border-neo-black" />
                </div>
                <span className="font-mono text-xs text-neo-black/70 uppercase tracking-wider">
                  {item.id.toUpperCase()}.LOG
                </span>
              </div>

              <p className="font-mono text-sm text-neo-black leading-relaxed mb-4">
                &ldquo;{t(item.quoteKey)}&rdquo;
              </p>

              <div className="border-t-2 border-neo-black/30 pt-3 flex items-center justify-between">
                <div>
                  <p className="font-space font-bold text-sm">
                    {t(item.nameKey)}
                  </p>
                  <p className="font-mono text-xs text-neo-black/70 uppercase">
                    {t(item.roleKey)} @ {item.company}
                  </p>
                </div>
                <span className="text-lg">{item.flag}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
