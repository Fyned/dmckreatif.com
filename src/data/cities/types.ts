export type CityCountry = "FR" | "GB" | "BE" | "NL" | "DE";

export interface CityData {
  slug: string;
  nameKey: string;
  country: CityCountry;
  flag: string;
  titleKey: string;
  descriptionKey: string;
  introKey: string;
  benefitsKeys: string[];
  ctaKey: string;
  mapQuery: string;
  lat: string;
  lng: string;
}
