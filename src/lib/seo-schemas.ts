const BASE_URL = "https://dmckreatif.com";

interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * ProfessionalService schema (LocalBusiness subtype) with aggregateRating
 * and reviews embedded. Used on the contact page and optionally homepage.
 *
 * Merges what was previously separate Organization, AggregateRating, and
 * Review schemas into one coherent entity to avoid duplicate entities
 * and to make AggregateRating eligible for rich results.
 */
export function buildProfessionalServiceSchema(reviews?: Array<{
  author: string;
  rating: number;
  body: string;
  company: string;
  datePublished: string;
}>) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/#organization`,
    name: "DMC Kreatif",
    alternateName: "DMC Kreatif Web Agency",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    image: `${BASE_URL}/og-image.png`,
    email: "hello@dmckreatif.com",
    priceRange: "€€",
    description:
      "UK-registered web development agency with 100+ professionals serving European businesses. Custom websites, e-commerce, SEO and digital marketing across 6 countries.",
    foundingDate: "2023-01-01",
    founder: {
      "@type": "Person",
      name: "Musa Kerem Demirci",
      jobTitle: "CEO & Founder",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 1,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "GB",
      addressLocality: "London",
      addressRegion: "England",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.5074,
      longitude: -0.1278,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
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
    knowsLanguage: ["en", "fr", "nl", "de"],
    paymentAccepted: "Bank Transfer, Credit Card",
    sameAs: [
      "https://www.linkedin.com/company/dmckreatif",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      bestRating: 5,
      worstRating: 1,
      ratingCount: 6,
      reviewCount: 6,
    },
  };

  if (reviews && reviews.length > 0) {
    schema.review = reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.body,
      datePublished: review.datePublished,
      publisher: {
        "@type": "Organization",
        name: "DMC Kreatif",
      },
    }));
  }

  return schema;
}

/**
 * @deprecated Use buildProfessionalServiceSchema instead.
 * Kept for backward compatibility during migration.
 */
export function buildLocalBusinessSchema() {
  return buildProfessionalServiceSchema();
}

/**
 * BreadcrumbList schema.
 * Now includes the current page (last item) without a URL, per Google guidelines.
 */
interface BreadcrumbListItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
}

export function buildBreadcrumbSchema(
  locale: string,
  items: BreadcrumbItem[],
  currentPageName?: string
) {
  const listItems: BreadcrumbListItem[] = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${BASE_URL}/${locale}${item.path}`,
  }));

  if (currentPageName) {
    listItems.push({
      "@type": "ListItem",
      position: listItems.length + 1,
      name: currentPageName,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: listItems,
  };
}

/**
 * Service schema with proper Country objects in areaServed.
 */
export function buildServiceSchema(params: {
  name: string;
  description: string;
  price: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "DMC Kreatif",
      url: BASE_URL,
    },
    name: params.name,
    description: params.description,
    offers: {
      "@type": "Offer",
      price: params.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Belgium" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Country", name: "Germany" },
    ],
  };
}

/**
 * Multiple Service schemas for the services page.
 * Each service gets its own schema block.
 */
export function buildAllServicesSchema(locale: string) {
  const services = [
    {
      name: "Custom Web Development",
      description:
        "Custom websites built with React, Next.js, and Vite. Responsive design, SEO optimized, 95+ Lighthouse score.",
      price: "497",
      url: `${BASE_URL}/${locale}/services#web-development`,
    },
    {
      name: "E-Commerce Development",
      description:
        "Full e-commerce solutions with payment integration, inventory management, multi-currency support, and secure checkout.",
      price: "2997",
      url: `${BASE_URL}/${locale}/services#e-commerce`,
    },
    {
      name: "SEO Optimization",
      description:
        "Technical SEO audit, keyword research, Google Analytics setup, Search Console configuration, and monthly reports.",
      price: "297",
      url: `${BASE_URL}/${locale}/services#seo`,
    },
    {
      name: "Website Maintenance & Care Plan",
      description:
        "Hosting, SSL, monthly updates, security monitoring, performance reports, priority support, and uptime guarantee.",
      price: "97",
      url: `${BASE_URL}/${locale}/services#maintenance`,
    },
  ];

  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "DMC Kreatif",
      url: BASE_URL,
    },
    name: service.name,
    description: service.description,
    url: service.url,
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Belgium" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Country", name: "Germany" },
    ],
  }));
}

