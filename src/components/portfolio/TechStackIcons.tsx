import { useTranslation } from "react-i18next";

const techColorMap: Record<string, { bg: string; text: string; border: string }> = {
  React:        { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-300" },
  Vite:         { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-300" },
  Tailwind:     { bg: "bg-cyan-50",   text: "text-cyan-700",   border: "border-cyan-300" },
  TypeScript:   { bg: "bg-blue-50",   text: "text-blue-800",   border: "border-blue-400" },
  "Next.js":    { bg: "bg-gray-100",  text: "text-gray-800",   border: "border-gray-400" },
  "Framer Motion": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-300" },
  "next-intl":  { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-300" },
  i18next:      { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-300" },
  Supabase:     { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-300" },
  Node:         { bg: "bg-green-50",  text: "text-green-800",  border: "border-green-400" },
  Firebase:     { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-300" },
  Stripe:       { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-300" },
};

const techIconMap: Record<string, string> = {
  React:        "\u269B",
  Vite:         "\u26A1",
  Tailwind:     "\u{1F3A8}",
  TypeScript:   "TS",
  "Next.js":    "N",
  "Framer Motion": "\u2728",
  "next-intl":  "\u{1F310}",
  i18next:      "\u{1F310}",
  Supabase:     "\u{1F5C4}",
  Node:         "\u{1F4E6}",
  Firebase:     "\u{1F525}",
  Stripe:       "\u{1F4B3}",
};

interface TechStackIconsProps {
  technologies: string[];
  variant?: "compact" | "detailed";
}

export default function TechStackIcons({ technologies, variant = "compact" }: TechStackIconsProps) {
  const { t } = useTranslation();

  if (variant === "detailed") {
    return (
      <div>
        <h3 className="font-mono text-xs font-bold text-neo-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
          <span className="w-8 h-0.5 bg-neo-black" />
          {t("portfolio.techStack")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => {
            const colors = techColorMap[tech];
            const icon = techIconMap[tech];
            return (
              <span
                key={tech}
                className={`inline-flex items-center gap-1.5 font-mono text-xs font-bold px-3 py-1.5 border-2 ${
                  colors
                    ? `${colors.bg} ${colors.text} ${colors.border}`
                    : "bg-neo-bg text-neo-black border-neo-black"
                }`}
              >
                {icon && <span className="text-sm">{icon}</span>}
                {tech}
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {technologies.map((tech) => {
        const colors = techColorMap[tech];
        const icon = techIconMap[tech];
        return (
          <span
            key={tech}
            className={`inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 border ${
              colors
                ? `${colors.bg} ${colors.text} ${colors.border}`
                : "text-neo-black border-neo-black"
            }`}
          >
            {icon && <span className="text-xs">{icon}</span>}
            {tech}
          </span>
        );
      })}
    </div>
  );
}
