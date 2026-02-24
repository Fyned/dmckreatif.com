import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo-schemas";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useTranslation();
  const { locale } = useParams();
  const currentLocale = locale ?? "en";

  const fullItems = [
    { label: t("nav.home", "HOME"), href: `/${currentLocale}` },
    ...items,
  ];

  const schemaItems = fullItems
    .filter((item) => item.href)
    .map((item) => ({
      name: item.label,
      path: item.href?.replace(`/${currentLocale}`, "") ?? "/",
    }));

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(currentLocale, schemaItems)} />
      <nav
        aria-label="Breadcrumb"
        className="py-4 px-6 lg:px-10 max-w-container mx-auto"
      >
        <ol className="flex items-center gap-1 flex-wrap font-mono text-[10px] uppercase tracking-wider">
          {fullItems.map((item, i) => {
            const isLast = i === fullItems.length - 1;
            return (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight
                    size={10}
                    className="text-neo-black/30 shrink-0"
                  />
                )}
                {isLast || !item.href ? (
                  <span className="text-neo-black/50" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="text-neo-black/70 hover:text-neo-lime transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
