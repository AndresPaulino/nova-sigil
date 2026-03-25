import { HeroCanvas } from "@/components/three/HeroCanvas";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { HeroStats } from "@/components/ui/HeroStats";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative z-[1] flex min-h-screen items-center overflow-hidden bg-surface"
    >
      {/* Background sigil watermark */}
      <img
        src="/sigils/hero-sigil.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-auto h-[80vh] w-[80vh] select-none opacity-[0.03] animate-[breathe_30s_ease-in-out_infinite_alternate]"
      />

      {/* 3D scene (right-anchored, ~50% width) */}
      <HeroCanvas />

      {/* Content: left-aligned, constrained to max-w-7xl */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-8">
        {/* Pill badge */}
        <div className="mb-8 flex w-fit items-center gap-2 rounded-full border border-divider bg-surface-alt/60 px-4 py-2 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-xs font-body font-medium uppercase tracking-widest text-label">
            Architecting the Future
          </span>
        </div>

        {/* LCP headline — Server-rendered, NOT inside Canvas */}
        <h1 className="font-headline text-[12vw] font-bold leading-none tracking-[-0.04em] md:text-[10vw]">
          <TextReveal variant="inscribe" stagger={0.04} className="text-heading">Nova</TextReveal>
          {" "}
          <TextReveal variant="inscribe" stagger={0.04} delay={0.4} className="gold-gradient-text">Sigil</TextReveal>
        </h1>

        {/* Subtitle with thin gold vertical line */}
        <div className="mt-8 flex max-w-xl items-start gap-6">
          <div className="h-16 w-px shrink-0 bg-accent/30" />
          <p className="text-xl font-body font-light text-body">
            Crafting digital sigils of power. We transmute complex challenges into
            elegant software solutions.
          </p>
        </div>

        {/* CTA button */}
        <div className="mt-8">
          <MagneticButton>
            <a
              href="#contact"
              className="inline-block rounded-md bg-accent px-10 py-5 text-base font-bold text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(200,168,78,0.3)]"
            >
              Start Your Project
            </a>
          </MagneticButton>
        </div>
      </div>

      <HeroStats delay={1.5} />

      {/* Scroll-to-explore hint */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-label">
          Scroll to Explore
        </span>
        <div className="relative h-10 w-px overflow-hidden">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-label to-transparent" />
        </div>
      </div>
    </section>
  );
}
