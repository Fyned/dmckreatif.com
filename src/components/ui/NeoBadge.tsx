interface NeoBadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

const bgColorMap: Record<string, string> = {
  "neo-lime": "bg-neo-lime",
  "neo-yellow": "bg-neo-yellow",
  "neo-pink": "bg-neo-pink",
  "neo-blue": "bg-neo-blue text-neo-white",
  "neo-green": "bg-neo-green",
  "neo-purple": "bg-neo-purple text-neo-white",
  "neo-orange": "bg-neo-orange",
  "neo-red": "bg-neo-red text-neo-white",
};

export default function NeoBadge({
  children,
  color = "neo-lime",
  className = "",
}: NeoBadgeProps) {
  const bgColor = bgColorMap[color] ?? "bg-neo-lime";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider border-2 border-neo-black ${bgColor} ${className}`}
    >
      {children}
    </span>
  );
}
