# Frontend architecture

NARA uses the Next.js App Router with server-rendered route content and small client components for interactions. Route files own metadata and page composition. Shared layout components provide navigation, the footer, and WhatsApp contact; catalog components render typed products from local mock data.

## State and boundaries

`src/features/cart/cart-context.tsx` owns the browser cart. It validates persisted entries against the catalog, stores only product slugs and quantities in localStorage, and derives whether checkout is safe. Product data in `src/data/products.ts` is the single typed catalog source. Missing price, volume, or ingredient information remains `null`; checkout stays unavailable until all required information exists.

`src/lib/api/client.ts` defines the future native-fetch boundary for the NestJS API. It requires an explicit API base URL and returns typed payloads without making requests during this local mock phase.

## Routes

- `/` — brand introduction and launch product
- `/hair-care`, `/skin-care` — category listings
- `/products/[slug]` — product detail pages generated from the local catalog
- `/cart`, `/checkout` — local cart review and an explicit pre-integration checkout notice
- `/about`, `/contact` — brand and contact information

SEO metadata is defined at the root and extended by route metadata. Sitemap and robots handlers use `NEXT_PUBLIC_SITE_URL` when configured.
