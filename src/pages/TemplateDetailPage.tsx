import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link, useNavigate } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  FileText,
  ArrowLeft,
  Monitor,
  Pencil,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import TemplatePreviewGallery from "@/components/templates/TemplatePreviewGallery";
import TemplateTierCard from "@/components/templates/TemplateTierCard";
import TemplateCard from "@/components/templates/TemplateCard";
import { templateTiers, TEMPLATE_TIER_PRICES } from "@/lib/template-data";
import { trackTemplateView } from "@/lib/analytics";
import { supabase } from "@/lib/supabase";
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/animations";
import type { Template, TemplateTier } from "@/types/database";

export default function TemplateDetailPage() {
  const { t } = useTranslation();
  const { locale, slug } = useParams();
  const navigate = useNavigate();
  const currentLocale = locale ?? "en";

  const [template, setTemplate] = useState<Template | null>(null);
  const [relatedTemplates, setRelatedTemplates] = useState<Template[]>([]);
  const [selectedTier, setSelectedTier] = useState<TemplateTier>("starter");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplate() {
      setLoading(true);

      const { data } = await supabase
        .from("templates")
        .select("*, category:template_categories(*)")
        .eq("slug", slug)
        .eq("active", true)
        .single();

      if (data) {
        const tmpl = data as Template;
        setTemplate(tmpl);
        trackTemplateView(tmpl.slug, tmpl.name, tmpl.category?.slug ?? "uncategorized");

        // Fetch related templates from same category
        if (tmpl.category?.id) {
          const { data: related } = await supabase
            .from("templates")
            .select("*, category:template_categories(*)")
            .eq("active", true)
            .eq("category_id", tmpl.category.id)
            .neq("id", tmpl.id)
            .order("sort_order")
            .limit(3);

          if (related) {
            setRelatedTemplates(related as Template[]);
          }
        }
      }

      setLoading(false);
    }

    if (slug) {
      fetchTemplate();
    }
  }, [slug]);

  function handleOrder() {
    navigate(
      `/${currentLocale}/templates/order?template=${slug}&tier=${selectedTier}`
    );
  }

  if (loading) {
    return (
      <section className="py-20 lg:py-32">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-center py-20">
            <div className="border-2 border-neo-black bg-neo-lime/20 shadow-hard px-8 py-4 font-space font-bold text-neo-black uppercase animate-pulse">
              {t("templates.loading", "Loading...")}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!template) {
    return (
      <section className="py-20 lg:py-32">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <div className="border-2 border-neo-black bg-neo-white shadow-hard p-12">
            <h2 className="font-space font-bold text-2xl mb-4">
              {t("templates.notFound", "Template Not Found")}
            </h2>
            <p className="font-mono text-sm text-neo-black/60 mb-6">
              {t(
                "templates.notFoundDescription",
                "The template you are looking for does not exist or has been removed."
              )}
            </p>
            <NeoButton href="/templates" color="neo-lime">
              <ArrowLeft size={16} />
              {t("templates.backToTemplates", "Back to Templates")}
            </NeoButton>
          </div>
        </div>
      </section>
    );
  }

  const tierPrice = TEMPLATE_TIER_PRICES[selectedTier];

  return (
    <>
      <SeoHead
        title={`${template.name} \u2014 ${t("seo.templates.detailSuffix", "Website Template")} | DMC Kreatif`}
        description={template.description ?? t("seo.templates.defaultDescription", "Premium website template by DMC Kreatif.")}
        path={`/templates/${slug}`}
        ogType="product"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: template.name,
          description: template.description ?? "Premium website template",
          image: template.thumbnail_url ?? undefined,
          brand: { "@type": "Brand", name: "DMC Kreatif" },
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "97",
            highPrice: "397",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            offerCount: "3",
          },
          category: template.category?.name ?? "Website Template",
        }}
      />

      <Breadcrumbs
        items={[
          { label: t("nav.templates", "TEMPLATES"), href: `/${currentLocale}/templates` },
          { label: template.name },
        ]}
      />

      {/* Main Content */}
      <section className="py-12 lg:py-20">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Preview Gallery */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <TemplatePreviewGallery images={template.preview_images} name={template.name} />
            </motion.div>

            {/* Right: Info Panel */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="space-y-6"
            >
              {/* Category Badge */}
              {template.category && (
                <motion.div variants={fadeInUp}>
                  <NeoBadge color="neo-yellow">
                    {template.category.name}
                  </NeoBadge>
                </motion.div>
              )}

              {/* Template Name */}
              <motion.h1
                variants={fadeInUp}
                className="font-space font-bold text-3xl lg:text-4xl text-neo-black uppercase"
              >
                {template.name}
              </motion.h1>

              {/* Description */}
              {template.description && (
                <motion.p
                  variants={fadeInUp}
                  className="font-mono text-sm text-neo-black/80 leading-relaxed"
                >
                  {template.description}
                </motion.p>
              )}

              {/* Features */}
              {template.features.length > 0 && (
                <motion.div variants={fadeInUp} className="space-y-3">
                  <h3 className="font-space font-bold text-sm uppercase tracking-wider text-neo-black">
                    {t("templates.features", "Features")}
                  </h3>
                  <ul className="space-y-2">
                    {template.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-neo-lime flex-shrink-0"
                        />
                        <span className="font-mono text-sm text-neo-black/80">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Pages Included */}
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center gap-2 border-2 border-neo-black bg-neo-bg px-4 py-2">
                  <FileText size={16} className="text-neo-black/60" />
                  <span className="font-mono text-sm font-bold text-neo-black">
                    {template.pages_included}{" "}
                    {t("templates.pagesIncluded", "pages included")}
                  </span>
                </div>
              </motion.div>

              {/* Tier Compatibility */}
              {template.tier_compatibility.length > 0 && (
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-wrap gap-2"
                >
                  {template.tier_compatibility.map((tier) => (
                    <NeoBadge key={tier} color="neo-blue">
                      {tier.replace("_", " ").toUpperCase()}
                    </NeoBadge>
                  ))}
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                {template.preview_url && (
                  <Link
                    to={`/${currentLocale}/templates/${template.slug}/preview`}
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neo-black bg-neo-yellow font-space font-bold text-sm uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all"
                  >
                    <Monitor size={16} />
                    {t("templates.livePreviewTitle", "LIVE PREVIEW")}
                  </Link>
                )}
                <Link
                  to={`/${currentLocale}/templates/order?template=${template.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neo-black bg-neo-lime font-space font-bold text-sm uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all"
                >
                  <Pencil size={16} />
                  {t("templates.customizeTemplate", "CUSTOMIZE THIS TEMPLATE")}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tier Selector */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("templates.chooseTier", "CHOOSE YOUR PACKAGE")}
            subtitle={t("templates.tierSubtitle", "SYS.TIERS")}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {templateTiers.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTier(tier.id as TemplateTier)}
                className={`text-left transition-all duration-200 ${
                  selectedTier === tier.id
                    ? "ring-4 ring-neo-lime ring-offset-2"
                    : ""
                }`}
              >
                <TemplateTierCard tier={tier} selected={selectedTier === tier.id} />
              </button>
            ))}
          </motion.div>

          {/* Order Button */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-center"
          >
            <div className="mb-4">
              <span className="font-mono text-sm text-neo-black/60">
                {t("templates.selectedPrice", "Selected package price:")}
              </span>
              <span className="font-space font-bold text-2xl text-neo-black ml-2">
                {"\u20AC"}{tierPrice}
              </span>
            </div>
            <NeoButton
              onClick={handleOrder}
              size="lg"
              color="neo-lime"
            >
              {t("templates.orderButton", "ORDER THIS TEMPLATE")}{" "}
              <ArrowRight size={18} />
            </NeoButton>
          </motion.div>
        </div>
      </section>

      {/* Related Templates */}
      {relatedTemplates.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="max-w-container mx-auto px-6 lg:px-10">
            <SectionHeader
              title={t("templates.relatedTitle", "SIMILAR TEMPLATES")}
              subtitle={t("templates.relatedSubtitle", "SYS.RELATED")}
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {relatedTemplates.map((tmpl) => (
                <TemplateCard key={tmpl.id} template={tmpl} />
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
