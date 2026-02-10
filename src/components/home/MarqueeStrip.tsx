"use client";

import { useTranslations } from "next-intl";

export default function MarqueeStrip() {
  const t = useTranslations("marquee");
  const text = t("items");

  return (
    <div className="border-y-4 border-neo-black bg-neo-lime py-4 overflow-hidden pause-on-hover">
      <div className="marquee-track flex animate-marquee whitespace-nowrap">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-space font-bold text-lg lg:text-2xl uppercase tracking-wider text-neo-black px-4"
          >
            {text} &mdash;&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
