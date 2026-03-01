/**
 * Fix duplicate/mismatched i18n keys in en.json
 * Data files use shorter keys; content-en agent used longer ones.
 * This script:
 * 1. Maps long keys -> short keys (from data files)
 * 2. If short key is missing content, copies from long key
 * 3. Removes the long duplicate keys
 * 4. Also fixes FAQ key mismatches
 */
const fs = require('fs');
const path = require('path');

const EN_PATH = path.join(__dirname, '..', 'src/i18n/locales/en.json');
const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));
const sd = en.serviceDetail;

// Mapping: content-en long key -> data-architect short key
const keyMap = {
  'customWebApps': 'customApps',
  'websiteRedesign': 'redesign',
  'maintenanceSupport': 'maintenance',
  'gdprCompliance': 'gdpr',
  'woocommerceDev': 'wooDev',
  'customEcommerce': 'customEcom',
  'b2bEcommerce': 'b2bEcom',
  'paymentIntegration': 'paymentInt',
  'ecommerceSeo': 'ecomSeo',
  'ecommerceAnalytics': 'ecomAnalytics',
  'internationalSeo': 'intlSeo',
  'marketingAutomation': 'marketingAuto',
  'geoOptimization': 'geoOpt',
  'mobileFirstDesign': 'mobileFirst',
};

// For each mapping, ensure short key has content, then remove long key
for (const [longKey, shortKey] of Object.entries(keyMap)) {
  if (sd[longKey]) {
    if (!sd[shortKey]) {
      // Short key doesn't exist, rename long to short
      sd[shortKey] = sd[longKey];
      console.log(`RENAME: ${longKey} -> ${shortKey}`);
    } else {
      // Both exist - keep the one with more content (longer longDesc)
      const longContent = sd[longKey].longDesc || '';
      const shortContent = sd[shortKey].longDesc || '';
      if (longContent.length > shortContent.length) {
        sd[shortKey] = sd[longKey];
        console.log(`PREFER LONG: ${longKey} -> ${shortKey} (${longContent.length} > ${shortContent.length})`);
      } else {
        console.log(`KEEP SHORT: ${shortKey} (${shortContent.length} >= ${longContent.length})`);
      }
    }
    delete sd[longKey];
    console.log(`DELETE: ${longKey}`);
  }
}

// Fix FAQ key mismatches too
const faqKeyMap = {
  // content-en used long names, batch files used short names
  'customWebApps': 'customApps',
  'websiteRedesign': 'redesign',
  'maintenanceSupport': 'maintenance',
  'gdprCompliance': 'gdpr',
  'woocommerceDev': 'wooDev',
  'customEcommerce': 'customEcom',
  'b2bEcommerce': 'b2bEcom',
  'paymentIntegration': 'paymentInt',
  'ecommerceSeo': 'ecomSeo',
  'ecommerceAnalytics': 'ecomAnalytics',
  'internationalSeo': 'intlSeo',
  'marketingAutomation': 'marketingAuto',
  'geoOptimization': 'geoOpt',
  'mobileFirstDesign': 'mobileFirst',
};

const faq = sd.faq;
if (faq) {
  for (const [longPrefix, shortPrefix] of Object.entries(faqKeyMap)) {
    for (let i = 1; i <= 4; i++) {
      for (const suffix of ['Q', 'A']) {
        const longKey = `${longPrefix}${i}${suffix}`;
        const shortKey = `${shortPrefix}${i}${suffix}`;
        if (faq[longKey]) {
          if (!faq[shortKey]) {
            faq[shortKey] = faq[longKey];
          }
          delete faq[longKey];
        }
      }
    }
  }
}

// Count final state
const skip = ['fromLabel','getQuote','seeWork','overviewTitle','overviewSubtitle','featuresTitle','featuresSubtitle','processTitle','processSubtitle','faqTitle','faqSubtitle','relatedTitle','relatedSubtitle','faq'];
const serviceKeys = Object.keys(sd).filter(k => skip.indexOf(k) === -1);
console.log(`\nFinal: ${serviceKeys.length} services, ${Object.keys(faq).length} FAQ entries`);
console.log('Services:', serviceKeys.join(', '));

// Check which data-file keys are missing content
const expectedKeys = [
  'webDev', 'reactDev', 'nextjsDev', 'typescriptDev', 'frontendDev', 'customApps', 'pwa', 'apiDev', 'redesign', 'legacyMod', 'maintenance', 'headlessCms', 'perfOpt', 'a11y', 'gdpr', 'integrations',
  'ecommerce', 'shopifyDev', 'wooDev', 'customEcom', 'b2bEcom', 'multiCurrency', 'paymentInt', 'ecomSeo', 'ecomAnalytics',
  'seo', 'marketing', 'technicalSeo', 'localSeo', 'intlSeo', 'contentSeo', 'linkBuilding', 'seoConsulting', 'googleAds', 'analyticsSetup', 'marketingAuto', 'geoOpt',
  'uxUiDesign', 'digitalStrategy', 'brandIdentity', 'designSystems', 'prototyping', 'mobileFirst', 'contentMarketing'
];
const missing = expectedKeys.filter(k => !sd[k]);
if (missing.length > 0) {
  console.log('\nMISSING KEYS:', missing.join(', '));
} else {
  console.log('\nAll expected keys present!');
}

fs.writeFileSync(EN_PATH, JSON.stringify(en, null, 2) + '\n', 'utf-8');
console.log('Written to en.json');
