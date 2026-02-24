import type { TemplateTier } from "@/types/database";

export interface TemplateTierConfig {
  id: TemplateTier;
  nameKey: string;
  price: number;
  pages: string;
  color: string;
  featuresKey: string;
  descKey: string;
}

export const templateTiers: TemplateTierConfig[] = [
  {
    id: "business_card",
    nameKey: "businessCard",
    price: 39,
    pages: "1",
    color: "neo-lime",
    featuresKey: "businessCardFeatures",
    descKey: "businessCardDesc",
  },
  {
    id: "starter",
    nameKey: "starter",
    price: 99,
    pages: "3",
    color: "neo-yellow",
    featuresKey: "starterFeatures",
    descKey: "starterDesc",
  },
  {
    id: "professional",
    nameKey: "professional",
    price: 179,
    pages: "5+",
    color: "neo-blue",
    featuresKey: "professionalFeatures",
    descKey: "professionalDesc",
  },
];

export const TEMPLATE_TIER_PRICES: Record<TemplateTier, number> = {
  business_card: 39,
  starter: 99,
  professional: 179,
};
