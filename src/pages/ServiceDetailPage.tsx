import { useTranslation } from "react-i18next";
import { useParams, Link, Navigate } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  ShoppingCart,
  Search,
  Settings,
  Check,
  Gauge,
  Clock,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildServiceSchema } from "@/lib/seo-schemas";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  viewportConfig,
} from "@/lib/animations";

interface ServiceDetail {
  slug: string;
  icon: React.ElementType;
  color: string;
  bgAccent: string;
  priceFrom: string;
  titleKey: string;
  descKey: string;
  longDescKey: string;
  features: string[];
  processSteps: string[];
  faqKeys: string[];
  relatedSlugs: string[];
}

const serviceDetails: ServiceDetail[] = [
  {
    slug: "web-development",
    icon: Code2,
    color: "neo-lime",
    bgAccent: "bg-neo-lime",
    priceFrom: "497",
    titleKey: "serviceDetail.webDev.title",
    descKey: "serviceDetail.webDev.desc",
    longDescKey: "serviceDetail.webDev.longDesc",
    features: [
      "serviceDetail.webDev.f1",
      "serviceDetail.webDev.f2",
      "serviceDetail.webDev.f3",
      "serviceDetail.webDev.f4",
      "serviceDetail.webDev.f5",
      "serviceDetail.webDev.f6",
      "serviceDetail.webDev.f7",
      "serviceDetail.webDev.f8",
    ],
    processSteps: [
      "serviceDetail.webDev.step1",
      "serviceDetail.webDev.step2",
      "serviceDetail.webDev.step3",
      "serviceDetail.webDev.step4",
    ],
    faqKeys: ["webDev1", "webDev2", "webDev3", "webDev4"],
    relatedSlugs: ["ecommerce", "seo"],
  },
  {
    slug: "ecommerce",
    icon: ShoppingCart,
    color: "neo-yellow",
    bgAccent: "bg-neo-yellow",
    priceFrom: "2997",
    titleKey: "serviceDetail.ecommerce.title",
    descKey: "serviceDetail.ecommerce.desc",
    longDescKey: "serviceDetail.ecommerce.longDesc",
    features: [
      "serviceDetail.ecommerce.f1",
      "serviceDetail.ecommerce.f2",
      "serviceDetail.ecommerce.f3",
      "serviceDetail.ecommerce.f4",
      "serviceDetail.ecommerce.f5",
      "serviceDetail.ecommerce.f6",
      "serviceDetail.ecommerce.f7",
      "serviceDetail.ecommerce.f8",
    ],
    processSteps: [
      "serviceDetail.ecommerce.step1",
      "serviceDetail.ecommerce.step2",
      "serviceDetail.ecommerce.step3",
      "serviceDetail.ecommerce.step4",
    ],
    faqKeys: ["ecommerce1", "ecommerce2", "ecommerce3", "ecommerce4"],
    relatedSlugs: ["web-development", "seo"],
  },
  {
    slug: "seo",
    icon: Search,
    color: "neo-blue",
    bgAccent: "bg-neo-blue",
    priceFrom: "297",
    titleKey: "serviceDetail.seo.title",
    descKey: "serviceDetail.seo.desc",
    longDescKey: "serviceDetail.seo.longDesc",
    features: [
      "serviceDetail.seo.f1",
      "serviceDetail.seo.f2",
      "serviceDetail.seo.f3",
      "serviceDetail.seo.f4",
      "serviceDetail.seo.f5",
      "serviceDetail.seo.f6",
      "serviceDetail.seo.f7",
      "serviceDetail.seo.f8",
    ],
    processSteps: [
      "serviceDetail.seo.step1",
      "serviceDetail.seo.step2",
      "serviceDetail.seo.step3",
      "serviceDetail.seo.step4",
    ],
    faqKeys: ["seo1", "seo2", "seo3", "seo4"],
    relatedSlugs: ["web-development", "digital-marketing"],
  },
  {
    slug: "digital-marketing",
    icon: Settings,
    color: "neo-pink",
    bgAccent: "bg-neo-pink",
    priceFrom: "247",
    titleKey: "serviceDetail.marketing.title",
    descKey: "serviceDetail.marketing.desc",
    longDescKey: "serviceDetail.marketing.longDesc",
    features: [
      "serviceDetail.marketing.f1",
      "serviceDetail.marketing.f2",
      "serviceDetail.marketing.f3",
      "serviceDetail.marketing.f4",
      "serviceDetail.marketing.f5",
      "serviceDetail.marketing.f6",
      "serviceDetail.marketing.f7",
      "serviceDetail.marketing.f8",
    ],
    processSteps: [
      "serviceDetail.marketing.step1",
      "serviceDetail.marketing.step2",
      "serviceDetail.marketing.step3",
      "serviceDetail.marketing.step4",
    ],
    faqKeys: ["marketing1", "marketing2", "marketing3", "marketing4"],
    relatedSlugs: ["seo", "ecommerce"],
  },
];

