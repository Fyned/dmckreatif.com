/**
 * Migrate blog content from en.json to separate content files
 * Then remove the content/title/excerpt keys from en.json
 */
const fs = require('fs');
const path = require('path');

const enJsonPath = path.join(__dirname, '..', 'src', 'i18n', 'locales', 'en.json');
const contentDir = path.join(__dirname, '..', 'src', 'data', 'blog', 'content', 'en');

// Ensure directory exists
fs.mkdirSync(contentDir, { recursive: true });

// Read en.json
const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));
const blog = enJson.blog;

// Mapping: filename -> contentKey
const migrations = [
  { file: 'website-cost.ts', contentKey: 'websiteCostContent' },
  { file: 'react-vs-wordpress.ts', contentKey: 'reactVsWpContent' },
  { file: 'seo-france.ts', contentKey: 'seoFranceContent' },
  { file: 'multilingual-website.ts', contentKey: 'multilingualContent' },
];

// Keys to remove from blog section
const keysToRemove = [
  'websiteCostTitle', 'websiteCostExcerpt', 'websiteCostContent',
  'reactVsWpTitle', 'reactVsWpExcerpt', 'reactVsWpContent',
  'seoFranceTitle', 'seoFranceExcerpt', 'seoFranceContent',
  'multilingualTitle', 'multilingualExcerpt', 'multilingualContent',
];

// Write content files
for (const { file, contentKey } of migrations) {
  const content = blog[contentKey];
  if (!content) {
    console.error(`Key blog.${contentKey} not found!`);
    process.exit(1);
  }

  // Escape backticks and ${} in content for template literal
  const escaped = content
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');

  const fileContent = `const content = \`${escaped}\`;\nexport default content;\n`;
  const filePath = path.join(contentDir, file);
  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`Written: ${file} (${content.length} chars)`);
}

// Remove keys from en.json
for (const key of keysToRemove) {
  delete enJson.blog[key];
}

// Write updated en.json
fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2) + '\n', 'utf8');
console.log(`\nRemoved ${keysToRemove.length} keys from en.json`);
console.log('Migration complete!');
