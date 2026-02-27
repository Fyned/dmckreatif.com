import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SeoHead from "@/components/seo/SeoHead";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StartProjectCTA from "@/components/ui/StartProjectCTA";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import JsonLd from "@/components/seo/JsonLd";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/seo-schemas";
import { fadeInUp, viewportConfig } from "@/lib/animations";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { Settings } from "lucide-react";

export default function CookiePolicyPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const l = locale ?? "en";
  const { openManager } = useCookieConsent();

  const sections = [
    { titleKey: "cookiePolicy.whatAreCookies.title", contentKey: "cookiePolicy.whatAreCookies.content" },
    { titleKey: "cookiePolicy.necessary.title", contentKey: "cookiePolicy.necessary.content" },
    { titleKey: "cookiePolicy.analytics.title", contentKey: "cookiePolicy.analytics.content" },
    { titleKey: "cookiePolicy.marketing.title", contentKey: "cookiePolicy.marketing.content" },
    { titleKey: "cookiePolicy.thirdParty.title", contentKey: "cookiePolicy.thirdParty.content" },
    { titleKey: "cookiePolicy.manage.title", contentKey: "cookiePolicy.manage.content" },
    { titleKey: "cookiePolicy.changes.title", contentKey: "cookiePolicy.changes.content" },
    { titleKey: "cookiePolicy.contact.title", contentKey: "cookiePolicy.contact.content" },
  ];

  return (
    <>
      <SeoHead
        title={t("cookiePolicy.seoTitle", "Cookie Policy — DMC Kreatif")}
        description={t("cookiePolicy.seoDescription", "Detailed information about the cookies used on dmckreatif.com.")}
        path="/cookie-policy"
      />
      <JsonLd
        data={buildWebPageSchema({
          name: t("cookiePolicy.seoTitle", "Cookie Policy — DMC Kreatif"),
          description: t("cookiePolicy.seoDescription"),
          url: `https://dmckreatif.com/${l}/cookie-policy`,
          locale: l,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema(l, [{ name: "Home", path: "" }], t("cookiePolicy.breadcrumb", "Cookie Policy"))}
      />

      <Breadcrumbs items={[{ label: t("cookiePolicy.breadcrumb", "COOKIE POLICY") }]} />

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <SectionHeader
              subtitle={t("cookiePolicy.badge", "GDPR")}
              title={t("cookiePolicy.title", "Cookie Policy")}
            />
            <p className="font-mono text-xs text-neo-black/50 -mt-12 mb-8 uppercase tracking-wider">
              {t("cookiePolicy.subtitle", "Last updated: February 2026")}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mt-8 bg-neo-white border-2 border-neo-black shadow-hard p-6 md:p-10 font-mono text-sm leading-relaxed text-neo-black/80"
          >
            <p className="mb-6">{t("cookiePolicy.intro")}</p>

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

            {/* Manage Cookies Button */}
            <div className="mt-4 pt-6 border-t-2 border-neo-black">
              <NeoButton onClick={openManager} size="md" color="neo-lime">
                <Settings size={16} className="mr-2" />
                {t("cookiePolicy.manageCookiesBtn", "Manage Cookie Preferences")}
              </NeoButton>
            </div>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase">
            <Link to={`/${l}/privacy`} className="border-2 border-neo-black bg-neo-white px-4 py-2 shadow-hard hover:bg-neo-lime transition-colors">
              {t("nav.privacy", "Privacy Policy")}
            </Link>
            <Link to={`/${l}/terms`} className="border-2 border-neo-black bg-neo-white px-4 py-2 shadow-hard hover:bg-neo-lime transition-colors">
              {t("nav.terms", "Terms of Service")}
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
