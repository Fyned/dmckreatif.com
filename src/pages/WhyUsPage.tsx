import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Code2, Gauge, CreditCard, Languages, Users, Headphones, ShieldCheck, CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo-schemas";
import { useAnalytics } from "@/lib/useAnalytics";
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from "@/lib/animations";

const reasons = [
  { icon: Globe, tk: "reason1", bg: "bg-neo-lime" },
  { icon: Code2, tk: "reason2", bg: "bg-neo-blue" },
  { icon: Gauge, tk: "reason3", bg: "bg-neo-yellow" },
  { icon: CreditCard, tk: "reason4", bg: "bg-neo-pink" },
  { icon: Languages, tk: "reason5", bg: "bg-neo-purple" },
  { icon: Users, tk: "reason6", bg: "bg-neo-green" },
  { icon: Headphones, tk: "reason7", bg: "bg-neo-lime" },
  { icon: ShieldCheck, tk: "reason8", bg: "bg-neo-blue" },
];

const stats = [
  { value: 200, suffix: "+", lk: "statProjects" },
  { value: 100, suffix: "+", lk: "statTeam" },
  { value: 6, suffix: "", lk: "statCountries" },
  { value: 95, suffix: "+", lk: "statLighthouse" },
  { value: 4.9, suffix: "/5", lk: "statSatisfaction" },
  { value: 98, suffix: "%", lk: "statOnTime" },
];

const cmpRows = [
  { fk: "cmpReact", us: "yes", ag: "sometimes", fl: "rarely" },
  { fk: "cmpMultilingual", us: "yes", ag: "extra", fl: "no" },
  { fk: "cmpLighthouse", us: "yes", ag: "no", fl: "no" },
  { fk: "cmpTeam", us: "yes", ag: "shared", fl: "one" },
  { fk: "cmpSupport", us: "yes", ag: "extra", fl: "no" },
  { fk: "cmpPricing", us: "yes", ag: "hourly", fl: "hourly" },
];

const clients = [
  "CAKIR FACADES|\u{1F1EB}\u{1F1F7}", "ALTINBAS|\u{1F1EB}\u{1F1F7}", "CONSULTING ENERGY|\u{1F1EB}\u{1F1F7}",
  "ISO HOME ENERGY|\u{1F1EB}\u{1F1F7}", "ID HOME|\u{1F1EB}\u{1F1F7}", "RETRO KOSAR|\u{1F1EB}\u{1F1F7}",
  "ARCHI CONSTRUCTION|\u{1F1E7}\u{1F1EA}", "MKN TECHNISCH|\u{1F1E7}\u{1F1EA}", "ADAMSONS|\u{1F1EC}\u{1F1E7}",
  "ATA ACCOUNTANCY|\u{1F1EC}\u{1F1E7}", "NORTHWEST AC|\u{1F1EC}\u{1F1E7}", "GMG DESIGN|\u{1F30D}",
];

function CmpIcon({ v }: { v: string }) {
  if (v === "yes") return <CheckCircle2 size={16} className="text-green-700" />;
  if (v === "no") return <XCircle size={16} className="text-red-600" />;
  return <MinusCircle size={16} className="text-neo-black/40" />;
}

const cmpLabels: Record<string, string> = { yes: "cmpYes", no: "cmpNo", sometimes: "cmpSometimes", rarely: "cmpRarely", extra: "cmpExtra", shared: "cmpShared", one: "cmpOne", hourly: "cmpHourly" };

