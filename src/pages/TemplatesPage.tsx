import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import SeoHead from "@/components/seo/SeoHead";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  LayoutTemplate,
  Zap,
  DollarSign,
  Palette,
  Clock,
  Code2,
  Users,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import TemplateCard from "@/components/templates/TemplateCard";
import TemplateTierCard from "@/components/templates/TemplateTierCard";
import TemplateCategoryFilter from "@/components/templates/TemplateCategoryFilter";
import { SkeletonGrid } from "@/components/ui/Skeleton";
import { templateTiers } from "@/lib/template-data";
import { supabase } from "@/lib/supabase";
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/animations";
import JsonLd from "@/components/seo/JsonLd";
import { buildSoftwareApplicationSchema } from "@/lib/seo-schemas";
import type { Template, TemplateCategory } from "@/types/database";

export default function TemplatesPage() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<TemplateCategory[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [categoriesRes, templatesRes] = await Promise.all([
          supabase
            .from("template_categories")
            .select("*")
            .eq("active", true)
            .order("sort_order"),
          supabase
            .from("templates")
            .select("*, category:template_categories(*)")
            .eq("active", true)
            .order("sort_order"),
        ]);

        if (categoriesRes.error) {
          setError(categoriesRes.error.message);
        }
        if (templatesRes.error) {
          setError(templatesRes.error.message);
        }

        if (categoriesRes.data) {
          setCategories(categoriesRes.data as TemplateCategory[]);
        }
        if (templatesRes.data) {
          setTemplates(templatesRes.data as Template[]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load templates");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredTemplates = useMemo(() => {
    return templates.filter((tmpl) => {
      const categoryMatch =
        !selectedCategory || tmpl.category?.slug === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const searchMatch =
        !query ||
        tmpl.name.toLowerCase().includes(query) ||
        (tmpl.description ?? "").toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });
  }, [templates, selectedCategory, searchQuery]);

  return (
    <>
      <SeoHead
        title={t(
          "seo.templates.title",
          "Website Templates \u2014 Ready-Made Designs from \u20AC39 | DMC Kreatif"
        )}
        description={t(
          "seo.templates.description",
          "Professional website templates for restaurants, construction, beauty and more. Starter \u20AC39, Business \u20AC99, Premium \u20AC179. Customized and delivered in 24h to 5 days."
        )}
        path="/templates"
      />
      <Breadcrumbs
        items={[{ label: t("nav.templates", "TEMPLATES") }]}
      />
      <JsonLd
        data={buildSoftwareApplicationSchema({
          name: "DMC Kreatif Website Templates",
          description:
            "Premium ready-made website templates for restaurants, salons, construction companies, and more. Built with React, Vite, and Tailwind CSS.",
          price: "39",
          category: "Website Templates",
        })}
      />

      {/* Enhanced Hero */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("templates.heroTitle", "READY-MADE WEBSITE TEMPLATES")}
            subtitle={t("templates.sectionSubtitle", "SYS.TEMPLATES")}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="-mt-6 mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="font-mono text-base lg:text-lg text-neo-black/80 max-w-2xl leading-relaxed mb-4"
            >
              {t(
                "templates.heroDescription",
                "Professional website templates customized with your brand. Choose a design, add your details, get your site in 24 hours to 5 days."
              )}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3">
              <NeoBadge color="neo-lime">
                {t("templates.heroPrice", "Starting from \u20AC39")}
              </NeoBadge>
              <NeoBadge color="neo-yellow">
                <Clock size={12} className="mr-1" />
                {t("choosePath.templateDelivery", "Site in 24 hours")}
              </NeoBadge>
              <span className="font-mono text-xs text-neo-black/60">
                {t("templates.satisfactionGuarantee", "100% satisfaction guaranteed \u2014 free revisions until you are happy")}
              </span>
            </motion.div>
          </motion.div>

          {/* Why Templates? — Benefits Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
          >
            {[
              {
                icon: Zap,
                title: t("templates.whyFast", "FAST DELIVERY"),
                desc: t("templates.whyFastDesc", "Get your website in as little as 24 hours"),
                color: "bg-neo-lime",
              },
              {
                icon: DollarSign,
                title: t("templates.whyAffordable", "AFFORDABLE"),
                desc: t("templates.whyAffordableDesc", "Professional websites starting from just \u20AC39"),
                color: "bg-neo-yellow",
              },
              {
                icon: Palette,
                title: t("templates.whyBrand", "YOUR BRAND"),
                desc: t("templates.whyBrandDesc", "Customized with your logo, colors and content"),
                color: "bg-neo-blue",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="bg-neo-white border-2 border-neo-black shadow-hard p-5 transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm"
              >
                <div
                  className={`w-10 h-10 ${item.color} border-2 border-neo-black shadow-hard-sm flex items-center justify-center mb-3`}
                >
                  <item.icon size={18} strokeWidth={2.5} />
                </div>
                <h3 className="font-space font-bold text-sm tracking-wider mb-1">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-neo-black/70 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Tier Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {templateTiers.map((tier) => (
              <TemplateTierCard key={tier.id} tier={tier} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* "Need Something Unique?" Banner */}
      <section className="py-16 lg:py-20 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.div
              variants={fadeInUp}
              className="bg-neo-white border-2 border-neo-blue shadow-hard relative overflow-hidden"
            >
              {/* Blue accent bar */}
              <div className="h-2 bg-neo-blue" />

              {/* Badge */}
              <div className="absolute -top-3 right-4">
                <NeoBadge color="neo-blue">
                  {t("templates.customBannerBadge", "PROFESSIONAL DEVELOPER TEAM")}
                </NeoBadge>
              </div>

              <div className="p-6 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
                {/* Icon */}
                <div className="w-16 h-16 bg-neo-blue border-2 border-neo-black shadow-hard-sm flex items-center justify-center flex-shrink-0">
                  <Code2 size={30} strokeWidth={2.5} className="text-neo-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-space font-bold text-xl lg:text-2xl tracking-tight mb-2">
                    {t("templates.customBannerTitle", "NEED SOMETHING UNIQUE?")}
                  </h3>
                  <p className="font-mono text-sm text-neo-black/80 leading-relaxed mb-1">
                    {t(
                      "templates.customBannerDesc",
                      "Our professional development team builds fully custom websites tailored to your exact needs. Everything from scratch, exactly as you want it."
                    )}
                  </p>
                  <div className="flex items-center gap-2 font-mono text-xs text-neo-black/60">
                    <Users size={12} />
                    <span>
                      {t("choosePath.customDelivery", "Built from scratch by our team")}
                    </span>
                    <span className="text-neo-black/30">|</span>
                    <span>
                      {t("choosePath.customPrice", "FROM \u20AC349")}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0">
                  <NeoButton href="/pricing" color="neo-blue" size="md">
                    {t("templates.customBannerCta", "EXPLORE CUSTOM PACKAGES")}{" "}
                    <ArrowRight size={16} />
                  </NeoButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Browse Templates — Category Filter + Search + Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("templates.sectionTitle", "WEBSITE TEMPLATES")}
            subtitle={t("templates.sectionSubtitle", "SYS.TEMPLATES")}
          />

          {/* Category Filter */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-6"
          >
            <TemplateCategoryFilter
              categories={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
          </motion.div>

          {/* Search Input */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-12"
          >
            <div className="relative max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neo-black/40"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(
                  "templates.searchPlaceholder",
                  "Search templates..."
                )}
                className="w-full font-mono text-sm pl-11 pr-4 py-3 border-2 border-neo-black bg-neo-bg focus:outline-none focus:border-neo-lime focus:shadow-hard-sm transition-all placeholder:text-neo-black/30"
              />
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && <SkeletonGrid count={6} />}

          {/* Error State */}
          {!loading && error && (
            <div className="text-center py-12 border-2 border-neo-red bg-neo-red/10 shadow-hard mb-8">
              <p className="font-mono text-sm text-neo-black/80 mb-2">
                {t("templates.error", "Failed to load templates.")}
              </p>
              <p className="font-mono text-xs text-neo-black/50">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 font-mono text-xs border-2 border-neo-black px-4 py-2 bg-neo-bg hover:bg-neo-lime transition-colors shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                {t("templates.retry", "Retry")}
              </button>
            </div>
          )}

          {/* Template Grid */}
          {!loading && filteredTemplates.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && filteredTemplates.length === 0 && (
            <div className="text-center py-20 border-2 border-neo-black bg-neo-white shadow-hard">
              <LayoutTemplate
                size={48}
                className="mx-auto mb-4 text-neo-black/30"
              />
              <p className="font-mono text-sm text-neo-black/60 mb-2">
                {t(
                  "templates.noResults",
                  "No templates match your search. Try a different keyword or category."
                )}
              </p>
              <p className="font-mono text-xs text-neo-black/40">
                {t(
                  "templates.tryDifferent",
                  "Try adjusting your filters or search query."
                )}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA — Custom Development Messaging */}
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
              {t("templates.customBannerTitle", "NEED SOMETHING UNIQUE?")}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-mono text-base text-neo-black/80 mb-3 max-w-lg mx-auto"
            >
              {t(
                "templates.customBannerDesc",
                "Our professional development team builds fully custom websites tailored to your exact needs. Everything from scratch, exactly as you want it."
              )}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="font-mono text-sm text-neo-black/60 mb-8"
            >
              {t("choosePath.customPrice", "FROM \u20AC349")}
              {" \u2014 "}
              {t("choosePath.customDelivery", "Built from scratch by our team")}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeoButton href="/pricing" size="lg" color="neo-blue">
                {t("templates.customBannerCta", "EXPLORE CUSTOM PACKAGES")}{" "}
                <ArrowRight size={18} />
              </NeoButton>
              <NeoButton href="/contact" size="lg" variant="outline" color="neo-lime">
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
