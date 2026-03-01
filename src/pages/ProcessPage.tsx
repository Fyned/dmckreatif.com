import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import AboutCrossLinks from "@/components/ui/AboutCrossLinks";
import { ArrowRight, Search, PenTool, Palette, Code2, TestTube2, Rocket, RefreshCw, Eye, GitBranch, BadgeDollarSign } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useAnalytics } from "@/lib/useAnalytics";
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from "@/lib/animations";

const steps = [
  { icon: Search, title: "DISCOVERY & STRATEGY", timeline: "Week 1", bg: "bg-neo-lime", key: "step1",
    desc: "We start by understanding your business, audience, and goals to build a solid project foundation.",
    deliverables: ["Client brief & goals workshop", "Competitor analysis & market research", "Technical requirements audit", "Project roadmap & timeline"] },
  { icon: PenTool, title: "UX DESIGN & WIREFRAMING", timeline: "Week 2", bg: "bg-neo-yellow", key: "step2",
    desc: "Mapping user journeys and creating wireframes that prioritize conversion and usability.",
    deliverables: ["User journey mapping", "Wireframe prototypes", "Design system creation", "Client feedback rounds"] },
  { icon: Palette, title: "UI DESIGN & BRANDING", timeline: "Week 2-3", bg: "bg-neo-blue", key: "step3",
    desc: "Crafting pixel-perfect mockups with your brand identity across every breakpoint.",
    deliverables: ["High-fidelity mockups", "Responsive design for all breakpoints", "Animation & interaction planning", "Brand integration"] },
  { icon: Code2, title: "DEVELOPMENT & INTEGRATION", timeline: "Week 3-5", bg: "bg-neo-pink", key: "step4",
    desc: "Building with React/Next.js, integrating APIs, CMS, and payment systems.",
    deliverables: ["React/Next.js frontend build", "Backend API integration", "CMS & form setup", "Payment gateway (if e-commerce)"] },
  { icon: TestTube2, title: "TESTING & OPTIMIZATION", timeline: "Week 5-6", bg: "bg-neo-purple", key: "step5",
    desc: "Rigorous cross-browser testing, accessibility audits, and performance tuning.",
    deliverables: ["Cross-browser & device testing", "Lighthouse 95+ score optimization", "WCAG accessibility audit", "Core Web Vitals tuning"] },
  { icon: Rocket, title: "LAUNCH & SUPPORT", timeline: "Week 6+", bg: "bg-neo-green", key: "step6",
    desc: "Seamless deployment, SEO submission, and 30-day post-launch support included.",
    deliverables: ["DNS & hosting configuration", "SSL certificate & security", "SEO submission & sitemap", "30-day post-launch support"] },
];

const principles = [
  { icon: RefreshCw, label: "Agile sprints", bg: "bg-neo-lime" },
  { icon: Eye, label: "Weekly demos", bg: "bg-neo-yellow" },
  { icon: GitBranch, label: "Code reviews", bg: "bg-neo-blue" },
  { icon: BadgeDollarSign, label: "Transparent pricing", bg: "bg-neo-pink" },
];

export default function ProcessPage() {
  const { t } = useTranslation();
  useAnalytics("Process");

  return (
    <>
      <Breadcrumbs items={[{ label: t("nav.process", "PROCESS") }]} />

      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-block font-mono text-xs font-bold tracking-[0.2em] text-neo-black mb-3 border-2 border-neo-black bg-neo-bg-alt px-3 py-1">
                SYS.PROCESS
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-space font-bold text-h1 leading-[0.95] tracking-tight mb-6">
              {t("process.heroTitle", "OUR PROCESS & METHODOLOGY")}
            </motion.h1>
            <motion.p variants={fadeInUp} className="font-mono text-base lg:text-lg text-neo-black/80 max-w-3xl leading-relaxed">
              {t("process.heroDesc", "A proven 6-step framework that turns your vision into a high-performance website. Transparent timelines, weekly demos, and zero surprises.")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      {steps.map((step, idx) => {
        const Icon = step.icon;
        const num = String(idx + 1).padStart(2, "0");
        return (
          <section key={step.key} className={`py-16 lg:py-24 ${idx % 2 === 1 ? "section-alt" : ""}`}>
            <div className="max-w-container mx-auto px-6 lg:px-10">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className="flex flex-col lg:flex-row gap-8 items-start">
                <motion.div variants={scaleIn} className="flex-shrink-0 flex items-center gap-4">
                  <div className="font-space font-bold text-5xl lg:text-7xl text-neo-black/10 leading-none select-none">{num}</div>
                  <div className={`w-14 h-14 ${step.bg} border-2 border-neo-black shadow-hard flex items-center justify-center`}>
                    <Icon size={26} strokeWidth={2.5} />
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 className="font-space font-bold text-h3">{t(`process.${step.key}Title`, step.title)}</h2>
                    <span className={`${step.bg} border-2 border-neo-black px-3 py-0.5 font-mono text-xs font-bold uppercase tracking-wider`}>
                      {t(`process.${step.key}Timeline`, step.timeline)}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-neo-black/80 leading-relaxed mb-4 max-w-2xl">
                    {t(`process.${step.key}Desc`, step.desc)}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step.deliverables.map((d, di) => (
                      <li key={di} className="flex items-center gap-2 font-mono text-xs text-neo-black/70">
                        <span className="w-1.5 h-1.5 bg-neo-black rounded-full flex-shrink-0" />
                        {t(`process.${step.key}D${di + 1}`, d)}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* Principles */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader title={t("process.principlesTitle", "OUR PRINCIPLES")} subtitle="SYS.PRINCIPLES" />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {principles.map((p) => {
              const PIcon = p.icon;
              return (
                <motion.div key={p.label} variants={scaleIn} className="bg-neo-white border-2 border-neo-black shadow-hard p-6 text-center transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm">
                  <div className={`w-12 h-12 ${p.bg} border-2 border-neo-black shadow-hard-sm flex items-center justify-center mx-auto mb-3`}>
                    <PIcon size={22} strokeWidth={2.5} />
                  </div>
                  <span className="font-space font-bold text-sm uppercase tracking-wider">
                    {t(`process.${p.label.toLowerCase().replace(/\s/g, "")}`, p.label)}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="flex flex-wrap border-2 border-neo-black bg-neo-white shadow-hard">
            {[
              { value: 500, suffix: "+", label: "SPRINTS COMPLETED" },
              { value: 98, suffix: "%", label: "ON-TIME DELIVERY" },
              { value: 49, suffix: "/5", label: "CLIENT SATISFACTION", divide: 10 },
            ].map((stat, i, arr) => (
              <div key={stat.label} className={`flex-1 min-w-[140px] p-6 text-center ${i < arr.length - 1 ? "border-r-2 border-neo-black" : ""}`}>
                <div className="font-space font-bold text-2xl lg:text-3xl">
                  {stat.divide ? "4.9" : <AnimatedCounter target={stat.value} suffix={stat.suffix} />}
                  {stat.divide && stat.suffix}
                </div>
                <div className="font-mono text-xs font-bold text-neo-black/60 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}>
            <motion.h2 variants={fadeInUp} className="font-space font-bold text-h2 mb-4">
              {t("cta.title", "READY TO BUILD SOMETHING?")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="font-mono text-base text-neo-black/80 mb-8 max-w-lg mx-auto">
              {t("cta.subtitle", "Let's create a website that works as hard as you do.")}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <NeoButton href="/contact" size="lg" color="neo-lime">
                {t("cta.button", "START YOUR PROJECT")} <ArrowRight size={18} />
              </NeoButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <AboutCrossLinks currentPath="process" />
    </>
  );
}
