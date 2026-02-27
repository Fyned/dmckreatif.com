import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Zap,
  MessageCircle,
  Lightbulb,
  Globe,
  Code2,
  Calendar,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildOrganizationSchema, buildBreadcrumbSchema } from "@/lib/seo-schemas";
import { useAnalytics } from "@/lib/useAnalytics";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  slideInLeft,
  viewportConfig,
} from "@/lib/animations";

interface ValueItem {
  icon: React.ElementType;
  titleKey: string;
  descKey: string;
  color: string;
  bgAccent: string;
}

const values: ValueItem[] = [
  {
    icon: Award,
    titleKey: "about.value1Title",
    descKey: "about.value1Description",
    color: "neo-lime",
    bgAccent: "bg-neo-lime",
  },
  {
    icon: Zap,
    titleKey: "about.value2Title",
    descKey: "about.value2Description",
    color: "neo-yellow",
    bgAccent: "bg-neo-yellow",
  },
  {
    icon: MessageCircle,
    titleKey: "about.value3Title",
    descKey: "about.value3Description",
    color: "neo-blue",
    bgAccent: "bg-neo-blue",
  },
  {
    icon: Lightbulb,
    titleKey: "about.value4Title",
    descKey: "about.value4Description",
    color: "neo-pink",
    bgAccent: "bg-neo-pink",
  },
];

interface MilestoneItem {
  year: string;
  titleKey: string;
  descKey: string;
  icon: string;
}

const milestones: MilestoneItem[] = [
  {
    year: "2023",
    titleKey: "about.milestone1Title",
    descKey: "about.milestone1Desc",
    icon: "\uD83D\uDE80",
  },
  {
    year: "2023",
    titleKey: "about.milestone2Title",
    descKey: "about.milestone2Desc",
    icon: "\uD83C\uDDEB\uD83C\uDDF7",
  },
  {
    year: "2024",
    titleKey: "about.milestone3Title",
    descKey: "about.milestone3Desc",
    icon: "\uD83C\uDDEC\uD83C\uDDE7",
  },
  {
    year: "2024",
    titleKey: "about.milestone4Title",
    descKey: "about.milestone4Desc",
    icon: "\uD83C\uDFAF",
  },
  {
    year: "2025",
    titleKey: "about.milestone5Title",
    descKey: "about.milestone5Desc",
    icon: "\uD83C\uDF0D",
  },
  {
    year: "2026",
    titleKey: "about.milestone6Title",
    descKey: "about.milestone6Desc",
    icon: "\u26A1",
  },
];

interface TechItem {
  name: string;
  color: string;
}

const techStack: TechItem[] = [
  { name: "React", color: "bg-neo-blue" },
  { name: "Vite", color: "bg-neo-purple" },
  { name: "Tailwind CSS", color: "bg-neo-lime" },
  { name: "Next.js", color: "bg-neo-black text-neo-white" },
  { name: "Supabase", color: "bg-neo-green" },
  { name: "TypeScript", color: "bg-neo-blue" },
  { name: "Framer Motion", color: "bg-neo-pink" },
  { name: "Vercel", color: "bg-neo-black text-neo-white" },
];

interface CountryItem {
  flag: string;
  name: string;
  code: string;
}

const countriesServed: CountryItem[] = [
  { flag: "\uD83C\uDDEB\uD83C\uDDF7", name: "France", code: "FR" },
  { flag: "\uD83C\uDDE7\uD83C\uDDEA", name: "Belgium", code: "BE" },
  { flag: "\uD83C\uDDEC\uD83C\uDDE7", name: "United Kingdom", code: "UK" },
  { flag: "\uD83C\uDDF3\uD83C\uDDF1", name: "Netherlands", code: "NL" },
  { flag: "\uD83C\uDDE9\uD83C\uDDEA", name: "Germany", code: "DE" },
  { flag: "\uD83C\uDDE8\uD83C\uDDED", name: "Switzerland", code: "CH" },
];

