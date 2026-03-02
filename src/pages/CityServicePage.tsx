import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import JsonLd from "@/components/seo/JsonLd";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { buildCitySchema, buildBreadcrumbSchema } from "@/lib/seo-schemas";
import { getCityBySlug } from "@/data/cities";

export default function CityServicePage() {
  const { t } = useTranslation();
  const { locale, city: citySlug } = useParams();
  const city = citySlug ? getCityBySlug(citySlug) : null;

  if (!city) {
    return (
      <div className="py-32 text-center">
        <p className="font-mono text-neo-black/50">City not found.</p>
      </div>
    );
  }

  const cityName = t(city.nameKey);

  const services = [
    { key: "cityPages.serviceWeb", icon: "\u{1F4BB}", slug: "web-design" },
    { key: "cityPages.serviceEcom", icon: "\u{1F6D2}", slug: "ecommerce" },
    { key: "cityPages.serviceSeo", icon: "\u{1F50D}", slug: "seo" },
    { key: "cityPages.serviceMarketing", icon: "\u{1F4E3}", slug: "digital-marketing" },
  ];

  return (
    <>
      <SeoHead
        title={t(city.titleKey)}
        description={t(city.descriptionKey)}
        path={`/web-agency-${city.slug}`}
      />
      <JsonLd data={buildCitySchema({ cityName, lat: city.lat, lng: city.lng, locale: locale ?? "en" })} />
      <JsonLd data={buildBreadcrumbSchema(locale ?? "en", [{ name: "Home", path: "" }, { name: "Services", path: "/services" }], cityName)} />

      <Breadcrumbs
        items={[
          { label: t("nav.services", "SERVICES"), href: `/${locale ?? "en"}/services` },
          { label: t(city.nameKey) },
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
              <span className="text-3xl">{city.flag}</span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-neo-lime border-2 border-neo-black bg-neo-black px-3 py-1">
                <MapPin size={12} className="inline -mt-0.5 mr-1" />
                {t(city.nameKey)}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-space font-bold text-4xl lg:text-6xl text-neo-black mb-6 leading-tight"
            >
              {t(city.titleKey)}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-mono text-sm lg:text-base text-neo-black/70 leading-relaxed max-w-2xl mb-8"
            >
              {t(city.introKey)}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <NeoButton href={`/${locale ?? "en"}/contact`} color="neo-lime">
                {t(city.ctaKey, "Get a Free Quote")}
                <ArrowRight size={16} />
              </NeoButton>
              <NeoButton href={`/${locale ?? "en"}/portfolio`} color="neo-yellow">
                {t("cityPages.viewWork", "View Our Work")}
                <Globe size={16} />
              </NeoButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-neo-bg border-y-2 border-neo-black">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("cityPages.whyChoose", "Why Choose DMC Kreatif")}
            subtitle={t("cityPages.benefits", "BENEFITS")}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {city.benefitsKeys.map((key, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="border-2 border-neo-black bg-neo-white shadow-hard p-6"
              >
                <CheckCircle2 size={20} className="text-neo-lime mb-3" />
                <p className="font-mono text-sm text-neo-black leading-relaxed">
                  {t(key)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services in City */}
      <section className="py-16">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("cityPages.servicesTitle", "Our Services")}
            subtitle={t("cityPages.servicesIn", "WHAT WE OFFER")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="border-2 border-neo-black bg-neo-white shadow-hard p-8 flex items-start gap-4 group"
              >
                <span className="text-2xl flex-shrink-0">{service.icon}</span>
                <div className="flex-1">
                  <h3 className="font-space font-bold text-lg text-neo-black mb-2">
                    {t(`${service.key}.title`)}
                  </h3>
                  <p className="font-mono text-xs text-neo-black/70 leading-relaxed mb-4">
                    {t(`${service.key}.desc`)}
                  </p>
                  <Link
                    to={`/${locale ?? "en"}/web-agency-${city.slug}/${service.slug}`}
                    className="font-mono text-xs font-bold text-neo-lime border-b-2 border-neo-black/10 hover:border-neo-lime transition-colors inline-flex items-center gap-1"
                  >
                    Learn more <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-neo-lime/10 border-y-2 border-neo-black">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-space font-bold text-3xl lg:text-4xl text-neo-black mb-4">
            {t("cityPages.ctaTitle", "Ready to Start Your Project?")}
          </h2>
          <p className="font-mono text-sm text-neo-black/70 mb-8 max-w-xl mx-auto">
            {t("cityPages.ctaDesc", "Get a free consultation and quote within 24 hours.")}
          </p>
          <NeoButton href={`/${locale ?? "en"}/contact`} color="neo-lime" size="lg">
            {t("cityPages.ctaButton", "Contact Us Today")}
            <ArrowRight size={16} />
          </NeoButton>
        </div>
      </section>
    </>
  );
}
