# Handoff: The Diplomatic Informer — Trade & Investment Division Website

## Overview
A marketing/facilitation website for The Diplomatic Informer's Trade, Investment Facilitation & Consulting division. It positions the division as a commercial facilitation platform (not a media property), showcases sectors and gated "opportunity" listings, runs a business directory, and sells on-site advertising placements. It is a sister site to the existing diplomaticinformer.com magazine and shares its brand identity.

## About the Design Files
The files in this bundle (`Diplomatic Informer - Trade and Investment.dc.html` and the standalone/bundled HTML variants) are **design references built as a single-file interactive HTML prototype** — they demonstrate the intended look, content, navigation, and light client-side interactivity (hover dropdowns, rotating banners, filtering, mailto-based forms). They are **not production code to ship as-is**. The task is to **recreate this design in the target codebase's real environment** — React/Next.js, or whatever framework the team standardizes on — with a real backend for forms, image uploads, and directory data, rather than embedding this HTML directly.

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy, and layout are final/intended. Recreate pixel-close using the codebase's component library and styling approach (CSS-in-JS, Tailwind, CSS modules — whatever the target project uses). Where the prototype uses inline styles for speed of iteration, translate these into the target project's proper styling system rather than copying inline styles.

## Global Elements

### Header (all pages)
- Fixed/sticky header, two-row: a thin utility bar (28–34px) with "Africa ↔ Global Markets" left and a link to `https://diplomaticinformer.com` (labeled "The Diplomatic Informer Magazine →") right.
- Below it, main nav row (~88px): logo + wordmark left, nav links center/right, single crimson pill CTA button "Request Access" far right.
- Nav items: Home · Opportunities (hover dropdown: All Opportunities / Real Estate & Hospitality / Mining & Natural Resources / All Sectors) · Sectors · Services · Directory · Insights (hover dropdown: Business News / Events) · Why Africa · About · Contact.
- On the homepage only: header is transparent over the hero image until the user scrolls past ~40px, then transitions to a solid olive gradient background that persists on all other pages/scroll positions.
- Mobile (≤900px approx): nav collapses to a hamburger opening a full-width dropdown list of the same links.
- Logo: `assets/logo-new-white.png` (off-white recolor of the brand mark, transparent background) used on dark surfaces; `assets/logo-new.png` is the original black-on-transparent version.

### Footer (all pages)
- Column 1: logo, "International Trade & Investment" line, signature "CONNECT. FACILITATE. INVEST. BUILD.", tagline "Africa ↔ Global Markets".
- Columns 2–4: quick links to Services, Sectors, Directory (including "Advertise With Us").
- Column 5: Contact — `investment@diplomaticinformer.com`, "The Diplomatic Informer", address "John Vorster Dr, Corner Nellmapius Dr, Irene, Centurion, 0062", phone "012 141 1704".
- Bottom bar: © 2013–2026 The Diplomatic Informer · Terms · Privacy · Disclaimer · Non-Circumvention.
- Standing disclaimer line, always visible: "All opportunities are subject to mandate verification, availability, confidentiality, qualification and appropriate due diligence."

## Design Tokens

### Colors
- Olive (brand identity): `#989809` — accents, dividers, hover states, dot markers. Never used for small body text.
- Olive dark (hover): `#7A7A07` / `#8B8B08`
- Crimson (action only — one per screen as the primary CTA): `#990025`
- Crimson dark (hover): `#7A001D`
- Near-black background: `#0A0A0A` (primary page background, dark theme throughout)
- Card/panel background: `#141412`
- Borders/dividers: `#242420`, lighter dashed border `#3A3A34`
- Body text on dark: `#FAF9F5` (off-white, primary), `#9A988C` / `#A9A79C` (muted secondary), `#6B6A5F` / `#6B6A60` (tertiary/meta)
- Paper (legacy light variant, no longer primary): `#FAF9F5` background, `#0A0A0A` text, `#E5E3DC` borders — the site was redesigned from light to a black theme; the dark palette above is current.

### Typography
- Headings: Archivo (600 weight primary, 700 for wordmark), tight letter-spacing (-0.02em to -0.04em on large headlines).
- Body: Public Sans (300–500 weight).
- Meta/labels/mono accents: IBM Plex Mono, uppercase, wide letter-spacing (0.08em–0.22em), small size (10–13px).
- Hero H1: ~68–72px desktop, clamps down to ~30–40px on mobile.
- Section H2: ~40px desktop, clamps to ~24–30px on mobile.

