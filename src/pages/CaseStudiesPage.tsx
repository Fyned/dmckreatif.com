import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Gauge, Clock, TrendingUp, Quote } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { projects } from "@/lib/portfolio-data";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

function buildCaseStudySchema(project: (typeof projects)[0], locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    url: `https://dmckreatif.com/${locale}/case-studies`,
    creator: {
      "@type": "Organization",
      name: "DMC Kreatif",
      url: "https://dmckreatif.com",
    },
    dateCreated: `${project.year}-01-01`,
    about: {
      "@type": "WebSite",
      url: project.url,
    },
  };
}

export default function CaseStudiesPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const currentLocale = locale ?? "en";
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <SeoHead
        title={t("seo.caseStudies.title", "Case Studies — Real Results for European Businesses | DMC Kreatif")}
        description={t("seo.caseStudies.description", "Detailed case studies showing how we helped businesses in France, Belgium, UK achieve 95+ Lighthouse scores and increased online visibility.")}
        path="/case-studies"
      />

      <Breadcrumbs items={[{ label: t("caseStudies.breadcrumb", "CASE STUDIES") }]} />

      {featured.map((project) => (
        <JsonLd key={project.id} data={buildCaseStudySchema(project, currentLocale)} />
      ))}

      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("caseStudies.title", "CASE STUDIES")}
            subtitle={t("caseStudies.subtitle", "SYS.RESULTS")}
          />
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-mono text-base lg:text-lg text-neo-black/80 max-w-2xl leading-relaxed -mt-8 mb-16"
          >
            {t("caseStudies.heroDescription", "Real projects. Real challenges. Real results. Here's how we helped European businesses transform their online presence.")}
          </motion.p>
        </div>
      </section>

      {/* Case Studies */}
      {featured.map((project, idx) => (
        <section
          key={project.id}
          className={`py-16 lg:py-24 ${idx % 2 === 1 ? "section-alt" : ""}`}
        >
          <div className="max-w-container mx-auto px-6 lg:px-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {/* Header */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-6">
                <span className="font-space font-bold text-3xl lg:text-4xl text-neo-black/10">
                  {project.num}
                </span>
                <h2 className="font-space font-bold text-xl lg:text-2xl tracking-tight">
                  {project.name}
                </h2>
                <span className="text-xl">{project.flag}</span>
                <NeoBadge color={project.accentColor}>
                  {t(project.sectorKey)}
                </NeoBadge>
              </motion.div>

              {/* Description */}
              <motion.p variants={fadeInUp} className="font-mono text-sm text-neo-black/80 leading-relaxed max-w-3xl mb-8">
                {t(project.descriptionKey)}
              </motion.p>

              {/* Challenge / Solution / Results grid */}
              <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Challenge */}
                <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6">
                  <div className="w-10 h-10 bg-neo-red/20 border-2 border-neo-black flex items-center justify-center mb-4">
                    <span className="text-lg">⚡</span>
                  </div>
                  <h3 className="font-space font-bold text-sm uppercase tracking-wider mb-3">
                    {t("caseStudies.challenge", "THE CHALLENGE")}
                  </h3>
                  <p className="font-mono text-xs text-neo-black/70 leading-relaxed">
                    {t(project.challengeKey)}
                  </p>
                </div>

                {/* Solution */}
                <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6">
                  <div className="w-10 h-10 bg-neo-lime/30 border-2 border-neo-black flex items-center justify-center mb-4">
                    <span className="text-lg">💡</span>
                  </div>
                  <h3 className="font-space font-bold text-sm uppercase tracking-wider mb-3">
                    {t("caseStudies.solution", "OUR SOLUTION")}
                  </h3>
                  <p className="font-mono text-xs text-neo-black/70 leading-relaxed">
                    {t(project.solutionKey)}
                  </p>
                </div>

                {/* Results */}
                <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6">
                  <div className="w-10 h-10 bg-neo-blue/20 border-2 border-neo-black flex items-center justify-center mb-4">
                    <span className="text-lg">🎯</span>
                  </div>
                  <h3 className="font-space font-bold text-sm uppercase tracking-wider mb-3">
                    {t("caseStudies.results", "THE RESULTS")}
                  </h3>
                  <ul className="space-y-2">
                    {project.resultsKeys.map((key) => (
                      <li key={key} className="flex items-start gap-2 font-mono text-xs text-neo-black/70">
                        <span className="text-neo-lime mt-0.5">✓</span>
                        {t(key)}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Metrics bar */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 border-2 border-neo-black bg-neo-lime/10 px-4 py-2.5">
                  <Gauge size={16} className="text-neo-black/60" />
                  <span className="font-mono text-xs font-bold">
                    {t("caseStudies.lighthouse", "Lighthouse")}: {project.metrics.lighthouse}
                  </span>
                </div>
                <div className="flex items-center gap-2 border-2 border-neo-black bg-neo-yellow/10 px-4 py-2.5">
                  <Clock size={16} className="text-neo-black/60" />
                  <span className="font-mono text-xs font-bold">
                    {t("caseStudies.loadTime", "Load Time")}: {project.metrics.loadTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 border-2 border-neo-black bg-neo-blue/10 px-4 py-2.5">
                  <TrendingUp size={16} className="text-neo-black/60" />
                  <span className="font-mono text-xs font-bold">
                    {t("caseStudies.improvement", "Traffic")}: {project.metrics.improvement}
                  </span>
                </div>
              </motion.div>

              {/* Tech stack + Visit */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-8">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] font-bold uppercase tracking-wider bg-neo-black text-neo-white px-3 py-1.5"
                  >
                    {tech}
                  </span>
                ))}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neo-black hover:text-neo-lime transition-colors ml-2"
                >
                  {t("caseStudies.visitSite", "Visit Site")} <ExternalLink size={12} />
                </a>
              </motion.div>

              {/* Testimonial */}
              {project.testimonial && (
                <motion.div
                  variants={fadeInUp}
                  className="border-l-4 border-neo-lime bg-neo-lime/5 border-2 border-neo-black/10 p-6"
                >
                  <Quote size={20} className="text-neo-lime mb-3" />
                  <p className="font-mono text-sm text-neo-black/80 italic leading-relaxed mb-3">
                    "{t(project.testimonial.quoteKey)}"
                  </p>
                  <div className="font-space font-bold text-xs uppercase tracking-wider">
                    {t(project.testimonial.nameKey)}
                    <span className="text-neo-black/50 font-normal ml-2">
                      — {t(project.testimonial.roleKey)}
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      ))}

      {/* Internal Links + CTA */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <motion.div variants={fadeInUp}>
              <Link
                to={`/${currentLocale}/services`}
                className="inline-flex items-center gap-2 border-2 border-neo-black bg-neo-white shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-lime transition-colors"
              >
                {t("nav.services", "SERVICES")} <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link
                to={`/${currentLocale}/pricing`}
                className="inline-flex items-center gap-2 border-2 border-neo-black bg-neo-white shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-yellow transition-colors"
              >
                {t("nav.pricing", "PRICING")} <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="text-center">
            <h2 className="font-space font-bold text-h2 mb-4">{t("cta.title", "READY TO BUILD SOMETHING?")}</h2>
            <p className="font-mono text-base text-neo-black/80 mb-8 max-w-lg mx-auto">{t("cta.subtitle", "Let's create a website that works as hard as you do.")}</p>
            <NeoButton href="/contact" size="lg" color="neo-lime">
              {t("cta.button", "START YOUR PROJECT")} <ArrowRight size={18} />
            </NeoButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
