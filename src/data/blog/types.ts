export type BlogCategory = "BUSINESS" | "TECH" | "SEO" | "MARKETING" | "GROWTH" | "DESIGN" | "LEGAL" | "E-COMMERCE";

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  date: string;
  updatedDate?: string;
  readTime: string;
  accentColor: string;
  relatedSlugs?: string[];
  relatedServiceSlugs?: string[];
  relatedTechSlugs?: string[];
}
