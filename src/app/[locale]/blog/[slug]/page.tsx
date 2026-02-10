"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import { fadeInUp } from "@/lib/animations";

export default function BlogPostPage() {
  const t = useTranslations("blog");
  const params = useParams();
  const slug = params.slug as string;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="py-section-sm lg:py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
          <h1 className="font-space font-bold text-h2 mb-4">POST NOT FOUND</h1>
          <NeoButton href="/blog" variant="outline">
            <ArrowLeft size={14} /> {t("backToBlog")}
          </NeoButton>
        </div>
      </div>
    );
  }

  return (
    <div className="py-section-sm lg:py-section">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <NeoButton href="/blog" variant="ghost" size="sm" className="mb-8">
            <ArrowLeft size={14} /> {t("backToBlog")}
          </NeoButton>

          <div className="flex items-center gap-3 mb-6">
            <NeoBadge color={post.accentColor}>{post.category}</NeoBadge>
            <span className="font-mono text-xs text-neo-black/70">
              {post.date}
            </span>
            <span className="font-mono text-xs text-neo-black/70">
              {t("readTime")}: {post.readTime}
            </span>
          </div>

          <h1 className="font-space font-bold text-h1 mb-8">
            {t(post.titleKey)}
          </h1>

          <div className="border-2 border-neo-black bg-neo-white p-8 lg:p-12 shadow-hard-lg">
            <p className="font-mono text-sm text-neo-black leading-relaxed whitespace-pre-line">
              {t(post.contentKey)}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
