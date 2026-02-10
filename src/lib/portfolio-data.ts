export interface Project {
  id: string;
  name: string;
  sector: string;
  country: "FR" | "BE" | "UK" | "INT";
  countryName: string;
  flag: string;
  url: string;
  tech: string[];
  accentColor: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: "cakir-facades",
    name: "CAKIR FACADES",
    sector: "Facade Renovation",
    country: "FR",
    countryName: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    url: "https://cakirfacades.fr",
    tech: ["React", "Vite", "Tailwind"],
    accentColor: "neo-lime",
    description: "Complete brand identity and web presence for a premium facade renovation company in France.",
  },
  {
    id: "altinbas-moustiquaire",
    name: "ALTINBAS",
    sector: "Manufacturing",
    country: "FR",
    countryName: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    url: "https://altinbasmoustiquaire.fr",
    tech: ["React", "Vite", "Tailwind"],
    accentColor: "neo-yellow",
    description: "E-commerce ready website for a French mosquito screen manufacturer.",
  },
  {
    id: "consulting-energy",
    name: "CONSULTING ENERGY",
    sector: "Energy Consulting",
    country: "FR",
    countryName: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    url: "https://consulting-energy.fr",
    tech: ["React", "Vite", "TypeScript"],
    accentColor: "neo-blue",
    description: "Professional consulting website for an energy advisory firm in France.",
  },
  {
    id: "archi-construction",
    name: "ARCHI CONSTRUCTION",
    sector: "Construction & Veranda",
    country: "BE",
    countryName: "Belgium",
    flag: "\u{1F1E7}\u{1F1EA}",
    url: "https://archi.constructionveranda.com",
    tech: ["React", "Vite", "TypeScript", "Tailwind"],
    accentColor: "neo-pink",
    description: "Multi-language construction company website serving the Belgian market.",
  },
  {
    id: "adamsons",
    name: "ADAMSONS ACCOUNTANTS",
    sector: "Accounting Firm",
    country: "UK",
    countryName: "United Kingdom",
    flag: "\u{1F1EC}\u{1F1E7}",
    url: "https://adamsons.uk.com",
    tech: ["React", "Vite", "Tailwind"],
    accentColor: "neo-purple",
    description: "Modern accountancy firm website with client portal integration.",
  },
  {
    id: "iso-home-energy",
    name: "ISO HOME ENERGY",
    sector: "Energy & Insulation",
    country: "FR",
    countryName: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    url: "https://ih-energy.fr",
    tech: ["React", "Vite", "TypeScript", "Tailwind"],
    accentColor: "neo-green",
    description: "Lead generation website for a home insulation and energy company.",
  },
  {
    id: "filenes-sports",
    name: "FILENES SPORTS",
    sector: "E-Commerce / Sports",
    country: "INT",
    countryName: "International",
    flag: "\u{1F30D}",
    url: "",
    tech: ["React", "Vite", "TypeScript", "Supabase"],
    accentColor: "neo-orange",
    description: "Full e-commerce platform for sports equipment with inventory management.",
  },
  {
    id: "ata-accountancy",
    name: "ATA ACCOUNTANCY",
    sector: "Accounting Firm",
    country: "UK",
    countryName: "United Kingdom",
    flag: "\u{1F1EC}\u{1F1E7}",
    url: "",
    tech: ["React", "Vite", "Tailwind"],
    accentColor: "neo-blue",
    description: "Professional accounting firm website with service booking system.",
  },
  {
    id: "gmg-design",
    name: "GMG DESIGN",
    sector: "Digital Agency",
    country: "INT",
    countryName: "International",
    flag: "\u{1F30D}",
    url: "",
    tech: ["React", "Vite", "Tailwind"],
    accentColor: "neo-lime",
    description: "Our sister brand's digital presence, built with the same quality standards.",
  },
];

export const featuredProjects = projects.slice(0, 6);
