/**
 * RSS Feed Generator — runs at build time via Vite plugin
 * Generates public/rss.xml from blog data + EN locale
 */

interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category: string;
}

const SITE_URL = "https://dmckreatif.com";
const SITE_TITLE = "DMC Kreatif Blog";
const SITE_DESCRIPTION =
  "Web development insights, SEO tips, and digital marketing strategies for European businesses.";

const blogPosts = [
  { slug: "how-much-does-a-website-cost-in-europe-2026", title: "How Much Does a Website Cost in Europe in 2026?", excerpt: "A transparent breakdown of website development costs across European markets. Compare pricing for custom sites, e-commerce, templates and ongoing maintenance.", date: "2026-01-06", category: "BUSINESS" },
  { slug: "how-to-choose-a-web-agency-in-europe", title: "How to Choose a Web Agency in Europe", excerpt: "A practical guide to evaluating and selecting the right web development agency for your European business. Key criteria, red flags and decision framework.", date: "2026-01-08", category: "BUSINESS" },
  { slug: "technical-seo-checklist-europe", title: "Technical SEO Checklist for European Websites", excerpt: "Complete technical SEO checklist covering Core Web Vitals, crawlability, indexation, structured data, hreflang and multilingual optimization.", date: "2026-01-10", category: "SEO" },
  { slug: "core-web-vitals-lighthouse-guide", title: "Core Web Vitals: How to Get a 95+ Lighthouse Score", excerpt: "Step-by-step guide to achieving a 95+ Lighthouse score. Optimize LCP, FID, CLS and INP for better performance and SEO rankings.", date: "2026-01-13", category: "TECH" },
  { slug: "website-redesign-guide", title: "Website Redesign Guide: When and How to Redesign", excerpt: "Know when your website needs a redesign and how to execute it without losing SEO rankings. Planning, migration strategy and optimization.", date: "2026-01-15", category: "BUSINESS" },
  { slug: "multilingual-website-guide", title: "How to Build a Multilingual Website: Complete Guide", excerpt: "Everything about building multilingual websites for European markets. i18n architecture, hreflang, content strategy and translation workflow.", date: "2026-01-17", category: "TECH" },
  { slug: "gdpr-compliance-checklist", title: "GDPR Compliance Checklist for Websites in 2026", excerpt: "Comprehensive GDPR compliance checklist for European websites. Cookie consent, privacy policies, data processing agreements and technical implementation.", date: "2026-01-20", category: "LEGAL" },
  { slug: "ecommerce-conversion-optimization", title: "How to Optimize Your E-Commerce Conversion Rate", excerpt: "Proven strategies to increase your e-commerce conversion rate. Checkout optimization, product page design, trust signals and A/B testing.", date: "2026-01-22", category: "E-COMMERCE" },
  { slug: "seo-audit-guide-2026", title: "SEO Audit Step-by-Step Guide for 2026", excerpt: "How to conduct a complete SEO audit. Technical analysis, on-page optimization, content gaps, backlink profile and competitive benchmarking.", date: "2026-01-24", category: "SEO" },
  { slug: "website-migration-seo", title: "How to Migrate Your Website Without Losing SEO", excerpt: "Complete guide to website migration that preserves your SEO rankings. Redirect mapping, crawl budget, content migration and monitoring.", date: "2026-01-27", category: "SEO" },
  { slug: "shopify-vs-woocommerce-vs-custom", title: "Shopify vs WooCommerce vs Custom E-Commerce", excerpt: "Detailed comparison of Shopify, WooCommerce and custom e-commerce solutions. Features, pricing, scalability and best use cases for European businesses.", date: "2026-01-29", category: "E-COMMERCE" },
  { slug: "nextjs-vs-gatsby-vs-remix", title: "Next.js vs Gatsby vs Remix: Full Comparison for 2026", excerpt: "In-depth comparison of Next.js, Gatsby and Remix. Performance, developer experience, SEO capabilities and production readiness.", date: "2026-01-31", category: "TECH" },
  { slug: "react-vs-wordpress-2026", title: "React vs WordPress: When to Choose What in 2026", excerpt: "Honest comparison of React-based development vs WordPress for business websites. Cost, performance, security, maintenance and long-term ROI.", date: "2026-02-03", category: "TECH" },
  { slug: "supabase-vs-firebase", title: "Supabase vs Firebase: Backend Comparison for 2026", excerpt: "Complete comparison of Supabase and Firebase. PostgreSQL vs NoSQL, authentication, real-time features, pricing and vendor lock-in.", date: "2026-02-05", category: "TECH" },
  { slug: "agency-vs-freelancer-development", title: "Agency vs Freelancer vs In-House: Development Comparison", excerpt: "Pros and cons of hiring a web agency, freelancer or building in-house. Cost analysis, quality, reliability and project management.", date: "2026-02-07", category: "BUSINESS" },
  { slug: "headless-vs-traditional-cms", title: "Headless CMS vs Traditional CMS: Complete Comparison", excerpt: "Headless CMS vs traditional CMS explained. Architecture differences, content delivery, developer experience and which approach suits your business.", date: "2026-02-10", category: "TECH" },
  { slug: "tailwind-vs-bootstrap", title: "Tailwind CSS vs Bootstrap vs CSS Modules: Styling Comparison", excerpt: "Comprehensive comparison of Tailwind CSS, Bootstrap and CSS Modules. Performance, customization, learning curve and which to choose.", date: "2026-02-12", category: "TECH" },
  { slug: "vercel-vs-netlify-vs-aws", title: "Vercel vs Netlify vs AWS: Deployment Platform Comparison", excerpt: "Compare Vercel, Netlify and AWS for web deployment. Pricing, performance, CI/CD, serverless functions and which platform is best.", date: "2026-02-14", category: "TECH" },
  { slug: "shopify-vs-prestashop-europe", title: "Shopify vs PrestaShop for European E-Commerce", excerpt: "Shopify vs PrestaShop comparison for European online stores. Multi-currency, VAT compliance, payment gateways and total cost of ownership.", date: "2026-02-17", category: "E-COMMERCE" },
  { slug: "wordpress-vs-custom-cost", title: "WordPress vs Custom Development: Total Cost Analysis", excerpt: "True cost comparison of WordPress vs custom development over 3 years. Licensing, hosting, security, performance and hidden maintenance costs.", date: "2026-02-19", category: "BUSINESS" },
  { slug: "seo-guide-small-businesses-france", title: "SEO Guide for Small Businesses in France", excerpt: "Actionable SEO guide for French small businesses. Local SEO, Google My Business, keyword research, link building and content strategy.", date: "2026-02-21", category: "SEO" },
  { slug: "why-multilingual-website-european-business", title: "Why Every European Business Needs a Multilingual Website", excerpt: "Data-backed reasons why European businesses need multilingual websites. Market reach, SEO benefits, customer trust and competitive advantage.", date: "2026-02-24", category: "BUSINESS" },
  { slug: "what-is-headless-cms", title: "What is Headless CMS? A Complete Guide for 2026", excerpt: "Everything about headless CMS in 2026. How it works, benefits over traditional CMS, top platforms and implementation best practices.", date: "2026-02-26", category: "TECH" },
  { slug: "ecommerce-platform-comparison-europe", title: "E-Commerce Platform Comparison for European SMBs", excerpt: "Compare top e-commerce platforms for European small businesses. Shopify, WooCommerce, PrestaShop, Magento and custom solutions evaluated.", date: "2026-02-28", category: "E-COMMERCE" },
  { slug: "state-of-web-development-2026", title: "The State of Web Development in 2026", excerpt: "Key trends shaping web development in 2026. AI integration, edge computing, server components, WebAssembly and the evolving frontend landscape.", date: "2026-03-03", category: "TECH" },
  { slug: "multilingual-seo-europe", title: "Why European Businesses Need Multilingual SEO", excerpt: "How multilingual SEO drives organic growth across European markets. Hreflang implementation, localized keyword strategy and cross-border optimization.", date: "2026-03-05", category: "SEO" },
  { slug: "web-design-construction", title: "Web Design for Construction Companies: Best Practices", excerpt: "How to design an effective website for construction companies. Portfolio showcase, lead generation, project galleries and industry-specific UX.", date: "2026-03-07", category: "DESIGN" },
  { slug: "ai-web-development-2026", title: "AI in Web Development: What It Means for Your Business", excerpt: "How AI is transforming web development in 2026. Code generation, design automation, personalization engines and what business owners need to know.", date: "2026-03-10", category: "TECH" },
  { slug: "core-web-vitals-explained", title: "Core Web Vitals Explained for Business Owners", excerpt: "A non-technical guide to Core Web Vitals. What LCP, INP and CLS mean for your business, why Google cares and how to improve your scores.", date: "2026-03-12", category: "SEO" },
  { slug: "roi-professional-web-design", title: "The True ROI of Investing in Professional Web Design", excerpt: "Quantify the return on investment of professional web design. Revenue impact, brand perception, conversion rates and long-term business value.", date: "2026-03-14", category: "BUSINESS" },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function generateRSSXml(): string {
  const items: RSSItem[] = blogPosts.map((post) => ({
    title: post.title,
    description: post.excerpt,
    link: `${SITE_URL}/en/blog/${post.slug}`,
    pubDate: new Date(post.date).toUTCString(),
    category: post.category,
  }));

  const itemsXml = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <category>${escapeXml(item.category)}</category>
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>DMC Kreatif RSS Generator</generator>
    <image>
      <url>${SITE_URL}/favicon-32.png</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${SITE_URL}</link>
    </image>
${itemsXml}
  </channel>
</rss>`;
}
