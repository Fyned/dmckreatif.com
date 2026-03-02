import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LocaleRouter from "@/i18n/LocaleRouter";
import AppLayout from "@/components/layout/AppLayout";
import AuthGuard from "@/components/guards/AuthGuard";
import AdminGuard from "@/components/guards/AdminGuard";
import CookieBanner from "@/components/gdpr/CookieBanner";

/* ── Lazy-loaded Pages ── */
const HomePage = lazy(() => import("@/pages/HomePage"));
const ServicesPage = lazy(() =>
  import("@/i18n").then((m) => m.loadEnNamespace("services", "seo")).then(() => import("@/pages/ServicesPage"))
);
const PortfolioPage = lazy(() => import("@/pages/PortfolioPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() =>
  import("@/i18n").then((m) => m.loadEnNamespace("seo")).then(() => import("@/pages/BlogPostPage"))
);
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const DashboardProjectsPage = lazy(() => import("@/pages/dashboard/ProjectsPage"));
const DashboardInvoicesPage = lazy(() => import("@/pages/dashboard/InvoicesPage"));
const DashboardMessagesPage = lazy(() => import("@/pages/dashboard/MessagesPage"));
const AdminDashboardPage = lazy(() => import("@/pages/admin/AdminDashboardPage"));
const AdminClientsPage = lazy(() => import("@/pages/admin/ClientsPage"));
const AdminProjectsPage = lazy(() => import("@/pages/admin/ProjectsPage"));
const AdminInvoicesPage = lazy(() => import("@/pages/admin/InvoicesPage"));
const AdminMessagesPage = lazy(() => import("@/pages/admin/MessagesPage"));
const AdminContactsPage = lazy(() => import("@/pages/admin/ContactsPage"));
const AdminPaymentsPage = lazy(() => import("@/pages/admin/PaymentSettingsPage"));
const AdminPackagesPage = lazy(() => import("@/pages/admin/PackagesPage"));
const AdminCampaignsPage = lazy(() => import("@/pages/admin/CampaignsPage"));
const TemplatesPage = lazy(() => import("@/pages/TemplatesPage"));
const TemplateDetailPage = lazy(() => import("@/pages/TemplateDetailPage"));
const TemplateOrderPage = lazy(() => import("@/pages/TemplateOrderPage"));
const TemplateOrderConfirmPage = lazy(() => import("@/pages/TemplateOrderConfirmPage"));
const AdminTemplatesPage = lazy(() => import("@/pages/admin/TemplatesAdminPage"));
const AdminTemplateOrdersPage = lazy(() => import("@/pages/admin/TemplateOrdersPage"));
const DashboardTemplateOrdersPage = lazy(() => import("@/pages/dashboard/TemplateOrdersPage"));
const MySitesPage = lazy(() => import("@/pages/dashboard/MySitesPage"));
const SettingsPage = lazy(() => import("@/pages/dashboard/SettingsPage"));
const TemplateViewerPage = lazy(() => import("@/pages/TemplateViewerPage"));
const EditorPage = lazy(() => import("@/pages/EditorPage"));
const PublishedSitePage = lazy(() => import("@/pages/PublishedSitePage"));
const CaseStudiesPage = lazy(() => import("@/pages/CaseStudiesPage"));
const CaseStudyDetailPage = lazy(() => import("@/pages/CaseStudyDetailPage"));
const ServiceDetailPage = lazy(() =>
  import("@/i18n").then((m) => m.loadEnNamespace("services", "seo")).then(() => import("@/pages/ServiceDetailPage"))
);
const TechnologiesPage = lazy(() => import("@/pages/TechnologiesPage"));
const TechnologyDetailPage = lazy(() =>
  import("@/i18n").then((m) => m.loadEnNamespace("tech", "seo")).then(() => import("@/pages/TechnologyDetailPage"))
);
const IndustriesPage = lazy(() => import("@/pages/IndustriesPage"));
const IndustryDetailPage = lazy(() =>
  import("@/i18n").then((m) => m.loadEnNamespace("industries", "seo")).then(() => import("@/pages/IndustryDetailPage"))
);
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const LegalNoticePage = lazy(() => import("@/pages/LegalNoticePage"));
const CookiePolicyPage = lazy(() => import("@/pages/CookiePolicyPage"));
const RefundPolicyPage = lazy(() => import("@/pages/RefundPolicyPage"));
const CityServicePage = lazy(() =>
  import("@/i18n").then((m) => m.loadEnNamespace("cities")).then(() => import("@/pages/CityServicePage"))
);
const CityServiceDetailPage = lazy(() =>
  import("@/i18n").then((m) => m.loadEnNamespace("cities")).then(() => import("@/pages/CityServiceDetailPage"))
);
const CountryPage = lazy(() =>
  import("@/i18n").then((m) => m.loadEnNamespace("cities")).then(() => import("@/pages/CountryPage"))
);
const TeamPage = lazy(() => import("@/pages/TeamPage"));
const ProcessPage = lazy(() => import("@/pages/ProcessPage"));
const WhyUsPage = lazy(() => import("@/pages/WhyUsPage"));
const PartnersPage = lazy(() => import("@/pages/PartnersPage"));
const CareersPage = lazy(() => import("@/pages/CareersPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neo-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-neo-lime border border-neo-black"
              style={{
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
        <div className="border-2 border-neo-black bg-neo-white px-6 py-3 shadow-hard font-mono text-xs text-neo-black/70 uppercase tracking-widest">
          Loading...
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CookieBanner />
      <Routes>
        {/* Published site viewer — outside locale routing */}
        <Route path="/site/:subdomain" element={<PublishedSitePage />} />

        {/* Root → redirect to /en */}
        <Route path="/" element={<Navigate to="/en" replace />} />

        {/* Locale-based routes */}
        <Route path="/:locale" element={<LocaleRouter />}>
          {/* Public pages with AppLayout (Header + Footer) */}
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:slug" element={<ServiceDetailPage />} />
            <Route path="technologies" element={<TechnologiesPage />} />
            <Route path="technologies/:slug" element={<TechnologyDetailPage />} />
            <Route path="industries" element={<IndustriesPage />} />
            <Route path="industries/:slug" element={<IndustryDetailPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="about/team" element={<TeamPage />} />
            <Route path="about/process" element={<ProcessPage />} />
            <Route path="about/why-us" element={<WhyUsPage />} />
            <Route path="about/partners" element={<PartnersPage />} />
            <Route path="about/careers" element={<CareersPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="case-studies" element={<CaseStudiesPage />} />
            <Route path="case-studies/:slug" element={<CaseStudyDetailPage />} />
            <Route path="web-agency-france" element={<CountryPage countrySlug="france" />} />
            <Route path="web-agency-united-kingdom" element={<CountryPage countrySlug="united-kingdom" />} />
            <Route path="web-agency-netherlands" element={<CountryPage countrySlug="netherlands" />} />
            <Route path="web-agency-germany" element={<CountryPage countrySlug="germany" />} />
            <Route path="web-agency-:city" element={<CityServicePage />} />
            <Route path="web-agency-:city/:serviceSlug" element={<CityServiceDetailPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="templates/:slug" element={<TemplateDetailPage />} />
            <Route path="templates/order" element={<TemplateOrderPage />} />
            <Route path="templates/order/confirm/:orderId" element={<TemplateOrderConfirmPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="legal" element={<LegalNoticePage />} />
            <Route path="cookie-policy" element={<CookiePolicyPage />} />
            <Route path="refund-policy" element={<RefundPolicyPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* Template Viewer — full-screen, no AppLayout */}
          <Route path="templates/:slug/preview" element={<TemplateViewerPage />} />

          {/* GrapesJS Editor — full-screen, requires auth, no AppLayout */}
          <Route path="editor/:templateSlug" element={<AuthGuard><EditorPage /></AuthGuard>} />

          {/* Client Dashboard (requires auth) */}
          <Route
            path="dashboard"
            element={
              <AuthGuard>
                <AppLayout />
              </AuthGuard>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="projects" element={<DashboardProjectsPage />} />
            <Route path="invoices" element={<DashboardInvoicesPage />} />
            <Route path="messages" element={<DashboardMessagesPage />} />
            <Route path="template-orders" element={<DashboardTemplateOrdersPage />} />
            <Route path="my-sites" element={<MySitesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Admin Panel (requires admin role) */}
          <Route
            path="admin"
            element={
              <AdminGuard>
                <AppLayout />
              </AdminGuard>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="clients" element={<AdminClientsPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="invoices" element={<AdminInvoicesPage />} />
            <Route path="messages" element={<AdminMessagesPage />} />
            <Route path="contacts" element={<AdminContactsPage />} />
            <Route path="payments" element={<AdminPaymentsPage />} />
            <Route path="packages" element={<AdminPackagesPage />} />
            <Route path="campaigns" element={<AdminCampaignsPage />} />
            <Route path="templates" element={<AdminTemplatesPage />} />
            <Route path="template-orders" element={<AdminTemplateOrdersPage />} />
          </Route>

          {/* 404 — within locale routes (with AppLayout for header/footer) */}
          <Route element={<AppLayout />}>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>

        {/* Catch-all — outside locale routes → 404 with /en fallback */}
        <Route path="*" element={<Navigate to="/en/404" replace />} />
      </Routes>
    </Suspense>
  );
}
