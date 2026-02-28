export type { IndustryData, IndustryCategory, IndustryProject } from "./types";
export { industries } from "./industries";

import { industries } from "./industries";
import type { IndustryData } from "./types";

export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getIndustriesByCategory(category: string): IndustryData[] {
  return industries.filter((i) => i.category === category);
}
