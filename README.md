# Diplomatic Informer - Trade and Investment

Single-page, client-rendered site deployed on Vercel, with a server-side contact-form function.

Production domain: **https://www.diplomaticinformerinvestments.com** (`www`). The apex redirects to
`www` in the Vercel domain configuration, and `www` is what `canonical`, `og:url` and the JSON-LD
`url` advertise. Change those locations together if the primary hostname ever changes. The domain must also be
attached to the Vercel project as the *production* domain, otherwise shared links show the
`*.vercel.app` deployment URL.

## Structure

- `index.html` - deployed page; identical to `Diplomatic Informer - Trade and Investment.dc.html`
- `enquiry-form.html` - standalone pathway chooser shared at `/enquiry`
- `directory-listing-form.html` - standalone A–Z Directory Listing application at `/directory-listing`
- `trade-enquiry-form.html` - standalone commercial Trade Enquiry form at `/trade-enquiry`
- `Diplomatic Informer - Trade and Investment.dc.html` - design source document (edit this, then re-copy to `index.html`)
- `Diplomatic Informer - Trade and Investment (Standalone).html` - older self-contained bundle, kept for reference only (not deployed)
- `Diplomatic Informer - Trade and Investment (standalone source).dc.html` - bundler source for the standalone export
- `support.js` - dc runtime; loads React 18 + Babel standalone from unpkg at runtime and renders the `<x-dc>` template
- `image-slot.js` - `<image-slot>` custom element; reads image assignments from `.image-slots.state.json` via `fetch`
- `.image-slots.state.json` / `image-slots.state.json` - image-slot sidecar state. The dotfile is the one the authoring tool writes; the non-dot copy exists because Vercel does not reliably serve dotfiles, and `vercel.json` rewrites `/.image-slots.state.json` to it. Keep the two in sync.
- `assets/favicon.svg`, `favicon-32.png`, `favicon-180.png` - globe favicon (SVG + raster fallbacks)
- `assets/og-image.jpg` - 1200x630 link-preview image referenced by `og:image` / `twitter:image`
- `assets/`, `uploads/` - images, logos and documents
- `api/contact.js` - validates contact enquiries and sends a complete structured email through Resend

## Contact form setup

Verify `virtukey.co.za` as a sending domain in Resend, then add these Production environment variables to the Vercel project:

- `RESEND_API_KEY` - Resend API key with permission to send email
- `CONTACT_FROM_EMAIL` - `Diplomatic Informer Enquiries <forms@virtukey.co.za>`
- `CONTACT_TO_EMAIL` - `tradeinvestment@diplomaticinformer.com`

After adding or changing the variables, redeploy the Production deployment. The visitor receives an inline success message only after Resend accepts the email; delivery failures remain on the form and can be retried. Resend sets the visitor's email as Reply-To, and the notification contains their full contact details, enquiry category, complete message, source page and submission timestamp.

The shareable starting link is **https://www.diplomaticinformerinvestments.com/enquiry**. It opens only the branded pathway chooser. Directory applicants go to **`/directory-listing`**; specific commercial matters go to **`/trade-enquiry`**. All three standalone pages submit through the same server-side `/api/contact` endpoint.

`/api/contact` uses the server-only Resend configuration above. Directory applications are sent with the subject `[Directory Listing Application] <organisation>` and include the organisation, contact, email, country, category, descriptor, selected 6- or 12-month term, selected package, notes, source URL and UTC timestamp. Trade enquiries are sent with `[Trade Enquiry] <enquiry focus> — <full name>` and include the submitted contact, market, focus, sector, timeframe, opportunity range, detailed enquiry, source URL and UTC timestamp. The visitor's email is set as Resend Reply-To. Legacy site contact submissions are treated as trade enquiries.

- `design_handoff_trade_investment_site/` - design handoff notes and an earlier snapshot (documentation only)
- `vercel.json` - Vercel static hosting config (rewrites, cache headers)

## Local preview

```bash
npx serve .
```

Then open http://localhost:3000

## Deploy

No build step. Vercel serves the repository root as static output.

```bash
npx vercel --prod
```

After editing the design source, refresh the deployed copies:

```bash
cp "Diplomatic Informer - Trade and Investment.dc.html" index.html
cp .image-slots.state.json image-slots.state.json
```

## Responsive notes

The prototype is authored with inline styles, so its media queries target inline-style
substrings (e.g. `[style*="grid-template-columns: 220px 1fr"]`). React serializes inline
styles normalized with spaces and `px` units (`minmax(0px, 1.1fr)`, `padding: 0px 40px`),
which is what those selectors must match. Collapsed grids use `minmax(0,1fr)` rather than
`1fr` so children with intrinsic width (`image-slot` has `aspect-ratio: 3/2`) cannot widen
a column past the viewport. Verified with no horizontal overflow at 360 / 390 / 768 / 1440 px.
