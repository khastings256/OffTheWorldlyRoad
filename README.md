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

### Via Vercel Dashboard (Recommended)

1. Sign up at [vercel.com](https://vercel.com) using your **GitHub account**
2. Dashboard → "Add New..." → "Project"
3. Import **OffTheWorldlyRoad** from the repo list
4. Vercel auto-detects Next.js — keep all defaults
5. Click **Deploy**

Free tier limits: unlimited projects, 100 GB bandwidth/month, 6,000 build minutes/month.

### Via Vercel CLI

```bash
# Install the CLI
npm install -g vercel

# Deploy a preview build
vercel

# Deploy to production
vercel --prod

# Pull remote environment variables locally
vercel env pull .env.local
```

### Environment Variables

Set via CLI:
```bash
vercel env add KEY_NAME
```

Or via Dashboard: Project Settings → Environment Variables.

### Custom Domain

Project Settings → Domains → Add your domain. Vercel provides free SSL automatically.

## License

MIT
