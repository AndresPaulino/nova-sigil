import { HeroCanvas } from "@/components/three/HeroCanvas";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { HeroStats } from "@/components/ui/HeroStats";

export function Hero() {
  return (
    <section
      id="hero"
      className="sticky top-0 relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background sigil watermark */}
      <img
        src="/sigils/hero-sigil.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-auto h-[80vh] w-[80vh] select-none opacity-[0.04] animate-[breathe_30s_ease-in-out_infinite_alternate]"
      />

      {/* 3D scene (right-anchored) */}
      <HeroCanvas />

      {/* Content: left-anchored, full height */}
      <div className="relative z-10 flex min-h-screen w-full flex-col justify-center px-8 md:px-16 lg:px-24">
        {/* Pill badge */}
        <div className="mb-8 flex w-fit items-center gap-2 rounded-full border border-outline-variant/10 bg-surface-container/60 px-4 py-2 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-xs font-label font-medium uppercase tracking-widest text-on-surface-variant">
            Architecting the Future
          </span>
        </div>

        {/* LCP headline — Server-rendered, NOT inside Canvas */}
        <h1 className="font-headline text-[12vw] font-bold leading-none tracking-[-0.05em] md:text-[10vw]">
          <TextReveal variant="inscribe" className="text-on-surface">Nova</TextReveal>
          {" "}
          <TextReveal variant="inscribe" delay={0.24} className="text-primary">Sigil</TextReveal>
        </h1>

        {/* Subtitle with gold accent bar */}
        <div className="mt-8 flex max-w-xl items-start gap-6">
          <div className="h-16 w-px shrink-0 bg-primary/30" />
          <p className="text-lg font-light text-on-surface-variant md:text-xl">
            Crafting digital sigils of power. We transmute complex challenges into
            elegant software solutions.
          </p>
        </div>

        {/* CTA button */}
        <div className="mt-8">
          <MagneticButton>
            <a
              href="#contact"
              className="group flex items-center gap-3 rounded-md bg-primary-container px-8 py-4 text-base font-semibold text-on-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(242,202,80,0.25)]"
            >
              Start Your Project
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 -960 960 960"
                fill="currentColor"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
            </a>
          </MagneticButton>
        </div>
      </div>

      <HeroStats delay={1.2} />

      {/* Scroll-to-explore hint */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-variant/50">
          Scroll to Explore
        </span>
        <div className="relative h-10 w-px overflow-hidden">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-primary/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
