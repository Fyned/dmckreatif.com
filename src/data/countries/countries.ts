import type { CountryData } from "./types";

function buildCountry(
  slug: string,
  code: CountryData["code"],
  caseStudyCode: CountryData["caseStudyCode"],
  flag: string
): CountryData {
  const k = `countryPages.${slug}`;
  return {
    slug,
    code,
    caseStudyCode,
    flag,
    nameKey: `${k}.name`,
    titleKey: `${k}.title`,
    descriptionKey: `${k}.description`,
    introKey: `${k}.intro`,
    benefitsKeys: Array.from({ length: 6 }, (_, i) => `${k}.benefit${i + 1}`),
    ctaKey: `${k}.cta`,
  };
}

export const countries: CountryData[] = [
  buildCountry("france", "FR", "FR", "\u{1F1EB}\u{1F1F7}"),
  buildCountry("united-kingdom", "GB", "UK", "\u{1F1EC}\u{1F1E7}"),
  buildCountry("netherlands", "NL", "NL", "\u{1F1F3}\u{1F1F1}"),
  buildCountry("germany", "DE", "DE", "\u{1F1E9}\u{1F1EA}"),
];
