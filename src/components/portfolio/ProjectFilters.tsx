import { useTranslation } from "react-i18next";

interface ProjectFiltersProps {
  activeCategory: string;
  activeCountry: string;
  onCategoryChange: (cat: string) => void;
  onCountryChange: (country: string) => void;
}

const categories = [
  { key: "all", labelKey: "portfolio.filterAll" },
  { key: "web", labelKey: "portfolio.filterWeb" },
  { key: "ecommerce", labelKey: "portfolio.filterEcommerce" },
  { key: "branding", labelKey: "portfolio.filterBranding" },
];

const countries = [
  { key: "all", labelKey: "portfolio.filterAll", flag: "" },
  { key: "FR", labelKey: "portfolio.filterFR", flag: "\ud83c\uddeb\ud83c\uddf7" },
  { key: "BE", labelKey: "portfolio.filterBE", flag: "\ud83c\udde7\ud83c\uddea" },
  { key: "UK", labelKey: "portfolio.filterUK", flag: "\ud83c\uddec\ud83c\udde7" },
  { key: "INT", labelKey: "portfolio.filterINT", flag: "\ud83c\udf0d" },
];

export default function ProjectFilters({
  activeCategory,
  activeCountry,
  onCategoryChange,
  onCountryChange,
}: ProjectFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 mb-10">
      <div className="flex flex-wrap gap-2">
        <span className="font-mono text-xs font-bold text-neo-black/60 uppercase tracking-wider self-center mr-2">
          {t("portfolio.filterByType")}:
        </span>
        {categories.map(({ key, labelKey }) => (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={`font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 border-2 border-neo-black transition-all duration-150 ${
              activeCategory === key
                ? "bg-neo-lime shadow-hard-sm"
                : "bg-neo-white hover:bg-neo-yellow"
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="font-mono text-xs font-bold text-neo-black/60 uppercase tracking-wider self-center mr-2">
          {t("portfolio.filterByCountry")}:
        </span>
        {countries.map(({ key, labelKey, flag }) => (
          <button
            key={key}
            onClick={() => onCountryChange(key)}
            className={`font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 border-2 border-neo-black transition-all duration-150 ${
              activeCountry === key
                ? "bg-neo-lime shadow-hard-sm"
                : "bg-neo-white hover:bg-neo-yellow"
            }`}
          >
            {flag && <span className="mr-1">{flag}</span>}
            {t(labelKey)}
          </button>
        ))}
      </div>
    </div>
  );
}
