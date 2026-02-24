import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/animations";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
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
      <h2 className="font-space font-bold text-h2 text-neo-black">
        {title}
      </h2>
      <div className="w-16 h-1 bg-neo-black mt-4" />
    </motion.div>
  );
}
