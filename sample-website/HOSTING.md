# Hosting the sample site

The dental sample (`sites/powai-smile/`) is a fully static site — no build step, no
server, no external requests. It can be hosted on any static host. This repo is
configured for **Vercel** (`vercel.json` at this root, `outputDirectory: sites/powai-smile`).

## Option A — Vercel connector (fastest, no CLI needed)

1. In this chat, connect the **Vercel** app when prompted.
2. I'll deploy `sites/powai-smile` through the connector and give you the live URL.

## Option B — Vercel CLI (local machine)

```bash
cd demo/
vercel deploy
```

First run asks you to: create/select a Vercel account, pick the project root
(`demo/`), keep the framework preset as "Other" (or Static Site), and confirm
`outputDirectory: sites/powai-smile`. The deployment is then live at
`https://<project>.vercel.app`.

## Option C — GitHub Pages

Push the `demo/` folder to a GitHub repo, then enable GitHub Pages with
"GitHub Actions" or "Deploy from a branch" — point it at `demo/` and it will
serve `sites/powai-smile` at the repo root. Note: GitHub Pages needs the site
copied to the repo root or a `docs/` folder (or use an Actions workflow with
`outputDirectory`).

## Custom domain

Once deployed, add the clinic's domain in Vercel → Project → Settings → Domains.
Update `siteUrl` in `config/powai-smile.json` to the real domain and rebuild —
canonicals, og:image and JSON-LD will point there automatically.

## What gets deployed

- 9 files: index, treatments, cost, about, contact, 404, sitemap.xml, robots.txt, llms.txt
- 20 WebP images in `images/` (~400 KB total, page total ~705 KB)
- Zero external requests — self-contained.

## Before showing a real clinic

- Replace `photos` in `config/powai-smile.json` with the clinic's real photos
  (drop them into `sites/powai-smile/images/` and reference them).
- Update identity fields: clinicName, doctorName, address, phone, email, hours.
- Remove the SAMPLE BUILD ribbon wording or keep it? For a real client demo,
  replace the disclaimer copy in `build.mjs` with the clinic's own disclosure.
