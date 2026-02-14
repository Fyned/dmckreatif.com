import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, "../public/portfolio");

async function capture() {
  const browser = await chromium.launch({ headless: false }); // headful to get latest version

  console.log("\n📸 Re-capturing MKN Technisch (fresh, no cache)...");

  // Desktop
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    bypassCSP: true,
  });
  const desktopPage = await desktopCtx.newPage();
  try {
    await desktopPage.goto("https://mkntechnisch.com", { waitUntil: "networkidle", timeout: 30000 });
  } catch {
    console.log("  ⚠️ Timeout, continuing...");
  }
  await desktopPage.waitForTimeout(12000);
  await desktopPage.screenshot({ path: path.join(outputDir, "mkn-desktop.webp"), type: "jpeg", quality: 90 });
  console.log("  ✅ Desktop saved");
  await desktopCtx.close();

  // Mobile
  const mobileCtx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });
  const mobilePage = await mobileCtx.newPage();
  try {
    await mobilePage.goto("https://mkntechnisch.com", { waitUntil: "networkidle", timeout: 30000 });
  } catch {
    console.log("  ⚠️ Timeout mobile, continuing...");
  }
  await mobilePage.waitForTimeout(12000);
  await mobilePage.screenshot({ path: path.join(outputDir, "mkn-mobile.webp"), type: "jpeg", quality: 90 });
  console.log("  ✅ Mobile saved");
  await mobileCtx.close();

  await browser.close();
  console.log("\n🎉 MKN screenshots updated!");
}

capture().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
