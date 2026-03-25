# Nova Sigil Design Tokens

## Colors — Luxury Black/White/Gray with Restrained Gold Accents

### Background Tiers
- `--bg-primary` / `bg-surface`: #000000 (pure black — hero, footer)
- `--bg-secondary` / `bg-surface-alt`: #0a0a0a (near-black — main sections)
- `--bg-tertiary` / `bg-surface-card`: #111111 (dark gray — card backgrounds)
- `--bg-elevated` / `bg-surface-elevated`: #1a1a1a (elevated surfaces — hover cards, form)

### Text Tiers
- `--text-primary` / `text-heading`: #ffffff (headings, hero text)
- `--text-secondary` / `text-body`: #999999 (body copy, descriptions)
- `--text-tertiary` / `text-label`: #555555 (labels, meta text, section numbers)
- `--text-muted` / `text-muted`: #333333 (decorative numbers, bg text)

### Accent (Gold — RARE, only CTAs and key highlights)
- `--accent` / `text-accent` / `bg-accent`: #c8a84e (muted luxury gold)
- `--accent-hover` / `bg-accent-hover`: #dabb65 (lighter gold for hover)

Gold appears ONLY on:
1. The word "Sigil" in the hero headline (`.gold-gradient-text`)
2. CTA button backgrounds (`bg-accent`)
3. Active/focused form input borders (`focus:border-accent`)
4. The accent dot in the hero pill badge

### Borders
- `--border-default` / `border-divider`: #1a1a1a (subtle dividers)
- `--border-hover` / `border-divider-hover`: #333333 (hover state)

## Typography
- Headlines: Space Grotesk (300–700) — `font-headline`
- Body/Labels: Outfit (200–700) — `font-body`
- Monospace: JetBrains Mono (200–300) — `font-mono`
- Hero h1: 6rem–8rem, tracking-tighter, font-bold
- Section h2: 3rem–5rem, font-bold

## Borders
- Default radius: 0.125rem (sharp, intentional)
- Cards: border-t with divider, bg surface-card
- Buttons: rounded-md with accent glow on hover

## Effects
- glow-white: box-shadow 0 0 40px rgba(255,255,255,0.03)
- glow-accent: box-shadow 0 0 30px rgba(200,168,78,0.15)
- glass-panel: backdrop-blur(24px)
- Noise overlay: white feTurbulence at 2% opacity over background
- Selection: bg-[#c8a84e] text-black (gold selection is the one luxe touch)
