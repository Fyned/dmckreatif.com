/**
 * Post-build pre-rendering script for dmckreatif.com
 *
 * Serves the built dist/ folder via a minimal Node HTTP server,
 * then uses Puppeteer to crawl critical pages and write static
 * HTML snapshots back into dist/ so that search engines can
 * index the content without executing JavaScript.
 *
 * Usage:  node scripts/prerender.cjs
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const DIST = path.resolve(__dirname, "..", "dist");
const SITEMAP = path.resolve(__dirname, "..", "public", "sitemap.xml");
const SITE_ORIGIN = "https://dmckreatif.com";
const PORT = 4173;
const CONCURRENCY = 4;
const PAGE_TIMEOUT = 30000;
const MAX_URLS = 650;

// MIME types for the static server
const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

// Priority routes (rendered first, guaranteed inclusion)
const PRIORITY_ROUTES = [
  "/en",
  "/en/services",
  "/en/technologies",
  "/en/industries",
  "/en/portfolio",
  "/en/pricing",
  "/en/about",
  "/en/blog",
  "/en/contact",
  "/en/case-studies",
  "/en/templates",
  "/fr",
  "/fr/services",
  "/nl",
  "/nl/services",
  "/de",
  "/de/services",
];

// ── Helpers ──────────────────────────────────────────────────

function parseSitemapUrls() {
  if (!fs.existsSync(SITEMAP)) {
    console.log("  sitemap.xml not found, using priority routes only");
    return [];
  }
  const xml = fs.readFileSync(SITEMAP, "utf-8");
  const urls = [];
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    const url = match[1].trim();
    if (url.startsWith(SITE_ORIGIN)) {
      const pathname = url.replace(SITE_ORIGIN, "") || "/";
      urls.push(pathname);
    }
  }
  return [...new Set(urls)];
}

function buildRouteList() {
  const sitemapRoutes = parseSitemapUrls();
  const seen = new Set();
  const result = [];

  // Priority routes first
  for (const r of PRIORITY_ROUTES) {
    if (!seen.has(r)) {
      seen.add(r);
      result.push(r);
    }
  }

  // Then sitemap routes (EN pages first, then FR, NL, DE)
  const localeOrder = ["/en", "/fr", "/nl", "/de"];
  const sorted = sitemapRoutes.sort((a, b) => {
    const aIdx = localeOrder.findIndex((l) => a.startsWith(l));
    const bIdx = localeOrder.findIndex((l) => b.startsWith(l));
    const aPri = aIdx === -1 ? 99 : aIdx;
    const bPri = bIdx === -1 ? 99 : bIdx;
    if (aPri !== bPri) return aPri - bPri;
    // Shorter paths (listing pages) before deeper ones
    return a.split("/").length - b.split("/").length;
  });

  for (const r of sorted) {
    if (!seen.has(r) && result.length < MAX_URLS) {
      seen.add(r);
      result.push(r);
    }
  }

  return result;
}

function createStaticServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const parsed = new URL(req.url, `http://localhost:${PORT}`);
      let filePath = path.join(DIST, decodeURIComponent(parsed.pathname));

      // If path is a directory, try index.html inside it
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }

      // If file doesn't exist, fall back to SPA index.html
      if (!fs.existsSync(filePath)) {
        filePath = path.join(DIST, "index.html");
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME[ext] || "application/octet-stream";

      try {
        const data = fs.readFileSync(filePath);
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end("Not Found");
      }
    });

    server.listen(PORT, () => {
      resolve(server);
    });
  });
}

async function renderPage(browser, route) {
  const page = await browser.newPage();
  const url = `http://localhost:${PORT}${route}`;

  try {
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent(
      "Mozilla/5.0 (compatible; DMCPrerenderer/1.0; +https://dmckreatif.com)"
    );

    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: PAGE_TIMEOUT,
    });

    // Wait a bit for React hydration + helmet to inject meta tags
    await page.waitForFunction(
      () => document.querySelector("h1") !== null || document.title !== "",
      { timeout: 5000 }
    ).catch(() => {});

    let html = await page.content();

    // Replace localhost URLs with production URLs
    html = html.replace(
      new RegExp(`http://localhost:${PORT}`, "g"),
      SITE_ORIGIN
    );

    // Determine output path: /en -> dist/en/index.html
    const clean = route.replace(/\/$/, "") || "/index";
    const outDir = path.join(DIST, clean);
    const outFile = path.join(outDir, "index.html");

    // Don't overwrite the root index.html (SPA fallback)
    if (clean === "" || clean === "/") {
      // Write to dist/index-prerendered.html as backup, but also
      // we need the root for SPA fallback, so write a copy
      const rootOut = path.join(DIST, "en", "index.html");
      if (route === "/en") {
        fs.mkdirSync(path.dirname(rootOut), { recursive: true });
        fs.writeFileSync(rootOut, html, "utf-8");
      }
    } else {
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outFile, html, "utf-8");
    }

    return { route, status: "ok" };
  } catch (err) {
    return { route, status: "error", message: err.message };
  } finally {
    await page.close();
  }
}

async function runWithConcurrency(tasks, limit) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const p = task().then((r) => {
      executing.delete(p);
      return r;
    });
    executing.add(p);
    results.push(p);

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

// ── Main ─────────────────────────────────────────────────────

async function main() {
  const startTime = Date.now();

  // Check dist/ exists
  if (!fs.existsSync(DIST)) {
    console.error("ERROR: dist/ not found. Run `npm run build` first.");
    process.exit(1);
  }

  // Backup original SPA index.html
  const spaIndex = path.join(DIST, "index.html");
  const spaBackup = path.join(DIST, "_spa.html");
  if (fs.existsSync(spaIndex) && !fs.existsSync(spaBackup)) {
    fs.copyFileSync(spaIndex, spaBackup);
  }

  console.log("=== DMC Kreatif Pre-renderer ===\n");

  // Build route list
  const routes = buildRouteList();
  console.log(`Routes to render: ${routes.length} (max ${MAX_URLS})\n`);

  // Start static server
  const server = await createStaticServer();
  console.log(`Static server running on http://localhost:${PORT}\n`);

  // Launch Puppeteer
  let puppeteer;
  try {
    puppeteer = require("puppeteer");
  } catch {
    console.error(
      "ERROR: puppeteer not installed.\n" +
        "Run: npm install --save-dev puppeteer"
    );
    server.close();
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  console.log("Puppeteer launched, rendering pages...\n");

  // Build task list
  const tasks = routes.map(
    (route) => () => renderPage(browser, route)
  );

  // Execute with concurrency limit
  const results = await runWithConcurrency(tasks, CONCURRENCY);

  // Cleanup
  await browser.close();
  server.close();

  // Restore SPA fallback — .htaccess handles SPA routing,
  // but keep original index.html intact for non-prerendered routes
  if (fs.existsSync(spaBackup)) {
    fs.copyFileSync(spaBackup, spaIndex);
  }

  // Report
  const ok = results.filter((r) => r.status === "ok");
  const errors = results.filter((r) => r.status === "error");
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n=== Pre-render Report ===");
  console.log(`Total:    ${results.length}`);
  console.log(`Success:  ${ok.length}`);
  console.log(`Errors:   ${errors.length}`);
  console.log(`Duration: ${elapsed}s\n`);

  if (errors.length > 0) {
    console.log("Failed routes:");
    for (const e of errors) {
      console.log(`  ${e.route} — ${e.message}`);
    }
    console.log();
  }

  console.log(`Pre-rendered HTML files written to dist/`);
  console.log(`SPA fallback preserved at dist/index.html`);
}

main().catch((err) => {
  console.error("Pre-render failed:", err);
  process.exit(1);
});
