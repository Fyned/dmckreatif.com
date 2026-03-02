import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Globe,
  Code2,
  Layers,
  Zap,
  MapPin,
  Briefcase,
  Star,
  ExternalLink,
  Linkedin,
} from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import NeoButton from "@/components/ui/NeoButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { buildPersonProfileSchema } from "@/lib/seo-schemas";
import { useAnalytics } from "@/lib/useAnalytics";
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from "@/lib/animations";

const skills = [
  { name: "React", color: "bg-neo-blue", level: 98 },
  { name: "Next.js", color: "bg-neo-black text-neo-white", level: 96 },
  { name: "TypeScript", color: "bg-neo-blue", level: 95 },
  { name: "Tailwind CSS", color: "bg-neo-lime", level: 97 },
  { name: "Supabase", color: "bg-neo-green", level: 90 },
  { name: "Framer Motion", color: "bg-neo-pink", level: 88 },
  { name: "SEO / Schema", color: "bg-neo-yellow", level: 92 },
  { name: "Vite", color: "bg-neo-purple", level: 94 },
];

const timeline = [
  {
    year: "2023",
    icon: "🚀",
    title: "Founded DMC Kreatif",
    desc: "Launched the agency with a clear mission: premium digital solutions for the European market.",
  },
  {
    year: "2023",
    icon: "🇫🇷",
    title: "First French Client",
    desc: "CAKIR Facades — custom React website for a Paris-based façade renovation company.",
  },
  {
    year: "2024",
    icon: "🇬🇧",
    title: "UK Expansion",
    desc: "Adamsons Accountants — built a professional online presence for a UK accounting firm.",
  },
  {
    year: "2024",
    icon: "🌍",
    title: "Multi-Country Reach",
    desc: "Projects in France, Belgium, UK and Netherlands — 4 languages, 4 countries.",
  },
  {
    year: "2025",
    icon: "🏆",
    title: "33+ Projects Delivered",
    desc: "Milestone: 33+ international websites delivered, all with 95+ Lighthouse scores.",
  },
  {
    year: "2026",
    icon: "⚡",
    title: "Full-Stack Platform",
    desc: "Expanding to Payload CMS e-commerce and AI-powered template generation.",
  },
];

const deliveredProjects = [
  { name: "CAKIR Facades", country: "🇫🇷" },
  { name: "Altinbas Moustiquaire", country: "🇫🇷" },
  { name: "Consulting Energy", country: "🇫🇷" },
  { name: "ISO Home Energy", country: "🇫🇷" },
  { name: "Archi Construction Véranda", country: "🇧🇪" },
  { name: "Adamsons Accountants", country: "🇬🇧" },
  { name: "FilenesSports", country: "🌍" },
];

