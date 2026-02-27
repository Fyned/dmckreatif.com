import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SeoHead from "@/components/seo/SeoHead";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StartProjectCTA from "@/components/ui/StartProjectCTA";
import SectionHeader from "@/components/ui/SectionHeader";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/seo-schemas";
import { fadeInUp, viewportConfig } from "@/lib/animations";

export default function PrivacyPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const l = locale ?? "en";

  const sections = [
    { titleKey: "privacy.dataCollection.title", contentKey: "privacy.dataCollection.content" },
    { titleKey: "privacy.dataUsage.title", contentKey: "privacy.dataUsage.content" },
    { titleKey: "privacy.cookies.title", contentKey: "privacy.cookies.content" },
    { titleKey: "privacy.thirdParty.title", contentKey: "privacy.thirdParty.content" },
    { titleKey: "privacy.rights.title", contentKey: "privacy.rights.content" },
    { titleKey: "privacy.retention.title", contentKey: "privacy.retention.content" },
    { titleKey: "privacy.security.title", contentKey: "privacy.security.content" },
    { titleKey: "privacy.changes.title", contentKey: "privacy.changes.content" },
    { titleKey: "privacy.contact.title", contentKey: "privacy.contact.content" },
  ];

  return (
    <>
      <SeoHead
        title={t("privacy.seoTitle", "Privacy Policy — DMC Kreatif")}
        description={t("privacy.seoDescription", "Learn how DMC Kreatif collects, uses, and protects your personal data. GDPR compliant privacy policy.")}
        path="/privacy"
      />
      <JsonLd
        data={buildWebPageSchema({
          name: t("privacy.seoTitle", "Privacy Policy — DMC Kreatif"),
          description: t("privacy.seoDescription", "Learn how DMC Kreatif collects, uses, and protects your personal data. GDPR compliant privacy policy."),
          url: `https://dmckreatif.com/${l}/privacy`,
          locale: l,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema(l, [{ name: "Home", path: "" }], t("privacy.breadcrumb", "Privacy Policy"))}
      />

      <Breadcrumbs
        items={[
          { label: t("privacy.breadcrumb", "PRIVACY POLICY") },
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
              subtitle={t("privacy.badge", "LEGAL")}
              title={t("privacy.title", "Privacy Policy")}
            />
            <p className="font-mono text-xs text-neo-black/50 -mt-12 mb-8 uppercase tracking-wider">
              {t("privacy.subtitle", "Last updated: February 2026")}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mt-8 bg-neo-white border-2 border-neo-black shadow-hard p-6 md:p-10 font-mono text-sm leading-relaxed text-neo-black/80"
          >
            <p className="mb-6">
              {t("privacy.intro", "DMC Kreatif (\"we\", \"us\", \"our\") is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website (dmckreatif.com) or use our services.")}
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
            <Link to={`/${l}/terms`} className="border-2 border-neo-black bg-neo-white px-4 py-2 shadow-hard hover:bg-neo-lime transition-colors">
              {t("nav.terms", "Terms of Service")}
            </Link>
            <Link to={`/${l}/legal`} className="border-2 border-neo-black bg-neo-white px-4 py-2 shadow-hard hover:bg-neo-lime transition-colors">
              {t("footer.legal", "Legal Notice")}
            </Link>
            <Link to={`/${l}/cookie-policy`} className="border-2 border-neo-black bg-neo-white px-4 py-2 shadow-hard hover:bg-neo-lime transition-colors">
              {t("footer.cookiePolicy", "Cookie Policy")}
            </Link>
            <Link to={`/${l}/refund-policy`} className="border-2 border-neo-black bg-neo-white px-4 py-2 shadow-hard hover:bg-neo-lime transition-colors">
              {t("footer.refundPolicy", "Refund Policy")}
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
