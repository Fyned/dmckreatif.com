import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp, viewportConfig } from "@/lib/animations";

export default function StartProjectCTA() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const l = locale ?? "en";

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="py-12 px-6"
    >
      <div className="max-w-container mx-auto">
        <div className="border-2 border-neo-black bg-neo-lime shadow-hard p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-space font-bold text-xl lg:text-2xl uppercase">
              {t("internalLinks.ctaTitle", "Ready to Start Your Project?")}
            </h3>
            <p className="font-mono text-sm text-neo-black/70 mt-2">
              {t("internalLinks.ctaDescription", "Get a free quote for your website project. We deliver premium results.")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/${l}/contact`}
              className="inline-flex items-center gap-2 border-2 border-neo-black bg-neo-black text-neo-white px-6 py-3 font-space font-bold text-sm uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              {t("internalLinks.getQuote", "GET A QUOTE")}
              <ArrowRight size={16} />
            </Link>
            <Link
              to={`/${l}/services`}
              className="inline-flex items-center gap-2 border-2 border-neo-black bg-neo-white text-neo-black px-6 py-3 font-space font-bold text-sm uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              {t("internalLinks.viewServices", "VIEW SERVICES")}
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
