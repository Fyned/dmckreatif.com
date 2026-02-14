import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, "../public/portfolio");

const sites = [
  { id: "idhome", url: "https://idhome-travaux.fr" },
  { id: "mkn", url: "https://mkntechnisch.com" },
];

const WAIT_MS = 10000;

async function dismissCookieBanner(page) {
  const selectors = [
    'button:has-text("Refuser")',
    'button:has-text("Accepter")',
    'button:has-text("Tout refuser")',
    'button:has-text("Tout accepter")',
    'button:has-text("Accept")',
    'button:has-text("Reject")',
    'button:has-text("OK")',
    '[class*="cookie"] button',
    '[class*="consent"] button',
  ];
  for (const sel of selectors) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 500 })) {
        await btn.click({ timeout: 1000 });
        console.log(`  🍪 Dismissed cookie banner via: ${sel}`);
        await page.waitForTimeout(500);
        return;
      }
    } catch { /* skip */ }
  }
  console.log("  ℹ️ No cookie banner found");
}

async function captureSite(browser, site) {
  console.log(`\n📸 Capturing ${site.id} — ${site.url}`);

  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const desktopPage = await desktopCtx.newPage();
  try {
    await desktopPage.goto(site.url, { waitUntil: "networkidle", timeout: 30000 });
  } catch {
    console.log(`  ⚠️ Timeout for ${site.url}, continuing...`);
  }
  await desktopPage.waitForTimeout(3000);
  await dismissCookieBanner(desktopPage);
  await desktopPage.waitForTimeout(WAIT_MS);
  const desktopPath = path.join(outputDir, `${site.id}-desktop.webp`);
  await desktopPage.screenshot({ path: desktopPath, type: "jpeg", quality: 90 });
  console.log(`  ✅ Desktop saved: ${desktopPath}`);
  await desktopCtx.close();

  const mobileCtx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });
  const mobilePage = await mobileCtx.newPage();
  try {
    await mobilePage.goto(site.url, { waitUntil: "networkidle", timeout: 30000 });
  } catch {
    console.log(`  ⚠️ Timeout for mobile ${site.url}, continuing...`);
  }
  await mobilePage.waitForTimeout(3000);
  await dismissCookieBanner(mobilePage);
  await mobilePage.waitForTimeout(WAIT_MS);
  const mobilePath = path.join(outputDir, `${site.id}-mobile.webp`);
  await mobilePage.screenshot({ path: mobilePath, type: "jpeg", quality: 90 });
  console.log(`  ✅ Mobile saved: ${mobilePath}`);
  await mobileCtx.close();
}

async function capture() {
  const browser = await chromium.launch({ headless: true });
  for (const site of sites) {
    await captureSite(browser, site);
  }
  await browser.close();
  console.log("\n🎉 New project screenshots captured!");
}

capture().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
