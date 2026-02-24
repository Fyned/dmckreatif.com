import type { Editor } from "grapesjs";
import type { BusinessInfo } from "@/lib/template-placeholders";

/** SEO settings the user can configure per site. */
export interface SeoSettings {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonical: string;
  favicon: string;
  lang: string;
  noIndex: boolean;
}

export const EMPTY_SEO_SETTINGS: SeoSettings = {
  title: "",
  description: "",
  keywords: "",
  ogImage: "",
  canonical: "",
  favicon: "",
  lang: "en",
  noIndex: false,
};

/**
 * Google Fonts used across templates — included in every published site
 * so typography renders correctly without the GrapesJS editor.
 */
const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500&family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap";

/** DMC Kreatif branding footer CSS + HTML. */
const DMC_BRANDING_CSS = `
.dmc-branding{padding:12px 0;text-align:center;font-family:'Inter',sans-serif;font-size:12px;color:#999;border-top:1px solid #eee;margin-top:40px}
.dmc-branding a{color:#999;text-decoration:none;transition:color .2s}
.dmc-branding a:hover{color:#CDFF50}
`;

const DMC_BRANDING_HTML = `
<footer class="dmc-branding">
  <a href="https://dmckreatif.com" target="_blank" rel="noopener noreferrer">
    Built with DMC Kreatif
  </a>
</footer>
`;

