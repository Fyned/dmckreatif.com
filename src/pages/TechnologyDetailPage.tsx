import { useTranslation } from "react-i18next";
import { useParams, Link, Navigate } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Gauge,
  Clock,
  TrendingUp,
  ChevronDown,
  ExternalLink,
  Atom,
  Globe,
  FileCode2,
  Zap,
  Palette,
  Wand2,
  Database,
  ArrowUpCircle,
  ShoppingBag,
  Layout,
  Settings,
  Code2,
} from "lucide-react";
import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildTechnologySchema,
} from "@/lib/seo-schemas";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  viewportConfig,
} from "@/lib/animations";
import { getTechnologyBySlug, allTechnologies } from "@/data/technologies";
import { getServiceBySlug } from "@/data/services";

const ICON_MAP: Record<string, React.ElementType> = {
  Atom,
  Globe,
  FileCode2,
  Zap,
  Palette,
  Wand2,
  Database,
  ArrowUpCircle,
  ShoppingBag,
  Layout,
  Settings,
  Code2,
};

function FaqAccordionItem({ qKey, aKey }: { qKey: string; aKey: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 border-neo-black bg-neo-white shadow-hard">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-space font-bold text-sm pr-4">{t(qKey)}</span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="font-mono text-xs text-neo-black/70 leading-relaxed">
            {t(aKey)}
          </p>
        </div>
      )}
    </div>
  );
}

