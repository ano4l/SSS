# Diplomatic Informer - Trade and Investment

Static, self-contained web page deployed on Vercel.

## Structure

- `index.html` - deployed page (copy of `Diplomatic Informer - Trade and Investment (Standalone).html`, all assets inlined)
- `Diplomatic Informer - Trade and Investment.dc.html` / `... (standalone source).dc.html` - source documents
- `image-slot.js`, `support.js` - runtime scripts used by the source documents
- `uploads/` - original media and document assets
- `vercel.json` - Vercel static hosting config

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

When regenerating the standalone bundle, refresh `index.html`:

```bash
cp "Diplomatic Informer - Trade and Investment (Standalone).html" index.html
```
