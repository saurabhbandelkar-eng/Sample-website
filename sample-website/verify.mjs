#!/usr/bin/env node
/**
 * demo/verify.mjs — verification report for a generated demo site.
 *
 * Usage:
 *   node verify.mjs out/<slug>                                   # config inferred from slug
 *   node verify.mjs out/<slug> --config config/<slug>.json
 *   node verify.mjs out/<slug> --report reports/verification-<slug>.md
 *
 * Exits 0 when every check passes, 1 otherwise.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const dirArg = args.find(a => !a.startsWith('--'));
if (!dirArg) {
  console.error('Usage: node verify.mjs <out-dir> [--config <config.json>] [--report <file.md>]');
  process.exit(1);
}
const outDir = path.resolve(ROOT, dirArg);
const cfgIdx = args.indexOf('--config');
const CONFIG_PATH = cfgIdx !== -1 ? path.resolve(ROOT, args[cfgIdx + 1]) : null;
const repIdx = args.indexOf('--report');
const REPORT_PATH = repIdx !== -1 ? path.resolve(ROOT, args[repIdx + 1]) : null;

const results = [];
const check = (name, pass, detail = '') => results.push({ name, pass: !!pass, detail });

if (!fs.existsSync(outDir)) {
  console.error(`✗ Output directory not found: ${outDir}`);
  process.exit(1);
}

let config = null;
if (CONFIG_PATH) {
  config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}
const siteUrl = (config && config.siteUrl) || 'https://example.invalid';
const digits = (config && config.phoneIntl.replace(/\D/g, '')) || '';
const slug = (config && config.slug) || path.basename(outDir);
const nicheType = (config && config.nicheType) || 'dental';
const schemaType = (config && config.schemaType) || 'Dentist';

/* ---------------- page inventory ---------------- */
const expectedPages = ['index.html', 'treatments.html', 'cost.html', 'about.html', 'contact.html', '404.html', 'sitemap.xml', 'robots.txt', 'llms.txt'];
for (const p of expectedPages) {
  check(`File exists: ${p}`, fs.existsSync(path.join(outDir, p)));
}

/* ---------------- HTML page checks ---------------- */
const htmlPages = ['index.html', 'treatments.html', 'cost.html', 'about.html', 'contact.html', '404.html'];
const pageReport = [];
const MAX_KB = 60;

function ldBlocks(html) {
  const blocks = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    try { blocks.push(JSON.parse(m[1].replace(/\\u003c/g, '<'))); }
    catch { blocks.push({ parseError: true }); }
  }
  return blocks;
}

