const fs = require("fs");

const articlesText = fs.readFileSync("src/data/blog/articles.ts", "utf8");

const slugDateMap = {};
const re = /slug:\s*"([^"]+)"[^}]*?date:\s*"([^"]+)"/gs;
let m;
while ((m = re.exec(articlesText)) !== null) {
  slugDateMap[m[1]] = m[2];
}

let sitemap = fs.readFileSync("public/sitemap.xml", "utf8");
let replacements = 0;

for (const [slug, date] of Object.entries(slugDateMap)) {
  const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    "(<loc>https://dmckreatif\\.com/[a-z]{2}/blog/" +
      escaped +
      "</loc>[\\s\\S]*?<lastmod>)(\\d{4}-\\d{2}-\\d{2})(</lastmod>)",
    "g"
  );
  sitemap = sitemap.replace(pattern, (match, before, oldDate, after) => {
    if (oldDate !== date) {
      replacements++;
      return before + date + after;
    }
    return match;
  });
}

fs.writeFileSync("public/sitemap.xml", sitemap);
console.log(`Updated ${replacements} blog lastmod entries`);
console.log(`Slug->Date map: ${Object.keys(slugDateMap).length} articles`);
