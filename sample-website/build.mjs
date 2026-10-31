/* ------------------------------------------------------------------ */
/* Single-config site generator — reference-aligned (toothmastersdental.com design language) */
/* Usage: node build.mjs config/<slug>.json [--out sites/<slug>]       */
/* ------------------------------------------------------------------ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const cfgArg = args.find(a => !a.startsWith('--'));
const CONFIG_PATH = path.resolve(ROOT, cfgArg || 'config/powai-smile.json');
const outIdx = args.indexOf('--out');
const rawConfig = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const config = rawConfig;

/* ------------------------------------------------------------------ */
/* Niche registry — the nicheType switch                               */
/* ------------------------------------------------------------------ */
const NICHES = {
  dental: {
    key: 'dental',
    schemaType: 'Dentist',
    medicalSpecialty: 'Dentistry',
    nicheShort: 'Dental clinic',
    catalogue: { page: 'treatments.html', nav: 'Treatments', heading: 'Treatments we offer',
      lead: 'Every treatment with a transparent Mumbai price range — you see the cost before you book.' },
    costHeading: 'Dental treatment costs',
    costLead: 'See the typical price for every treatment, then get a quote on WhatsApp in one tap.',
    estimatorStep2: '2. Choose the tooth type / complexity',
    costIntro: 'Prices are typical Mumbai ranges. Your exact cost depends on the tooth and the materials — we confirm a written estimate before any treatment starts.',
    pricesNoteTitle: 'How our prices work',
    pricesNotes: [
      'The range covers the common cases for that treatment.',
      'Written estimate before treatment — no hidden charges.',
      'X-rays and scans are quoted separately if needed.',
      '0% EMI available on treatments above ₹10,000.'
    ],
    exampleTxt: 'Example: root canal treatment — front tooth ₹6,000–₹8,000 · molar ₹9,000–₹15,000.',
    doctorPitch: 'Dr. {{DOCTOR}} has over 12 years of experience treating families in {{LOCALITY}} — from routine cleanings to full smile makeovers. The clinic follows simple rules: explain everything first, show the price before treatment, and keep visits short.',
    firstVisit: [
      'Check-up and digital X-ray if needed (₹500–₹1,000).',
      'You get a written plan with line-by-line prices.',
      'Treatment starts only after you approve the estimate.',
      'One follow-up visit is included in the treatment price.'
    ],
    bookSteps: [
      'See the price range for your treatment on the Cost page.',
      'Tap the WhatsApp button — the message is pre-filled with your range.',
      'Confirm your slot by phone or WhatsApp within minutes.'
    ],
    estimatorNote: 'No hidden sterilisation charges or surprise add-ons. Digital X-rays and diagnosis included with treatment.',
    rating: '5.0',
    ratingNote: 'sample rating — reviews shown are demo samples',
    panelHeading: 'Specialists across every domain',
    panelLead: 'Rather than general dentists for complex work, the clinic works on a super-specialist model — postgraduate MDS surgeons per discipline.',
    tourNote: 'Designed with soothing mogra and sand tones, high-standard sterilisation, and European ergonomic operatories.',
    panel: [
      { icon: 'implant', title: 'Implantology & Surgery', desc: 'Senior implantologist — computer-guided titanium implants, bone preservation, painless wisdom tooth surgery.' },
      { icon: 'crown', title: 'Prosthodontics & Veneers', desc: 'Senior prosthodontist — monolithic zirconia crowns, ceramic caps, handcrafted porcelain veneers.' },
      { icon: 'braces', title: 'Digital Orthodontics', desc: 'Senior orthodontist — clear aligners, ceramic brackets, digital bite correction.' },
      { icon: 'extraction', title: 'Emergency & Child Care', desc: 'Urgent care specialist — same-day relief for toothache and abscess, gentle paediatric dentistry.' }
    ],
    tour: [
      { title: 'Boutique patient lounge', caption: 'Calm reception with plush seating and warm ambient lighting.' },
      { title: 'Advanced operatory suite', caption: 'European ergonomic chair, micro-rotary endodontics, digital sensors.' },
      { title: 'Consultation suite', caption: 'Warm backlit design for comfortable, anxiety-free diagnosis.' },
      { title: "Doctor's desk", caption: 'Personalised 1-on-1 smile design review and digital treatment planning.' },
      { title: 'Reception & coordination', caption: 'Smooth check-in, transparent scheduling and care support.' }
    ],
    extrasCaptions: [
      { title: 'Sterilisation & digital imaging', caption: 'Hospital-grade sterilisation and low-radiation digital X-ray.' },
      { title: 'Gentle oral surgery', caption: 'Minimally traumatic extractions with modern surgical guidelines.' }
    ],
    heroTitle1: 'Gentle, Pain-Free',
    heroTitle2: 'Dentistry with a',
    heroItalic: "Master's Touch.",
    heroPills: ['Single-sitting RCT', 'Titanium implants', 'Zirconia crowns', 'Clear aligners'],
    stats: [
      ['MDS', 'Super-specialist model'],
      ['1-Sitting', 'Painless root canals'],
      ['5.0★', 'Sample Google rating']
    ],
    doctorRole: 'Founder & Clinical Director',
    doctorBadge: 'BDS, MDS',
    doctorSpecialtyLine: 'Certified smile designer — veneers & cosmetic dentistry',
    doctorChecklist: [
      { lead: 'Painless micro-endodontics:', text: 'Advanced rotary files and slow-infusion anaesthesia keep every root canal painless.' },
      { lead: 'Hospital-grade sterility:', text: '7-step sterilisation with sealed UV pouches — you see it, we show it.' },
      { lead: 'Written estimates:', text: 'Line-by-line prices before treatment. No hidden add-ons, ever.' }
    ],
    doctorBio: [
      '{{DOCTOR}} completed BDS and MDS (Conservative Dentistry & Endodontics) — the super-specialist pathway that trains surgeons in one discipline at a time. Training at a government dental college meant mastering microscopic root canal therapy, biomimetic restorations and apical microsurgery before entering practice.',
      'The clinic operates on a super-specialist model: implants are placed by a senior implantologist, veneers and crowns by a prosthodontist, and aligners by an orthodontist — each with postgraduate MDS training in their own discipline.',
      'The approach is simple: explain everything first, show the price before treatment, and keep visits short. Clinical excellence and patient comfort are expected to co-exist — not trade offs.'
    ],
    doctorQuote: 'We believe clinical excellence and patient comfort must co-exist. Every treatment is gentle, precise, and permanent.',
    galleryFeatures: [
      { icon: 'shield', title: 'High standard of sterilisation', text: 'Multi-stage medical autoclaving, sealed UV storage pouches and strict hospital-grade infection-control protocols.' },
      { icon: 'xray', title: 'Low-radiation digital imaging', text: 'Instant digital sensors and CBCT with sharp computerised diagnostics and minimal exposure.' },
      { icon: 'music', title: 'Anxiety-free tranquility', text: 'Calming palette, slow-infusion anaesthesia and calming music designed to eliminate dental anxiety.' }
    ]
  },
  dermatology: {
    key: 'dermatology',
    schemaType: 'MedicalClinic',
    medicalSpecialty: 'Dermatology',
    nicheShort: 'Skin & hair clinic',
    catalogue: { page: 'treatments.html', nav: 'Treatments', heading: 'Skin & hair treatments we offer',
      lead: 'Every treatment with a per-session price range — you see the cost before you book.' },
    costHeading: 'Skin & hair treatment costs',
    costLead: 'Session and package prices for every treatment, plus an interactive estimator. Get a quote on WhatsApp in one tap.',
    estimatorStep2: '2. Choose the strength / number of sessions',
    costIntro: 'Prices are typical Mumbai ranges. Skin responds differently for everyone — your exact plan is confirmed at the consultation, never before.',
    pricesNoteTitle: 'How our prices work',
    pricesNotes: [
      'Per-session pricing — you pay for sessions you actually use.',
      'Patch test included before every peel or laser session.',
      'Course packages save about 20% and are valid 3–6 months.',
      'Blood tests are done before hair loss treatment, not guesswork.'
    ],
    exampleTxt: 'Example: chemical peel — superficial ₹1,500–₹3,500 per session · 4-session course ₹9,000–₹15,000.',
    doctorPitch: 'Dr. {{DOCTOR}} is an MD dermatologist with 10+ years of experience in medical and aesthetic dermatology. Injections, laser and peels are performed by the doctor — not by assistants. Every treatment starts with a diagnosis, not a sales pitch.',
    firstVisit: [
      'Skin or hair analysis — 45–60 minutes, ₹800–₹1,200.',
      'You get a written plan: sessions, products and total cost.',
      'Patch test is done before your first peel or laser session.',
      'Written after-care instructions with every treatment.'
    ],
    bookSteps: [
      'See the per-session price range on the Cost page.',
      'Tap the WhatsApp button — the message is pre-filled with your range.',
      'Book your first session or ask a question within minutes.'
    ],
    estimatorNote: 'Patch test included before every peel or laser session. No hidden session charges — you pay only for sessions you use.',
    rating: '5.0',
    ratingNote: 'sample rating — reviews shown are demo samples',
    panelHeading: 'Specialists across every domain',
    panelLead: 'Medical and aesthetic care from specialists in each domain — never a one-size-fits-all plan.',
    tourNote: 'Private, calm suites with warm ambient lighting for anxiety-free visits.',
    panel: [
      { icon: 'skin', title: 'Medical Dermatology', desc: 'MD dermatologists — acne, eczema, psoriasis, pigmentation, patch tests.' },
      { icon: 'laser', title: 'Aesthetics & Laser', desc: 'Aesthetic medicine specialists — peels, laser hair removal, warts and moles.' },
      { icon: 'hair', title: 'Hair & Trichology', desc: 'Trichology-certified care — blood-tested hair loss plans, PRP, medication.' },
      { icon: 'face', title: 'Paediatric & Allergy Skin', desc: 'Gentle paediatric skin care — eczema, warts, birthmarks, allergy patch tests.' }
    ],
    tour: [
      { title: 'Boutique reception lounge', caption: 'Calm, private wait with warm ambient lighting.' },
      { title: 'Laser & peel suite', caption: 'Doctor-operated laser and peel room for Indian skin tones.' },
      { title: 'Skin analysis suite', caption: 'Magnified skin analysis and written treatment plans.' },
      { title: 'Hair & scalp treatment room', caption: 'Private chair-side hair treatment and PRP sessions.' },
      { title: 'Reception & coordination', caption: 'Smooth check-in, transparent scheduling and care support.' }
    ],
    heroTitle1: 'Clear, Glowing Skin',
    heroTitle2: 'with a',
    heroItalic: "Doctor's Eye.",
    heroPills: ['Acne & scars', 'Laser hair removal', 'Pigmentation peels', 'Hair fall PRP'],
    stats: [
      ['MD', 'Dermatologist-led care'],
      ['1:1', 'Doctor performs every session'],
      ['5.0★', 'Sample Google rating']
    ],
    doctorRole: 'Founder & Clinical Director',
    doctorBadge: 'MD Dermatology',
    doctorSpecialtyLine: 'Fellowship in aesthetic medicine',
    doctorChecklist: [
      { lead: 'MD dermatologists:', text: 'Injections, laser and peels are performed by the doctor — never delegated to assistants.' },
      { lead: 'Diagnosis first:', text: 'Every plan starts with skin or hair analysis — never a sales pitch.' },
      { lead: 'Patch test included:', text: 'A patch test is done before every peel or laser session, at no extra cost.' }
    ],
    doctorBio: [
      '{{DOCTOR}} is an MD dermatologist with 10+ years in medical and aesthetic dermatology, including a fellowship in aesthetic medicine. Every treatment at the clinic is performed by the doctor — injections, laser and peels are never delegated to assistants.',
      'The clinic works on a diagnosis-first model: every plan starts with skin or hair analysis, blood tests before hair loss treatment, and a patch test before every peel or laser session. The written plan lists sessions, products and total cost.',
      'The approach is simple: explain everything first, show the cost before treatment, and let patients decide. Clinical excellence and patient comfort co-exist — they are not trade offs.'
    ],
    doctorQuote: 'We believe dermatology is diagnostics first, aesthetics second. Every plan is written down — sessions, products, total cost — before anything starts.',
    galleryFeatures: [
      { icon: 'shield', title: 'Medical-grade hygiene', text: 'Single-use disposables and autoclaved instruments for every session.' },
      { icon: 'laser', title: 'FDA-approved laser platforms', text: 'Q-switched and diode lasers chosen for Indian skin tones — safe, effective, doctor-operated.' },
      { icon: 'music', title: 'Private, calm suites', text: 'Private treatment rooms with warm ambient lighting for anxiety-free visits.' }
    ]
  },
  physio: {
    key: 'physio',
    schemaType: 'Physiotherapist',
    medicalSpecialty: 'Physiotherapy',
    nicheShort: 'Physiotherapy centre',
    catalogue: { page: 'treatments.html', nav: 'Treatments', heading: 'Physiotherapy treatments we offer',
      lead: 'Every treatment with a session and package price — you see the cost before you book.' },
    costHeading: 'Physiotherapy costs',
    costLead: 'Session and package prices for every condition, plus an interactive estimator. Get a quote on WhatsApp in one tap.',
    estimatorStep2: '2. Choose the session type / package',
    costIntro: 'Prices are typical Mumbai ranges. Sessions are 45–60 minutes. Packages save 12–18% versus single sessions — or pay per session, no pressure.',
    pricesNoteTitle: 'How our prices work',
    pricesNotes: [
      'Pay per session, or take a package and save 12–18%.',
      'First assessment (₹1,200–₹1,500) is required before any package.',
      'Home visits: travel included within 5 km of {{LOCALITY}}.',
      'Cash receipts provided for insurance reimbursement.'
    ],
    exampleTxt: 'Example: back pain — single session ₹800–₹1,200 · 10-session package ₹7,000–₹10,000.',
    doctorPitch: 'Dr. {{DOCTOR}} is a certified sports physiotherapist with 10+ years of experience in musculoskeletal rehab. Every session is one-to-one with the same physiotherapist — no rotating assistants, no rushed 15-minute slots.',
    firstVisit: [
      'First assessment — movement tests and posture check (45 min, ₹1,200–₹1,500).',
      'You get a written rehab plan with week-by-week targets.',
      'Treatment starts in the same session, at your pain limit.',
      'Home exercises are written down — the plan works at home too.'
    ],
    bookSteps: [
      'See the session and package prices on the Cost page.',
      'Tap the WhatsApp button — the message is pre-filled with your range.',
      'Confirm your first assessment slot by phone or WhatsApp.'
    ],
    estimatorNote: 'First assessment required before any package. No travel charges within 5 km — free cancellation up to 2 hours.',
    rating: '5.0',
    ratingNote: 'sample rating — reviews shown are demo samples',
    panelHeading: 'Specialists across every domain',
    panelLead: 'One-to-one care from certified specialists in each domain — the same physiotherapist every visit.',
    tourNote: 'Bright, private therapy spaces with modern equipment, plus home-visit kits.',
    panel: [
      { icon: 'knee', title: 'Sports & Musculoskeletal', desc: 'Certified sports physios — sprains, ACL rehab, return-to-sport programs.' },
      { icon: 'back', title: 'Spine & Posture', desc: 'Spine specialists — back pain, neck pain, disc bulge, ergonomics.' },
      { icon: 'session', title: 'Post-Surgery Rehab', desc: 'Rehab specialists — knee and shoulder rehab with week-by-week targets.' },
      { icon: 'home', title: 'Home & Neuro Care', desc: 'Home-visit physios 7 days a week — neuro and post-stroke care.' }
    ],
    tour: [
      { title: 'Calm reception', caption: 'Private wait area with comfortable seating.' },
      { title: 'Therapy hall', caption: 'One-to-one treatment bays with modern equipment.' },
      { title: 'Assessment area', caption: 'Movement tests, posture checks and written rehab plans.' },
      { title: 'Treatment rooms', caption: 'Private rooms for manual therapy and exercise rehab.' },
      { title: 'Reception & coordination', caption: 'Smooth check-in, transparent scheduling and care support.' }
    ],
    heroTitle1: 'Move Better,',
    heroTitle2: 'Live Better with',
    heroItalic: 'Specialist Care.',
    heroPills: ['Back & spine care', 'Sports rehab', 'Post-surgery rehab', 'Home visits'],
    stats: [
      ['MPT', 'Sports-certified physios'],
      ['1:1', 'Same therapist every visit'],
      ['5.0★', 'Sample Google rating']
    ],
    doctorRole: 'Founder & Lead Physiotherapist',
    doctorBadge: 'MPT, Sports Cert.',
    doctorSpecialtyLine: 'Certified sports physiotherapist',
    doctorChecklist: [
      { lead: 'One-to-one care:', text: 'The same physiotherapist every session — no rotating assistants, no rushed 15-minute slots.' },
      { lead: 'Sports-certified:', text: 'Certified sports physiotherapy for sprains, ACL rehab and return-to-sport programs.' },
      { lead: 'Home & clinic:', text: 'Therapy at the clinic or at home — seven days a week, within 5 km.' }
    ],
    doctorBio: [
      '{{DOCTOR}} is a certified sports physiotherapist with 10+ years of experience in musculoskeletal rehabilitation, holding an MPT in Musculoskeletal Sciences. The clinic was built around one rule: every session is one-to-one with the same physiotherapist — no rotating assistants, no rushed 15-minute slots.',
      'Every patient starts with a first assessment: movement tests, posture checks and a written rehab plan with week-by-week targets. Home exercises are written down so the plan works between visits too.',
      'The approach is simple: explain everything first, show the cost before treatment, and keep sessions unhurried. Clinical excellence and patient comfort co-exist — they are not trade offs.'
    ],
    doctorQuote: 'We believe rehabilitation should be one-to-one, explained and written down. Every plan shows week-by-week targets and the total cost — before anything starts.',
    galleryFeatures: [
      { icon: 'shield', title: 'Modern equipment', text: 'Traction, ultrasound, laser and exercise bays — maintained and calibrated monthly.' },
      { icon: 'session', title: '45–60 minute sessions', text: 'Unhurried one-to-one sessions — 45–60 minutes, never 15.' },
      { icon: 'music', title: 'Private therapy spaces', text: 'Bright, private bays with modern equipment and home-visit kits.' }
    ]
  }
};

