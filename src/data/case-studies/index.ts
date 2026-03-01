export type { CaseStudy, CaseStudyMetric, CaseStudyTestimonial } from "./types";
export { caseStudies } from "./case-studies";

import { caseStudies } from "./case-studies";

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((cs) => cs.slug === slug) ?? null;
}

export function getCaseStudyById(id: string) {
  return caseStudies.find((cs) => cs.id === id) ?? null;
}

export function getCaseStudiesByCountry(country: "FR" | "BE" | "UK") {
  return caseStudies.filter((cs) => cs.country === country);
}