export default function TechnologyDetailPage() {
  const { t } = useTranslation();
  const { locale, slug } = useParams();
  const currentLocale = locale ?? "en";

  const tech = getTechnologyBySlug(slug ?? "");
  if (!tech) {
    return <Navigate to={`/${currentLocale}/technologies`} replace />;
  }

  const Icon = ICON_MAP[tech.icon] ?? Code2;

  return (
    <>
      <SeoHead
        title={t(`seo.techDetail.${tech.slug}.title`, t(tech.titleKey))}
        description={t(
          `seo.techDetail.${tech.slug}.description`,
          t(tech.descKey)
        )}
        path={`/technologies/${tech.slug}`}
      />

      <Breadcrumbs
        items={[
          {
            label: t("nav.technologies", "TECHNOLOGIES"),
            href: `/${currentLocale}/technologies`,
          },
          { label: t(tech.titleKey) },
        ]}
      />

      <JsonLd
        data={buildTechnologySchema({
          name: t(tech.titleKey),
          description: t(tech.descKey),
          version: tech.version,
          url: tech.officialUrl,
          locale: currentLocale,
        })}
      />

      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4 mb-6"
            >
              <div
                className={`w-14 h-14 ${tech.bgAccent} border-2 border-neo-black shadow-hard flex items-center justify-center`}
              >
                <Icon size={28} strokeWidth={2.5} />
              </div>
              <div>
                <span className="block font-mono text-xs font-bold tracking-[0.2em] text-neo-black/50">
                  {t("techDetail.versionLabel", "VERSION")} {tech.version}
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-space font-bold text-h1 leading-[0.95] tracking-tight mb-6"
            >
              {t(tech.titleKey)}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-mono text-base lg:text-lg text-neo-black/80 max-w-3xl leading-relaxed mb-8"
            >
              {t(tech.descKey)}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <NeoButton href="/contact" size="lg" color="neo-lime">
                {t("techDetail.getQuote", "GET A QUOTE")}{" "}
                <ArrowRight size={18} />
              </NeoButton>
              <a
                href={tech.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-neo-black bg-neo-white shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-lime transition-colors"
              >
                {t("techDetail.visitSite", "VISIT OFFICIAL SITE")}{" "}
                <ExternalLink size={14} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Long Description */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.div variants={fadeInUp}>
              <SectionHeader
                title={t("techDetail.overviewTitle", "OVERVIEW")}
                subtitle={t("techDetail.overviewSubtitle", "SYS.DETAIL")}
              />
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="font-mono text-sm text-neo-black/80 leading-relaxed max-w-4xl space-y-4"
            >
              {t(tech.longDescKey)
                .split("\n\n")
                .map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("techDetail.featuresTitle", "KEY FEATURES")}
            subtitle={t("techDetail.featuresSubtitle", "SYS.FEATURES")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {tech.features.map((featureKey) => (
              <motion.div
                key={featureKey}
                variants={scaleIn}
                className="bg-neo-white border-2 border-neo-black shadow-hard p-5 flex items-start gap-3"
              >
                <div
                  className={`w-6 h-6 ${tech.bgAccent} border-2 border-neo-black flex items-center justify-center flex-shrink-0 mt-0.5`}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="font-mono text-xs text-neo-black/80 leading-relaxed">
                  {t(featureKey)}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why We Use It */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("techDetail.whyTitle", "WHY WE USE IT")}
            subtitle={t("techDetail.whySubtitle", "SYS.WHY")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {tech.whyWeUseKeys.map((whyKey, idx) => (
              <motion.div
                key={whyKey}
                variants={scaleIn}
                className="bg-neo-white border-2 border-neo-black shadow-hard p-6 relative"
              >
                <span className="font-space font-bold text-4xl text-neo-black/10 absolute top-3 right-4">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div
                  className={`w-10 h-10 ${tech.bgAccent} border-2 border-neo-black flex items-center justify-center mb-4`}
                >
                  <span className="font-space font-bold text-sm">
                    {idx + 1}
                  </span>
                </div>
                <p className="font-mono text-xs text-neo-black/80 leading-relaxed">
                  {t(whyKey)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 lg:py-24">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-wrap border-2 border-neo-black bg-neo-white shadow-hard"
          >
            {[
              { icon: Gauge, value: "95+", label: "LIGHTHOUSE" },
              { icon: Clock, value: "<2s", label: "LOAD TIME" },
              { icon: TrendingUp, value: "+40%", label: "AVG TRAFFIC" },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                variants={scaleIn}
                className={`flex-1 min-w-[120px] p-6 text-center flex flex-col items-center gap-2 ${
                  i < 2 ? "border-r-2 border-neo-black" : ""
                }`}
              >
                <metric.icon size={20} className="text-neo-black/40" />
                <div className="font-space font-bold text-2xl lg:text-3xl">
                  {metric.value}
                </div>
                <div className="font-mono text-xs font-bold text-neo-black/60 uppercase tracking-wider">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Alternatives Comparison */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("techDetail.alternativesTitle", "ALTERNATIVES")}
            subtitle={t("techDetail.alternativesSubtitle", "SYS.COMPARE")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {tech.alternatives.map((alt) => (
              <motion.div
                key={alt.name}
                variants={scaleIn}
                className="bg-neo-white border-2 border-neo-black shadow-hard p-6"
              >
                <h3 className="font-space font-bold text-lg mb-2">
                  {alt.name}
                </h3>
                <p className="font-mono text-xs text-neo-black/70 mb-4">
                  {t(alt.descKey)}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-neo-black/50 uppercase tracking-wider">
                      {t("technologies.pros", "PROS")}
                    </span>
                    <p className="font-mono text-xs text-neo-black/80 mt-1">
                      {t(alt.prosKey)}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-neo-black/50 uppercase tracking-wider">
                      {t("technologies.cons", "CONS")}
                    </span>
                    <p className="font-mono text-xs text-neo-black/80 mt-1">
                      {t(alt.consKey)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("techDetail.faqTitle", "FREQUENTLY ASKED")}
            subtitle={t("techDetail.faqSubtitle", "SYS.FAQ")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-3 max-w-3xl"
          >
            {tech.faqKeys.map((key) => (
              <motion.div key={key} variants={fadeInUp}>
                <FaqAccordionItem
                  qKey={`techDetail.faq.${key}Q`}
                  aKey={`techDetail.faq.${key}A`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Related Technologies */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("techDetail.relatedTechTitle", "RELATED TECHNOLOGIES")}
            subtitle={t("techDetail.relatedTechSubtitle", "SYS.STACK")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tech.relatedTechSlugs.map((relSlug) => {
              const rel = allTechnologies.find((t) => t.slug === relSlug);
              if (!rel) return null;
              const RelIcon = ICON_MAP[rel.icon] ?? Code2;
              return (
                <motion.div key={relSlug} variants={scaleIn}>
                  <Link
                    to={`/${currentLocale}/technologies/${relSlug}`}
                    className="block bg-neo-white border-2 border-neo-black shadow-hard p-6 transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm group"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className={`w-10 h-10 ${rel.bgAccent} border-2 border-neo-black flex items-center justify-center`}
                      >
                        <RelIcon size={18} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="font-space font-bold text-sm uppercase tracking-wider">
                          {t(rel.titleKey)}
                        </h3>
                        <span className="font-mono text-xs text-neo-black/50">
                          v{rel.version}
                        </span>
                      </div>
                      <ArrowRight
                        size={14}
                        className="ml-auto group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                    <p className="font-mono text-xs text-neo-black/70 leading-relaxed">
                      {t(rel.descKey)}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 lg:py-24">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("techDetail.relatedServicesTitle", "RELATED SERVICES")}
            subtitle={t("techDetail.relatedServicesSubtitle", "SYS.MORE")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {tech.relatedServiceSlugs.map((relSlug) => {
              const rel = getServiceBySlug(relSlug);
              if (!rel) return null;
              return (
                <motion.div key={relSlug} variants={scaleIn}>
                  <Link
                    to={`/${currentLocale}/services/${relSlug}`}
                    className="block bg-neo-white border-2 border-neo-black shadow-hard p-6 transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm group"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="font-space font-bold text-sm uppercase tracking-wider">
                        {t(rel.titleKey)}
                      </h3>
                      <ArrowRight
                        size={14}
                        className="ml-auto group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                    <p className="font-mono text-xs text-neo-black/70 leading-relaxed">
                      {t(rel.descKey)}
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
