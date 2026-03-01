const fs = require("fs");
const path = require("path");
const localesDir = path.join(__dirname, "..", "src", "i18n", "locales");

const slugs = ["construction", "energy", "accounting", "healthcare", "education", "ecommerce", "professional-services", "tourism"];

const meta = {
  fr: {
    industries: {
      title: "Secteurs que nous servons | Sites web par secteur | DMC Kreatif",
      description: "Sites web premium pour la construction, l'energie, la comptabilite, la sante, l'education, le e-commerce, les services professionnels et le tourisme en Europe."
    },
    industryDetail: {
      construction: { title: "Sites web pour entreprises de construction | DMC Kreatif", description: "Sites personnalises pour le BTP, la renovation et les facades en Europe. Projets referencees, SEO optimise, multilingue." },
      energy: { title: "Sites web pour entreprises d'energie et isolation | DMC Kreatif", description: "Sites professionnels pour consultants en energie, isoleurs et energies renouvelables. React, SEO optimise." },
      accounting: { title: "Sites web pour comptables et services financiers | DMC Kreatif", description: "Sites modernes pour cabinets comptables et conseillers fiscaux. Portail client, conforme RGPD, multilingue." },
      healthcare: { title: "Sites web pour sante et cabinets medicaux | DMC Kreatif", description: "Sites conformes RGPD pour medecins, cliniques et dentistes. Accessibles, securises, prise de rendez-vous." },
      education: { title: "Sites web pour education et formation | DMC Kreatif", description: "Sites pour ecoles, universites et centres de formation. Accessibles WCAG, multilingues, integration LMS." },
      ecommerce: { title: "Developpement e-commerce pour detaillants en ligne | DMC Kreatif", description: "Solutions e-commerce completes avec multi-devises, integration paiement et gestion de stock." },
      "professional-services": { title: "Sites web pour services professionnels | DMC Kreatif", description: "Sites pour cabinets d'avocats, agences de conseil et architectes. Generation de leads, SEO optimise." },
      tourism: { title: "Sites web pour tourisme et hotellerie | DMC Kreatif", description: "Sites multilingues pour hotels, agences de voyage et restaurants. Integration reservation, SEO local et international." }
    }
  },
  nl: {
    industries: {
      title: "Sectoren die wij bedienen | Websites per sector | DMC Kreatif",
      description: "Premium websites voor bouw, energie, boekhouding, gezondheidszorg, onderwijs, e-commerce, zakelijke diensten en toerisme in Europa."
    },
    industryDetail: {
      construction: { title: "Websites voor bouwbedrijven | DMC Kreatif", description: "Maatwerkwebsites voor bouw, renovatie en gevelbedrijven in Europa. Referentieprojecten, SEO-geoptimaliseerd." },
      energy: { title: "Websites voor energie- en isolatiebedrijven | DMC Kreatif", description: "Professionele websites voor energieadviseurs, isolatiebedrijven en hernieuwbare energie." },
      accounting: { title: "Websites voor accountants en financiele diensten | DMC Kreatif", description: "Moderne websites voor accountantskantoren en belastingadviseurs. GDPR-conform, meertalig." },
      healthcare: { title: "Websites voor gezondheidszorg en medische praktijken | DMC Kreatif", description: "GDPR-conforme websites voor artsen, klinieken en tandartsen. Toegankelijk, veilig." },
      education: { title: "Websites voor onderwijs en opleidingen | DMC Kreatif", description: "Websites voor scholen, universiteiten en opleidingscentra. WCAG-toegankelijk, meertalig." },
      ecommerce: { title: "E-commerce ontwikkeling voor online retailers | DMC Kreatif", description: "Complete e-commerce oplossingen met multi-valuta, betalingsintegratie en voorraadbeheer." },
      "professional-services": { title: "Websites voor zakelijke dienstverlening | DMC Kreatif", description: "Websites voor advocatenkantoren, adviesbureaus en architecten. Leadgeneratie, SEO-geoptimaliseerd." },
      tourism: { title: "Websites voor toerisme en horeca | DMC Kreatif", description: "Meertalige websites voor hotels, reisbureaus en restaurants. Boekingsintegratie, lokale SEO." }
    }
  },
  de: {
    industries: {
      title: "Branchen die wir bedienen | Webentwicklung nach Branche | DMC Kreatif",
      description: "Premium-Webentwicklung fur Bau, Energie, Buchhaltung, Gesundheitswesen, Bildung, E-Commerce, professionelle Dienstleistungen und Tourismus in Europa."
    },
    industryDetail: {
      construction: { title: "Webentwicklung fur Bauunternehmen | DMC Kreatif", description: "Massgeschneiderte Websites fur Bau-, Renovierungs- und Fassadenunternehmen in Europa." },
      energy: { title: "Webentwicklung fur Energie- und Isolierungsunternehmen | DMC Kreatif", description: "Professionelle Websites fur Energieberater, Isolierungsunternehmen und erneuerbare Energien." },
      accounting: { title: "Webentwicklung fur Buchhalter und Finanzdienstleister | DMC Kreatif", description: "Moderne Websites fur Steuerkanzleien und Finanzberater. DSGVO-konform, mehrsprachig." },
      healthcare: { title: "Webentwicklung fur Gesundheitswesen und Arztpraxen | DMC Kreatif", description: "DSGVO-konforme Websites fur Arzte, Kliniken und Zahnarzte. Barrierefrei, sicher." },
      education: { title: "Webentwicklung fur Bildung und Weiterbildung | DMC Kreatif", description: "Websites fur Schulen, Universitaten und Ausbildungszentren. WCAG-barrierefrei, mehrsprachig." },
      ecommerce: { title: "E-Commerce-Entwicklung fur Online-Handler | DMC Kreatif", description: "Komplette E-Commerce-Losungen mit Multi-Wahrung, Zahlungsintegration und Bestandsverwaltung." },
      "professional-services": { title: "Webentwicklung fur professionelle Dienstleister | DMC Kreatif", description: "Websites fur Anwaltskanzleien, Beratungsagenturen und Architekten. Leadgenerierung, SEO-optimiert." },
      tourism: { title: "Webentwicklung fur Tourismus und Gastgewerbe | DMC Kreatif", description: "Mehrsprachige Websites fur Hotels, Reiseburos und Restaurants. Buchungsintegration, lokale SEO." }
    }
  }
};

