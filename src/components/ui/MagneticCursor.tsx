import { useEffect, useRef } from "react";

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = -100;
    let ringY = -100;
    let dotX = -100;
    let dotY = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, select, textarea, [data-cursor='pointer']");
      if (interactive) {
        ring.classList.add("cursor-ring--hover");
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, select, textarea, [data-cursor='pointer']");
      if (interactive) {
        ring.classList.remove("cursor-ring--hover");
      }
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;

      dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;

      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    animate();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 bg-[#CDFF50] border border-black/20 rounded-full will-change-transform hidden [@media(pointer:fine)]:block"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed top-0 left-0 z-[9998] w-10 h-10 border-2 border-[#CDFF50]/60 rounded-full will-change-transform transition-[width,height,border-color,opacity] duration-200 hidden [@media(pointer:fine)]:block"
        aria-hidden="true"
      />
      <style>{`
        @media (pointer: fine) {
          body { cursor: none !important; }
          a, button, [role="button"], input, select, textarea { cursor: none !important; }
        }
        .cursor-ring--hover {
          width: 3rem !important;
          height: 3rem !important;
          border-color: rgba(205, 255, 80, 1) !important;
        }
      `}</style>
    </>
  );
}
