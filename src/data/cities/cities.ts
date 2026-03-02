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
  buildCity("munich", "DE", "\u{1F1E9}\u{1F1EA}", "Munich,Germany", "48.1351", "11.5820"),
  buildCity("hamburg", "DE", "\u{1F1E9}\u{1F1EA}", "Hamburg,Germany", "53.5753", "10.0153"),
  buildCity("frankfurt", "DE", "\u{1F1E9}\u{1F1EA}", "Frankfurt,Germany", "50.1109", "8.6821"),
  buildCity("cologne", "DE", "\u{1F1E9}\u{1F1EA}", "Cologne,Germany", "50.9333", "6.9500"),
  buildCity("stuttgart", "DE", "\u{1F1E9}\u{1F1EA}", "Stuttgart,Germany", "48.7758", "9.1829"),
  buildCity("dusseldorf", "DE", "\u{1F1E9}\u{1F1EA}", "Düsseldorf,Germany", "51.2217", "6.7762"),

  // France (additional)
  buildCity("bordeaux", "FR", "\u{1F1EB}\u{1F1F7}", "Bordeaux,France", "44.8378", "-0.5792"),
  buildCity("toulouse", "FR", "\u{1F1EB}\u{1F1F7}", "Toulouse,France", "43.6047", "1.4442"),
  buildCity("nice", "FR", "\u{1F1EB}\u{1F1F7}", "Nice,France", "43.7102", "7.2620"),
  buildCity("strasbourg", "FR", "\u{1F1EB}\u{1F1F7}", "Strasbourg,France", "48.5734", "7.7521"),
  buildCity("rennes", "FR", "\u{1F1EB}\u{1F1F7}", "Rennes,France", "48.1147", "-1.6794"),

  // United Kingdom (additional)
  buildCity("edinburgh", "GB", "\u{1F1EC}\u{1F1E7}", "Edinburgh,UK", "55.9533", "-3.1883"),
  buildCity("leeds", "GB", "\u{1F1EC}\u{1F1E7}", "Leeds,UK", "53.8008", "-1.5491"),
  buildCity("glasgow", "GB", "\u{1F1EC}\u{1F1E7}", "Glasgow,UK", "55.8642", "-4.2518"),
  buildCity("bristol", "GB", "\u{1F1EC}\u{1F1E7}", "Bristol,UK", "51.4545", "-2.5879"),

  // Netherlands (additional)
  buildCity("the-hague", "NL", "\u{1F1F3}\u{1F1F1}", "Den Haag,Netherlands", "52.0705", "4.3007"),
  buildCity("utrecht", "NL", "\u{1F1F3}\u{1F1F1}", "Utrecht,Netherlands", "52.0907", "5.1214"),
  buildCity("eindhoven", "NL", "\u{1F1F3}\u{1F1F1}", "Eindhoven,Netherlands", "51.4416", "5.4697"),

  // Belgium (additional)
  buildCity("ghent", "BE", "\u{1F1E7}\u{1F1EA}", "Ghent,Belgium", "51.0543", "3.7174"),
  buildCity("liege", "BE", "\u{1F1E7}\u{1F1EA}", "Liège,Belgium", "50.6457", "5.5797"),
];
