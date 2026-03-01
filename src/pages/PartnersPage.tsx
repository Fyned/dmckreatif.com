import { useTranslation } from "react-i18next";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import AboutCrossLinks from "@/components/ui/AboutCrossLinks";
import { ArrowRight, Shield, GitBranch } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useAnalytics } from "@/lib/useAnalytics";
import { fadeInUp, staggerContainer, scaleIn, viewportConfig } from "@/lib/animations";

const partners = [
  { name: "Vercel", descKey: "partners.vercelDesc", useKey: "partners.vercelUse", color: "bg-neo-lime" },
  { name: "Supabase", descKey: "partners.supabaseDesc", useKey: "partners.supabaseUse", color: "bg-neo-green" },
  { name: "Stripe", descKey: "partners.stripeDesc", useKey: "partners.stripeUse", color: "bg-neo-purple" },
  { name: "Google", descKey: "partners.googleDesc", useKey: "partners.googleUse", color: "bg-neo-blue" },
  { name: "Cloudflare", descKey: "partners.cloudflareDesc", useKey: "partners.cloudflareUse", color: "bg-neo-yellow" },
  { name: "Shopify", descKey: "partners.shopifyDesc", useKey: "partners.shopifyUse", color: "bg-neo-green" },
  { name: "HubSpot", descKey: "partners.hubspotDesc", useKey: "partners.hubspotUse", color: "bg-neo-pink" },
  { name: "Figma", descKey: "partners.figmaDesc", useKey: "partners.figmaUse", color: "bg-neo-purple" },
] as const;

const certifications = [
  { labelKey: "partners.certGA", color: "bg-neo-blue" },
  { labelKey: "partners.certGDPR", color: "bg-neo-green" },
  { labelKey: "partners.certWCAG", color: "bg-neo-yellow" },
  { labelKey: "partners.certPCI", color: "bg-neo-purple" },
  { labelKey: "partners.certISO", color: "bg-neo-pink" },
  { labelKey: "partners.certCWV", color: "bg-neo-lime" },
] as const;

export default function PartnersPage() {
  const { t } = useTranslation();
  useAnalytics("Partners");

  return (
    <>
      <SeoHead
        title={t("seo.partners.title", "Technology Partners & Certifications | DMC Kreatif")}
        description={t("seo.partners.description", "We partner with Vercel, Supabase, Stripe, Google and more to deliver premium web solutions for European businesses.")}
        path="/partners"
      />
      <Breadcrumbs items={[{ label: t("partners.breadcrumb", "PARTNERS") }]} />

      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-block font-mono text-xs font-bold tracking-[0.2em] text-neo-black mb-3 border-2 border-neo-black bg-neo-bg-alt px-3 py-1">
                {t("partners.heroSubtitle", "SYS.PARTNERS")}
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-space font-bold text-h1 leading-[0.95] tracking-tight mb-6">
              {t("partners.heroTitle", "OUR TECHNOLOGY PARTNERS")}
            </motion.h1>
            <motion.p variants={fadeInUp} className="font-mono text-base lg:text-lg text-neo-black/80 max-w-3xl leading-relaxed">
              {t("partners.heroDesc", "We work with the best tools and platforms to deliver fast, secure, and scalable web solutions for European businesses.")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader title={t("partners.gridTitle", "TECHNOLOGY STACK")} subtitle={t("partners.gridSubtitle", "SYS.INTEGRATIONS")} />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((p) => (
              <motion.div key={p.name} variants={scaleIn} className="bg-neo-white border-2 border-neo-black shadow-hard p-6 transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm">
                <div className={`inline-block ${p.color} border-2 border-neo-black shadow-hard-sm px-3 py-1 font-space font-bold text-xs uppercase tracking-wider mb-4`}>
                  {p.name}
                </div>
                <p className="font-mono text-sm text-neo-black/80 leading-relaxed mb-2">
                  {t(p.descKey, "")}
                </p>
                <p className="font-mono text-xs text-neo-black/60 leading-relaxed">
                  {t(p.useKey, "")}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader title={t("partners.certTitle", "CERTIFICATIONS & COMPLIANCE")} subtitle={t("partners.certSubtitle", "SYS.COMPLIANCE")} />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <motion.div key={cert.labelKey} variants={fadeInUp} className="flex items-center gap-4 bg-neo-white border-2 border-neo-black shadow-hard p-5 transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm">
                <div className={`w-10 h-10 ${cert.color} border-2 border-neo-black shadow-hard-sm flex items-center justify-center flex-shrink-0`}>
                  <Shield size={18} strokeWidth={2.5} />
                </div>
                <span className="font-space font-bold text-sm tracking-tight">{t(cert.labelKey, "")}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Source */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}>
            <motion.div variants={fadeInUp} className="bg-neo-white border-2 border-neo-black shadow-hard p-8 lg:p-10 flex flex-col lg:flex-row items-start gap-6">
              <div className="w-14 h-14 bg-neo-lime border-2 border-neo-black shadow-hard flex items-center justify-center flex-shrink-0">
                <GitBranch size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-space font-bold text-xl mb-3">
                  {t("partners.ossTitle", "OPEN SOURCE CONTRIBUTIONS")}
                </h3>
                <p className="font-mono text-sm text-neo-black/80 leading-relaxed mb-4">
                  {t("partners.ossDesc", "We actively contribute to the React ecosystem, build Tailwind CSS plugins, and participate in the Supabase community. Open source is at the heart of how we build.")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {["React", "Tailwind CSS", "Supabase"].map((tag) => (
                    <span key={tag} className="font-mono text-xs font-bold border-2 border-neo-black bg-neo-bg-alt px-3 py-1 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}>
            <motion.h2 variants={fadeInUp} className="font-space font-bold text-h2 mb-4">
              {t("partners.ctaTitle", "BECOME A PARTNER")}
            </motion.h2>
            <motion.p variants={fadeInUp} className="font-mono text-base text-neo-black/80 mb-8 max-w-lg mx-auto">
              {t("partners.ctaDesc", "Interested in a technology partnership? Let's explore how we can work together.")}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <NeoButton href="/contact" size="lg" color="neo-lime">
                {t("partners.ctaButton", "GET IN TOUCH")} <ArrowRight size={18} />
              </NeoButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <AboutCrossLinks currentPath="partners" />
    </>
  );
}
