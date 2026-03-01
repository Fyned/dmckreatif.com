import { useTranslation } from "react-i18next";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import AboutCrossLinks from "@/components/ui/AboutCrossLinks";
import { Globe, Code2, TrendingUp, Briefcase, ArrowRight, Lightbulb, Eye, Star, Users, Mail } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useAnalytics } from "@/lib/useAnalytics";
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from "@/lib/animations";

const CAREERS_EMAIL = "careers@dmckreatif.com";

const perks = [
  { icon: Globe, titleKey: "careers.perkRemoteTitle", descKey: "careers.perkRemoteDesc", color: "bg-neo-lime" },
  { icon: Code2, titleKey: "careers.perkStackTitle", descKey: "careers.perkStackDesc", color: "bg-neo-blue" },
  { icon: TrendingUp, titleKey: "careers.perkGrowthTitle", descKey: "careers.perkGrowthDesc", color: "bg-neo-yellow" },
  { icon: Briefcase, titleKey: "careers.perkClientsTitle", descKey: "careers.perkClientsDesc", color: "bg-neo-pink" },
];

const positions: { titleKey: string; type: string; location: string; descKey: string }[] = [
  { titleKey: "careers.posSeniorReact", type: "Full-time", location: "Remote - Europe", descKey: "careers.posSeniorReactDesc" },
  { titleKey: "careers.posNextjs", type: "Full-time", location: "Remote", descKey: "careers.posNextjsDesc" },
  { titleKey: "careers.posDesigner", type: "Full-time", location: "Remote - Europe", descKey: "careers.posDesignerDesc" },
  { titleKey: "careers.posSeo", type: "Full-time", location: "Remote", descKey: "careers.posSeoDesc" },
  { titleKey: "careers.posPm", type: "Full-time", location: "Remote", descKey: "careers.posPmDesc" },
  { titleKey: "careers.posWriter", type: "Part-time", location: "Remote", descKey: "careers.posWriterDesc" },
  { titleKey: "careers.posDevops", type: "Full-time", location: "Remote", descKey: "careers.posDevopsDesc" },
];

const coreValues = [
  { icon: Lightbulb, titleKey: "careers.valInnovation", color: "bg-neo-lime" },
  { icon: Eye, titleKey: "careers.valTransparency", color: "bg-neo-blue" },
  { icon: Star, titleKey: "careers.valQuality", color: "bg-neo-yellow" },
  { icon: Users, titleKey: "careers.valCollaboration", color: "bg-neo-pink" },
];

const typeBadge: Record<string, string> = { "Full-time": "bg-neo-lime", Contract: "bg-neo-yellow", "Part-time": "bg-neo-blue" };

export default function CareersPage() {
  const { t } = useTranslation();
  useAnalytics("Careers");

  return (
    <>
      <SeoHead
        title={t("seo.careers.title", "Careers at DMC Kreatif — Join Our European Web Team")}
        description={t("seo.careers.description", "Explore open positions at DMC Kreatif. Remote-first, cutting-edge stack, premium European clients.")}
        path="/careers"
      />
      <Breadcrumbs items={[{ label: t("careers.breadcrumb", "CAREERS") }]} />

      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-block font-mono text-xs font-bold tracking-[0.2em] text-neo-black mb-3 border-2 border-neo-black bg-neo-bg-alt px-3 py-1">
                {t("careers.heroTag", "SYS.CAREERS")}
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-space font-bold text-h1 leading-[0.95] tracking-tight mb-6">
              {t("careers.heroTitle", "JOIN OUR TEAM")}
            </motion.h1>
            <motion.p variants={fadeInUp} className="font-mono text-base lg:text-lg text-neo-black/80 max-w-3xl leading-relaxed">
              {t("careers.heroDesc", "Build the future of European web with 100+ professionals. Remote-first, premium clients, cutting-edge technology.")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader title={t("careers.perksTitle", "WHY WORK WITH US")} subtitle={t("careers.perksTag", "SYS.PERKS")} />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <motion.div key={perk.titleKey} variants={scaleIn} className="bg-neo-white border-2 border-neo-black shadow-hard p-6 transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm">
                  <div className={`w-12 h-12 ${perk.color} border-2 border-neo-black shadow-hard-sm flex items-center justify-center mb-4`}>
                    <Icon size={22} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-space font-bold text-sm mb-2">{t(perk.titleKey)}</h3>
                  <p className="font-mono text-xs text-neo-black/70 leading-relaxed">{t(perk.descKey)}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader title={t("careers.positionsTitle", "OPEN POSITIONS")} subtitle={t("careers.positionsTag", "SYS.JOBS")} />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className="space-y-4">
            {positions.map((pos) => (
              <motion.div key={pos.titleKey} variants={fadeInUp} className="bg-neo-white border-2 border-neo-black shadow-hard p-6 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-space font-bold text-sm">{t(pos.titleKey)}</h3>
                    <span className={`${typeBadge[pos.type]} border-2 border-neo-black px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider`}>
                      {pos.type}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-neo-black/60 mb-1">{pos.location}</p>
                  <p className="font-mono text-xs text-neo-black/70 leading-relaxed">{t(pos.descKey)}</p>
                </div>
                <a href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(t(pos.titleKey))}`} className="inline-flex items-center gap-2 bg-neo-lime border-2 border-neo-black shadow-hard px-5 py-2.5 font-space font-bold text-xs uppercase tracking-wider transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm shrink-0">
                  {t("careers.apply", "APPLY")} <Mail size={14} />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader title={t("careers.valuesTitle", "OUR VALUES")} subtitle={t("careers.valuesTag", "SYS.VALUES")} />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <motion.div key={val.titleKey} variants={scaleIn} className={`${val.color} border-2 border-neo-black shadow-hard p-6 text-center transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm`}>
                  <Icon size={28} strokeWidth={2.5} className="mx-auto mb-3" />
                  <span className="font-space font-bold text-sm uppercase tracking-wider">{t(val.titleKey)}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Speculative Application CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}>
            <motion.h2 variants={fadeInUp} className="font-space font-bold text-h2 mb-4">
              {t("careers.ctaTitle", "DON'T SEE YOUR ROLE?")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="font-mono text-base text-neo-black/80 mb-8 max-w-lg mx-auto">
              {t("careers.ctaDesc", "We're always looking for talented people. Send us a speculative application and tell us what you can bring to the team.")}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <NeoButton href={`mailto:${CAREERS_EMAIL}?subject=Speculative Application`} external size="lg" color="neo-lime">
                {t("careers.ctaButton", "SEND APPLICATION")} <ArrowRight size={18} />
              </NeoButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <AboutCrossLinks currentPath="careers" />
    </>
  );
}
