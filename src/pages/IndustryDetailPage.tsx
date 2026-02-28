import { useTranslation } from "react-i18next";
import { useParams, Link, Navigate } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ChevronDown,
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
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildIndustrySchema,
  buildFAQPageSchema,
} from "@/lib/seo-schemas";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  viewportConfig,
} from "@/lib/animations";
import { getIndustryBySlug, industries } from "@/data/industries";
import { getServiceBySlug } from "@/data/services";

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

export default function IndustryDetailPage() {
  const { t } = useTranslation();
  const { locale, slug } = useParams();
  const currentLocale = locale ?? "en";

  const industry = getIndustryBySlug(slug ?? "");
  if (!industry) {
    return <Navigate to={`/${currentLocale}/industries`} replace />;
  }

  const Icon = ICON_MAP[industry.icon] ?? Layers;

  return (
    <>
      <SeoHead
        title={t(`seo.industryDetail.${industry.slug}.title`, t(industry.titleKey))}
        description={t(
          `seo.industryDetail.${industry.slug}.description`,
          t(industry.descKey)
        )}
        path={`/industries/${industry.slug}`}
      />

      <Breadcrumbs
        items={[
          {
            label: t("nav.industries", "INDUSTRIES"),
            href: `/${currentLocale}/industries`,
          },
          { label: t(industry.titleKey) },
        ]}
      />

      <JsonLd
        data={buildIndustrySchema({
          name: t(industry.titleKey),
          description: t(industry.descKey),
          slug: industry.slug,
          locale: currentLocale,
        })}
      />
      <JsonLd
        data={buildFAQPageSchema(
          industry.faqKeys.map((key) => ({
            question: t(`industryDetail.faq.${key}Q`),
            answer: t(`industryDetail.faq.${key}A`),
          }))
        )}
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
                className={`w-14 h-14 ${industry.bgAccent} border-2 border-neo-black shadow-hard flex items-center justify-center`}
              >
                <Icon size={28} strokeWidth={2.5} />
              </div>
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-neo-black/50 uppercase">
                {t(`industries.filter.${industry.category}`, industry.category)}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-space font-bold text-h1 leading-[0.95] tracking-tight mb-6"
            >
              {t(industry.titleKey)}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-mono text-base lg:text-lg text-neo-black/80 max-w-3xl leading-relaxed mb-8"
            >
              {t(industry.descKey)}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <NeoButton href="/contact" size="lg" color="neo-lime">
                {t("industryDetail.getQuote", "GET A QUOTE")}{" "}
                <ArrowRight size={18} />
              </NeoButton>
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
                title={t("industryDetail.overviewTitle", "OVERVIEW")}
                subtitle={t("industryDetail.overviewSubtitle", "SYS.DETAIL")}
              />
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="font-mono text-sm text-neo-black/80 leading-relaxed max-w-4xl space-y-4"
            >
              {t(industry.longDescKey)
                .split("\n\n")
                .map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-16 lg:py-24">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Challenges */}
            <div>
              <SectionHeader
                title={t("industryDetail.challengesTitle", "INDUSTRY CHALLENGES")}
                subtitle={t("industryDetail.challengesSubtitle", "SYS.PAIN")}
              />
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="space-y-4"
              >
                {industry.challengesKeys.map((key, idx) => (
                  <motion.div
                    key={key}
                    variants={fadeInUp}
                    className="bg-neo-white border-2 border-neo-black shadow-hard p-5 flex items-start gap-3"
                  >
                    <div className="w-8 h-8 bg-red-100 border-2 border-neo-black flex items-center justify-center flex-shrink-0">
                      <AlertTriangle size={14} strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-neo-black/40 block mb-1">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <p className="font-mono text-xs text-neo-black/80 leading-relaxed">
                        {t(key)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Solutions */}
            <div>
              <SectionHeader
                title={t("industryDetail.solutionsTitle", "OUR SOLUTIONS")}
                subtitle={t("industryDetail.solutionsSubtitle", "SYS.FIX")}
              />
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="space-y-4"
              >
                {industry.solutionsKeys.map((key, idx) => (
                  <motion.div
                    key={key}
                    variants={fadeInUp}
                    className="bg-neo-white border-2 border-neo-black shadow-hard p-5 flex items-start gap-3"
                  >
                    <div className="w-8 h-8 bg-neo-lime border-2 border-neo-black flex items-center justify-center flex-shrink-0">
                      <Lightbulb size={14} strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-neo-black/40 block mb-1">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <p className="font-mono text-xs text-neo-black/80 leading-relaxed">
                        {t(key)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("industryDetail.featuresTitle", "WHAT WE DELIVER")}
            subtitle={t("industryDetail.featuresSubtitle", "SYS.FEATURES")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {industry.features.map((featureKey) => (
              <motion.div
                key={featureKey}
                variants={scaleIn}
                className="bg-neo-white border-2 border-neo-black shadow-hard p-5 flex items-start gap-3"
              >
                <div
                  className={`w-6 h-6 ${industry.bgAccent} border-2 border-neo-black flex items-center justify-center flex-shrink-0 mt-0.5`}
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

      {/* Portfolio / Case Studies */}
      {industry.projects.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="max-w-container mx-auto px-6 lg:px-10">
            <SectionHeader
              title={t("industryDetail.projectsTitle", "OUR WORK")}
              subtitle={t("industryDetail.projectsSubtitle", "SYS.PORTFOLIO")}
            />
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {industry.projects.map((project) => (
                <motion.div
                  key={project.urlKey}
                  variants={scaleIn}
                  className="bg-neo-white border-2 border-neo-black shadow-hard p-6"
                >
                  <h3 className="font-space font-bold text-lg mb-2">
                    {t(project.nameKey)}
                  </h3>
                  <p className="font-mono text-xs text-neo-black/70 mb-4 leading-relaxed">
                    {t(project.descKey)}
                  </p>
                  <a
                    href={project.urlKey}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neo-black hover:text-neo-black/70 transition-colors"
                  >
                    {t("industryDetail.visitProject", "VIEW PROJECT")}{" "}
                    <ExternalLink size={12} />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className={`py-16 lg:py-24 ${industry.projects.length > 0 ? "section-alt" : ""}`}>
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("industryDetail.faqTitle", "FREQUENTLY ASKED")}
            subtitle={t("industryDetail.faqSubtitle", "SYS.FAQ")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-3 max-w-3xl"
          >
            {industry.faqKeys.map((key) => (
              <motion.div key={key} variants={fadeInUp}>
                <FaqAccordionItem
                  qKey={`industryDetail.faq.${key}Q`}
                  aKey={`industryDetail.faq.${key}A`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Related Industries */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("industryDetail.relatedTitle", "RELATED INDUSTRIES")}
            subtitle={t("industryDetail.relatedSubtitle", "SYS.MORE")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {industry.relatedIndustrySlugs.map((relSlug) => {
              const rel = industries.find((i) => i.slug === relSlug);
              if (!rel) return null;
              const RelIcon = ICON_MAP[rel.icon] ?? Layers;
              return (
                <motion.div key={relSlug} variants={scaleIn}>
                  <Link
                    to={`/${currentLocale}/industries/${relSlug}`}
                    className="block bg-neo-white border-2 border-neo-black shadow-hard p-6 transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm group"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className={`w-10 h-10 ${rel.bgAccent} border-2 border-neo-black flex items-center justify-center`}
                      >
                        <RelIcon size={18} strokeWidth={2.5} />
                      </div>
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

      {/* Related Services */}
      <section className="py-16 lg:py-24">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("industryDetail.relatedServicesTitle", "RECOMMENDED SERVICES")}
            subtitle={t("industryDetail.relatedServicesSubtitle", "SYS.SERVICES")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {industry.relatedServiceSlugs.map((relSlug) => {
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
