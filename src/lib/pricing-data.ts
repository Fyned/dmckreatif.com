export interface PricingTier {
  id: string;
  nameKey: string;
  price: number;
  originalPrice: number;
  color: string;
  featuresKey: string;
  deliveryKey: string;
  popular: boolean;
}

// originalPrice = price / 0.75 (rounded) so discount is exactly 25%
export const pricingTiers: PricingTier[] = [
  {
    id: "launch",
    nameKey: "launch",
    price: 349,
    originalPrice: 465,
    color: "neo-lime",
    featuresKey: "launchFeatures",
    deliveryKey: "launchDelivery",
    popular: false,
  },
  {
    id: "growth",
    nameKey: "growth",
    price: 749,
    originalPrice: 999,
    color: "neo-yellow",
    featuresKey: "growthFeatures",
    deliveryKey: "growthDelivery",
    popular: false,
  },
  {
    id: "scale",
    nameKey: "scale",
    price: 1497,
    originalPrice: 1996,
    color: "neo-blue",
    featuresKey: "scaleFeatures",
    deliveryKey: "scaleDelivery",
    popular: true,
  },
  {
    id: "commerce",
    nameKey: "commerce",
    price: 2497,
    originalPrice: 3329,
    color: "neo-purple",
    featuresKey: "commerceFeatures",
    deliveryKey: "commerceDelivery",
    popular: false,
  },
];

export interface CarePlanTier {
  id: string;
  nameKey: string;
  price: number;
  color: string;
  featuresKey: string;
  popular: boolean;
}

export const carePlanTiers: CarePlanTier[] = [
  {
    id: "basic",
    nameKey: "carePlanBasic",
    price: 47,
    color: "neo-lime",
    featuresKey: "carePlanBasicFeatures",
    popular: false,
  },
  {
    id: "pro",
    nameKey: "carePlanPro",
    price: 97,
    color: "neo-yellow",
    featuresKey: "carePlanProFeatures",
    popular: true,
  },
  {
    id: "enterprise",
    nameKey: "carePlanEnterprise",
    price: 197,
    color: "neo-blue",
    featuresKey: "carePlanEnterpriseFeatures",
    popular: false,
  },
];

export interface SeoPlan {
  id: string;
  nameKey: string;
  price: number;
  period: string;
  color: string;
  featuresKey: string;
  popular: boolean;
}

export const seoPlans: SeoPlan[] = [
  {
    id: "seo-monthly",
    nameKey: "seoMonthly",
    price: 300,
    period: "month",
    color: "neo-lime",
    featuresKey: "seoMonthlyFeatures",
    popular: false,
  },
  {
    id: "seo-6month",
    nameKey: "seo6Month",
    price: 1500,
    period: "6months",
    color: "neo-yellow",
    featuresKey: "seo6MonthFeatures",
    popular: true,
  },
  {
    id: "seo-yearly",
    nameKey: "seoYearly",
    price: 2500,
    period: "year",
    color: "neo-blue",
    featuresKey: "seoYearlyFeatures",
    popular: false,
  },
];

export interface AddOn {
  nameKey: string;
  price: string;
  descKey: string;
}

export const addOns: AddOn[] = [
  { nameKey: "logoDesign", price: "\u20AC199", descKey: "logoDesignDesc" },
  { nameKey: "seoAudit", price: "\u20AC299", descKey: "seoAuditDesc" },
  { nameKey: "googleAds", price: "\u20AC449", descKey: "googleAdsDesc" },
  { nameKey: "socialKit", price: "\u20AC249", descKey: "socialKitDesc" },
  { nameKey: "videoProduction", price: "\u20AC249-499", descKey: "videoProductionDesc" },
];
