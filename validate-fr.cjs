const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Projects/CLAUDE-BOT/dmckreatif-vite/src/i18n/locales/fr.json', 'utf8'));
console.log('JSON is valid');

const checks = [
  ['pricing.customSectionDesc', data.pricing && data.pricing.customSectionDesc],
  ['pricing.templateSectionDesc', data.pricing && data.pricing.templateSectionDesc],
  ['pricing.comparisonTitle', data.pricing && data.pricing.comparisonTitle],
  ['pricing.launchIdealFor', data.pricing && data.pricing.launchIdealFor],
  ['pricing.carePlanSubtitle', data.pricing && data.pricing.carePlanSubtitle],
  ['pricing.carePlanDesc', data.pricing && data.pricing.carePlanDesc],
  ['pricing.addOnsTitle', data.pricing && data.pricing.addOnsTitle],
  ['pricing.addOnsSubtitle', data.pricing && data.pricing.addOnsSubtitle],
  ['pricing.addOn (object)', data.pricing && typeof data.pricing.addOn === 'object'],
  ['pricing.addOn.logoDesign', data.pricing && data.pricing.addOn && data.pricing.addOn.logoDesign],
  ['pricing.addOn.monthlySeoDesc', data.pricing && data.pricing.addOn && data.pricing.addOn.monthlySeoDesc],
  ['pricing.premiumComparePrice', data.pricing && data.pricing.premiumComparePrice],
  ['pricing.templateComparePrice', data.pricing && data.pricing.templateComparePrice],
  ['templates.tryDifferent', data.templates && data.templates.tryDifferent],
  ['templates.loading', data.templates && data.templates.loading],
  ['templates.error', data.templates && data.templates.error],
  ['templates.retry', data.templates && data.templates.retry],
  ['OLD addOnTitle removed', !(data.pricing && data.pricing.addOnTitle)],
  ['OLD addOnSubtitle removed', !(data.pricing && data.pricing.addOnSubtitle)],
  ['OLD flat logoDesign removed', !(data.pricing && typeof data.pricing.logoDesign === 'string')],
];

let allPassed = true;
checks.forEach(([name, result]) => {
  const status = result ? 'PASS' : 'FAIL';
  if (!result) allPassed = false;
  console.log(`  ${status}: ${name}`);
});

console.log(allPassed ? '\nAll checks passed!' : '\nSome checks FAILED!');
process.exit(allPassed ? 0 : 1);
