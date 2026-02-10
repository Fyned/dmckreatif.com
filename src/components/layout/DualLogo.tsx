"use client";

import { Link } from "@/i18n/navigation";

interface DualLogoProps {
  size?: "sm" | "md" | "lg";
}

export default function DualLogo({ size = "md" }: DualLogoProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <Link href="/" className="inline-flex flex-col">
      <span
        className={`font-space font-bold uppercase tracking-wider bg-neo-lime text-neo-black border-2 border-neo-black border-b-0 ${sizeClasses[size]}`}
      >
        DMC KREATIF
      </span>
      <span
        className={`font-space font-bold uppercase tracking-wider bg-neo-white text-neo-black border-2 border-neo-black ${sizeClasses[size]}`}
      >
        GMG DESIGN
      </span>
    </Link>
  );
}
