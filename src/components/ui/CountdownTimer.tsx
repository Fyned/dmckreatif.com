import { useState, useEffect } from "react";

const CYCLE_DAYS = 4;
const EPOCH = new Date("2026-01-01T00:00:00").getTime();
const CYCLE_MS = CYCLE_DAYS * 24 * 60 * 60 * 1000;

function getNextCycleEnd(): Date {
  const now = Date.now();
  const elapsed = now - EPOCH;
  const currentCycleStart = EPOCH + Math.floor(elapsed / CYCLE_MS) * CYCLE_MS;
  return new Date(currentCycleStart + CYCLE_MS);
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface CountdownTimerProps {
  labels?: { days: string; hours: string; min: string; sec: string };
  size?: "sm" | "md" | "lg" | "xs";
}

export default function CountdownTimer({
  labels = { days: "DAYS", hours: "HRS", min: "MIN", sec: "SEC" },
  size = "md",
}: CountdownTimerProps) {
  const [target, setTarget] = useState(getNextCycleEnd);
  const [time, setTime] = useState(() => calcTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => {
      const t = calcTimeLeft(target);
      if (t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0) {
        const next = getNextCycleEnd();
        setTarget(next);
        setTime(calcTimeLeft(next));
      } else {
        setTime(t);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const sizeClasses = {
    xs: { box: "w-8 h-8", num: "text-xs", label: "text-[6px]", sep: "text-sm" },
    sm: { box: "w-10 h-10", num: "text-sm", label: "text-[8px]", sep: "text-base" },
    md: { box: "w-14 h-14", num: "text-xl", label: "text-[9px]", sep: "text-lg" },
    lg: { box: "w-18 h-18 lg:w-20 lg:h-20", num: "text-2xl lg:text-3xl", label: "text-[10px]", sep: "text-xl" },
  };

  const s = sizeClasses[size];

  const blocks: Array<{ value: number; label: string }> = [
    { value: time.days, label: labels.days },
    { value: time.hours, label: labels.hours },
    { value: time.minutes, label: labels.min },
    { value: time.seconds, label: labels.sec },
  ];

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {blocks.map((block, i) => (
        <div key={block.label} className="flex items-center gap-1.5 sm:gap-2">
          <div
            className={`${s.box} bg-neo-black border-2 border-neo-lime flex flex-col items-center justify-center shadow-hard-sm`}
          >
            <span className={`font-space font-bold ${s.num} text-neo-lime leading-none tabular-nums`}>
              {pad(block.value)}
            </span>
            <span className={`font-mono ${s.label} text-neo-lime/70 uppercase tracking-widest leading-none mt-0.5`}>
              {block.label}
            </span>
          </div>
          {i < blocks.length - 1 && (
            <span className={`font-space font-bold text-neo-lime ${s.sep} leading-none`}>:</span>
          )}
        </div>
      ))}
    </div>
  );
}
