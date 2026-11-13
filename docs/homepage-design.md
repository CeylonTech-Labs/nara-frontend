# Phase 03: heritage homepage

NARA’s storefront pairs a warm, fresco-inspired hero with two separate hair oil presentations, a collection preview, label-based botanical storytelling and a Sri Lankan landscape story. The layout follows the supplied homepage reference while keeping unconfirmed prices, stock and certifications out of customer-facing claims.

## Visual system

- Royal Maroon `#682C35`, Antique Gold `#C4A46A`, Ivory `#F5ECDD`, Forest Green `#344B38`, Terracotta `#B56D50`, Deep Brown `#35271F`.
- Cormorant Garamond headings and Inter body text use `next/font`. Noto Serif Sinhala and `:lang(si)` support future Sinhala content.
- A sticky header provides Home, Hair Care, Skin Care, Our Story, Ingredients, Contact, live catalog search, bag and WhatsApp. Below 850 px, native modal navigation provides focus confinement, Escape dismissal and focus restoration. Search uses its own labelled native dialog, ingredient/name filtering and an empty state.
- The hero uses supplied fresco-inspired artwork behind a readable overlay, paired product crops and the requested headline, description and hair-oil CTA.
- Product cards, product galleries, inquiry links, section headings and reveals are reusable components. Pending categories show the brand emblem instead of fabricated packaging.

## Product information and purchasing

`src/data/products.ts` holds separate 30 ml Botanical Hair Oil and Rosemary Oil records. Ingredients and instructions are transcribed from supplied label references. These are supplied artwork, not verified photographs of physical products. No new packaging was generated. The printed Rs. 950 on the rosemary reference is not treated as a confirmed current selling price. Stock and certifications are not inferred from artwork.

Both oils are visible with price pending; neither is configured as purchasable. Add to bag requires `status: available`, `purchasable: true` and a positive confirmed price. The cart enforces the same rule, including restored browser data. Future enabled purchase buttons announce successful additions. Checkout remains unavailable until backend ordering is implemented. COD is shown as specified in the Phase 03 brief, with coverage and charges confirmed directly with NARA.

Product pages include a bottle/label gallery, full ingredients, supplied usage, WhatsApp enquiries naming the product, COD/delivery notes and related products. JSON-LD includes only name, description, brand, supplied image and known volume. It deliberately omits offers, stock and reviews. Canonical URLs require `NEXT_PUBLIC_SITE_URL`.

## Motion and accessibility

Motion for React provides a short hero entrance, scroll-linked background translation and once-only reveals with staggered ingredient circles. CSS handles card hover and mobile drawer entrance. All respect reduced motion; no product labels are obscured by decorative overlays. Images have reserved space and descriptive alt text. Product images fall back to the NARA emblem after load errors. Native dialogs, semantic headings, labelled search, live feedback, skip navigation and focus outlines support keyboard and assistive technology use.

## Responsive behavior

- 360/390 px: stacked hero copy and paired bottles, single-column cards, three-column ingredient circles, modal menu.
- 768 px: paired hero and oil cards; modal menu avoids navigation crowding.
- 1024 px: compact desktop navigation and two oil cards.
- 1440/1920 px: capped 1200 px content keeps comfortable text widths; full-width hero and section backgrounds.
- Below 760 px the heritage story and ingredient lists stack. Product labels use contain sizing; no label text is cropped inside its gallery image.

## Verification and preview

Run `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`. Tests cover navigation, modal opening/closing, search, pending/coming-soon purchase restrictions, cart quantities and restoration, feedback, contact links, homepage sections, separated ingredients, image fallback, label gallery and product enquiries.

Run `npm run dev` from `nara-frontend`, then open `http://localhost:3000`. No hosting, AWS, backend, CI or deployment configuration was changed.

### Validation results (29 October 2026)

Lint, TypeScript checking, all 22 component and asset-integrity tests and the production build passed. Chrome browser smoke checks passed across 10 routes at each of 360, 390, 768, 1024, 1440 and 1920 px (60 checks), with no horizontal page overflow or broken loaded images. Browser checks also verified native menu Escape dismissal, search focus and visible content under reduced motion; a separate check verified normal-motion collection reveals. The review fixed an existing duplicate heading on the empty-cart page and a reduced-motion hydration issue in the shared reveal component.

The repeatable browser script is `scripts/responsive-smoke.mjs`. It uses an existing Chrome debugging session (default port 9228) and a running local app. In PowerShell, set `$env:QA_ORIGIN="http://localhost:3007"` and run `node scripts/responsive-smoke.mjs`. Results and screenshots are written to ignored `.qa/`. Browser emulation checks layout widths; this is not a physical-device test or a complete accessibility audit.

Work is on `feat/nara-heritage-homepage`, with uncommitted changes. Changed areas: homepage and shared layout, product data/cards/gallery/details, cart purchase guards, animations, metadata, optimized source assets, tests and documentation. Prior contact and social-link changes are preserved. The Next build updates generated `next-env.d.ts` route type references. No backend, infrastructure, workflow, hosting, commit or push was performed.

## Complete ingredient gallery and clean images

The gallery now presents all 12 ingredients from the supplied Botanical Hair Oil label, using a six-column desktop, four-column tablet and three-column mobile grid. Ingredient names and image keys are centralized in `src/data/ingredients.ts` and reused by the product record. Generated botanical illustrations have transparent margins and contain sizing. Product cutouts preserve the original supplied RGB pixels, with transparent masks removing rectangular backdrops. Hero bottle frames and product image panel backgrounds have been removed. Full label artwork remains available in the gallery. The footer displays ?Powered by CeylonTech Labs? without an invented external URL.

Final update checks: all 22 component/asset tests passed; the build passed with new ingredient filenames, followed by all 60 responsive route checks. Browser checks now also assert that all 12 ingredient illustrations appear, hero bottle containers have transparent backgrounds and no borders, and the footer includes the CeylonTech Labs credit.
