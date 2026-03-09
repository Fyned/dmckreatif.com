interface CountryFlagProps {
  code: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_MAP = {
  sm: { w: 16, h: 12, src: "w20", srcSet: "w40" },
  md: { w: 20, h: 15, src: "w20", srcSet: "w40" },
  lg: { w: 24, h: 18, src: "w40", srcSet: "w80" },
  xl: { w: 32, h: 24, src: "w40", srcSet: "w80" },
};

const LABEL_MAP: Record<string, string> = {
  fr: "France",
  be: "Belgium",
  gb: "United Kingdom",
  nl: "Netherlands",
  de: "Germany",
  ch: "Switzerland",
  es: "Spain",
  dk: "Denmark",
  se: "Sweden",
  at: "Austria",
  no: "Norway",
  lu: "Luxembourg",
  tr: "Turkey",
  globe: "International",
};

export default function CountryFlag({ code, size = "lg", className = "" }: CountryFlagProps) {
  const s = SIZE_MAP[size];
  const iso = code.toLowerCase();

  if (iso === "globe") {
    return (
      <span className={`inline-flex items-center justify-center ${className}`} role="img" aria-label="International">
        🌍
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/${s.src}/${iso}.png`}
      srcSet={`https://flagcdn.com/${s.srcSet}/${iso}.png 2x`}
      width={s.w}
      height={s.h}
      alt={LABEL_MAP[iso] ?? iso.toUpperCase()}
      className={`inline-block border border-neo-black/10 ${className}`}
      loading="lazy"
    />
  );
}
