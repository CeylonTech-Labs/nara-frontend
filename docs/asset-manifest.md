# Asset manifest

Original brand, packaging and heritage sources were supplied in the workspace; the complete ingredient gallery uses generated illustrations. “Supplied artwork” means a user-provided design/concept reference; physical-product photography and generation provenance have not been verified. Ingredient illustrations were generated for the 12 label-confirmed botanicals. Bottle label text was not regenerated: original RGB pixels are retained beneath AI-assisted transparency masks. Sharp creates WebP derivatives with original aspect ratios; bottle crops preserve the supplied bottle and its label. Next Image supplies responsive optimization. The reproducible script `scripts/prepare-assets.mjs` expects the original workspace assets one level above the checkout.

| Original filename | Public derivative / use | Association | Alt text | Classification |
| --- | --- | --- | --- | --- |
| 1793161210176.jpg.jpeg | brand/nara-logo.jpeg, header/footer and image fallback | Brand | NARA — love your beauty again | Original supplied brand artwork |
| IMG-20261027-WA0056.jpg.jpeg | products/nara-hair-oil-concept.jpeg (retained Phase 02 asset) | Botanical oil | NARA hair oil concept against a heritage-inspired backdrop | Supplied concept artwork |
| WhatsApp Image 2026-10-27 at 9.11.56 PM.jpeg | products/botanical-oil.webp, cropped bottle; products/botanical-label.webp, full reference | Botanical oil, 30 ml | NARA Premium Botanical Hair Oil, 30 ml, amber dropper bottle with cream and gold floral label; supplied front/back label and bottle reference | Supplied product artwork; not physical-product photography |
| file_0000000096cc820bbf4874f016123f99.png | products/rosemary-oil.webp, cropped bottle; products/rosemary-label.webp, full reference | Rosemary oil, 30 ml | NARA Premium Rosemary Oil, 30 ml, amber dropper bottle with Sinhala branding and a woman wearing a red flower; supplied front/back label artwork | Supplied product artwork; not physical-product photography |
| WhatsApp Image 2026-10-27 at 9.56.04 PM.jpeg | Not duplicated; lower-resolution rosemary reference inspected | Rosemary oil | Not rendered | Supplied alternate artwork |
| IMG-20261027-WA0056.jpg.jpeg | heritage/fresco-detail.webp, left-side mural crop used as decorative hero background | Heritage | Empty decorative alt | Supplied illustrative concept, not archaeological documentation |
| NARA Sri Lankan Heritage Beauty Homepage.png | heritage/island-landscape.webp | Heritage story | Illustrative Sri Lankan rock landscape in warm golden light, from the supplied design reference | Supplied illustrative mockup crop |
| NARA Sri Lankan Heritage Beauty Homepage.png | collections/hair-care.webp, bottle-and-botanical crop excluding embedded mockup UI | Hair collection | Empty decorative alt, linked card supplies title | Supplied illustrative mockup crop |
| NARA Sri Lankan Heritage Beauty Homepage.png | ingredients/coconut.webp (legacy source crop; no longer used) | Ingredients confirmed by product labels | Ingredient name followed by “botanical illustration” | Supplied illustrative mockup crops |
| 1793161210176.jpg.jpeg | Skin collection and upcoming product cards | Soap, serum, shampoo, toner | NARA botanical brand emblem; product photography pending | Brand artwork used as explicit placeholder |

## Source and content boundaries

Only the botanical ingredients visible on its supplied label are associated with Botanical Hair Oil. Rosemary Oil lists Virgin Coconut Oil, Rosemary and Rosemary Essential Oil, separately. Claims printed on supplied label artwork have not been promoted into certification or clinical claims elsewhere on the site. Reference images are preserved; the full rosemary label includes a printed Rs. 950, which remains unconfirmed as the current price.

## Missing assets and pending information

- Actual physical-product photographs (front, back and detail) for both oils; confirmation that supplied artwork is final packaging.
- Original high-resolution heritage landscape and individual botanical photography, if desired; the ingredient gallery now uses generated illustrations.
- Original skin care, shampoo and toner imagery when those products are ready. No packaging has been invented.
- Current confirmed selling prices, purchasability and stock, final product details and label approval.
- Delivery coverage, charges and timelines; COD operational details before taking orders.
- Certification evidence before any certification, cruelty-free or clinical claims.

Contact details and social URLs come directly from the owner and are centralized in `src/lib/config/site.ts`.

## Ingredient and frameless-image update

The ingredient gallery and Botanical Hair Oil data share `src/data/ingredients.ts`, matching all 12 names in the supplied label: Virgin Coconut Oil, Sesame Oil, Almond Oil, Castor Oil, King Coconut Oil, Hibiscus, Blue Water Lily, Fenugreek, Rosemary, Black Seed, Gotukola and Curry Leaves. Rosemary Oil retains its own separate three-item label list.

| Assets | Usage and association | Alt text | Provenance |
| --- | --- | --- | --- |
| products/botanical-cutout.webp and rosemary-cutout.webp | Hero, cards and bottle gallery views | Existing descriptive product alt text | Original supplied bottle RGB pixels, lossless WebP; AI-assisted silhouette masks refined to remove the background. Full label references remain intact. |
| ingredients/virgin-coconut-oil-illustration.webp, sesame-oil-illustration.webp, almond-oil-illustration.webp, castor-oil-illustration.webp, king-coconut-oil-illustration.webp, hibiscus-illustration.webp, blue-water-lily-illustration.webp, fenugreek-illustration.webp, rosemary-illustration.webp, black-seed-illustration.webp, gotukola-illustration.webp, curry-leaves-illustration.webp | Complete 12-ingredient gallery | Ingredient name followed by ?botanical illustration? | AI-generated illustrations on transparent backgrounds; not raw ingredient photographs or formula evidence. |
| scripts/asset-sources/ingredient-atlas.png | Reproducible source atlas, not served by the gallery | Not rendered | Built-in image generation output, arranged in a 4 ? 3 grid. |
| scripts/asset-masks/botanical.png and rosemary.png | Reproducible transparency masks | Not rendered | AI-assisted masks with source-edge refinement; original bottle pixels are never replaced by generated label artwork. |

`node scripts/prepare-clean-assets.mjs` recreates the transparent assets from the retained source crops, masks and atlas. `prepare-assets.mjs` runs it after recreating the original source crops. See [Image prompts and provenance](image-updates.md).
