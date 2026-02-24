import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

/** Vite plugin — generates rss.xml at build time */
function rssPlugin(): Plugin {
  return {
    name: "generate-rss",
    closeBundle: {
      sequential: true,
      async handler() {
        const mod = await import("./scripts/generate-rss.ts");
        const xml = mod.generateRSSXml();
        fs.writeFileSync(path.resolve(__dirname, "dist/rss.xml"), xml);
        // eslint-disable-next-line no-console
        console.log("✓ rss.xml generated");
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), rssPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          i18n: ["react-i18next", "i18next"],
          motion: ["framer-motion"],
          supabase: ["@supabase/supabase-js"],
          ui: ["react-helmet-async", "lucide-react"],
        },
      },
    },
  },
});
