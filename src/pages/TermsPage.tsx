import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SeoHead from "@/components/seo/SeoHead";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StartProjectCTA from "@/components/ui/StartProjectCTA";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, viewportConfig } from "@/lib/animations";

export default function TermsPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const l = locale ?? "en";

  const sections = [
    { titleKey: "terms.services.title", contentKey: "terms.services.content" },
    { titleKey: "terms.payment.title", contentKey: "terms.payment.content" },
    { titleKey: "terms.delivery.title", contentKey: "terms.delivery.content" },
    { titleKey: "terms.ip.title", contentKey: "terms.ip.content" },
    { titleKey: "terms.liability.title", contentKey: "terms.liability.content" },
    { titleKey: "terms.termination.title", contentKey: "terms.termination.content" },
    { titleKey: "terms.governing.title", contentKey: "terms.governing.content" },
    { titleKey: "terms.changes.title", contentKey: "terms.changes.content" },
    { titleKey: "terms.contact.title", contentKey: "terms.contact.content" },
  ];

  return (
    <>
      <SeoHead
        title={t("terms.seoTitle", "Terms of Service — DMC Kreatif")}
        description={t("terms.seoDescription", "Read the terms and conditions for using DMC Kreatif web development services.")}
        path="/terms"
      />
      <Breadcrumbs
        items={[
          { label: t("terms.breadcrumb", "TERMS OF SERVICE") },
        ]}
      />

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <SectionHeader
              subtitle={t("terms.badge", "LEGAL")}
              title={t("terms.title", "Terms of Service")}
            />
            <p className="font-mono text-xs text-neo-black/50 -mt-12 mb-8 uppercase tracking-wider">
              {t("terms.subtitle", "Last updated: February 2026")}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mt-8 bg-neo-white border-2 border-neo-black shadow-hard p-6 md:p-10 font-mono text-sm leading-relaxed text-neo-black/80"
          >
            <p className="mb-6">
              {t("terms.intro", "These Terms of Service (\"Terms\") govern your use of DMC Kreatif's website and web development services. By engaging our services, you agree to these terms.")}
            </p>

            {sections.map((section, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="mb-8"
              >
                <h2 className="font-space font-bold text-lg uppercase tracking-tight text-neo-black mb-3 border-b-2 border-neo-black pb-2">
                  {t(section.titleKey)}
                </h2>
                <p className="whitespace-pre-line">
                  {t(section.contentKey)}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Internal links */}
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase">
            <Link to={`/${l}/privacy`} className="border-2 border-neo-black bg-neo-white px-4 py-2 shadow-hard hover:bg-neo-lime transition-colors">
              {t("nav.privacy", "Privacy Policy")}
            </Link>
            <Link to={`/${l}/pricing`} className="border-2 border-neo-black bg-neo-white px-4 py-2 shadow-hard hover:bg-neo-lime transition-colors">
              {t("nav.pricing", "Pricing")}
            </Link>
            <Link to={`/${l}/contact`} className="border-2 border-neo-black bg-neo-white px-4 py-2 shadow-hard hover:bg-neo-lime transition-colors">
              {t("nav.contact", "Contact Us")}
            </Link>
          </div>
        </div>
      </section>

      <StartProjectCTA />
    </>
  );
}