### Responsive Breakpoints
Three tiers: desktop (default), tablet (`max-width:1100px`), mobile (`max-width:900px`), plus a small-phone pass (`max-width:600px`).
- **Tablet (1100px)**: 4/5-col grids → 2 col; 6/7/8-col grids → 3 col; hero two-column split → one column; side padding 40px → 28px.
- **Mobile (900px)**: remaining multi-column grids → 1 col (6–8 col → 2 col); headlines clamp via `clamp()`; side-by-side heading+CTA rows stack; hero → auto height; event rows (`140px 1fr auto`) → single column; tables shrink to 13px; side padding → 20px.
- **Small phone (600px)**: all remaining 2-col grids → 1 col; CTA buttons go full-width and centre; side padding → 16px.

Two implementation warnings for the rebuild — both were real bugs found in this prototype:
1. The root container must NOT have a fixed `min-width` (it had `min-width:1180px`, which silently defeated every media query).
2. The prototype's media queries target inline-style substrings (e.g. `[style*="grid-template-columns: repeat(3, 1fr)"]`) because the design is authored with inline styles. **This is a prototype-only hack and should not be carried over** — in the rebuild use real CSS classes / Tailwind breakpoints / styled-component media queries. (If you ever do need to match inline styles, note React serializes them normalized with spaces and `px` units — `padding: 0px 40px`, not `padding:0 40px` — which is what originally made these selectors silently match nothing.)

### Spacing / Layout
- Max content width: 1240px, centered, 40px side padding (20px on mobile).
- Section vertical padding: 56–120px depending on section weight.
- Grids use CSS grid with 1px gap + `#242420` background to fake hairline borders between cards (a "grid of bordered cells" pattern used throughout: What We Do cards, sector tiles, service blocks, directory results, rate card line items).
- Mobile breakpoint ~900px: all multi-column grids (2/3/4/5/6/7/8 columns) collapse to 1 or 2 columns; side-by-side header+CTA rows stack vertically; hero height becomes auto with adjusted top padding.

### Buttons
- Primary CTA: crimson pill (border-radius 999px), glass/blur effect (`backdrop-filter: blur(14px)`, semi-transparent crimson fill, subtle inset highlight, drop shadow), lifts 2px on hover.
- Secondary CTA: same glass-pill treatment but transparent/white-bordered.
- Text links: olive underline, olive-on-hover.

## Screens / Pages