const niche = NICHES[config.nicheType];
if (!niche) {
  console.error(`✗ Unknown nicheType "${config.nicheType}" in ${CONFIG_PATH}. Known: ${Object.keys(NICHES).join(', ')}`);
  process.exit(1);
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */
const REQUIRED = ['slug','nicheType','clinicName','clinicShortName','doctorName','doctorCredentials','nicheLabel','schemaType','medicalSpecialty','siteUrl','phoneDisplay','phoneIntl','email','address','locality','city','pincode','landmark','directions','areasServed','brandColors','hours','treatments','faqs','costFaqs','reviews','trustPoints','photos'];
for (const k of REQUIRED) {
  if (config[k] === undefined) {
    console.error(`✗ Config ${path.basename(CONFIG_PATH)} is missing required field "${k}"`);
    process.exit(1);
  }
}
for (const t of config.treatments) {
  if (!t.name || !Number.isFinite(t.from) || !Number.isFinite(t.to)) {
    console.error(`✗ Invalid treatment in config: ${JSON.stringify(t)}`);
    process.exit(1);
  }
}
if (!/^\+?[0-9\s-]+$/.test(config.phoneIntl)) {
  console.error('✗ phoneIntl must contain only digits and a leading +');
  process.exit(1);
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const digits = config.phoneIntl.replace(/\D/g, '');
const priceRange = `₹${config.treatments.reduce((m, t) => Math.min(m, t.from), Infinity).toLocaleString('en-IN')} – ₹${config.treatments.reduce((m, t) => Math.max(m, t.to), -Infinity).toLocaleString('en-IN')}`;

function inr(n) { return '₹' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
function range(t) { return `${inr(t.from)} – ${inr(t.to)}`; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function jsonSafe(obj) { return JSON.stringify(obj).replace(/</g, '\\u003c'); }
function apply(text, vars) { return String(text).replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? String(vars[k]) : m)); }
function cssMin(css) {
  return css.replace(/\s+/g, ' ').trim()
    .replace(/\s*([{}:;])\s*/g, '$1')
    .replace(/\s*,\s*/g, ',');
}
function wa(msg) { return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`; }
function expandDays(days) {
  const names = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  if (days.includes('–')) {
    const [a, b] = days.split('–').map(s => s.trim());
    const out = [];
    for (let i = names.indexOf(a); i <= names.indexOf(b); i++) out.push(names[i]);
    return out;
  }
  return days.split(',').map(s => s.trim());
}

/* ------------------------------------------------------------------ */
/* Photos — local files, zero external requests                        */
/* ------------------------------------------------------------------ */
const photos = config.photos || {};
const img = name => (photos[name] ? `images/${photos[name]}` : '');
const imgT = i => (Array.isArray(photos.treatments) && photos.treatments[i]) ? `images/${photos.treatments[i]}` : '';

/* ------------------------------------------------------------------ */
/* Placeholder variables                                               */
/* ------------------------------------------------------------------ */
const vars = {
  CLINIC: config.clinicName,
  CLINIC_SHORT: config.clinicShortName,
  DOCTOR: config.doctorName,
  DOCTOR_CREDENTIALS: config.doctorCredentials,
  PHONE_DISPLAY: config.phoneDisplay,
  PHONE_INTL: config.phoneIntl,
  EMAIL: config.email,
  ADDRESS: config.address,
  LOCALITY: config.locality,
  CITY: config.city,
  PINCODE: config.pincode,
  LANDMARK: config.landmark,
  DIRECTIONS: config.directions,
  AREAS_SERVED: config.areasServed.join(', '),
  SITE_URL: config.siteUrl,
  get HOURS() { return hoursList(); },
  BRAND_PRIMARY: config.brandColors.primary,
  BRAND_ACCENT: config.brandColors.accent,
  HERO_HEADING: config.heroHeading || `${config.nicheLabel} in ${config.locality} — transparent prices`,
  HERO_SUBHEAD: config.heroSubhead || `Fixed prices and clear plans for every treatment in ${config.locality}, ${config.city}.`
};

/* ------------------------------------------------------------------ */
/* Inline SVG icons                                                    */
/* ------------------------------------------------------------------ */
const svg = inner => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const ICONS = {
  smile: svg('<rect x="4" y="6" width="16" height="12" rx="6"/><path d="M9 11.2c.8 1.1 2 1.8 3 1.8s2.2-.7 3-1.8"/>'),
  sparkle: svg('<path d="M12 3l2.1 5.9L20 11l-5.9 2.1L12 19l-2.1-5.9L4 11l5.9-2.1z"/>'),
  braces: svg('<rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 10h8M8 14h8"/>'),
  implant: svg('<path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11z"/><circle cx="12" cy="10" r="2"/>'),
  extraction: svg('<path d="M12 3.5l9 16H3z"/><path d="M12 10v4M12 16.5v.01"/>'),
  filling: svg('<circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.3l2.4 2.4 4.6-5"/>'),
  crown: svg('<path d="M4 19h16M5 19l2-10 4 5 3-8 3 8 4-5 2 10"/>'),
  gum: svg('<path d="M3 8c4-3 8-3 12 0s8 3 6 0M3 15c4-3 8-3 12 0s8 3 6 0"/>'),
  laser: svg('<path d="M13 3L5 13h5l-1 8 8-10h-5z"/>'),
  skin: svg('<circle cx="12" cy="12" r="8"/><circle cx="9" cy="10" r=".7"/><circle cx="15" cy="10" r=".7"/><path d="M9 14.5c1 1.2 5 1.2 6 0"/>'),
  hair: svg('<path d="M7 4c1.7 3 1.7 7 0 11M12 3c2 3 2 8 0 12M17 4c1.7 3 1.7 7 0 11"/>'),
  peel: svg('<path d="M12 3l8 5-8 5-8-5z"/><path d="M4 15l8 5 8-5"/>'),
  joint: svg('<rect x="3" y="3" width="18" height="18" rx="5" transform="rotate(45 12 12)"/><circle cx="12" cy="12" r="3"/>'),
  back: svg('<path d="M12 3v18M12 8l-5 2M12 8l5 2M12 13l-5 2M12 13l5 2"/>'),
  knee: svg('<rect x="4" y="4" width="16" height="16" rx="7"/><circle cx="12" cy="12" r="4"/>'),
  session: svg('<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>'),
  home: svg('<path d="M4 11L12 4l8 7"/><path d="M6 10v9h12v-9"/>'),
  checkup: svg('<path d="M3 12h4l2-6 4 12 2-6h6"/>'),
  phone: svg('<path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 1-2z"/>'),
  chat: svg('<path d="M4 5h16v10H9l-5 4z"/>'),
  wa: svg('<path d="M12 3a9 9 0 0 0-7.7 13.3L3 21l4.9-1.3A9 9 0 1 0 12 3z"/><circle cx="8.5" cy="12" r=".9"/><circle cx="12" cy="12" r=".9"/><circle cx="15.5" cy="12" r=".9"/>'),
  pin: svg('<path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11z"/><circle cx="12" cy="10" r="2"/>'),
  clock: svg('<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>'),
  calendar: svg('<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/>'),
  shield: svg('<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>'),
  star: svg('<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z"/>'),
  check: svg('<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.6L16 9.5"/>'),
  avatar: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5"/>'),
  book: svg('<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>'),
  face: svg('<circle cx="12" cy="12" r="8.5"/><circle cx="9" cy="10" r=".9"/><circle cx="15" cy="10" r=".9"/><path d="M8.5 14.5c1 1 6 1 7 0"/>'),
  xray: svg('<rect x="4" y="6" width="16" height="14" rx="2"/><circle cx="12" cy="13" r="3.6"/><path d="M9 6l2-3h2l2 3"/>'),
  music: svg('<path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>')
};
const icon = key => ICONS[key] || ICONS.check;

/* ------------------------------------------------------------------ */
/* Hours formatting                                                    */
/* ------------------------------------------------------------------ */
function fmtHours(h) {
  if (h.closed) return `${h.days} Closed`;
  const o = h.openLabel || h.open, c = h.closeLabel || h.close;
  let s = `${h.days} ${o}–${c}`;
  if (h.second) {
    const so = h.second.openLabel || h.second.open, sc = h.second.closeLabel || h.second.close;
    s += ` & ${so}–${sc}`;
  }
  return s;
}
const hoursList = () => config.hours.map(fmtHours).join(' · ');

/* ------------------------------------------------------------------ */
/* Shared inline CSS — reference design language                       */
/* ------------------------------------------------------------------ */
const CSS = `
:root{--primary:#3B5E45;--accent:#A9843B;--ink:#2D3748;--muted:#5f6b7a;--line:#E7DECB;--bg:#FAF8F2;--card:#fff;--sand:#EFE8D8;--goldsoft:#F6EEDC;--cream:#FAF6EE;--deep:#2E4B37;--gold:#D8B467;--ok:#3B5E45;--serif:'Playfair Display',Georgia,'Times New Roman',serif;--sans:'Plus Jakarta Sans','Poppins',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans Devanagari',sans-serif}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;font-family:var(--sans);font-size:16px;line-height:1.6;color:var(--ink);background:var(--bg)}
h1,h2,h3,h4{font-family:var(--serif);line-height:1.22;margin:0 0 12px;color:var(--ink);font-weight:700}
h1{font-size:clamp(30px,5.4vw,48px);letter-spacing:-.01em}
h2{font-size:clamp(22px,3.6vw,30px);margin-top:6px}
h3{font-size:18px;line-height:1.3}
h4{font-size:15px}
p{margin:0 0 12px}
em{font-style:italic}
a{color:var(--primary);text-decoration:none}
a:hover{text-decoration:underline}
ul,ol{margin:0 0 12px;padding-left:22px}
li{margin-bottom:8px}
img{max-width:100%;height:auto;display:block}
svg{max-width:100%;height:auto}
.wrap{max-width:1120px;margin:0 auto;padding:0 20px}
:focus-visible{outline:3px solid var(--accent);outline-offset:2px;border-radius:4px}
.skip{position:absolute;left:-9999px;top:0;background:#fff;padding:10px 14px;border-radius:0 0 8px 0;z-index:20}
.skip:focus{left:0}
.ribbon{background:var(--deep);color:#eef3ef;text-align:center;padding:6px 12px;font-size:13px}
.ribbon b{background:var(--accent);color:#fff;padding:2px 10px;border-radius:999px;letter-spacing:.08em;font-size:12px;margin-right:8px}
/* header */
.site-header{background:var(--cream);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20}
.header-strip{background:var(--deep);color:#cdd9d1;font-size:13px}
.header-strip .wrap{display:flex;flex-wrap:wrap;gap:6px 18px;align-items:center;padding-top:6px;padding-bottom:6px}
.header-strip b{color:#eef3ef}
.header-strip .rating-mini{background:var(--accent);color:#fff;border-radius:999px;padding:1px 10px;font-weight:700;font-size:12px}
.header-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;padding:14px 20px}
.brand{display:flex;align-items:center;gap:10px;font-weight:800;font-size:20px;color:var(--deep);margin:0;font-family:var(--serif)}
.brand:hover{text-decoration:none}
.brand-mark{width:34px;height:34px;color:var(--primary);flex:none;background:#fff;border:1px solid var(--line);border-radius:10px;padding:5px}
.site-nav ul{list-style:none;display:flex;flex-wrap:wrap;gap:2px;margin:0;padding:0}
.site-nav a{display:block;padding:9px 12px;border-radius:8px;font-weight:600;color:var(--ink);font-size:15px}
.site-nav a:hover{background:var(--goldsoft);text-decoration:none}
.site-nav a.on{background:var(--goldsoft);color:var(--deep)}
/* hero */
.hero{background:linear-gradient(135deg,var(--cream) 0%,var(--sand) 100%);border-bottom:1px solid var(--line);padding:44px 0 40px}
.hero-grid{display:grid;gap:28px;grid-template-columns:1fr}
@media (min-width:920px){.hero-grid{grid-template-columns:7fr 5fr;align-items:center}}
.eyebrow{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--line);border-radius:999px;padding:5px 14px;color:var(--deep);font-weight:700;font-size:13px;margin-bottom:14px}
.eyebrow .dot{width:8px;height:8px;border-radius:50%;background:var(--accent)}
.hero h1{color:var(--deep);margin-bottom:16px}
.hero h1 em{color:var(--accent);font-weight:600}
.hero .lead-hero{color:var(--muted);font-size:clamp(15px,2vw,18px);max-width:60ch}
.hero .cta{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
.trust-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:20px;max-width:520px}
.stat{background:#fff;border:1px solid var(--line);border-radius:14px;padding:10px 8px;text-align:center;box-shadow:0 1px 3px rgba(46,75,55,.06)}
.stat b{display:block;font-family:var(--serif);font-size:20px;color:var(--deep)}
.stat span{font-size:11px;color:var(--muted);line-height:1.35}
.pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.pill{background:#fff;border:1px solid var(--line);border-radius:999px;padding:5px 14px;font-size:13px;font-weight:700;color:var(--primary)}
.pill:hover{background:var(--goldsoft);text-decoration:none}
/* doctor glass panel */
.glass{background:rgba(255,255,255,.94);border:1px solid #fff;border-radius:22px;padding:18px;box-shadow:0 12px 36px rgba(46,75,55,.10)}
.doc-photo{position:relative;border-radius:16px;overflow:hidden;background:var(--sand)}
.doc-photo img{width:100%;height:clamp(280px,42vw,430px);object-fit:cover;object-position:top center;transition:transform .5s ease}
.doc-photo:hover img{transform:scale(1.03)}
.doc-photo .grad{position:absolute;inset:0;background:linear-gradient(to top,rgba(20,30,24,.82) 0%,rgba(20,30,24,.25) 45%,transparent 70%)}
.doc-photo .doc-badge{position:absolute;top:12px;right:12px;background:rgba(255,255,255,.95);border:1px solid var(--line);border-radius:999px;padding:4px 12px;font-size:11px;font-weight:800;color:var(--deep);letter-spacing:.04em}
.doc-photo .doc-cap{position:absolute;left:16px;right:16px;bottom:14px;color:#fff}
.doc-photo .doc-cap .role{color:var(--gold);font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;display:block;margin-bottom:2px}
.doc-photo .doc-cap b{display:block;font-family:var(--serif);font-size:20px;line-height:1.2}
.doc-photo .doc-cap span{font-size:12px;color:#e8e2d4;display:block;margin-top:2px}
.doc-photo .doc-cap .spec{font-size:11px;color:var(--gold);font-weight:700;display:block;margin-top:3px}
.doc-checklist{margin-top:14px;display:grid;gap:10px}
.doc-checklist li{display:flex;gap:10px;align-items:flex-start;font-size:14px;line-height:1.5;list-style:none}
.doc-checklist svg{width:22px;height:22px;color:var(--primary);flex:none;margin-top:2px}
.doc-checklist b{color:var(--deep)}
/* buttons */
.btn{display:inline-block;padding:13px 22px;border-radius:999px;font-weight:700;font-size:16px;text-align:center;border:2px solid transparent}
.btn:hover{text-decoration:none}
.btn-green{background:var(--primary);color:#fff}
.btn-green:hover{background:var(--deep)}
.btn-primary{background:var(--accent);color:#fff}
.btn-primary:hover{background:#8f6a26}
.btn-soft{background:var(--goldsoft);color:var(--deep);border-color:var(--line)}
.btn-soft:hover{background:#f2e6cc}
.btn-block{display:block;width:100%}
/* sections */
.sec{padding:36px 0}
.sec-sand{background:linear-gradient(180deg,var(--sand) 0%,#f3ead7 100%)}
.sec-white{background:#fff}
.sec-head{max-width:760px;margin:0 auto 26px;text-align:center}
.sec-head .eyebrow-pill{display:inline-block;background:#fff;border:1px solid var(--line);border-radius:999px;padding:4px 14px;color:var(--primary);font-weight:800;font-size:11px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px}
.sec-head h2{color:var(--deep)}
.sec-head p{color:var(--muted)}
.sec-title{display:flex;align-items:center;gap:10px}
.sec-title svg{width:26px;height:26px;color:var(--primary)}
.lead{color:var(--muted);max-width:74ch}
.note{font-size:13px;color:var(--muted)}
/* specialist panel */
.panel-grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}
.panel-card{background:var(--cream);border:1px solid var(--line);border-radius:16px;padding:18px;box-shadow:0 1px 3px rgba(46,75,55,.05)}
.panel-card .ico{width:44px;height:44px;border-radius:12px;background:rgba(59,94,69,.10);color:var(--primary);display:flex;align-items:center;justify-content:center;margin-bottom:12px}
.panel-card .ico svg{width:24px;height:24px}
.panel-card h3{color:var(--deep);margin-bottom:6px}
.panel-card p{font-size:14px;color:var(--muted);line-height:1.55}
/* treatment photo cards */
.tx-grid{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}
.tx-card{background:var(--card);border:1px solid var(--line);border-radius:18px;overflow:hidden;box-shadow:0 2px 8px rgba(46,75,55,.05);transition:transform .25s ease,box-shadow .25s ease;display:flex;flex-direction:column}
.tx-card:hover{transform:translateY(-4px);box-shadow:0 14px 30px rgba(46,75,55,.12)}
.tx-photo{position:relative;aspect-ratio:4/3;background:var(--sand);overflow:hidden}
.tx-photo img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}
.tx-card:hover .tx-photo img{transform:scale(1.05)}
.tx-badge{position:absolute;top:10px;left:10px;background:rgba(255,255,255,.95);border:1px solid var(--line);border-radius:999px;padding:3px 12px;font-size:10px;font-weight:800;color:var(--deep);letter-spacing:.08em;text-transform:uppercase}
.tx-price{position:absolute;left:0;right:0;bottom:0;padding:18px 12px 10px;background:linear-gradient(to top,rgba(20,30,24,.78),transparent);color:#fff;font-weight:800;font-size:15px;text-align:right;padding-right:14px}
.tx-body{padding:16px 16px 18px;display:flex;flex-direction:column;flex:1}
.tx-body h3{color:var(--deep);margin-bottom:6px}
.tx-body p{font-size:14px;color:var(--muted);line-height:1.55;flex:1}
.tx-body .tx-cta{margin-top:12px}
.tx-wa{display:inline-flex;align-items:center;gap:8px;font-weight:700;font-size:14px;color:#075e54}
.tx-wa svg{width:20px;height:20px}
.tx-wa:hover{text-decoration:none}
/* estimator */
.estimate{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:24px;box-shadow:0 4px 16px rgba(46,75,55,.06)}
.est-controls{display:grid;gap:16px;margin-bottom:18px}
@media (min-width:640px){.est-controls{grid-template-columns:1fr 1fr}}
label{font-weight:700;display:block;margin-bottom:6px;font-size:14px}
select{width:100%;padding:12px 14px;border:2px solid var(--line);border-radius:10px;font-size:16px;font-family:inherit;background:#fff;color:var(--ink)}
.est-result{background:#eef3ef;border:1px dashed #b9cfbf;border-radius:14px;padding:18px}
.est-range{font-size:32px;font-weight:800;color:var(--primary);margin:0 0 4px;font-family:var(--serif)}
.est-detail{font-weight:700;margin:0 0 8px}
/* gallery */
.gallery{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}
.gallery figure{margin:0;background:var(--card);border:1px solid var(--line);border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(46,75,55,.05)}
.gallery img{width:100%;aspect-ratio:4/3;object-fit:cover;transition:transform .4s ease}
.gallery figure:hover img{transform:scale(1.04)}
.gallery figcaption{padding:12px 14px 14px}
.gallery figcaption strong{display:block;color:var(--deep);font-size:14px}
.gallery figcaption span{font-size:12px;color:var(--muted);line-height:1.5}
.feature-grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));margin-top:26px}
.feature-card{background:var(--cream);border:1px solid var(--line);border-radius:16px;padding:18px}
.feature-card .ico{width:44px;height:44px;border-radius:12px;background:rgba(169,132,59,.12);color:var(--accent);display:flex;align-items:center;justify-content:center;margin-bottom:12px}
.feature-card .ico svg{width:24px;height:24px}
.feature-card h4{color:var(--deep);margin-bottom:6px}
.feature-card p{font-size:14px;color:var(--muted);line-height:1.55}
/* reviews */
.rating-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;margin:6px 0 22px}
.stars{color:var(--accent);letter-spacing:2px;font-size:18px}
.rating-pill{background:#e7f0ea;color:var(--primary);border-radius:999px;padding:5px 14px;font-weight:800;font-size:14px}
.review-grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}
.review{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px;box-shadow:0 1px 3px rgba(46,75,55,.05)}
.review .q{font-family:var(--serif);font-size:34px;color:var(--gold);line-height:1}
.review p.quote{font-size:14px;line-height:1.6;margin:6px 0 12px}
.review .who{display:flex;align-items:center;gap:10px}
.review .av{width:38px;height:38px;border-radius:50%;background:var(--goldsoft);color:var(--deep);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex:none}
.review .who b{font-size:14px}
.review-label{font-size:10px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}
/* faq */
details{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:0 16px;margin-bottom:10px}
summary{font-weight:700;padding:14px 0;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:10px;font-family:var(--serif);font-size:16px;color:var(--deep)}
summary::-webkit-details-marker{display:none}
summary::after{content:"+";font-size:20px;color:var(--primary)}
details[open] summary::after{content:"–"}
details p{padding:0 0 14px;font-size:14px;color:var(--muted);line-height:1.6}
/* trust */
.trust li{display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;font-size:15px}
.trust svg{width:22px;height:22px;color:var(--primary);flex:none;margin-top:2px}
/* book banner */
.book-banner{position:relative;border-radius:22px;overflow:hidden;margin-bottom:24px;background:var(--deep)}
.book-banner img{width:100%;aspect-ratio:21/8;object-fit:cover}
@media (max-width:767px){.book-banner img{aspect-ratio:21/10}}
.book-banner .ov{position:absolute;inset:0;background:linear-gradient(to right,rgba(20,30,24,.86),rgba(20,30,24,.55) 60%,rgba(20,30,24,.35))}
.book-banner .inner{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;color:#fff;padding:32px clamp(20px,4vw,52px)}
.book-banner h2{color:#fff;max-width:24ch}
.book-banner p{color:#e8e2d4;max-width:56ch;margin-bottom:16px}
.book-banner .cta{margin-top:4px}
/* cards / tables */
.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px}
.grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}
.lvls{list-style:none;padding:0;margin:10px 0 12px;font-size:14px}
.lvls li{padding:7px 0 7px 18px;position:relative;border-top:1px dashed var(--line)}
.lvls li::before{content:"•";position:absolute;left:2px;color:var(--accent);font-weight:700}
.lvls strong{display:block;color:var(--deep)}
.table-wrap{overflow-x:auto;background:var(--card);border:1px solid var(--line);border-radius:16px}
table{width:100%;border-collapse:collapse;font-size:15px;min-width:480px}
th{background:var(--primary);color:#fff;text-align:left;padding:11px 14px;font-size:14px}
td{padding:11px 14px;border-top:1px solid var(--line);vertical-align:top}
tr:nth-child(even) td{background:#f8f4ea}
.info-list{list-style:none;padding:0;margin:0}
.info-list li{display:flex;gap:10px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--line)}
.info-list li:last-child{border-bottom:none}
.info-list svg{width:22px;height:22px;color:var(--primary);flex:none;margin-top:2px}
address{font-style:normal}
/* about */
.about-hero{display:grid;gap:24px;grid-template-columns:1fr}
@media (min-width:860px){.about-hero{grid-template-columns:5fr 7fr}}
.about-photo{position:relative;border-radius:20px;overflow:hidden;background:var(--sand)}
.about-photo img{width:100%;aspect-ratio:4/5;object-fit:cover}
.about-photo .ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(20,30,24,.75),transparent 60%)}
.about-photo .cap{position:absolute;left:20px;bottom:18px;color:#fff}
.about-photo .cap b{font-family:var(--serif);font-size:22px;display:block}
.about-photo .cap span{font-size:13px;color:#e8e2d4}
.quote-block{border-left:4px solid var(--gold);background:var(--cream);border-radius:0 14px 14px 0;padding:18px 20px;font-family:var(--serif);font-size:19px;color:var(--deep);line-height:1.5}
/* footer */
.site-footer{background:var(--deep);color:#d9e3dd;padding:34px 0}
.site-footer a{color:#eef3ef}
.site-footer .disc{border-top:1px solid #4a6b57;margin-top:18px;padding-top:14px;font-size:13px;color:#a8b8ad;max-width:90ch}
.footer-grid{display:grid;gap:18px;grid-template-columns:1fr}
@media (min-width:720px){.footer-grid{grid-template-columns:1fr 1fr}}
.footer-grid .brand{color:#fff}
.footer-grid .brand-mark{background:#34513f;border-color:#4a6b57}
/* action bar (mobile) */
.actionbar{position:fixed;bottom:0;left:0;right:0;display:none;z-index:30;background:#fff;border-top:1px solid var(--line);box-shadow:0 -4px 12px rgba(15,23,42,.08)}
.action-btn{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:10px 4px;font-size:12px;font-weight:700;color:var(--ink)}
.action-btn:first-child{border-right:1px solid var(--line)}
.action-btn svg{width:24px;height:24px}
.action-btn.wa{border-top:3px solid #25d366}
.action-btn.quote{border-top:3px solid var(--accent)}
.action-btn:hover{text-decoration:none;background:var(--goldsoft)}
@media (max-width:767px){.actionbar{display:flex}body{padding-bottom:72px}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;

/* ------------------------------------------------------------------ */
/* Structural pieces                                                   */
/* ------------------------------------------------------------------ */
function header(active) {
  const navItem = (href, label) => `<li><a href="${href}"${active === href ? ' class="on"' : ''}>${label}</a></li>`;
  return `<header class="site-header">
  <div class="header-strip"><div class="wrap">
    <b>${ICONS.pin} ${esc(config.address.split(',')[0])}</b>
    <span>${ICONS.clock} ${esc(hoursList())}</span>
    <span>${ICONS.phone} ${esc(config.phoneDisplay)}</span>
    <span class="rating-mini">★ ${esc(niche.rating)} rated (sample)</span>
  </div></div>
  <div class="wrap header-row">
    <a class="brand" href="/"><span class="brand-mark">${ICONS.smile}</span><span>${esc(config.clinicShortName)}</span></a>
    <nav class="site-nav" aria-label="Main navigation">
      <ul>
        ${navItem('/', 'Home')}
        ${navItem(`/${niche.catalogue.page}`, niche.catalogue.nav)}
        ${navItem('/cost.html', 'Cost')}
        ${navItem('/about.html', 'About')}
        ${navItem('/contact.html', 'Contact')}
      </ul>
    </nav>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <p class="brand"><span class="brand-mark">${ICONS.smile}</span> <strong>${esc(config.clinicShortName)}</strong></p>
        <ul class="info-list">
          <li>${ICONS.pin}<span>${esc(config.address)}</span></li>
          <li>${ICONS.clock}<span>${esc(hoursList())}</span></li>
          <li>${ICONS.phone}<span>${esc(config.phoneDisplay)} · ${esc(config.email)}</span></li>
        </ul>
      </div>
      <div>
        <p class="sec-title">Explore</p>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/${niche.catalogue.page}">${niche.catalogue.nav}</a></li>
          <li><a href="/cost.html">Treatment costs</a></li>
          <li><a href="/about.html">About the doctor</a></li>
          <li><a href="/contact.html">Contact &amp; timings</a></li>
        </ul>
        <p><a href="${wa(`Hi, I saw ${config.clinicShortName} online and would like to book a consultation with ${config.doctorName}. What slots are available?`)}">Chat on WhatsApp</a></p>
      </div>
    </div>
    <p class="disc">Sample site built as a demonstration by Saurabh Bandelkar. Not operated by a real clinic. Prices shown are typical Mumbai ranges for demonstration purposes. All reviews shown are sample reviews — placeholders. Photos are stock images.</p>
  </div>
</footer>`;
}

function actionBar() {
  const bookMsg = `Hi, I saw ${config.clinicShortName} online and would like to book a consultation with ${config.doctorName}. What slots are available?`;
  const quoteMsg = `Hi, I saw the cost estimator on ${config.clinicShortName} and would like a quote for my treatment.`;
  return `<div class="actionbar" role="complementary" aria-label="Quick actions">
  <a class="action-btn" href="tel:${digits}" aria-label="Call ${esc(config.clinicShortName)} now">${ICONS.phone}<span>Call Now</span></a>
  <a class="action-btn wa" href="${wa(bookMsg)}" aria-label="Chat on WhatsApp">${ICONS.wa}<span>WhatsApp</span></a>
  <a class="action-btn quote" href="${wa(quoteMsg)}" aria-label="Get a quote or book an appointment">${ICONS.chat}<span>Get Quote</span></a>
</div>`;
}

function favicon() {
  const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#3B5E45"/><path d="M16 8c-3.2 0-4.6 2.6-6.4 2.6C8 10.6 7 12.4 7 15c0 3.4 2.4 5.4 3.6 6.4.7.6 1.2 1.4 1.4 2.3.2 1 .5 1.8 1 2.3.5.5.8 1.3 1 2.3.2.9.7 1.7 1.4 2.3 1.2 1 3.6-3 3.6-6.4 0-2.6-1-4.4-2.6-4.4-1.8 0-3.2-2.6-6.4-2.6z" fill="#D8B467"/></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(s);
}

function page({ title, description, pathname, body, jsonld = [], extraHead = '', ogImage = '' }) {
  const ld = jsonld.map(j => `<script type="application/ld+json">${jsonSafe(j)}</script>`).join('\n');
  const og = ogImage ? `<meta property="og:image" content="${esc(ogImage)}">` : '';
  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="noindex, nofollow">
<link rel="icon" href="${favicon()}">
<link rel="canonical" href="${config.siteUrl}${pathname}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${config.siteUrl}${pathname}">
<meta property="og:locale" content="en_IN">
${og}
<style>${cssMin(apply(CSS, vars))}</style>${extraHead}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="ribbon" role="status"><b>SAMPLE BUILD</b>Demonstration site — not a real clinic. Prices are typical Mumbai ranges.</div>
${header(pathname)}
<main id="main">
${body}
</main>
${footer()}
${actionBar()}
${ld}
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                    */
/* ------------------------------------------------------------------ */
function localBusinessLd() {
  return {
    '@context': 'https://schema.org',
    '@type': config.schemaType,
    name: config.clinicName,
    description: `${config.clinicName} is a ${config.nicheLabel} in ${config.locality}, ${config.city}. ${config.heroSubhead}`,
    url: config.siteUrl + '/',
    telephone: config.phoneIntl,
    email: config.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.address,
      addressLocality: config.locality,
      addressRegion: 'Maharashtra',
      postalCode: config.pincode,
      addressCountry: 'IN'
    },
    geo: { '@type': 'GeoCoordinates', latitude: config.latitude, longitude: config.longitude },
    openingHoursSpecification: config.hours
      .filter(h => !h.closed)
      .flatMap(h => [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: expandDays(h.days), opens: h.open, closes: h.close },
        ...(h.second ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: expandDays(h.days), opens: h.second.open, closes: h.second.close }] : [])
      ]),
    areaServed: config.areasServed.map(a => ({ '@type': 'AdministrativeArea', name: a })),
    priceRange,
    medicalSpecialty: config.medicalSpecialty,
    isAcceptingNewPatients: true
  };
}

function faqLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

function itemListLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${config.clinicName} — ${niche.catalogue.heading}`,
    itemListElement: config.treatments.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: t.name,
        description: t.description,
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: t.from,
          highPrice: t.to,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock'
        }
      }
    }))
  };
}

function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: config.siteUrl + it.path
    }))
  };
}

/* ------------------------------------------------------------------ */
/* Content builders                                                    */
/* ------------------------------------------------------------------ */
function faqDetails(faqs, max) {
  const list = max ? faqs.slice(0, max) : faqs;
  return list.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n');
}

function reviewsHtml() {
  return config.reviews.map(r => {
    const stars = '★★★★★'.slice(0, r.rating) + '☆☆☆☆☆'.slice(0, 5 - r.rating);
    const initials = r.name.replace(/[^A-Za-z一-龥]/g, '').slice(0, 2).toUpperCase() || '★';
    return `<div class="review">
<p class="review-label">Sample review — placeholder</p>
<p class="q">“</p>
<p class="quote">${esc(r.text)}</p>
<p class="stars" aria-label="${r.rating} out of 5 stars">${stars}</p>
<p class="who"><span class="av">${esc(initials)}</span><b>${esc(r.name)}</b></p>
</div>`;
  }).join('\n');
}

function trustHtml() {
  return `<ul class="trust">${config.trustPoints.map(t => `<li>${ICONS.check}<span>${esc(t)}</span></li>`).join('')}</ul>`;
}

function ratingRow() {
  return `<div class="rating-row"><span class="stars" aria-label="5 out of 5 stars">★★★★★</span><span class="rating-pill">${esc(niche.rating)} rated</span><span class="note">${esc(niche.ratingNote)}</span></div>`;
}

function waQuoteLink(t, lv) {
  const msg = `I saw the ${t.name} treatment on your website. What is the exact cost for my case${lv ? ' (' + lv.label + ')' : ''}, and when can I start?`;
  return `<a class="tx-wa" href="${wa(msg)}">${ICONS.wa}<span>Get a quote on WhatsApp</span></a>`;
}

function txCard(t, i, { detailed = false } = {}) {
  const levels = (t.levels && t.levels.length) ? t.levels : [{ label: 'Standard', from: t.from, to: t.to }];
  const photo = imgT(i);
  const badge = t.badge || levels[0].label;
  const inner = `<div class="tx-photo">${photo ? `<img src="${photo}" alt="${esc(t.name)} — representative photo" loading="lazy">` : ''}<span class="tx-badge">${esc(badge)}</span><div class="tx-price">${esc(range(t))}</div></div>
<div class="tx-body"><h3>${esc(t.name)}</h3><p>${esc(t.description)}</p>${waQuoteLink(t)}${detailed ? `<ul class="lvls">${levels.map(l => `<li><strong>${esc(l.label)}</strong> ${esc(range({ from: l.from, to: l.to }))}${l.note ? ` <span class="note">— ${esc(l.note)}</span>` : ''}</li>`).join('')}</ul>` : ''}</div>`;
  return `<article class="tx-card">${inner}</article>`;
}

function priceTable() {
  const rows = [];
  for (const t of config.treatments) {
    const levels = (t.levels && t.levels.length) ? t.levels : [{ label: 'Standard', from: t.from, to: t.to }];
    levels.forEach((l, i) => {
      const nameCell = i === 0
        ? `<td rowspan="${levels.length}"><strong>${esc(t.name)}</strong><br><span class="note">${esc(l.label)}</span></td>`
        : `<td><span class="note">${esc(l.label)}</span></td>`;
      rows.push(`<tr>${nameCell}<td>${esc(inr(l.from))} – ${esc(inr(l.to))}</td><td>${esc(l.note || '')}</td></tr>`);
    });
  }
  return `<table>
<thead><tr><th scope="col">Treatment &amp; option</th><th scope="col">Typical range</th><th scope="col">Notes</th></tr></thead>
<tbody>${rows.join('\n')}</tbody>
</table>`;
}

/* ------------------------------------------------------------------ */
/* Estimator (shared by home + cost)                                   */
/* ------------------------------------------------------------------ */
function estimator() {
  const options = config.treatments.map(t => `<option value="${esc(t.name)}">${esc(t.name)} — ${esc(range(t))}</option>`).join('\n');
  return `<div class="estimate">
  <h2 class="sec-title">${ICONS.chat} Interactive ${esc(config.nicheLabel)} cost estimator</h2>
  <p class="note">${esc(niche.estimatorNote)}</p>
  <div class="est-controls">
    <div>
      <label for="treatmentSel">1. Choose treatment / problem</label>
      <select id="treatmentSel">
${options}
      </select>
    </div>
    <div>
      <label for="levelSel">${esc(niche.estimatorStep2)}</label>
      <select id="levelSel" aria-describedby="levelHint"></select>
    </div>
  </div>
  <p class="note" id="levelHint">Pick a treatment to load the options.</p>
  <div class="est-result">
    <p class="est-range" id="rangeOut">—</p>
    <p class="est-detail" id="estDetail">Choose a treatment to see the typical price range.</p>
    <p class="note">Typical Mumbai range. The exact cost depends on your case — confirm with the clinic.</p>
    <p>
      <a class="btn btn-primary" id="estimateWa" href="#">Send this range on WhatsApp</a>
      <a class="btn btn-soft" href="tel:${digits}">Call ${esc(config.phoneDisplay)}</a>
    </p>
  </div>
  <noscript><p class="note">The estimator needs JavaScript. Call ${esc(config.phoneDisplay)} or message us on WhatsApp for a quote.</p></noscript>
</div>
<script type="application/json" id="costData">${jsonSafe({
    clinic: config.clinicName,
    clinicShort: config.clinicShortName,
    doctor: config.doctorName,
    phone: digits,
    treatments: config.treatments
  })}</script>
<script>
(function(){
  var data = JSON.parse(document.getElementById('costData').textContent);
  var tSel = document.getElementById('treatmentSel');
  var lSel = document.getElementById('levelSel');
  var rangeOut = document.getElementById('rangeOut');
  var estDetail = document.getElementById('estDetail');
  var waLink = document.getElementById('estimateWa');
  var hint = document.getElementById('levelHint');
  function levelsOf(t){ return (t.levels && t.levels.length) ? t.levels : [{ label: 'Standard', from: t.from, to: t.to }]; }
  function money(n){ return '₹' + n.toLocaleString('en-IN'); }
  function fill(){
    var tr = data.treatments.filter(function(x){ return x.name === tSel.value; })[0];
    var lvs = levelsOf(tr);
    lSel.innerHTML = '';
    lvs.forEach(function(lv){
      var o = document.createElement('option');
      o.value = lv.label;
      o.textContent = lv.label + ' — ' + money(lv.from) + '–' + money(lv.to);
      lSel.appendChild(o);
    });
    hint.textContent = 'Showing ' + lvs.length + ' option(s) for ' + tr.name + '.';
    render();
  }
  function render(){
    var tr = data.treatments.filter(function(x){ return x.name === tSel.value; })[0];
    var lvs = levelsOf(tr);
    var lv = lvs.filter(function(x){ return x.label === lSel.value; })[0] || lvs[0];
    rangeOut.textContent = money(lv.from) + ' – ' + money(lv.to);
    estDetail.textContent = tr.name + ' — ' + lv.label + (lv.note ? ' (' + lv.note + ')' : '');
    var msg = 'Hi, I saw the cost estimator on ' + data.clinic + '. I am interested in ' + tr.name + ' (' + lv.label + ', shown ' + money(lv.from) + '–' + money(lv.to) + '). Could you share the exact quote and the earliest appointment?';
    waLink.href = 'https://wa.me/' + data.phone + '?text=' + encodeURIComponent(msg);
  }
  tSel.addEventListener('change', fill);
  lSel.addEventListener('change', render);
  fill();
})();
</script>`;
}

/* ------------------------------------------------------------------ */
/* Page bodies                                                         */
/* ------------------------------------------------------------------ */
function heroBlock() {
  const stats = niche.stats.map(([big, small]) => `<div class="stat"><b>${esc(big)}</b><span>${esc(small)}</span></div>`).join('');
  const pills = niche.heroPills.map(p => `<a class="pill" href="/${niche.catalogue.page}">${esc(p)}</a>`).join('');
  const checks = niche.doctorChecklist.map(c => `<li>${ICONS.check}<span><b>${esc(c.lead)}</b> ${esc(c.text)}</span></li>`).join('');
  return `<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow"><span class="dot"></span>${esc(config.nicheLabel)} · ${esc(config.locality)}, ${esc(config.city)}</p>
      <h1>${esc(niche.heroTitle1)}<br>${esc(niche.heroTitle2)} <em>${esc(niche.heroItalic)}</em></h1>
      <p class="lead-hero">${esc(vars.HERO_SUBHEAD)}</p>
      <div class="cta">
        <a class="btn btn-green" href="${wa(`Hi, I saw ${config.clinicShortName} online and would like to book a consultation with ${config.doctorName}. What slots are available?`)}">Book on WhatsApp</a>
        <a class="btn btn-primary" href="/cost.html">See treatment costs</a>
      </div>
      <div class="trust-stats">${stats}</div>
      <div class="pills">${pills}</div>
    </div>
    <div class="glass">
      <div class="doc-photo">
        ${img('doctor') ? `<img src="${img('doctor')}" alt="${esc(config.doctorName)} — ${esc(config.doctorCredentials)}" width="480" height="560" fetchpriority="high">` : ''}
        <div class="grad"></div>
        <span class="doc-badge">${esc(niche.doctorBadge)}</span>
        <div class="doc-cap">
          <span class="role">${esc(niche.doctorRole)}</span>
          <b>${esc(config.doctorName)}</b>
          <span>${esc(config.doctorCredentials)}</span>
          <span class="spec">${esc(niche.doctorSpecialtyLine)}</span>
        </div>
      </div>
      <ul class="doc-checklist">${checks}</ul>
    </div>
  </div>
</section>`;
}

function galleryBlock() {
  const tourPhotos = Array.isArray(photos.tour) ? photos.tour : [];
  const figs = tourPhotos.map((p, i) => {
    const t = niche.tour[i];
    return `<figure><img src="images/${p}" alt="${esc(t ? t.title : 'Clinic interior')} — ${esc(config.clinicShortName)}" loading="lazy"><figcaption><strong>${esc(t ? t.title : 'Clinic interior')}</strong><span>${esc(t ? t.caption : '')}</span></figcaption></figure>`;
  }).join('\n');
  const features = niche.galleryFeatures.map(f => `<div class="feature-card"><span class="ico">${icon(f.icon)}</span><h4>${esc(f.title)}</h4><p>${esc(f.text)}</p></div>`).join('');
  return `<section class="sec sec-sand">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow-pill">Visual Tour &amp; Ambience</span>
      <h2>Step inside ${esc(config.clinicShortName)}</h2>
      <p>${esc(niche.tourNote)}</p>
    </div>
    <div class="gallery">${figs}</div>
    <div class="feature-grid">${features}</div>
  </div>
</section>`;
}

function homeBody() {
  const top = config.treatments.slice(0, 4).map((t, i) => txCard(t, i)).join('\n');
  return heroBlock()
    + `<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow-pill">${esc(niche.panelHeading)}</span>
      <h2>The finest specialists, all at your service</h2>
      <p>${esc(niche.panelLead)}</p>
    </div>
    <div class="panel-grid">${panelHtml()}</div>
  </div>
</section>`
    + `<section class="sec sec-sand">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow-pill">Focused Clinical Specialties</span>
      <h2>${esc(niche.catalogue.heading)}</h2>
      <p>Every treatment with a transparent price range — you see the cost before you book.</p>
    </div>
    <div class="tx-grid">${top}</div>
    <p style="text-align:center;margin-top:20px"><a class="btn btn-soft" href="/${niche.catalogue.page}">See all treatments &amp; prices</a></p>
  </div>
</section>`
    + `<section class="sec sec-white">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow-pill">${esc(config.nicheLabel)} costs</span>
      <h2>Interactive cost estimator</h2>
      <p>Pick a treatment and an option — see the typical range, then send it to us on WhatsApp in one tap.</p>
    </div>
    ${estimator()}
  </div>
</section>`
    + galleryBlock()
    + `<section class="sec sec-white">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow-pill">Patient reviews</span>
      <h2>What patients say</h2>
    </div>
    ${ratingRow()}
    <div class="review-grid">${reviewsHtml()}</div>
  </div>
</section>`
    + `<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow-pill">Questions patients ask</span>
      <h2>Frequently asked</h2>
    </div>
    <div style="max-width:760px;margin:0 auto">${faqDetails(config.faqs, 4)}</div>
    <p style="text-align:center;margin-top:14px"><a class="btn btn-soft" href="/contact.html">Ask us directly →</a></p>
  </div>
</section>`
    + bookBanner();
}

function panelHtml() {
  return `<div class="panel-grid">${niche.panel.map(p => `<article class="panel-card"><span class="ico">${icon(p.icon)}</span><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p></article>`).join('')}</div>`;
}

function bookBanner() {
  return `<section class="sec sec-sand">
  <div class="wrap">
    <div class="book-banner">
      ${img('contact') ? `<img src="${img('contact')}" alt="${esc(config.clinicShortName)} — clinic" loading="lazy">` : ''}
      <div class="ov"></div>
      <div class="inner">
        <h2>Book your first visit</h2>
        <p>${esc(config.clinicShortName)} — ${esc(config.nicheLabel)} in ${esc(config.locality)}, ${esc(config.city)}. Areas served: ${esc(config.areasServed.join(', '))}.</p>
        <div class="cta">
          <a class="btn btn-green" href="${wa(`Hi, I saw ${config.clinicShortName} online and would like to book a consultation with ${config.doctorName}. What slots are available?`)}">Book on WhatsApp</a>
          <a class="btn btn-primary" href="tel:${digits}">Call ${esc(config.phoneDisplay)}</a>
          <a class="btn btn-soft" href="/contact.html">Address &amp; timings</a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function catalogueBody() {
  const cards = config.treatments.map((t, i) => txCard(t, i, { detailed: true })).join('\n');
  const notes = niche.pricesNotes.map(n => `<li>${esc(apply(n, vars))}</li>`).join('');
  return `<section class="sec">
  <div class="wrap">
    <h1>${esc(niche.catalogue.heading)}</h1>
    <p class="lead">${esc(niche.catalogue.lead)}</p>
    <div class="tx-grid">${cards}</div>
  </div>
</section>
<section class="sec sec-sand">
  <div class="wrap">
    <h2 class="sec-title">${ICONS.shield} ${esc(niche.pricesNoteTitle)}</h2>
    <ul>${notes}</ul>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    <h2 class="sec-title">${ICONS.checkup} Full price list</h2>
    <div class="table-wrap">${priceTable()}</div>
    <p class="note">${esc(niche.costIntro)}</p>
    <p>
      <a class="btn btn-primary" href="/cost.html">Try the cost estimator</a>
      <a class="btn btn-soft" href="/contact.html">Book a visit</a>
    </p>
  </div>
</section>`;
}

function costBody() {
  return `<section class="sec sec-sand">
  <div class="wrap">
    <div class="book-banner" style="margin-bottom:0">
      ${img('clinic') || img('hero') ? `<img src="${img('clinic') || img('hero')}" alt="${esc(config.clinicShortName)} — clinic" loading="lazy">` : ''}
      <div class="ov"></div>
      <div class="inner">
        <h1>${esc(niche.costHeading)}</h1>
        <p>${esc(niche.costLead)}</p>
      </div>
    </div>
  </div>
</section>
<section class="sec">
  ${estimator()}
</section>
<section class="sec sec-sand">
  <div class="wrap">
    <h2 class="sec-title">${ICONS.shield} Full price list</h2>
    <div class="table-wrap">${priceTable()}</div>
    <p class="note">${esc(niche.costIntro)}</p>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    <h2 class="sec-title">${ICONS.checkup} Cost questions</h2>
    ${faqDetails(config.costFaqs)}
    <p>
      <a class="btn btn-soft" href="/contact.html">Ask for a written estimate</a>
      <a class="btn btn-soft" href="/${niche.catalogue.page}">See all treatments</a>
    </p>
  </div>
</section>`;
}

function aboutBody() {
  const creds = config.doctorCredentials.split(',').map(s => s.trim());
  const bio = niche.doctorBio.map(p => `<p>${esc(apply(p, vars))}</p>`).join('\n');
  const tourPhotos = Array.isArray(photos.tour) ? photos.tour : [];
  const extraPhotos = Array.isArray(photos.extras) ? photos.extras : [];
  const figs = [];
  tourPhotos.forEach((p, i) => {
    const t = niche.tour[i];
    figs.push(`<figure><img src="images/${p}" alt="${esc(t ? t.title : 'Clinic interior')} — ${esc(config.clinicShortName)}" loading="lazy"><figcaption><strong>${esc(t ? t.title : 'Clinic interior')}</strong><span>${esc(t ? t.caption : '')}</span></figcaption></figure>`);
  });
  extraPhotos.forEach((p, i) => {
    const t = niche.extrasCaptions && niche.extrasCaptions[i];
    figs.push(`<figure><img src="images/${p}" alt="${esc(t ? t.title : 'Equipment')} — ${esc(config.clinicShortName)}" loading="lazy"><figcaption><strong>${esc(t ? t.title : 'Equipment')}</strong><span>${esc(t ? t.caption : '')}</span></figcaption></figure>`);
  });
  const gallery = figs.join('\n');
  return `<section class="sec">
  <div class="wrap">
    <div class="about-hero">
      <div class="about-photo">
        ${img('doctor') ? `<img src="${img('doctor')}" alt="${esc(config.doctorName)} — ${esc(config.doctorCredentials)}" width="640" height="800" fetchpriority="high">` : ''}
        <div class="ov"></div>
        <div class="cap"><b>${esc(config.doctorName)}</b><span>${esc(config.doctorCredentials)}</span></div>
      </div>
      <div>
        <p class="eyebrow"><span class="dot"></span>About the doctor</p>
        <h1>Meet ${esc(config.doctorName)}</h1>
        <p class="lead">${esc(niche.doctorRole)} at ${esc(config.clinicName)}, a ${esc(config.nicheLabel)} in ${esc(config.locality)}, ${esc(config.city)}.</p>
        ${bio}
        <div class="quote-block">“${esc(niche.doctorQuote)}”</div>
        <p style="margin-top:18px">
          <a class="btn btn-green" href="${wa(`I'd like to book an appointment with ${config.doctorName}. What are the next available slots?`)}">Book with ${esc(config.doctorName)} on WhatsApp</a>
          <a class="btn btn-soft" href="/${niche.catalogue.page}">See treatments</a>
        </p>
      </div>
    </div>
  </div>
</section>
<section class="sec sec-sand">
  <div class="wrap">
    <h2 class="sec-title">${ICONS.checkup} Qualifications</h2>
    <ul>${creds.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
    <p class="note">Verified qualifications are shown on the live booking page — this demo uses placeholder credentials.</p>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow-pill">The clinic</span>
      <h2>Where your treatment happens</h2>
    </div>
    <div class="gallery">${gallery}</div>
  </div>
</section>
<section class="sec sec-sand">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow-pill">Patient reviews</span>
      <h2>What patients say</h2>
      <p class="note">All reviews shown are sample reviews — placeholders for this demo site.</p>
    </div>
    <div class="review-grid">${reviewsHtml()}</div>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    <h2 class="sec-title">${ICONS.book} How to book</h2>
    <ol>${niche.bookSteps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
    <p>
      <a class="btn btn-primary" href="${wa(`I'd like to book an appointment with ${config.doctorName}. What are the next available slots?`)}">Book on WhatsApp</a>
      <a class="btn btn-soft" href="tel:${digits}">Call ${esc(config.phoneDisplay)}</a>
    </p>
  </div>
</section>`;
}

function contactBody() {
  const hoursLi = config.hours.map(h => `<li>${esc(fmtHours(h))}</li>`).join('');
  return `<section class="sec sec-sand">
  <div class="wrap">
    <div class="book-banner" style="margin-bottom:0">
      ${img('contact') ? `<img src="${img('contact')}" alt="${esc(config.clinicShortName)} — clinic" loading="lazy">` : ''}
      <div class="ov"></div>
      <div class="inner">
        <h1>Contact &amp; timings</h1>
        <p>Walk in, call, or message us on WhatsApp. Same-day emergency slots are available where possible — call in the morning.</p>
      </div>
    </div>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    <div class="grid">
      <div class="card">
        <h2 class="sec-title">${ICONS.pin} Visit us</h2>
        <address>${esc(config.address)}</address>
        <p><strong>Landmark:</strong> ${esc(config.landmark)}</p>
        <p>${esc(config.directions)}</p>
      </div>
      <div class="card">
        <h2 class="sec-title">${ICONS.clock} Timings</h2>
        <ul>${hoursLi}</ul>
        <p class="note">First appointment slot: ${esc(config.hours[0].open)}. Last slot: ${esc(config.hours[0].close)}. Closed on public holidays.</p>
      </div>
      <div class="card">
        <h2 class="sec-title">${ICONS.phone} Call or message</h2>
        <ul class="info-list">
          <li>${ICONS.phone}<span><a href="tel:${digits}">${esc(config.phoneDisplay)}</a></span></li>
          <li>${ICONS.chat}<span><a href="${wa(`I have a question about appointments at ${config.clinicShortName}.`)}">WhatsApp chat</a></span></li>
          <li>${ICONS.chat}<span><a href="mailto:${esc(config.email)}">${esc(config.email)}</a></span></li>
        </ul>
        <p><a class="btn btn-primary btn-block" href="${wa(`I'd like to book an appointment with ${config.doctorName}. What are the next available slots?`)}">Book on WhatsApp</a></p>
      </div>
    </div>
  </div>
</section>
<section class="sec sec-sand">
  <div class="wrap">
    <h2 class="sec-title">${ICONS.book} How to book in 3 steps</h2>
    <ol>${niche.bookSteps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    <h2 class="sec-title">${ICONS.checkup} What to expect on your first visit</h2>
    <ol>${niche.firstVisit.map(s => `<li>${esc(apply(s, vars))}</li>`).join('')}</ol>
    <p class="note">${esc(config.directions)}</p>
  </div>
</section>`;
}

function notFoundBody() {
  return `<section class="sec">
  <div class="wrap">
    <h1>Page not found</h1>
    <p>Sorry — that page is not part of this demo site.</p>
    <p>
      <a class="btn btn-primary" href="/">Back to home</a>
      <a class="btn btn-soft" href="/contact.html">Contact us</a>
    </p>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ */
/* Meta (titles & descriptions)                                        */
/* ------------------------------------------------------------------ */
function metaFor() {
  const sh = config.clinicShortName;
  const t = config.treatments;
  const priceOf = frag => {
    const hit = t.find(x => x.name.toLowerCase().includes(frag));
    return hit ? inr(hit.from) : '';
  };
  return {
    index: {
      title: `${sh} — ${config.nicheLabel} in ${config.locality}, ${config.city}`,
      desc: `${config.nicheLabel} in ${config.locality}, Mumbai. Transparent prices: ${t[0].name.split(' ').slice(0, 4).join(' ')} from ${inr(t[0].from)}, ${t[1].name.split(' ').slice(0, 4).join(' ')} from ${inr(t[1].from)}, ${t[2].name.split(' ').slice(0, 4).join(' ')} from ${inr(t[2].from)}. Book online.`
    },
    catalogue: {
      title: `${sh} — ${config.nicheLabel} in ${config.locality}, ${config.city}`,
      desc: `${config.nicheLabel} in ${config.locality} with transparent price ranges — ${t[0].name}, ${t[1].name}, ${t[2].name}. See what each costs before you book.`
    },
    cost: {
      title: `${sh} — ${config.nicheLabel} Costs in ${config.locality}`,
      desc: `${config.nicheLabel} costs in ${config.locality}, Mumbai. Interactive cost estimator + full price list. Get your exact quote on WhatsApp in one tap.`
    },
    about: {
      title: `${sh} — About ${config.doctorName}, ${config.nicheLabel}`,
      desc: `Meet ${config.doctorName}, ${config.doctorCredentials}, at ${sh} in ${config.locality}, Mumbai. Qualifications, experience and what to expect on your first visit.`
    },
    contact: {
      title: `${sh} — Contact &amp; Timings in ${config.locality}`,
      desc: `Contact ${sh} — ${config.nicheLabel} in ${config.locality}, Mumbai. Address, timings, phone and WhatsApp. Book your first appointment today.`
    }
  };
}

/* ------------------------------------------------------------------ */
/* Support files                                                       */
/* ------------------------------------------------------------------ */
function sitemapXml(today) {
  const pages = [
    ['/', '1.0', 'weekly'],
    [`/${niche.catalogue.page}`, '0.9', 'weekly'],
    ['/cost.html', '0.9', 'weekly'],
    ['/about.html', '0.7', 'monthly'],
    ['/contact.html', '0.8', 'monthly']
  ];
  const urls = pages.map(([p, prio, freq]) =>
    `<url><loc>${config.siteUrl}${p}</loc><lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${prio}</priority></url>`).join('\n  ');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>
`;
}

function robotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${config.siteUrl}/sitemap.xml
`;
}

function llmsTxt() {
  const tRows = config.treatments.map(t => `| ${t.name} | ${inr(t.from)} – ${inr(t.to)} |`).join('\n');
  const faqs = config.faqs.slice(0, 6).map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n');
  return `# ${config.clinicName}

> ${config.nicheLabel} in ${config.locality}, ${config.city} (PIN ${config.pincode}). ${config.heroSubhead}

## Who we are
${config.clinicName} is a ${config.nicheLabel} in ${config.locality}, ${config.city}. ${config.directions}
Treatments are led by ${config.doctorName}, ${config.doctorCredentials}.

## Treatments & typical prices (INR)
| Treatment | Typical range |
| --- | --- |
${tRows}

## Costs
Every treatment page shows a transparent price range. An interactive cost estimator on /cost.html lets patients pick a treatment and a complexity/package option and shows the typical range immediately, with a pre-filled WhatsApp message. Written estimates are provided before treatment starts.

## Location & hours
- Address: ${config.address}
- Landmark: ${config.landmark}
- Areas served: ${config.areasServed.join(', ')}\n- Hours: ${config.hours.map(fmtHours).join(' · ')}\n\n## Contact\n- Phone: ${config.phoneDisplay} (${config.phoneIntl})\n- WhatsApp: ${config.phoneDisplay}\n- Email: ${config.email}\n- Website: ${config.siteUrl}\n\n## How to book\n1. See the price range for your treatment on /treatments.html or /cost.html.\n2. Tap the WhatsApp button — the message is pre-filled with your selected range.\n3. Or call ${config.phoneDisplay} to confirm a slot.\n\n## FAQ (short answers)\n${faqs}\n\n## About this site\nSample site built as a demonstration by Saurabh Bandelkar. Not operated by a real clinic. All reviews are sample reviews — placeholders. Photos are stock images. Prices are typical Mumbai ranges for demonstration purposes only.\n`;
}

/* ------------------------------------------------------------------ */
/* Build & write                                                       */
/* ------------------------------------------------------------------ */
const meta = metaFor();
const today = new Date().toISOString().slice(0, 10);
const outDir = path.resolve(ROOT, outIdx !== -1 ? args[outIdx + 1] : `sites/${config.slug}`);
fs.mkdirSync(outDir, { recursive: true });

const files = [
  {
    name: 'index.html',
    html: page({
      title: meta.index.title,
      description: meta.index.desc,
      pathname: '/',
      body: homeBody(),
      jsonld: [localBusinessLd(), faqLd(config.faqs.slice(0, 6))],
      ogImage: img('hero')
    })
  },
  {
    name: niche.catalogue.page,
    html: page({
      title: meta.catalogue.title,
      description: meta.catalogue.desc,
      pathname: `/${niche.catalogue.page}`,
      body: catalogueBody(),
      jsonld: [itemListLd(), breadcrumbLd([{ name: 'Home', path: '/' }, { name: niche.catalogue.nav, path: `/${niche.catalogue.page}` }])],
      ogImage: imgT(0)
    })
  },
  {
    name: 'cost.html',
    html: page({
      title: meta.cost.title,
      description: meta.cost.desc,
      pathname: '/cost.html',
      body: costBody(),
      jsonld: [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Cost', path: '/cost.html' }]), faqLd(config.costFaqs)],
      ogImage: img('clinic') || img('hero')
    })
  },
  {
    name: 'about.html',
    html: page({
      title: meta.about.title,
      description: meta.about.desc,
      pathname: '/about.html',
      body: aboutBody(),
      jsonld: [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about.html' }])],
      ogImage: img('doctor')
    })
  },
  {
    name: 'contact.html',
    html: page({
      title: meta.contact.title,
      description: meta.contact.desc,
      pathname: '/contact.html',
      body: contactBody(),
      jsonld: [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact.html' }])],
      ogImage: img('contact')
    })
  },
  {
    name: '404.html',
    html: page({
      title: `${config.clinicShortName} — Page not found`,
      description: `The page you were looking for is not part of this demo site. Back to ${config.clinicShortName} in ${config.locality}, ${config.city}.`,
      pathname: '/404.html',
      body: notFoundBody(),
      jsonld: []
    })
  },
  { name: 'sitemap.xml', text: sitemapXml(today) },
  { name: 'robots.txt', text: robotsTxt() },
  { name: 'llms.txt', text: llmsTxt() }
];

let total = 0;
for (const f of files) {
  const p = path.join(outDir, f.name);
  fs.writeFileSync(p, f.html !== undefined ? f.html : f.text);
  const kb = fs.statSync(p).size / 1024;
  total += fs.statSync(p).size;
  console.log(`✓ ${path.relative(ROOT, p)} (${kb.toFixed(1)} KB)`);
}
const imgCount = (() => {
  const set = new Set();
  for (const k of Object.keys(photos)) {
    if (k === 'treatments') photos.treatments.forEach(p => set.add(p));
    else if (Array.isArray(photos[k])) photos[k].forEach(p => set.add(p));
    else set.add(photos[k]);
  }
  return set.size;
})();
console.log(`\nBuilt ${config.slug} (${config.nicheLabel}) — ${files.length} files + ${imgCount} images, ${(total / 1024).toFixed(1)} KB HTML total -> ${path.relative(ROOT, outDir)}`);
