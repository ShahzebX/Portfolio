# Portfolio

<!-- Badges -->
[![CI](https://github.com/ShahzebX/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/ShahzebX/portfolio/actions)
[![Node Version](https://img.shields.io/badge/node-20.x-brightgreen)](https://nodejs.org/)

This is my personal portfolio built with Next.js and Tailwind CSS. It showcases projects, blog posts, and a professional About/CV page. All UI is custom — no third-party UI kits are required.

![Portfolio screenshot](public/images/og/home.jpg)

## Quickstart

1. Clone the repository

```bash
git clone https://github.com/ShahzebX/portfolio.git
cd portfolio
```

2. Install dependencies

```bash
npm install
```

3. Start the dev server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
npm start
```

## Project structure

- `src/app` — Next.js App Router pages and layout
- `src/components` — React components used across the site
- `src/resources` — Content and configuration (`content.tsx`, `config.ts`)
- `src/app/blog/posts` — Blog MDX files
- `src/app/work/projects` — Project MDX files

## Configuration

- Edit site content in `src/resources/content.tsx`.
- Edit site-level configuration in `src/resources/config.ts`.

## Features

- MDX-based content system for blog posts and project pages
- Static generation and SSG for posts and projects
- Tailwind CSS-based styling (CSS-first config)
- Custom icon mapping via `src/resources/icons.ts`

## Screenshots

![Homepage](public/images/og/home.jpg)

## Contributing & CI

- CI workflow added at `.github/workflows/ci.yml` — it installs dependencies and runs `npm run build` on push and PRs.
- See `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` for contribution guidelines.

## Development notes

- Node.js >= 18 recommended.
- Run `npm run dev` and open `http://localhost:3000`.

## License

See [LICENSE](LICENSE) in the repo root for license details.

## Deploy

You can deploy this repo to Vercel or any Node-friendly host. For Vercel, connect the GitHub repo and use the default Next.js settings.

---

If you'd like the README expanded (contributing, CI, screenshots, or showcase), tell me what content to add.