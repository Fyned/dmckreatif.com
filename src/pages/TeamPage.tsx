import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import AboutCrossLinks from "@/components/ui/AboutCrossLinks";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Crown,
  MonitorSmartphone,
  Server,
  Palette,
  Search,
  ShoppingCart,
  PenTool,
  ShieldCheck,
  KanbanSquare,
  Cloud,
  Globe,
  HeartHandshake,
  MapPin,
  Users,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildOrganizationSchema, buildBreadcrumbSchema } from "@/lib/seo-schemas";
import { useAnalytics } from "@/lib/useAnalytics";
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from "@/lib/animations";

const departments: { icon: React.ElementType; nk: string; size: number; color: string; specs: string[] }[] = [
  { icon: Crown, nk: "dept1", size: 5, color: "bg-neo-lime", specs: ["Vision & Strategy", "Client Relations", "Business Development"] },
  { icon: MonitorSmartphone, nk: "dept2", size: 12, color: "bg-neo-blue", specs: ["React / Next.js", "TypeScript / Vite", "Performance"] },
  { icon: Server, nk: "dept3", size: 10, color: "bg-neo-purple", specs: ["Supabase / PostgreSQL", "API Development", "Cloud Architecture"] },
  { icon: Palette, nk: "dept4", size: 8, color: "bg-neo-pink", specs: ["User Research", "Prototyping", "Design Systems"] },
  { icon: Search, nk: "dept5", size: 15, color: "bg-neo-yellow", specs: ["Technical SEO", "Content Strategy", "PPC & Analytics"] },
  { icon: ShoppingCart, nk: "dept6", size: 8, color: "bg-neo-green", specs: ["Shopify / WooCommerce", "Custom Platforms", "Payment Integration"] },
  { icon: PenTool, nk: "dept7", size: 10, color: "bg-neo-orange", specs: ["Blog & Case Studies", "Multilingual Content", "Brand Voice"] },
  { icon: ShieldCheck, nk: "dept8", size: 8, color: "bg-neo-red", specs: ["QA Testing", "Accessibility", "Security Audits"] },
  { icon: KanbanSquare, nk: "dept9", size: 6, color: "bg-neo-blue", specs: ["Agile Delivery", "Client Communication", "Timeline Management"] },
  { icon: Cloud, nk: "dept10", size: 5, color: "bg-neo-purple", specs: ["CI/CD Pipelines", "Server Management", "Monitoring & Uptime"] },
  { icon: Globe, nk: "dept11", size: 8, color: "bg-neo-yellow", specs: ["FR / NL / DE Translations", "Cultural Adaptation", "Market Research"] },
  { icon: HeartHandshake, nk: "dept12", size: 5, color: "bg-neo-lime", specs: ["Onboarding", "Care Plan Management", "Client Retention"] },
];

const offices = [
  { city: "London", label: "HQ (Registering)" }, { city: "Paris", label: "Studio" },
  { city: "Brussels", label: "Co-working" }, { city: "Amsterdam", label: "Co-working" },
];