/**
 * BlogPosting schema with proper publisher logo.
 */
export function buildBlogPostingSchema(params: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  slug: string;
  locale: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.title,
    description: params.description,
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    image: params.image ?? `${BASE_URL}/og-image.png`,
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#founder`,
      name: "Musa Kerem Demirci",
      url: "https://dmckreatif.com",
      jobTitle: "Founder & Lead Developer",
      description: "Full-stack developer specialising in React, Next.js, and modern web technologies for European businesses.",
      knowsAbout: ["Web Development", "React", "Next.js", "SEO", "E-Commerce", "Digital Marketing", "Tailwind CSS"],
      sameAs: ["https://www.linkedin.com/in/musakeremdemirci", "https://dmckreatif.com"],
      worksFor: { "@id": `${BASE_URL}/#organization` },
    },
    publisher: {
      "@type": "Organization",
      name: "DMC Kreatif",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${params.locale}/blog/${params.slug}`,
    },
  };
}

/**
 * Service with OfferCatalog for the pricing page.
 * Fixed: deliveryLeadTime uses maxValue for ranges.
 */
export function buildOfferSchema(
  offers: Array<{
    name: string;
    description: string;
    price: number;
    deliveryDays: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "DMC Kreatif",
      url: BASE_URL,
      logo: `${BASE_URL}/logo.svg`,
    },
    name: "Web Development Services",
    description:
      "Professional web development packages for European businesses, from single-page sites to full e-commerce platforms.",
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
      itemListElement: offers.map((offer) => {
        // Parse delivery days range, use max value
        const days = offer.deliveryDays.split("-");
        const maxDays = parseInt(days[days.length - 1], 10);
        return {
          "@type": "Offer",
          name: offer.name,
          description: offer.description,
          price: offer.price,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          deliveryLeadTime: {
            "@type": "QuantitativeValue",
            value: maxDays,
            unitCode: "DAY",
          },
          seller: {
            "@type": "Organization",
            name: "DMC Kreatif",
          },
        };
      }),
    },
  };
}

/**
 * SoftwareApplication schema for technology detail pages.
 */
export function buildTechnologySchema(params: {
  name: string;
  description: string;
  version: string;
  url: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: params.name,
    description: params.description,
    softwareVersion: params.version,
    url: params.url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    author: {
      "@type": "Organization",
      name: "DMC Kreatif",
      url: BASE_URL,
    },
    review: {
      "@type": "Review",
      author: { "@type": "Organization", name: "DMC Kreatif" },
      reviewBody: params.description,
    },
  };
}

/**
 * WebPage schema for generic pages.
 */
export function buildWebPageSchema(params: {
  name: string;
  description: string;
  url: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: params.name,
    description: params.description,
    url: params.url,
    inLanguage: params.locale,
    isPartOf: {
      "@type": "WebSite",
      name: "DMC Kreatif",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "DMC Kreatif",
      url: BASE_URL,
    },
  };
}

/**
 * AboutPage schema with founder Person entity.
 */
export function buildAboutPageSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About DMC Kreatif",
    description:
      "Learn about DMC Kreatif, a UK-registered web development agency founded by Musa Kerem Demirci, serving European businesses.",
    url: `${BASE_URL}/${locale}/about`,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: "DMC Kreatif",
      url: BASE_URL,
    },
    mainEntity: {
      "@type": "Person",
      name: "Musa Kerem Demirci",
      jobTitle: "CEO & Founder",
      url: "https://www.linkedin.com/in/musakeremdemirci",
      sameAs: ["https://www.linkedin.com/in/musakeremdemirci"],
      worksFor: {
        "@type": "Organization",
        name: "DMC Kreatif",
        url: BASE_URL,
      },
      knowsAbout: [
        "Web Development",
        "React",
        "Next.js",
        "TypeScript",
        "SEO Optimization",
        "E-Commerce Development",
      ],
      knowsLanguage: ["en", "fr", "nl", "de"],
    },
  };
}

/**
 * ContactPage schema for the contact page.
 */
export function buildContactPageSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact DMC Kreatif",
    description:
      "Get in touch with DMC Kreatif for premium web development services across Europe.",
    url: `${BASE_URL}/${locale}/contact`,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: "DMC Kreatif",
      url: BASE_URL,
    },
    mainEntity: {
      "@type": "Organization",
      name: "DMC Kreatif",
      email: "hello@dmckreatif.com",
      url: BASE_URL,
    },
  };
}

/**
 * CollectionPage schema for the portfolio page.
 */
export function buildPortfolioPageSchema(
  locale: string,
  projects: Array<{
    name: string;
    url: string;
    description?: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio - DMC Kreatif",
    description:
      "Web development portfolio showcasing projects for businesses across France, Belgium, and the UK.",
    url: `${BASE_URL}/${locale}/portfolio`,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: "DMC Kreatif",
      url: BASE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.name,
        url: project.url,
        description: project.description,
      })),
    },
  };
}

/**
 * FAQPage schema for rich snippets in SERPs.
 * Use on pricing, services, and dedicated FAQ pages.
 */
export function buildFAQPageSchema(
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

/**
 * HowTo schema for process/workflow pages.
 * Eligible for rich snippets showing steps in SERPs.
 */
export function buildHowToSchema(params: {
  name: string;
  description: string;
  totalTime?: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: params.name,
    description: params.description,
    ...(params.totalTime && { totalTime: params.totalTime }),
    step: params.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * ProfessionalService schema scoped to a specific city.
 * Used on city/local SEO landing pages.
 */
export function buildCitySchema(params: {
  cityName: string;
  lat: string;
  lng: string;
  locale: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "DMC Kreatif",
    ...(params.serviceType && { serviceType: params.serviceType }),
    url: BASE_URL,
    email: "hello@dmckreatif.com",
    priceRange: "\u20AC\u20AC",
    areaServed: {
      "@type": "City",
      name: params.cityName,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: params.lat,
      longitude: params.lng,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: params.cityName,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Web Development", description: "Custom websites built with React and Next.js" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "E-Commerce Development", description: "Full e-commerce solutions with payment integration" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "SEO Optimization", description: "Technical SEO audit, keyword research, and monthly reports" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Digital Marketing", description: "Google Ads, social media, and marketing automation" },
        },
      ],
    },
    knowsLanguage: ["en", "fr", "nl", "de"],
    sameAs: [
      "https://www.linkedin.com/company/dmckreatif",
    ],
  };
}

export function buildCountrySchema(params: {
  countryName: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "DMC Kreatif",
    url: BASE_URL,
    email: "hello@dmckreatif.com",
    priceRange: "\u20AC\u20AC",
    areaServed: {
      "@type": "Country",
      name: params.countryName,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Web Development Services in ${params.countryName}`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Web Development", description: "Custom websites built with React and Next.js" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "E-Commerce Development", description: "Full e-commerce solutions with payment integration" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "SEO Optimization", description: "Technical SEO audit, keyword research, and monthly reports" },
        },
      ],
    },
    knowsLanguage: ["en", "fr", "nl", "de"],
    sameAs: [
      "https://www.linkedin.com/company/dmckreatif",
    ],
  };
}

