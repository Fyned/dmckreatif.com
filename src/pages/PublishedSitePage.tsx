import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/lib/supabase";

/**
 * Full-screen published site viewer.
 * Route: /site/:subdomain
 *
 * Fetches the published HTML from Supabase and renders it
 * in a full-viewport iframe via srcdoc. This bypasses Supabase
 * Storage/Edge Function limitations that force text/plain for HTML.
 */
export default function PublishedSitePage() {
  const { subdomain } = useParams<{ subdomain: string }>();
  const [html, setHtml] = useState<string | null>(null);
  const [siteTitle, setSiteTitle] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!subdomain) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    async function fetchSite() {
      const { data, error } = await supabase
        .from("user_projects")
        .select("published_html, project_name")
        .eq("subdomain", subdomain)
        .eq("status", "published")
        .single();

      if (error || !data?.published_html) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      // Extract <title> from the HTML for the parent page
      const titleMatch = data.published_html.match(
        /<title>([^<]*)<\/title>/i,
      );
      setSiteTitle(
        titleMatch?.[1] || data.project_name || "Published Site",
      );

      setHtml(data.published_html);
      setLoading(false);
    }

    fetchSite();
  }, [subdomain]);

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading...</title>
        </Helmet>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#050505",
            color: "#CDFF50",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 40,
                height: 40,
                border: "3px solid #333",
                borderTop: "3px solid #CDFF50",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            <p style={{ fontSize: 14, opacity: 0.7 }}>Loading site...</p>
          </div>
        </div>
      </>
    );
  }

  if (notFound) {
    return (
      <>
        <Helmet>
          <title>Site Not Found</title>
        </Helmet>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#050505",
            color: "#F5F5F7",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 400 }}>
            <h1
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: "#CDFF50",
                margin: "0 0 8px",
              }}
            >
              404
            </h1>
            <p style={{ fontSize: 18, marginBottom: 8 }}>Site Not Found</p>
            <p style={{ fontSize: 14, color: "#8E8E93" }}>
              The site you&apos;re looking for doesn&apos;t exist or has been
              unpublished.
            </p>
            <a
              href="/"
              style={{
                display: "inline-block",
                marginTop: 24,
                padding: "10px 24px",
                background: "#CDFF50",
                color: "#050505",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Go to Homepage
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{siteTitle}</title>
      </Helmet>
      <iframe
        srcDoc={html!}
        title={siteTitle}
        style={{
          width: "100vw",
          height: "100vh",
          border: "none",
          display: "block",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </>
  );
}
