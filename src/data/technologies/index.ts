export type { TechnologyData, TechCategory, TechAlternative } from "./types";
export { frontendTechnologies } from "./frontend";
export { backendTechnologies } from "./backend";

import { frontendTechnologies } from "./frontend";
import { backendTechnologies } from "./backend";
import type { TechnologyData } from "./types";

export const allTechnologies: TechnologyData[] = [
  ...frontendTechnologies,
  ...backendTechnologies,
];

export function getTechnologyBySlug(slug: string): TechnologyData | undefined {
  return allTechnologies.find((t) => t.slug === slug);
}

export function getTechnologiesByCategory(
  category: string
): TechnologyData[] {
  return allTechnologies.filter((t) => t.category === category);
}
