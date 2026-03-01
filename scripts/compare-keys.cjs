const en = require('../src/i18n/locales/en.json');
const fr = require('../src/i18n/locales/fr.json');

function getLeafKeys(obj, prefix) {
  prefix = prefix || '';
  const keys = [];
  for (const k of Object.keys(obj)) {
    const path = prefix ? prefix + '.' + k : k;
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      keys.push.apply(keys, getLeafKeys(obj[k], path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

const enLeafs = getLeafKeys(en);
const frLeafs = getLeafKeys(fr);
const missing = enLeafs.filter(function(k) { return frLeafs.indexOf(k) === -1; });

const grouped = {};
missing.forEach(function(k) {
  const top = k.split('.')[0];
  if (!grouped[top]) grouped[top] = [];
  grouped[top].push(k);
});

Object.keys(grouped).forEach(function(section) {
  if (section === 'seo') return;
  console.log('--- ' + section + ' (' + grouped[section].length + ' missing) ---');
  grouped[section].forEach(function(k) { console.log('  ' + k); });
});

console.log('\nTotal missing (excl seo):', missing.filter(function(k) { return k.split('.')[0] !== 'seo'; }).length);
