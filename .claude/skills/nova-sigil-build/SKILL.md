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
- Background tiers: #000000 (surface) | #0a0a0a (surface-alt) | #111111 (surface-card)
- Text: #ffffff (heading) | #999999 (body) | #555555 (label) | #333333 (muted)
- Gold accent (RARE — CTAs, "Sigil" text, focused inputs only): #c8a84e | hover: #dabb65
- Fonts: Space Grotesk (headlines), Outfit (body), JetBrains Mono (mono)
- All 3D materials use emissiveIntensity > 2 with toneMapped={false}
- Bloom: luminanceThreshold={2.5}, intensity={0.3}
- Noise overlay at 2% opacity on body

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
- Fragment shader: cosine palette mapping with emissive white/gray tones
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