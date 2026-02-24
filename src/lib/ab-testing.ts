/**
 * Simple A/B Testing Utility
 * Uses localStorage to persist variant assignment per user session.
 * Track variant performance via analytics events.
 */

interface ABTest {
  id: string;
  variants: string[];
}

const AB_STORAGE_PREFIX = "dmckreatif_ab_";

/**
 * Get the assigned variant for a test.
 * Assigns randomly on first call, persists in localStorage.
 */
export function getVariant(test: ABTest): string {
  const key = `${AB_STORAGE_PREFIX}${test.id}`;

  try {
    const stored = localStorage.getItem(key);
    if (stored && test.variants.includes(stored)) {
      return stored;
    }

    const randomIndex = Math.floor(Math.random() * test.variants.length);
    const variant = test.variants[randomIndex];
    localStorage.setItem(key, variant);
    return variant;
  } catch {
    // Fallback if localStorage unavailable
    return test.variants[0];
  }
}

/**
 * Pre-defined tests
 */
export const TESTS = {
  heroCTA: {
    id: "hero_cta_v1",
    variants: ["start_project", "get_free_quote"],
  },
  pricingLayout: {
    id: "pricing_layout_v1",
    variants: ["cards", "table"],
  },
} as const;

/**
 * Check if user is in a specific variant
 */
export function isVariant(test: ABTest, variant: string): boolean {
  return getVariant(test) === variant;
}
