"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { blogPosts } from "@/lib/blog-data";
import NeoBadge from "@/components/ui/NeoBadge";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const accentMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime",
  "neo-yellow": "bg-neo-yellow",
  "neo-blue": "bg-neo-blue",
  "neo-pink": "bg-neo-pink",
  "neo-green": "bg-neo-green",
};

export default function BlogPage() {
  const t = useTranslations("blog");

  return (
    <div className="py-section-sm lg:py-section">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <span className="inline-block font-mono text-xs font-bold tracking-[0.2em] text-neo-black mb-3 border-2 border-neo-black bg-neo-bg-alt px-3 py-1">
            {t("sectionSubtitle")}
          </span>
          <h1 className="font-space font-bold text-h1 text-neo-black">
            {t("sectionTitle")}
          </h1>
          <div className="w-16 h-1 bg-neo-black mt-4" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.slug} variants={fadeInUp}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block border-2 border-neo-black bg-neo-white shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all duration-200"
              >
                <div className={`h-2 ${accentMap[post.accentColor] ?? "bg-neo-lime"}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <NeoBadge color={post.accentColor}>
                      {post.category}
                    </NeoBadge>
                    <span className="font-mono text-xs text-neo-black/70">
                      {post.date}
                    </span>
                  </div>
                  <h2 className="font-space font-bold text-base mb-3 group-hover:text-neo-blue transition-colors">
                    {t(post.titleKey)}
                  </h2>
                  <p className="font-mono text-sm text-neo-black/80 leading-relaxed mb-4 line-clamp-3">
                    {t(post.excerptKey)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-neo-black/60 uppercase">
                      {t("readTime")}: {post.readTime}
                    </span>
                    <span className="font-mono text-xs font-bold text-neo-black group-hover:text-neo-blue transition-colors flex items-center gap-1">
                      {t("readMore")} <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
