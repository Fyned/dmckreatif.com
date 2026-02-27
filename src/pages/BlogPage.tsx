import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { blogPosts } from "@/lib/blog-data";
import { staggerContainer, fadeInUp, viewportConfig } from "@/lib/animations";

const accentBarMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime",
  "neo-yellow": "bg-neo-yellow",
  "neo-blue": "bg-neo-blue",
  "neo-pink": "bg-neo-pink",
  "neo-green": "bg-neo-green",
  "neo-purple": "bg-neo-purple",
  "neo-orange": "bg-neo-orange",
};

export default function BlogPage() {
  const { t } = useTranslation();
  const { locale } = useParams();

  return (
    <>
      <SeoHead
        title={t("seo.blog.title", "Blog — DMC Kreatif")}
        description={t("seo.blog.description", "Web development insights, SEO tips, and digital marketing strategies for European businesses.")}
        path="/blog"
      />

      <Breadcrumbs items={[{ label: t("nav.blog", "BLOG") }]} />

      <section className="py-20 lg:py-32">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t("blog.title", "Blog")}
            subtitle={t("blog.subtitle", "INSIGHTS & ARTICLES")}
          />

          {/* SEO intro paragraph */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-12 max-w-3xl"
          >
            <h2 className="font-space font-bold text-xl lg:text-2xl text-neo-black mb-4">
              {t("blog.introHeading", "Web Development Insights for European Businesses")}
            </h2>
            <p className="font-mono text-sm lg:text-base text-neo-black/70 leading-relaxed">
              {t("blog.introText", "Practical articles about web development, SEO, and digital marketing written specifically for European small and medium businesses.")}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.map((post) => (
              <motion.article
                key={post.slug}
                variants={fadeInUp}
                className="group border-2 border-neo-black bg-neo-white shadow-hard transition-all duration-300 hover:-translate-y-2 hover:shadow-hard-lg flex flex-col"
              >
                {/* Accent color bar */}
                <div
                  className={`h-1.5 ${accentBarMap[post.accentColor] ?? "bg-neo-lime"}`}
                />

                <div className="p-6 flex flex-col flex-1">
                  {/* Category badge */}
                  <div className="mb-4">
                    <NeoBadge color={post.accentColor}>
                      {post.category}
                    </NeoBadge>
                  </div>

                  {/* Title */}
                  <h2 className="font-space font-bold text-lg lg:text-xl text-neo-black mb-3 leading-tight">
                    {t(`blog.${post.titleKey}`, post.titleKey)}
                  </h2>

                  {/* Excerpt */}
                  <p className="font-mono text-sm text-neo-black/70 leading-relaxed mb-5 line-clamp-3 flex-1">
                    {t(`blog.${post.excerptKey}`, post.excerptKey)}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-3 mb-5 font-mono text-xs text-neo-black/60">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                    <span>*</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Read more link */}
                  <Link
                    to={`/${locale ?? "en"}/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 font-space font-bold text-sm text-neo-black uppercase tracking-wider border-b-2 border-neo-black pb-1 hover:border-neo-lime hover:text-neo-lime transition-colors w-fit"
                  >
                    {t("blog.readMore", "Read more")}
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Internal Links + CTA */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            <motion.div variants={fadeInUp} className="border-2 border-neo-black bg-neo-white shadow-hard p-6">
              <h3 className="font-space font-bold text-sm uppercase mb-2">{t("blog.linkServices", "Need a Website?")}</h3>
              <p className="font-mono text-xs text-neo-black/70 leading-relaxed mb-4">{t("blog.linkServicesDesc", "We build premium websites for European businesses. React, Vite, Next.js — starting from €497.")}</p>
              <Link to={`/${locale ?? "en"}/services`} className="inline-flex items-center gap-2 font-space font-bold text-xs uppercase tracking-wider text-neo-black hover:text-neo-lime transition-colors">
                {t("blog.viewServices", "VIEW SERVICES")} <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="border-2 border-neo-black bg-neo-white shadow-hard p-6">
              <h3 className="font-space font-bold text-sm uppercase mb-2">{t("blog.linkPortfolio", "See Our Work")}</h3>
              <p className="font-mono text-xs text-neo-black/70 leading-relaxed mb-4">{t("blog.linkPortfolioDesc", "Explore 10+ projects built for businesses across France, Belgium, UK, Netherlands and Germany.")}</p>
              <Link to={`/${locale ?? "en"}/portfolio`} className="inline-flex items-center gap-2 font-space font-bold text-xs uppercase tracking-wider text-neo-black hover:text-neo-lime transition-colors">
                {t("blog.viewPortfolio", "VIEW PORTFOLIO")} <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-center"
          >
            <h2 className="font-space font-bold text-h2 mb-4">{t("cta.title", "READY TO BUILD SOMETHING?")}</h2>
            <p className="font-mono text-base text-neo-black/80 mb-8 max-w-lg mx-auto">{t("cta.subtitle", "Let's create a website that works as hard as you do.")}</p>
            <NeoButton href="/contact" size="lg" color="neo-lime">
              {t("cta.button", "START YOUR PROJECT")} <ArrowRight size={18} />
            </NeoButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
