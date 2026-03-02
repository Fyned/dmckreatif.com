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
    price: 497,
    originalPrice: 663,
    color: "neo-lime",
    featuresKey: "launchFeatures",
    deliveryKey: "launchDelivery",
    popular: false,
  },
  {
    id: "growth",
    nameKey: "growth",
    price: 997,
    originalPrice: 1329,
    color: "neo-yellow",
    featuresKey: "growthFeatures",
    deliveryKey: "growthDelivery",
    popular: false,
  },
  {
    id: "scale",
    nameKey: "scale",
    price: 1997,
    originalPrice: 2663,
    color: "neo-blue",
    featuresKey: "scaleFeatures",
    deliveryKey: "scaleDelivery",
    popular: true,
  },
  {
    id: "commerce",
    nameKey: "commerce",
    price: 2997,
    originalPrice: 3996,
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

// Monthly retainer plans — tiered by service scope, not commitment length
export const seoPlans: SeoPlan[] = [
  {
    id: "local",
    nameKey: "seoLocal",
    price: 199,
    period: "month",
    color: "neo-lime",
    featuresKey: "seoLocalFeatures",
    popular: false,
  },
  {
    id: "growth",
    nameKey: "seoGrowth",
    price: 349,
    period: "month",
    color: "neo-yellow",
    featuresKey: "seoGrowthFeatures",
    popular: true,
  },
  {
    id: "authority",
    nameKey: "seoAuthority",
    price: 599,
    period: "month",
    color: "neo-blue",
    featuresKey: "seoAuthorityFeatures",
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
];

export interface BundleItem {
  type: "website" | "seo" | "care" | "branding" | "marketing";
  label: string;
  value: number;
}

export interface Bundle {
  id: string;
  nameKey: string;
  tagKey: string;
  color: string;
  includes: BundleItem[];
  regularPrice: number;
  bundlePrice: number;
  savingsPercent: number;
  monthlyEquiv: number | null;
  seoMonths: number;
  featuresKey: string;
  popular: boolean;
}

// COMPLETE PACKAGES — website + branding + SEO + marketing + care, all-in-one
// Monthly equiv = bundlePrice / seoMonths — amortized over SEO commitment period
export const bundles: Bundle[] = [
  {
    id: "starter-complete",
    nameKey: "pkgStarterComplete",
    tagKey: "pkgStarterCompleteTag",
    color: "neo-lime",
    includes: [
      { type: "website",   label: "Starter Website",         value: 497  },
      { type: "branding",  label: "Logo Design",             value: 199  },
      { type: "seo",       label: "Local SEO \u00d7 3 months",  value: 597  },
      { type: "care",      label: "Care Basic \u00d7 3 months", value: 141  },
    ],
    regularPrice: 1434,
    bundlePrice: 1097,
    savingsPercent: 24,
    monthlyEquiv: null,
    seoMonths: 3,
    featuresKey: "pkgStarterCompleteFeatures",
    popular: false,
  },
  {
    id: "business-complete",
    nameKey: "pkgBusinessComplete",
    tagKey: "pkgBusinessCompleteTag",
    color: "neo-yellow",
    includes: [
      { type: "website",   label: "Business Website",          value: 997  },
      { type: "branding",  label: "Logo + Social Media Kit",   value: 448  },
      { type: "seo",       label: "Growth SEO \u00d7 6 months",  value: 2094 },
      { type: "marketing", label: "Google Ads Setup",           value: 449  },
      { type: "care",      label: "Care Pro \u00d7 6 months",    value: 582  },
    ],
    regularPrice: 4570,
    bundlePrice: 2997,
    savingsPercent: 34,
    monthlyEquiv: 500,
    seoMonths: 6,
    featuresKey: "pkgBusinessCompleteFeatures",
    popular: true,
  },
  {
    id: "scale-complete",
    nameKey: "pkgScaleComplete",
    tagKey: "pkgScaleCompleteTag",
    color: "neo-blue",
    includes: [
      { type: "website",   label: "Scale Website",                  value: 1997 },
      { type: "branding",  label: "Logo + Social Media Kit",        value: 448  },
      { type: "seo",       label: "Growth SEO \u00d7 12 months",     value: 4188 },
      { type: "marketing", label: "Google Ads Setup",                value: 449  },
      { type: "care",      label: "Care Pro \u00d7 12 months",       value: 1164 },
    ],
    regularPrice: 8246,
    bundlePrice: 5997,
    savingsPercent: 27,
    monthlyEquiv: 500,
    seoMonths: 12,
    featuresKey: "pkgScaleCompleteFeatures",
    popular: false,
  },
  {
    id: "commerce-complete",
    nameKey: "pkgCommerceComplete",
    tagKey: "pkgCommerceCompleteTag",
    color: "neo-purple",
    includes: [
      { type: "website",   label: "Commerce Website",               value: 2997 },
      { type: "branding",  label: "Logo + Social Media Kit",        value: 448  },
      { type: "seo",       label: "Authority SEO \u00d7 12 months", value: 7188 },
      { type: "marketing", label: "Google Ads Setup",               value: 449  },
      { type: "care",      label: "Care Enterprise \u00d7 12 months", value: 2364 },
    ],
    regularPrice: 13446,
    bundlePrice: 9997,
    savingsPercent: 26,
    monthlyEquiv: 833,
    seoMonths: 12,
    featuresKey: "pkgCommerceCompleteFeatures",
    popular: false,
  },
];
