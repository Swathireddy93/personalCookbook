# My Daily Ritual Cookbook

A premium personal wellness cookbook built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style UI primitives, Radix UI, Lucide icons, and Framer Motion.

## What is included

- Responsive homepage with food photography, instant search, filters, and browse-by-ritual cards
- Ritual timeline pages for morning, afternoon, evening, weekly, and seasonal protocols
- Recipe detail pages with hero photography, ingredient hover tags, benefits cards, evidence badges, preparation steps, and journal-style personal notes
- Interactive ingredient relationship graph for ingredient-led discovery
- No-auth admin pilot for adding/editing recipes and previewing a future JSON/CMS workflow
- Dark mode toggle
- Vercel-ready project structure

## Project Structure

```txt
app/
  admin/page.tsx
  graph/page.tsx
  layout.tsx
  page.tsx
  recipes/[slug]/page.tsx
  rituals/[slug]/page.tsx
components/
  admin-editor.tsx
  ingredient-graph.tsx
  ingredient-tags.tsx
  search-and-filter.tsx
  theme-toggle.tsx
  ui/
data/
  rituals.ts
```

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Deployment to Vercel

1. Push this folder to a Git repository.
2. Import the repository in Vercel.
3. Use the default Next.js framework preset.
4. Deploy.

## Content Model

Pilot content lives in `data/rituals.ts` as structured local data. The recipe model already separates:

- ritual metadata
- ingredients and scientific rationale
- benefits and goals
- preparation steps
- personal notes
- evidence strength

For a later migration, map the same fields into:

- Supabase tables: `recipes`, `ingredients`, `recipe_ingredients`, `benefits`, `ritual_steps`
- PostgreSQL with the same relational structure
- Sanity document types for `recipe`, `ingredient`, `ritual`, and `benefit`

## Suggested Next Enhancements

- Replace remote stock food images with your personal dish photos
- Add a real JSON persistence route for the admin editor
- Add drag-and-drop ritual step reordering
- Add weekly ritual calendar view
- Add printable recipe card styling
- Add ingredient nutrient breakdown panels
- Add PWA manifest and offline recipe caching
