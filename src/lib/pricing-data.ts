export interface PricingTier {
  id: string;
  nameKey: string;
  price: number;
  color: string;
  featuresKey: string;
  deliveryKey: string;
  popular: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "launch",
    nameKey: "launch",
    price: 497,
    color: "neo-lime",
    featuresKey: "launchFeatures",
    deliveryKey: "launchDelivery",
    popular: false,
  },
  {
    id: "growth",
    nameKey: "growth",
    price: 997,
    color: "neo-yellow",
    featuresKey: "growthFeatures",
    deliveryKey: "growthDelivery",
    popular: true,
  },
  {
    id: "scale",
    nameKey: "scale",
    price: 1997,
    color: "neo-blue",
    featuresKey: "scaleFeatures",
    deliveryKey: "scaleDelivery",
    popular: false,
  },
  {
    id: "commerce",
    nameKey: "commerce",
    price: 2997,
    color: "neo-purple",
    featuresKey: "commerceFeatures",
    deliveryKey: "commerceDelivery",
    popular: false,
  },
];

export interface AddOn {
  nameKey: string;
  price: string;
}

export const addOns: AddOn[] = [
  { nameKey: "logoDesign", price: "€197" },
  { nameKey: "seoAudit", price: "€297" },
  { nameKey: "googleAds", price: "€397" },
  { nameKey: "socialKit", price: "€197" },
  { nameKey: "videoProduction", price: "€197-497" },
  { nameKey: "monthlySeo", price: "€247/mo" },
];
