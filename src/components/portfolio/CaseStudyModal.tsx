"use client";

import { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function CaseStudyModal({
  project,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: CaseStudyModalProps) {
  const t = useTranslations();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-neo-black/80 backdrop-blur-sm overflow-y-auto py-8 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl border-4 border-neo-black bg-neo-white shadow-hard-xl"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b-2 border-neo-black bg-neo-bg">
              <span className="font-mono text-xs font-bold text-neo-black tracking-wider">
                {`PROJECT_${project.num}`}
              </span>
              <button
                onClick={onClose}
                className="p-1 border-2 border-neo-black hover:bg-neo-red hover:text-neo-white transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Browser preview */}
            {project.url && (
              <div className="border-b-2 border-neo-black">
                <div className="flex items-center gap-2 px-4 py-2 bg-neo-black/5 border-b border-neo-black/10">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 bg-neo-red border border-neo-black" />
                    <span className="w-3 h-3 bg-neo-yellow border border-neo-black" />
                    <span className="w-3 h-3 bg-neo-green border border-neo-black" />
                  </div>
                  <span className="font-mono text-xs text-neo-black/70 ml-2">
                    {project.url}
                  </span>
                </div>
                <div className="aspect-video bg-neo-bg">
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

            {/* Content */}
            <div className="p-6 lg:p-10 space-y-8">
              {/* Title + meta */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{project.flag}</span>
                  <NeoBadge color={project.accentColor}>{t(project.sectorKey)}</NeoBadge>
                  <span className="font-mono text-xs text-neo-black/60">{project.year}</span>
                </div>
                <h2 className="font-space font-bold text-3xl lg:text-4xl text-neo-black">
                  {project.name}
                </h2>
                <p className="font-mono text-sm text-neo-black/80 mt-2 leading-relaxed">
                  {t(project.descriptionKey)}
                </p>
              </div>

              {/* Challenge */}
              <div>
                <h3 className="font-mono text-xs font-bold text-neo-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-neo-black" />
                  {t("portfolio.challenge")}
                </h3>
                <p className="font-mono text-sm text-neo-black leading-relaxed">
                  {t(project.challengeKey)}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h3 className="font-mono text-xs font-bold text-neo-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-neo-black" />
                  {t("portfolio.solution")}
                </h3>
                <p className="font-mono text-sm text-neo-black leading-relaxed">
                  {t(project.solutionKey)}
                </p>
              </div>

              {/* Results metrics */}
              <div>
                <h3 className="font-mono text-xs font-bold text-neo-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-neo-black" />
                  {t("portfolio.results")}
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-2 border-neo-black p-4 text-center">
                    <div className="font-space font-bold text-2xl lg:text-3xl text-neo-black mb-1">
                      <AnimatedCounter target={project.metrics.lighthouse} suffix="+" />
                    </div>
                    <span className="font-mono text-xs font-bold text-neo-black/80 uppercase">
                      LIGHTHOUSE
                    </span>
                  </div>
                  <div className="border-2 border-neo-black p-4 text-center">
                    <div className="font-space font-bold text-2xl lg:text-3xl text-neo-black mb-1">
                      {project.metrics.loadTime}
                    </div>
                    <span className="font-mono text-xs font-bold text-neo-black/80 uppercase">
                      {t("portfolio.loadTime")}
                    </span>
                  </div>
                  <div className="border-2 border-neo-black p-4 text-center">
                    <div className="font-space font-bold text-2xl lg:text-3xl text-neo-black mb-1">
                      {project.metrics.improvement}
                    </div>
                    <span className="font-mono text-xs font-bold text-neo-black/80 uppercase">
                      {t("portfolio.improvement")}
                    </span>
                  </div>
                </div>

                {/* Result bullets */}
                <div className="mt-4 space-y-2">
                  {project.resultsKeys.map((key) => (
                    <div key={key} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-neo-lime mt-0.5 flex-shrink-0" />
                      <span className="font-mono text-sm text-neo-black">{t(key)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="font-mono text-xs font-bold text-neo-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-neo-black" />
                  {t("portfolio.techStack")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <NeoBadge key={tech} color="neo-lime">{tech}</NeoBadge>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              {project.testimonial && (
                <div className="border-2 border-neo-black bg-neo-bg p-6">
                  <h3 className="font-mono text-xs font-bold text-neo-black uppercase tracking-[0.2em] mb-3">
                    {t("portfolio.clientSays")}
                  </h3>
                  <p className="font-mono text-sm text-neo-black leading-relaxed italic mb-3">
                    &ldquo;{t(project.testimonial.quoteKey)}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-space font-bold text-sm text-neo-black">
                      {t(project.testimonial.nameKey)}
                    </span>
                    <span className="text-neo-black/60">—</span>
                    <span className="font-mono text-xs text-neo-black/80">
                      {t(project.testimonial.roleKey)}
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-neo-black">
                <div className="flex gap-3">
                  {project.url && (
                    <NeoButton href={project.url} external size="md" color="neo-lime">
                      {t("portfolio.visitSite")} <ExternalLink size={14} />
                    </NeoButton>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className="px-4 py-2 border-2 border-neo-black font-mono text-xs font-bold hover:bg-neo-yellow transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft size={14} className="inline mr-1" />
                    {t("portfolio.prevProject")}
                  </button>
                  <button
                    onClick={onNext}
                    disabled={!hasNext}
                    className="px-4 py-2 border-2 border-neo-black font-mono text-xs font-bold hover:bg-neo-yellow transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {t("portfolio.nextProject")}
                    <ArrowRight size={14} className="inline ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
