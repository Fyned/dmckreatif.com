import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const BASE_URL = "https://dmckreatif.com";
const SUPPORTED_LOCALES = ["en", "fr", "nl", "de"] as const;

interface SeoHeadProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

export default function SeoHead({
  title,
  description,
  path = "",
  ogImage = "/og-image.png",
  ogType = "website",
  noIndex = false,
}: SeoHeadProps) {
  const { locale } = useParams();
  const currentLocale = locale ?? "en";
  const canonicalUrl = `${BASE_URL}/${currentLocale}${path}`;
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${BASE_URL}${ogImage}`;

  return (
    <Helmet>
      <html lang={currentLocale} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang tags for all supported languages */}
      {SUPPORTED_LOCALES.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${BASE_URL}/${lang}${path}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}/en${path}`}
      />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="DMC Kreatif" />
      <meta property="og:locale" content={currentLocale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}
