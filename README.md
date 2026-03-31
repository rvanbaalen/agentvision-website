# Agent Vision Website

Marketing website for [Agent Vision](https://github.com/rvanbaalen/agent-vision), a macOS CLI tool that gives AI agents eyes and hands on screen.

**Live:** https://agentvision.robinvanbaalen.nl

## Tech Stack

- [Astro](https://astro.build) v6 (static site generator)
- [TailwindCSS](https://tailwindcss.com) v4
- TypeScript
- [Cloudflare Pages](https://pages.cloudflare.com) (hosting)

## The Living Overlay

The site features a "Living Overlay" effect: as you scroll, a scan line sweeps across each section and discovers the page's own DOM elements, drawing green bounding boxes with element IDs around them. This demonstrates what Agent Vision does (discover UI elements on screen) using the website itself as the demo. The overlay is purely visual and never intercepts clicks.

## Development

```bash
npm install
npm run dev
```

Dev server starts at `http://localhost:4321`.

## Build

```bash
npm run build
```

Outputs to `dist/` with the Cloudflare adapter.

## Deploy

```bash
npx wrangler pages deploy dist
```

Or connect the repo to Cloudflare Pages for automatic deploys on push to `main`.

## Project Structure

```
src/
├── components/     # TerminalFrame, StatusBar
├── data/           # Use case content (shared between homepage and case pages)
├── layouts/        # Base HTML layout with meta tags
├── pages/
│   ├── index.astro          # Homepage (8 sections)
│   └── cases/[slug].astro   # Dynamic use case pages (8 pages)
├── scripts/        # Living Overlay scan system
└── styles/         # Global CSS + Tailwind config
```
