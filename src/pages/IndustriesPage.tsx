import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import {
  ArrowRight,
  HardHat,
  Flame,
  Calculator,
  HeartPulse,
  GraduationCap,
  ShoppingCart,
  Briefcase,
  Plane,
  Layers,
} from "lucide-react";
import { useState } from "react";
import NeoButton from "@/components/ui/NeoButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  viewportConfig,
} from "@/lib/animations";
import { industries } from "@/data/industries";

const ICON_MAP: Record<string, React.ElementType> = {
  HardHat,
  Flame,
  Calculator,
  HeartPulse,
  GraduationCap,
  ShoppingCart,
  Briefcase,
  Plane,
};

const CATEGORIES = [
  { key: "all", label: "ALL" },
  { key: "building", label: "BUILDING" },
  { key: "services", label: "SERVICES" },
  { key: "commerce", label: "COMMERCE" },
  { key: "public", label: "PUBLIC" },
] as const;

export default function IndustriesPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const currentLocale = locale ?? "en";
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? industries
      : industries.filter((ind) => ind.category === activeFilter);

  return (
    <>
      <SeoHead
        title={t("seo.industries.title", "Industries We Serve | DMC Kreatif")}
        description={t(
          "seo.industries.description",
          "Premium web development for Construction, Energy, Accounting, Healthcare, Education, E-Commerce, Professional Services, and Tourism across Europe."
        )}
        path="/industries"
      />

      <Breadcrumbs
        items={[{ label: t("nav.industries", "INDUSTRIES") }]}
      />

      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-space font-bold text-h1 leading-[0.95] tracking-tight mb-6"
            >
              {t("industries.heroTitle", "INDUSTRIES WE SERVE")}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-mono text-base lg:text-lg text-neo-black/80 max-w-3xl leading-relaxed"
            >
              {t(
                "industries.heroDesc",
                "We build high-performance websites tailored to the unique needs of each industry. From construction companies to healthcare providers, our solutions drive real business results across Europe."
              )}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-8">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`border-2 border-neo-black px-4 py-2 font-space font-bold text-xs uppercase tracking-wider transition-colors ${
                  activeFilter === cat.key
                    ? "bg-neo-lime shadow-hard"
                    : "bg-neo-white hover:bg-neo-lime/20"
                }`}
              >
                {t(`industries.filter.${cat.key}`, cat.label)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Grid */}
      <section className="py-8 lg:py-16">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((ind) => {
              const IndIcon = ICON_MAP[ind.icon] ?? Layers;
              return (
                <motion.div key={ind.slug} variants={scaleIn}>
                  <Link
                    to={`/${currentLocale}/industries/${ind.slug}`}
                    className="block bg-neo-white border-2 border-neo-black shadow-hard p-6 transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm group"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className={`w-12 h-12 ${ind.bgAccent} border-2 border-neo-black flex items-center justify-center`}
                      >
                        <IndIcon size={24} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h2 className="font-space font-bold text-base uppercase tracking-wider">
                          {t(ind.titleKey)}
                        </h2>
                        {ind.projects.length > 0 && (
                          <span className="font-mono text-xs text-neo-black/50">
                            {ind.projects.length} {t("industries.projectCount", "project(s)")}
                          </span>
                        )}
                      </div>
                      <ArrowRight
                        size={14}
                        className="ml-auto group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                    <p className="font-mono text-xs text-neo-black/70 leading-relaxed">
                      {t(ind.descKey)}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-space font-bold text-h2 mb-4"
            >
              {t("cta.title", "READY TO BUILD SOMETHING?")}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-mono text-base text-neo-black/80 mb-8 max-w-lg mx-auto"
            >
              {t(
                "cta.subtitle",
                "Let's create a website that works as hard as you do."
              )}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <NeoButton href="/contact" size="lg" color="neo-lime">
                {t("cta.button", "START YOUR PROJECT")}{" "}
                <ArrowRight size={18} />
              </NeoButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
