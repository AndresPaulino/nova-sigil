# Nova Sigil Design Tokens

## Colors (from Stitch Material Design export)
- `--background`: #0c1322 (surface-container-lowest: #070e1d)
- `--primary`: #f2ca50 (gold)
- `--primary-container`: #d4af37 (darker gold, for buttons)
- `--on-primary`: #3c2f00 (text on gold)
- `--on-surface`: #dce2f8 (primary text on dark)
- `--on-surface-variant`: #d0c5af (secondary text)
- `--surface-container`: #191f2f
- `--surface-container-high`: #232a3a
- `--outline-variant`: #4d4635

## Typography
- Headlines: Space Grotesk (300–700)
- Body/Labels: Manrope (200–700)
- Hero h1: 6rem–8rem, tracking-tighter, font-bold
- Section h2: 3rem–5rem, font-bold

## Borders
- Default radius: 0.125rem (sharp, intentional)
- Cards: border-t with outline-variant/10, bg surface-container-low
- Buttons: rounded-md with gold glow on hover

## Effects
- sigil-glow: box-shadow 0 0 40px rgba(242, 202, 80, 0.08)
- glass-panel: backdrop-blur(24px)
- Noise overlay: feTurbulence at 3-5% opacity over background