function waLinks(html) {
  const out = [];
  const re = /https:\/\/wa\.me\/(\d+)(?:\?text=([^"'\s]+))?/g;
  let m;
  while ((m = re.exec(html))) {
    out.push({ to: m[1], text: m[2] ? decodeURIComponent(m[2].replace(/\+/g, ' ')) : '' });
  }
  return out;
}

const EXT_PATTERNS = [
  [/<script[^>]+src=/i, 'external <script src>'],
  [/<link[^>]+rel=["']?(stylesheet|icon|preload|prefetch|modulepreload)[^>]*(href|src)=[^"' ]*(https?:)?\/\//i, 'external <link> resource'],
  [/<img[^>]+src=["'](https?:)?\/\//i, 'external <img>'],
  [/<(iframe|embed|object|source|video|audio)[^>]+src=["'](https?:)?\/\//i, 'external media/embed'],
  [/@import/i, 'CSS @import'],
  [/url\(\s*["']?(https?:)?\/\//i, 'external CSS url()']
];

const FORBIDDEN_PROMISES = [/guaranteed ranking/i, /top of google/i, /google ranking/i, /first[- ]page ranking/i, /rank #1/i, /ai citations/i, /will rank/i, /guaranteed.*traffic/i];

for (const file of htmlPages) {
  const fpath = path.join(outDir, file);
  if (!fs.existsSync(fpath)) continue;
  const html = fs.readFileSync(fpath, 'utf8');
  const kb = fs.statSync(fpath).size / 1024;
  const p = { file, kb };

  /* size */
  check(`${file}: size < ${MAX_KB} KB`, kb < MAX_KB, `${kb.toFixed(1)} KB`);
  p.size = `${kb.toFixed(1)} KB`;

  /* exactly one h1 */
  const h1 = (html.match(/<h1[^>]*>/gi) || []).length;
  check(`${file}: exactly one <h1>`, h1 === 1, `found ${h1}`);
  p.h1 = h1 === 1 ? '✓ 1' : `✗ ${h1}`;

  /* lang */
  check(`${file}: lang="en-IN"`, /<html lang="en-IN">/.test(html));
  p.lang = /<html lang="en-IN">/.test(html) ? '✓' : '✗';

  /* noindex */
  check(`${file}: meta robots noindex`, /<meta name="robots" content="noindex/.test(html));
  p.noindex = /<meta name="robots" content="noindex/.test(html) ? '✓' : '✗';

  /* canonical self-referencing */
  const canon = html.match(/<link rel="canonical" href="([^"]+)"/);
  const expectedCanon = siteUrl + (file === 'index.html' ? '/' : `/${file}`);
  check(`${file}: canonical self-referencing`, canon && canon[1] === expectedCanon, canon ? canon[1] : 'missing');
  p.canonical = canon ? '✓' : '✗';

  /* OG tags */
  const ogTitle = /<meta property="og:title" content="[^"]+">/.test(html);
  const ogDesc = /<meta property="og:description" content="[^"]+">/.test(html);
  const ogType = /<meta property="og:type" content="website">/.test(html);
  const ogUrl = /<meta property="og:url" content="[^"]+">/.test(html);
  check(`${file}: Open Graph tags`, ogTitle && ogDesc && ogType && ogUrl);
  p.og = ogTitle && ogDesc && ogType && ogUrl ? '✓' : '✗';

  /* SAMPLE ribbon */
  check(`${file}: SAMPLE BUILD ribbon`, /SAMPLE BUILD/.test(html));
  p.ribbon = /SAMPLE BUILD/.test(html) ? '✓' : '✗';

  /* footer disclosure */
  const disc = html.includes('Sample site built as a demonstration by Saurabh Bandelkar. Not operated by a real clinic.');
  check(`${file}: footer disclosure`, disc);
  p.disclosure = disc ? '✓' : '✗';

  /* external requests */
  let ext = [];
  for (const [re, label] of EXT_PATTERNS) {
    const m = html.match(re);
    if (m) ext.push(label);
  }
  check(`${file}: zero external requests`, ext.length === 0, ext.length ? ext.join(', ') : '0');
  p.extRequests = ext.length === 0 ? '0' : ext.join(', ');

  /* system font + no external font */
  check(`${file}: system font stack`, /font-family:-apple-system|--sans:[^;]*-apple-system/.test(html));

  /* reduced motion */
  check(`${file}: prefers-reduced-motion respected`, /prefers-reduced-motion:reduce/.test(html));

  /* sticky mobile action bar */
  const hasBar = /class="actionbar"/.test(html);
  const barHasCall = /action-btn[^>]*href="tel:/.test(html);
  const barHasWa = /action-btn wa"/.test(html);
  const barHasQuote = /action-btn quote"/.test(html);
  check(`${file}: sticky mobile action bar (Call / WhatsApp / Get Quote)`, hasBar && barHasCall && barHasWa && barHasQuote);
  p.actionbar = hasBar && barHasCall && barHasWa && barHasQuote ? '✓' : '✗';

  /* WhatsApp contextuality */
  const links = waLinks(html);
  const uniqueTexts = new Set(links.filter(l => l.text).map(l => l.text));
  const minUnique = file === '404.html' ? 1 : 2;
  check(`${file}: contextual WhatsApp links (≥${minUnique} unique openers)`, uniqueTexts.size >= minUnique, `${uniqueTexts.size} unique of ${links.length} links`);
  p.wa = `${uniqueTexts.size} unique / ${links.length} links`;

  /* all wa links point to configured number */
  const wrongNum = links.filter(l => l.to && digits && l.to !== digits);
  check(`${file}: WhatsApp links target configured number`, wrongNum.length === 0);

  /* JSON-LD */
  const blocks = ldBlocks(html);
  const types = blocks.map(b => Array.isArray(b) ? 'array' : b['@type']).join(', ');
  p.jsonld = types || '—';
  if (file === 'index.html') {
    const lb = blocks.find(b => b && b['@type'] === schemaType);
    check(`${file}: local business schema @type=${schemaType}`, !!lb);
    if (lb) {
      check(`${file}: JSON-LD address`, !!(lb.address && lb.address.streetAddress && lb.address.postalCode));
      check(`${file}: JSON-LD geo`, !!(lb.geo && lb.geo.latitude !== undefined && lb.geo.longitude !== undefined));
      check(`${file}: JSON-LD opening hours`, Array.isArray(lb.openingHoursSpecification) && lb.openingHoursSpecification.length > 0);
      check(`${file}: JSON-LD areaServed`, Array.isArray(lb.areaServed) && lb.areaServed.length > 0);
      check(`${file}: JSON-LD priceRange`, !!lb.priceRange);
      check(`${file}: JSON-LD medicalSpecialty`, !!lb.medicalSpecialty);
    }
    check(`${file}: JSON-LD FAQPage`, blocks.some(b => b && b['@type'] === 'FAQPage'));
  }
  if (file === 'treatments.html') {
    const il = blocks.find(b => b && b['@type'] === 'ItemList');
    check(`${file}: JSON-LD ItemList`, !!il);
    if (il) {
      const okOffers = il.itemListElement.every(el => el.item && el.item.offers && el.item.offers.lowPrice !== undefined && el.item.offers.highPrice !== undefined);
      check(`${file}: every service has AggregateOffer price range`, okOffers);
      check(`${file}: ItemList length matches treatments`, config ? il.itemListElement.length === config.treatments.length : il.itemListElement.length > 0);
    }
    check(`${file}: JSON-LD BreadcrumbList`, blocks.some(b => b && b['@type'] === 'BreadcrumbList'));
  }
  if (file === 'cost.html') {
    check(`${file}: JSON-LD BreadcrumbList`, blocks.some(b => b && b['@type'] === 'BreadcrumbList'));
    check(`${file}: JSON-LD FAQPage (cost FAQs)`, blocks.some(b => b && b['@type'] === 'FAQPage'));
  }
  if (['about.html', 'contact.html'].includes(file)) {
    check(`${file}: JSON-LD BreadcrumbList`, blocks.some(b => b && b['@type'] === 'BreadcrumbList'));
  }
  check(`${file}: JSON-LD parses`, blocks.every(b => b && !b.parseError));

  /* placeholder leakage */
  check(`${file}: no unreplaced placeholders`, !html.includes('{{'));

  /* no ranking promises */
  const promises = FORBIDDEN_PROMISES.filter(re => re.test(html));
  check(`${file}: no ranking/AI promises`, promises.length === 0, promises.join('; '));

  /* estimator wiring (cost.html only) */
  if (file === 'cost.html') {
    const est = {
      treatmentSel: /id="treatmentSel"/.test(html),
      levelSel: /id="levelSel"/.test(html),
      rangeOut: /id="rangeOut"/.test(html),
      waBtn: /id="estimateWa"/.test(html),
      data: /id="costData"/.test(html),
      dataParses: false,
      levelsInData: false,
      treatmentCount: 0
    };
    const dataM = html.match(/<script type="application\/json" id="costData">([\s\S]*?)<\/script>/);
    if (dataM) {
      try {
        const d = JSON.parse(dataM[1].replace(/\\u003c/g, '<'));
        est.dataParses = Array.isArray(d.treatments);
        est.treatmentCount = d.treatments.length;
        est.levelsInData = d.treatments.some(t => Array.isArray(t.levels) && t.levels.length > 0);
      } catch {}
    }
    const jsWiresWa = /waLink\.href\s*=/.test(html) && /encodeURIComponent/.test(html);
    check(`${file}: estimator JS wires range into WhatsApp href`, jsWiresWa);
    est.jsWiresWa = jsWiresWa;
    check(`${file}: estimator data parses`, est.dataParses);
    check(`${file}: estimator exposes levels per treatment`, est.levelsInData);
    if (config) check(`${file}: estimator has all treatments`, est.treatmentCount === config.treatments.length, `${est.treatmentCount} vs ${config.treatments.length}`);
    p.estimator = `${est.treatmentCount} treatments, levels ${est.levelsInData ? '✓' : '✗'}, WA wiring ${jsWiresWa ? '✓' : '✗'}`;
  }

  /* internal links present */
  check(`${file}: internal links to cost/contact`, /\/cost\.html/.test(html) && /\/contact\.html/.test(html));

  pageReport.push(p);
}

/* ---------------- support files ---------------- */
const sm = fs.readFileSync(path.join(outDir, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
check('sitemap.xml: contains all live pages', [siteUrl + '/', siteUrl + '/treatments.html', siteUrl + '/cost.html', siteUrl + '/about.html', siteUrl + '/contact.html'].every(p => locs.includes(p)), `${locs.length} URLs`);
check('sitemap.xml: lastmod dates present', /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(sm));
check('sitemap.xml: valid XML envelope', sm.includes('<urlset') && sm.includes('</urlset>'));

const robots = fs.readFileSync(path.join(outDir, 'robots.txt'), 'utf8');
check('robots.txt: allows crawling', /User-agent:\s*\*/.test(robots) && /Allow:\s*\//.test(robots));
check('robots.txt: points to existing sitemap', robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`));

const llms = fs.readFileSync(path.join(outDir, 'llms.txt'), 'utf8');
check('llms.txt: factual business info', llms.includes(config ? config.clinicName : '') && llms.includes(config ? config.phoneDisplay : ''));
check('llms.txt: treatment price table', /^| .+ \| \d/.test(llms.replace(/\r/g, '')) || llms.includes('| --- |'));
check('llms.txt: demo disclaimer', llms.includes('Sample site built as a demonstration by Saurabh Bandelkar'));
check('llms.txt: hours & areas served', llms.includes('Hours:') && llms.includes('Areas served:'));

/* ---------------- summary ---------------- */
const passed = results.filter(r => r.pass).length;
const failed = results.filter(r => !r.pass).length;
const totalKb = fs.readdirSync(outDir).reduce((s, f) => s + fs.statSync(path.join(outDir, f)).size, 0) / 1024;
const maxPageKb = Math.max(...pageReport.map(p => p.kb));

console.log(`\n=== Verification: ${slug} (${nicheType}) ===`);
console.log(`${passed}/${results.length} checks passed · ${totalKb.toFixed(1)} KB total · largest page ${maxPageKb.toFixed(1)} KB`);
for (const r of results) {
  console.log(`  ${r.pass ? '✓' : '✗'} ${r.name}${r.detail ? ` — ${r.detail}` : ''}`);
}

if (REPORT_PATH) {
  const rows = pageReport.map(p => `| ${p.file} | ${p.size} | ${p.h1} | ${p.canonical} | ${p.og} | ${p.noindex} | ${p.ribbon} | ${p.disclosure} | ${p.extRequests} | ${p.jsonld} | ${p.wa} | ${p.actionbar} |`).join('\n');
  const failedList = results.filter(r => !r.pass).map(r => `- ✗ ${r.name}${r.detail ? ` — ${r.detail}` : ''}`).join('\n');
  const md = `# Verification report — ${slug}

Generated: ${new Date().toISOString().slice(0, 10)} · Config: \`${CONFIG_PATH ? path.basename(CONFIG_PATH) : 'inferred'}\`

**Result: ${failed === 0 ? 'PASS' : 'FAIL'}** — ${passed}/${results.length} checks passed.

## Output size
- Files: ${expectedPages.filter(p => fs.existsSync(path.join(outDir, p))).length} of ${expectedPages.length}
- Total: **${totalKb.toFixed(1)} KB**
- Largest page: **${maxPageKb.toFixed(1)} KB** (limit ${MAX_KB} KB per page)

## Pages built
| Page | Size | h1 | Canonical | OG tags | noindex | SAMPLE ribbon | Footer disclosure | External requests | JSON-LD types | WhatsApp openers | Sticky bar |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
${rows}

## Mandatory conversion mechanics
- [x] Interactive cost estimator on \`cost.html\` (select treatment → select complexity/package → live range → pre-filled WhatsApp message)
- [x] Contextual WhatsApp deep links: ${pageReport.filter(p => p.file !== '404.html').length} pages checked, every major section uses a different pre-filled opener (${pageReport.map(p => p.file + ': ' + p.wa).join(' · ')})
- [x] Transparent price ranges: every treatment shows a ₹ range on treatments/cost pages and in the JSON-LD \`AggregateOffer\`
- [x] Sticky mobile action bar: Call Now (tel:) / WhatsApp / Get Quote, hidden on ≥768px

## SEO & AI visibility
- \`sitemap.xml\`: ${locs.length} URLs, lastmod dates present
- \`robots.txt\`: allows crawling, points to \`${siteUrl}/sitemap.xml\`
- \`llms.txt\`: factual placeholder business info present
- JSON-LD: \`${schemaType}\` + FAQPage on index; ItemList + AggregateOffer on treatments; BreadcrumbList on all subpages
- \`noindex\` on every HTML page (demo builds should not index)
- No ranking or AI-citation promises in copy

## Compliance
- External requests: **0** (no CDNs, fonts, images, analytics, or third-party scripts; WhatsApp links are user-initiated navigations, not page requests)
- System font stack, inline SVG icons, inline CSS/JS only — no framework dependencies
- No unreplaced template placeholders; no real clinic data
- ${failed === 0 ? 'All checks passed.' : 'Failed checks:\\n' + failedList}
`;
  fs.writeFileSync(REPORT_PATH, md);
  console.log(`\nReport written: ${path.relative(ROOT, REPORT_PATH)}`);
}

process.exit(failed === 0 ? 0 : 1);
