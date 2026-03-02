import { readFileSync } from 'fs';

const data = JSON.parse(readFileSync('C:/Projects/CLAUDE-BOT/dmckreatif-vite/screenshots/audit-2026-03/audit-report.json', 'utf8'));

for (const [key, r] of Object.entries(data)) {
  console.log('\n=== ' + key + ' ===');
  console.log('navTime:', r.navigationTimeMs + 'ms');
  console.log('h1:', r.h1);
  console.log('hasContent:', r.hasContent);
  console.log('hasHorizontalScroll:', r.hasHorizontalScroll);
  console.log('baseFontSize:', r.baseFontSize);
  console.log('imagesWithoutAlt:', r.imagesWithoutAlt);
  console.log('animatingElements:', r.animatingElementsCount);
  console.log('ctaAboveFold:', r.ctaAboveFold);

  if (r.cookieBanner) console.log('cookieBanner:', JSON.stringify(r.cookieBanner));
  if (r.navVisible !== undefined) console.log('navVisible:', r.navVisible, 'navBox:', JSON.stringify(r.navBox));
  if (r.hamburgerFound !== undefined) console.log('hamburgerFound:', r.hamburgerFound, 'hamburgerBox:', JSON.stringify(r.hamburgerBox));
  if (r.touchTargetFailures !== undefined) console.log('touchTargetFailures:', r.touchTargetFailures, '/', r.touchTargetTotal);
  if (r.h1AboveFold !== undefined) console.log('h1AboveFold:', r.h1AboveFold, 'h1Box:', JSON.stringify(r.h1Box));

  if (r.meta) {
    console.log('--- META ---');
    console.log('  title:', r.meta.title);
    console.log('  description:', r.meta.description);
    console.log('  ogImage:', r.meta.ogImage);
    console.log('  canonical:', r.meta.canonical);
    console.log('  viewport:', r.meta.viewport);
    console.log('  h1Count:', r.meta.h1Count, 'h2Count:', r.meta.h2Count);
  }

  if (r.lcpCandidates && r.lcpCandidates.length > 0) {
    console.log('lcpCandidates:', JSON.stringify(r.lcpCandidates));
  }

  if (r.typography) {
    r.typography.forEach(t => console.log('  font:', t.tag, t.fontFamily.slice(0,60), t.fontSize, 'w:' + t.fontWeight));
  }

  if (r.ctas) {
    console.log('CTAs:');
    r.ctas.forEach(c => console.log('  -', c.text.slice(0,40), '| h=' + c.height + 'px', 'touchOk=' + c.touchTargetOk, 'aboveFold=' + c.visibleAboveFold));
  }

  if (r.touchTargetFailures > 0) {
    const failures = r.touchTargets.filter(t => t.tooSmall).slice(0, 10);
    console.log('Touch target failures:');
    failures.forEach(t => console.log('  -', t.tag, '"' + t.text.slice(0,30) + '"', t.width + 'x' + t.height));
  }
}
