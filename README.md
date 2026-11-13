# nara-frontend

NARA Sri Lankan Heritage Beauty E-Commerce Frontend. This repository contains the responsive Next.js heritage storefront for NARA, a Sri Lankan beauty brand inspired by local botanical traditions and heritage.

## Prerequisites

- Node.js 24 (see `.nvmrc`)
- npm 9 or newer

## Installation and development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. On Windows PowerShell, copy the environment template with `Copy-Item .env.example .env.local`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript types |
| `npm run test` | Run Vitest and React Testing Library tests |
| `npm run build` | Create a production build |

## Environment variables

Copy `.env.example` to `.env.local` and set only the values available to your environment:

- `NEXT_PUBLIC_API_BASE_URL` — optional base URL for the future NestJS API. Blank uses local mock data.
- `NEXT_PUBLIC_SITE_URL` — optional canonical public origin used by SEO metadata, sitemap and robots. The development fallback is `http://localhost:3000`.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — optional seller number in international digits only, including country code. Defaults to the owner-supplied NARA number, 94706132303. An explicit empty or invalid override disables WhatsApp.

`.env.local` is ignored by Git. Do not add credentials or database passwords to public environment variables.

## Project structure

```text
src/app/             App Router pages and SEO handlers
src/components/      Shared layout, catalog and storefront components
src/features/cart/   Client-side cart state and cart page content
src/data/            Typed local catalog data
src/lib/             API boundary and utilities
src/types/           Shared domain types
public/images/       Supplied NARA brand and product concept imagery
tests/               Component and utility tests
docs/                Frontend architecture and design system
```

## Current limitations

The catalog is local typed data with two 30 ml oils. Ingredients and usage come from supplied label artwork; actual product photography and current selling prices remain pending. Neither oil is enabled for purchasing. Shampoo, hair toner, soap and serum are coming soon. The cart enforces explicit purchase configuration and confirmed pricing. Checkout does not submit orders. COD is presented as requested; customers must confirm coverage and charges with NARA. Heritage and botanical imagery are supplied illustrative references, not archaeological documentation.

## Future backend integration

`src/lib/api/client.ts` is the typed native-fetch boundary for the planned NestJS API. Replace local mock catalog reads once the backend contract is available, then enable checkout only after the server validates product details, prices, stock and delivery information.

## Continuous integration

`.github/workflows/frontend-ci.yml` runs on pull requests and pushes to `main`. It installs with `npm ci`, then runs lint, type checking, tests and the production build. The workflow uses read-only repository permissions and does not deploy.

## Brand contact details

Public contact information is centralized in src/lib/config/site.ts: nara.origin3@gmail.com, WhatsApp 070 613 2303 (+94 70 613 2303), and Instagram @nara_care26. The owner-supplied Facebook page link is included on the contact page and in the footer. Do not place account passwords in frontend code or public environment variables.

## Phase 03 design and assets

See [Homepage design](docs/homepage-design.md) for components, colors, typography, motion, responsive behavior and purchase rules. See [Asset manifest](docs/asset-manifest.md) for source filenames, image provenance, label transcriptions and missing product information. Assets can be recreated with `node scripts/prepare-assets.mjs` when the original workspace files are available. No new dependencies are required.
