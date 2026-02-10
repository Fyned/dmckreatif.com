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
    slug: "why-your-business-needs-a-website-in-2025",
    titleKey: "post1Title",
    excerptKey: "post1Excerpt",
    contentKey: "post1Content",
    date: "2025-01-15",
    readTime: "5 min",
    category: "BUSINESS",
    accentColor: "neo-lime",
  },
  {
    slug: "seo-basics-for-small-businesses",
    titleKey: "post2Title",
    excerptKey: "post2Excerpt",
    contentKey: "post2Content",
    date: "2025-01-28",
    readTime: "7 min",
    category: "SEO",
    accentColor: "neo-yellow",
  },
  {
    slug: "nextjs-vs-wordpress-which-is-better",
    titleKey: "post3Title",
    excerptKey: "post3Excerpt",
    contentKey: "post3Content",
    date: "2025-02-10",
    readTime: "6 min",
    category: "TECH",
    accentColor: "neo-blue",
  },
  {
    slug: "how-to-increase-website-conversion-rate",
    titleKey: "post4Title",
    excerptKey: "post4Excerpt",
    contentKey: "post4Content",
    date: "2025-02-25",
    readTime: "8 min",
    category: "MARKETING",
    accentColor: "neo-pink",
  },
  {
    slug: "multilingual-websites-expand-your-reach",
    titleKey: "post5Title",
    excerptKey: "post5Excerpt",
    contentKey: "post5Content",
    date: "2025-03-10",
    readTime: "5 min",
    category: "GROWTH",
    accentColor: "neo-green",
  },
];
