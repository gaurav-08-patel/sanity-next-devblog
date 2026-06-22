# DevBlog — Developer Knowledge, connected.

A focused developer blog built with Next.js and Sanity CMS. This repository contains the public site (Pages Router), a mounted Sanity Studio, content schemas, and utilities for fetching and rendering articles.

---

## Quick Start (local)

Prerequisites:

- Node.js 18+ (or latest LTS)
- npm (or yarn / pnpm)

Clone and install:

```bash
git clone <your-repo-url>
cd my-dev-blog
npm install
```

Create a `.env.local` at the project root with your Sanity and optional AdSense keys:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-21
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
```

Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000

Build for production:

```bash
npm run build
npm start
```

---

**Available scripts** (in `package.json`):

- `dev`: starts Next.js in development mode
- `build`: builds the production bundle
- `start`: runs the built app
- `lint`: runs ESLint

---

## Overview — Pages and Features

- `/` — Homepage: hero, featured posts (latest 6), and a preview of latest articles.
- `/blog` — All Articles: paginated listing of all published `article` documents (12 per page by default), search UI, and AdUnit placement.
- `/blog/[slug]` — Article detail page: renders the article body (Portable Text) and associated metadata (title, read time, cover image).
- `/tools` — Tool Comparisons: tag-filtered listing (`tools` tag), same layout and pagination as `/blog`.
- `/howto` — How-To Guides: tag-filtered listing (`howto` tag), same layout and pagination as `/blog`.
- `/studio` — Sanity Studio (mounted at `/studio`) — edit content, run GROQ queries via Vision plugin.
- `/api/hello` — Example API route.

Files of interest:

- `pages/index.js` — homepage
- `pages/blog/index.js` — blog listing (pagination + search)
- `pages/tools/index.js` — tools listing
- `pages/howto/index.js` — how-to listing
- `pages/blog/[slug].js` — article page
- `pages/studio/[[...tool]].jsx` — Sanity Studio mount
- `lib/sanity.js` — Sanity client + helpers (`getAllPosts`, `getPostBySlug`, `getPostsByTag`)
- `components/Layout.js` — site header/footer and layout
- `components/PostCard.js` — article preview card
- `components/SearchBar.js` — client-side search (Fuse.js)
- `components/AdUnit.js` — AdSense placeholder / responsive unit
- `styles/globals.css` — global styles & theme variables
- `src/sanity/schemaTypes` — Sanity schema definitions (e.g., `article.js`)

---

## Data Model (Sanity)

Document type: `article` (see `src/sanity/schemaTypes/article.js`). Fields include:

- `title` (string)
- `slug` (slug)
- `brief` (text)
- `body` (Portable Text array — blocks, images)
- `coverImage` (image)
- `tags` (array of strings)
- `publishedAt` (datetime)

The public site fetches data via `lib/sanity.js` using `@sanity/client` and GROQ queries.

---

## Technologies Used

- Next.js (Pages Router) — React framework for server-side rendering and static generation.
- React — UI library.
- Sanity (Studio + client) — headless CMS for content editing and storage.
- Tailwind CSS — utility-first styling (project also includes custom CSS variables in `styles/globals.css`).
- Fuse.js — lightweight client-side fuzzy search used in the `SearchBar` component.
- @portabletext/react — render Portable Text from Sanity.
- next/image — optimized image handling (remote patterns configured for `cdn.sanity.io` and `images.unsplash.com`).
- styled-components — present in `package.json` (if used for components).

---

## Styling & Theme

- Dark-theme variables live in `styles/globals.css` under `@theme` and `:root` declarations.
- Headings use gradient styles (amethyst → lavender → white) via `bg-clip-text` for the hero and listing titles.
- Selection colors and responsive line-heights are customized in `styles/globals.css`.

---

## Ads

- `components/AdUnit.js` provides a placeholder in development and renders an AdSense `ins` element in production when `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set.

---

## Sanity Studio (local)

The Studio is mounted at the `/studio` route using the studio config in `sanity.config.js`. To run the Studio locally as part of the Next app, run the Next dev server; the Studio UI is embedded in the pages route.

If you run a standalone Sanity Studio, follow Sanity CLI setup from their docs to authenticate and deploy.

---

## Deployment

- Vercel is the recommended host for Next.js apps — connect your repository and configure environment variables in the dashboard.
- Make sure to add the Sanity environment variables and the optional AdSense client ID to your Vercel project settings.

---

## Notes & Next Steps

- Pagination is implemented client-side for the listing pages. If your site grows very large, consider server-side pagination or a cursor-based approach.
- The search is client-side using `Fuse.js` and indexes the posts returned to the page; for large archives consider precomputed indices or hosted search.
