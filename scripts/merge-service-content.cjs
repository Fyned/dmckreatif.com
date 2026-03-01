/**
 * Merge service content JSON files into en.json
 * Reads content-webdev.json, content-ecommerce.json, content-seo.json, content-design.json
 * and merges their services + faq into en.json's serviceDetail section
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EN_PATH = path.join(ROOT, 'src/i18n/locales/en.json');
const CONTENT_DIR = path.join(ROOT, 'src/data/services');

// Read en.json
const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));

// Read all content batch files
const batches = ['content-webdev.json', 'content-ecommerce.json', 'content-seo.json', 'content-design.json'];
let totalServices = 0;
let totalFaq = 0;

for (const file of batches) {
  const filePath = path.join(CONTENT_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${file} not found`);
    continue;
  }

  const batch = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Merge services into serviceDetail
  if (batch.services) {
    for (const [key, value] of Object.entries(batch.services)) {
      if (en.serviceDetail[key]) {
        console.log(`  EXISTS: serviceDetail.${key} (skipping)`);
      } else {
        en.serviceDetail[key] = value;
        totalServices++;
      }
    }
  }

  // Merge FAQ entries
  if (batch.faq) {
    if (!en.serviceDetail.faq) {
      en.serviceDetail.faq = {};
    }
    for (const [key, value] of Object.entries(batch.faq)) {
      if (!en.serviceDetail.faq[key]) {
        en.serviceDetail.faq[key] = value;
        totalFaq++;
      }
    }
  }

  console.log(`MERGED: ${file}`);
}

// Write back
fs.writeFileSync(EN_PATH, JSON.stringify(en, null, 2) + '\n', 'utf-8');
console.log(`\nDone! Added ${totalServices} services, ${totalFaq} FAQ entries to en.json`);
