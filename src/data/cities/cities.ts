import type { CityData } from "./types";

function buildCity(slug: string, country: CityData["country"], flag: string, mapQuery: string, lat: string, lng: string): CityData {
  return {
    slug,
    nameKey: `cityPages.${slug}.name`,
    country,
    flag,
    titleKey: `cityPages.${slug}.title`,
    descriptionKey: `cityPages.${slug}.description`,
    introKey: `cityPages.${slug}.intro`,
    benefitsKeys: Array.from({ length: 6 }, (_, i) => `cityPages.${slug}.benefit${i + 1}`),
    ctaKey: `cityPages.${slug}.cta`,
    mapQuery,
    lat,
    lng,
  };
}

export const cities: CityData[] = [
  // France
  buildCity("paris", "FR", "\u{1F1EB}\u{1F1F7}", "Paris,France", "48.8566", "2.3522"),
  buildCity("lyon", "FR", "\u{1F1EB}\u{1F1F7}", "Lyon,France", "45.7640", "4.8357"),
  buildCity("marseille", "FR", "\u{1F1EB}\u{1F1F7}", "Marseille,France", "43.2965", "5.3698"),
  buildCity("lille", "FR", "\u{1F1EB}\u{1F1F7}", "Lille,France", "50.6292", "3.0573"),
  buildCity("nantes", "FR", "\u{1F1EB}\u{1F1F7}", "Nantes,France", "47.2184", "-1.5536"),

  // United Kingdom
  buildCity("london", "GB", "\u{1F1EC}\u{1F1E7}", "London,UK", "51.5074", "-0.1278"),
  buildCity("manchester", "GB", "\u{1F1EC}\u{1F1E7}", "Manchester,UK", "53.4808", "-2.2426"),
  buildCity("birmingham", "GB", "\u{1F1EC}\u{1F1E7}", "Birmingham,UK", "52.4862", "-1.8904"),

  // Belgium
  buildCity("brussels", "BE", "\u{1F1E7}\u{1F1EA}", "Brussels,Belgium", "50.8503", "4.3517"),
  buildCity("antwerp", "BE", "\u{1F1E7}\u{1F1EA}", "Antwerp,Belgium", "51.2194", "4.4025"),

  // Netherlands
  buildCity("amsterdam", "NL", "\u{1F1F3}\u{1F1F1}", "Amsterdam,Netherlands", "52.3676", "4.9041"),
  buildCity("rotterdam", "NL", "\u{1F1F3}\u{1F1F1}", "Rotterdam,Netherlands", "51.9225", "4.4792"),

  // Germany
  buildCity("berlin", "DE", "\u{1F1E9}\u{1F1EA}", "Berlin,Germany", "52.5200", "13.4050"),
];
