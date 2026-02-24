export interface Testimonial {
  id: string;
  nameKey: string;
  roleKey: string;
  company: string;
  quoteKey: string;
  country: string;
  flag: string;
  accentColor: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "report-001",
    nameKey: "client1Name",
    roleKey: "client1Role",
    company: "CAKIR FACADES",
    quoteKey: "client1Quote",
    country: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    accentColor: "neo-lime",
    rating: 5,
  },
  {
    id: "report-002",
    nameKey: "client2Name",
    roleKey: "client2Role",
    company: "ARCHI CONSTRUCTION",
    quoteKey: "client2Quote",
    country: "Belgium",
    flag: "\u{1F1E7}\u{1F1EA}",
    accentColor: "neo-pink",
    rating: 5,
  },
  {
    id: "report-003",
    nameKey: "client3Name",
    roleKey: "client3Role",
    company: "ADAMSONS ACCOUNTANTS",
    quoteKey: "client3Quote",
    country: "United Kingdom",
    flag: "\u{1F1EC}\u{1F1E7}",
    accentColor: "neo-blue",
    rating: 5,
  },
  {
    id: "report-004",
    nameKey: "client4Name",
    roleKey: "client4Role",
    company: "CONSULTING ENERGY",
    quoteKey: "client4Quote",
    country: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    accentColor: "neo-yellow",
    rating: 5,
  },
  {
    id: "report-005",
    nameKey: "client5Name",
    roleKey: "client5Role",
    company: "ALTINBAS MOUSTIQUAIRE",
    quoteKey: "client5Quote",
    country: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    accentColor: "neo-orange",
    rating: 5,
  },
  {
    id: "report-006",
    nameKey: "client6Name",
    roleKey: "client6Role",
    company: "ISO HOME ENERGY",
    quoteKey: "client6Quote",
    country: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    accentColor: "neo-purple",
    rating: 4,
  },
];
