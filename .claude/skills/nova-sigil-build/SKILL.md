---
name: nova-sigil-build
description: >
  Build interactive sections for the Nova Sigil landing page using the project's
  dark navy/gold design system with scroll-reactive Three.js sigil geometry,
  GSAP ScrollTrigger orchestration, and Framer Motion reveals. Use this skill
  whenever working on Nova Sigil page sections, 3D scenes, scroll animations,
  or component styling. Also trigger when the user mentions sigils, sacred geometry,
  bloom effects, scroll-driven 3D, or section transitions.
---

# Nova Sigil Build Skill

## Design System Quick Reference
- Background: #0c1322 | Gold: #f2ca50 | Gold dark: #d4af37
- Fonts: Space Grotesk (headlines), Manrope (body)
- All 3D materials use emissiveIntensity > 2 with toneMapped={false}
- Bloom: luminanceThreshold={1}, intensity={2}, radius={0.4}
- Noise overlay at 3-5% opacity on all dark sections

## Architecture Pattern
Every page section follows this pattern:
1. Server Component wrapper (for SEO/LCP)
2. Client component for animations ("use client")
3. 3D canvas dynamically imported with ssr: false
4. GSAP ScrollTrigger for scroll-driven behavior
5. Framer Motion for entrance animations

## 3D Sigil Implementation
- Central sigil: IcosahedronGeometry(1, 64) with custom ShaderMaterial
- Vertex shader: Perlin noise displacement bound to scroll uniform
- Fragment shader: cosine palette mapping gold (#f2ca50) to navy (#0c1322)
- Mouse parallax: camera.position.lerp(mouse * 2, 0.02)
- Scroll velocity feeds into shader uStrength for "charging" effect
- Post-processing: Bloom (mipmapBlur, threshold=1) + Vignette

## Framer Motion Patterns
- Text reveals: character-by-character with inline-block spans
- Section entrance: y: 40, opacity: 0, filter: blur(4px)
- Magnetic buttons: useMotionValue + useSpring (never useState for mouse)
- Stagger children: delayChildren: 0.1, staggerChildren: 0.05

## GSAP Patterns
- Horizontal scroll for portfolio: ScrollTrigger pin + xPercent
- Navbar pill transform: toggleClass at scrollY > 80
- Count-up stats: easeOutExpo with IntersectionObserver trigger

## Performance Rules
- Dynamic import ALL R3F with next/dynamic({ ssr: false })
- PerformanceMonitor: drop DPR on decline, disable bloom on low FPS
- useDetectGPU: tier-0 devices get CSS-only fallback
- Hero h1 is LCP — always server-rendered HTML, never inside Canvas
- Respect prefers-reduced-motion: set frameloop="demand"

See @docs/design-tokens.md for full color/typography tokens.