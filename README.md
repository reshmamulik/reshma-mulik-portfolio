# Reshma Mulik — Documentary Photographer

A single, focused documentary photography portfolio for Reshma Mulik: a
scroll-driven filmstrip homepage, a projects index, per-story pages, and an
about page.

An earlier "universe of orbiting planets" concept (multi-discipline homepage)
was parked in favor of this — its files (`Starfield.tsx`, `Planet.tsx`,
`planets.ts`) are still in the repo, unused, in case that direction comes
back as a separate project later.

## Running it locally

You'll need [Node.js](https://nodejs.org) (version 18 or later) installed.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/
    layout.tsx            → global page setup (monospace font, metadata)
    globals.css            → global styles + (unused) starfield animation
    page.tsx                → HOME — scroll-linked filmstrip
    about/page.tsx           → ABOUT — portrait + bio
    projects/
      page.tsx                → PROJECTS index (two-column, hover preview)
      [slug]/page.tsx           → one page per story, shared template
  components/
    Starfield.tsx          → unused — the old homepage's animated background
    Planet.tsx               → unused — a single orbiting planet
    light/
      LightNav.tsx            → the HOME/PROJECTS/ABOUT + name + Instagram/Back chrome
      Cascade.tsx               → HOME's scroll-driven cascading stack (mobile: swipeable carousel)
      ScatterGallery.tsx         → the scattered/scrapbook photo layout on story pages
  data/
    light.ts               → all site content: stories, filmstrip, about copy
    planets.ts               → unused — the old homepage's planet list
  lib/
    stars.ts                → unused — helper that generates the starfield
public/
  light/
    home/                    → filmstrip photos
    about/                   → portrait photo
    projects/<slug>/          → each story's photos
```

## Adding your real photos

1. Drop files into the matching folder under `public/light/` — e.g.
   `public/light/projects/ahilya-fort/01.jpg`.
2. Open `src/data/light.ts` and set the `src` field on the matching photo
   entry, e.g. `src: "/light/projects/ahilya-fort/01.jpg"`.
3. Placeholder gradient tiles disappear automatically once `src` is set.
4. Each story's essay text is a placeholder — replace the `intro` array in
   `src/data/light.ts` with Reshma's real copy for that story.

## Domain

The site is meant to live at **reshmamulik.com**. Reshma will register the
domain and connect it in Vercel's project settings after deploying — no
code changes needed for that.

## Deploying

See the full step-by-step guide (shared alongside this project) for how to
push this to GitHub and deploy it on Vercel.
