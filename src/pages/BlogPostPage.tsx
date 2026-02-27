import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import JsonLd from "@/components/seo/JsonLd";
import { buildBlogPostingSchema } from "@/lib/seo-schemas";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ArrowRight, Code2 } from "lucide-react";
import NeoBadge from "@/components/ui/NeoBadge";
import NeoButton from "@/components/ui/NeoButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ShareButtons from "@/components/ui/ShareButtons";
import { blogPosts } from "@/lib/blog-data";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

export default function BlogPostPage() {
  const { t } = useTranslation();
  const { locale, slug } = useParams<{ locale: string; slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="py-20 lg:py-32">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <div className="border-2 border-neo-black bg-neo-white shadow-hard p-12 max-w-xl mx-auto">
            <span className="font-mono text-6xl font-bold text-neo-black block mb-4">
              404
            </span>
            <h1 className="font-space font-bold text-2xl text-neo-black mb-4">
              {t("blog.notFound", "Post not found")}
            </h1>
            <p className="font-mono text-sm text-neo-black/60 mb-8">
              {t(
                "blog.notFoundDescription",
                "The blog post you are looking for does not exist or has been moved."
              )}
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

  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentLocale = locale ?? "en";
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <SeoHead
        title={`${t(`blog.${post.titleKey}`, post.titleKey)} — DMC Kreatif`}
        description={t(`blog.${post.excerptKey}`, post.excerptKey)}
        path={`/blog/${post.slug}`}
      />
      <JsonLd
        data={buildBlogPostingSchema({
          title: t(`blog.${post.titleKey}`, post.titleKey),
          description: t(`blog.${post.excerptKey}`, post.excerptKey),
          datePublished: post.date,
          slug: post.slug,
          locale: currentLocale,
        })}
      />

      <Breadcrumbs
        items={[
          { label: t("nav.blog", "BLOG"), href: `/${locale ?? "en"}/blog` },
          { label: t(`blog.${post.titleKey}`, post.titleKey) },
        ]}
      />

      <section className="py-20 lg:py-32">
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
              to={`/${locale ?? "en"}/blog`}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neo-black uppercase tracking-wider hover:text-neo-lime transition-colors border-b-2 border-neo-black hover:border-neo-lime pb-1"
            >
              <ArrowLeft size={14} />
              {t("blog.backToBlog", "Back to Blog")}
            </Link>
          </motion.div>

          <article className="max-w-3xl mx-auto">
            {/* Post header */}
            <motion.header
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="mb-12 border-b-2 border-neo-black pb-8"
            >
              <div className="mb-4">
                <NeoBadge color={post.accentColor}>{post.category}</NeoBadge>
              </div>

              <h1 className="font-space font-bold text-3xl lg:text-4xl text-neo-black mb-6 leading-tight">
                {t(`blog.${post.titleKey}`, post.titleKey)}
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 font-mono text-xs text-neo-black/60">
                  <time dateTime={post.date}>{formattedDate}</time>
                  <span>*</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>
                <ShareButtons
                  url={`/${currentLocale}/blog/${post.slug}`}
                  title={t(`blog.${post.titleKey}`, post.titleKey)}
                  description={t(`blog.${post.excerptKey}`, post.excerptKey)}
                />
              </div>
            </motion.header>

            {/* Post content */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="font-mono text-sm text-neo-black leading-relaxed space-y-6 mb-16 [&_h2]:font-space [&_h2]:font-bold [&_h2]:text-xl [&_h2]:text-neo-black [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-space [&_h3]:font-bold [&_h3]:text-lg [&_h3]:text-neo-black [&_h3]:mt-8 [&_h3]:mb-3 [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_a]:text-neo-lime [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:border-l-4 [&_blockquote]:border-neo-lime [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neo-black/70"
            >
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: t(`blog.${post.contentKey}`, post.contentKey) }}
              />
            </motion.div>

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
                <a href="https://www.linkedin.com/in/musakeremdemirci" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 font-mono text-xs font-bold text-neo-black hover:text-neo-lime transition-colors">
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
                {t(
                  "blog.ctaDescription",
                  "Let's discuss how we can help your business grow with a premium web presence."
                )}
              </p>
              <NeoButton href={`/${locale ?? "en"}/contact`} color="neo-lime" size="lg">
                {t("blog.ctaButton", "Get in touch")}
                <ArrowRight size={16} />
              </NeoButton>
            </motion.div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
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
                {relatedPosts.map((rp) => (
                  <motion.div key={rp.slug} variants={fadeInUp}>
                    <Link
                      to={`/${currentLocale}/blog/${rp.slug}`}
                      className="block border-2 border-neo-black bg-neo-white p-5 hover:shadow-hard hover:border-neo-lime transition-all duration-200 group"
                    >
                      <NeoBadge color={rp.accentColor}>{rp.category}</NeoBadge>
                      <h4 className="font-space font-bold text-sm text-neo-black mt-3 mb-2 group-hover:text-neo-black/80 leading-snug line-clamp-2">
                        {t(`blog.${rp.titleKey}`, rp.titleKey)}
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
