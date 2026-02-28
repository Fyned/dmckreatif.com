import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Search } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo-schemas";
import { allArticles, type BlogCategory } from "@/data/blog";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { useAnalytics } from "@/lib/useAnalytics";

const CATEGORIES: { label: string; value: BlogCategory | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Business", value: "BUSINESS" },
  { label: "Tech", value: "TECH" },
  { label: "SEO", value: "SEO" },
  { label: "Marketing", value: "MARKETING" },
  { label: "Growth", value: "GROWTH" },
  { label: "Design", value: "DESIGN" },
  { label: "Legal", value: "LEGAL" },
  { label: "E-Commerce", value: "E-COMMERCE" },
];

const ARTICLES_PER_PAGE = 12;

export default function BlogPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  useAnalytics("Blog");
  const currentLocale = locale ?? "en";

  const [activeCategory, setActiveCategory] = useState<BlogCategory | "ALL">("ALL");
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  const filtered = useMemo(() => {
    if (activeCategory === "ALL") return allArticles;
    return allArticles.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const featured = allArticles[0];

  return (
    <>
      <SeoHead
        title={t("seo.blog.title", "Blog — DMC Kreatif")}
        description={t("seo.blog.description", "Web development insights, SEO tips, and digital marketing strategies for European businesses.")}
        path="/blog"
      />
      <JsonLd
        data={buildBreadcrumbSchema(currentLocale, [{ name: "Home", path: "" }], t("nav.blog", "Blog"))}
      />

      <Breadcrumbs items={[{ label: t("nav.blog", "BLOG") }]} />

      <section className="py-20 lg:py-32">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("blog.title", "Blog")}
            subtitle={t("blog.subtitle", "INSIGHTS & ARTICLES")}
          />

          {/* Intro */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="max-w-2xl mb-8"
          >
            <h2 className="font-space font-bold text-xl lg:text-2xl text-neo-black mb-3">
              {t("blog.introHeading", "Insights for European Businesses")}
            </h2>
            <p className="font-mono text-sm text-neo-black/70 leading-relaxed mb-2">
              {t("blog.introText", "Practical guides on web development, SEO, and digital growth — written for SMBs across Europe.")}
            </p>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-neo-black/50">
                {t("blog.authorName", "Musa Kerem Demirci")} — {t("blog.authorRole", "Founder & Lead Developer")}
              </span>
              <span className="font-mono text-[10px] text-neo-black/40 border border-neo-black/20 px-2 py-0.5">
                {filtered.length} {filtered.length === 1 ? "article" : "articles"}
              </span>
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-wrap gap-2 mb-12"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  setVisibleCount(ARTICLES_PER_PAGE);
                }}
                className={`font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 border-2 border-neo-black transition-all duration-200 ${
                  activeCategory === cat.value
                    ? "bg-neo-black text-neo-white shadow-none translate-x-[1px] translate-y-[1px]"
                    : "bg-neo-white text-neo-black shadow-hard hover:shadow-hard-sm hover:translate-x-[1px] hover:translate-y-[1px]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Featured Article (only in "ALL" view) */}
          {activeCategory === "ALL" && featured && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="mb-10"
            >
              <Link
                to={`/${currentLocale}/blog/${featured.slug}`}
                className="block border-2 border-neo-black bg-neo-white shadow-hard p-8 lg:p-10 transition-all duration-200 hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <NeoBadge color={featured.accentColor}>{featured.category}</NeoBadge>
                  <span className="font-mono text-[10px] text-neo-black/40 uppercase tracking-wider border border-neo-black/20 px-2 py-0.5">
                    Featured
                  </span>
                </div>

                <h2 className="font-space font-bold text-2xl lg:text-3xl text-neo-black mb-3 group-hover:text-neo-black/80 leading-tight">
                  {featured.title}
                </h2>

                <p className="font-mono text-sm text-neo-black/70 leading-relaxed line-clamp-3 mb-5 max-w-3xl">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-4 font-mono text-[10px] text-neo-black/50 uppercase tracking-wider">
                  <time dateTime={featured.date}>
                    {new Date(featured.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                  <span>*</span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {featured.readTime}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 font-bold text-neo-black group-hover:text-neo-lime transition-colors">
                    Read article <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Blog Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visible.map((post, idx) => {
              if (activeCategory === "ALL" && idx === 0) return null;
              return (
                <motion.div key={post.slug} variants={fadeInUp}>
                  <Link
                    to={`/${currentLocale}/blog/${post.slug}`}
                    className="block border-2 border-neo-black bg-neo-white shadow-hard p-6 transition-all duration-200 hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] group h-full"
                  >
                    <div className="mb-3">
                      <NeoBadge color={post.accentColor}>{post.category}</NeoBadge>
                    </div>

                    <h3 className="font-space font-bold text-lg text-neo-black mb-2 group-hover:text-neo-black/80 leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="font-mono text-sm text-neo-black/70 leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-3 font-mono text-[10px] text-neo-black/50 uppercase tracking-wider mt-auto">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                      <span>*</span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {post.readTime}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Load More */}
          {hasMore && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="text-center mt-12"
            >
              <button
                onClick={() => setVisibleCount((prev) => prev + ARTICLES_PER_PAGE)}
                className="font-mono text-xs font-bold uppercase tracking-wider px-8 py-3 border-2 border-neo-black bg-neo-white shadow-hard hover:shadow-hard-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-200"
              >
                Load more articles ({filtered.length - visibleCount} remaining)
              </button>
            </motion.div>
          )}

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search size={40} className="mx-auto text-neo-black/20 mb-4" />
              <p className="font-mono text-sm text-neo-black/50">
                No articles found in this category.
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-center mt-16"
          >
            <NeoButton href={`/${currentLocale}/contact`} size="lg" color="neo-lime">
              {t("cta.button", "START YOUR PROJECT")} <ArrowRight size={18} />
            </NeoButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
