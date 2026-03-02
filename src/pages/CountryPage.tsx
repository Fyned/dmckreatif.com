import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Globe, ArrowRight, CheckCircle2, Building2, ExternalLink } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import JsonLd from "@/components/seo/JsonLd";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { buildCountrySchema } from "@/lib/seo-schemas";
import { getCountryBySlug } from "@/data/countries";
import { getCitiesByCountry } from "@/data/cities";
import { caseStudies } from "@/data/case-studies";

interface Props {
  countrySlug: string;
}

export default function CountryPage({ countrySlug }: Props) {
  const { t } = useTranslation();
  const { locale } = useParams();
  const country = getCountryBySlug(countrySlug);

  if (!country) {
    return (
      <div className="py-32 text-center">
        <p className="font-mono text-neo-black/50">Country not found.</p>
      </div>
    );
  }

  const cities = getCitiesByCountry(country.code);
  const countryCaseStudies = caseStudies.filter((cs) => cs.country === country.caseStudyCode);
  const countryName = t(country.nameKey);
  const loc = locale ?? "en";

  const stats = [
    { value: countryCaseStudies.length > 0 ? `${countryCaseStudies.length}` : "5+", label: t("countryPages.statsProjects", "Projects Delivered") },
    { value: `${cities.length}`, label: t("countryPages.statsCities", "Cities Covered") },
    { value: "97", label: t("countryPages.statsLighthouse", "Avg Lighthouse") },
    { value: "24h", label: t("countryPages.statsResponse", "Response Time") },
  ];

  return (
    <>
      <SeoHead
        title={t(`seo.countryPage.${country.slug}.title`, t(country.titleKey))}
        description={t(`seo.countryPage.${country.slug}.description`, t(country.descriptionKey))}
        path={`/web-agency-${country.slug}`}
      />
      <JsonLd data={buildCountrySchema({ countryName, locale: loc })} />

      <Breadcrumbs
        items={[
          { label: t("nav.services", "SERVICES"), href: `/${loc}/services` },
          { label: countryName },
        ]}
      />

      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{country.flag}</span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-neo-lime border-2 border-neo-black bg-neo-black px-3 py-1">
                <MapPin size={12} className="inline -mt-0.5 mr-1" />
                {countryName}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-space font-bold text-4xl lg:text-6xl text-neo-black mb-6 leading-tight"
            >
              {t(country.titleKey)}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-mono text-sm lg:text-base text-neo-black/70 leading-relaxed max-w-2xl mb-8"
            >
              {t(country.introKey)}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <NeoButton href={`/${loc}/contact`} color="neo-lime">
                {t(country.ctaKey)}
                <ArrowRight size={16} />
              </NeoButton>
              <NeoButton href={`/${loc}/portfolio`} color="neo-yellow">
                {t("countryPages.viewWork", "View Our Work")}
                <Globe size={16} />
              </NeoButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 border-y-2 border-neo-black bg-neo-black">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-space font-bold text-3xl lg:text-4xl text-neo-lime mb-1">{stat.value}</p>
                <p className="font-mono text-xs text-white/60 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("countryPages.citiesTitle", "Cities We Serve")}
            subtitle={t("countryPages.citiesSubtitle", "LOCAL PRESENCE")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-12"
          >
            {cities.map((city) => (
              <motion.div key={city.slug} variants={fadeInUp}>
                <Link
                  to={`/${loc}/web-agency-${city.slug}`}
                  className="flex items-center gap-3 border-2 border-neo-black bg-neo-white shadow-hard p-4 hover:bg-neo-lime hover:shadow-hard-sm transition-all duration-200 group"
                >
                  <Building2 size={16} className="text-neo-black/40 group-hover:text-neo-black flex-shrink-0" />
                  <span className="font-mono text-sm font-bold text-neo-black">{t(city.nameKey)}</span>
                  <ArrowRight size={12} className="ml-auto text-neo-black/30 group-hover:text-neo-black flex-shrink-0" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      {countryCaseStudies.length > 0 && (
        <section className="py-16 bg-neo-bg border-y-2 border-neo-black">
          <div className="max-w-container mx-auto px-6 lg:px-10">
            <SectionHeader
              title={t("countryPages.caseStudiesTitle", `Our Work in ${countryName}`)}
              subtitle={t("countryPages.caseStudiesSubtitle", "PORTFOLIO")}
            />
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
            >
              {countryCaseStudies.slice(0, 3).map((cs) => (
                <motion.div
                  key={cs.slug}
                  variants={fadeInUp}
                  className="border-2 border-neo-black bg-neo-white shadow-hard p-6 flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">{cs.flag}</span>
                    <span className="font-mono text-xs bg-neo-black text-white px-2 py-0.5 uppercase tracking-wide">
                      {cs.sector}
                    </span>
                  </div>
                  <h3 className="font-space font-bold text-lg text-neo-black mb-2">{cs.name}</h3>
                  <p className="font-mono text-xs text-neo-black/60 leading-relaxed mb-4 flex-1">
                    {cs.overview.slice(0, 120)}...
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-neo-black">
                    <div className="flex gap-2">
                      {cs.metrics.slice(0, 2).map((m) => (
                        <span key={m.label} className="font-space font-bold text-xs text-neo-lime bg-neo-black px-2 py-1">
                          {m.value}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/${loc}/case-studies/${cs.slug}`}
                      className="font-mono text-xs font-bold text-neo-black hover:text-neo-lime flex items-center gap-1 transition-colors"
                    >
                      VIEW <ArrowRight size={10} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {countryCaseStudies.length > 3 && (
              <div className="text-center mt-8">
                <NeoButton href={`/${loc}/case-studies`} color="neo-black">
                  {t("countryPages.viewAllCaseStudies", "View All Projects")}
                  <ExternalLink size={14} />
                </NeoButton>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("countryPages.whyChoose", "Why Choose DMC Kreatif")}
            subtitle={t("countryPages.benefits", "BENEFITS")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {country.benefitsKeys.map((key, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="border-2 border-neo-black bg-neo-white shadow-hard p-6"
              >
                <CheckCircle2 size={20} className="text-neo-lime mb-3" />
                <p className="font-mono text-sm text-neo-black leading-relaxed">{t(key)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-neo-lime/10 border-y-2 border-neo-black">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-space font-bold text-3xl lg:text-4xl text-neo-black mb-4">
            {t("countryPages.ctaTitle", "Ready to Start Your Project?")}
          </h2>
          <p className="font-mono text-sm text-neo-black/70 mb-8 max-w-xl mx-auto">
            {t("countryPages.ctaDesc", "Get a free consultation and quote within 24 hours.")}
          </p>
          <NeoButton href={`/${loc}/contact`} color="neo-lime" size="lg">
            {t(country.ctaKey)}
            <ArrowRight size={16} />
          </NeoButton>
        </div>
      </section>
    </>
  );
}
