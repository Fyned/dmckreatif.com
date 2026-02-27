import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import NeoButton from "@/components/ui/NeoButton";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { BOOKING_URL } from "@/lib/constants";

export default function HeroSection() {
  const { t } = useTranslation();

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
                {t("hero.status")}
              </span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="font-space font-bold text-hero leading-[0.95] tracking-tight">
              {t("hero.titleLine1")}
              <br />
              <span className="inline-block bg-neo-lime px-5 py-2 border-4 border-neo-black shadow-hard-lg mt-2 leading-tight">
                {t("hero.titleAccent")}
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="font-mono text-base lg:text-lg text-neo-black max-w-xl mb-10 leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mb-4"
          >
            <NeoButton href="/contact" size="lg" color="neo-lime">
              {t("hero.ctaPrimary")} <ArrowRight size={18} />
            </NeoButton>
            <NeoButton href="/portfolio" variant="outline" size="lg">
              {t("hero.ctaSecondary")} <ExternalLink size={16} />
            </NeoButton>
          </motion.div>

          {/* Book a call link */}
          <motion.div variants={fadeInUp} className="mb-2">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-neo-black/50 hover:text-neo-lime transition-colors"
            >
              {t("hero.bookCall", "or book a free 15-min call \u2192")}
              <ArrowRight size={12} />
            </a>
          </motion.div>

          {/* Micro-copy */}
          <motion.p
            variants={fadeInUp}
            className="font-mono text-xs text-neo-black/50 tracking-wider mb-16"
          >
            {t("hero.microCopy", "Handcrafted by professional developers \u2022 10+ international projects delivered")}
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-0 border-2 border-neo-black"
          >
            {(["stat1", "stat2", "stat3", "stat4"] as const).map((key, i) => (
              <div
                key={key}
                className={`flex-1 min-w-[120px] p-4 text-center ${
                  i < 3 ? "border-r-2 border-neo-black" : ""
                }`}
              >
                <div className="font-space font-bold text-2xl lg:text-3xl">
                  {t(`hero.${key}`)}
                </div>
                <div className="font-mono text-xs font-bold text-neo-black/80 uppercase tracking-wider mt-1">
                  {t(`hero.${key}Label`)}
                </div>
              </div>
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
