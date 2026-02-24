import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageOff } from "lucide-react";

interface TemplatePreviewGalleryProps {
  images: string[];
  name: string;
}

export default function TemplatePreviewGallery({
  images,
  name,
}: TemplatePreviewGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  /* No images — placeholder */
  if (images.length === 0) {
    return (
      <div className="border-2 border-neo-black bg-neo-bg aspect-video flex items-center justify-center">
        <div className="text-center">
          <ImageOff size={48} className="mx-auto mb-3 text-neo-black/30" />
          <span className="font-space font-bold text-lg text-neo-black/40 uppercase">
            {name}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="border-2 border-neo-black overflow-hidden bg-neo-bg">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[selectedIndex]}
            src={images[selectedIndex]}
            alt={`${name} - Preview ${selectedIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full aspect-video object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => handleThumbnailClick(index)}
              className={`shrink-0 w-20 h-[60px] border-2 overflow-hidden transition-all duration-150 ${
                index === selectedIndex
                  ? "border-neo-lime ring-2 ring-neo-lime ring-offset-1"
                  : "border-neo-black hover:border-neo-lime/50"
              }`}
            >
              <img
                src={src}
                alt={`${name} - Thumbnail ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
