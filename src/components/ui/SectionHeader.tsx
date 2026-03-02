import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/animations";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
  headingLevel?: 1 | 2 | 3;
}

export default function SectionHeader({
  title,
  subtitle,
  className = "",
  headingLevel = 2,
}: SectionHeaderProps) {
  const Tag = `h${headingLevel}` as "h1" | "h2" | "h3";
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={`mb-16 ${className}`}
    >
      <span className="inline-block font-mono text-xs font-bold tracking-[0.2em] text-neo-black mb-3 border-2 border-neo-black bg-neo-bg-alt px-3 py-1">
        {subtitle}
      </span>
      <Tag className="font-space font-bold text-h2 text-neo-black">
        {title}
      </Tag>
      <div className="w-16 h-1 bg-neo-black mt-4" />
    </motion.div>
  );
}
