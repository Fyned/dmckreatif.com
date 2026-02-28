export interface ServiceData {
  slug: string;
  category: "web-development" | "ecommerce" | "seo" | "design";
  icon: string;
  color: string;
  bgAccent: string;
  priceFrom: string;
  titleKey: string;
  descKey: string;
  longDescKey: string;
  features: string[];
  processSteps: string[];
  faqKeys: string[];
  relatedSlugs: string[];
}
