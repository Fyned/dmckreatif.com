export type UserRole = "ADMIN" | "CLIENT";
export type ProjectStatus = "PENDING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "ARCHIVED";
export type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED";
export type ContactStatus = "NEW" | "READ" | "REPLIED" | "ARCHIVED";

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company: string | null;
  phone: string | null;
  country: string | null;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  tier: string | null;
  url: string | null;
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
  client_id: string;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  description: string | null;
  due_date: string | null;
  paid_date: string | null;
  payment_method: string | null;
  items: Record<string, unknown> | null;
  client_id: string;
  project_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  locale: string | null;
  status: ContactStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  subject: string | null;
  content: string;
  from_admin: boolean;
  read: boolean;
  user_id: string;
  created_at: string;
}

/* ── New: Site Settings ── */
export type DiscountType = "percentage" | "fixed";
export type CampaignPlacement = "banner" | "hero" | "popup" | "pricing";

export interface SiteSetting {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

export interface StripeSettings {
  publishable_key: string;
  secret_key: string;
  webhook_secret: string;
  enabled: boolean;
}

export interface PayPalSettings {
  client_id: string;
  secret: string;
  sandbox: boolean;
  enabled: boolean;
}

export interface BankSettings {
  iban: string;
  bic_swift: string;
  bank_name: string;
  account_holder: string;
  enabled: boolean;
}

export interface PaymentPreferences {
  default_method: string;
  currency: string;
  tax_rate: number;
}

/* ── New: Packages ── */
export interface Package {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  features: string[];
  delivery_days: number | null;
  color: string;
  popular: boolean;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/* ── New: Campaigns ── */
export type TemplateOrderStatus = "PENDING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "CANCELLED";
export type TemplateTier = "business_card" | "starter" | "professional";

export interface TemplateCategory {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Template {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category_id: string;
  thumbnail_url: string | null;
  preview_url: string | null;
  preview_images: string[];
  features: string[];
  pages_included: number;
  tier_compatibility: TemplateTier[];
  demo_data: Record<string, unknown>;
  active: boolean;
  popular: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category?: TemplateCategory;
}

export interface TemplateOrder {
  id: string;
  order_number: string;
  template_id: string;
  tier: TemplateTier;
  client_id: string | null;
  business_name: string;
  business_industry: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  brand_colors: { primary?: string; secondary?: string };
  logo_url: string | null;
  images: string[];
  business_description: string | null;
  special_requests: string | null;
  business_address: string | null;
  business_hours: string | null;
  business_services: string | null;
  business_slogan: string | null;
  price: number;
  currency: string;
  status: TemplateOrderStatus;
  admin_notes: string | null;
  delivered_url: string | null;
  payment_method: string | null;
  payment_reference: string | null;
  paid_at: string | null;
  locale: string;
  created_at: string;
  updated_at: string;
  template?: Template;
}

export interface Campaign {
  id: string;
  title: string;
  description: string | null;
  template: string;
  discount_type: DiscountType;
  discount_value: number | null;
  discount_code: string | null;
  banner_text: string | null;
  banner_color: string;
  cta_text: string | null;
  cta_link: string;
  placement: CampaignPlacement;
  active: boolean;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id" | "created_at">>;
        Relationships: [];
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at" | "updated_at"> & { id?: string };
        Update: Partial<Omit<Project, "id" | "created_at">>;
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      invoices: {
        Row: Invoice;
        Insert: Omit<Invoice, "id" | "created_at" | "updated_at"> & { id?: string };
        Update: Partial<Omit<Invoice, "id" | "created_at">>;
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoices_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      contact_submissions: {
        Row: ContactSubmission;
        Insert: Omit<ContactSubmission, "id" | "created_at" | "updated_at" | "status" | "notes"> & {
          id?: string;
          status?: ContactStatus;
          notes?: string | null;
        };
        Update: Partial<Omit<ContactSubmission, "id" | "created_at">>;
        Relationships: [];
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, "id" | "created_at"> & { id?: string };
        Update: Partial<Omit<Message, "id" | "created_at">>;
        Relationships: [
          {
            foreignKeyName: "messages_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      site_settings: {
        Row: SiteSetting;
        Insert: Omit<SiteSetting, "id" | "updated_at"> & { id?: string };
        Update: Partial<Omit<SiteSetting, "id">>;
        Relationships: [];
      };
      packages: {
        Row: Package;
        Insert: Omit<Package, "id" | "created_at" | "updated_at"> & { id?: string };
        Update: Partial<Omit<Package, "id" | "created_at">>;
        Relationships: [];
      };
      campaigns: {
        Row: Campaign;
        Insert: Omit<Campaign, "id" | "created_at" | "updated_at"> & { id?: string };
        Update: Partial<Omit<Campaign, "id" | "created_at">>;
        Relationships: [];
      };
      template_categories: {
        Row: TemplateCategory;
        Insert: Omit<TemplateCategory, "id" | "created_at" | "updated_at"> & { id?: string };
        Update: Partial<Omit<TemplateCategory, "id" | "created_at">>;
        Relationships: [];
      };
      templates: {
        Row: Template;
        Insert: Omit<Template, "id" | "created_at" | "updated_at" | "category"> & { id?: string };
        Update: Partial<Omit<Template, "id" | "created_at" | "category">>;
        Relationships: [
          {
            foreignKeyName: "templates_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "template_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      template_orders: {
        Row: TemplateOrder;
        Insert: Omit<TemplateOrder, "id" | "order_number" | "created_at" | "updated_at" | "template"> & {
          id?: string;
          order_number?: string;
        };
        Update: Partial<Omit<TemplateOrder, "id" | "created_at" | "template">>;
        Relationships: [
          {
            foreignKeyName: "template_orders_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "templates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "template_orders_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      project_status: ProjectStatus;
      invoice_status: InvoiceStatus;
      contact_status: ContactStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
