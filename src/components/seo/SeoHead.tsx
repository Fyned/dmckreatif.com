import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const BASE_URL = "https://dmckreatif.com";
const SUPPORTED_LOCALES = ["en", "fr", "nl", "de"] as const;

interface SeoHeadProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  /** Override which locales get hreflang tags. Defaults to all 4. Pass ["en"] for EN-only content. */
  locales?: string[];
  /** Force canonical to a specific locale (e.g. "en" for EN-only blog posts). Defaults to current URL locale. */
  canonicalLocale?: string;
}

export default function SeoHead({
  title,
  description,
  path = "",
  ogImage = "/og-image.png",
  ogImageAlt,
  ogType = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
  locales,
  canonicalLocale,
}: SeoHeadProps) {
  const { locale } = useParams();
  const currentLocale = locale ?? "en";
  const canonicalUrl = `${BASE_URL}/${canonicalLocale ?? currentLocale}${path}`;
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${BASE_URL}${ogImage}`;
  const activeLocales = locales ?? [...SUPPORTED_LOCALES];
  const alternateLocales = activeLocales.filter(
    (l) => l !== currentLocale
  );

  return (
    <Helmet>
      <html lang={currentLocale} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang tags — only for activeLocales (EN-only content passes ["en"]) */}
      {activeLocales.map((lang) => (
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
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content={ogImageAlt ?? title}
      />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="DMC Kreatif" />
      <meta property="og:locale" content={{ en: "en_US", fr: "fr_FR", nl: "nl_NL", de: "de_DE" }[currentLocale] ?? "en_US"} />
      {alternateLocales.map((lang) => (
        <meta
          key={`og-alt-${lang}`}
          property="og:locale:alternate"
          content={{ en: "en_US", fr: "fr_FR", nl: "nl_NL", de: "de_DE" }[lang] ?? lang}
        />
      ))}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta
        name="twitter:image:alt"
        content={ogImageAlt ?? title}
      />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}
