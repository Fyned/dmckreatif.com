import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    id: "cakir-facades",
    slug: "cakir-facades",
    num: "01",
    name: "CAKIR FACADES",
    sector: "Facade Renovation",
    country: "FR",
    countryName: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    url: "https://cakirfacades.fr",
    year: "2024",
    accentColor: "neo-lime",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "i18next"],
    timeline: "3 weeks",
    servicesUsed: ["Web Development", "SEO Optimization", "UI/UX Design"],
    overview:
      "CAKIR Facades is a facade renovation specialist based in France. They approached us with an outdated WordPress site that was failing to generate leads and invisible on search engines. We rebuilt their entire digital presence from the ground up with a performance-first React application.",
    challenge:
      "CAKIR Facades was operating with a legacy WordPress site that scored below 40 on Lighthouse. The site was not mobile-responsive, loaded in over 6 seconds, and had zero SEO structure. They were losing potential customers to competitors who ranked higher on Google for key renovation terms in their region. The site lacked project galleries, had no contact form integration, and the CMS was so outdated that content updates were nearly impossible without developer help.",
    solution:
      "We designed and developed a completely new website using React, Vite, and Tailwind CSS. The architecture focused on three priorities: speed, SEO, and lead generation. We implemented lazy-loaded project galleries showcasing before/after renovation work, structured data markup for local SEO, and integrated Google Business Profile. Every page was optimized with proper meta tags, Open Graph data, and a semantic HTML structure. The contact form feeds directly into their CRM, and we set up Google Analytics 4 for conversion tracking.",
    results: [
      "Lighthouse score jumped from 38 to 97 across all pages",
      "Mobile-responsive design with sub-1.2s load time on 4G",
      "Organic traffic increased 180% within 6 months of launch",
      "Monthly qualified lead inquiries grew from 5 to 22",
      "First page Google ranking for 12 local renovation keywords",
    ],
    metrics: [
      { label: "Lighthouse", value: "97", icon: "gauge" },
      { label: "Load Time", value: "1.2s", icon: "clock" },
      { label: "Organic Traffic", value: "+180%", icon: "trending-up" },
      { label: "Lead Growth", value: "+340%", icon: "users" },
    ],
    testimonial: {
      quote:
        "They delivered exactly what we needed. Professional, fast, and the website looks amazing. Our leads increased significantly in the first month and we now rank on Google for terms we never appeared for before.",
      name: "M. Cakir",
      role: "Director, CAKIR Facades",
    },
    images: {
      after: "https://image.thum.io/get/width/1200/https://cakirfacades.fr",
    },
  },
  {
    id: "altinbas-moustiquaire",
    slug: "altinbas-moustiquaire",
    num: "02",
    name: "ALTINBAS MOUSTIQUAIRE",
    sector: "Insect Screens",
    country: "FR",
    countryName: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    url: "https://altinbasmoustiquaire.fr",
    year: "2024",
    accentColor: "neo-yellow",
    tech: ["React", "Vite", "Tailwind CSS", "React Hook Form", "Zod"],
    timeline: "4 weeks",
    servicesUsed: ["Web Development", "E-Commerce", "SEO Optimization"],
    overview:
      "Altinbas Moustiquaire is a custom insect screen manufacturer serving residential and commercial clients across France. Before working with us, their only online presence was a Facebook page. We created their first professional website from scratch, complete with a product catalog and quote request system.",
    challenge:
      "Altinbas had no website at all. Their entire customer acquisition relied on word-of-mouth and a basic Facebook page with limited product photos. They were invisible on Google search, missing out on hundreds of monthly searches for custom insect screens in France. Competitors with proper websites were capturing all the online demand. They needed a professional site that could display their full product range, allow customers to request custom quotes, and rank for competitive French-language keywords like 'moustiquaire sur mesure'.",
    solution:
      "We built a complete web presence from zero using React and Vite. The site features a detailed product catalog organized by screen type (roller, pleated, fixed, door), with specification tables and installation guides for each product. We implemented a multi-step quote request form using React Hook Form and Zod validation, allowing customers to specify dimensions, materials, and installation preferences. SEO was baked into every page with French-language meta descriptions, structured data for products, and a blog section with seasonal content about insect protection.",
    results: [
      "First page Google ranking for 'moustiquaire sur mesure' within 4 months",
      "Lighthouse score of 96 with optimized product images",
      "Over 40 quote requests per month through the website form",
      "Average session duration of 4 minutes across product pages",
      "Zero to 1,200 monthly organic visitors within 6 months",
    ],
    metrics: [
      { label: "Lighthouse", value: "96", icon: "gauge" },
      { label: "Load Time", value: "1.4s", icon: "clock" },
      { label: "Monthly Quotes", value: "40+", icon: "users" },
      { label: "Organic Growth", value: "0 to 1.2K", icon: "search" },
    ],
    testimonial: {
      quote:
        "Before DMC Kreatif, we had no website. Now customers find us on Google and send quote requests every day. The product catalog looks professional and our sales have grown beyond expectations.",
      name: "A. Altinbas",
      role: "Owner, Altinbas Moustiquaire",
    },
    images: {
      after: "https://image.thum.io/get/width/1200/https://altinbasmoustiquaire.fr",
    },
  },
  {
    id: "consulting-energy",
    slug: "consulting-energy",
    num: "03",
    name: "CONSULTING ENERGY",
    sector: "Energy Consulting",
    country: "FR",
    countryName: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    url: "https://consulting-energy.fr",
    year: "2024",
    accentColor: "neo-blue",
    tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "Framer Motion"],
    timeline: "3 weeks",
    servicesUsed: ["Web Development", "UI/UX Design", "SEO Optimization"],
    overview:
      "Consulting Energy is a French energy consulting firm specializing in MaPrimeRenov' government subsidies and energy audits for residential and commercial properties. They came to us with a generic Wix site that failed to convey their expertise and professionalism.",
    challenge:
      "Consulting Energy was struggling with a template-based Wix website that looked identical to dozens of competitors. The site lacked credibility signals, had no appointment booking functionality, and performed poorly on mobile devices. Their conversion rate from website visits to consultation requests was under 2%. The Wix platform also limited their ability to create detailed content pages about government energy programs like MaPrimeRenov', which are critical for establishing authority in the French energy consulting market.",
    solution:
      "We developed a custom React + TypeScript website with a professional design that immediately communicates expertise and trust. Key features include dedicated MaPrimeRenov' information pages with eligibility calculators, an integrated appointment booking system, and detailed service breakdowns for each type of energy audit. We added client testimonials, certification badges, and partnership logos throughout the site. The SEO strategy targeted long-tail keywords around French energy subsidies and local energy consulting services.",
    results: [
      "Lighthouse score of 95 with clean TypeScript architecture",
      "Online appointment bookings increased 60% in the first quarter",
      "Professional design elevated brand perception among corporate clients",
      "Organic visibility improved 35% for energy consulting keywords",
      "Bounce rate dropped from 65% to 28% after redesign",
    ],
    metrics: [
      { label: "Lighthouse", value: "95", icon: "gauge" },
      { label: "Load Time", value: "1.1s", icon: "clock" },
      { label: "Bookings", value: "+60%", icon: "trending-up" },
      { label: "Bounce Rate", value: "-57%", icon: "zap" },
    ],
    testimonial: {
      quote:
        "Our website went from outdated to cutting-edge. The SEO improvements alone were worth the investment, and the appointment booking feature has streamlined our entire client intake process.",
      name: "S. Dupont",
      role: "Founder, Consulting Energy",
    },
    images: {
      after: "https://image.thum.io/get/width/1200/https://consulting-energy.fr",
    },
  },
  {
    id: "iso-home-energy",
    slug: "iso-home-energy",
    num: "04",
    name: "ISO HOME ENERGY",
    sector: "Energy Insulation",
    country: "FR",
    countryName: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    url: "https://ih-energy.fr",
    year: "2024",
    accentColor: "neo-green",
    tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "React Router"],
    timeline: "4 weeks",
    servicesUsed: ["Web Development", "Local SEO", "Content Strategy"],
    overview:
      "ISO Home Energy provides home insulation services across multiple regions in France, including wall insulation, attic insulation, and energy-efficient window installation. Their old static HTML website was impossible to update and had no local SEO presence.",
    challenge:
      "ISO Home Energy operated with a hand-coded HTML website built years ago that could not be updated without a developer. The site had no content management capability, no mobile optimization, and zero local SEO structure. They serve multiple cities and regions across France but had no location-specific pages, meaning they were invisible in local search results. Before/after project photos, which are their strongest sales tool, were buried in a single cluttered gallery page with no organization.",
    solution:
      "We rebuilt the site with React, Vite, and TypeScript, creating a scalable architecture with location-based service pages for each region they serve. Each city page includes localized content, Google My Business integration, and structured data for local SEO. We designed an interactive before/after gallery with slider comparisons for each insulation type. The site includes educational content about energy savings, insulation materials, and government incentive programs. Every page is optimized for Core Web Vitals with lazy-loaded images and efficient code splitting.",
    results: [
      "Lighthouse score of 96 with mobile-first responsive design",
      "Local search visibility increased 200% across target regions",
      "Before/after gallery drove 3x more time on site",
      "Google My Business integration boosted local map pack appearances",
      "Lead generation improved 50% through educational content funnels",
    ],
    metrics: [
      { label: "Lighthouse", value: "96", icon: "gauge" },
      { label: "Load Time", value: "1.3s", icon: "clock" },
      { label: "Local Visibility", value: "+200%", icon: "search" },
      { label: "Lead Growth", value: "+50%", icon: "users" },
    ],
    testimonial: {
      quote:
        "The website educates our customers before they contact us, resulting in much more qualified leads and faster conversions. The before/after galleries are our best sales tool now.",
      name: "K. Yilmaz",
      role: "Director, ISO Home Energy",
    },
    images: {
      after: "https://image.thum.io/get/width/1200/https://ih-energy.fr",
    },
  },
  {
    id: "archi-construction",
    slug: "archi-construction",
    num: "05",
    name: "ARCHI CONSTRUCTION & VERANDA",
    sector: "Construction",
    country: "BE",
    countryName: "Belgium",
    flag: "\u{1F1E7}\u{1F1EA}",
    url: "https://archi.constructionveranda.com",
    year: "2024",
    accentColor: "neo-pink",
    tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "i18next"],
    timeline: "5 weeks",
    servicesUsed: ["Web Development", "Multilingual Setup", "UI/UX Design"],
    overview:
      "Archi Construction & Veranda is a Belgian construction company specializing in verandas, extensions, and renovation projects. They needed a bilingual website to serve both French-speaking Wallonia and Dutch-speaking Flanders markets effectively.",
    challenge:
      "Archi Construction had a basic single-language website that could not serve Belgium's bilingual market. The site had no project portfolio, no visual showcase of their veranda and extension work, and no way for potential clients to see the quality of their craftsmanship before making contact. Their competitors had rich visual galleries and bilingual support, putting Archi at a significant disadvantage in both the Walloon and Flemish markets. The quote request process was limited to a generic email link with no structured form.",
    solution:
      "We designed and built a fully bilingual (French/Dutch) website using React, TypeScript, and i18next for seamless language switching. The centerpiece is a filterable project gallery organized by category (verandas, extensions, renovations, carports) with high-resolution photography and detailed project descriptions in both languages. Each project page includes specifications, materials used, and timeline. We implemented a structured quote request form that captures project type, dimensions, budget range, and preferred contact method. The site architecture supports future addition of German for the small German-speaking community in eastern Belgium.",
    results: [
      "Lighthouse score of 95 with optimized image loading pipeline",
      "Bilingual FR/NL site serving both Belgian language communities",
      "Quote requests increased 45% through structured intake forms",
      "Project gallery pages average 3.5 minutes session duration",
      "Mobile traffic conversion rate improved by 38%",
    ],
    metrics: [
      { label: "Lighthouse", value: "95", icon: "gauge" },
      { label: "Load Time", value: "1.4s", icon: "clock" },
      { label: "Conversions", value: "+45%", icon: "trending-up" },
      { label: "Languages", value: "FR + NL", icon: "users" },
    ],
    testimonial: {
      quote:
        "The bilingual website perfectly serves our French and Dutch-speaking customers. The project gallery showcases our work beautifully and has become our primary source of new client inquiries.",
      name: "P. Laurent",
      role: "CEO, Archi Construction & Veranda",
    },
    images: {
      after: "https://image.thum.io/get/width/1200/https://archi.constructionveranda.com",
    },
  },
  {
    id: "adamsons-accountants",
    slug: "adamsons-accountants",
    num: "06",
    name: "ADAMSONS ACCOUNTANTS",
    sector: "Accounting",
    country: "UK",
    countryName: "United Kingdom",
    flag: "\u{1F1EC}\u{1F1E7}",
    url: "https://adamsons.uk.com",
    year: "2024",
    accentColor: "neo-purple",
    tech: ["React", "Vite", "Tailwind CSS", "React Hook Form", "Zod"],
    timeline: "3 weeks",
    servicesUsed: ["Web Development", "SEO Optimization", "Security Audit"],
    overview:
      "Adamsons Accountants is a UK-based accounting firm serving SMEs across England. They were running an outdated WordPress site plagued by slow load times and recurring security vulnerabilities, which undermined trust with potential clients in a sector where reliability is paramount.",
    challenge:
      "Adamsons was operating on WordPress with multiple outdated plugins that created security vulnerabilities. The site had been compromised twice in the previous year, damaging client trust. Page load times exceeded 5 seconds, and the mobile experience was broken with overlapping elements and unreadable text. For an accounting firm where trust and professionalism are everything, their website was actively working against them. The service pages lacked detail, making it difficult for potential clients to understand what Adamsons offered compared to larger competitors.",
    solution:
      "We rebuilt the site from scratch with React and Vite, eliminating all WordPress security concerns. The design emphasizes trust and professionalism with a clean layout, prominent accreditation badges, and detailed service breakdowns for each accounting specialty (tax, bookkeeping, payroll, advisory). We implemented a secure contact form with Zod validation and rate limiting. Each service page follows a consistent structure: overview, who it is for, what is included, pricing guidance, and FAQ. We optimized for UK-specific SEO terms and set up local business schema markup for their geographic area.",
    results: [
      "Lighthouse score of 97 with 0.9s average load time",
      "Form submissions increased 75% with improved UX and trust signals",
      "Zero security incidents since migration from WordPress",
      "Professional UK image strengthened through clean modern design",
      "Local SEO rankings improved for 8 target accounting keywords",
    ],
    metrics: [
      { label: "Lighthouse", value: "97", icon: "gauge" },
      { label: "Load Time", value: "0.9s", icon: "clock" },
      { label: "Form Submissions", value: "+75%", icon: "trending-up" },
      { label: "Security Issues", value: "0", icon: "zap" },
    ],
    testimonial: {
      quote:
        "Working with DMC Kreatif was a seamless experience. They understood our needs from day one and delivered beyond expectations. The site is fast, secure, and our clients consistently compliment the professional design.",
      name: "J. Adams",
      role: "Partner, Adamsons Accountants",
    },
    images: {
      after: "https://image.thum.io/get/width/1200/https://adamsons.uk.com",
    },
  },
];
