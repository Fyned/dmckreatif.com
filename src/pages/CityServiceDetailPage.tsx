import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Globe2,
  TrendingUp,
  ShoppingBag,
  Megaphone,
} from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import JsonLd from "@/components/seo/JsonLd";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { buildCitySchema } from "@/lib/seo-schemas";
import { getCityBySlug } from "@/data/cities";

interface ServiceConfig {
  slug: string;
  label: string;
  Icon: LucideIcon;
  color: string;
  metaTitle: (city: string) => string;
  metaDesc: (city: string) => string;
  intro: (city: string) => string;
  features: string[];
  process: { step: string; desc: string }[];
  pricingFrom: string;
}

const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  "web-design": {
    slug: "web-design",
    label: "Web Design & Development",
    Icon: Globe2,
    color: "neo-lime",
    metaTitle: (city) =>
      `Web Design ${city} | Premium Websites — DMC Kreatif`,
    metaDesc: (city) =>
      `Professional web design & development in ${city}. Fast, mobile-first, SEO-ready websites built with React & Tailwind. Free quote in 24h.`,
    intro: (city) =>
      `We design and build high-performance websites for businesses in ${city}. Every site is crafted mobile-first, optimised for search engines, and delivered with blazing speed — so you stand out from day one.`,
    features: [
      "Mobile-first responsive design on all screen sizes",
      "Custom UI built with React + Tailwind — no templates",
      "Page speed optimised: Lighthouse score ≥ 95",
      "SEO-ready structure with JSON-LD schema markup",
      "Secure HTTPS, GDPR-compliant contact forms",
      "Free revisions until you are 100% satisfied",
    ],
    process: [
      { step: "Discovery call", desc: "30-minute video call to align on goals, branding, and target audience." },
      { step: "Design & wireframe", desc: "We create mockups and get your sign-off before writing a single line of code." },
      { step: "Development", desc: "Fast, clean code — React + Vite, Tailwind CSS, optimised assets." },
      { step: "Launch & handover", desc: "We deploy, test on all devices, and hand you full ownership." },
    ],
    pricingFrom: "€497",
  },
  "seo": {
    slug: "seo",
    label: "SEO & Search Rankings",
    Icon: TrendingUp,
    color: "neo-yellow",
    metaTitle: (city) =>
      `SEO Services ${city} | Rank Higher on Google — DMC Kreatif`,
    metaDesc: (city) =>
      `Expert SEO services in ${city}. Technical SEO, local SEO, content optimisation & link building. Get more organic traffic. Free audit included.`,
    intro: (city) =>
      `Our SEO specialists help ${city} businesses climb Google rankings and attract qualified visitors without paying for every click. We combine technical excellence with content strategy that converts.`,
    features: [
      "Full technical SEO audit — crawlability, speed, schema",
      "Local SEO: Google Business Profile optimisation",
      "Keyword research targeting your exact audience",
      "On-page optimisation: titles, meta, headings, content",
      "Link building with authoritative European publications",
      "Monthly ranking reports with actionable insights",
    ],
    process: [
      { step: "SEO audit", desc: "We crawl your site and identify every ranking opportunity and technical issue." },
      { step: "Strategy plan", desc: "Prioritised roadmap: quick wins first, then long-term content strategy." },
      { step: "Implementation", desc: "We fix technical issues, optimise pages, and build quality backlinks." },
      { step: "Track & iterate", desc: "Monthly reports show ranking progress and ROI. We adjust strategy monthly." },
    ],
    pricingFrom: "€297/mo",
  },
  "ecommerce": {
    slug: "ecommerce",
    label: "E-Commerce Solutions",
    Icon: ShoppingBag,
    color: "neo-pink",
    metaTitle: (city) =>
      `E-Commerce Development ${city} | Online Store — DMC Kreatif`,
    metaDesc: (city) =>
      `E-commerce development in ${city}. Fast, secure online stores with payment integration, inventory management & multilingual support. Free quote.`,
    intro: (city) =>
      `Launch or scale your online store in ${city} with a custom e-commerce solution built for European customers. We deliver secure checkout, multi-currency pricing, and product management that's easy to use every day.`,
    features: [
      "Custom storefront — fast checkout, zero friction",
      "Multi-currency & multilingual product catalogues",
      "Secure payment gateways: Stripe, LemonSqueezy",
      "Inventory management with stock alerts",
      "Order tracking dashboard for customers",
      "Mobile-optimised: 60%+ of purchases happen on phones",
    ],
    process: [
      { step: "Product & catalogue planning", desc: "We map your product structure, pricing tiers, and category logic." },
      { step: "Store design & UX", desc: "Conversion-optimised layouts proven to reduce cart abandonment." },
      { step: "Integration & testing", desc: "Payment gateway, shipping, tax rules — fully tested before launch." },
      { step: "Launch & training", desc: "We onboard your team and provide a 30-day support period post-launch." },
    ],
    pricingFrom: "€2,997",
  },
  "digital-marketing": {
    slug: "digital-marketing",
    label: "Digital Marketing",
    Icon: Megaphone,
    color: "neo-blue",
    metaTitle: (city) =>
      `Digital Marketing ${city} | Google & Meta Ads — DMC Kreatif`,
    metaDesc: (city) =>
      `Results-driven digital marketing in ${city}. Google Ads, Meta Ads, email campaigns & analytics. Stop guessing — start growing. Free strategy call.`,
    intro: (city) =>
      `We run data-driven digital marketing campaigns for ${city} businesses that want predictable growth. From Google Ads to email automation, every euro you spend is tracked, measured, and optimised for the highest return.`,
    features: [
      "Google Ads search & display campaigns with negative keyword lists",
      "Meta Ads (Facebook & Instagram) audience targeting",
      "Email marketing sequences that nurture leads automatically",
      "Conversion tracking: know which campaigns drive revenue",
      "A/B testing of ad creatives, landing pages, CTAs",
      "Weekly performance reports with clear KPIs",
    ],
    process: [
      { step: "Audience & competitor research", desc: "We identify your ideal customer and where they spend time online." },
      { step: "Campaign architecture", desc: "Structured ad accounts with tight audience segments and budget controls." },
      { step: "Launch & optimise", desc: "Campaigns go live with daily monitoring for the first 2 weeks." },
      { step: "Scale & report", desc: "Proven campaigns are scaled; underperformers are cut. Monthly strategy reviews." },
    ],
    pricingFrom: "€397/mo",
  },
};

