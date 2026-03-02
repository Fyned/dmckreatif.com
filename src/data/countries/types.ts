export type CountryCode = "FR" | "GB" | "NL" | "DE";
export type CaseStudyCountryCode = "FR" | "UK" | "BE" | "NL" | "DE";

export interface CountryData {
  slug: string;
  code: CountryCode;
  caseStudyCode: CaseStudyCountryCode;
  flag: string;
  nameKey: string;
  titleKey: string;
  descriptionKey: string;
  introKey: string;
  benefitsKeys: string[];
  ctaKey: string;
}
