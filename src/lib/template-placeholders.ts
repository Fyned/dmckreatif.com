import type { Editor, Component as GComponent } from "grapesjs";

/** Business information the user provides for their site. */
export interface BusinessInfo {
  business_name: string;
  slogan: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  short_description: string;
  primary_color: string;
  secondary_color: string;
  social_facebook: string;
  social_instagram: string;
  social_twitter: string;
  social_linkedin: string;
}

export const EMPTY_BUSINESS_INFO: BusinessInfo = {
  business_name: "",
  slogan: "",
  phone: "",
  email: "",
  address: "",
  hours: "",
  short_description: "",
  primary_color: "#CDFF50",
  secondary_color: "#111111",
  social_facebook: "",
  social_instagram: "",
  social_twitter: "",
  social_linkedin: "",
};

/**
 * Placeholder map: keys are the `{{token}}` strings used in demo HTML,
 * values are the corresponding BusinessInfo field names.
 */
const PLACEHOLDER_MAP: Record<string, keyof BusinessInfo> = {
  "{{business_name}}": "business_name",
  "{{slogan}}": "slogan",
  "{{phone}}": "phone",
  "{{email}}": "email",
  "{{address}}": "address",
  "{{hours}}": "hours",
  "{{short_description}}": "short_description",
  "{{social_facebook}}": "social_facebook",
  "{{social_instagram}}": "social_instagram",
  "{{social_twitter}}": "social_twitter",
  "{{social_linkedin}}": "social_linkedin",
};

/**
 * Replace `{{placeholder}}` tokens in the GrapesJS canvas with actual values.
 * Only replaces tokens that have a non-empty value in `info`.
 */
export function applyBusinessInfo(editor: Editor, info: BusinessInfo): void {
  const wrapper = editor.getWrapper();
  if (!wrapper) return;

  function walkAndReplace(component: GComponent): void {
    const type = component.get("type") ?? "";

    // Check if this component has direct text content
    if (type === "textnode" || type === "text") {
      let content = (component.get("content") as string) ?? "";
      let changed = false;
      for (const [token, field] of Object.entries(PLACEHOLDER_MAP)) {
        const value = info[field];
        if (value && content.includes(token)) {
          content = content.replaceAll(token, value);
          changed = true;
        }
      }
      if (changed) {
        component.set("content", content);
      }
    }

    // Also check component content (for elements with inner text)
    const innerContent = component.get("content") as string | undefined;
    if (innerContent && typeof innerContent === "string") {
      let updated = innerContent;
      let changed = false;
      for (const [token, field] of Object.entries(PLACEHOLDER_MAP)) {
        const value = info[field];
        if (value && updated.includes(token)) {
          updated = updated.replaceAll(token, value);
          changed = true;
        }
      }
      if (changed) {
        component.set("content", updated);
      }
    }

    // Replace in component attributes (href, src, alt, title, placeholder)
    const attrs = component.getAttributes();
    let attrsChanged = false;
    const newAttrs: Record<string, string> = { ...attrs };
    for (const attrKey of ["href", "src", "alt", "title", "placeholder", "content"]) {
      const val = newAttrs[attrKey];
      if (typeof val !== "string") continue;
      for (const [token, field] of Object.entries(PLACEHOLDER_MAP)) {
        const replacement = info[field];
        if (replacement && val.includes(token)) {
          newAttrs[attrKey] = val.replaceAll(token, replacement);
          attrsChanged = true;
        }
      }
    }
    if (attrsChanged) {
      component.setAttributes(newAttrs);
    }

    // Recurse into children
    const children = component.components();
    if (children && children.length) {
      children.forEach((child: GComponent) => walkAndReplace(child));
    }
  }

  // Walk the entire component tree
  const components = wrapper.components();
  components.forEach((c: GComponent) => walkAndReplace(c));

  // Apply brand colours to CSS custom properties on <body>
  if (info.primary_color || info.secondary_color) {
    const css = editor.CssComposer;
    const rules = css.getAll();
    const bodyRule = rules.find(
      (r: { get: (k: string) => unknown }) => {
        const selectors = r.get("selectors");
        return selectors && typeof selectors === "object" && "getFullString" in selectors
          ? (selectors as { getFullString: () => string }).getFullString() === "body"
          : false;
      },
    );
    if (bodyRule) {
      const style = { ...(bodyRule.get("style") as Record<string, string>) };
      if (info.primary_color) style["--brand-primary"] = info.primary_color;
      if (info.secondary_color) style["--brand-secondary"] = info.secondary_color;
      bodyRule.set("style", style);
    } else {
      css.addRules(
        `body { --brand-primary: ${info.primary_color || "#CDFF50"}; --brand-secondary: ${info.secondary_color || "#111111"}; }`,
      );
    }
  }
}

/**
 * Count how many placeholders still exist in the current editor content.
 * Useful for showing a progress indicator.
 */
export function countRemainingPlaceholders(editor: Editor): number {
  const html = editor.getHtml();
  let count = 0;
  for (const token of Object.keys(PLACEHOLDER_MAP)) {
    const regex = new RegExp(token.replace(/[{}]/g, "\\$&"), "g");
    const matches = html.match(regex);
    if (matches) count += matches.length;
  }
  return count;
}
