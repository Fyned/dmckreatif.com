import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ExternalLink, Gauge, Clock, TrendingUp, Users, Search, Zap, Quote, CheckCircle } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import NeoBadge from "@/components/ui/NeoBadge";
import NeoButton from "@/components/ui/NeoButton";
import { buildBreadcrumbSchema, buildCaseStudySchema } from "@/lib/seo-schemas";
import BeforeAfterSlider from "@/components/portfolio/BeforeAfterSlider";
import { getCaseStudyBySlug, caseStudies } from "@/data/case-studies";
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

const accentBorderMap: Record<string, string> = {
  "neo-lime": "border-neo-lime",
  "neo-yellow": "border-neo-yellow",
  "neo-blue": "border-neo-blue",
  "neo-pink": "border-neo-pink",
  "neo-purple": "border-neo-purple",
  "neo-green": "border-neo-green",
};

const accentBgMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime",
  "neo-yellow": "bg-neo-yellow",
  "neo-blue": "bg-neo-blue",
  "neo-pink": "bg-neo-pink",
  "neo-purple": "bg-neo-purple",
  "neo-green": "bg-neo-green",
};

const accentLightMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime/10",
  "neo-yellow": "bg-neo-yellow/10",
  "neo-blue": "bg-neo-blue/10",
  "neo-pink": "bg-neo-pink/10",
  "neo-purple": "bg-neo-purple/10",
  "neo-green": "bg-neo-green/10",
};

