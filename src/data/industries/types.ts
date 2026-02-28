export type IndustryCategory = "building" | "services" | "commerce" | "public";

export interface IndustryProject {
  nameKey: string;
  urlKey: string;
  descKey: string;
}

export interface IndustryData {
  slug: string;
  category: IndustryCategory;
  icon: string;
  color: string;
  bgAccent: string;
  titleKey: string;
  descKey: string;
  longDescKey: string;
  challengesKeys: string[];
  solutionsKeys: string[];
  features: string[];
  faqKeys: string[];
  projects: IndustryProject[];
  relatedServiceSlugs: string[];
  relatedIndustrySlugs: string[];
}
