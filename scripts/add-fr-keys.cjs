const fs = require('fs');
const path = require('path');

const frPath = path.join(__dirname, '../src/i18n/locales/fr.json');
const fr = JSON.parse(fs.readFileSync(frPath, 'utf-8'));

// 1. services — missing sub-keys
Object.assign(fr.services, {
  heroDescription: "Des sites vitrines aux plateformes e-commerce complètes. Chaque projet est conçu sur mesure avec des technologies modernes et des standards de design premium.",
  processTitle: "NOTRE MÉTHODE",
  processSubtitle: "SYS.PROCESSUS",
  step1Title: "DÉCOUVERTE",
  step1Desc: "Nous apprenons à connaître votre entreprise, vos objectifs et votre public cible.",
  step2Title: "DESIGN",
  step2Desc: "Design sur mesure adapté à votre marque et votre secteur.",
  step3Title: "DÉVELOPPEMENT",
  step3Desc: "Code propre, performances rapides et technologies modernes.",
  step4Title: "LIVRAISON",
  step4Desc: "Tests, déploiement et support continu."
});

// 2. whyUs — entire section missing
fr.whyUs = {
  breadcrumb: "POURQUOI NOUS",
  heroTag: "SYS.POURQUOI_NOUS",
  heroTitle: "POURQUOI DMC KREATIF",
  heroDesc: "100+ professionnels, 200+ projets, 6 pays. Nous créons des sites web premium qui surpassent la concurrence.",
  reasonsTitle: "8 RAISONS DE NOUS CHOISIR",
  reasonsTag: "SYS.DIFFÉRENCIATEURS",
  reason1Title: "ADN Européen",
  reason1Desc: "Nés en Europe, conçus pour l'Europe. Natifs RGPD, multilingues dès le premier jour. Nous comprenons les marchés européens, les réglementations locales et les nuances culturelles en France, Belgique, UK, Pays-Bas et Allemagne.",
  reason2Title: "Stack Technique Moderne",
  reason2Desc: "React, Next.js, TypeScript. Pas de WordPress. Pas de code legacy. Des sites ultra-rapides et pérennes, construits avec les mêmes outils que Stripe, Vercel et Linear.",
  reason3Title: "Obsédés par la Performance",
  reason3Desc: "Score Lighthouse 95+ garanti. Temps de chargement inférieur à 2 secondes. Core Web Vitals optimisés. Chaque milliseconde compte pour vos conversions et votre référencement.",
  reason4Title: "Tarifs Transparents",
  reason4Desc: "Pas de frais cachés. Forfaits à prix fixe à partir de 349€. Mises à jour hebdomadaires sur l'avancement. Vous savez exactement ce que vous payez et quand c'est livré.",
  reason5Title: "Multilingue par Défaut",
  reason5Desc: "EN, FR, NL, DE intégrés. Implémentation hreflang correcte, adaptation culturelle et rédaction de qualité native. Pas une simple traduction — une véritable localisation.",
  reason6Title: "Équipes Dédiées",
  reason6Desc: "Chaque projet bénéficie d'une équipe pluridisciplinaire : designer, développeur, spécialiste SEO et chef de projet. Pas de ressources partagées, pas d'attention divisée.",
  reason7Title: "Suivi Post-Lancement",
  reason7Desc: "30 jours de support gratuit après le lancement. Plan Maintenance mensuel disponible pour les mises à jour, la surveillance, les sauvegardes et l'optimisation des performances. Nous ne disparaissons pas après la livraison.",
  reason8Title: "Sécurité d'Abord",
  reason8Desc: "HTTPS partout, en-têtes CSP, protection contre les injections SQL, conformité OWASP Top 10 et audits de sécurité réguliers. Votre site et les données de vos utilisateurs sont en sécurité.",
  numbersTitle: "EN CHIFFRES",
  numbersTag: "SYS.MÉTRIQUES",
  statProjects: "Projets Livrés",
  statTeam: "Membres de l'Équipe",
  statCountries: "Pays Desservis",
  statLighthouse: "Score Lighthouse Moyen",
  statSatisfaction: "Satisfaction Client",
  statOnTime: "Livraison Ponctuelle",
  trustedBy: "APPROUVÉ PAR DES ENTREPRISES À TRAVERS L'EUROPE",
  compareTitle: "CE QUI NOUS DISTINGUE",
  compareTag: "SYS.COMPARAISON",
  cmpFeature: "Fonctionnalité",
  cmpUs: "DMC Kreatif",
  cmpAgency: "Agence Classique",
  cmpFreelancer: "Freelance",
  cmpReact: "React / Next.js Moderne",
  cmpMultilingual: "Multilingue (4 langues)",
  cmpLighthouse: "Lighthouse 95+ Garanti",
  cmpTeam: "Équipe Dédiée",
  cmpSupport: "Support Post-Lancement",
  cmpPricing: "Tarification Fixe",
  cmpYes: "Oui",
  cmpNo: "Non",
  cmpSometimes: "Parfois",
  cmpRarely: "Rarement",
  cmpExtra: "En supplément",
  cmpShared: "Partagée",
  cmpOne: "1 personne",
  cmpHourly: "À l'heure"
};

// 3. technologies — entire section missing
fr.technologies = {
  sectionTitle: "NOTRE STACK TECHNIQUE",
  heroTitle: "TECHNOLOGIES UTILISÉES",
  heroDescription: "Nous sélectionnons des technologies de pointe, éprouvées en production, pour créer des expériences web premium pour les entreprises européennes. Chaque outil de notre stack mérite sa place grâce à sa performance, sa fiabilité et son expérience développeur.",
  filterAll: "TOUTES",
  filterFrontend: "FRONTEND",
  filterBackend: "BACKEND",
  filterDevops: "DEVOPS",
  filterEcommerce: "E-COMMERCE",
  viewTech: "EN SAVOIR PLUS",
  version: "VERSION",
  visitSite: "SITE OFFICIEL",
  whyTitle: "POURQUOI NOUS L'UTILISONS",
  whySubtitle: "SYS.RAISONS",
  alternativesTitle: "COMPARÉ AUX ALTERNATIVES",
  alternativesSubtitle: "SYS.COMPARER",
  relatedTechTitle: "TECHNOLOGIES ASSOCIÉES",
  relatedTechSubtitle: "SYS.STACK",
  relatedServicesTitle: "SERVICES UTILISANT CETTE TECHNOLOGIE",
  relatedServicesSubtitle: "SYS.SERVICES",
  pros: "POINTS FORTS",
  cons: "LIMITES"
};

// 4. industries — entire section missing
fr.industries = {
  heroTitle: "SECTEURS QUE NOUS SERVONS",
  heroDesc: "Nous créons des sites web haute performance adaptés aux besoins spécifiques de chaque secteur. Des entreprises du bâtiment aux prestataires de santé, nos solutions génèrent de vrais résultats commerciaux à travers l'Europe.",
  projectCount: "projet(s)",
  filter: {
    all: "TOUS",
    building: "BÂTIMENT",
    services: "SERVICES",
    commerce: "COMMERCE",
    public: "PUBLIC"
  }
};

// Write back
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2) + '\n', 'utf-8');
console.log('Done! Added missing keys to fr.json');
