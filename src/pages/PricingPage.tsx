import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  TrendingUp,
  Rocket,
  Store,
  Shield,
  ChevronDown,
  Layout,
  CheckCircle2,
  XCircle,
  CreditCard,
  Clock,
  Headphones,
  CalendarCheck,
  Users,
  Code2,
  Pen,
  Search,
  Megaphone,
  Share2,
  Video,
  Globe,
  FileSearch,
  Target,
  Link2,
  MapPin,
  FileBarChart,
} from "lucide-react";
import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PromoBanner from "@/components/ui/PromoBanner";
import JsonLd from "@/components/seo/JsonLd";
import { buildOfferSchema, buildFAQPageSchema, buildBreadcrumbSchema } from "@/lib/seo-schemas";
import { pricingTiers, addOns, carePlanTiers, seoPlans } from "@/lib/pricing-data";
import { templateTiers } from "@/lib/template-data";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  viewportConfig,
} from "@/lib/animations";
import { useAnalytics } from "@/lib/useAnalytics";

const tierIcons: Record<string, React.ElementType> = {
  launch: Zap,
  growth: TrendingUp,
  scale: Rocket,
  commerce: Store,
};

const bgAccentMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime",
  "neo-yellow": "bg-neo-yellow",
  "neo-blue": "bg-neo-blue",
  "neo-purple": "bg-neo-purple",
  "neo-pink": "bg-neo-pink",
};

const carePlanIcons: Record<string, React.ElementType> = {
  basic: Shield,
  pro: Rocket,
  enterprise: Users,
};

const addOnIcons: Record<string, React.ElementType> = {
  logoDesign: Pen,
  seoAudit: Search,
  googleAds: Megaphone,
  socialKit: Share2,
  videoProduction: Video,
};

interface FaqItemProps {
  questionKey: string;
  answerKey: string;
}

const faqItems: FaqItemProps[] = [
  { questionKey: "pricing.faq1Q", answerKey: "pricing.faq1A" },
  { questionKey: "pricing.faq2Q", answerKey: "pricing.faq2A" },
  { questionKey: "pricing.faq3Q", answerKey: "pricing.faq3A" },
  { questionKey: "pricing.faq4Q", answerKey: "pricing.faq4A" },
  { questionKey: "pricing.faq5Q", answerKey: "pricing.faq5A" },
  { questionKey: "pricing.faq6Q", answerKey: "pricing.faq6A" },
  { questionKey: "pricing.faq7Q", answerKey: "pricing.faq7A" },
  { questionKey: "pricing.faq8Q", answerKey: "pricing.faq8A" },
];

