# Asset manifest

Original brand, packaging and heritage sources were supplied in the workspace; the complete ingredient gallery uses generated illustrations. “Supplied artwork” means a user-provided design/concept reference; physical-product photography and generation provenance have not been verified. Ingredient illustrations were generated for the 12 label-confirmed botanicals. Bottle label text was not regenerated: original RGB pixels are retained beneath AI-assisted transparency masks. Sharp creates WebP derivatives with original aspect ratios; bottle crops preserve the supplied bottle and its label. Next Image supplies responsive optimization. The reproducible script `scripts/prepare-assets.mjs` expects the original workspace assets one level above the checkout, with the updated Botanical packaging in `../nara-updated-img/`. Changed images get a new filename (for example `-v2`) so browser and image-optimizer caches cannot keep serving the old version.

| Original filename | Public derivative / use | Association | Alt text | Classification |
| --- | --- | --- | --- | --- |
| 1793161210176.jpg.jpeg | brand/nara-logo.jpeg, header/footer and image fallback | Brand | NARA — love your beauty again | Original supplied brand artwork |
| nara-updated-img/IMG-20261102-WA0029.jpg.jpeg | products/botanical-v2-oil.webp (front view crop, source of botanical-v2-cutout.webp); products/botanical-back.webp (back view crop) | Botanical oil, 30 ml, updated packaging | Product imageAlt; “Back of the NARA Premium Botanical Hair Oil bottle…” | Supplied product artwork (four bottle views on a plain background) |
| nara-updated-img/IMG-20261102-WA0028.jpg.jpeg | products/botanical-lifestyle.webp (gallery “Styled”); collections/hair-care-v2.webp (centre band crop for the Hair care card) | Botanical oil, updated packaging; hair collection | “NARA Premium Botanical Hair Oil on warm stone with jasmine and a red hibiscus flower”; card uses empty decorative alt | Supplied styled product artwork |
| nara-updated-img/IMG-20261102-WA0027.jpg.jpeg | products/botanical-v2-label.webp (gallery “Label & ingredients”, Open Graph image) | Botanical oil label, updated | “Full NARA Premium Botanical Hair Oil label artwork…” | Supplied flat label artwork; source of the site’s ingredient list, description and usage text |
| file_0000000096cc820bbf4874f016123f99.png | products/rosemary-oil.webp, cropped bottle; products/rosemary-label.webp, full reference | Rosemary oil, 30 ml | NARA Premium Rosemary Oil, 30 ml, amber dropper bottle with Sinhala branding and a woman wearing a red flower; supplied front/back label artwork | Supplied product artwork; not physical-product photography |
| WhatsApp Image 2026-10-27 at 9.56.04 PM.jpeg | Not duplicated; lower-resolution rosemary reference inspected | Rosemary oil | Not rendered | Supplied alternate artwork |
| IMG-20261027-WA0056.jpg.jpeg | heritage/fresco-detail.webp, left-side mural crop used as decorative hero background | Heritage | Empty decorative alt | Supplied illustrative concept, not archaeological documentation |
| scripts/asset-sources/sigiriya-pidurangala.jpg | heritage/sigiriya.webp, 1440 × 1200 crop centred on the rock | Heritage story (“Inspired by Sri Lanka’s Timeless Heritage”) | Sigiriya rock fortress rising above the forest in evening light, seen from Pidurangala Rock | Photograph “Sigiriya, taken from Pidurangala Rock” by C.J.Hatton, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sigiriya,_taken_from_Pidurangala_Rock.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Resized and cropped; the cropped derivative is shared under the same licence. Credited in a caption under the image on the homepage. |
| NARA Sri Lankan Heritage Beauty Homepage.png | ingredients/coconut.webp (legacy source crop; no longer used) | Ingredients confirmed by product labels | Ingredient name followed by “botanical illustration” | Supplied illustrative mockup crops |
| 1793161210176.jpg.jpeg | Skin collection and upcoming product cards | Soap, serum, shampoo, toner | NARA botanical brand emblem; product photography pending | Brand artwork used as explicit placeholder |

## Source and content boundaries

Only the botanical ingredients visible on its supplied label are associated with Botanical Hair Oil. Rosemary Oil lists Virgin Coconut Oil, Rosemary and Rosemary Essential Oil, separately. Claims printed on supplied label artwork have not been promoted into certification or clinical claims elsewhere on the site. Reference images are preserved; the full rosemary label includes a printed Rs. 950, which is not the current selling price.

## Missing assets and pending information

- Actual physical-product photographs (front, back and detail) for both oils; confirmation that supplied artwork is final packaging.
- Individual botanical photography, if desired; the ingredient gallery uses generated illustrations.
- Original skin care, shampoo and toner imagery when those products are ready. No packaging has been invented.
- Stock levels.
- Delivery coverage, charges and timelines; COD operational details before taking orders.
- Certification evidence before any certification, cruelty-free or clinical claims.

Contact details and social URLs come directly from the owner and are centralized in `src/lib/config/site.ts`.

## Ingredient and frameless-image update

The ingredient gallery and Botanical Hair Oil data share `src/data/ingredients.ts`, matching all 11 names on the updated label (November 2026): Virgin Coconut Oil, Sesame Oil, Almond Oil, Castor Oil, King Coconut Oil, Hibiscus, Blue Water Lily, Fenugreek, Rosemary, Black Seed and Gotukola. Curry Leaves, on the earlier label, was removed with its illustration. Rosemary Oil retains its own separate three-item label list.

| Assets | Usage and association | Alt text | Provenance |
| --- | --- | --- | --- |
| products/botanical-v2-cutout.webp and rosemary-cutout.webp | Hero, cards and bottle gallery views | Existing descriptive product alt text | Original supplied bottle RGB pixels, lossless WebP. Botanical’s mask is computed by `scripts/make-bottle-mask.mjs` (flood fill of the plain background from the image edges); Rosemary’s is an AI-assisted silhouette mask. |
| ingredients/virgin-coconut-oil-illustration.webp, sesame-oil-illustration.webp, almond-oil-illustration.webp, castor-oil-illustration.webp, king-coconut-oil-illustration.webp, hibiscus-illustration.webp, blue-water-lily-illustration.webp, fenugreek-illustration.webp, rosemary-illustration.webp, black-seed-illustration.webp, gotukola-illustration.webp | Complete 11-ingredient gallery | Ingredient name followed by “botanical illustration” | AI-generated illustrations on transparent backgrounds; not raw ingredient photographs or formula evidence. |
| scripts/asset-sources/ingredient-atlas.png | Reproducible source atlas, not served by the gallery | Not rendered | Built-in image generation output, arranged in a 4 × 3 grid. |
| scripts/asset-masks/botanical-v2.png and rosemary.png | Reproducible transparency masks | Not rendered | Botanical: algorithmic background mask. Rosemary: AI-assisted mask with source-edge refinement. Original bottle pixels are never replaced. |

`node scripts/prepare-clean-assets.mjs` recreates the transparent assets from the retained source crops, masks and atlas. `prepare-assets.mjs` runs it after recreating the original source crops. See [Image prompts and provenance](image-updates.md).
