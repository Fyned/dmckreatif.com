import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import NeoButton from "@/components/ui/NeoButton";
import { fadeInUp, viewportConfig } from "@/lib/animations";

export default function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="bg-neo-lime border-y-[6px] border-neo-black py-16 lg:py-24 relative">
      <div className="max-w-container mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h2 className="font-space font-bold text-h2 text-neo-black mb-3">
            {t("cta.title")}
          </h2>
          <p className="font-mono text-base text-neo-black/80">
            {t("cta.subtitle")}
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
            {t("cta.button")} <ArrowRight size={18} />
          </NeoButton>
          <a
            href="mailto:hello@dmckreatif.com"
            className="font-mono text-sm text-neo-black/80 hover:text-neo-black transition-colors"
          >
            {t("cta.email")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