function FaqAccordion({ questionKey, answerKey }: FaqItemProps) {
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

export default function PricingPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  useAnalytics("Pricing");
  const currentLocale = locale ?? "en";

  return (
    <>
      <SeoHead
        title={t("seo.pricing.title", "Web Development Pricing | DMC Kreatif")}
        description={t("seo.pricing.description", "Transparent web development pricing. Starter \u20AC349, Growth \u20AC749, Scale \u20AC1,497, Commerce \u20AC2,497.")}
        path="/pricing"
      />

      <JsonLd
        data={buildOfferSchema([
          {
            name: "Starter Package",
            description: "Custom landing page with responsive design and SEO",
            price: 349,
            deliveryDays: "5-7",
          },
          {
            name: "Growth Package",
            description: "5-7 page website with blog, advanced SEO, and analytics",
            price: 749,
            deliveryDays: "10-14",
          },
          {
            name: "Scale Package",
            description: "Full multilingual website with video and ads setup",
            price: 1497,
            deliveryDays: "14-21",
          },
          {
            name: "Commerce Package",
            description: "Complete e-commerce with payment, inventory, multilingual",
            price: 2497,
            deliveryDays: "21-30",
          },
        ])}
      />

      <JsonLd
        data={buildFAQPageSchema(
          faqItems.map((faq) => ({
            question: t(faq.questionKey),
            answer: t(faq.answerKey),
          }))
        )}
      />
      <JsonLd
        data={buildBreadcrumbSchema(currentLocale, [{ name: "Home", path: "" }], t("nav.pricing", "Pricing"))}
      />

      <Breadcrumbs items={[{ label: t("nav.pricing", "PRICING") }]} />

      {/* ═══ ZONE A: CUSTOM DEVELOPMENT (PRIMARY) ═══ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("pricing.sectionTitle", "INVESTMENT")}
            subtitle={t("pricing.sectionSubtitle", "SYS.PRICING")}
          />

          {/* Section badge + description */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 -mt-8 mb-6"
          >
            <NeoBadge color="neo-blue">
              <Code2 size={12} className="mr-1" />
              {t("pricing.customSectionBadge", "PROFESSIONAL DEVELOPER TEAM")}
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
              "pricing.customSectionDesc",
              "100% custom-built websites by our professional development team. Everything exactly as you want it."
            )}
          </motion.p>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-mono text-xs text-neo-black/50 max-w-2xl leading-relaxed mb-10"
          >
            {t("pricing.proTeamNote", "Every project is reviewed and built by senior developers with 10+ years of experience")}
            {" \u2022 "}
            {t("pricing.revisionsIncluded", "2 revision rounds included in every package")}
          </motion.p>

          {/* Promo Banner */}
          <div className="mb-12">
            <PromoBanner variant="full" />
          </div>

          {/* Custom Dev Tier Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {pricingTiers.map((tier) => {
              const Icon = tierIcons[tier.id] ?? Zap;
              const bgAccent = bgAccentMap[tier.color] ?? "bg-neo-lime";
              const featuresString = t(`pricing.${tier.featuresKey}`, "");
              const features = featuresString
                .split("//")
                .map((f: string) => f.trim())
                .filter(Boolean);

              return (
                <motion.div
                  key={tier.id}
                  variants={scaleIn}
                  className={`relative bg-neo-white border-2 border-neo-black shadow-hard transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm ${
                    tier.popular ? "ring-4 ring-neo-lime" : ""
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <NeoBadge color="neo-lime">
                        {t("pricing.popular", "MOST POPULAR")}
                      </NeoBadge>
                    </div>
                  )}

                  <div className={`h-2 ${bgAccent}`} />

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 ${bgAccent} border-2 border-neo-black flex items-center justify-center shadow-hard-sm`}
                      >
                        <Icon size={18} strokeWidth={2.5} />
                      </div>
                      <h3 className="font-space font-bold text-base tracking-wider">
                        {t(`pricing.${tier.nameKey}`)}
                      </h3>
                    </div>

                    <div className="mb-1">
                      <span className="font-mono text-xs text-neo-black/60 uppercase tracking-wider">
                        {t("pricing.startingAt", "STARTING AT")}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="font-mono text-sm text-neo-black/40 line-through mr-2">
                        {"\u20AC"}{tier.originalPrice.toLocaleString()}
                      </span>
                      <span className="font-space font-bold text-3xl lg:text-4xl text-neo-black">
                        {"\u20AC"}{tier.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className="inline-block bg-neo-red text-neo-white font-mono text-[10px] font-bold px-2 py-0.5 border border-neo-black">
                        {t("promo.save", "SAVE")} {"\u20AC"}{(tier.originalPrice - tier.price).toLocaleString()}
                      </span>
                      <span className="inline-block bg-neo-green/20 text-neo-black font-mono text-[10px] font-bold px-2 py-0.5 border border-neo-green">
                        {t("pricing.oneTimePrice", "ONE-TIME PAYMENT")}
                      </span>
                    </div>

                    <div className="mb-4 font-mono text-xs text-neo-black/60">
                      <span className="font-bold uppercase tracking-wider">
                        {t("pricing.delivery", "DELIVERY")}:
                      </span>{" "}
                      {t(`pricing.${tier.deliveryKey}`)}
                    </div>

                    {/* Ideal For */}
                    <div className="mb-4 p-2 bg-neo-bg border border-neo-black/10">
                      <span className="font-mono text-xs text-neo-black/70">
                        {t(`pricing.${tier.id}IdealFor`, "")}
                      </span>
                    </div>

                    {/* Scale Promo — Business Cards + Value */}
                    {tier.id === "scale" && (
                      <>
                        <div className="mb-2 p-3 bg-neo-lime/20 border-2 border-neo-lime">
                          <p className="font-mono text-xs font-bold text-neo-black leading-relaxed">
                            {t("pricing.scalePromo", "\ud83c\udf81 FREE BONUS: 1000 premium business cards delivered to your address!")}
                          </p>
                        </div>
                        <div className="mb-4 p-2 bg-neo-black/5 border border-neo-black/10">
                          <p className="font-mono text-[10px] text-neo-black/60 leading-relaxed">
                            {t("pricing.scaleValueNote", "\ud83d\udcb0 Buying these features as add-ons would cost \u20ac1,746+ \u2014 you save \u20ac249+")}
                          </p>
                        </div>
                      </>
                    )}

                    {/* Growth Upgrade Hint */}
                    {tier.id === "growth" && (
                      <div className="mb-4 p-2 bg-neo-blue/10 border border-neo-blue/30">
                        <p className="font-mono text-[10px] text-neo-blue leading-relaxed">
                          {t("pricing.growthUpgradeHint", "Upgrade to Scale anytime for \u20ac949 \u2014 includes 1000 free business cards!")}
                        </p>
                      </div>
                    )}

                    <div className="w-full h-0.5 bg-neo-black/10 mb-4" />

                    <ul className="space-y-2 mb-6">
                      {features.map((feature: string) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 font-mono text-xs text-neo-black/80"
                        >
                          <span
                            className={`w-4 h-4 ${bgAccent} border border-neo-black flex items-center justify-center flex-shrink-0 mt-0.5`}
                          >
                            <span className="text-[8px] font-bold">+</span>
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <NeoButton
                      href="/contact"
                      size="sm"
                      color={tier.color}
                      className="w-full"
                    >
                      {t("pricing.getStarted", "GET STARTED")}{" "}
                      <ArrowRight size={14} />
                    </NeoButton>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 lg:py-16">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <motion.div variants={fadeInUp} className="border-2 border-neo-black bg-neo-white shadow-hard p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-neo-green border-2 border-neo-black flex items-center justify-center flex-shrink-0 shadow-hard-sm">
                <Shield size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="font-space font-bold text-sm uppercase tracking-wider">{t("pricing.guarantee", "SATISFACTION GUARANTEE")}</h4>
                <p className="font-mono text-xs text-neo-black/60">{t("pricing.guaranteeDesc", "Free revisions until you are 100% satisfied")}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="border-2 border-neo-black bg-neo-white shadow-hard p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-neo-yellow border-2 border-neo-black flex items-center justify-center flex-shrink-0 shadow-hard-sm">
                <CreditCard size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="font-space font-bold text-sm uppercase tracking-wider">{t("pricing.payment", "SECURE PAYMENT")}</h4>
                <p className="font-mono text-xs text-neo-black/60">{t("pricing.paymentDesc", "Visa, Mastercard, bank transfer, Wise")}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="border-2 border-neo-black bg-neo-white shadow-hard p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-neo-blue border-2 border-neo-black flex items-center justify-center flex-shrink-0 shadow-hard-sm">
                <Clock size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="font-space font-bold text-sm uppercase tracking-wider">{t("pricing.response", "24H RESPONSE")}</h4>
                <p className="font-mono text-xs text-neo-black/60">{t("pricing.responseDesc", "We reply to every inquiry within 24 hours")}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("pricing.compareTitle", "COMPARE PLANS")}
            subtitle={t("pricing.compareSubtitle", "SYS.COMPARE")}
          />

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="border-4 border-neo-black bg-neo-white shadow-hard-lg overflow-x-auto"
          >
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b-4 border-neo-black">
                  <th className="p-4 font-space font-bold text-xs uppercase tracking-wider text-left">{t("pricing.feature", "FEATURE")}</th>
                  <th className="p-4 font-space font-bold text-xs uppercase tracking-wider text-center bg-neo-lime/10">{t("pricing.launch", "STARTER")}</th>
                  <th className="p-4 font-space font-bold text-xs uppercase tracking-wider text-center bg-neo-lime/30 border-x-2 border-neo-black">{t("pricing.growth", "GROWTH")}</th>
                  <th className="p-4 font-space font-bold text-xs uppercase tracking-wider text-center bg-neo-blue/10">{t("pricing.scale", "SCALE")}</th>
                  <th className="p-4 font-space font-bold text-xs uppercase tracking-wider text-center bg-neo-purple/10">{t("pricing.commerce", "COMMERCE")}</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {[
                  { key: "comparePages", vals: ["1-2", "5-7", "10+", "15+"] },
                  { key: "compareResponsive", vals: [true, true, true, true] },
                  { key: "compareSEO", vals: [false, "basic", "advanced", "advanced"] },
                  { key: "compareBlog", vals: [false, true, true, true] },
                  { key: "compareMultilingual", vals: [false, false, true, true] },
                  { key: "compareAnalytics", vals: [false, true, true, true] },
                  { key: "compareEcommerce", vals: [false, false, false, true] },
                  { key: "comparePayment", vals: [false, false, false, true] },
                  { key: "compareCMS", vals: [false, false, true, true] },
                  { key: "compareSupport", vals: ["30 days", "60 days", "90 days", "dedicated"] },
                ].map((row, idx) => (
                  <tr key={row.key} className={idx % 2 === 0 ? "bg-neo-bg" : ""}>
                    <td className="p-4 font-bold text-neo-black border-r-2 border-neo-black/10">{t(`pricing.${row.key}`)}</td>
                    {row.vals.map((val, colIdx) => (
                      <td key={colIdx} className={`p-4 text-center ${colIdx === 1 ? "border-x-2 border-neo-black/10 bg-neo-lime/5" : ""}`}>
                        {val === true ? (
                          <CheckCircle2 size={16} className="text-neo-green mx-auto" />
                        ) : val === false ? (
                          <XCircle size={16} className="text-neo-black/20 mx-auto" />
                        ) : (
                          <span className="font-bold">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ═══ ZONE B: READY-MADE TEMPLATES (SECONDARY) ═══ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("pricing.templateSectionTitle", "QUICK START TEMPLATES")}
            subtitle="SYS.TEMPLATES"
          />

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex items-center gap-3 -mt-8 mb-12"
          >
            <NeoBadge color="neo-lime">
              <Rocket size={12} className="mr-1" />
              {t("pricing.templateSectionBadge", "READY IN 24 HOURS")}
            </NeoBadge>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-mono text-base text-neo-black/80 max-w-2xl leading-relaxed mb-12"
          >
            {t("pricing.templateSectionDesc", "Pre-built professional websites customized with your brand. Fast, affordable, beautiful.")}
          </motion.p>

          {/* Template Tier Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {templateTiers.map((tier) => {
              const bgAccent = bgAccentMap[tier.color] ?? "bg-neo-lime";
              const featuresString = t(`templates.tierDescription.${tier.id}`, "");
              const features = featuresString
                .split("//")
                .map((f: string) => f.trim())
                .filter(Boolean);

              return (
                <motion.div
                  key={tier.id}
                  variants={scaleIn}
                  className="bg-neo-white border-2 border-neo-black shadow-hard transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm"
                >
                  <div className={`h-2 ${bgAccent}`} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 ${bgAccent} border-2 border-neo-black flex items-center justify-center shadow-hard-sm`}
                      >
                        <Layout size={18} strokeWidth={2.5} />
                      </div>
                      <h3 className="font-space font-bold text-base tracking-wider">
                        {t(`templates.tier.${tier.id}`, tier.id)}
                      </h3>
                    </div>

                    <div className="mb-4">
                      <span className="font-space font-bold text-3xl">
                        {"\u20AC"}{tier.price}
                      </span>
                      <span className="font-mono text-xs text-neo-black/60 ml-2">
                        {tier.pages} {t("pricing.templatePages", "pages")}
                      </span>
                    </div>

                    {/* Delivery */}
                    <div className="mb-4 flex items-center gap-2">
                      <Clock size={12} className="text-neo-black/50" />
                      <span className="font-mono text-xs text-neo-black/60">
                        {t(`templates.tierDelivery.${tier.id}`, "")}
                      </span>
                    </div>

                    {/* Ideal For */}
                    <div className="mb-4 p-2 bg-neo-bg border border-neo-black/10">
                      <span className="font-mono text-xs text-neo-black/70">
                        {t(`templates.tierIdealFor.${tier.id}`, "")}
                      </span>
                    </div>

                    <div className="w-full h-0.5 bg-neo-black/10 mb-4" />

                    <ul className="space-y-2 mb-6">
                      {features.map((feature: string) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 font-mono text-xs text-neo-black/80"
                        >
                          <span
                            className={`w-4 h-4 ${bgAccent} border border-neo-black flex items-center justify-center flex-shrink-0 mt-0.5`}
                          >
                            <span className="text-[8px] font-bold">+</span>
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={`/${currentLocale}/templates`}
                      className={`w-full inline-flex items-center justify-center gap-2 ${bgAccent} border-2 border-neo-black shadow-hard px-4 py-3 font-space font-bold text-xs uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all duration-150`}
                    >
                      {t("pricing.browseTemplates", "BROWSE TEMPLATES")} <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ ZONE C: COMPARISON ═══ */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("pricing.comparisonTitle", "WHICH OPTION IS RIGHT FOR YOU?")}
            subtitle="SYS.COMPARE"
          />

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="bg-neo-white border-4 border-neo-black shadow-hard-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Templates Side */}
              <div className="p-8 lg:p-10 border-b-4 md:border-b-0 md:border-r-4 border-neo-black">
                <NeoBadge color="neo-lime" className="mb-4">TEMPLATES</NeoBadge>
                <h3 className="font-space font-bold text-2xl mb-3">
                  {t("pricing.templateCompareTitle", "READY-MADE TEMPLATES")}
                </h3>
                <p className="font-mono text-sm text-neo-black/70 mb-4">
                  {t("pricing.templateCompareDescription", "Pre-designed websites customized with your brand.")}
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    t("pricing.templateComparePrice", "From \u20AC39"),
                    t("pricing.templateCompare1", "Delivered in 24h-5 days"),
                    t("pricing.templateCompare2", "Your logo & brand colors"),
                    t("pricing.templateCompare3", "Pre-built professional layouts"),
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 font-mono text-xs">
                      <span className="w-4 h-4 bg-neo-lime border border-neo-black flex items-center justify-center flex-shrink-0">
                        <span className="text-[8px] font-bold">+</span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <NeoButton href="/templates" size="sm" color="neo-lime">
                  {t("pricing.browseTemplates", "BROWSE TEMPLATES")} <ArrowRight size={14} />
                </NeoButton>
              </div>

              {/* Custom Side */}
              <div className="p-8 lg:p-10 bg-neo-bg-alt">
                <NeoBadge color="neo-blue" className="mb-4">CUSTOM</NeoBadge>
                <h3 className="font-space font-bold text-2xl mb-3">
                  {t("pricing.premiumCompareTitle", "CUSTOM DEVELOPMENT")}
                </h3>
                <p className="font-mono text-sm text-neo-black/70 mb-4">
                  {t("pricing.premiumCompareDescription", "100% custom website built from scratch by our professional team.")}
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    t("pricing.premiumComparePrice", "From \u20AC349"),
                    t("pricing.premiumCompare1", "5-30 day delivery"),
                    t("pricing.premiumCompare2", "Custom design from scratch"),
                    t("pricing.premiumCompare3", "Dedicated support & revisions"),
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 font-mono text-xs">
                      <span className="w-4 h-4 bg-neo-blue border border-neo-black flex items-center justify-center flex-shrink-0">
                        <span className="text-[8px] font-bold text-neo-white">+</span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <NeoButton href="/contact" size="sm" color="neo-blue">
                  {t("pricing.getStarted", "GET STARTED")} <ArrowRight size={14} />
                </NeoButton>
              </div>
            </div>
          </motion.div>

          {/* Consultation CTA */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mt-8 border-4 border-neo-lime bg-neo-lime shadow-hard-lg p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-16 h-16 bg-neo-white border-2 border-neo-black shadow-hard flex items-center justify-center flex-shrink-0">
              <CalendarCheck size={28} strokeWidth={2.5} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-space font-bold text-xl lg:text-2xl text-neo-black mb-2">
                {t("pricing.consultTitle", "NOT SURE WHICH OPTION?")}
              </h3>
              <p className="font-mono text-sm text-neo-black/80 leading-relaxed">
                {t("pricing.consultDesc", "Book a free 30-minute consultation. We will analyze your needs and recommend the best solution.")}
              </p>
            </div>
            <div className="flex-shrink-0">
              <NeoButton href="/contact" size="lg" color="neo-white">
                <Headphones size={16} />
                {t("pricing.consultButton", "BOOK FREE CALL")}
              </NeoButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ ZONE D: CARE PLANS (3-TIER) ═══ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("pricing.carePlan", "CARE PLANS")}
            subtitle={t("pricing.carePlanSubtitle", "SYS.MAINTENANCE")}
          />

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-mono text-base text-neo-black/80 max-w-2xl leading-relaxed -mt-8 mb-12"
          >
            {t("pricing.carePlanDesc", "Keep your website running smoothly with ongoing support and maintenance.")}
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {carePlanTiers.map((tier) => {
              const Icon = carePlanIcons[tier.id] ?? Shield;
              const bgAccent = bgAccentMap[tier.color] ?? "bg-neo-lime";
              const featuresString = t(`pricing.${tier.featuresKey}`, "");
              const features = featuresString
                .split("//")
                .map((f: string) => f.trim())
                .filter(Boolean);

              return (
                <motion.div
                  key={tier.id}
                  variants={scaleIn}
                  className={`relative bg-neo-white border-2 border-neo-black shadow-hard transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm ${
                    tier.popular ? "ring-4 ring-neo-lime" : ""
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <NeoBadge color="neo-lime">
                        {t("pricing.popular", "MOST POPULAR")}
                      </NeoBadge>
                    </div>
                  )}

                  <div className={`h-2 ${bgAccent}`} />

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 ${bgAccent} border-2 border-neo-black flex items-center justify-center shadow-hard-sm`}
                      >
                        <Icon size={18} strokeWidth={2.5} />
                      </div>
                      <h3 className="font-space font-bold text-base tracking-wider">
                        {t(`pricing.${tier.nameKey}`)}
                      </h3>
                    </div>

                    <div className="mb-6">
                      <span className="font-space font-bold text-3xl">
                        {"\u20AC"}{tier.price}
                      </span>
                      <span className="font-mono text-sm text-neo-black/60">/mo</span>
                    </div>

                    <div className="w-full h-0.5 bg-neo-black/10 mb-6" />

                    <ul className="space-y-2 mb-6">
                      {features.map((feature: string) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 font-mono text-xs text-neo-black/80"
                        >
                          <span
                            className={`w-4 h-4 ${bgAccent} border border-neo-black flex items-center justify-center flex-shrink-0 mt-0.5`}
                          >
                            <span className="text-[8px] font-bold">+</span>
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <NeoButton
                      href="/contact"
                      size="sm"
                      color={tier.color}
                      className="w-full"
                    >
                      {t("pricing.getStarted", "GET STARTED")}{" "}
                      <ArrowRight size={14} />
                    </NeoButton>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ ZONE E: ADD-ONS ═══ */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("pricing.addOnsTitle", "ADD-ONS")}
            subtitle={t("pricing.addOnsSubtitle", "SYS.EXTRAS")}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {addOns.map((addOn) => {
              const AddOnIcon = addOnIcons[addOn.nameKey] ?? Zap;
              return (
                <motion.div
                  key={addOn.nameKey}
                  variants={fadeInUp}
                  className="bg-neo-white border-2 border-neo-black shadow-hard p-5 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-neo-yellow border-2 border-neo-black flex items-center justify-center flex-shrink-0 shadow-hard-sm">
                      <AddOnIcon size={18} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-space font-bold text-sm uppercase tracking-wider truncate">
                          {t(`pricing.addOn.${addOn.nameKey}`, addOn.nameKey)}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-neo-black/60">
                        {t(`pricing.addOn.${addOn.descKey}`, "")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="font-mono text-sm font-bold bg-neo-lime border-2 border-neo-black px-3 py-1 shadow-hard-sm">
                      {addOn.price}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ ZONE F: SEO PACKAGES ═══ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("pricing.seoTitle", "SEO PACKAGES")}
            subtitle={t("pricing.seoSubtitle", "SYS.RANKINGS")}
          />

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="font-mono text-base lg:text-lg text-neo-black/80 max-w-2xl leading-relaxed -mt-8 mb-12"
          >
            {t(
              "pricing.seoDescription",
              "Get found on Google. Our SEO experts optimize your website for search engines with proven strategies that deliver measurable results."
            )}
          </motion.p>

          {/* SEO Plan Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {seoPlans.map((plan) => {
              const bgAccent = bgAccentMap[plan.color] ?? "bg-neo-lime";
              const featuresString = t(`pricing.seo.${plan.id === "seo-monthly" ? "monthly" : plan.id === "seo-6month" ? "6month" : "yearly"}Features`, "");
              const features = featuresString
                .split("//")
                .map((f: string) => f.trim())
                .filter(Boolean);
              const priceKey = plan.id === "seo-monthly" ? "monthly" : plan.id === "seo-6month" ? "6month" : "yearly";

              return (
                <motion.div
                  key={plan.id}
                  variants={scaleIn}
                  className={`relative bg-neo-white border-2 border-neo-black shadow-hard transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm ${
                    plan.popular ? "ring-4 ring-neo-lime" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <NeoBadge color="neo-lime">
                        {t("pricing.popular", "MOST POPULAR")}
                      </NeoBadge>
                    </div>
                  )}

                  <div className={`h-2 ${bgAccent}`} />

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 ${bgAccent} border-2 border-neo-black flex items-center justify-center shadow-hard-sm`}
                      >
                        <Globe size={18} strokeWidth={2.5} />
                      </div>
                      <h3 className="font-space font-bold text-base tracking-wider">
                        {t(`pricing.seo.${priceKey}`, plan.nameKey)}
                      </h3>
                    </div>

                    <div className="mb-2">
                      <span className="font-space font-bold text-3xl lg:text-4xl text-neo-black">
                        {"\u20AC"}{t(`pricing.seo.${priceKey}Price`, String(plan.price))}
                      </span>
                      <span className="font-mono text-sm text-neo-black/60">
                        {t(`pricing.seo.${priceKey}Period`, "")}
                      </span>
                    </div>

                    {/* Save badge for 6month and yearly */}
                    {plan.id !== "seo-monthly" && (
                      <div className="mb-4">
                        <span className="inline-block bg-neo-green/20 text-neo-black font-mono text-[10px] font-bold px-2 py-0.5 border border-neo-green">
                          {t(`pricing.seo.${priceKey}Save`, "")}
                        </span>
                      </div>
                    )}
                    {plan.id === "seo-monthly" && <div className="mb-4" />}

                    <div className="w-full h-0.5 bg-neo-black/10 mb-4" />

                    <ul className="space-y-2 mb-6">
                      {features.map((feature: string) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 font-mono text-xs text-neo-black/80"
                        >
                          <span
                            className={`w-4 h-4 ${bgAccent} border border-neo-black flex items-center justify-center flex-shrink-0 mt-0.5`}
                          >
                            <span className="text-[8px] font-bold">+</span>
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <NeoButton
                      href="/contact"
                      size="sm"
                      color={plan.color}
                      className="w-full"
                    >
                      {t("pricing.getStarted", "GET STARTED")}{" "}
                      <ArrowRight size={14} />
                    </NeoButton>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* What We Do Grid */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-4"
          >
            <h3 className="font-space font-bold text-xl lg:text-2xl uppercase tracking-wider mb-8">
              {t("pricing.seo.whatWeDoTitle", "WHAT WE DO FOR YOUR SEO")}
            </h3>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              { key: "1", icon: FileSearch },
              { key: "2", icon: Target },
              { key: "3", icon: Code2 },
              { key: "4", icon: Link2 },
              { key: "5", icon: MapPin },
              { key: "6", icon: FileBarChart },
            ].map((item) => (
              <motion.div
                key={item.key}
                variants={fadeInUp}
                className="bg-neo-white border-2 border-neo-black shadow-hard p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-neo-lime border-2 border-neo-black flex items-center justify-center flex-shrink-0 shadow-hard-sm">
                    <item.icon size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-space font-bold text-sm uppercase tracking-wider mb-1">
                      {t(`pricing.seo.whatWeDo${item.key}Title`, "")}
                    </h4>
                    <p className="font-mono text-xs text-neo-black/70 leading-relaxed">
                      {t(`pricing.seo.whatWeDo${item.key}Desc`, "")}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 section-alt">
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
