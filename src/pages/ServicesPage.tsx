import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import {
  Code2,
  ShoppingCart,
  Search,
  Settings,
  Check,
  ArrowRight,
  ChevronDown,
  Zap,
  Clock,
  Rocket,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import { useAnalytics } from "@/lib/useAnalytics";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildAllServicesSchema, buildFAQPageSchema, buildBreadcrumbSchema } from "@/lib/seo-schemas";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  viewportConfig,
} from "@/lib/animations";
import { getServicesByCategory } from "@/data/services";

interface ServiceCard {
  id: string;
  icon: React.ElementType;
  color: string;
  bgAccent: string;
  borderAccent: string;
  priceKey: string;
  titleKey: string;
  descKey: string;
  features: string[];
  idealForKey?: string;
}

const services: ServiceCard[] = [
  {
    id: "webDev",
    icon: Code2,
    color: "neo-lime",
    bgAccent: "bg-neo-lime",
    borderAccent: "border-neo-lime",
    priceKey: "services.webDev.priceRange",
    titleKey: "services.webDev.title",
    descKey: "services.webDev.description",
    idealForKey: "services.webDev.idealFor",
    features: [
      "React / Next.js / Vite",
      "Responsive Design",
      "SEO Optimized",
      "95+ Lighthouse Score",
      "Contact Forms & Analytics",
      "30 Days Free Support",
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    color: "neo-yellow",
    bgAccent: "bg-neo-yellow",
    borderAccent: "border-neo-yellow",
    priceKey: "services.ecommerce.priceRange",
    titleKey: "services.ecommerce.title",
    descKey: "services.ecommerce.description",
    idealForKey: "services.ecommerce.idealFor",
    features: [
      "Payment Integration",
      "Inventory Management",
      "Multi-Currency Support",
      "Order Tracking System",
      "Product Catalog & Filters",
      "Secure Checkout Flow",
    ],
  },
  {
    id: "seo",
    icon: Search,
    color: "neo-blue",
    bgAccent: "bg-neo-blue",
    borderAccent: "border-neo-blue",
    priceKey: "services.seo.priceRange",
    titleKey: "services.seo.title",
    descKey: "services.seo.description",
    idealForKey: "services.seo.idealFor",
    features: [
      "Technical SEO Audit",
      "Keyword Research",
      "Google Analytics Setup",
      "Search Console Config",
      "Performance Monitoring",
      "Monthly Reports",
    ],
  },
  {
    id: "maintenance",
    icon: Settings,
    color: "neo-pink",
    bgAccent: "bg-neo-pink",
    borderAccent: "border-neo-pink",
    priceKey: "pricing.carePlanPrice",
    titleKey: "pricing.carePlan",
    descKey: "pricing.carePlanDescription",
    idealForKey: "services.carePlan.idealFor",
    features: [
      "Hosting & SSL",
      "Monthly Updates",
      "Security Monitoring",
      "Performance Reports",
      "Priority Support",
      "Uptime Guarantee",
    ],
  },
];

interface FaqItem {
  questionKey: string;
  answerKey: string;
}

const faqItems: FaqItem[] = [
  { questionKey: "pricing.faq1Q", answerKey: "pricing.faq1A" },
  { questionKey: "pricing.faq2Q", answerKey: "pricing.faq2A" },
  { questionKey: "pricing.faq3Q", answerKey: "pricing.faq3A" },
  { questionKey: "pricing.faq4Q", answerKey: "pricing.faq4A" },
  { questionKey: "pricing.faq5Q", answerKey: "pricing.faq5A" },
];

function ServiceDescription({ text }: { text: string }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) setClamped(el.scrollHeight > el.clientHeight + 2);
  }, [text]);

  return (
    <div className="mb-6">
      <p
        ref={ref}
        className={`font-mono text-sm text-neo-black/80 leading-relaxed ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        {text}
      </p>
      {clamped && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-2 font-mono text-xs font-bold uppercase tracking-wider text-neo-black/60 hover:text-neo-black transition-colors"
        >
          {expanded ? t("services.showLess", "Show less") : t("services.readMore", "Read more")}
        </button>
      )}
    </div>
  );
}

function FaqAccordion({ questionKey, answerKey }: FaqItem) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="border-2 border-neo-black bg-neo-white shadow-hard"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-bg-alt transition-colors"
      >
        <span>{t(questionKey)}</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0, 1] }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 border-t-2 border-neo-black pt-4">
          <p className="font-mono text-sm text-neo-black/80 leading-relaxed">
            {t(answerKey)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  useAnalytics("Services");
  const currentLocale = locale ?? "en";

  return (
    <>
      <SeoHead
        title={t("seo.services.title", "Web Development Services | DMC Kreatif")}
        description={t("seo.services.description", "Professional web development, e-commerce, SEO and maintenance services for European businesses. Starting from \u20AC497.")}
        path="/services"
      />

      <Breadcrumbs items={[{ label: t("nav.services", "SERVICES") }]} />

      {buildAllServicesSchema(currentLocale).map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <JsonLd
        data={buildFAQPageSchema(
          faqItems.map((faq) => ({
            question: t(faq.questionKey),
            answer: t(faq.answerKey),
          }))
        )}
      />
      <JsonLd
        data={buildBreadcrumbSchema(currentLocale, [{ name: "Home", path: "" }], t("nav.services", "Services"))}
      />

      {/* Hero Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("services.sectionTitle", "WHAT WE BUILD")}
            subtitle={t("services.sectionSubtitle", "SYS.SERVICES")}
          />

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex items-center gap-3 -mt-8 mb-4"
          >
            <NeoBadge color="neo-blue">
              <Code2 size={12} className="mr-1" />
              {t("services.proTeamBadge", "BUILT BY SENIOR DEVELOPERS")}
            </NeoBadge>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-mono text-base lg:text-lg text-neo-black/80 max-w-2xl leading-relaxed mb-3"
          >
            {t(
              "services.heroDescription",
              "From single-page sites to full e-commerce platforms. Every project is custom-built with modern technology and premium design standards."
            )}
          </motion.p>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-mono text-xs text-neo-black/50 max-w-2xl leading-relaxed mb-16"
          >
            {t("services.proTeamDesc", "Every project is handcrafted by our professional development team with international experience across 8+ countries.")}
          </motion.p>

          {/* Service Cards Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={scaleIn}
                  className="group bg-neo-white border-2 border-neo-black shadow-hard transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm"
                >
                  {/* Accent bar */}
                  <div className={`h-2 ${service.bgAccent}`} />

                  <div className="p-6 lg:p-8">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 ${service.bgAccent} border-2 border-neo-black flex items-center justify-center shadow-hard-sm`}
                      >
                        <Icon size={22} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="font-space font-bold text-lg lg:text-xl tracking-tight">
                          {t(service.titleKey)}
                        </h3>
                        <span className="font-mono text-xs font-bold tracking-wider text-neo-black/60">
                          {t(service.priceKey)}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <ServiceDescription text={t(service.descKey)} />

                    {/* Ideal For Badges */}
                    {service.idealForKey && (
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="font-mono text-[10px] font-bold text-neo-black/50 uppercase tracking-wider">
                          {t("services.idealFor", "IDEAL FOR:")}
                        </span>
                        {t(service.idealForKey, "").split(",").filter(Boolean).map((audience) => (
                          <span key={audience.trim()} className="font-mono text-[10px] bg-neo-bg border border-neo-black/20 px-2 py-0.5">
                            {audience.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Feature List */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 font-mono text-xs text-neo-black/80"
                        >
                          <span
                            className={`w-5 h-5 ${service.bgAccent} border border-neo-black flex items-center justify-center flex-shrink-0`}
                          >
                            <Check size={12} strokeWidth={3} />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <NeoButton
                      href="/contact"
                      variant="outline"
                      size="sm"
                      color={service.color}
                    >
                      {t("pricing.getStarted", "GET STARTED")}{" "}
                      <ArrowRight size={14} />
                    </NeoButton>

                    {/* Sub-service links for internal linking */}
                    {(() => {
                      const categoryMap: Record<string, string> = {
                        webDev: "web-development",
                        ecommerce: "ecommerce",
                        seo: "seo",
                        maintenance: "seo",
                      };
                      const cat = categoryMap[service.id];
                      if (!cat) return null;
                      const subs = getServicesByCategory(cat).filter(
                        (s) => s.slug !== cat && s.slug !== "marketing"
                      );
                      if (subs.length === 0) return null;
                      return (
                        <div className="mt-5 pt-4 border-t border-neo-black/10">
                          <span className="font-mono text-[10px] font-bold text-neo-black/40 uppercase tracking-wider block mb-2">
                            {t("services.specializedIn", "Specialized services")}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {subs.slice(0, 6).map((sub) => (
                              <Link
                                key={sub.slug}
                                to={`/${currentLocale}/services/${sub.slug}`}
                                className="font-mono text-[10px] bg-neo-bg border border-neo-black/15 px-2 py-1 hover:border-neo-black/40 hover:bg-neo-yellow/20 transition-colors"
                              >
                                {t(sub.titleKey)}
                              </Link>
                            ))}
                            {subs.length > 6 && (
                              <Link
                                to={`/${currentLocale}/services/${subs[0].slug}`}
                                className="font-mono text-[10px] text-neo-black/50 px-1 py-1 hover:text-neo-black transition-colors"
                              >
                                +{subs.length - 6} more
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("services.processTitle", "HOW WE WORK")}
            subtitle={t("services.processSubtitle", "SYS.PROCESS")}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                step: "01",
                title: t("services.step1Title", "DISCOVERY"),
                desc: t(
                  "services.step1Desc",
                  "We learn about your business, goals, and target audience."
                ),
                color: "bg-neo-lime",
              },
              {
                step: "02",
                title: t("services.step2Title", "DESIGN"),
                desc: t(
                  "services.step2Desc",
                  "Custom design tailored to your brand and industry."
                ),
                color: "bg-neo-yellow",
              },
              {
                step: "03",
                title: t("services.step3Title", "DEVELOP"),
                desc: t(
                  "services.step3Desc",
                  "Clean code, fast performance, and modern technology."
                ),
                color: "bg-neo-blue",
              },
              {
                step: "04",
                title: t("services.step4Title", "DELIVER"),
                desc: t(
                  "services.step4Desc",
                  "Testing, deployment, and ongoing support."
                ),
                color: "bg-neo-pink",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                className="bg-neo-white border-2 border-neo-black shadow-hard p-6"
              >
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 ${item.color} border-2 border-neo-black shadow-hard-sm font-space font-bold text-sm mb-4`}
                >
                  {item.step}
                </div>
                <h4 className="font-space font-bold text-base mb-2">
                  {item.title}
                </h4>
                <p className="font-mono text-xs text-neo-black/70 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Template Alternative Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.div
              variants={fadeInUp}
              className="bg-neo-white border-2 border-neo-lime shadow-hard relative"
            >
              {/* Lime accent bar */}
              <div className="h-2 bg-neo-lime" />

              <div className="absolute -top-3 right-4">
                <NeoBadge color="neo-lime">
                  <Rocket size={12} className="mr-1" />
                  {t("services.templateAlt.subtitle", "SYS.QUICK_START")}
                </NeoBadge>
              </div>

              <div className="p-6 lg:p-10">
                <h3 className="font-space font-bold text-xl lg:text-2xl tracking-tight mb-2">
                  {t("services.templateAlt.title", "NEED SOMETHING FASTER?")}
                </h3>
                <p className="font-mono text-sm text-neo-black/80 leading-relaxed mb-6 max-w-2xl">
                  {t(
                    "services.templateAlt.desc",
                    "Get a professional website starting from \u20AC39 \u2014 delivered in as little as 24 hours. Pre-built designs customized with your brand."
                  )}
                </p>

                {/* Mini Tier Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {[
                    {
                      icon: Zap,
                      label: t("services.templateAlt.starterLabel", "STARTER"),
                      price: t("services.templateAlt.starterPrice", "\u20AC39"),
                      pages: t("services.templateAlt.starterPages", "1 page"),
                      color: "bg-neo-lime",
                    },
                    {
                      icon: Clock,
                      label: t("services.templateAlt.businessLabel", "BUSINESS"),
                      price: t("services.templateAlt.businessPrice", "\u20AC99"),
                      pages: t("services.templateAlt.businessPages", "3 pages"),
                      color: "bg-neo-yellow",
                    },
                    {
                      icon: Rocket,
                      label: t("services.templateAlt.premiumLabel", "PREMIUM"),
                      price: t("services.templateAlt.premiumPrice", "\u20AC179"),
                      pages: t("services.templateAlt.premiumPages", "5+ pages"),
                      color: "bg-neo-blue",
                    },
                  ].map((tier) => (
                    <div
                      key={tier.label}
                      className="flex items-center gap-3 border-2 border-neo-black bg-neo-bg p-3 shadow-hard-sm"
                    >
                      <div
                        className={`w-8 h-8 ${tier.color} border border-neo-black flex items-center justify-center flex-shrink-0`}
                      >
                        <tier.icon size={14} strokeWidth={2.5} />
                      </div>
                      <div>
                        <span className="block font-space font-bold text-xs tracking-wider">
                          {tier.label}
                        </span>
                        <span className="font-mono text-xs text-neo-black/70">
                          {tier.price} &middot; {tier.pages}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <NeoButton href="/templates" size="md" color="neo-lime">
                  {t("services.templateAlt.cta", "BROWSE TEMPLATES")}{" "}
                  <ArrowRight size={16} />
                </NeoButton>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("pricing.faqTitle", "FAQ")}
            subtitle="SYS.FAQ"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="max-w-3xl space-y-4"
          >
            {faqItems.map((faq) => (
              <FaqAccordion
                key={faq.questionKey}
                questionKey={faq.questionKey}
                answerKey={faq.answerKey}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 lg:py-20 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.div variants={fadeInUp}>
              <Link
                to={`/${currentLocale}/portfolio`}
                className="inline-flex items-center gap-2 border-2 border-neo-black bg-neo-white shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-yellow transition-colors"
              >
                {t("services.seeWork", "See Our Work")} <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link
                to={`/${currentLocale}/pricing`}
                className="inline-flex items-center gap-2 border-2 border-neo-black bg-neo-white shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-lime transition-colors"
              >
                {t("services.viewPricing", "View Pricing")} <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link
                to={`/${currentLocale}/blog`}
                className="inline-flex items-center gap-2 border-2 border-neo-black bg-neo-white shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-blue transition-colors"
              >
                {t("services.readBlog", "Read Our Blog")} <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link
                to={`/${currentLocale}/technologies`}
                className="inline-flex items-center gap-2 border-2 border-neo-black bg-neo-white shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-pink transition-colors"
              >
                {t("services.ourTech", "Our Technology Stack")} <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link
                to={`/${currentLocale}/industries`}
                className="inline-flex items-center gap-2 border-2 border-neo-black bg-neo-white shadow-hard px-6 py-3 font-space font-bold text-sm uppercase tracking-wider hover:bg-neo-yellow transition-colors"
              >
                {t("services.industries", "Industries We Serve")} <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-space font-bold text-h2 mb-4"
            >
              {t("cta.title", "READY TO BUILD SOMETHING?")}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-mono text-base text-neo-black/80 mb-8 max-w-lg mx-auto"
            >
              {t(
                "cta.subtitle",
                "Let's create a website that works as hard as you do."
              )}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <NeoButton href="/contact" size="lg" color="neo-lime">
                {t("cta.button", "START YOUR PROJECT")}{" "}
                <ArrowRight size={18} />
              </NeoButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
