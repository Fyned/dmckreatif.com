import { useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  projectName: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  projectName,
}: BeforeAfterSliderProps) {
  const { t } = useTranslation();
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  return (
    <div className="border-2 border-neo-black bg-neo-white">
      <div className="flex items-center justify-between px-4 py-2 border-b-2 border-neo-black bg-neo-bg">
        <span className="font-mono text-xs font-bold text-neo-black uppercase tracking-wider">
          {t("portfolio.beforeAfter", "BEFORE / AFTER")}
        </span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-neo-black/60">
            {t("portfolio.dragToCompare", "DRAG TO COMPARE")}
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative aspect-[16/9] overflow-hidden cursor-col-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        role="slider"
        aria-label={t("portfolio.beforeAfterLabel", "Before and after comparison slider")}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
      >
        {/* After image (full width, behind) */}
        <img
          src={afterImage}
          alt={`${projectName} — ${t("portfolio.after", "After")}`}
          width={1200}
          height={675}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={beforeImage}
            alt={`${projectName} — ${t("portfolio.before", "Before")}`}
            width={1200}
            height={675}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ width: `${containerRef.current?.offsetWidth ?? 0}px`, maxWidth: "none" }}
            draggable={false}
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-neo-black z-10"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-2 border-neo-black bg-neo-white shadow-hard flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 3L2 8L5 13" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 3L14 8L11 13" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 z-10">
          <span className="font-mono text-[10px] font-bold text-neo-white bg-neo-black/80 px-2 py-1 uppercase tracking-wider">
            {t("portfolio.before", "Before")}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span className="font-mono text-[10px] font-bold text-neo-black bg-neo-lime px-2 py-1 uppercase tracking-wider border border-neo-black">
            {t("portfolio.after", "After")}
          </span>
        </div>
      </div>
    </div>
  );
}
