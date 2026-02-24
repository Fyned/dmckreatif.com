import { useTranslation } from "react-i18next";
import type { TemplateCategory } from "@/types/database";

interface TemplateCategoryFilterProps {
  categories: TemplateCategory[];
  selected: string | null;
  onChange: (slug: string | null) => void;
}

export default function TemplateCategoryFilter({
  categories,
  selected,
  onChange,
}: TemplateCategoryFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {/* All button */}
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`border-2 border-neo-black px-4 py-2 font-mono text-xs font-bold uppercase whitespace-nowrap transition-colors duration-150 ${
          selected === null
            ? "bg-neo-lime shadow-hard-sm"
            : "bg-neo-white hover:bg-neo-yellow"
        }`}
      >
        {t("templates.filterAll", "All")}
      </button>

      {/* Category buttons */}
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onChange(category.slug)}
          className={`border-2 border-neo-black px-4 py-2 font-mono text-xs font-bold uppercase whitespace-nowrap transition-colors duration-150 ${
            selected === category.slug
              ? "bg-neo-lime shadow-hard-sm"
              : "bg-neo-white hover:bg-neo-yellow"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
