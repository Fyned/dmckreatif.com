export type TechCategory = "frontend" | "backend" | "devops" | "ecommerce";

export interface TechAlternative {
  name: string;
  descKey: string;
  prosKey: string;
  consKey: string;
}

export interface TechnologyData {
  slug: string;
  category: TechCategory;
  icon: string;
  color: string;
  bgAccent: string;
  version: string;
  officialUrl: string;
  titleKey: string;
  descKey: string;
  longDescKey: string;
  whyWeUseKeys: string[];
  features: string[];
  alternatives: TechAlternative[];
  faqKeys: string[];
  relatedTechSlugs: string[];
  relatedServiceSlugs: string[];
}
