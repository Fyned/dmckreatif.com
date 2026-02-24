interface NeoCardProps {
  children: React.ReactNode;
  color?: string;
  hover?: boolean;
  className?: string;
}

const bgMap: Record<string, string> = {
  "neo-lime": "hover:bg-neo-lime",
  "neo-yellow": "hover:bg-neo-yellow",
  "neo-pink": "hover:bg-neo-pink",
  "neo-blue": "hover:bg-neo-blue",
  "neo-green": "hover:bg-neo-green",
  "neo-purple": "hover:bg-neo-purple",
  "neo-orange": "hover:bg-neo-orange",
};

export default function NeoCard({
  children,
  color = "neo-lime",
  hover = true,
  className = "",
}: NeoCardProps) {
  const hoverBg = hover ? (bgMap[color] ?? "") : "";

  return (
    <div
      className={`bg-neo-white border-2 border-neo-black shadow-hard transition-all duration-300 ${hoverBg} ${hover ? "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
