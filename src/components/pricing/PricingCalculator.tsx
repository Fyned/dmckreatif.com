import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";
import NeoButton from "@/components/ui/NeoButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { fadeInUp, viewportConfig } from "@/lib/animations";

interface Feature {
  key: string;
  price: number;
}

const features: Feature[] = [
  { key: "pages", price: 0 },
  { key: "responsive", price: 0 },
  { key: "seo", price: 0 },
  { key: "multilingual", price: 300 },
  { key: "ecommerce", price: 800 },
  { key: "blog", price: 200 },
  { key: "analytics", price: 100 },
  { key: "animations", price: 200 },
];

const pageOptions = [
  { pages: 1, basePrice: 297 },
  { pages: 5, basePrice: 497 },
  { pages: 10, basePrice: 997 },
  { pages: 15, basePrice: 1497 },
  { pages: 20, basePrice: 1997 },
];

export default function PricingCalculator() {
  const { t } = useTranslation();
  const [selectedPages, setSelectedPages] = useState(1);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const estimate = useMemo(() => {
    const pageConfig = pageOptions.find((p) => p.pages === selectedPages) ?? pageOptions[0];
    const featureCost = features
      .filter((f) => selectedFeatures.includes(f.key))
      .reduce((sum, f) => sum + f.price, 0);
    return pageConfig.basePrice + featureCost;
  }, [selectedPages, selectedFeatures]);

  function toggleFeature(key: string) {
    setSelectedFeatures((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="bg-neo-white border-4 border-neo-black shadow-hard-lg p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-neo-lime border-2 border-neo-black flex items-center justify-center">
          <Calculator size={20} />
        </div>
        <h3 className="font-space font-bold text-xl uppercase">
          {t("pricing.calculator.title", "Price Estimator")}
        </h3>
      </div>

      {/* Page count */}
      <div className="mb-6">
        <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-3">
          {t("pricing.calculator.pages", "Number of Pages")}
        </label>
        <div className="flex flex-wrap gap-2">
          {pageOptions.map((opt) => (
            <button
              key={opt.pages}
              onClick={() => setSelectedPages(opt.pages)}
              className={`px-4 py-2 border-2 border-neo-black font-mono text-sm font-bold transition-all ${
                selectedPages === opt.pages
                  ? "bg-neo-lime shadow-hard-sm"
                  : "bg-neo-white hover:bg-neo-yellow"
              }`}
            >
              {opt.pages}
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-8">
        <label className="block font-mono text-xs font-bold uppercase tracking-wider mb-3">
          {t("pricing.calculator.features", "Features")}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {features
            .filter((f) => f.price > 0)
            .map((feature) => (
              <button
                key={feature.key}
                onClick={() => toggleFeature(feature.key)}
                className={`flex items-center gap-2 px-3 py-2 border-2 border-neo-black font-mono text-xs transition-all text-left ${
                  selectedFeatures.includes(feature.key)
                    ? "bg-neo-lime shadow-hard-sm"
                    : "bg-neo-white hover:bg-neo-bg"
                }`}
              >
                <span className="w-4 h-4 border-2 border-neo-black flex items-center justify-center text-[10px] flex-shrink-0">
                  {selectedFeatures.includes(feature.key) ? "✓" : ""}
                </span>
                <span className="flex-1">
                  {t(`pricing.calculator.feat.${feature.key}`, feature.key)}
                </span>
                <span className="text-neo-black/50">+€{feature.price}</span>
              </button>
            ))}
        </div>
      </div>

      {/* Result */}
      <div className="bg-neo-bg border-2 border-neo-black p-6 text-center mb-4">
        <p className="font-mono text-xs uppercase tracking-wider text-neo-black/60 mb-1">
          {t("pricing.calculator.estimated", "Estimated Price")}
        </p>
        <div className="font-space font-bold text-4xl text-neo-black">
          €<AnimatedCounter target={estimate} duration={0.6} />
        </div>
        <p className="font-mono text-[10px] text-neo-black/40 mt-1">
          {t("pricing.calculator.disclaimer", "Final price may vary based on project complexity")}
        </p>
      </div>

      <NeoButton href="/contact" color="neo-lime" className="w-full">
        {t("pricing.calculator.getQuote", "Get Exact Quote")}
        <ArrowRight size={16} />
      </NeoButton>
    </motion.div>
  );
}