export default function AboutPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  useAnalytics("About");
  const currentLocale = locale ?? "en";
  return (
    <>
      <SeoHead
        title={t("seo.about.title", "About DMC Kreatif \u2014 European Web Development Agency")}
        description={t("seo.about.description", "Founded by Musa Kerem Demirci. We build premium websites for European businesses across France, Belgium, UK, Netherlands and Germany.")}
        path="/about"
      />

      <Breadcrumbs items={[{ label: t("nav.about", "ABOUT") }]} />

      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd
        data={buildBreadcrumbSchema(currentLocale, [{ name: "Home", path: "" }], t("nav.about", "About"))}
      />

      {/* Hero Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-block font-mono text-xs font-bold tracking-[0.2em] text-neo-black mb-3 border-2 border-neo-black bg-neo-bg-alt px-3 py-1">
                {t("about.sectionSubtitle", "SYS.ABOUT")}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-space font-bold text-h1 leading-[0.95] tracking-tight mb-6"
            >
              {t("about.headline", "WE ARE DMC KREATIF & GMG DESIGN")}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-mono text-base lg:text-lg text-neo-black/80 max-w-3xl leading-relaxed mb-12"
            >
              {t(
                "about.description",
                "A digital agency partnership serving European businesses. DMC Kreatif handles international markets, GMG Design covers domestic. Same team, same quality, double the reach."
              )}
            </motion.p>

            {/* Stats Bar */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap border-2 border-neo-black bg-neo-white shadow-hard"
            >
              {[
                { value: 33, suffix: "+", label: "PROJECTS" },
                { value: 4, suffix: "", label: "COUNTRIES" },
                { value: 95, suffix: "+", label: "LIGHTHOUSE" },
                { value: 100, suffix: "%", label: "ON-TIME" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex-1 min-w-[120px] p-5 text-center ${
                    i < 3 ? "border-r-2 border-neo-black" : ""
                  }`}
                >
                  <div className="font-space font-bold text-2xl lg:text-3xl">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="font-mono text-xs font-bold text-neo-black/60 uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col lg:flex-row gap-10 items-center"
          >
            {/* Founder Card */}
            <motion.div
              variants={slideInLeft}
              className="w-full lg:w-1/3 flex-shrink-0"
            >
              <div className="bg-neo-white border-2 border-neo-black shadow-hard-lg p-8 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-neo-lime border-4 border-neo-black shadow-hard flex items-center justify-center">
                  <Code2 size={36} strokeWidth={2.5} />
                </div>
                <h3 className="font-space font-bold text-xl mb-1">
                  {t("about.founderName", "Musa Kerem Demirci")}
                </h3>
                <span className="inline-block font-mono text-xs font-bold tracking-wider text-neo-black/60 uppercase mb-4">
                  {t("about.founderRole", "FOUNDER & LEAD DEVELOPER")}
                </span>
                <div className="w-12 h-0.5 bg-neo-black mx-auto" />
              </div>
            </motion.div>

            {/* Story */}
            <motion.div variants={fadeInUp} className="flex-1">
              <h2 className="font-space font-bold text-h2 mb-4">
                {t("about.storyTitle", "THE STORY")}
              </h2>
              <p className="font-mono text-sm text-neo-black/80 leading-relaxed mb-6">
                {t(
                  "about.founderBio",
                  "Full-stack developer with expertise in React, Next.js, and modern web technologies. Built 10+ production websites for clients across France, Belgium, and the UK."
                )}
              </p>
              <div className="bg-neo-lime border-2 border-neo-black shadow-hard p-5">
                <h3 className="font-space font-bold text-sm mb-2">
                  {t("about.mission", "OUR MISSION")}
                </h3>
                <p className="font-mono text-xs text-neo-black/80 leading-relaxed">
                  {t(
                    "about.missionText",
                    "To deliver premium web solutions that help European businesses grow. Every pixel matters. Every millisecond counts."
                  )}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("about.timelineTitle", "OUR JOURNEY")}
            subtitle={t("about.timelineSubtitle", "SYS.TIMELINE")}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-neo-black/20 -translate-x-1/2" />

            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className={`relative flex items-start gap-6 ${
                    idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ml-12 lg:ml-0 ${idx % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:text-left lg:pl-12"}`}>
                    <span className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-neo-black/60 uppercase mb-2">
                      <Calendar size={12} />
                      {milestone.year}
                    </span>
                    <h3 className="font-space font-bold text-lg mb-1">
                      {t(milestone.titleKey)}
                    </h3>
                    <p className="font-mono text-xs text-neo-black/70 leading-relaxed">
                      {t(milestone.descKey)}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-10 h-10 bg-neo-lime border-2 border-neo-black shadow-hard flex items-center justify-center text-lg z-10">
                    {milestone.icon}
                  </div>

                  {/* Empty space for opposite side */}
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("about.valuesTitle", "OUR VALUES")}
            subtitle={t("about.valuesSubtitle", "SYS.VALUES")}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.titleKey}
                  variants={scaleIn}
                  className="bg-neo-white border-2 border-neo-black shadow-hard p-6 transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm"
                >
                  <div
                    className={`w-12 h-12 ${value.bgAccent} border-2 border-neo-black shadow-hard-sm flex items-center justify-center mb-4`}
                  >
                    <Icon size={22} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-space font-bold text-sm mb-2">
                    {t(value.titleKey)}
                  </h3>
                  <p className="font-mono text-xs text-neo-black/70 leading-relaxed">
                    {t(value.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("about.techTitle", "OUR TECH STACK")}
            subtitle={t("about.techSubtitle", "SYS.TECHNOLOGY")}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-wrap gap-4"
          >
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                variants={scaleIn}
                className={`${tech.color} border-2 border-neo-black shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm`}
              >
                {tech.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("about.countries", "COUNTRIES WE SERVE")}
            subtitle={t("about.countriesSubtitle", "SYS.MARKETS")}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {countriesServed.map((country) => (
              <motion.div
                key={country.code}
                variants={scaleIn}
                className="bg-neo-white border-2 border-neo-black shadow-hard p-5 text-center transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm hover:bg-neo-lime"
              >
                <div className="flex items-center justify-center mb-3">
                  <Globe size={20} strokeWidth={2} />
                </div>
                <div className="font-space font-bold text-sm mb-0.5">
                  {country.code}
                </div>
                <div className="font-mono text-xs text-neo-black/60">
                  {country.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Explore More — Internal Links */}
      <section className="py-16 lg:py-24">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.h3 variants={fadeInUp} className="font-space font-bold text-lg uppercase tracking-wider mb-6">
              {t("about.exploreMore", "EXPLORE MORE")}
            </motion.h3>
            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                to={`/${currentLocale}/services`}
                className="flex items-center justify-between border-2 border-neo-black bg-neo-white shadow-hard p-5 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-lime transition-colors group"
              >
                {t("nav.services", "SERVICES")}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={`/${currentLocale}/portfolio`}
                className="flex items-center justify-between border-2 border-neo-black bg-neo-white shadow-hard p-5 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-yellow transition-colors group"
              >
                {t("nav.portfolio", "PORTFOLIO")}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={`/${currentLocale}/blog`}
                className="flex items-center justify-between border-2 border-neo-black bg-neo-white shadow-hard p-5 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-blue transition-colors group"
              >
                {t("nav.blog", "BLOG")}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
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
