export { countries } from "./countries";
export type { CountryData, CountryCode, CaseStudyCountryCode } from "./types";

import { countries } from "./countries";

export function getCountryBySlug(slug: string) {
  return countries.find((c) => c.slug === slug);
}