export default function WhyUsPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  useAnalytics("WhyUs");
  const loc = locale ?? "en";
  const thCls = "font-space font-bold text-xs uppercase tracking-wider p-4";
  const cellCls = "inline-flex items-center gap-1.5 font-mono text-xs";
  return (
    <>
      <SeoHead title={t("seo.whyUs.title", "Why Choose DMC Kreatif")} description={t("seo.whyUs.description", "Modern tech, 95+ Lighthouse, multilingual, transparent pricing.")} path="/why-us" />
      <Breadcrumbs items={[{ label: t("whyUs.breadcrumb", "WHY US") }]} />
      <JsonLd data={buildBreadcrumbSchema(loc, [{ name: "Home", path: "" }], t("whyUs.breadcrumb", "Why Us"))} />

      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-block font-mono text-xs font-bold tracking-[0.2em] text-neo-black mb-3 border-2 border-neo-black bg-neo-bg-alt px-3 py-1">
                {t("whyUs.heroTag", "SYS.WHY_US")}
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-space font-bold text-h1 leading-[0.95] tracking-tight mb-6">
              {t("whyUs.heroTitle", "WHY DMC KREATIF")}
            </motion.h1>
            <motion.p variants={fadeInUp} className="font-mono text-base lg:text-lg text-neo-black/80 max-w-3xl leading-relaxed">
              {t("whyUs.heroDesc", "100+ professionals, 200+ projects, 6 countries. We build premium websites that outperform the competition.")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 8 Reasons */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader title={t("whyUs.reasonsTitle", "8 REASONS TO CHOOSE US")} subtitle={t("whyUs.reasonsTag", "SYS.DIFFERENTIATORS")} />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((r) => {
              const Icon = r.icon;
              return (
                <motion.div key={r.tk} variants={scaleIn} className="bg-neo-white border-2 border-neo-black shadow-hard p-6 transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm">
                  <div className={`w-12 h-12 ${r.bg} border-2 border-neo-black shadow-hard-sm flex items-center justify-center mb-4`}>
                    <Icon size={22} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-space font-bold text-sm mb-2">{t(`whyUs.${r.tk}Title`)}</h3>
                  <p className="font-mono text-xs text-neo-black/70 leading-relaxed">{t(`whyUs.${r.tk}Desc`)}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader title={t("whyUs.numbersTitle", "BY THE NUMBERS")} subtitle={t("whyUs.numbersTag", "SYS.METRICS")} />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((s) => (
              <motion.div key={s.lk} variants={scaleIn} className="bg-neo-white border-2 border-neo-black shadow-hard p-6 text-center">
                <div className="font-space font-bold text-3xl lg:text-4xl mb-2">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="font-mono text-xs font-bold text-neo-black/60 uppercase tracking-wider">{t(`whyUs.${s.lk}`)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Client Logos Marquee */}
      <section className="py-8 overflow-hidden border-y-2 border-neo-black bg-neo-bg">
        <div className="text-center mb-5">
          <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-neo-black/40 border-2 border-neo-black/10 px-4 py-1.5">
            {t("whyUs.trustedBy", "TRUSTED BY BUSINESSES ACROSS EUROPE")}
          </span>
        </div>
        <div className="relative">
          <div className="flex gap-3 animate-marquee-logos motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-3">
            {[...clients, ...clients].map((c, i) => {
              const [name, flag] = c.split("|");
              return (
                <div key={`${name}-${i}`} className="flex-shrink-0 inline-flex items-center gap-2 border-2 border-neo-black/15 bg-neo-white px-4 py-2 select-none hover:border-neo-lime hover:bg-neo-lime/5 transition-colors">
                  <span className="text-sm">{flag}</span>
                  <span className="font-space font-bold text-[10px] uppercase tracking-wider text-neo-black/50 whitespace-nowrap">{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader title={t("whyUs.compareTitle", "WHAT MAKES US DIFFERENT")} subtitle={t("whyUs.compareTag", "SYS.COMPARISON")} />
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className="overflow-x-auto">
            <table className="w-full border-2 border-neo-black bg-neo-white shadow-hard text-left">
              <thead>
                <tr className="border-b-2 border-neo-black bg-neo-lime">
                  <th className={thCls}>{t("whyUs.cmpFeature", "Feature")}</th>
                  <th className={thCls}>{t("whyUs.cmpUs", "DMC Kreatif")}</th>
                  <th className={thCls}>{t("whyUs.cmpAgency", "Typical Agency")}</th>
                  <th className={thCls}>{t("whyUs.cmpFreelancer", "Freelancer")}</th>
                </tr>
              </thead>
              <tbody>
                {cmpRows.map((row, i) => (
                  <tr key={row.fk} className={`border-b border-neo-black/10 ${i % 2 === 1 ? "bg-neo-bg-alt" : ""}`}>
                    <td className="font-mono text-xs font-bold p-4">{t(`whyUs.${row.fk}`)}</td>
                    {([row.us, row.ag, row.fl] as const).map((v, j) => (
                      <td key={j} className="p-4"><span className={cellCls}><CmpIcon v={v} />{t(`whyUs.${cmpLabels[v]}`, v)}</span></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 lg:py-28">
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
    </>
  );
}
