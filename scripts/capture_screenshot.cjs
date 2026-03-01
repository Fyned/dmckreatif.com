const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots');

const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

const urls = [
  { url: 'https://dmckreatif.com/en', slug: 'en' },
  { url: 'https://dmckreatif.com/fr', slug: 'fr' },
];

async function captureAndAnalyze() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const results = {};

  for (const { url, slug } of urls) {
    results[slug] = {};

    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        userAgent: vp.name === 'mobile'
          ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
          : undefined,
        deviceScaleFactor: vp.name === 'mobile' ? 2 : 1,
      });

      const page = await context.newPage();

      try {
        const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        const status = response ? response.status() : 'unknown';

        // Above-the-fold screenshot
        const aboveTheFoldPath = path.join(SCREENSHOTS_DIR, `${slug}-${vp.name}-above-fold.png`);
        await page.screenshot({ path: aboveTheFoldPath, fullPage: false });

        // Full page screenshot
        const fullPagePath = path.join(SCREENSHOTS_DIR, `${slug}-${vp.name}-full.png`);
        await page.screenshot({ path: fullPagePath, fullPage: true });

        // Analyze page structure
        const analysis = await page.evaluate(() => {
          const getMetaContent = (name) => {
            const el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
            return el ? el.getAttribute('content') : null;
          };

          // Viewport meta
          const viewportMeta = document.querySelector('meta[name="viewport"]');

          // Title
          const title = document.title;

          // H1
          const h1Elements = [...document.querySelectorAll('h1')];
          const h1Data = h1Elements.map(h => ({
            text: h.textContent.trim().substring(0, 200),
            visible: h.offsetParent !== null,
            rect: h.getBoundingClientRect(),
          }));

          // H2s
          const h2Elements = [...document.querySelectorAll('h2')];
          const h2Data = h2Elements.map(h => ({
            text: h.textContent.trim().substring(0, 150),
          }));

          // Images without alt
          const allImages = [...document.querySelectorAll('img')];
          const imgData = allImages.map(img => ({
            src: img.src.substring(0, 100),
            alt: img.alt,
            hasAlt: !!img.alt && img.alt.trim().length > 0,
            width: img.naturalWidth,
            height: img.naturalHeight,
            loading: img.loading,
          }));

          // CTA buttons
          const buttons = [...document.querySelectorAll('a, button')];
          const ctaPatterns = /contact|get started|hire|book|free|quote|start|order|buy|pricing|consultation/i;
          const ctaElements = buttons.filter(b => ctaPatterns.test(b.textContent));
          const ctaData = ctaElements.map(b => ({
            text: b.textContent.trim().substring(0, 100),
            tag: b.tagName,
            href: b.href || null,
            rect: b.getBoundingClientRect(),
            visible: b.offsetParent !== null,
            aboveFold: b.getBoundingClientRect().top < window.innerHeight,
          }));

          // Language switcher
          const langLinks = [...document.querySelectorAll('a')].filter(a =>
            /\/(en|fr|nl|de)(\/|$)/.test(a.href) || /lang|locale|language/i.test(a.className + ' ' + (a.id || ''))
          );
          const langData = langLinks.map(a => ({
            text: a.textContent.trim().substring(0, 50),
            href: a.href,
            visible: a.offsetParent !== null,
            rect: a.getBoundingClientRect(),
          }));

          // Nav links
          const navLinks = [...document.querySelectorAll('nav a, header a')];
          const navData = navLinks.map(a => ({
            text: a.textContent.trim().substring(0, 50),
            href: a.href,
          }));

          // Footer links
          const footerLinks = [...document.querySelectorAll('footer a')];
          const footerData = footerLinks.map(a => ({
            text: a.textContent.trim().substring(0, 50),
            href: a.href,
          }));

          // Meta tags
          const metaTags = {
            description: getMetaContent('description'),
            ogTitle: getMetaContent('og:title'),
            ogDescription: getMetaContent('og:description'),
            ogImage: getMetaContent('og:image'),
            ogUrl: getMetaContent('og:url'),
            twitterCard: getMetaContent('twitter:card'),
            canonical: (() => {
              const link = document.querySelector('link[rel="canonical"]');
              return link ? link.href : null;
            })(),
          };

          // hreflang
          const hreflangLinks = [...document.querySelectorAll('link[rel="alternate"][hreflang]')];
          const hreflangData = hreflangLinks.map(l => ({
            hreflang: l.getAttribute('hreflang'),
            href: l.href,
          }));

          // JSON-LD
          const jsonLdScripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
          const jsonLdData = jsonLdScripts.map(s => {
            try { return JSON.parse(s.textContent); } catch { return null; }
          }).filter(Boolean);

          // Fonts loaded
          const fonts = [...document.fonts].map(f => ({
            family: f.family,
            status: f.status,
          }));

          // Check for horizontal overflow
          const bodyWidth = document.body.scrollWidth;
          const viewportWidth = window.innerWidth;
          const hasHorizontalScroll = bodyWidth > viewportWidth;

          // Base font size
          const bodyStyle = window.getComputedStyle(document.body);
          const baseFontSize = bodyStyle.fontSize;

          return {
            viewportMeta: viewportMeta ? viewportMeta.getAttribute('content') : null,
            title,
            h1Data,
            h2Data,
            imgData,
            ctaData,
            langData,
            navData,
            footerData,
            metaTags,
            hreflangData,
            jsonLdData,
            fonts,
            hasHorizontalScroll,
            bodyWidth,
            viewportWidth: viewportWidth,
            baseFontSize,
            documentHeight: document.documentElement.scrollHeight,
          };
        });

        results[slug][vp.name] = {
          status,
          analysis,
          screenshots: {
            aboveFold: aboveTheFoldPath,
            fullPage: fullPagePath,
          },
        };

      } catch (err) {
        results[slug][vp.name] = { error: err.message };
      }

      await context.close();
    }
  }

  await browser.close();

  // Write results JSON
  const resultsPath = path.join(SCREENSHOTS_DIR, 'analysis-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log('Analysis complete. Results saved to:', resultsPath);
  console.log(JSON.stringify(results, null, 2));
}

captureAndAnalyze().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
