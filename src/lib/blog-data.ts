export interface BlogPost {
  slug: string;
  titleKey: string;
  excerptKey: string;
  contentKey: string;
  date: string;
  readTime: string;
  category: string;
  accentColor: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-much-does-a-website-cost-in-europe-2026",
    titleKey: "websiteCostTitle",
    excerptKey: "websiteCostExcerpt",
    contentKey: "websiteCostContent",
    date: "2026-02-15",
    readTime: "8 min",
    category: "BUSINESS",
    accentColor: "neo-lime",
  },
  {
    slug: "react-vs-wordpress-for-european-smbs",
    titleKey: "reactVsWpTitle",
    excerptKey: "reactVsWpExcerpt",
    contentKey: "reactVsWpContent",
    date: "2026-02-10",
    readTime: "10 min",
    category: "TECH",
    accentColor: "neo-blue",
  },
  {
    slug: "seo-guide-small-businesses-france",
    titleKey: "seoFranceTitle",
    excerptKey: "seoFranceExcerpt",
    contentKey: "seoFranceContent",
    date: "2026-02-05",
    readTime: "9 min",
    category: "SEO",
    accentColor: "neo-yellow",
  },
  {
    slug: "why-multilingual-website-european-business",
    titleKey: "multilingualTitle",
    excerptKey: "multilingualExcerpt",
    contentKey: "multilingualContent",
    date: "2026-01-28",
    readTime: "7 min",
    category: "GROWTH",
    accentColor: "neo-pink",
  },
];
