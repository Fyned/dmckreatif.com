import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import JsonLd from "@/components/seo/JsonLd";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

interface CityData {
  slug: string;
  nameKey: string;
  country: string;
  flag: string;
  titleKey: string;
  descriptionKey: string;
  introKey: string;
  benefitsKeys: string[];
  ctaKey: string;
  mapQuery: string;
  lat: string;
  lng: string;
}

const cityData: Record<string, CityData> = {
  paris: {
    slug: "paris",
    nameKey: "cityPages.paris.name",
    country: "FR",
    flag: "\u{1F1EB}\u{1F1F7}",
    titleKey: "cityPages.paris.title",
    descriptionKey: "cityPages.paris.description",
    introKey: "cityPages.paris.intro",
    benefitsKeys: [
      "cityPages.paris.benefit1",
      "cityPages.paris.benefit2",
      "cityPages.paris.benefit3",
      "cityPages.paris.benefit4",
      "cityPages.paris.benefit5",
      "cityPages.paris.benefit6",
    ],
    ctaKey: "cityPages.paris.cta",
    mapQuery: "Paris,France",
    lat: "48.8566",
    lng: "2.3522",
  },
  london: {
    slug: "london",
    nameKey: "cityPages.london.name",
    country: "GB",
    flag: "\u{1F1EC}\u{1F1E7}",
    titleKey: "cityPages.london.title",
    descriptionKey: "cityPages.london.description",
    introKey: "cityPages.london.intro",
    benefitsKeys: [
      "cityPages.london.benefit1",
      "cityPages.london.benefit2",
      "cityPages.london.benefit3",
      "cityPages.london.benefit4",
      "cityPages.london.benefit5",
      "cityPages.london.benefit6",
    ],
    ctaKey: "cityPages.london.cta",
    mapQuery: "London,UK",
    lat: "51.5074",
    lng: "-0.1278",
  },
  brussels: {
    slug: "brussels",
    nameKey: "cityPages.brussels.name",
    country: "BE",
    flag: "\u{1F1E7}\u{1F1EA}",
    titleKey: "cityPages.brussels.title",
    descriptionKey: "cityPages.brussels.description",
    introKey: "cityPages.brussels.intro",
    benefitsKeys: [
      "cityPages.brussels.benefit1",
      "cityPages.brussels.benefit2",
      "cityPages.brussels.benefit3",
      "cityPages.brussels.benefit4",
      "cityPages.brussels.benefit5",
      "cityPages.brussels.benefit6",
    ],
    ctaKey: "cityPages.brussels.cta",
    mapQuery: "Brussels,Belgium",
    lat: "50.8503",
    lng: "4.3517",
  },
  amsterdam: {
    slug: "amsterdam",
    nameKey: "cityPages.amsterdam.name",
    country: "NL",
    flag: "\u{1F1F3}\u{1F1F1}",
    titleKey: "cityPages.amsterdam.title",
    descriptionKey: "cityPages.amsterdam.description",
    introKey: "cityPages.amsterdam.intro",
    benefitsKeys: [
      "cityPages.amsterdam.benefit1",
      "cityPages.amsterdam.benefit2",
      "cityPages.amsterdam.benefit3",
      "cityPages.amsterdam.benefit4",
      "cityPages.amsterdam.benefit5",
      "cityPages.amsterdam.benefit6",
    ],
    ctaKey: "cityPages.amsterdam.cta",
    mapQuery: "Amsterdam,Netherlands",
    lat: "52.3676",
    lng: "4.9041",
  },
  berlin: {
    slug: "berlin",
    nameKey: "cityPages.berlin.name",
    country: "DE",
    flag: "\u{1F1E9}\u{1F1EA}",
    titleKey: "cityPages.berlin.title",
    descriptionKey: "cityPages.berlin.description",
    introKey: "cityPages.berlin.intro",
    benefitsKeys: [
      "cityPages.berlin.benefit1",
      "cityPages.berlin.benefit2",
      "cityPages.berlin.benefit3",
      "cityPages.berlin.benefit4",
      "cityPages.berlin.benefit5",
      "cityPages.berlin.benefit6",
    ],
    ctaKey: "cityPages.berlin.cta",
    mapQuery: "Berlin,Germany",
    lat: "52.5200",
    lng: "13.4050",
  },
};

function buildCitySchema(city: CityData) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "DMC Kreatif",
    url: "https://dmckreatif.com",
    email: "hello@dmckreatif.com",
    priceRange: "\u20AC\u20AC",
    areaServed: {
      "@type": "City",
      name: city.slug.charAt(0).toUpperCase() + city.slug.slice(1),
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.lat,
      longitude: city.lng,
    },
    knowsAbout: [
      "Web Development",
      "E-Commerce Development",
      "SEO Optimization",
    ],
  };
}

export default function CityServicePage() {
  const { t } = useTranslation();
  const { locale, city: citySlug } = useParams();
  const city = citySlug ? cityData[citySlug] : null;

  if (!city) {
    return (
      <div className="py-32 text-center">
        <p className="font-mono text-neo-black/50">City not found.</p>
      </div>
    );
  }

  const services = [
    { key: "cityPages.serviceWeb", icon: "\u{1F4BB}" },
    { key: "cityPages.serviceEcom", icon: "\u{1F6D2}" },
    { key: "cityPages.serviceSeo", icon: "\u{1F50D}" },
    { key: "cityPages.serviceMarketing", icon: "\u{1F4E3}" },
  ];

  return (
    <>
      <SeoHead
        title={t(city.titleKey)}
        description={t(city.descriptionKey)}
        path={`/web-agency-${city.slug}`}
      />
      <JsonLd data={buildCitySchema(city)} />

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
                className="border-2 border-neo-black bg-neo-white shadow-hard p-8 flex items-start gap-4"
              >
                <span className="text-2xl flex-shrink-0">{service.icon}</span>
                <div>
                  <h3 className="font-space font-bold text-lg text-neo-black mb-2">
                    {t(`${service.key}.title`)}
                  </h3>
                  <p className="font-mono text-xs text-neo-black/70 leading-relaxed">
                    {t(`${service.key}.desc`)}
                  </p>
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
