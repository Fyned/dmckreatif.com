import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import JsonLd from "@/components/seo/JsonLd";
import { buildBlogPostingSchema, buildBreadcrumbSchema } from "@/lib/seo-schemas";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ArrowRight, Code2, Tag, BookOpen } from "lucide-react";
import NeoBadge from "@/components/ui/NeoBadge";
import NeoButton from "@/components/ui/NeoButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ShareButtons from "@/components/ui/ShareButtons";
import { getArticleBySlug, allArticles } from "@/data/blog";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const contentModules = import.meta.glob<{ default: string }>(
  "/src/data/blog/content/en/*.ts",
  { eager: false }
);

function parseToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
  let match;
  let index = 0;
  while ((match = regex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, "").trim();
    const id = `section-${index}`;
    items.push({ id, text, level: parseInt(match[1], 10) });
    index++;
  }
  return items;
}

function injectIds(html: string): string {
  let index = 0;
  return html.replace(/<h([23])([^>]*)>/gi, (_, level, attrs) => {
    const id = `section-${index}`;
    index++;
    return `<h${level}${attrs} id="${id}">`;
  });
}

export default function BlogPostPage() {
  const { t } = useTranslation();
  const { locale, slug } = useParams<{ locale: string; slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  // Load content dynamically
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setContent(null);

    // Try different filename patterns
    const patterns = [
      `/src/data/blog/content/en/${slug}.ts`,
    ];

    // Also try shortened slug patterns
    const shortNames: Record<string, string> = {
      "how-much-does-a-website-cost-in-europe-2026": "website-cost",
      "react-vs-wordpress-2026": "react-vs-wordpress",
      "seo-guide-small-businesses-france": "seo-france",
      "why-multilingual-website-european-business": "multilingual-website",
      "how-to-choose-a-web-agency-in-europe": "choose-web-agency",
      "technical-seo-checklist-europe": "technical-seo-checklist",
      "core-web-vitals-lighthouse-guide": "core-web-vitals-guide",
      "website-redesign-guide": "website-redesign",
      "multilingual-website-guide": "multilingual-guide",
      "gdpr-compliance-checklist": "gdpr-checklist",
      "ecommerce-conversion-optimization": "ecommerce-conversion",
      "seo-audit-guide-2026": "seo-audit-guide",
      "website-migration-seo": "website-migration",
      "shopify-vs-woocommerce-vs-custom": "shopify-vs-woocommerce",
      "nextjs-vs-gatsby-vs-remix": "nextjs-vs-gatsby",
      "supabase-vs-firebase": "supabase-vs-firebase",
      "agency-vs-freelancer-development": "agency-vs-freelancer",
      "headless-vs-traditional-cms": "headless-vs-traditional-cms",
      "tailwind-vs-bootstrap": "tailwind-vs-bootstrap",
      "vercel-vs-netlify-vs-aws": "vercel-vs-netlify",
      "shopify-vs-prestashop-europe": "shopify-vs-prestashop",
      "wordpress-vs-custom-cost": "wordpress-vs-custom",
      "what-is-headless-cms": "what-is-headless-cms",
      "ecommerce-platform-comparison-europe": "ecommerce-platforms-europe",
      "state-of-web-development-2026": "state-of-web-dev-2026",
      "multilingual-seo-europe": "multilingual-seo",
      "web-design-construction": "web-design-construction",
      "ai-web-development-2026": "ai-web-development",
      "core-web-vitals-explained": "core-web-vitals-explained",
      "roi-professional-web-design": "roi-web-design",
    };

    const shortName = shortNames[slug];
    if (shortName) {
      patterns.push(`/src/data/blog/content/en/${shortName}.ts`);
    }

    const tryLoad = async () => {
      for (const key of patterns) {
        if (contentModules[key]) {
          try {
            const mod = await contentModules[key]();
            setContent(mod.default);
            setLoading(false);
            return;
          } catch {
            // try next pattern
          }
        }
      }
      setContent(null);
      setLoading(false);
    };

    tryLoad();
  }, [slug]);

  // Scroll progress bar
  const handleScroll = useCallback(() => {
    if (!articleRef.current) return;
    const el = articleRef.current;
    const rect = el.getBoundingClientRect();
    const totalHeight = el.scrollHeight;
    const scrolled = Math.max(0, -rect.top);
    const progress = Math.min(1, scrolled / (totalHeight - window.innerHeight));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!article) {
    return (
      <section className="py-20 lg:py-32">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <div className="border-2 border-neo-black bg-neo-white shadow-hard p-12 max-w-xl mx-auto">
            <span className="font-mono text-6xl font-bold text-neo-black block mb-4">404</span>
            <h1 className="font-space font-bold text-2xl text-neo-black mb-4">
              {t("blog.notFound", "Post not found")}
            </h1>
            <p className="font-mono text-sm text-neo-black/60 mb-8">
              {t("blog.notFoundDescription", "The blog post you are looking for does not exist or has been moved.")}
            </p>
            <NeoButton href={`/${locale ?? "en"}/blog`} color="neo-lime">
              <ArrowLeft size={14} />
              {t("blog.backToBlog", "Back to Blog")}
            </NeoButton>
          </div>
        </div>
      </section>
    );
  }

  const currentLocale = locale ?? "en";
  const formattedDate = new Date(article.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Table of Contents
  const toc = content ? parseToc(content) : [];
  const processedContent = content ? injectIds(content) : "";

  // Related articles (by relatedSlugs, then by category)
  const relatedArticles = useMemo(() => {
    if (article.relatedSlugs && article.relatedSlugs.length > 0) {
      return article.relatedSlugs
        .map((s) => allArticles.find((a) => a.slug === s))
        .filter(Boolean)
        .slice(0, 3) as typeof allArticles;
    }
    return allArticles
      .filter((a) => a.slug !== article.slug && a.category === article.category)
      .slice(0, 3);
  }, [article]);

  // SEO meta from i18n
  const seoTitle = t(`seo.blogPost.${article.slug}.title`, `${article.title} — DMC Kreatif`);
  const seoDesc = t(`seo.blogPost.${article.slug}.description`, article.excerpt);

  return (
    <>
      <SeoHead title={seoTitle} description={seoDesc} path={`/blog/${article.slug}`} locales={["en"]} canonicalLocale="en" />
      <JsonLd
        data={buildBlogPostingSchema({
          title: article.title,
          description: article.excerpt,
          datePublished: article.date,
          dateModified: article.updatedDate ?? article.date,
          slug: article.slug,
          locale: currentLocale,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema(
          currentLocale,
          [{ name: "Blog", path: "/blog" }],
          article.title
        )}
      />

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-neo-black/5">
        <div
          className="h-full bg-neo-lime transition-[width] duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <Breadcrumbs
        items={[
          { label: t("nav.blog", "BLOG"), href: `/${currentLocale}/blog` },
          { label: article.title },
        ]}
      />

      <section className="py-20 lg:py-32" ref={articleRef}>
        <div className="max-w-container mx-auto px-6 lg:px-10">
          {/* Back link */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-10"
          >
            <Link
              to={`/${currentLocale}/blog`}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neo-black uppercase tracking-wider hover:text-neo-lime transition-colors border-b-2 border-neo-black hover:border-neo-lime pb-1"
            >
              <ArrowLeft size={14} />
              {t("blog.backToBlog", "Back to Blog")}
            </Link>
          </motion.div>

          <div className="flex gap-10 lg:gap-16">
            {/* Table of Contents — Desktop Sidebar */}
            {toc.length > 2 && (
              <aside className="hidden xl:block w-64 flex-shrink-0 sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="border-2 border-neo-black bg-neo-bg p-5">
                  <h4 className="font-space font-bold text-xs text-neo-black uppercase tracking-wider mb-4 flex items-center gap-2">
                    <BookOpen size={14} />
                    Contents
                  </h4>
                  <nav className="space-y-2">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block font-mono text-xs leading-relaxed text-neo-black/60 hover:text-neo-lime transition-colors ${
                          item.level === 3 ? "pl-4" : ""
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            {/* Main content */}
            <article className="max-w-3xl mx-auto flex-1 min-w-0">
              {/* Post header */}
              <motion.header
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="mb-12 border-b-2 border-neo-black pb-8"
              >
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <NeoBadge color={article.accentColor}>{article.category}</NeoBadge>
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-neo-black/50 uppercase tracking-wider border border-neo-black/15 px-2 py-0.5"
                    >
                      <Tag size={8} />
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="font-space font-bold text-3xl lg:text-4xl text-neo-black mb-6 leading-tight">
                  {article.title}
                </h1>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4 font-mono text-xs text-neo-black/60">
                    <time dateTime={article.date}>{formattedDate}</time>
                    <span>*</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>
                  <ShareButtons
                    url={`/${currentLocale}/blog/${article.slug}`}
                    title={article.title}
                    description={article.excerpt}
                  />
                </div>
              </motion.header>

              {/* Mobile TOC */}
              {toc.length > 2 && (
                <motion.details
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  className="xl:hidden border-2 border-neo-black bg-neo-bg p-4 mb-8"
                >
                  <summary className="font-space font-bold text-xs text-neo-black uppercase tracking-wider cursor-pointer flex items-center gap-2">
                    <BookOpen size={14} />
                    Table of Contents
                  </summary>
                  <nav className="mt-3 space-y-2">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block font-mono text-xs text-neo-black/60 hover:text-neo-lime transition-colors ${
                          item.level === 3 ? "pl-4" : ""
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </motion.details>
              )}

              {/* Post content */}
              {loading ? (
                <div className="space-y-4 animate-pulse mb-16">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-4 bg-neo-black/5 rounded" style={{ width: `${70 + Math.random() * 30}%` }} />
                  ))}
                </div>
              ) : content ? (
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  className="font-mono text-sm text-neo-black leading-relaxed space-y-6 mb-16 [&_h2]:font-space [&_h2]:font-bold [&_h2]:text-xl [&_h2]:text-neo-black [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-24 [&_h3]:font-space [&_h3]:font-bold [&_h3]:text-lg [&_h3]:text-neo-black [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-24 [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_a]:text-neo-lime [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:border-l-4 [&_blockquote]:border-neo-lime [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neo-black/70 [&_code]:bg-neo-black/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:font-mono"
                >
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                  />
                </motion.div>
              ) : (
                <div className="border-2 border-neo-black/20 bg-neo-bg p-8 text-center mb-16">
                  <p className="font-mono text-sm text-neo-black/50">
                    Content is being prepared. Check back soon.
                  </p>
                </div>
              )}

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b-2 border-neo-black/10">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-neo-black/50 uppercase tracking-wider border border-neo-black/15 px-3 py-1"
                    >
                      <Tag size={9} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author Bio */}
              <div className="flex items-start gap-4 border-2 border-neo-black bg-neo-bg p-6 mb-12">
                <div className="w-14 h-14 bg-neo-lime border-2 border-neo-black flex items-center justify-center flex-shrink-0">
                  <Code2 size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="font-space font-bold text-sm block">
                    {t("blog.authorName", "Musa Kerem Demirci")}
                  </span>
                  <span className="font-mono text-xs text-neo-black/60 block mb-2">
                    {t("blog.authorRole", "Founder & Lead Developer")}
                  </span>
                  <p className="font-mono text-xs text-neo-black/70 leading-relaxed">
                    {t("blog.authorBio", "Full-stack developer with expertise in React, Next.js, and modern web technologies.")}
                  </p>
                  <a
                    href="https://www.linkedin.com/in/musakeremdemirci"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 font-mono text-xs font-bold text-neo-black hover:text-neo-lime transition-colors"
                  >
                    LinkedIn <ArrowRight size={12} />
                  </a>
                </div>
              </div>

              {/* CTA section */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="border-2 border-neo-black bg-neo-bg p-8 lg:p-10 shadow-hard"
              >
                <h3 className="font-space font-bold text-xl lg:text-2xl text-neo-black mb-3">
                  {t("blog.ctaTitle", "Ready to start your project?")}
                </h3>
                <p className="font-mono text-sm text-neo-black/70 mb-6">
                  {t("blog.ctaDescription", "Let's discuss how we can help your business grow with a premium web presence.")}
                </p>
                <NeoButton href={`/${currentLocale}/contact`} color="neo-lime" size="lg">
                  {t("blog.ctaButton", "Get in touch")}
                  <ArrowRight size={16} />
                </NeoButton>
              </motion.div>

              {/* Related Services/Technologies */}
              {((article.relatedServiceSlugs && article.relatedServiceSlugs.length > 0) ||
                (article.relatedTechSlugs && article.relatedTechSlugs.length > 0)) && (
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  className="mt-10 flex flex-wrap gap-3"
                >
                  {article.relatedServiceSlugs?.map((s) => (
                    <Link
                      key={s}
                      to={`/${currentLocale}/services/${s}`}
                      className="font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border-2 border-neo-black bg-neo-white hover:bg-neo-lime/20 hover:border-neo-lime transition-all"
                    >
                      {s.replace(/-/g, " ")}
                    </Link>
                  ))}
                  {article.relatedTechSlugs?.map((s) => (
                    <Link
                      key={s}
                      to={`/${currentLocale}/technologies/${s}`}
                      className="font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border border-neo-black/30 bg-neo-bg hover:border-neo-lime transition-all"
                    >
                      {s}
                    </Link>
                  ))}
                </motion.div>
              )}
            </article>
          </div>

          {/* Related Posts */}
          {relatedArticles.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="max-w-4xl mx-auto mt-16 pt-12 border-t-2 border-neo-black/10"
            >
              <h3 className="font-space font-bold text-xl text-neo-black mb-6 uppercase tracking-wider">
                {t("blog.relatedPosts", "More Articles")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedArticles.map((rp) => (
                  <motion.div key={rp.slug} variants={fadeInUp}>
                    <Link
                      to={`/${currentLocale}/blog/${rp.slug}`}
                      className="block border-2 border-neo-black bg-neo-white p-5 hover:shadow-hard hover:border-neo-lime transition-all duration-200 group"
                    >
                      <NeoBadge color={rp.accentColor}>{rp.category}</NeoBadge>
                      <h4 className="font-space font-bold text-sm text-neo-black mt-3 mb-2 group-hover:text-neo-black/80 leading-snug line-clamp-2">
                        {rp.title}
                      </h4>
                      <div className="flex items-center gap-2 font-mono text-[10px] text-neo-black/50">
                        <Clock size={10} />
                        {rp.readTime}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
