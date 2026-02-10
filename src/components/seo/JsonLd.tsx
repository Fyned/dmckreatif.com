interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DMC Kreatif",
  alternateName: "GMG Design",
  url: "https://dmckreatif.com",
  email: "hello@dmckreatif.com",
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Belgium" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Netherlands" },
    { "@type": "Country", name: "Germany" },
  ],
  serviceType: [
    "Web Development",
    "E-Commerce Development",
    "SEO Optimization",
    "Digital Marketing",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DMC Kreatif",
  url: "https://dmckreatif.com",
  inLanguage: ["en", "fr"],
};
