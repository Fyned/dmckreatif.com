import { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowLeft, ArrowRight, CheckCircle2, Globe } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";
import NeoButton from "@/components/ui/NeoButton";
import NeoBadge from "@/components/ui/NeoBadge";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import BeforeAfterSlider from "@/components/portfolio/BeforeAfterSlider";
import TechStackIcons from "@/components/portfolio/TechStackIcons";

const accentGradientMap: Record<string, string> = {
  "neo-lime": "from-neo-lime/20 to-neo-lime/5",
  "neo-yellow": "from-neo-yellow/20 to-neo-yellow/5",
  "neo-blue": "from-neo-blue/20 to-neo-blue/5",
  "neo-pink": "from-neo-pink/20 to-neo-pink/5",
  "neo-purple": "from-neo-purple/20 to-neo-purple/5",
  "neo-green": "from-neo-green/20 to-neo-green/5",
  "neo-orange": "from-neo-orange/20 to-neo-orange/5",
};

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
  const { t } = useTranslation();

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

            {/* Browser-style preview */}
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
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative group/preview cursor-pointer overflow-hidden"
                >
                  {project.imageDesktop && project.imageMobile ? (
                    <>
                      <img
                        src={project.imageDesktop}
                        alt={`${project.name} — Desktop`}
                        className="hidden md:block w-full h-auto"
                      />
                      <img
                        src={project.imageMobile}
                        alt={`${project.name} — Mobile`}
                        className="block md:hidden w-full h-auto max-h-[60vh] object-cover object-top"
                      />
                    </>
                  ) : (
                    <div className={`aspect-[16/7] bg-gradient-to-br ${accentGradientMap[project.accentColor] ?? "from-neo-lime/20 to-neo-lime/5"} flex flex-col items-center justify-center gap-4`}>
                      <Globe size={48} className="text-neo-black/20" />
                      <span className="font-space font-bold text-2xl text-neo-black/30">
                        {project.name}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-neo-black/0 group-hover/preview:bg-neo-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="font-mono text-sm font-bold text-neo-white opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 border-2 border-neo-white px-6 py-3 bg-neo-black/60 backdrop-blur-sm">
                      {t("portfolio.visitSite")} <ExternalLink size={14} className="inline ml-1" />
                    </span>
                  </div>
                </a>
              </div>
            )}

            {/* Content */}
            <div className="p-6 lg:p-10 space-y-8">
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

              <div>
                <h3 className="font-mono text-xs font-bold text-neo-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-neo-black" />
                  {t("portfolio.challenge")}
                </h3>
                <p className="font-mono text-sm text-neo-black leading-relaxed">
                  {t(project.challengeKey)}
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs font-bold text-neo-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-neo-black" />
                  {t("portfolio.solution")}
                </h3>
                <p className="font-mono text-sm text-neo-black leading-relaxed">
                  {t(project.solutionKey)}
                </p>
              </div>

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
                    <span className="font-mono text-xs font-bold text-neo-black/80 uppercase">LIGHTHOUSE</span>
                  </div>
                  <div className="border-2 border-neo-black p-4 text-center">
                    <div className="font-space font-bold text-2xl lg:text-3xl text-neo-black mb-1">
                      {project.metrics.loadTime}
                    </div>
                    <span className="font-mono text-xs font-bold text-neo-black/80 uppercase">{t("portfolio.loadTime")}</span>
                  </div>
                  <div className="border-2 border-neo-black p-4 text-center">
                    <div className="font-space font-bold text-2xl lg:text-3xl text-neo-black mb-1">
                      {project.metrics.improvement}
                    </div>
                    <span className="font-mono text-xs font-bold text-neo-black/80 uppercase">{t("portfolio.improvement")}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {project.resultsKeys.map((key) => (
                    <div key={key} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-neo-lime mt-0.5 flex-shrink-0" />
                      <span className="font-mono text-sm text-neo-black">{t(key)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before/After Comparison */}
              {project.imageBefore && project.imageDesktop && (
                <BeforeAfterSlider
                  beforeImage={project.imageBefore}
                  afterImage={project.imageDesktop}
                  projectName={project.name}
                />
              )}

              <TechStackIcons technologies={project.tech} variant="detailed" />

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
