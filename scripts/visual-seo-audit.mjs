import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const SCREENSHOTS_DIR = 'C:/Projects/CLAUDE-BOT/dmckreatif-vite/screenshots/audit-2026-03';
mkdirSync(SCREENSHOTS_DIR, { recursive: true });

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  mobile:  { width: 390,  height: 844 },
};

const URLS = [
  { key: 'home',     url: 'https://dmckreatif.com/en' },
  { key: 'services', url: 'https://dmckreatif.com/en/services' },
];

const results = {};

async function auditPage(page, urlKey, urlStr, device, viewport) {
  const key = `${urlKey}-${device}`;
  console.log(`Capturing: ${key} — ${urlStr}`);
  results[key] = { url: urlStr, device, viewport };

  await page.setViewportSize(viewport);

  const navStart = Date.now();
  await page.goto(urlStr, { waitUntil: 'networkidle', timeout: 30000 });
  const navTime = Date.now() - navStart;
  results[key].navigationTimeMs = navTime;

  // Wait for any entrance animations to settle
  await page.waitForTimeout(2000);

  // ---- Above-the-fold screenshot ----
  const aboveFoldPath = join(SCREENSHOTS_DIR, `${key}-above-fold.png`);
  await page.screenshot({ path: aboveFoldPath, fullPage: false });
  results[key].aboveFoldScreenshot = aboveFoldPath;

  // ---- Full-page screenshot ----
  const fullPagePath = join(SCREENSHOTS_DIR, `${key}-full.png`);
  await page.screenshot({ path: fullPagePath, fullPage: true });
  results[key].fullPageScreenshot = fullPagePath;

  // ---- Content rendering check ----
  const h1Text = await page.$eval('h1', el => el.innerText).catch(() => null);
  const bodyText = await page.$eval('body', el => el.innerText.trim().slice(0, 300)).catch(() => '');
  results[key].h1 = h1Text;
  results[key].bodyTextSample = bodyText;
  results[key].hasContent = bodyText.length > 100;

  // ---- CTA visibility (above fold) ----
  const ctaSelectors = [
    'a[href*="contact"]',
    'a[href*="quote"]',
    'button[class*="cta"]',
    'a[class*="cta"]',
    '[data-cta]',
    'a[href*="get-started"]',
    'a[href*="pricing"]',
  ];
  const ctaResults = [];
  for (const sel of ctaSelectors) {
    try {
      const els = await page.$$(sel);
      for (const el of els) {
        const box = await el.boundingBox();
        if (box) {
          const visibleAboveFold = box.y + box.height <= viewport.height;
          const text = await el.innerText().catch(() => '');
          ctaResults.push({
            selector: sel,
            text: text.trim().slice(0, 60),
            x: Math.round(box.x),
            y: Math.round(box.y),
            width: Math.round(box.width),
            height: Math.round(box.height),
            visibleAboveFold,
            touchTargetOk: box.width >= 44 && box.height >= 44,
          });
        }
      }
    } catch (_) {}
  }
  results[key].ctas = ctaResults;
  results[key].ctaAboveFold = ctaResults.some(c => c.visibleAboveFold);

  // ---- Navigation check ----
  const nav = await page.$('nav, [role="navigation"]');
  if (nav) {
    const navBox = await nav.boundingBox();
    results[key].navVisible = navBox !== null;
    results[key].navBox = navBox ? {
      y: Math.round(navBox.y),
      height: Math.round(navBox.height),
    } : null;
  } else {
    results[key].navVisible = false;
  }

  // Hamburger menu check on mobile
  if (device === 'mobile') {
    const hamburger = await page.$('button[aria-label*="menu" i], button[aria-label*="navigation" i], [class*="hamburger"], [class*="menu-toggle"], [class*="mobile-menu"]');
    results[key].hamburgerFound = hamburger !== null;
    if (hamburger) {
      const hBox = await hamburger.boundingBox();
      results[key].hamburgerBox = hBox ? {
        width: Math.round(hBox.width),
        height: Math.round(hBox.height),
        touchTargetOk: hBox.width >= 44 && hBox.height >= 44,
      } : null;
    }
  }

  // ---- H1 visibility above fold ----
  try {
    const h1El = await page.$('h1');
    if (h1El) {
      const h1Box = await h1El.boundingBox();
      results[key].h1AboveFold = h1Box ? (h1Box.y + h1Box.height) <= viewport.height : false;
      results[key].h1Box = h1Box ? { y: Math.round(h1Box.y), height: Math.round(h1Box.height) } : null;
    }
  } catch (_) {}

  // ---- Cookie banner check ----
  const cookieBannerSelectors = [
    '[class*="cookie"]',
    '[id*="cookie"]',
    '[class*="consent"]',
    '[id*="consent"]',
    '[class*="gdpr"]',
    '[id*="gdpr"]',
    '[class*="banner"]',
    '[id*="banner"]',
  ];
  for (const sel of cookieBannerSelectors) {
    try {
      const el = await page.$(sel);
      if (el) {
        const box = await el.boundingBox();
        if (box && box.height > 20) {
          results[key].cookieBanner = {
            selector: sel,
            height: Math.round(box.height),
            y: Math.round(box.y),
            impactOnFold: box.height > 80 ? 'significant' : 'minor',
          };
          break;
        }
      }
    } catch (_) {}
  }

  // ---- Font rendering check ----
  const fontFamilies = await page.evaluate(() => {
    const els = [
      document.querySelector('h1'),
      document.querySelector('h2'),
      document.querySelector('p'),
    ].filter(Boolean);
    return els.map(el => ({
      tag: el.tagName,
      fontFamily: getComputedStyle(el).fontFamily,
      fontSize: getComputedStyle(el).fontSize,
      fontWeight: getComputedStyle(el).fontWeight,
      color: getComputedStyle(el).color,
      lineHeight: getComputedStyle(el).lineHeight,
    }));
  }).catch(() => []);
  results[key].typography = fontFamilies;

  // ---- Base font size check (mobile readability) ----
  const baseFontSize = await page.evaluate(() => {
    const body = document.querySelector('body');
    return body ? getComputedStyle(body).fontSize : null;
  }).catch(() => null);
  results[key].baseFontSize = baseFontSize;

  // ---- Horizontal scroll check ----
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  }).catch(() => false);
  results[key].hasHorizontalScroll = hasHorizontalScroll;

  // ---- Images check ----
  const imgData = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).slice(0, 20).map(img => ({
      src: img.src.slice(0, 80),
      alt: img.alt || '',
      width: img.naturalWidth,
      height: img.naturalHeight,
      rendered: img.getBoundingClientRect().width,
      loading: img.loading,
      hasAlt: img.alt.length > 0,
    }));
  }).catch(() => []);
  results[key].images = imgData;
  results[key].imagesWithoutAlt = imgData.filter(i => !i.hasAlt).length;

  // ---- LCP candidate identification ----
  const lcpCandidate = await page.evaluate(() => {
    const candidates = [];
    // Hero images
    const heroImgs = document.querySelectorAll('section img, .hero img, [class*="hero"] img');
    heroImgs.forEach(img => {
      const box = img.getBoundingClientRect();
      if (box.width > 200 && box.top < window.innerHeight) {
        candidates.push({ type: 'img', src: img.src.slice(0, 80), area: box.width * box.height });
      }
    });
    // Hero text
    const h1 = document.querySelector('h1');
    if (h1) {
      const box = h1.getBoundingClientRect();
      candidates.push({ type: 'h1', text: h1.innerText.slice(0, 80), area: box.width * box.height });
    }
    // Large background images
    const sections = document.querySelectorAll('section, [class*="hero"]');
    sections.forEach(section => {
      const style = getComputedStyle(section);
      const bg = style.backgroundImage;
      if (bg && bg !== 'none') {
        const box = section.getBoundingClientRect();
        if (box.top < window.innerHeight && box.width > 300) {
          candidates.push({ type: 'bg-image', element: section.tagName + '.' + section.className.slice(0, 40), area: box.width * box.height });
        }
      }
    });
    return candidates.sort((a, b) => b.area - a.area).slice(0, 3);
  }).catch(() => []);
  results[key].lcpCandidates = lcpCandidate;

  // ---- Touch target audit (mobile only) ----
  if (device === 'mobile') {
    const touchTargets = await page.evaluate(() => {
      const interactives = Array.from(document.querySelectorAll('a, button, input, select, textarea, [role="button"]'));
      return interactives.slice(0, 50).map(el => {
        const box = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          text: (el.innerText || el.value || el.getAttribute('aria-label') || '').slice(0, 40),
          width: Math.round(box.width),
          height: Math.round(box.height),
          tooSmall: box.width < 44 || box.height < 44,
        };
      }).filter(t => t.width > 0);
    }).catch(() => []);
    results[key].touchTargets = touchTargets;
    results[key].touchTargetFailures = touchTargets.filter(t => t.tooSmall).length;
    results[key].touchTargetTotal = touchTargets.length;
  }

  // ---- Animation / JS blocking check ----
  const animatingElements = await page.evaluate(() => {
    const animated = document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"], [data-framer-motion]');
    return animated.length;
  }).catch(() => 0);
  results[key].animatingElementsCount = animatingElements;

  // ---- Color contrast snapshot ----
  const contrastSamples = await page.evaluate(() => {
    const textEls = Array.from(document.querySelectorAll('h1, h2, p, a, button')).slice(0, 10);
    return textEls.map(el => {
      const style = getComputedStyle(el);
      return {
        tag: el.tagName,
        text: el.innerText.slice(0, 30),
        color: style.color,
        background: style.backgroundColor,
        fontSize: style.fontSize,
      };
    });
  }).catch(() => []);
  results[key].contrastSamples = contrastSamples;

  // ---- Meta tags (first page load only) ----
  if (device === 'desktop') {
    const meta = await page.evaluate(() => {
      const get = (selector, attr = 'content') => document.querySelector(selector)?.[attr] || null;
      return {
        title: document.title,
        description: get('meta[name="description"]'),
        ogTitle: get('meta[property="og:title"]'),
        ogDescription: get('meta[property="og:description"]'),
        ogImage: get('meta[property="og:image"]'),
        canonical: get('link[rel="canonical"]', 'href'),
        viewport: get('meta[name="viewport"]'),
        h1Count: document.querySelectorAll('h1').length,
        h2Count: document.querySelectorAll('h2').length,
      };
    }).catch(() => ({}));
    results[key].meta = meta;
  }

  console.log(`  Done: h1="${h1Text?.slice(0,50)}" hasContent=${results[key].hasContent} ctaAboveFold=${results[key].ctaAboveFold}`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const { key, url } of URLS) {
    for (const [device, viewport] of Object.entries(VIEWPORTS)) {
      const context = await browser.newContext({
        viewport,
        userAgent: device === 'mobile'
          ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
          : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        isMobile: device === 'mobile',
        hasTouch: device === 'mobile',
      });
      const page = await context.newPage();
      try {
        await auditPage(page, key, url, device, viewport);
      } catch (err) {
        console.error(`Error on ${key}-${device}:`, err.message);
        results[`${key}-${device}`] = { error: err.message };
      }
      await context.close();
    }
  }

  await browser.close();

  const reportPath = join(SCREENSHOTS_DIR, 'audit-report.json');
  writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nAudit complete. Report saved to: ${reportPath}`);
  console.log('Screenshots saved to:', SCREENSHOTS_DIR);
})();
