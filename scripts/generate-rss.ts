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
  { slug: "why-your-business-needs-a-website-in-2025", title: "Why Your Business Needs a Website in 2025", excerpt: "In the digital age, not having a website is like not having a business card. Here's why every European business needs a professional web presence.", date: "2025-01-15", category: "BUSINESS" },
  { slug: "seo-basics-for-small-businesses", title: "SEO Basics Every Small Business Should Know", excerpt: "Technical SEO doesn't have to be complicated. Learn the fundamentals that can boost your website's visibility in search engines.", date: "2025-01-28", category: "SEO" },
  { slug: "nextjs-vs-wordpress-which-is-better", title: "Next.js vs WordPress: Which Is Better for Your Business?", excerpt: "A technical comparison of modern web frameworks vs traditional CMS platforms. Speed, security, and scalability compared.", date: "2025-02-10", category: "TECH" },
  { slug: "how-to-increase-website-conversion-rate", title: "How to Increase Your Website's Conversion Rate", excerpt: "Your website gets traffic but no leads? Here are proven strategies to turn visitors into paying customers.", date: "2025-02-25", category: "MARKETING" },
  { slug: "multilingual-websites-expand-your-reach", title: "Multilingual Websites: Expand Your Reach Across Europe", excerpt: "How building a multilingual website can open doors to new markets and increase revenue across European countries.", date: "2025-03-10", category: "GROWTH" },
  { slug: "how-much-does-a-website-cost-in-europe", title: "How Much Does a Website Cost in Europe in 2025?", excerpt: "A transparent breakdown of web development pricing across European markets.", date: "2025-03-25", category: "BUSINESS" },
  { slug: "web-design-trends-2025", title: "Top Web Design Trends Shaping 2025", excerpt: "From dark mode interfaces to micro-interactions, discover the design trends defining premium websites.", date: "2025-04-08", category: "DESIGN" },
  { slug: "why-french-businesses-need-a-professional-website", title: "Why Your French Business Needs a Professional Website", excerpt: "France has over 4 million SMEs, yet many lack a proper online presence.", date: "2025-04-22", category: "BUSINESS" },
  { slug: "ecommerce-guide-for-belgian-businesses", title: "E-Commerce Guide for Belgian Businesses", excerpt: "Belgium's unique bilingual market requires a tailored approach to online selling.", date: "2025-05-05", category: "E-COMMERCE" },
  { slug: "seo-tips-for-uk-small-businesses", title: "SEO Tips for UK Small Businesses in 2025", excerpt: "Practical, actionable SEO strategies tailored for the competitive UK market.", date: "2025-05-18", category: "SEO" },
  { slug: "website-speed-optimization-guide", title: "Website Speed Optimization: A Complete Guide", excerpt: "Every second of load time costs you conversions. Learn the technical strategies that make websites blazing fast.", date: "2025-06-01", category: "TECH" },
  { slug: "how-to-choose-a-web-development-agency", title: "How to Choose the Right Web Development Agency", excerpt: "Not all agencies are equal. Here are the key criteria to evaluate when selecting a partner.", date: "2025-06-15", category: "BUSINESS" },
  { slug: "react-vs-wordpress-for-business-websites", title: "React vs WordPress: Which Should Your Business Choose?", excerpt: "A detailed comparison of React-based websites versus WordPress for business use.", date: "2025-06-28", category: "TECH" },
  { slug: "gdpr-compliant-website-checklist", title: "GDPR-Compliant Website Checklist for 2025", excerpt: "A comprehensive checklist to ensure your website meets GDPR requirements.", date: "2025-07-10", category: "LEGAL" },
  { slug: "local-seo-strategy-for-european-businesses", title: "Local SEO Strategy for European Businesses", excerpt: "Dominate local search results in your city and region.", date: "2025-07-24", category: "SEO" },
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
