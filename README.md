# Off The Worldly Road

A personal landing page built with Next.js — home to YouTube content, blog posts, a photography portfolio, and a store for printed photo-art.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (recommended)

## Project Structure

```
app/                  # Next.js App Router pages
  (sections)/         # Reusable page sections (Hero, About, etc.)
  blog/               # Blog routes
  portfolio/          # Photography portfolio routes
  store/              # Photo-art store routes
  globals.css         # Global styles
  layout.tsx          # Root layout
  page.tsx            # Landing page
components/           # React components
  ui/                 # Reusable UI primitives
  layout/             # Layout components (Header, Footer, etc.)
content/              # Static content (MDX blog posts, photo metadata)
  blog/               # Blog post content
  photos/             # Photo metadata & descriptions
lib/                  # Utility functions
public/               # Static assets
  images/photos/      # Photography images
  images/art/         # Photo-art print images
  videos/             # Video assets
types/                # Shared TypeScript types
```

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

The easiest deployment is [Vercel](https://vercel.com/new).

## License

MIT
