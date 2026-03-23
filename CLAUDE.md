# Nova Sigil — Interactive Landing Page

## Project Overview
Award-caliber landing page for Nova Sigil, a software development studio.
Dark navy (#0c1322) + gold (#f2ca50, #d4af37) palette with occult sigil motifs.
Built with Next.js 15 App Router, TypeScript strict mode, Tailwind CSS.

## Tech Stack
- Next.js 15 (App Router, Server Components by default)
- TypeScript strict — no `any` types
- Tailwind CSS with custom theme extending the Stitch design tokens
- React Three Fiber + drei + postprocessing for 3D
- GSAP + ScrollTrigger for scroll-driven animation
- Framer Motion for section reveals, text animations, magnetic buttons
- Lenis for smooth scrolling

## Architecture
- `/src/app` — Pages and layouts (Server Components)
- `/src/components/ui` — Reusable UI (buttons, text, nav)
- `/src/components/three` — All R3F components (Canvas, scenes, geometries)
- `/src/components/sections` — Page sections (Hero, Services, About, Contact)
- `/src/lib` — Utilities, hooks, constants
- `/src/shaders` — GLSL vertex/fragment shaders as .glsl files

## Critical Rules
- ALL Three.js/R3F components MUST be client components with "use client"
- ALL R3F components MUST be dynamically imported with `ssr: false`
- The hero <h1> is the LCP element — render it as a Server Component, NOT inside Canvas
- NEVER put Three.js imports in Server Components
- Use `toneMapped={false}` on emissive materials for HDR bloom
- Use Tailwind theme colors from @docs/design-tokens.md — never hardcode hex
- Prefer named exports over default exports

## Design Tokens
See @docs/design-tokens.md for the full color system, typography, and spacing.

## Commands
- `npm run dev` — Start dev server (port 3000)
- `npm run build` — Production build
- `npm run lint` — ESLint check

## Compaction Rules
When compacting, always preserve: the list of modified files, the current section
being worked on, and any shader uniform names/types.