export default function AuthorPage() {
  const { t } = useTranslation();
  const { locale } = useParams<{ locale: string }>();
  useAnalytics("Author: Musa Kerem Demirci");
  const currentLocale = locale ?? "en";

  const breadcrumbs = [
    { label: t("nav.about", "About"), href: `/${currentLocale}/about` },
    { label: "Musa Kerem Demirci" },
  ];

  return (
    <>
      <SeoHead
        title={t("seo.author.title")}
        description={t("seo.author.description")}
        path="/about/musa-kerem-demirci"
        ogImage="/og-image.png"
      />
      <JsonLd data={buildPersonProfileSchema(currentLocale)} />

      <div className="min-h-screen bg-neo-bg text-neo-white">
        {/* Breadcrumbs */}
        <div className="border-b border-neo-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-20 pb-24 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(205,255,80,0.07), transparent)",
            }}
          />
          <div className="max-w-7xl mx-auto px-6 lg:px-20">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Text */}
              <div>
                <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-neo-lime/30 bg-neo-lime/10 text-neo-lime text-xs font-mono uppercase tracking-widest rounded">
                    <Star size={12} />
                    Founder & Lead Developer
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl lg:text-6xl font-display font-bold tracking-tight text-neo-white leading-[1.05] mb-6"
                >
                  Musa Kerem
                  <br />
                  <span className="text-neo-lime">Demirci</span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-neo-muted text-lg leading-relaxed mb-8 max-w-xl"
                >
                  Full-stack web developer and founder of DMC Kreatif. I build high-performance,
                  multilingual websites for businesses across Europe — France, Belgium, UK, and
                  the Netherlands. React, Next.js, TypeScript, and pixel-perfect design.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-10">
                  <div className="flex items-center gap-2 px-4 py-2 border border-neo-border rounded text-sm text-neo-muted">
                    <MapPin size={14} className="text-neo-lime" />
                    Remote — Europe
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 border border-neo-border rounded text-sm text-neo-muted">
                    <Globe size={14} className="text-neo-lime" />
                    EN / FR / NL / DE
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 border border-neo-border rounded text-sm text-neo-muted">
                    <Briefcase size={14} className="text-neo-lime" />
                    33+ Projects Delivered
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
                  <NeoButton href={`/${currentLocale}/contact`} variant="primary">
                    Work With Me
                  </NeoButton>
                  <a
                    href="https://www.linkedin.com/in/musakeremdemirci"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 border-2 border-neo-border hover:border-neo-lime/40 text-neo-muted hover:text-neo-white transition-colors text-sm font-medium rounded"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </motion.div>
              </div>

              {/* Avatar / Stats Card */}
              <motion.div variants={scaleIn} className="relative">
                <div className="border-2 border-neo-border bg-neo-card rounded-2xl p-8">
                  {/* Avatar placeholder */}
                  <div className="w-32 h-32 rounded-2xl bg-neo-elevated border-2 border-neo-lime/30 flex items-center justify-center mx-auto mb-8 text-5xl font-display font-bold text-neo-lime">
                    MK
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "33+", label: "Projects Delivered" },
                      { value: "4", label: "Countries Served" },
                      { value: "4", label: "Languages" },
                      { value: "95+", label: "Avg Lighthouse" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-neo-elevated border border-neo-border rounded-xl p-4 text-center"
                      >
                        <div className="text-2xl font-display font-bold text-neo-lime mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs text-neo-muted">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-neo-lime text-neo-black text-xs font-mono font-bold px-3 py-2 rounded border-2 border-neo-black shadow-hard">
                  AVAILABLE FOR PROJECTS
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 border-t border-neo-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-20">
            <SectionHeader
              headingLevel={2}
              title="Stack & Expertise"
              subtitle="The technologies I use to build high-performance, scalable websites for European businesses."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12"
            >
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={fadeInUp}
                  className="flex items-center gap-4 p-4 border border-neo-border bg-neo-card rounded-xl hover:border-neo-lime/30 transition-colors"
                >
                  <span
                    className={`px-3 py-1.5 text-xs font-mono font-bold rounded border border-neo-black/20 ${skill.color}`}
                  >
                    {skill.name}
                  </span>
                  <div className="flex-1 h-2 bg-neo-elevated rounded-full overflow-hidden">
                    <div
                      className="h-full bg-neo-lime rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono text-neo-muted w-10 text-right">
                    {skill.level}%
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline / Journey */}
        <section className="py-20 border-t border-neo-border bg-neo-bg-secondary">
          <div className="max-w-7xl mx-auto px-6 lg:px-20">
            <SectionHeader
              headingLevel={2}
              title="My Story"
              subtitle="From the first project to a multi-country web agency."
            />

            <div className="mt-12 space-y-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  className="flex gap-6 p-6 border border-neo-border bg-neo-card rounded-xl hover:border-neo-lime/30 transition-colors"
                >
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-xs font-mono text-neo-lime font-bold">{item.year}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-neo-white mb-1">{item.title}</h3>
                    <p className="text-sm text-neo-muted">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 border-t border-neo-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-20">
            <SectionHeader
              headingLevel={2}
              title="Projects Delivered"
              subtitle="A selection of international websites built for real businesses across Europe."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
            >
              {deliveredProjects.map((project) => (
                <motion.div
                  key={project.name}
                  variants={scaleIn}
                  className="flex items-center gap-4 p-5 border border-neo-border bg-neo-card rounded-xl hover:border-neo-lime/30 transition-colors group"
                >
                  <span className="text-2xl">{project.country}</span>
                  <span className="font-medium text-neo-white group-hover:text-neo-lime transition-colors">
                    {project.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 text-center">
              <NeoButton href={`/${currentLocale}/case-studies`} variant="outline">
                View Case Studies
              </NeoButton>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-20 border-t border-neo-border bg-neo-bg-secondary">
          <div className="max-w-4xl mx-auto px-6 lg:px-20 text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <motion.div variants={fadeInUp} className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-neo-lime/30 bg-neo-lime/10 text-neo-lime text-xs font-mono uppercase tracking-widest rounded">
                  <Code2 size={12} />
                  Philosophy
                </span>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl lg:text-4xl font-display font-bold text-neo-white mb-6"
              >
                Every pixel should have a purpose.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-neo-muted text-lg leading-relaxed mb-8">
                I believe great web design is invisible — it guides visitors effortlessly to what
                they need. Performance is not optional: every site I deliver passes 95+ Lighthouse
                scores and loads in under 2 seconds. I work primarily with small and medium European
                businesses who need a professional online presence that converts.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 px-4 py-2 border border-neo-border rounded text-sm text-neo-muted">
                  <Layers size={14} className="text-neo-lime" />
                  Full-stack (front + back)
                </div>
                <div className="flex items-center gap-2 px-4 py-2 border border-neo-border rounded text-sm text-neo-muted">
                  <Zap size={14} className="text-neo-lime" />
                  Performance-first
                </div>
                <div className="flex items-center gap-2 px-4 py-2 border border-neo-border rounded text-sm text-neo-muted">
                  <Globe size={14} className="text-neo-lime" />
                  Multilingual by default
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-neo-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-20 text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl lg:text-4xl font-display font-bold text-neo-white mb-4"
              >
                Ready to work together?
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-neo-muted text-lg mb-8">
                Free consultation — I'll review your project and send a detailed proposal within 24h.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex justify-center gap-4 flex-wrap">
                <NeoButton href={`/${currentLocale}/contact`} variant="primary">
                  Get a Free Quote
                </NeoButton>
                <a
                  href={`/${currentLocale}/portfolio`}
                  className="inline-flex items-center gap-2 px-5 py-3 border-2 border-neo-border hover:border-neo-lime/40 text-neo-muted hover:text-neo-white transition-colors text-sm font-medium rounded"
                >
                  <ExternalLink size={16} />
                  View Portfolio
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
