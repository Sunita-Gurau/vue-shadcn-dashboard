# Vue shadcn Dashboard Starter

Scaffolded dashboard project powered by Vue 3, Vite, Tailwind CSS, Pinia, Vue Router, and shadcn-vue components. Use this starter to build a finance-style analytics dashboard like the provided mock screenshot.

## Tech stack

- Vue 3 with `<script setup>` SFCs
- Vite build & dev server
- TypeScript tooling (`tsconfig.json`, `jsconfig.json`, `vue-tsc`)
- Tailwind CSS with shadcn design tokens (`tailwind.config.cjs`, `src/style.css`)
- Vue Router (`src/router/index.ts`)
- Pinia state management (`src/main.ts`)
- shadcn-vue UI primitives (`components.json`, `src/components/ui/`)

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to view the dashboard shell and sample widgets.

## Scripts

```bash
npm run dev         # Start Vite dev server
npm run build       # Production build
npm run preview     # Preview production build
npm run type-check  # Run vue-tsc for static type checks
npm run format      # Format with Prettier
```

## Project structure highlights

- `src/main.ts` — app entry wiring Vue, Pinia, Router, and global styles
- `src/app.vue` — layout shell with sidebar and header
- `src/router/index.ts` — route definitions (root mapped to dashboard page)
- `src/pages/dashboard-page.vue` — finance dashboard widgets example
- `src/components/ui/` — shadcn-vue UI exports
- `tailwind.config.cjs` — Tailwind configuration with shadcn tokens
- `src/style.css` — Tailwind base layers + CSS variables