export default function TeamPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  useAnalytics("Team");
  const currentLocale = locale ?? "en";

  return (
    <>
      <SeoHead
        title={t("seo.team.title", "Our Team & Departments — DMC Kreatif")}
        description={t("seo.team.description", "100+ professionals across 12 departments. 35 core team members and 65+ specialist partners serving European businesses.")}
        path="/team"
      />
      <Breadcrumbs items={[{ label: t("nav.team", "TEAM") }]} />
      <JsonLd data={buildOrganizationSchema()} /><JsonLd data={buildBreadcrumbSchema(currentLocale, [{ name: "Home", path: "" }], t("nav.team", "Team"))} />

      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-block font-mono text-xs font-bold tracking-[0.2em] text-neo-black mb-3 border-2 border-neo-black bg-neo-bg-alt px-3 py-1">
                {t("team.subtitle", "SYS.TEAM")}
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-space font-bold text-h1 leading-[0.95] tracking-tight mb-6">
              {t("team.heroTitle", "OUR TEAM")}
            </motion.h1>
            <motion.p variants={fadeInUp} className="font-mono text-base lg:text-lg text-neo-black/80 max-w-3xl leading-relaxed mb-12">
              {t("team.heroSubtitle", "35 core team members and 65+ specialist partners across 4 European countries. One mission: building premium digital experiences.")}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap border-2 border-neo-black bg-neo-white shadow-hard">
              {[
                { value: 100, suffix: "+", label: t("team.statProfessionals", "PROFESSIONALS") },
                { value: 12, suffix: "", label: t("team.statDepartments", "DEPARTMENTS") },
                { value: 4, suffix: "", label: t("team.statCountries", "COUNTRIES") },
                { value: 35, suffix: "", label: t("team.statCore", "CORE TEAM") },
              ].map((stat, i) => (
                <div key={stat.label} className={`flex-1 min-w-[120px] p-5 text-center ${i < 3 ? "border-r-2 border-neo-black" : ""}`}>
                  <div className="font-space font-bold text-2xl lg:text-3xl">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-mono text-xs font-bold text-neo-black/60 uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Model */}
      <section className="py-16 lg:py-20 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="bg-neo-white border-2 border-neo-black shadow-hard-lg p-8 lg:p-12 flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-20 h-20 bg-neo-lime border-2 border-neo-black shadow-hard flex items-center justify-center flex-shrink-0">
              <Users size={32} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="font-space font-bold text-h3 mb-3">{t("team.modelTitle", "HYBRID TEAM MODEL")}</h2>
              <p className="font-mono text-sm text-neo-black/80 leading-relaxed">
                {t("team.modelDesc", "We operate a hybrid agency model: 35 core professionals handle strategy, development, and client relationships. Our extended network of 65+ vetted specialists — designers, translators, SEO analysts, and QA engineers — scales capacity on demand across France, Belgium, Netherlands, and the UK.")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader title={t("team.deptTitle", "12 DEPARTMENTS")} subtitle={t("team.deptSubtitle", "SYS.DEPARTMENTS")} />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map(({ icon: Icon, nk, size, color, specs }) => (
              <motion.div key={nk} variants={scaleIn} className="bg-neo-white border-2 border-neo-black shadow-hard p-6 transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${color} border-2 border-neo-black shadow-hard-sm flex items-center justify-center`}>
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-space font-bold text-sm flex-1">{t(`team.${nk}`)}</h3>
                  <span className="font-mono text-xs font-bold bg-neo-black text-neo-white px-2 py-0.5">{size}</span>
                </div>
                <p className="font-mono text-xs text-neo-black/70 leading-relaxed mb-3">{t(`team.${nk}Desc`)}</p>
                <div className="flex flex-wrap gap-1.5">
                  {specs.map((s) => (
                    <span key={s} className="font-mono text-[10px] font-bold tracking-wider border border-neo-black/20 px-2 py-0.5 text-neo-black/60">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership Spotlight */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader title={t("team.leaderTitle", "LEADERSHIP")} subtitle={t("team.leaderSubtitle", "SYS.FOUNDER")} />
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="bg-neo-white border-2 border-neo-black shadow-hard-lg p-8 lg:p-12 flex flex-col lg:flex-row gap-8 items-center max-w-3xl">
            <div className="w-24 h-24 bg-neo-lime border-4 border-neo-black shadow-hard flex items-center justify-center flex-shrink-0">
              <Code2 size={36} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-space font-bold text-xl mb-1">{t("team.founderName", "Musa Kerem Demirci")}</h3>
              <span className="inline-block font-mono text-xs font-bold tracking-wider text-neo-black/60 uppercase mb-3">{t("team.founderRole", "CEO & LEAD DEVELOPER")}</span>
              <p className="font-mono text-sm text-neo-black/80 leading-relaxed">
                {t("team.founderBio", "Full-stack developer and agency founder with deep expertise in React, Next.js, and Supabase. Leads strategy, client relationships, and technical architecture across all European markets. Built 33+ production websites for businesses in France, Belgium, the UK, and the Netherlands.")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Distributed Excellence — Offices */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader title={t("team.officesTitle", "DISTRIBUTED EXCELLENCE")} subtitle={t("team.officesSubtitle", "SYS.LOCATIONS")} />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((o) => (
              <motion.div key={o.city} variants={scaleIn} className="bg-neo-white border-2 border-neo-black shadow-hard p-6 text-center transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm hover:bg-neo-lime">
                <MapPin size={20} strokeWidth={2.5} className="mx-auto mb-3" />
                <div className="font-space font-bold text-sm mb-0.5">{o.city}</div>
                <div className="font-mono text-xs text-neo-black/60">{o.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}>
            <motion.h2 variants={fadeInUp} className="font-space font-bold text-h2 mb-4">
              {t("team.ctaTitle", "WORK WITH US")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="font-mono text-base text-neo-black/80 mb-8 max-w-lg mx-auto">
              {t("team.ctaDesc", "Whether you want to join our specialist network or start a project with our team — let's talk.")}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <NeoButton href="/contact" size="lg" color="neo-lime">
                {t("team.ctaButton", "GET IN TOUCH")} <ArrowRight size={18} />
              </NeoButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <AboutCrossLinks currentPath="team" />
    </>
  );
}