1. **Home (`/`)** — Hero with rotating background photo slideshow (4 slides, ~20s cycle) + generative SVG network/orbit animation overlay (`animation-v3`-style but hand-authored via CSS keyframes: `netDrift`, `netPulse`, `netPulseSm`, `netFlow`, `orbitSpin`), gradient overlay, headline "A strategic bridge between Africa and international markets" with animated gradient-text emphasis, sub-line "Connecting Africa to the World. Connecting the World to Africa. Trade | Investment | Facilitation", two glass-pill CTAs, small "Connect. Facilitate. Invest. Build." meta row. Below: olive positioning band; 4-card "What We Do" grid; scrolling corridor marquee (Africa↔Africa/Europe/ME/Asia/Americas); 9-tile sector grid (4 linked, 5 label-only, all olive-dot markers, white text — no photo previews for now, to be added later); rotating "As Advertised By" sponsor banner (image + headline + summary + CTA, dot-indicator navigation, 6s auto-rotate) sitting ABOVE the "Partners" static logo grid (both sit high on the page, ahead of What We Do, since advertising revenue is a priority); a "From the CEO's Desk" section (portrait frame at left, multilingual welcome quote, Susan Novela signature, "Read More" button → About); Directory promo band "LIST. CONNECT. DISCOVER. GROW."; Diplomatic Foundation credibility section with CEO welcome card (multilingual welcome-word band) and link back to the magazine; closing CTA band "Let's build the next business relationship." → Contact.
2. **About** — Intro, problem statement, diplomacy model, vision/mission, positioning statement, 6 competitive-advantage blocks, diplomatic foundation, principles list, single founder profile (Susan Novela), network-philosophy quote.
3. **How We Work** — 8-step facilitation model (Understand→Build) as a horizontal 8-column strip with olive pulsing dot markers, due-diligence explainer, standard of engagement, counterparty-ID quote, honest-framing closer.
4. **Services** — 8 service blocks (Trade Facilitation, Investment Facilitation, Acquisitions & Strategic Transactions, Market Entry & Expansion, Strategic Sourcing, Due Diligence, Project Financing, Government/Chamber Engagement) + transaction-ecosystem closer.
5. **Sectors hub** — Intro + 4 full linked sector cards (Real Estate & Hospitality, Mining & Natural Resources, Agriculture & Agribusiness, Education) + 5 label-only tiles (Trade & Commodities, Infrastructure & Projects, Technology & Innovation, Manufacturing & Industrial, Consumer & International Brands). Preview photos intentionally removed for now (client will supply later).
6. **Sector pages** (shared template, one per sector incl. the 5 "label-only" ones which have since been built out with real long-form copy provided by the client — e.g. Technology & Innovation Facilitation, Global Trade & Commodities, Manufacturing & Industrial, Agro-Chemical Supply): hero, sector narrative, capability list, who-we-work-with, gated mandate-count teaser, CTA. Real Estate & Mining sectors additionally link into live "Opportunity Listings" sub-pages (see #11).
7. **Who We Serve** — 4 audience paths (international companies, African businesses, investors, governments) + partner-type list + 10 capability verbs.
8. **Opportunity Portfolio (gated) (`/opportunities`)** — "Selected mandates. Qualified access only." messaging, why-gated explainer (softened per client: representative imagery IS shown, but names/locations/financials stay withheld), 6 category cards with counts only, a "Selected Work" photo section (real uploaded property photos, captioned generically, no names), requirements list, CTA to Request Access.
9. **Qualified Access Request (`/request-access`)** — Multi-field intake form (name, position, org, country, entity type, sector interest, ticket range, statement, confirmation checkboxes, privacy consent). Submits via `mailto:investment@diplomaticinformer.com` with a structured subject/body (no backend — opens the visitor's own email client). Confirmation panel sets expectations (5 working days, NDA, etc.).
10. **Directory (`/directory`)** — Hero "LIST. CONNECT. DISCOVER. GROW.", live search bar (filters by name/sector/country against an in-memory list), A–Z letter navigation (26 tiles, each filters the results client-side), Featured Members section, "View All Businesses" expand-all toggle, value-proposition copy, CTA "Apply to Join". Current seeded directory members: SACCI, AIM Congress, Novaleads Business Enterprise, Peace Ambassadors Advocacy Network (PAAN), Mandela Awards Commission — client will add more over time.
11. **Sector Opportunity Listings (`/sectors/real-estate/listings`, `/sectors/mining/listings`, shared template)** — Search bar, listing cards (photo, type, country, price range, status tag), listing detail page (photo gallery, specs, description, Request Access CTA). Real Estate currently seeds 3 real listings with actual client-supplied photos (Pretoria embassy residence, Menlo Park Pretoria family residence, Morningside Sandton family residence — each carrying a standard "The Right Property..." legal/marketing footer block). Mining currently shows a "Listings coming soon" placeholder (dummy listings removed per client request) alongside real sulphur/mineral stock photography on the sector page itself.
12. **Membership & Directory Application** — **The four-tier model (Listed/Connected/Strategic/Institutional) was removed** in favour of a single flat listing fee: R3,000 for six months or R5,000 for the year (≈$160 / ≈$270), one upfront payment, same profile and visibility for every member. Members carry a neutral "Verified" mark rather than a purchasable tier badge. Includes an 8-field short application form and a vetting statement.
13. **Advertise With Us (`/advertise`)** — Package descriptions, "Enquire for rates" language, link to full Rate Card, CTA to Contact. Submits via mailto.
14. **Rate Card (`/rate-card`)** — Linked from the Insights nav dropdown. Scoped to what is actually sellable on this site (the print magazine's separate rate card and social/print line items were deliberately removed). Two products only, each sold on **6- or 12-month terms, paid upfront** — no monthly option:
   - **Homepage rotating banner** ("As Advertised By"): R10,200 / 6 months (≈$550), R19,200 / 12 months (≈$1,040).
   - **Directory listing** (flat fee): R3,000 / 6 months (≈$160), R5,000 / year (≈$270).
   Each block is followed by a small inline "What it looks like" mock showing the actual rendered placement (banner layout, directory row). All prices in ZAR with an approximate USD equivalent beneath. Page closes with an "Enquire About Advertising" CTA. All rates exclude 15% VAT.
15. **Events (`/events`)** — Upcoming events list (date, title, location, blurb, CTA — preview photo banners intentionally removed per client, to be re-added later) + past events grid (currently uses temporary stock photos matching each event's theme as placeholders).
16. **Business News (`/news`)** — Latest business news/articles listing (added per client request to give the Insights dropdown real content).
17. **Why Africa** — Standalone page (linked from nav + footer) making the investment case for Africa: strategic-bridge positioning, corridor visualization, olive-dot sector markers (no icons, text-only per client preference).
18. **Contact** — Entity details (address, phone, email), routed enquiry form (dropdown: Trade facilitation / Investment opportunity / Directory membership / Media & partnerships / Other), submits via mailto to `investment@diplomaticinformer.com`.
19. **Legal** — Terms, Privacy, Disclaimer, Non-Circumvention Notice as one page with anchored sections. **Needs attorney review before launch** — property/capital-introduction/project-financing copy should be checked against South African PPRA/FAIS implications; "facilitation"/"introduction" language is used deliberately instead of "brokerage".

## Interactions & Behavior
- **Header scroll behavior**: transparent-over-hero → solid-olive-on-scroll transition, computed from `window.scrollY > 40`, listened via a `scroll` event handler.
- **Opportunities / Insights nav dropdowns**: open on `mouseEnter`, close on `mouseLeave` with a **250ms delayed close** (`setTimeout` + `clearTimeout` on re-entry) so diagonal mouse movement into the panel doesn't prematurely dismiss it. Panel is positioned with `top:100%` + `padding-top:12px` (no dead-zone gap) rather than a fixed pixel offset.
- **Hero photo slideshow**: 4 stacked full-bleed images, CSS keyframe `heroSlide` (opacity crossfade) + `heroSlideZoom` (slow scale-up "Ken Burns" effect), staggered `animation-delay` (0s/5s/10s/15s) on a shared ~20s cycle.
- **Sponsor/partner rotating banner**: array of sponsor objects (name, logo, headline, summary, url), rotates every 6000ms via `setInterval`, clickable dot indicators for manual navigation, clears interval on unmount.
- **Directory search**: client-side filter over an in-memory array by name/sector/country substring match; A–Z tiles set an active-letter filter; "View All Businesses" toggles an expanded flat list.
- **Listing filtering**: same client-side substring-filter pattern for sector opportunity listings.
- **Forms (Contact, Request Access, Advertise)**: on submit, `preventDefault()`, build a `mailto:investment@diplomaticinformer.com?subject=...&body=...` URL from form field values, then `window.location.href = ` that URL. This opens the visitor's own email client with the message pre-filled — **it does not silently deliver the email**. A production rebuild should replace this with a real form backend (e.g. serverless function + email API, or a form service) so submissions send without depending on the visitor's mail client.
- **Visit counter**: reads/writes a `localStorage` key to persist and increment a running site-visit count across page loads (seeded to start from 219,835 per client request).
- **Mobile menu**: hamburger toggle sets `menuOpen` state, rendering a full-width link list; each link's click handler also closes the menu (`menuOpen: false`) after navigating.
- **Animated counters**: hotel-mandate and embassy-property counts on Home animate from 0 to their target value on mount via a timed increment loop.

## State Management
This prototype uses simple component-level state (a single top-level `page` string driving which section renders, plus assorted UI flags: `scrolled`, `menuOpen`, `oppMenuOpen`, `insightsMenuOpen`, `sponsorIndex`, `listingQuery`/`directoryQuery`, `activeLetter`, `viewAll`). In the real app this should become real routing (one route per page listed above) rather than a single-page conditional-render pattern — the conditional-render approach was a prototyping convenience, not an architecture to keep.

Data that should move to a real backend/CMS rather than staying hardcoded in front-end arrays:
- Directory members (name, tier, logo, url, description)
- Sponsor/advertiser rotation entries
- Sector opportunity listings (title, type, country, price, status, photos, specs, description)
- Events (upcoming + past)
- News articles
- Rate card figures (so pricing can be updated without a redeploy)

## SEO

The prototype implements per-page SEO client-side, which the rebuild should replace with real server-rendered per-route metadata (Next.js `metadata` export or equivalent):
- **Static head tags**: title, meta description, `robots: index, follow`, canonical (`https://trade.diplomaticinformer.com/`), Open Graph (title/description/type/site_name) and Twitter card tags.
- **Per-page metadata**: an `updateSeoTags(page)` method holds a title map and a distinct description map for all 20 routes, and on every navigation rewrites `document.title`, meta description, `og:title`/`og:description`, `twitter:title`/`twitter:description`, and the canonical href (`/` + page slug). **In the rebuild these become per-route static metadata** — client-side rewriting is a SPA workaround and is weaker for crawlers.
- **Structured data**: a JSON-LD `Organization` block in `<head>` covering name, url, `parentOrganization` (linking to diplomaticinformer.com), description, email, telephone, full `PostalAddress`, `areaServed` (the five corridors), and `founder`. Consider adding `RealEstateListing` / `Event` / `Article` schema per listing, event, and news item once those come from a CMS.
- **Still to do before launch**: `sitemap.xml`, `robots.txt`, an OG share image (`og:image` is declared as a twitter `summary_large_image` card but no image is set), and real per-listing canonical URLs.

## Deployment (client's intended setup)

The client wants **Git as the single source of truth** with auto-deploy, and their DNS is already on Cloudflare. Target setup:
1. Repo on GitHub containing the rebuilt site.
2. **Cloudflare Pages** project connected to that repo → every push to `main` auto-deploys (no manual uploading).
3. Custom domain `trade.diplomaticinformer.com` added in Pages (Pages creates the CNAME automatically since DNS is already in Cloudflare).
4. **Form backend**: replace the `mailto:` submissions with a Cloudflare Pages Function that accepts the POST and sends via an email API (MailChannels/Resend) to `investment@diplomaticinformer.com`. This is the single most important functional gap — mailto loses a meaningful share of enquiries.
5. **Content editability**: the client updates listings, events, partners, sponsors, and directory members frequently and wants to do it without a developer. Pull that content out of the components into either editable data files in the repo or a lightweight CMS, so adding a property is a content change, not a code change.

## Assets
All assets are original client-supplied photography/logos, or licensed/placeholder stock photography clearly marked for replacement:
- `assets/logo-new.png`, `assets/logo-new-white.png` — client's brand logo (black-on-transparent original + off-white recolor for dark surfaces).
- `assets/draf-cooperative-logo.png` — DRAF Cooperative partner logo (client-supplied).
- `assets/irene-listing-*.jpg` (16 files) — client photos of the Menlo Park, Pretoria (referred to in some filenames as "Irene") family residence listing.
- `assets/sandton-listing-*.jpg` (19 files) — client photos of the Morningside, Sandton family residence listing.
- `assets/sulfur-granules.jpg`, `assets/sulphur-white.jpg` — stock photography for the Mining/Agro-Chemical sector pages (sulphur commodity imagery).
- Various inline `<image-slot>` placeholders throughout (sector previews, event photo banners, directory logos not yet supplied) — these are **intentional empty placeholders**, not bugs; the client will supply final imagery before launch and asked for several of them to be removed/simplified for now (sector-hub previews, events banners) pending real photos.
- A handful of Unsplash stock photo URLs are used as temporary placeholders for the Past Events grid — replace with real event photography before launch.

## Files
- `Diplomatic Informer - Trade and Investment.dc.html` — the live/current design source (Design Component format — a single-file template+logic component; treat the HTML/inline-styles/JS-in-template as the reference, not as importable code).
- `Diplomatic Informer - Trade and Investment (standalone source).dc.html` — an earlier saved copy for reference.
- `support.js`, `image-slot.js` — runtime helpers the prototype's Design Component format depends on. **Prototype scaffolding only — do not port these.** `image-slot` is the drag-and-drop image placeholder used for imagery the client hasn't supplied yet; in the rebuild those become normal `<img>` tags fed from the CMS.
- `Diplomatic Informer - Trade and Investment (Standalone).html` — a self-contained bundled export of the design (all assets inlined) — most convenient single file to open directly in a browser to click through the whole site.
- `assets/`, `uploads/` — image assets referenced above.