export default function CaseStudyDetailPage() {
  const { locale, slug } = useParams<{ locale: string; slug: string }>();
  const currentLocale = locale ?? "en";

  useAnalytics(`Case Study: ${slug}`);

  const cs = getCaseStudyBySlug(slug ?? "");
  if (!cs) return <Navigate to={`/${currentLocale}/case-studies`} replace />;

  const currentIndex = caseStudies.findIndex((c) => c.slug === cs.slug);
  const prevCs = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextCs = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  const accentBorder = accentBorderMap[cs.accentColor] ?? "border-neo-lime";
  const accentBg = accentBgMap[cs.accentColor] ?? "bg-neo-lime";
  const accentLight = accentLightMap[cs.accentColor] ?? "bg-neo-lime/10";

  return (
    <>
      <SeoHead
        title={`${cs.name} Case Study — ${cs.sector} Website | DMC Kreatif`}
        description={`How DMC Kreatif helped ${cs.name} in ${cs.countryName} achieve ${cs.metrics[0]?.value ?? "95+"} Lighthouse score and grow their online leads. Full case study with results and metrics.`}
        path={`/case-studies/${cs.slug}`}
        locales={["en"]}
        canonicalLocale="en"
      />

      <JsonLd
        data={buildBreadcrumbSchema(
          currentLocale,
          [
            { name: "Home", path: "" },
            { name: "Case Studies", path: "/case-studies" },
          ],
          cs.name
        )}
      />

      <JsonLd
        data={buildCaseStudySchema({
          name: cs.name,
          description: cs.overview,
          clientUrl: cs.url,
          datePublished: `${cs.year}-01-01`,
          locale: currentLocale,
          slug: cs.slug,
        })}
      />

      <Breadcrumbs
        items={[
          { label: "CASE STUDIES", href: `/${currentLocale}/case-studies` },
          { label: cs.name },
        ]}
      />

      {/* Hero */}
      <section className="py-16 lg:py-24 border-b-2 border-neo-black">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-space font-bold text-5xl lg:text-7xl text-neo-black/10 select-none">
                {cs.num}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-2xl">{cs.flag}</span>
                  <NeoBadge color={cs.accentColor}>{cs.sector}</NeoBadge>
                  <span className="font-mono text-xs text-neo-black/50">{cs.countryName} · {cs.year}</span>
                </div>
                <h1 className="font-space font-bold text-h1 leading-tight">{cs.name}</h1>
              </div>
            </motion.div>

            <motion.p variants={fadeInUp} className="font-mono text-base lg:text-lg text-neo-black/80 max-w-3xl leading-relaxed mb-8">
              {cs.overview}
            </motion.p>

            {/* Key metrics bar */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-8">
              {cs.metrics.map((metric) => {
                const Icon = metricIconMap[metric.icon];
                return (
                  <div
                    key={metric.label}
                    className={`flex items-center gap-2 border-2 border-neo-black px-4 py-2.5 ${accentLight}`}
                  >
                    <Icon size={16} className="text-neo-black/60 flex-shrink-0" />
                    <span className="font-mono text-xs font-bold whitespace-nowrap">
                      {metric.label}: <span className="text-neo-black">{metric.value}</span>
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* Tech stack + visit */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3">
              {cs.tech.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] font-bold uppercase tracking-wider bg-neo-black text-neo-white px-3 py-1.5"
                >
                  {tech}
                </span>
              ))}
              <span className="font-mono text-[10px] text-neo-black/40 mx-1">·</span>
              <span className="font-mono text-[10px] text-neo-black/60">{cs.timeline}</span>
              <a
                href={cs.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold border-2 border-neo-black px-3 py-1.5 hover:bg-neo-lime transition-colors ml-auto"
              >
                Visit Live Site <ExternalLink size={12} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Live Website Preview */}
      {cs.images?.after && (
        <section className="py-12 border-b-2 border-neo-black bg-neo-white">
          <div className="max-w-container mx-auto px-6 lg:px-10">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 ${accentBg}`} />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-neo-black/60">
                    Live Website
                  </span>
                </div>
                <a
                  href={cs.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-neo-black/50 hover:text-neo-black transition-colors"
                >
                  {cs.url.replace("https://", "")}
                  <ExternalLink size={10} />
                </a>
              </div>

              {cs.images.before ? (
                <BeforeAfterSlider
                  beforeImage={cs.images.before}
                  afterImage={cs.images.after}
                  projectName={cs.name}
                />
              ) : (
                <div className="border-2 border-neo-black shadow-hard overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b-2 border-neo-black bg-neo-bg">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full border-2 border-neo-black/30 bg-neo-red/30" />
                      <div className="w-3 h-3 rounded-full border-2 border-neo-black/30 bg-neo-yellow/30" />
                      <div className="w-3 h-3 rounded-full border-2 border-neo-black/30 bg-neo-lime/30" />
                    </div>
                    <div className="flex-1 mx-4 px-3 py-1 border-2 border-neo-black/20 bg-neo-white font-mono text-[10px] text-neo-black/50 truncate">
                      {cs.url}
                    </div>
                  </div>
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={cs.images.after}
                      alt={`${cs.name} — Live Website Screenshot`}
                      width={1200}
                      height={675}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Challenge */}
      <section className="py-16 lg:py-20">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            <motion.div variants={fadeInUp} className="lg:col-span-3">
              <div className={`w-12 h-1 ${accentBg} mb-4`} />
              <h2 className="font-space font-bold text-h3 uppercase tracking-tight">The Challenge</h2>
            </motion.div>
            <motion.div variants={fadeInUp} className="lg:col-span-9">
              <p className="font-mono text-sm lg:text-base text-neo-black/80 leading-relaxed">
                {cs.challenge}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 lg:py-20 section-alt border-y-2 border-neo-black">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            <motion.div variants={fadeInUp} className="lg:col-span-3">
              <div className={`w-12 h-1 ${accentBg} mb-4`} />
              <h2 className="font-space font-bold text-h3 uppercase tracking-tight">Our Solution</h2>
            </motion.div>
            <motion.div variants={fadeInUp} className="lg:col-span-9">
              <p className="font-mono text-sm lg:text-base text-neo-black/80 leading-relaxed mb-8">
                {cs.solution}
              </p>
              <div className="flex flex-wrap gap-2">
                {cs.servicesUsed.map((service) => (
                  <span
                    key={service}
                    className={`font-mono text-xs font-bold border-2 ${accentBorder} px-3 py-1`}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 lg:py-20">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            <motion.div variants={fadeInUp} className="lg:col-span-3">
              <div className={`w-12 h-1 ${accentBg} mb-4`} />
              <h2 className="font-space font-bold text-h3 uppercase tracking-tight">The Results</h2>
            </motion.div>
            <motion.div variants={fadeInUp} className="lg:col-span-9">
              <ul className="space-y-4 mb-10">
                {cs.results.map((result, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-neo-lime flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="font-mono text-sm text-neo-black/80 leading-relaxed">{result}</span>
                  </li>
                ))}
              </ul>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {cs.metrics.map((metric) => {
                  const Icon = metricIconMap[metric.icon];
                  return (
                    <div
                      key={metric.label}
                      className={`border-2 border-neo-black p-4 text-center ${accentLight}`}
                    >
                      <Icon size={20} className="text-neo-black/50 mx-auto mb-2" />
                      <div className="font-space font-bold text-xl mb-1">{metric.value}</div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-neo-black/60">{metric.label}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 lg:py-20 section-alt border-y-2 border-neo-black">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="max-w-3xl mx-auto text-center"
          >
            <Quote size={32} className="text-neo-lime mx-auto mb-6" />
            <blockquote className="font-mono text-base lg:text-lg text-neo-black/80 italic leading-relaxed mb-6">
              &ldquo;{cs.testimonial.quote}&rdquo;
            </blockquote>
            <div className="font-space font-bold text-sm uppercase tracking-wider">
              {cs.testimonial.name}
            </div>
            <div className="font-mono text-xs text-neo-black/50 mt-1">
              {cs.testimonial.role}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="py-12 border-b-2 border-neo-black">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {prevCs ? (
              <Link
                to={`/${currentLocale}/case-studies/${prevCs.slug}`}
                className="inline-flex items-center gap-2 font-mono text-xs font-bold border-2 border-neo-black px-4 py-3 hover:bg-neo-lime transition-colors group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>
                  <span className="text-neo-black/40 block text-[10px]">PREVIOUS</span>
                  {prevCs.name}
                </span>
              </Link>
            ) : <div />}

            {nextCs && (
              <Link
                to={`/${currentLocale}/case-studies/${nextCs.slug}`}
                className="inline-flex items-center gap-2 font-mono text-xs font-bold border-2 border-neo-black px-4 py-3 hover:bg-neo-lime transition-colors text-right group ml-auto"
              >
                <span>
                  <span className="text-neo-black/40 block text-[10px]">NEXT</span>
                  {nextCs.name}
                </span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.h2 variants={fadeInUp} className="font-space font-bold text-h2 mb-4">
              READY TO GET SIMILAR RESULTS?
            </motion.h2>
            <motion.p variants={fadeInUp} className="font-mono text-base text-neo-black/70 mb-8 max-w-lg mx-auto">
              Let&apos;s talk about your project. Free consultation, response within 24 hours.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center">
              <NeoButton href={`/${currentLocale}/contact`} size="lg" color="neo-lime">
                START YOUR PROJECT <ArrowRight size={18} />
              </NeoButton>
              <Link
                to={`/${currentLocale}/case-studies`}
                className="inline-flex items-center gap-2 border-2 border-neo-black px-6 py-3 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-black hover:text-neo-white transition-colors"
              >
                ALL CASE STUDIES <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
