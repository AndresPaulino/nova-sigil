Create a new page section for the Nova Sigil landing page.
Section name: $ARGUMENTS
Follow the architecture pattern from the nova-sigil-build skill:
1. Server Component wrapper in src/components/sections/
2. Client animation component with "use client"
3. If 3D is needed, dynamically import with ssr: false
4. Use Tailwind classes from our design token system
5. Add Framer Motion entrance animation with viewport trigger
Make it visually striking — use the sigil-glow and glass-panel effects where appropriate.