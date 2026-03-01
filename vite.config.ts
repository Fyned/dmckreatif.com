import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";

/** Vite plugin — generates rss.xml at build time */
function rssPlugin(): Plugin {
  return {
    name: "generate-rss",
    closeBundle: {
      sequential: true,
      order: "pre" as const,
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

/** Vite plugin — pre-renders pages with Puppeteer after build */
function prerenderPlugin(): Plugin {
  return {
    name: "prerender-pages",
    closeBundle: {
      sequential: true,
      order: "post" as const,
      async handler() {
        if (process.env.SKIP_PRERENDER === "1") return;
        try {
          require.resolve("puppeteer");
        } catch {
          // eslint-disable-next-line no-console
          console.log("⚠ puppeteer not installed, skipping pre-render");
          return;
        }
        // eslint-disable-next-line no-console
        console.log("\n⏳ Pre-rendering pages...");
        try {
          execSync("node scripts/prerender.cjs", {
            cwd: __dirname,
            stdio: "inherit",
            timeout: 300000,
          });
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("⚠ Pre-render failed (non-blocking):", (err as Error).message);
        }
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), rssPlugin(), prerenderPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react-router-dom") || (id.includes("/react/") && !id.includes("react-")))
              return "vendor";
            if (id.includes("i18next") || id.includes("react-i18next")) return "i18n";
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("@supabase")) return "supabase";
            if (id.includes("react-helmet-async")) return "ui";
            if (id.includes("lucide-react")) return "ui";
            if (id.includes("react-hook-form") || id.includes("zod") || id.includes("@hookform")) return "forms";
            if (id.includes("grapesjs")) return "grapesjs";
          }
          if (id.includes("locales/en-services.json")) return "locale-en-services";
          if (id.includes("locales/en-tech.json")) return "locale-en-tech";
          if (id.includes("locales/en-industries.json")) return "locale-en-industries";
          if (id.includes("locales/en-cities.json")) return "locale-en-cities";
          if (id.includes("locales/en-seo.json")) return "locale-en-seo";
          if (id.includes("data/services/")) return "data-services";
          if (id.includes("data/technologies/")) return "data-tech";
          if (id.includes("data/industries/")) return "data-industries";
          if (id.includes("data/blog/articles")) return "data-blog";
          if (id.includes("data/cities/")) return "data-cities";
        },
      },
    },
  },
});