const PRICING_TIERS = [
  { name: "Launch", price: "€497", desc: "Single page, responsive, SEO basics, contact form — 3–5 day delivery." },
  { name: "Growth", price: "€997", desc: "5–7 pages, blog, advanced SEO, analytics — 7–10 days." },
  { name: "Scale", price: "€1,997", desc: "Full site, multilingual, video, ads setup — 14–18 days." },
];

export default function CityServiceDetailPage() {
  const { t } = useTranslation();
  const { locale, city: citySlug, serviceSlug } = useParams();
  const currentLocale = locale ?? "en";

  const city = citySlug ? getCityBySlug(citySlug) : null;
  const service = serviceSlug ? SERVICE_CONFIGS[serviceSlug] : null;

  if (!city || !service) {
    return (
      <div className="py-32 text-center">
        <p className="font-mono text-neo-black/50">Page not found.</p>
        <Link to={`/${currentLocale}/services`} className="font-mono text-xs text-neo-lime underline mt-4 inline-block">
          ← Back to services
        </Link>
      </div>
    );
  }

  const cityName = t(city.nameKey);
  const { Icon } = service;
  const path = `/web-agency-${city.slug}/${service.slug}`;

  return (
    <>
      <SeoHead
        title={service.metaTitle(cityName)}
        description={service.metaDesc(cityName)}
        path={path}
      />
      <JsonLd data={buildCitySchema({ cityName, lat: city.lat, lng: city.lng, locale: currentLocale, serviceType: service.label })} />

      <Breadcrumbs
        items={[
          { label: "Services", href: `/${currentLocale}/services` },
          { label: cityName, href: `/${currentLocale}/web-agency-${city.slug}` },
          { label: service.label },
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
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-neo-black border-2 border-neo-black bg-neo-lime px-3 py-1">
                {cityName}
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-neo-black/50 border-2 border-neo-black/20 px-3 py-1">
                {service.label}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-space font-bold text-4xl lg:text-6xl text-neo-black mb-6 leading-tight"
            >
              {service.label}{" "}
              <span className="text-neo-lime">in {cityName}</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-mono text-sm lg:text-base text-neo-black/70 leading-relaxed max-w-2xl mb-8"
            >
              {service.intro(cityName)}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <NeoButton href={`/${currentLocale}/contact`} color={service.color}>
                Get a Free Quote
                <ArrowRight size={16} />
              </NeoButton>
              <NeoButton href={`/${currentLocale}/web-agency-${city.slug}`} color="neo-yellow">
                <ArrowLeft size={16} />
                Back to {cityName}
              </NeoButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-neo-bg border-y-2 border-neo-black">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title="What's Included"
            subtitle="FEATURES"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="border-2 border-neo-black bg-neo-white shadow-hard p-6"
              >
                <CheckCircle2 size={20} className="text-neo-lime mb-3" />
                <p className="font-mono text-sm text-neo-black leading-relaxed">{feature}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* City Benefits */}
      <section className="py-16">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={`Why Businesses in ${cityName} Choose Us`}
            subtitle="LOCAL ADVANTAGE"
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
                className="border-2 border-neo-black bg-neo-white shadow-hard p-6 flex items-start gap-3"
              >
                <Icon size={18} className="text-neo-lime mt-0.5 flex-shrink-0" />
                <p className="font-mono text-sm text-neo-black leading-relaxed">{t(key)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-neo-bg border-y-2 border-neo-black">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader title="How We Work" subtitle="PROCESS" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {service.process.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="border-2 border-neo-black bg-neo-white shadow-hard p-6"
              >
                <span className="font-space font-bold text-5xl text-neo-lime/30 leading-none block mb-3">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-space font-bold text-base text-neo-black mb-2">{item.step}</h3>
                <p className="font-mono text-xs text-neo-black/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="py-16">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={`${service.label} Pricing — Starting ${service.pricingFrom}`}
            subtitle="INVESTMENT"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {PRICING_TIERS.map((tier, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className={`border-2 border-neo-black bg-neo-white shadow-hard p-8 ${idx === 1 ? "border-neo-lime" : ""}`}
              >
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-neo-black/50 mb-2">
                  {tier.name}
                </p>
                <p className="font-space font-bold text-3xl text-neo-black mb-4">{tier.price}</p>
                <p className="font-mono text-xs text-neo-black/70 leading-relaxed">{tier.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="font-mono text-xs text-neo-black/40 mt-6 text-center">
            All prices in EUR. Custom quotes available — contact us for exact pricing.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-neo-lime/10 border-y-2 border-neo-black">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-space font-bold text-3xl lg:text-4xl text-neo-black mb-4">
            Ready to Grow Your {cityName} Business?
          </h2>
          <p className="font-mono text-sm text-neo-black/70 mb-8 max-w-xl mx-auto">
            Get a free {service.label.toLowerCase()} consultation and quote within 24 hours. No commitment required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <NeoButton href={`/${currentLocale}/contact`} color={service.color} size="lg">
              Contact Us Today
              <ArrowRight size={16} />
            </NeoButton>
            <NeoButton href={`/${currentLocale}/web-agency-${city.slug}`} color="neo-yellow" size="lg">
              <ArrowLeft size={16} />
              All Services in {cityName}
            </NeoButton>
          </div>
        </div>
      </section>
    </>
  );
}
