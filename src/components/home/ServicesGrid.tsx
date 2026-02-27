import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Code2, ShoppingBag, TrendingUp, Megaphone, ChevronDown } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const services = [
  { key: "webDev", Icon: Code2, color: "neo-lime", num: "01" },
  { key: "ecommerce", Icon: ShoppingBag, color: "neo-yellow", num: "02" },
  { key: "seo", Icon: TrendingUp, color: "neo-blue", num: "03" },
  { key: "marketing", Icon: Megaphone, color: "neo-pink", num: "04" },
] as const;

const hoverBgMap: Record<string, string> = {
  "neo-lime": "hover:bg-neo-lime",
  "neo-yellow": "hover:bg-neo-yellow",
  "neo-blue": "hover:bg-neo-blue",
  "neo-pink": "hover:bg-neo-pink",
};

const iconBgMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime",
  "neo-yellow": "bg-neo-yellow",
  "neo-blue": "bg-neo-blue",
  "neo-pink": "bg-neo-pink",
};

export default function ServicesGrid() {
  const { t } = useTranslation();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  return (
    <section className="py-section-sm lg:py-section">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <SectionHeader title={t("services.sectionTitle")} subtitle={t("services.sectionSubtitle")} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-neo-black"
        >
          {services.map(({ key, Icon, color, num }, i) => {
            const isExpanded = expandedKey === key;
            return (
              <motion.div
                key={key}
                variants={fadeInUp}
                className={`group bg-neo-white p-8 lg:p-10 transition-all duration-300 ${hoverBgMap[color] ?? ""} ${
                  i < services.length - 1
                    ? "lg:border-r-2 border-b-2 lg:border-b-0 border-neo-black"
                    : ""
                }`}
              >
                <span className="font-mono text-xs font-bold text-neo-black/60 tracking-wider mb-4 block">
                  {`>_ SERVICE_${num}`}
                </span>

                <div className={`inline-flex items-center justify-center w-16 h-16 ${iconBgMap[color] ?? "bg-neo-lime"} border-2 border-neo-black shadow-hard-sm mb-6`}>
                  <Icon size={32} className="text-neo-black" strokeWidth={2} />
                </div>

                <h3 className="font-space font-bold text-xl mb-3 text-neo-black">
                  {t(`services.${key}.title`)}
                </h3>

                <div className="relative mb-4">
                  <p className={`font-mono text-sm text-neo-black leading-relaxed transition-all duration-300 ${
                    isExpanded ? "" : "line-clamp-3"
                  }`}>
                    {t(`services.${key}.description`)}
                  </p>
                  <button
                    onClick={() => setExpandedKey(isExpanded ? null : key)}
                    className="mt-2 inline-flex items-center gap-1 font-mono text-xs font-bold text-neo-black/70 hover:text-neo-black transition-colors"
                  >
                    {isExpanded ? t("services.showLess") : t("services.readMore")}
                    <ChevronDown size={12} className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                  </button>
                </div>

                <span className="font-space font-bold text-lg text-neo-black">
                  {t(`services.${key}.priceRange`)}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
