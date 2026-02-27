import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo-schemas";
import { blogPosts } from "@/lib/blog-data";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

export default function BlogPage() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const currentLocale = locale ?? "en";

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
            className="max-w-2xl mb-12"
          >
            <h2 className="font-space font-bold text-xl lg:text-2xl text-neo-black mb-3">
              {t("blog.introHeading", "Insights for European Businesses")}
            </h2>
            <p className="font-mono text-sm text-neo-black/70 leading-relaxed mb-2">
              {t("blog.introText", "Practical guides on web development, SEO, and digital growth — written for SMBs across Europe.")}
            </p>
            <span className="font-mono text-xs text-neo-black/50">
              {t("blog.authorName", "Musa Kerem Demirci")} — {t("blog.authorRole", "Founder & Lead Developer")}
            </span>
          </motion.div>

          {/* Blog Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {blogPosts.map((post) => (
              <motion.div key={post.slug} variants={fadeInUp}>
                <Link
                  to={`/${currentLocale}/blog/${post.slug}`}
                  className="block border-2 border-neo-black bg-neo-white shadow-hard p-6 transition-all duration-200 hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] group"
                >
                  <div className="mb-3">
                    <NeoBadge color={post.accentColor}>{post.category}</NeoBadge>
                  </div>

                  <h2 className="font-space font-bold text-lg text-neo-black mb-2 group-hover:text-neo-black/80 leading-snug">
                    {t(`blog.${post.titleKey}`, post.titleKey)}
                  </h2>

                  <p className="font-mono text-sm text-neo-black/70 leading-relaxed line-clamp-3 mb-4">
                    {t(`blog.${post.excerptKey}`, post.excerptKey)}
                  </p>

                  <div className="flex items-center gap-3 font-mono text-[10px] text-neo-black/50 uppercase tracking-wider">
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
            ))}
          </motion.div>

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
