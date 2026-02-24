import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular" | "card";
  width?: string;
  height?: string;
  lines?: number;
}

function SkeletonBase({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`bg-neo-black/5 border border-neo-black/10 ${className}`}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function Skeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const style = {
    width: width ?? undefined,
    height: height ?? undefined,
  };

  if (variant === "text") {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }, (_, i) => (
          <SkeletonBase
            key={i}
            className={`h-4 ${i === lines - 1 ? "w-3/4" : "w-full"}`}
          />
        ))}
      </div>
    );
  }

  if (variant === "circular") {
    return (
      <SkeletonBase
        className={`rounded-full ${className}`}
        />
    );
  }

  if (variant === "card") {
    return (
      <div
        className={`border-2 border-neo-black/10 bg-neo-white shadow-hard p-6 ${className}`}
        style={style}
      >
        <SkeletonBase className="h-40 w-full mb-4" />
        <SkeletonBase className="h-5 w-3/4 mb-3" />
        <SkeletonBase className="h-4 w-full mb-2" />
        <SkeletonBase className="h-4 w-5/6 mb-4" />
        <SkeletonBase className="h-10 w-1/3" />
      </div>
    );
  }

  return <SkeletonBase className={className} />;
}

/* ── Pre-built Skeleton Layouts ── */

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} variant="card" />
      ))}
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="max-w-container mx-auto px-6 lg:px-10 py-20">
      {/* Header */}
      <div className="mb-12">
        <SkeletonBase className="h-3 w-24 mb-4" />
        <SkeletonBase className="h-8 w-1/2 mb-3" />
        <SkeletonBase className="h-5 w-2/3" />
      </div>

      {/* Content grid */}
      <SkeletonGrid count={6} />
    </div>
  );
}

export function SkeletonBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <SkeletonBase className="h-3 w-32 mb-4" />
      <SkeletonBase className="h-10 w-3/4 mb-6" />
      <SkeletonBase className="h-64 w-full mb-8" />
      <Skeleton variant="text" lines={4} className="mb-4" />
      <Skeleton variant="text" lines={3} className="mb-4" />
      <Skeleton variant="text" lines={5} />
    </div>
  );
}
