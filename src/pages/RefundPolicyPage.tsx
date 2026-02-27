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

export default function RefundPolicyPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const l = locale ?? "en";

  const sections = [
    { titleKey: "refund.customProjects.title", contentKey: "refund.customProjects.content" },
    { titleKey: "refund.templates.title", contentKey: "refund.templates.content" },
    { titleKey: "refund.carePlans.title", contentKey: "refund.carePlans.content" },
    { titleKey: "refund.euRights.title", contentKey: "refund.euRights.content" },
    { titleKey: "refund.process.title", contentKey: "refund.process.content" },
    { titleKey: "refund.exceptions.title", contentKey: "refund.exceptions.content" },
    { titleKey: "refund.contact.title", contentKey: "refund.contact.content" },
  ];

  return (
    <>
      <SeoHead
        title={t("refund.seoTitle", "Refund & Cancellation Policy — DMC Kreatif")}
        description={t("refund.seoDescription", "Understand DMC Kreatif's refund and cancellation terms.")}
        path="/refund-policy"
      />
      <JsonLd
        data={buildWebPageSchema({
          name: t("refund.seoTitle", "Refund & Cancellation Policy — DMC Kreatif"),
          description: t("refund.seoDescription"),
          url: `https://dmckreatif.com/${l}/refund-policy`,
          locale: l,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema(l, [{ name: "Home", path: "" }], t("refund.breadcrumb", "Refund Policy"))}
      />

      <Breadcrumbs items={[{ label: t("refund.breadcrumb", "REFUND POLICY") }]} />

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <SectionHeader
              subtitle={t("refund.badge", "LEGAL")}
              title={t("refund.title", "Refund & Cancellation Policy")}
            />
            <p className="font-mono text-xs text-neo-black/50 -mt-12 mb-8 uppercase tracking-wider">
              {t("refund.subtitle", "Last updated: February 2026")}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mt-8 bg-neo-white border-2 border-neo-black shadow-hard p-6 md:p-10 font-mono text-sm leading-relaxed text-neo-black/80"
          >
            <p className="mb-6">{t("refund.intro")}</p>

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
                <p className="whitespace-pre-line">{t(section.contentKey)}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase">
            <Link to={`/${l}/terms`} className="border-2 border-neo-black bg-neo-white px-4 py-2 shadow-hard hover:bg-neo-lime transition-colors">
              {t("nav.terms", "Terms of Service")}
            </Link>
            <Link to={`/${l}/privacy`} className="border-2 border-neo-black bg-neo-white px-4 py-2 shadow-hard hover:bg-neo-lime transition-colors">
              {t("nav.privacy", "Privacy Policy")}
            </Link>
            <Link to={`/${l}/legal`} className="border-2 border-neo-black bg-neo-white px-4 py-2 shadow-hard hover:bg-neo-lime transition-colors">
              {t("nav.legal", "Legal Notice")}
            </Link>
          </div>
        </div>
      </section>

      <StartProjectCTA />
    </>
  );
}
