import { useParams, Link } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Gauge, Clock, TrendingUp, Users, Search, Zap, Quote } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema, buildCaseStudySchema } from "@/lib/seo-schemas";
import { caseStudies } from "@/data/case-studies";
import type { CaseStudyMetric } from "@/data/case-studies";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { useAnalytics } from "@/lib/useAnalytics";

const metricIconMap: Record<CaseStudyMetric["icon"], typeof Gauge> = {
  gauge: Gauge,
  clock: Clock,
  "trending-up": TrendingUp,
  users: Users,
  search: Search,
  zap: Zap,
};

const accentBgMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime/10",
  "neo-yellow": "bg-neo-yellow/10",
  "neo-blue": "bg-neo-blue/10",
  "neo-pink": "bg-neo-pink/10",
  "neo-purple": "bg-neo-purple/10",
  "neo-green": "bg-neo-green/10",
};

export default function CaseStudiesPage() {
  const { locale } = useParams();
  useAnalytics("Case Studies");
  const currentLocale = locale ?? "en";

  return (
    <>
      <SeoHead
        title="Case Studies — Real Results for European Businesses | DMC Kreatif"
        description="Detailed case studies showing how we helped businesses in France, Belgium, UK achieve 95+ Lighthouse scores, faster load times, and increased leads."
        path="/case-studies"
      />

      <JsonLd
        data={buildBreadcrumbSchema(currentLocale, [{ name: "Home", path: "" }], "Case Studies")}
      />

      {caseStudies.map((cs) => (
        <JsonLd
          key={cs.id}
          data={buildCaseStudySchema({
            name: cs.name,
            description: cs.overview,
            clientUrl: cs.url,
            datePublished: `${cs.year}-01-01`,
            locale: currentLocale,
          })}
        />
      ))}

      <Breadcrumbs items={[{ label: "CASE STUDIES" }]} />

      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader title="CASE STUDIES" subtitle="SYS.RESULTS" />
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-mono text-base lg:text-lg text-neo-black/80 max-w-2xl leading-relaxed -mt-8 mb-16"
          >
            Real projects. Real challenges. Real results. Here is how we helped European businesses transform their online presence and grow their revenue.
          </motion.p>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.map((cs, idx) => (
        <section
          key={cs.id}
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
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-space font-bold text-3xl lg:text-4xl text-neo-black/10">
                  {cs.num}
                </span>
                <h2 className="font-space font-bold text-xl lg:text-2xl tracking-tight">
                  {cs.name}
                </h2>
                <span className="text-xl">{cs.flag}</span>
                <NeoBadge color={cs.accentColor}>{cs.sector}</NeoBadge>
                <span className="font-mono text-xs text-neo-black/50">{cs.countryName} &middot; {cs.year}</span>
              </motion.div>

              {/* Overview */}
              <motion.p variants={fadeInUp} className="font-mono text-sm text-neo-black/80 leading-relaxed max-w-3xl mb-8">
                {cs.overview}
              </motion.p>

              {/* Challenge / Solution / Results grid */}
              <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6">
                  <div className="w-10 h-10 bg-neo-red/20 border-2 border-neo-black flex items-center justify-center mb-4">
                    <Zap size={18} className="text-neo-red" />
                  </div>
                  <h3 className="font-space font-bold text-sm uppercase tracking-wider mb-3">THE CHALLENGE</h3>
                  <p className="font-mono text-xs text-neo-black/70 leading-relaxed">{cs.challenge}</p>
                </div>

                <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6">
                  <div className="w-10 h-10 bg-neo-lime/30 border-2 border-neo-black flex items-center justify-center mb-4">
                    <Search size={18} className="text-neo-black/60" />
                  </div>
                  <h3 className="font-space font-bold text-sm uppercase tracking-wider mb-3">OUR SOLUTION</h3>
                  <p className="font-mono text-xs text-neo-black/70 leading-relaxed">{cs.solution}</p>
                </div>

                <div className="border-2 border-neo-black bg-neo-white shadow-hard p-6">
                  <div className="w-10 h-10 bg-neo-blue/20 border-2 border-neo-black flex items-center justify-center mb-4">
                    <TrendingUp size={18} className="text-neo-blue" />
                  </div>
                  <h3 className="font-space font-bold text-sm uppercase tracking-wider mb-3">THE RESULTS</h3>
                  <ul className="space-y-2">
                    {cs.results.map((result, i) => (
                      <li key={i} className="flex items-start gap-2 font-mono text-xs text-neo-black/70">
                        <span className="text-neo-lime mt-0.5 flex-shrink-0">&#10003;</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Metrics bar */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-8">
                {cs.metrics.map((metric) => {
                  const Icon = metricIconMap[metric.icon];
                  return (
                    <div
                      key={metric.label}
                      className={`flex items-center gap-2 border-2 border-neo-black px-4 py-2.5 ${accentBgMap[cs.accentColor] ?? "bg-neo-lime/10"}`}
                    >
                      <Icon size={16} className="text-neo-black/60" />
                      <span className="font-mono text-xs font-bold">
                        {metric.label}: {metric.value}
                      </span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Tech stack + services + visit */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-6">
                {cs.tech.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] font-bold uppercase tracking-wider bg-neo-black text-neo-white px-3 py-1.5"
                  >
                    {tech}
                  </span>
                ))}
                <span className="font-mono text-[10px] text-neo-black/40 mx-1">|</span>
                <span className="font-mono text-[10px] text-neo-black/60">
                  {cs.timeline}
                </span>
                <a
                  href={cs.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neo-black hover:text-neo-lime transition-colors ml-2"
                >
                  Visit Site <ExternalLink size={12} />
                </a>
              </motion.div>

              {/* Testimonial */}
              <motion.div
                variants={fadeInUp}
                className="border-l-4 border-neo-lime bg-neo-lime/5 border-2 border-neo-black/10 p-6"
              >
                <Quote size={20} className="text-neo-lime mb-3" />
                <p className="font-mono text-sm text-neo-black/80 italic leading-relaxed mb-3">
                  &ldquo;{cs.testimonial.quote}&rdquo;
                </p>
                <div className="font-space font-bold text-xs uppercase tracking-wider">
                  {cs.testimonial.name}
                  <span className="text-neo-black/50 font-normal ml-2">
                    &mdash; {cs.testimonial.role}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA */}
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
                SERVICES <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link
                to={`/${currentLocale}/portfolio`}
                className="inline-flex items-center gap-2 border-2 border-neo-black bg-neo-white shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-yellow transition-colors"
              >
                ALL PROJECTS <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="text-center">
            <h2 className="font-space font-bold text-h2 mb-4">READY TO BUILD SOMETHING?</h2>
            <p className="font-mono text-base text-neo-black/80 mb-8 max-w-lg mx-auto">
              Let&apos;s create a website that works as hard as you do.
            </p>
            <NeoButton href="/contact" size="lg" color="neo-lime">
              START YOUR PROJECT <ArrowRight size={18} />
            </NeoButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
