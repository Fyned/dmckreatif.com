const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
let xml = fs.readFileSync(sitemapPath, 'utf-8');

const fileExtPattern = /\.\w{2,5}$/;
let fixCount = 0;

// Fix <loc>...</loc> URLs
xml = xml.replace(/<loc>(https?:\/\/[^<]+)<\/loc>/g, (match, url) => {
  if (fileExtPattern.test(url) || url.endsWith('/')) return match;
  fixCount++;
  return `<loc>${url}/</loc>`;
});

// Fix href="..." attributes
xml = xml.replace(/href="(https?:\/\/[^"]+)"/g, (match, url) => {
  if (fileExtPattern.test(url) || url.endsWith('/')) return match;
  fixCount++;
  return `href="${url}/"`;
});

fs.writeFileSync(sitemapPath, xml, 'utf-8');
console.log(`Fixed ${fixCount} URLs by adding trailing slashes.`);
