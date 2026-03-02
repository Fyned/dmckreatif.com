export interface CaseStudyMetric {
  label: string;
  value: string;
  icon: "gauge" | "clock" | "trending-up" | "users" | "search" | "zap";
}

export interface CaseStudyTestimonial {
  quote: string;
  name: string;
  role: string;
}

export interface CaseStudyImages {
  hero?: string;
  before?: string;
  after?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  num: string;
  name: string;
  sector: string;
  country: "FR" | "BE" | "UK";
  countryName: string;
  flag: string;
  url: string;
  year: string;
  accentColor: string;
  tech: string[];
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: CaseStudyMetric[];
  testimonial: CaseStudyTestimonial;
  timeline: string;
  servicesUsed: string[];
  images?: CaseStudyImages;
}
