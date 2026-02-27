import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const CAMPAIGN_KEY = "dmc_campaign_start";
const CAMPAIGN_DAYS = 30;

function getCampaignEnd(): Date {
  let start = localStorage.getItem(CAMPAIGN_KEY);
  if (!start) {
    start = new Date().toISOString();
    localStorage.setItem(CAMPAIGN_KEY, start);
  }
  const end = new Date(start);
  end.setDate(end.getDate() + CAMPAIGN_DAYS);
  return end;
}

function getTimeLeft(end: Date) {
  const diff = end.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, min: 0, sec: 0, expired: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    min: Math.floor((diff % 3600000) / 60000),
    sec: Math.floor((diff % 60000) / 1000),
    expired: false,
  };
}

interface CountdownTimerProps {
  variant?: "large" | "compact" | "inline";
}

export default function CountdownTimer({ variant = "large" }: CountdownTimerProps) {
  const { t } = useTranslation();
  const [end] = useState(getCampaignEnd);
  const [time, setTime] = useState(() => getTimeLeft(end));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(end)), 1000);
    return () => clearInterval(id);
  }, [end]);

  if (time.expired) return null;

  const units = [
    { value: time.days, label: t("countdown.days", "DAYS") },
    { value: time.hours, label: t("countdown.hours", "HRS") },
    { value: time.min, label: t("countdown.min", "MIN") },
    { value: time.sec, label: t("countdown.sec", "SEC") },
  ];

  if (variant === "inline") {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold">
        {units.map((u, i) => (
          <span key={u.label}>
            <span className="text-neo-lime">{String(u.value).padStart(2, "0")}</span>
            <span className="text-neo-lime/50">{u.label}</span>
            {i < units.length - 1 && <span className="text-neo-lime/30 mx-0.5">:</span>}
          </span>
        ))}
      </span>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-1.5">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-1.5">
            <div className="bg-neo-lime border-2 border-neo-black px-2 py-1 min-w-[40px] text-center">
              <span className="font-space font-bold text-sm text-neo-black leading-none">
                {String(u.value).padStart(2, "0")}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="font-space font-bold text-neo-lime text-sm">:</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-2 sm:gap-3">
          <div className="bg-neo-lime border-2 border-neo-black shadow-hard-sm px-3 py-2 sm:px-4 sm:py-3 min-w-[52px] sm:min-w-[64px] text-center">
            <span className="font-space font-bold text-xl sm:text-2xl text-neo-black leading-none block">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] font-bold text-neo-black/60 uppercase tracking-wider block mt-0.5">
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="font-space font-bold text-neo-lime text-xl sm:text-2xl">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
