const BASE_URL = "https://dmckreatif.com";

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DMC Kreatif",
    alternateName: "GMG Design",
    url: BASE_URL,
    email: "hello@dmckreatif.com",
    founder: { "@type": "Person", name: "Musa Kerem Demirci" },
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Belgium" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Switzerland" },
    ],
    serviceType: [
      "Web Development",
      "E-Commerce Development",
      "SEO Optimization",
      "Digital Marketing",
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DMC Kreatif",
    url: BASE_URL,
    inLanguage: ["en", "fr", "nl", "de"],
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "DMC Kreatif",
    alternateName: "DMC Kreatif Web Agency",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/og-image.jpg`,
    email: "hello@dmckreatif.com",
    telephone: "+90-551-106-0846",
    priceRange: "\u20AC\u20AC",
    description: "Premium web development agency serving European businesses. Custom websites, e-commerce, SEO and digital marketing.",
    foundingDate: "2023",
    founder: {
      "@type": "Person",
      name: "Musa Kerem Demirci",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
      addressRegion: "Europe",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "48.8566",
      longitude: "2.3522",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Belgium" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Switzerland" },
    ],
    serviceType: [
      "Web Development",
      "E-Commerce Development",
      "SEO Optimization",
      "Digital Marketing",
    ],
    knowsLanguage: ["en", "fr", "nl", "de"],
    paymentAccepted: "Bank Transfer, Credit Card",
    sameAs: [
      "https://www.linkedin.com/company/dmckreatif",
    ],
  };
}

export function buildBreadcrumbSchema(
  locale: string,
  items: BreadcrumbItem[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}/${locale}${item.path}`,
    })),
  };
}

export function buildServiceSchema(params: {
  name: string;
  description: string;
  price: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: { "@type": "Organization", name: "DMC Kreatif" },
    name: params.name,
    description: params.description,
    offers: {
      "@type": "Offer",
      price: params.price,
      priceCurrency: "EUR",
    },
    areaServed: [
      "France",
      "Belgium",
      "United Kingdom",
      "Netherlands",
      "Germany",
    ],
  };
}

export function buildBlogPostingSchema(params: {
  title: string;
  description: string;
  datePublished: string;
  slug: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.title,
    description: params.description,
    datePublished: params.datePublished,
    author: { "@type": "Person", name: "Musa Kerem Demirci" },
    publisher: { "@type": "Organization", name: "DMC Kreatif" },
    mainEntityOfPage: `${BASE_URL}/${params.locale}/blog/${params.slug}`,
  };
}

export function buildFaqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildAggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DMC Kreatif",
    url: BASE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "6",
      reviewCount: "6",
    },
  };
}

export function buildReviewSchema(reviews: Array<{
  author: string;
  rating: number;
  body: string;
  company: string;
  datePublished: string;
}>) {
  return reviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author: { "@type": "Person", name: review.author },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(review.rating),
      bestRating: "5",
    },
    reviewBody: review.body,
    itemReviewed: {
      "@type": "Organization",
      name: "DMC Kreatif",
    },
    publisher: {
      "@type": "Organization",
      name: review.company,
    },
    datePublished: review.datePublished,
  }));
}

export function buildOfferSchema(offers: Array<{
  name: string;
  description: string;
  price: number;
  deliveryDays: string;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "DMC Kreatif",
      url: BASE_URL,
    },
    name: "Web Development Services",
    serviceType: "Web Development",
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Belgium" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Country", name: "Germany" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Packages",
      itemListElement: offers.map((offer) => ({
        "@type": "Offer",
        name: offer.name,
        description: offer.description,
        price: String(offer.price),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        deliveryLeadTime: {
          "@type": "QuantitativeValue",
          value: offer.deliveryDays,
          unitCode: "DAY",
        },
        seller: {
          "@type": "Organization",
          name: "DMC Kreatif",
        },
      })),
    },
  };
}

export function buildHowToSchema(steps: Array<{
  name: string;
  text: string;
  position: number;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Get a Professional Website Built by DMC Kreatif",
    description: "Our streamlined 4-step process takes you from initial concept to a fully launched website.",
    totalTime: "P14D",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: "497",
    },
    step: steps.map((step) => ({
      "@type": "HowToStep",
      position: step.position,
      name: step.name,
      text: step.text,
    })),
  };
}

export function buildSoftwareApplicationSchema(params: {
  name: string;
  description: string;
  price: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: params.name,
    description: params.description,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: params.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Organization",
      name: "DMC Kreatif",
      url: BASE_URL,
    },
    softwareVersion: "1.0",
    applicationSubCategory: params.category,
  };
}
