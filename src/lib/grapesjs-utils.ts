import type { Editor } from "grapesjs";

/**
 * GrapesJS project data shape — what getProjectData() returns.
 * We keep it loose since the internal shape can vary by version.
 */
export type GrapesProjectData = Record<string, unknown>;

/**
 * Extract project JSON from a GrapesJS editor instance.
 */
export function getProjectJson(editor: Editor): GrapesProjectData {
  return editor.getProjectData() as GrapesProjectData;
}

/**
 * Load project JSON into a GrapesJS editor instance.
 */
export function loadProjectJson(
  editor: Editor,
  data: GrapesProjectData
): void {
  editor.loadProjectData(data);
}

/**
 * Export full standalone HTML from a GrapesJS editor instance.
 */
export function exportFullHtml(editor: Editor): string {
  const html = editor.getHtml();
  const css = editor.getCss();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${css}</style>
</head>
<body>${html}</body>
</html>`;
}

/**
 * Parse a full HTML document into body content + CSS.
 * Used when loading demo HTML files into the editor.
 */
export function parseHtmlDocument(html: string): {
  body: string;
  css: string;
  title: string;
} {
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : "";

  const styleMatches = html.match(/<style>([\s\S]*?)<\/style>/g);
  const css = styleMatches
    ? styleMatches.map((s) => s.replace(/<\/?style>/g, "")).join("\n")
    : "";

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  const body = bodyMatch ? bodyMatch[1] : html;

  return { body, css, title };
}
