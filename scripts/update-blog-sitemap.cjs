/**
 * Update sitemap.xml: remove old 4 blog article entries, add all 30 new ones
 */
const fs = require('fs');
const path = require('path');

const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');
const LOCALES = ['en', 'fr', 'nl', 'de'];
const TODAY = '2026-02-28';

const slugs = [
  'how-much-does-a-website-cost-in-europe-2026',
  'how-to-choose-a-web-agency-in-europe',
  'technical-seo-checklist-europe',
  'core-web-vitals-lighthouse-guide',
  'website-redesign-guide',
  'multilingual-website-guide',
  'gdpr-compliance-checklist',
  'ecommerce-conversion-optimization',
  'seo-audit-guide-2026',
  'website-migration-seo',
  'shopify-vs-woocommerce-vs-custom',
  'nextjs-vs-gatsby-vs-remix',
  'react-vs-wordpress-2026',
  'supabase-vs-firebase',
  'agency-vs-freelancer-development',
  'headless-vs-traditional-cms',
  'tailwind-vs-bootstrap',
  'vercel-vs-netlify-vs-aws',
  'shopify-vs-prestashop-europe',
  'wordpress-vs-custom-cost',
  'seo-guide-small-businesses-france',
  'why-multilingual-website-european-business',
  'what-is-headless-cms',
  'ecommerce-platform-comparison-europe',
  'state-of-web-development-2026',
  'multilingual-seo-europe',
  'web-design-construction',
  'ai-web-development-2026',
  'core-web-vitals-explained',
  'roi-professional-web-design'
];

function buildBlogUrlBlock(locale, slug) {
  const base = 'https://dmckreatif.com';
  return `  <url>
    <loc>${base}/${locale}/blog/${slug}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${base}/en/blog/${slug}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${base}/fr/blog/${slug}"/>
    <xhtml:link rel="alternate" hreflang="nl" href="${base}/nl/blog/${slug}"/>
    <xhtml:link rel="alternate" hreflang="de" href="${base}/de/blog/${slug}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${base}/en/blog/${slug}"/>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
}

let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');

// Find the BLOG POSTS section and replace it
const blogSectionStart = sitemap.indexOf('<!-- ==================== BLOG POSTS ====================');
const blogSectionEnd = sitemap.indexOf('<!-- ==================== ABOUT SUB-PAGES ====================');

if (blogSectionStart === -1 || blogSectionEnd === -1) {
  console.error('Could not find BLOG POSTS or ABOUT SUB-PAGES section markers in sitemap.xml');
  process.exit(1);
}

// Build new blog section
let newBlogSection = '  <!-- ==================== BLOG POSTS (30 articles) ==================== -->\n';

for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i];
  newBlogSection += `  <!-- Article ${i + 1} -->\n`;
  for (const locale of LOCALES) {
    newBlogSection += buildBlogUrlBlock(locale, slug) + '\n';
  }
  newBlogSection += '\n';
}

// Replace the old section
const before = sitemap.substring(0, blogSectionStart);
const after = sitemap.substring(blogSectionEnd);
sitemap = before + newBlogSection + '  ' + after;

fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');

const totalUrls = slugs.length * LOCALES.length;
console.log(`Sitemap updated: ${slugs.length} articles x ${LOCALES.length} locales = ${totalUrls} blog URLs`);
console.log('Old 4 article entries removed, 30 new article entries added');
