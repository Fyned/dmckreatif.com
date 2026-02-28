export type { ServiceData } from "./types";
export { webDevelopmentServices } from "./web-development";
export { ecommerceServices } from "./ecommerce";
export { seoMarketingServices } from "./seo-marketing";
export { designServices } from "./design";

import { webDevelopmentServices } from "./web-development";
import { ecommerceServices } from "./ecommerce";
import { seoMarketingServices } from "./seo-marketing";
import { designServices } from "./design";
import type { ServiceData } from "./types";

export const allServices: ServiceData[] = [
  ...webDevelopmentServices,
  ...ecommerceServices,
  ...seoMarketingServices,
  ...designServices,
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return allServices.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: string): ServiceData[] {
  return allServices.filter((s) => s.category === category);
}
