const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
const xml = fs.readFileSync(sitemapPath, 'utf-8');

// Cities to REMOVE (everything NOT in this set gets kept)
const removeCities = new Set([
  'marseille', 'manchester', 'birmingham', 'bristol', 'edinburgh',
  'glasgow', 'leeds', 'rotterdam', 'the-hague', 'utrecht', 'eindhoven',
  'antwerp', 'ghent', 'liege', 'munich', 'hamburg', 'frankfurt',
  'cologne', 'stuttgart', 'dusseldorf', 'nice', 'toulouse', 'bordeaux',
  'nantes', 'rennes', 'strasbourg', 'lille', 'london-2026'
]);

// Build a pattern that matches web-agency-{removedCity} in a URL
// Must match the city slug exactly (followed by / or end of path, not a longer slug)
const cityPattern = new RegExp(
  'web-agency-(' + [...removeCities].map(c => c.replace('-', '\\-')).join('|') + ')(?:[/"<\\s]|$)'
);

// Split XML into parts: before first <url>, each <url>...</url> block, and after last </url>
// Strategy: extract everything between <urlset...> tags, split into url blocks

// Find all <url>...</url> blocks (both multiline and single-line)
const urlBlocks = [];
const blockRegex = /[ \t]*<url[\s>][\s\S]*?<\/url>/g;
let match;
while ((match = blockRegex.exec(xml)) !== null) {
  urlBlocks.push({ text: match[0], index: match.index, length: match[0].length });
}

const beforeCount = urlBlocks.length;

// Determine which blocks to remove
const blocksToRemove = new Set();
for (let i = 0; i < urlBlocks.length; i++) {
  const block = urlBlocks[i].text;
  if (cityPattern.test(block)) {
    blocksToRemove.add(i);
  }
}

// Rebuild XML by removing marked blocks
let result = xml;
// Process in reverse order to preserve indices
const sortedIndices = [...blocksToRemove].sort((a, b) => b - a);
for (const idx of sortedIndices) {
  const block = urlBlocks[idx];
  // Also remove the preceding newline(s) to keep formatting clean
  let start = block.index;
  // Look back for newlines before the block
  while (start > 0 && (result[start - 1] === '\n' || result[start - 1] === '\r')) {
    start--;
  }
  result = result.slice(0, start) + result.slice(block.index + block.length);
}

// Clean up excessive blank lines
result = result.replace(/\n{3,}/g, '\n\n');

const afterCount = (result.match(/<url[\s>]/g) || []).length;
const removedCount = beforeCount - afterCount;

fs.writeFileSync(sitemapPath, result, 'utf-8');
console.log(`Before: ${beforeCount} URLs`);
console.log(`After:  ${afterCount} URLs`);
console.log(`Removed: ${removedCount} URLs`);