function FaqAccordionItem({ qKey, aKey }: { qKey: string; aKey: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 border-neo-black bg-neo-white shadow-hard">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-space font-bold text-sm pr-4">{t(qKey)}</span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="font-mono text-xs text-neo-black/70 leading-relaxed">
            {t(aKey)}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ServiceDetailPage() {
  const { t } = useTranslation();
  const { locale, slug } = useParams();
  const currentLocale = locale ?? "en";

  const service = serviceDetails.find((s) => s.slug === slug);
  if (!service) {
    return <Navigate to={`/${currentLocale}/services`} replace />;
  }

  const Icon = service.icon;

  return (
    <>
      <SeoHead
        title={t(`seo.serviceDetail.${service.slug}.title`, t(service.titleKey))}
        description={t(`seo.serviceDetail.${service.slug}.description`, t(service.descKey))}
        path={`/services/${service.slug}`}
      />

      <Breadcrumbs
        items={[
          { label: t("nav.services", "SERVICES"), href: `/${currentLocale}/services` },
          { label: t(service.titleKey) },
        ]}
      />

      <JsonLd
        data={buildServiceSchema({
          name: t(service.titleKey),
          description: t(service.descKey),
          price: service.priceFrom,
          locale: currentLocale,
        })}
      />

      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 ${service.bgAccent} border-2 border-neo-black shadow-hard flex items-center justify-center`}>
                <Icon size={28} strokeWidth={2.5} />
              </div>
              <div>
                <span className="block font-mono text-xs font-bold tracking-[0.2em] text-neo-black/50">
                  {t("serviceDetail.fromLabel", "FROM")} €{service.priceFrom}
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-space font-bold text-h1 leading-[0.95] tracking-tight mb-6"
            >
              {t(service.titleKey)}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-mono text-base lg:text-lg text-neo-black/80 max-w-3xl leading-relaxed mb-8"
            >
              {t(service.descKey)}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <NeoButton href="/contact" size="lg" color="neo-lime">
                {t("serviceDetail.getQuote", "GET A QUOTE")} <ArrowRight size={18} />
              </NeoButton>
              <Link
                to={`/${currentLocale}/portfolio`}
                className="inline-flex items-center gap-2 border-2 border-neo-black bg-neo-white shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-lime transition-colors"
              >
                {t("serviceDetail.seeWork", "SEE OUR WORK")} <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Long Description */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.div variants={fadeInUp}>
              <SectionHeader
                title={t("serviceDetail.overviewTitle", "OVERVIEW")}
                subtitle={t("serviceDetail.overviewSubtitle", "SYS.DETAIL")}
              />
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="font-mono text-sm text-neo-black/80 leading-relaxed max-w-4xl space-y-4"
            >
              {t(service.longDescKey)
                .split("\n\n")
                .map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("serviceDetail.featuresTitle", "WHAT'S INCLUDED")}
            subtitle={t("serviceDetail.featuresSubtitle", "SYS.FEATURES")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {service.features.map((featureKey) => (
              <motion.div
                key={featureKey}
                variants={scaleIn}
                className="bg-neo-white border-2 border-neo-black shadow-hard p-5 flex items-start gap-3"
              >
                <div className={`w-6 h-6 ${service.bgAccent} border-2 border-neo-black flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="font-mono text-xs text-neo-black/80 leading-relaxed">
                  {t(featureKey)}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("serviceDetail.processTitle", "HOW IT WORKS")}
            subtitle={t("serviceDetail.processSubtitle", "SYS.PROCESS")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {service.processSteps.map((stepKey, idx) => (
              <motion.div
                key={stepKey}
                variants={scaleIn}
                className="bg-neo-white border-2 border-neo-black shadow-hard p-6 relative"
              >
                <span className="font-space font-bold text-4xl text-neo-black/10 absolute top-3 right-4">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className={`w-10 h-10 ${service.bgAccent} border-2 border-neo-black flex items-center justify-center mb-4`}>
                  <span className="font-space font-bold text-sm">{idx + 1}</span>
                </div>
                <p className="font-mono text-xs text-neo-black/80 leading-relaxed">
                  {t(stepKey)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 lg:py-24">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-wrap border-2 border-neo-black bg-neo-white shadow-hard"
          >
            {[
              { icon: Gauge, value: "95+", label: "LIGHTHOUSE" },
              { icon: Clock, value: "<2s", label: "LOAD TIME" },
              { icon: TrendingUp, value: "+40%", label: "AVG TRAFFIC" },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                variants={scaleIn}
                className={`flex-1 min-w-[120px] p-6 text-center flex flex-col items-center gap-2 ${
                  i < 2 ? "border-r-2 border-neo-black" : ""
                }`}
              >
                <metric.icon size={20} className="text-neo-black/40" />
                <div className="font-space font-bold text-2xl lg:text-3xl">
                  {metric.value}
                </div>
                <div className="font-mono text-xs font-bold text-neo-black/60 uppercase tracking-wider">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("serviceDetail.faqTitle", "FREQUENTLY ASKED")}
            subtitle={t("serviceDetail.faqSubtitle", "SYS.FAQ")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-3 max-w-3xl"
          >
            {service.faqKeys.map((key) => (
              <motion.div key={key} variants={fadeInUp}>
                <FaqAccordionItem
                  qKey={`serviceDetail.faq.${key}Q`}
                  aKey={`serviceDetail.faq.${key}A`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 lg:py-24">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("serviceDetail.relatedTitle", "RELATED SERVICES")}
            subtitle={t("serviceDetail.relatedSubtitle", "SYS.MORE")}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {service.relatedSlugs.map((relSlug) => {
              const rel = serviceDetails.find((s) => s.slug === relSlug);
              if (!rel) return null;
              const RelIcon = rel.icon;
              return (
                <motion.div key={relSlug} variants={scaleIn}>
                  <Link
                    to={`/${currentLocale}/services/${relSlug}`}
                    className="block bg-neo-white border-2 border-neo-black shadow-hard p-6 transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm group"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`w-10 h-10 ${rel.bgAccent} border-2 border-neo-black flex items-center justify-center`}>
                        <RelIcon size={18} strokeWidth={2.5} />
                      </div>
                      <h3 className="font-space font-bold text-sm uppercase tracking-wider">
                        {t(rel.titleKey)}
                      </h3>
                      <ArrowRight
                        size={14}
                        className="ml-auto group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                    <p className="font-mono text-xs text-neo-black/70 leading-relaxed">
                      {t(rel.descKey)}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
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
