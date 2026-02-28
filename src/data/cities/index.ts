export type { CityData, CityCountry } from "./types";
export { cities } from "./cities";

import { cities } from "./cities";
import type { CityData } from "./types";

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCitiesByCountry(country: string): CityData[] {
  return cities.filter((c) => c.country === country);
}
