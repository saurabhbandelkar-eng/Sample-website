# One-page personalisation checklist — template → named prospect demo in under 10 minutes

**Business model:** websites sold at ₹18,999, 7-day delivery.
**Core principle:** one proven template per niche, reused — not bespoke work per prospect.

## How it works

One JSON config per prospect. You edit fields in the config, run one command, and the
generator writes a complete, deployable static site. **No template edits, no code changes,
no designers.** The generator is the product; the config is the personalisation layer.

```
demo/
├── build.mjs                    # the generator (nicheType switch: dental / dermatology / physio)
├── verify.mjs                   # automatic verification + report
├── config/
│   ├── powai-smile.json         # reference: dental clinic, Powai
│   ├── dermatology-bandra.json  # dermatology & hair, Bandra West
│   └── physio-andheri.json      # physiotherapy, Andheri East
└── sites/
    ├── powai-smile/             # generated demo (9 files)
    ├── dermatology-bandra/
    └── physio-andheri/
```

---

## Step 0 — Copy the nearest template (10 seconds)

Pick the niche that matches the prospect, then copy it:

```bash
cp demo/config/dermatology-bandra.json demo/config/<prospect-slug>.json
# or
cp demo/config/physio-andheri.json demo/config/<prospect-slug>.json
# or
cp demo/config/powai-smile.json demo/config/<prospect-slug>.json
```

## Step 1 — Identity & contact — ~2 minutes

Exact find-and-replace fields. Every config field maps to one template placeholder:

| Config field (edit this) | Placeholder (in template) | Example |
| --- | --- | --- |
| `clinicName` | `{{CLINIC}}` | “Skin & Hair Clinic” |
| `clinicShortName` | `{{CLINIC_SHORT}}` | “Skin & Hair” |
| `doctorName` | `{{DOCTOR}}` | “Dr. Sneha Rao” |
| `doctorCredentials` | `{{DOCTOR_CREDENTIALS}}` | “MD Dermatology” |
| `phoneDisplay` | `{{PHONE_DISPLAY}}` | “98200 12345” |
| `phoneIntl` | `{{PHONE_INTL}}` | “+919820012345” |
| `email` | `{{EMAIL}}` | `care@…demo.in` |
| `address` | `{{ADDRESS}}` | street, area, city |
| `locality` / `city` / `pincode` | `{{LOCALITY}}` / `{{CITY}}` / `{{PINCODE}}` | Powai / Mumbai / 400076 |
| `landmark` | `{{LANDMARK}}` | “Near Powai Lake” |
| `directions` | `{{DIRECTIONS}}` | “5 min from Powai Lake…” |
| `areasServed` (array) | `{{AREAS_SERVED}}` | neighbourhoods |
| `siteUrl` | `{{SITE_URL}}` | `https://<slug>.demo.in` |
| `hours` (array) | `{{HOURS}}` | Mon–Sat 09:30–19:30 |
| `brandColors.primary` / `brandColors.accent` | `{{BRAND_PRIMARY}}` / `{{BRAND_ACCENT}}` | hex codes |
| `heroHeading` / `heroSubhead` | hero copy | locality + niche headline |
| `latitude` / `longitude` | JSON-LD geo | map pin |

## Step 2 — Treatments & prices — ~3 minutes

For each treatment in `treatments[]`:

- `name` — the treatment the prospect actually offers.
- `from` / `to` — realistic Mumbai price band (verify: two quick searches, or the
  prospect's rate card; keep bands close to the template's).
- `description` — one or two short sentences, concrete.
- `iconPath` — one of: checkup, sparkle, braces, implant, extraction, filling, crown,
  gum, laser, skin, hair, peel, joint, back, knee, session, home.
- `levels[]` — the severity / complexity / package options the estimator offers, each with
  `label`, `from`, `to`, `note` (time, visits, what's included).

Edit the `nicheType`-specific FAQs (`faqs`, `costFaqs`), reviews (`reviews` — keep them
clearly labelled sample reviews until the prospect supplies real ones), and
`trustPoints[]` (4–5 short trust lines).

## Step 3 — Build & verify — ~1 minute

```bash
node demo/build.mjs config/<slug>.json
node demo/verify.mjs sites/<slug> --config config/<slug>.json --report reports/verification-<slug>.md
```

Expect: `146/146 checks passed`, 9 files, 0 external requests, JSON-LD valid.

## Step 4 — Deploy — ~1 minute

Drag `demo/sites/<slug>/` onto any static host (Netlify, Cloudflare Pages, Vercel). No
build step, no framework. Point the prospect's domain at it.

---

## What NOT to touch

- **CSS, estimator JS, schema logic, page structure** — proven and reusable across
  prospects. Personalisation lives only in the config.
- **Never remove `noindex`** until the live, paid site is approved by the prospect.
- **Never add external scripts, fonts, images, or analytics** — the zero-external-request
  promise is the sales differentiator.
- **Never use one generic WhatsApp link** — every section's link carries a different
  pre-filled opener; the estimator injects the selected range automatically.
- **Never promise rankings or AI citations** in copy — only strong technical foundations.

## Final 10-second sanity check before sending

- [ ] `index.html` opens, shows the clinic name, locality, prices.
- [ ] `cost.html` estimator: pick treatment → pick option → range appears → WhatsApp
      button carries that range.
- [ ] Phone number in the sticky bar matches the prospect's.
- [ ] Verify script reports all checks passed.
