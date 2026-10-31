# Per-niche demo website generator

Static demo sites for a website-sales process: one proven template per niche,
personalised from one JSON config, delivered in under 10 minutes.

## Quick start

```bash
node build.mjs                                    # builds the dental reference (powai-smile)
node build.mjs config/dermatology-bandra.json     # builds a niche config
node build.mjs config/<slug>.json --out sites/x     # custom output dir

node verify.mjs sites/<slug> --config config/<slug>.json --report reports/verification-<slug>.md
```

## Structure

- `build.mjs` — generator. `nicheType` (dental / dermatology / physio) controls JSON-LD
  schema type, medical specialty, treatment taxonomy, FAQ themes, and cost language.
  Design language follows toothmastersdental.com: mogra-cream / sand-gold / deep-green
  palette, Playfair Display + Plus Jakarta Sans font stacks (declared first, system
  fallbacks only — nothing is ever fetched).
- `verify.mjs` — runs the full requirement checklist and writes a verification report.
- `config/*.json` — one config per prospect. This is the only file you personalise.
  Add a `photos` block (doctor, clinic, tour[], contact, treatments[]) pointing at
  staged WebP files in `sites/<slug>/images/`.
- `sites/<slug>/` — 9 generated files per site (5 HTML pages + 404 + sitemap + robots + llms)
  plus the local `images/` folder (stock WebP, ~350–400 KB per site, zero external requests).
- `process_images.py` (repo root) — stages curated stock photos into per-site `images/` dirs.

## Rules the generator enforces

- Zero external requests: system fonts, inline SVG icons, inline CSS/JS, local images only.
- Every page: exactly one `<h1>`, self-referencing canonical, OG tags, `lang="en-IN"`,
  `noindex`, SAMPLE BUILD ribbon, footer disclosure.
- Interactive cost estimator injects the selected price range into a pre-filled
  WhatsApp message.
- Contextual WhatsApp deep links per section — never one generic link.
- Sticky mobile action bar: Call Now / WhatsApp / Get Quote.
- JSON-LD: niche-correct local business schema, FAQPage, Service/ItemList with
  AggregateOffer, BreadcrumbList.

See `PERSONALISATION-CHECKLIST.md` for the full personalisation workflow.
