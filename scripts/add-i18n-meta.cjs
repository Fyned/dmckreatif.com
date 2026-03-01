/**
 * Add seo.serviceDetail meta translations to FR, NL, DE locale files
 * And update sitemap.xml with 160 new service URLs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCALES_DIR = path.join(ROOT, 'src/i18n/locales');
const SITEMAP_PATH = path.join(ROOT, 'public/sitemap.xml');

const slugs = [
  'react-development', 'nextjs-development', 'typescript-development', 'frontend-development',
  'custom-web-apps', 'progressive-web-apps', 'api-development', 'website-redesign',
  'legacy-modernization', 'maintenance-support', 'headless-cms', 'performance-optimization',
  'accessibility', 'gdpr-compliance', 'integrations',
  'shopify-development', 'woocommerce-development', 'custom-ecommerce', 'b2b-ecommerce',
  'multi-currency-stores', 'payment-integration', 'ecommerce-seo', 'ecommerce-analytics',
  'technical-seo', 'local-seo', 'international-seo', 'content-seo', 'link-building',
  'seo-consulting', 'google-ads', 'analytics-setup', 'marketing-automation', 'geo-optimization',
  'ux-ui-design', 'digital-strategy', 'brand-identity', 'design-systems', 'prototyping',
  'mobile-first-design', 'content-marketing'
];

// Read EN meta to use as base
const en = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, 'en.json'), 'utf-8'));
const enMeta = en.seo.serviceDetail;

// FR translations
const frMeta = {
  'react-development': { title: 'Développement React — Agence Expert | DMC Kreatif', description: 'Développement React sur mesure pour entreprises européennes. Architecture composants, SPAs ultra-rapides, scores Lighthouse 95+. Consultation gratuite.' },
  'nextjs-development': { title: 'Développement Next.js — SSR & SSG Expert | DMC Kreatif', description: 'Développement Next.js avec rendu serveur, génération statique et App Router. Applications web SEO-optimisées pour entreprises européennes.' },
  'typescript-development': { title: 'Développement TypeScript — Apps Web Type-Safe | DMC Kreatif', description: 'Développement TypeScript pour applications web d\'entreprise. Typage strict, moins de bugs et bases de code maintenables.' },
  'frontend-development': { title: 'Développement Frontend — Ingénierie UI Moderne | DMC Kreatif', description: 'Développement frontend expert avec React, TypeScript et Tailwind CSS. Interfaces pixel-perfect et accessibles pour entreprises européennes.' },
  'custom-web-apps': { title: 'Applications Web Sur Mesure — Solutions Personnalisées | DMC Kreatif', description: 'Applications web sur mesure selon vos besoins. Tableaux de bord, portails et plateformes SaaS pour entreprises européennes.' },
  'progressive-web-apps': { title: 'Progressive Web Apps — PWA Offline-First | DMC Kreatif', description: 'Progressive web apps fonctionnant hors ligne, chargement instantané. Solutions multi-plateformes pour entreprises européennes.' },
  'api-development': { title: 'Développement API — REST & GraphQL | DMC Kreatif', description: 'Développement API sur mesure avec Node.js, Supabase et Edge Functions. Backends sécurisés et évolutifs pour entreprises européennes.' },
  'website-redesign': { title: 'Refonte de Site Web — Modernisez Votre Présence | DMC Kreatif', description: 'Services de refonte web qui boostent conversions, vitesse et SEO. Transformez votre site obsolète en une vitrine moderne.' },
  'legacy-modernization': { title: 'Modernisation Legacy — Migration Tech Moderne | DMC Kreatif', description: 'Modernisation de sites legacy vers React, Next.js et architecture moderne. Migration sans interruption pour entreprises européennes.' },
  'maintenance-support': { title: 'Maintenance & Support Web — Suivi Continu | DMC Kreatif', description: 'Maintenance proactive, mises à jour sécurité, monitoring performances et support prioritaire pour entreprises européennes.' },
  'headless-cms': { title: 'Développement CMS Headless — Sites Content-First | DMC Kreatif', description: 'Solutions CMS headless avec Payload CMS, Strapi et Sanity. Gestion de contenu flexible pour entreprises européennes.' },
  'performance-optimization': { title: 'Optimisation Performance Web — Accélérez Votre Site | DMC Kreatif', description: 'Optimisation Core Web Vitals, lazy loading, code splitting et stratégies de cache. Scores Lighthouse 95+ garantis.' },
  'accessibility': { title: 'Accessibilité Web — Conformité WCAG 2.1 AA | DMC Kreatif', description: 'Audits d\'accessibilité et conformité WCAG 2.1 AA. Rendez votre site utilisable par tous et conforme aux exigences EU.' },
  'gdpr-compliance': { title: 'Conformité RGPD — Protection des Données EU | DMC Kreatif', description: 'Sites web conformes RGPD avec consentement cookies, politiques de confidentialité et protection des données. Conformité EU garantie.' },
  'integrations': { title: 'Intégrations Tierces — Connectez Vos Outils | DMC Kreatif', description: 'Intégrations CRM, paiement, analytics et marketing pour votre site web. Connexions fluides pour entreprises européennes.' },
  'shopify-development': { title: 'Développement Shopify — Boutiques Sur Mesure | DMC Kreatif', description: 'Développement Shopify avec thèmes personnalisés, apps et support multi-devises pour e-commerce européen.' },
  'woocommerce-development': { title: 'Développement WooCommerce — E-Commerce WordPress | DMC Kreatif', description: 'Développement WooCommerce avec thèmes, plugins et intégration paiements EU pour boutiques en ligne européennes.' },
  'custom-ecommerce': { title: 'E-Commerce Sur Mesure — Créé de Zéro | DMC Kreatif', description: 'Plateformes e-commerce sur mesure avec React et Supabase. Contrôle total sur l\'architecture de votre boutique.' },
  'b2b-ecommerce': { title: 'E-Commerce B2B — Plateformes Grossiste | DMC Kreatif', description: 'Plateformes e-commerce B2B avec tarification échelonnée, commandes en gros et gestion de comptes pour grossistes européens.' },
  'multi-currency-stores': { title: 'Boutiques Multi-Devises — Vendez en Europe | DMC Kreatif', description: 'Boutiques en ligne multi-devises avec EUR, GBP, CHF, calcul TVA automatique et checkout localisé.' },
  'payment-integration': { title: 'Intégration Paiement — Stripe, iDEAL, Bancontact | DMC Kreatif', description: 'Intégration passerelles de paiement européennes : Stripe, iDEAL, Bancontact, Klarna et prélèvement SEPA.' },
  'ecommerce-seo': { title: 'SEO E-Commerce — Référencez Vos Produits | DMC Kreatif', description: 'SEO e-commerce avec schema produit, optimisation catégories et contenu conversion pour marchés européens.' },
  'ecommerce-analytics': { title: 'Analytics E-Commerce — Suivez Ce Qui Compte | DMC Kreatif', description: 'Analytics e-commerce avec GA4 Enhanced, funnels de conversion et attribution revenus pour boutiques en ligne.' },
  'technical-seo': { title: 'SEO Technique — Corrigez les Freins de Votre Site | DMC Kreatif', description: 'Audits SEO technique couvrant Core Web Vitals, crawlabilité, indexation et données structurées pour sites européens.' },
  'local-seo': { title: 'SEO Local — Dominez Votre Ville | DMC Kreatif', description: 'Services SEO local avec optimisation Google Business Profile, citations locales et contenu géo-ciblé pour villes européennes.' },
  'international-seo': { title: 'SEO International — Positionnez-Vous dans Plusieurs Pays | DMC Kreatif', description: 'SEO international avec hreflang, recherche de mots-clés par marché et stratégies de contenu multilingue.' },
  'content-seo': { title: 'SEO de Contenu — Créez du Contenu qui Se Positionne | DMC Kreatif', description: 'Stratégie SEO de contenu avec recherche mots-clés, clusters thématiques et calendriers éditoriaux pour entreprises européennes.' },
  'link-building': { title: 'Link Building — Obtenez des Backlinks de Qualité | DMC Kreatif', description: 'Link building white-hat avec RP digitales, guest posting et annuaires sectoriels européens. Développez votre autorité.' },
  'seo-consulting': { title: 'Consulting SEO — Stratégie & Accompagnement Expert | DMC Kreatif', description: 'Consulting SEO pour entreprises européennes. Audits, sessions stratégie et formation d\'équipe par des spécialistes.' },
  'google-ads': { title: 'Gestion Google Ads — PPC pour Marchés Européens | DMC Kreatif', description: 'Gestion Google Ads avec campagnes search, display et remarketing optimisées pour marchés et langues européens.' },
  'analytics-setup': { title: 'Configuration Analytics — GA4 & Suivi Conversions | DMC Kreatif', description: 'Configuration GA4 avec Consent Mode v2, événements personnalisés, suivi conversions et tableaux de bord conformes RGPD.' },
  'marketing-automation': { title: 'Marketing Automation — Nurturez vos Leads | DMC Kreatif', description: 'Marketing automation avec séquences email, lead scoring et intégration CRM pour entreprises B2B européennes.' },
  'geo-optimization': { title: 'Géo-Optimisation — Ciblez des Marchés Spécifiques | DMC Kreatif', description: 'Optimisation web géo-ciblée pour marchés européens spécifiques. Stratégies de localisation langue, devise et contenu.' },
  'ux-ui-design': { title: 'Design UX/UI — Design Digital Centré Utilisateur | DMC Kreatif', description: 'Design UX/UI avec recherche utilisateur, wireframing et interfaces pixel-perfect. Design orienté conversion pour l\'Europe.' },
  'digital-strategy': { title: 'Stratégie Digitale — Feuille de Route Croissance | DMC Kreatif', description: 'Consulting stratégie digitale avec analyse marché, veille concurrentielle et feuilles de route pour entreprises européennes.' },
  'brand-identity': { title: 'Identité de Marque — Logo, Couleurs & Guidelines | DMC Kreatif', description: 'Design identité de marque avec logo, palette couleurs, typographie et guidelines pour entreprises européennes.' },
  'design-systems': { title: 'Design Systems — Bibliothèques UI Évolutives | DMC Kreatif', description: 'Développement de design systems avec composants réutilisables, tokens et documentation. Scalez votre design produit.' },
  'prototyping': { title: 'Prototypage Rapide — Du Concept à la Démo Cliquable | DMC Kreatif', description: 'Prototypes interactifs avec Figma et code. Validez vos idées rapidement avant de lancer le développement complet.' },
  'mobile-first-design': { title: 'Design Mobile-First — Optimisé pour Chaque Écran | DMC Kreatif', description: 'Design responsive mobile-first garantissant des expériences parfaites sur téléphones, tablettes et desktops.' },
  'content-marketing': { title: 'Content Marketing — Contenu Qui Fait Autorité | DMC Kreatif', description: 'Content marketing avec articles, études de cas et thought leadership. Développez votre autorité et attirez du trafic organique.' },
};

// NL translations
const nlMeta = {
  'react-development': { title: 'React Ontwikkeling — Expert React Bureau | DMC Kreatif', description: 'Maatwerk React ontwikkeling voor Europese bedrijven. Component-architectuur, razendsnelle SPAs en 95+ Lighthouse scores.' },
  'nextjs-development': { title: 'Next.js Ontwikkeling — SSR & SSG Experts | DMC Kreatif', description: 'Next.js ontwikkeling met server-side rendering, statische generatie en App Router. SEO-geoptimaliseerde webapps.' },
  'typescript-development': { title: 'TypeScript Ontwikkeling — Type-Safe Web Apps | DMC Kreatif', description: 'TypeScript ontwikkeling voor enterprise webapplicaties. Strikt typen, minder bugs en onderhoudbare codebases.' },
  'frontend-development': { title: 'Frontend Ontwikkeling — Moderne UI Engineering | DMC Kreatif', description: 'Expert frontend ontwikkeling met React, TypeScript en Tailwind CSS. Pixel-perfecte, toegankelijke interfaces.' },
  'custom-web-apps': { title: 'Maatwerk Webapplicaties — Op Maat Gemaakte Oplossingen | DMC Kreatif', description: 'Webapplicaties op maat gebouwd volgens uw exacte vereisten. Dashboards, portalen en SaaS-platforms.' },
  'progressive-web-apps': { title: 'Progressive Web Apps — Offline-First PWAs | DMC Kreatif', description: 'Progressive web apps die offline werken, direct laden en native aanvoelen. Cross-platform oplossingen.' },
  'api-development': { title: 'API Ontwikkeling — RESTful & GraphQL APIs | DMC Kreatif', description: 'Maatwerk API ontwikkeling met Node.js, Supabase en Edge Functions. Veilige, schaalbare backends.' },
  'website-redesign': { title: 'Website Herontwerp — Moderniseer Uw Aanwezigheid | DMC Kreatif', description: 'Website herontwerp dat conversies, snelheid en SEO verbetert. Transformeer uw verouderde site naar een modern platform.' },
  'legacy-modernization': { title: 'Legacy Modernisering — Migreer naar Moderne Tech | DMC Kreatif', description: 'Moderniseer legacy websites naar React, Next.js en moderne architectuur. Zero-downtime migratie.' },
  'maintenance-support': { title: 'Website Onderhoud & Support — Doorlopende Zorg | DMC Kreatif', description: 'Proactief website onderhoud, beveiligingsupdates, prestatiemonitoring en prioritaire support.' },
  'headless-cms': { title: 'Headless CMS Ontwikkeling — Content-First Websites | DMC Kreatif', description: 'Headless CMS oplossingen met Payload CMS, Strapi en Sanity. Flexibel contentbeheer voor Europese bedrijven.' },
  'performance-optimization': { title: 'Webprestatie Optimalisatie — Versnel Uw Site | DMC Kreatif', description: 'Core Web Vitals optimalisatie, lazy loading, code splitting en caching strategieën. 95+ Lighthouse scores gegarandeerd.' },
  'accessibility': { title: 'Webtoegankelijkheid — WCAG 2.1 AA Compliance | DMC Kreatif', description: 'Toegankelijkheidsaudits en WCAG 2.1 AA compliance. Maak uw website bruikbaar voor iedereen en voldoe aan EU-vereisten.' },
  'gdpr-compliance': { title: 'AVG Compliance voor Websites — EU Gegevensbescherming | DMC Kreatif', description: 'AVG-conforme websites met cookieconsent, privacybeleid en gegevensbescherming. Voldoe aan EU-regelgeving.' },
  'integrations': { title: 'Integraties met Derden — Verbind Uw Tools | DMC Kreatif', description: 'CRM, betaal, analytics en marketing tool integraties voor uw website. Naadloze verbindingen.' },
  'shopify-development': { title: 'Shopify Ontwikkeling — Maatwerk Shopify Winkels | DMC Kreatif', description: 'Maatwerk Shopify ontwikkeling met unieke themas, apps en multi-valuta support voor Europese e-commerce.' },
  'woocommerce-development': { title: 'WooCommerce Ontwikkeling — WordPress E-Commerce | DMC Kreatif', description: 'WooCommerce ontwikkeling met maatwerk themas, plugins en EU betaalintegratie voor Europese webwinkels.' },
  'custom-ecommerce': { title: 'Maatwerk E-Commerce — Vanaf Nul Gebouwd | DMC Kreatif', description: 'E-commerce platforms op maat met React en Supabase. Volledige controle over uw webwinkel architectuur.' },
  'b2b-ecommerce': { title: 'B2B E-Commerce — Groothandel Platforms | DMC Kreatif', description: 'B2B e-commerce platforms met gedifferentieerde prijzen, bulkbestellingen en accountbeheer voor Europese groothandels.' },
  'multi-currency-stores': { title: 'Multi-Valuta Webwinkels — Verkoop in Heel Europa | DMC Kreatif', description: 'Multi-valuta webwinkels met EUR, GBP, CHF ondersteuning, automatische BTW-berekening en gelokaliseerde checkout.' },
  'payment-integration': { title: 'Betaalintegratie — Stripe, iDEAL, Bancontact | DMC Kreatif', description: 'Europese payment gateway integratie inclusief Stripe, iDEAL, Bancontact, Klarna en SEPA automatische incasso.' },
  'ecommerce-seo': { title: 'E-Commerce SEO — Laat Uw Producten Hoger Ranken | DMC Kreatif', description: 'E-commerce SEO met product schema markup, categorie optimalisatie en conversiegericht content voor Europese markten.' },
  'ecommerce-analytics': { title: 'E-Commerce Analytics — Meet Wat Ertoe Doet | DMC Kreatif', description: 'E-commerce analytics met GA4 Enhanced, conversiefunnels en omzetattributie voor webwinkels.' },
  'technical-seo': { title: 'Technische SEO — Los Problemen Op Die Uw Site Remmen | DMC Kreatif', description: 'Technische SEO audits over Core Web Vitals, crawlbaarheid, indexatie en gestructureerde data voor Europese websites.' },
  'local-seo': { title: 'Lokale SEO — Domineer Uw Stad in Zoekresultaten | DMC Kreatif', description: 'Lokale SEO diensten met Google Bedrijfsprofiel optimalisatie, lokale vermeldingen en geo-gerichte content.' },
  'international-seo': { title: 'Internationale SEO — Rangschik in Meerdere Landen | DMC Kreatif', description: 'Internationale SEO met hreflang implementatie, marktspecifiek zoekwoordonderzoek en meertalige contentstrategieën.' },
  'content-seo': { title: 'Content SEO — Creëer Content Die Rankt | DMC Kreatif', description: 'Content SEO strategie met zoekwoordonderzoek, topic clustering en redactiekalenders voor Europese bedrijven.' },
  'link-building': { title: 'Linkbuilding — Verdien Kwaliteitsbacklinks | DMC Kreatif', description: 'White-hat linkbuilding met digitale PR, gastbloggen en Europese branche directories. Bouw domeinautoriteit op.' },
  'seo-consulting': { title: 'SEO Consulting — Expert Strategie & Begeleiding | DMC Kreatif', description: 'SEO consulting voor Europese bedrijven. Audits, strategiesessies en teamtraining door ervaren specialisten.' },
  'google-ads': { title: 'Google Ads Beheer — PPC voor Europese Markten | DMC Kreatif', description: 'Google Ads beheer met search, display en remarketing campagnes geoptimaliseerd voor Europese markten en talen.' },
  'analytics-setup': { title: 'Analytics Setup — GA4 & Conversietracking | DMC Kreatif', description: 'Google Analytics 4 setup met Consent Mode v2, custom events, conversietracking en AVG-conforme dashboards.' },
  'marketing-automation': { title: 'Marketing Automatisering — Nurture Leads op Schaal | DMC Kreatif', description: 'Marketing automatisering met e-mailsequenties, lead scoring en CRM-integratie voor Europese B2B bedrijven.' },
  'geo-optimization': { title: 'Geo-Optimalisatie — Richt Specifieke Markten | DMC Kreatif', description: 'Geo-gerichte weboptimalisatie voor specifieke Europese markten. Taal, valuta en content lokalisatiestrategieën.' },
  'ux-ui-design': { title: 'UX/UI Design — Gebruikersgericht Digitaal Design | DMC Kreatif', description: 'UX/UI design met gebruikersonderzoek, wireframing en pixel-perfecte interfaces. Conversiegericht design voor Europa.' },
  'digital-strategy': { title: 'Digitale Strategie — Routekaart voor Online Groei | DMC Kreatif', description: 'Digitale strategie consulting met marktanalyse, concurrentieonderzoek en actieplannen voor Europese bedrijven.' },
  'brand-identity': { title: 'Merkidentiteit Design — Logo, Kleuren & Richtlijnen | DMC Kreatif', description: 'Merkidentiteit design met logo, kleurenpalet, typografie en brand guidelines voor Europese bedrijven.' },
  'design-systems': { title: 'Design Systems — Schaalbare UI Componentbibliotheken | DMC Kreatif', description: 'Design system ontwikkeling met herbruikbare componenten, tokens en documentatie. Schaal uw productdesign consistent.' },
  'prototyping': { title: 'Snel Prototypen — Van Concept naar Klikbare Demo | DMC Kreatif', description: 'Interactieve prototypes met Figma en code. Valideer ideeën snel voordat u volledig gaat ontwikkelen.' },
  'mobile-first-design': { title: 'Mobile-First Design — Geoptimaliseerd voor Elk Scherm | DMC Kreatif', description: 'Mobile-first responsive design dat perfecte ervaringen garandeert op telefoons, tablets en desktops.' },
  'content-marketing': { title: 'Content Marketing — Autoriteit Opbouwende Content | DMC Kreatif', description: 'Content marketing met blogposts, case studies en thought leadership. Bouw autoriteit en trek organisch verkeer aan.' },
};

// DE translations
const deMeta = {
  'react-development': { title: 'React-Entwicklung — Experten React-Agentur | DMC Kreatif', description: 'Maßgeschneiderte React-Entwicklung für europäische Unternehmen. Komponentenarchitektur, blitzschnelle SPAs, 95+ Lighthouse-Scores.' },
  'nextjs-development': { title: 'Next.js-Entwicklung — SSR & SSG Experten | DMC Kreatif', description: 'Next.js-Entwicklung mit Server-Side Rendering, statischer Generierung und App Router. SEO-optimierte Webanwendungen.' },
  'typescript-development': { title: 'TypeScript-Entwicklung — Typsichere Web-Apps | DMC Kreatif', description: 'TypeScript-Entwicklung für Enterprise-Webanwendungen. Strikte Typisierung, weniger Bugs und wartbare Codebases.' },
  'frontend-development': { title: 'Frontend-Entwicklung — Moderne UI-Technik | DMC Kreatif', description: 'Experten Frontend-Entwicklung mit React, TypeScript und Tailwind CSS. Pixelgenaue, barrierefreie Oberflächen.' },
  'custom-web-apps': { title: 'Individuelle Webanwendungen — Maßgeschneidert | DMC Kreatif', description: 'Maßgeschneiderte Webanwendungen nach Ihren Anforderungen. Dashboards, Portale und SaaS-Plattformen.' },
  'progressive-web-apps': { title: 'Progressive Web Apps — Offline-First PWAs | DMC Kreatif', description: 'Progressive Web Apps die offline funktionieren, sofort laden und sich nativ anfühlen. Plattformübergreifende Lösungen.' },
  'api-development': { title: 'API-Entwicklung — RESTful & GraphQL APIs | DMC Kreatif', description: 'Individuelle API-Entwicklung mit Node.js, Supabase und Edge Functions. Sichere, skalierbare Backends.' },
  'website-redesign': { title: 'Website-Redesign — Modernisieren Sie Ihren Auftritt | DMC Kreatif', description: 'Website-Redesign das Conversions, Geschwindigkeit und SEO steigert. Verwandeln Sie Ihre veraltete Seite in ein modernes Kraftpaket.' },
  'legacy-modernization': { title: 'Legacy-Modernisierung — Migration zu Moderner Tech | DMC Kreatif', description: 'Modernisierung von Legacy-Websites zu React, Next.js und moderner Architektur. Zero-Downtime-Migration.' },
  'maintenance-support': { title: 'Website-Wartung & Support — Laufende Betreuung | DMC Kreatif', description: 'Proaktive Website-Wartung, Sicherheitsupdates, Performance-Monitoring und Prioritäts-Support.' },
  'headless-cms': { title: 'Headless CMS Entwicklung — Content-First Websites | DMC Kreatif', description: 'Headless CMS Lösungen mit Payload CMS, Strapi und Sanity. Flexibles Content-Management für europäische Unternehmen.' },
  'performance-optimization': { title: 'Web-Performance Optimierung — Beschleunigen Sie Ihre Seite | DMC Kreatif', description: 'Core Web Vitals Optimierung, Lazy Loading, Code Splitting und Caching-Strategien. 95+ Lighthouse-Scores garantiert.' },
  'accessibility': { title: 'Web-Barrierefreiheit — WCAG 2.1 AA Konformität | DMC Kreatif', description: 'Barrierefreiheits-Audits und WCAG 2.1 AA Konformität. Machen Sie Ihre Website für alle nutzbar und erfüllen Sie EU-Anforderungen.' },
  'gdpr-compliance': { title: 'DSGVO-Konformität für Websites — EU-Datenschutz | DMC Kreatif', description: 'DSGVO-konforme Websites mit Cookie-Zustimmung, Datenschutzrichtlinien und Datenschutz. EU-Vorschriften mit Sicherheit erfüllen.' },
  'integrations': { title: 'Drittanbieter-Integrationen — Verbinden Sie Ihre Tools | DMC Kreatif', description: 'CRM-, Zahlungs-, Analytics- und Marketing-Tool-Integrationen für Ihre Website. Nahtlose Verbindungen.' },
  'shopify-development': { title: 'Shopify-Entwicklung — Maßgeschneiderte Shops | DMC Kreatif', description: 'Maßgeschneiderte Shopify-Entwicklung mit individuellen Themes, Apps und Multi-Währungs-Support für europäischen E-Commerce.' },
  'woocommerce-development': { title: 'WooCommerce-Entwicklung — WordPress E-Commerce | DMC Kreatif', description: 'WooCommerce-Entwicklung mit individuellen Themes, Plugins und EU-Zahlungsintegration für europäische Online-Shops.' },
  'custom-ecommerce': { title: 'Individueller E-Commerce — Von Grund Auf Entwickelt | DMC Kreatif', description: 'Maßgeschneiderte E-Commerce-Plattformen mit React und Supabase. Volle Kontrolle über Ihre Shop-Architektur.' },
  'b2b-ecommerce': { title: 'B2B E-Commerce — Großhandels-Plattformen | DMC Kreatif', description: 'B2B E-Commerce-Plattformen mit gestaffelten Preisen, Großbestellungen und Kontoverwaltung für europäische Großhändler.' },
  'multi-currency-stores': { title: 'Multi-Währungs-Shops — Verkaufen Sie in Europa | DMC Kreatif', description: 'Multi-Währungs-Online-Shops mit EUR, GBP, CHF, automatischer MwSt-Berechnung und lokalisiertem Checkout.' },
  'payment-integration': { title: 'Zahlungsintegration — Stripe, iDEAL, Bancontact | DMC Kreatif', description: 'Europäische Payment-Gateway-Integration: Stripe, iDEAL, Bancontact, Klarna und SEPA-Lastschrift.' },
  'ecommerce-seo': { title: 'E-Commerce SEO — Bessere Rankings für Ihre Produkte | DMC Kreatif', description: 'E-Commerce SEO mit Produkt-Schema-Markup, Kategorie-Optimierung und conversionorientiertem Content für europäische Märkte.' },
  'ecommerce-analytics': { title: 'E-Commerce Analytics — Messen Sie Was Zählt | DMC Kreatif', description: 'E-Commerce Analytics mit GA4 Enhanced, Conversion-Funnels und Umsatz-Attribution für Online-Shops.' },
  'technical-seo': { title: 'Technisches SEO — Beheben Sie Bremsen Ihrer Seite | DMC Kreatif', description: 'Technische SEO-Audits zu Core Web Vitals, Crawlbarkeit, Indexierung und strukturierten Daten für europäische Websites.' },
  'local-seo': { title: 'Lokales SEO — Dominieren Sie Ihre Stadt | DMC Kreatif', description: 'Lokale SEO-Dienste mit Google Unternehmensprofil-Optimierung, lokalen Einträgen und geo-gezieltem Content.' },
  'international-seo': { title: 'Internationales SEO — Rankings in Mehreren Ländern | DMC Kreatif', description: 'Internationales SEO mit Hreflang-Implementierung, marktspezifischer Keyword-Recherche und mehrsprachigen Content-Strategien.' },
  'content-seo': { title: 'Content SEO — Erstellen Sie Content Der Rankt | DMC Kreatif', description: 'Content SEO Strategie mit Keyword-Recherche, Themen-Clustering und Redaktionskalendern für europäische Unternehmen.' },
  'link-building': { title: 'Linkaufbau — Hochwertige Backlinks Verdienen | DMC Kreatif', description: 'White-Hat Linkaufbau mit digitaler PR, Gastbeiträgen und europäischen Branchenverzeichnissen. Domain-Autorität aufbauen.' },
  'seo-consulting': { title: 'SEO-Beratung — Experten-Strategie & Begleitung | DMC Kreatif', description: 'SEO-Beratung für europäische Unternehmen. Audits, Strategiesitzungen und Teamschulungen durch erfahrene Spezialisten.' },
  'google-ads': { title: 'Google Ads Management — PPC für Europäische Märkte | DMC Kreatif', description: 'Google Ads Management mit Search-, Display- und Remarketing-Kampagnen optimiert für europäische Märkte und Sprachen.' },
  'analytics-setup': { title: 'Analytics-Einrichtung — GA4 & Conversion-Tracking | DMC Kreatif', description: 'Google Analytics 4 Setup mit Consent Mode v2, Custom Events, Conversion-Tracking und DSGVO-konformen Dashboards.' },
  'marketing-automation': { title: 'Marketing-Automatisierung — Leads Skaliert Pflegen | DMC Kreatif', description: 'Marketing-Automatisierung mit E-Mail-Sequenzen, Lead-Scoring und CRM-Integration für europäische B2B-Unternehmen.' },
  'geo-optimization': { title: 'Geo-Optimierung — Spezifische Märkte Ansprechen | DMC Kreatif', description: 'Geo-gezielte Web-Optimierung für spezifische europäische Märkte. Sprach-, Währungs- und Content-Lokalisierung.' },
  'ux-ui-design': { title: 'UX/UI Design — Nutzerzentriertes Digitales Design | DMC Kreatif', description: 'UX/UI Design mit Nutzerforschung, Wireframing und pixelgenauen Oberflächen. Conversionorientiertes Design für Europa.' },
  'digital-strategy': { title: 'Digitale Strategie — Fahrplan für Online-Wachstum | DMC Kreatif', description: 'Digitale Strategieberatung mit Marktanalyse, Wettbewerbsforschung und umsetzbaren Roadmaps für europäische Unternehmen.' },
  'brand-identity': { title: 'Markenidentität Design — Logo, Farben & Richtlinien | DMC Kreatif', description: 'Markenidentität-Design mit Logo, Farbpalette, Typografie und Brand Guidelines für europäische Unternehmen.' },
  'design-systems': { title: 'Design Systems — Skalierbare UI-Komponentenbibliotheken | DMC Kreatif', description: 'Design System Entwicklung mit wiederverwendbaren Komponenten, Tokens und Dokumentation. Skalieren Sie Ihr Produktdesign.' },
  'prototyping': { title: 'Rapid Prototyping — Vom Konzept zur Klickbaren Demo | DMC Kreatif', description: 'Interaktive Prototypen mit Figma und Code. Validieren Sie Ideen schnell bevor Sie voll entwickeln.' },
  'mobile-first-design': { title: 'Mobile-First Design — Optimiert für Jeden Bildschirm | DMC Kreatif', description: 'Mobile-First Responsive Design das perfekte Erlebnisse auf Smartphones, Tablets und Desktops garantiert.' },
  'content-marketing': { title: 'Content Marketing — Autoritätsaufbauende Inhalte | DMC Kreatif', description: 'Content Marketing mit Blogposts, Fallstudien und Thought Leadership. Autorität aufbauen und organischen Traffic anziehen.' },
};

// Merge into locale files
const locales = [
  { file: 'fr.json', meta: frMeta },
  { file: 'nl.json', meta: nlMeta },
  { file: 'de.json', meta: deMeta },
];

for (const { file, meta } of locales) {
  const filePath = path.join(LOCALES_DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (!data.seo) data.seo = {};
  if (!data.seo.serviceDetail) data.seo.serviceDetail = {};

  for (const [slug, value] of Object.entries(meta)) {
    data.seo.serviceDetail[slug] = value;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`${file}: Added ${Object.keys(meta).length} seo.serviceDetail entries`);
}

// Generate sitemap entries
const BASE = 'https://dmckreatif.com';
const localeList = ['en', 'fr', 'nl', 'de'];

let sitemapEntries = '';
for (const slug of slugs) {
  for (const loc of localeList) {
    const url = `${BASE}/${loc}/services/${slug}`;
    const links = localeList.map(l =>
      `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE}/${l}/services/${slug}" />`
    ).join('\n');

    sitemapEntries += `  <url>\n    <loc>${url}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n${links}\n  </url>\n`;
  }
}

// Read current sitemap and insert before closing </urlset>
let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf-8');
sitemap = sitemap.replace('</urlset>', sitemapEntries + '</urlset>');
fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf-8');
console.log(`sitemap.xml: Added ${slugs.length * localeList.length} URLs (${slugs.length} services × ${localeList.length} locales)`);
