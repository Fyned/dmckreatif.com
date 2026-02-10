"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";
import NeoBadge from "@/components/ui/NeoBadge";
import NeoButton from "@/components/ui/NeoButton";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const t = useTranslations("portfolio");

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neo-black/60"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-neo-white border-4 border-neo-black shadow-hard-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b-4 border-neo-black bg-neo-bg">
              <div>
                <NeoBadge color={project.accentColor}>
                  {project.flag} {project.countryName}
                </NeoBadge>
                <h2 className="font-space font-bold text-h3 mt-3">
                  {project.name}
                </h2>
                <p className="font-mono text-xs text-neo-black/80 uppercase tracking-wider mt-1">
                  {project.sector}
                </p>
              </div>
              <button
                onClick={onClose}
                className="border-2 border-neo-black p-2 hover:bg-neo-red hover:text-neo-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Preview */}
            {project.url && (
              <div className="border-b-4 border-neo-black">
                <div className="bg-neo-black px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 bg-neo-red border border-neo-black" />
                    <span className="w-3 h-3 bg-neo-yellow border border-neo-black" />
                    <span className="w-3 h-3 bg-neo-green border border-neo-black" />
                  </div>
                  <span className="font-mono text-xs text-neo-bg/70 ml-2">
                    {project.url}
                  </span>
                </div>
                <div className="aspect-video">
                  <iframe
                    src={project.url}
                    title={project.name}
                    className="w-full h-full border-0"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            )}

            {/* Details */}
            <div className="p-6">
              <p className="font-mono text-sm text-neo-black/80 leading-relaxed mb-6">
                {project.description}
              </p>

              <h4 className="font-space font-bold text-sm uppercase tracking-wider mb-3">
                {t("techStack")}
              </h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <NeoBadge key={tech} color="neo-lime">
                    {tech}
                  </NeoBadge>
                ))}
              </div>

              {project.url && (
                <NeoButton href={project.url} external size="md" color="neo-lime">
                  {t("visitSite")} <ExternalLink size={14} />
                </NeoButton>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