/** Escape HTML entities in attribute values. */
function escAttr(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Supabase project ref for tracking endpoint. */
const SUPABASE_PROJECT_REF = "mjewxaphcmricetqpejv";

/**
 * Analytics tracking snippet injected into every published site.
 * GDPR-friendly: no cookies, no personal data, only page view counts.
 * The subdomain placeholder {{SUBDOMAIN}} is replaced at generation time.
 */
function trackingScript(subdomain: string): string {
  return `
<script>
(function(){
  try{
    var d={subdomain:"${subdomain}",path:location.pathname,referrer:document.referrer||""};
    fetch("https://${SUPABASE_PROJECT_REF}.supabase.co/functions/v1/track-visit",{
      method:"POST",body:JSON.stringify(d),headers:{"Content-Type":"application/json"},
      keepalive:true
    });
  }catch(e){}
})();
</script>`;
}

/**
 * Form submission handler script injected into published sites.
 * Intercepts all forms with `data-dmc-form` attribute, collects data,
 * sends to handle-form Edge Function, shows success/error feedback.
 */
function formHandlerScript(siteId: string): string {
  return `
<script>
(function(){
  var forms=document.querySelectorAll('form[data-dmc-form]');
  forms.forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var btn=f.querySelector('button[type="submit"]');
      var origText=btn?btn.textContent:'';
      if(btn){btn.textContent='Sending...';btn.disabled=true;}
      var fd=new FormData(f);
      var data={};
      fd.forEach(function(v,k){data[k]=v;});
      var formName=f.getAttribute('data-dmc-form')||'contact';
      fetch("https://${SUPABASE_PROJECT_REF}.supabase.co/functions/v1/handle-form",{
        method:"POST",
        body:JSON.stringify({siteId:"${siteId}",formName:formName,formData:data}),
        headers:{"Content-Type":"application/json"}
      }).then(function(r){return r.json();}).then(function(j){
        if(j.ok){
          f.innerHTML='<div style="text-align:center;padding:40px 20px;"><p style="font-size:1.25rem;font-weight:700;color:#22c55e;margin-bottom:8px;">\\u2713 Message Sent!</p><p style="color:#666;">Thank you! We will get back to you shortly.</p></div>';
        }else{
          if(btn){btn.textContent=origText;btn.disabled=false;}
          alert(j.error||'Something went wrong. Please try again.');
        }
      }).catch(function(){
        if(btn){btn.textContent=origText;btn.disabled=false;}
        alert('Network error. Please check your connection and try again.');
      });
    });
  });
})();
</script>`;
}

/**
 * Generate a complete, standalone HTML document from the GrapesJS editor.
 *
 * The output is a self-contained file with:
 * - Proper <!DOCTYPE html> and charset
 * - SEO meta tags (title, description, OG, Twitter Card, canonical)
 * - Google Fonts link
 * - All CSS inlined in <style>
 * - All component HTML
 * - DMC Kreatif branding footer
 * - Analytics tracking script (GDPR-friendly, no cookies)
 * - Form submission handler (if forms are present)
 * - No external JS or framework dependencies
 */
export function generateStaticSite(
  editor: Editor,
  businessInfo: Partial<BusinessInfo>,
  seoSettings: Partial<SeoSettings>,
  siteId?: string,
  subdomain?: string,
): string {
  let html = editor.getHtml() ?? "";
  const css = editor.getCss() ?? "";

  // GrapesJS wraps content in <body>…</body>; strip it to avoid nested <body> tags
  const bodyMatch = html.match(/^<body[^>]*>([\s\S]*)<\/body>$/);
  if (bodyMatch) {
    html = bodyMatch[1];
  }

  const title = seoSettings.title || businessInfo.business_name || "My Website";
  const description =
    seoSettings.description ||
    businessInfo.short_description ||
    "";
  const lang = seoSettings.lang || "en";
  const canonical = seoSettings.canonical || "";
  const ogImage = seoSettings.ogImage || "";
  const keywords = seoSettings.keywords || "";
  const favicon = seoSettings.favicon || "";
  const noIndex = seoSettings.noIndex ?? false;

  // Build <head> meta tags
  const metaTags: string[] = [
    `<meta charset="UTF-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    `<title>${escAttr(title)}</title>`,
  ];

  if (description) {
    metaTags.push(`<meta name="description" content="${escAttr(description)}">`);
  }

  if (keywords) {
    metaTags.push(`<meta name="keywords" content="${escAttr(keywords)}">`);
  }

  if (noIndex) {
    metaTags.push(`<meta name="robots" content="noindex, nofollow">`);
  }

  metaTags.push(`<meta name="generator" content="DMC Kreatif">`);

  // Open Graph
  metaTags.push(`<meta property="og:type" content="website">`);
  metaTags.push(`<meta property="og:title" content="${escAttr(title)}">`);
  if (description) {
    metaTags.push(
      `<meta property="og:description" content="${escAttr(description)}">`,
    );
  }
  if (ogImage) {
    metaTags.push(`<meta property="og:image" content="${escAttr(ogImage)}">`);
  }
  if (canonical) {
    metaTags.push(`<meta property="og:url" content="${escAttr(canonical)}">`);
  }

  // Twitter Card
  metaTags.push(`<meta name="twitter:card" content="summary_large_image">`);
  metaTags.push(`<meta name="twitter:title" content="${escAttr(title)}">`);
  if (description) {
    metaTags.push(
      `<meta name="twitter:description" content="${escAttr(description)}">`,
    );
  }
  if (ogImage) {
    metaTags.push(`<meta name="twitter:image" content="${escAttr(ogImage)}">`);
  }

  // Canonical link
  if (canonical) {
    metaTags.push(`<link rel="canonical" href="${escAttr(canonical)}">`);
  }

  // Favicon
  if (favicon) {
    metaTags.push(`<link rel="icon" href="${escAttr(favicon)}">`);
  }

  // Google Fonts
  metaTags.push(
    `<link rel="preconnect" href="https://fonts.googleapis.com">`,
  );
  metaTags.push(
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`,
  );
  metaTags.push(`<link rel="stylesheet" href="${GOOGLE_FONTS_URL}">`);

  // JSON-LD structured data
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: title,
    description: description || undefined,
    url: canonical || undefined,
  };

  // If we have business info, add LocalBusiness schema
  const hasBusinessData =
    businessInfo.business_name ||
    businessInfo.phone ||
    businessInfo.email ||
    businessInfo.address;

  let localBusinessLd = "";
  if (hasBusinessData) {
    const lb: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: businessInfo.business_name || title,
    };
    if (businessInfo.phone) lb.telephone = businessInfo.phone;
    if (businessInfo.email) lb.email = businessInfo.email;
    if (businessInfo.address) {
      lb.address = {
        "@type": "PostalAddress",
        streetAddress: businessInfo.address,
      };
    }
    if (description) lb.description = description;
    if (canonical) lb.url = canonical;

    localBusinessLd = `\n<script type="application/ld+json">${JSON.stringify(lb)}</script>`;
  }

  return `<!DOCTYPE html>
<html lang="${escAttr(lang)}">
<head>
  ${metaTags.join("\n  ")}
  <style>
${css}
${DMC_BRANDING_CSS}
  </style>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>${localBusinessLd}
</head>
<body>
${html}
${DMC_BRANDING_HTML}
${subdomain ? trackingScript(subdomain) : ""}
${siteId && html.includes("data-dmc-form") ? formHandlerScript(siteId) : ""}
</body>
</html>`;
}

/**
 * Trigger a browser file download of the generated HTML.
 */
export function downloadHtmlFile(htmlContent: string, filename: string): void {
  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generate a sanitized filename from the project/business name.
 */
export function makeFilename(name: string): string {
  const sanitized = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
  return `${sanitized || "my-site"}.html`;
}