/**
 * Industry-specific service schema for industry/vertical pages.
 */
export function buildIndustrySchema(params: {
  name: string;
  description: string;
  slug: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "DMC Kreatif",
      url: BASE_URL,
    },
    name: `Web Development for ${params.name}`,
    description: params.description,
    url: `${BASE_URL}/${params.locale}/industries/${params.slug}`,
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Belgium" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Country", name: "Germany" },
    ],
    audience: {
      "@type": "Audience",
      audienceType: params.name,
    },
  };
}

export function buildCaseStudySchema(params: {
  name: string;
  description: string;
  clientUrl: string;
  datePublished: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `Case Study: ${params.name}`,
    description: params.description,
    url: `${BASE_URL}/${params.locale}/case-studies`,
    datePublished: params.datePublished,
    creator: {
      "@type": "Organization",
      name: "DMC Kreatif",
      url: BASE_URL,
    },
    about: {
      "@type": "WebSite",
      name: params.name,
      url: params.clientUrl,
    },
    inLanguage: params.locale,
  };
}

/**
 * SoftwareApplication schema for templates.
 * Added required screenshot and rating properties.
 */
export function buildSoftwareApplicationSchema(params: {
  name: string;
  description: string;
  price: string;
  category: string;
  screenshot?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: params.name,
    description: params.description,
    applicationCategory: "WebApplication",
    operatingSystem: "All",
    screenshot: params.screenshot ?? `${BASE_URL}/og-image.png`,
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
    applicationSubCategory: params.category,
  };
}
