import { Link, useParams } from "react-router-dom";

interface NeoButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  color?: string;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
  className?: string;
}

const colorMap: Record<string, { bg: string; shadow: string }> = {
  "neo-lime": { bg: "bg-neo-lime", shadow: "shadow-hard" },
  "neo-yellow": { bg: "bg-neo-yellow", shadow: "shadow-hard-yellow" },
  "neo-pink": { bg: "bg-neo-pink", shadow: "shadow-hard-pink" },
  "neo-blue": { bg: "bg-neo-blue", shadow: "shadow-hard-blue" },
  "neo-green": { bg: "bg-neo-green", shadow: "shadow-hard-green" },
  "neo-purple": { bg: "bg-neo-purple", shadow: "shadow-hard-purple" },
};

export default function NeoButton({
  children,
  href,
  onClick,
  variant = "primary",
  color = "neo-lime",
  size = "md",
  type = "button",
  disabled = false,
  external = false,
  className = "",
}: NeoButtonProps) {
  const { locale } = useParams();
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const colorConfig = colorMap[color] ?? colorMap["neo-lime"];

  const variantClasses = {
    primary: `${colorConfig.bg} ${colorConfig.shadow} text-neo-black border-2 border-neo-black font-bold uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none`,
    outline: `bg-transparent shadow-hard text-neo-black border-2 border-neo-black font-bold uppercase tracking-wider hover:${colorConfig.bg} hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none`,
    ghost: `bg-transparent text-neo-black font-bold uppercase tracking-wider hover:underline underline-offset-4 decoration-2`,
  };

  const baseClasses = `inline-flex items-center justify-center gap-2 font-space transition-all duration-150 focus-visible:outline-2 focus-visible:outline-neo-lime focus-visible:outline-offset-2 ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`;

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {children}
      </a>
    );
  }

  if (href) {
    // Guard against double-locale: don't prefix if href already starts with a supported locale
    const supportedLocales = ["en", "fr", "nl", "de"];
    const alreadyLocalized = supportedLocales.some(
      (l) => href.startsWith(`/${l}/`) || href === `/${l}`
    );
    const to = href.startsWith("http")
      ? href
      : alreadyLocalized
        ? href
        : `/${locale ?? "en"}${href}`;
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
