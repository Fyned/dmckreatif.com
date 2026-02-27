import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'generate-og-image.html');
const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(`file://${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' });

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1000));

  const card = await page.$('.og-card');
  await card.screenshot({ path: outputPath, type: 'png' });

  console.log(`OG image saved to: ${outputPath}`);
  await browser.close();
})();