for (const [locale, seoMeta] of Object.entries(meta)) {
  const filePath = path.join(localesDir, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!data.seo) data.seo = {};
  data.seo.industries = seoMeta.industries;
  data.seo.industryDetail = seoMeta.industryDetail;

  // Add nav.industries key
  if (!data.nav) data.nav = {};
  data.nav.industries = locale === "fr" ? "SECTEURS" : locale === "nl" ? "SECTOREN" : "BRANCHEN";

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`${locale}.json updated with industry SEO meta.`);
}

// Update sitemap
const sitemapPath = path.join(__dirname, "..", "public", "sitemap.xml");
let sitemap = fs.readFileSync(sitemapPath, "utf8");

const locales = ["en", "fr", "nl", "de"];
const today = new Date().toISOString().split("T")[0];

let industryUrls = "\n  <!-- ==================== INDUSTRIES ==================== -->";

// Industries listing page
for (const loc of locales) {
  industryUrls += `
  <url>
    <loc>https://dmckreatif.com/${loc}/industries</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://dmckreatif.com/en/industries"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://dmckreatif.com/fr/industries"/>
    <xhtml:link rel="alternate" hreflang="nl" href="https://dmckreatif.com/nl/industries"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://dmckreatif.com/de/industries"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://dmckreatif.com/en/industries"/>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
}

// Industry detail pages
for (const slug of slugs) {
  for (const loc of locales) {
    industryUrls += `
  <url>
    <loc>https://dmckreatif.com/${loc}/industries/${slug}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://dmckreatif.com/en/industries/${slug}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://dmckreatif.com/fr/industries/${slug}"/>
    <xhtml:link rel="alternate" hreflang="nl" href="https://dmckreatif.com/nl/industries/${slug}"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://dmckreatif.com/de/industries/${slug}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://dmckreatif.com/en/industries/${slug}"/>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }
}

// Insert before </urlset>
sitemap = sitemap.replace("</urlset>", industryUrls + "\n\n</urlset>");
fs.writeFileSync(sitemapPath, sitemap, "utf8");
console.log(`Sitemap updated: +${4 + slugs.length * 4} URLs (4 listing + ${slugs.length * 4} detail)`);
