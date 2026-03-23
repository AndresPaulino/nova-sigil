import { HeroCanvas } from "@/components/three/HeroCanvas";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background sigil watermark */}
      <img
        src="/sigils/hero-sigil.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-auto h-[80vh] w-[80vh] select-none opacity-[0.07]"
      />

      {/* 3D scene (behind text) */}
      <HeroCanvas />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* Pill badge */}
        <div className="flex items-center gap-2 rounded-full border border-outline-variant/10 bg-surface-container/60 px-4 py-2 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-xs font-label font-medium uppercase tracking-widest text-on-surface-variant">
            Architecting the Future
          </span>
        </div>

        {/* LCP headline — Server-rendered, NOT inside Canvas */}
        <h1 className="font-headline text-6xl font-bold tracking-tighter md:text-8xl">
          <span className="text-on-surface">Nova </span>
          <span className="text-primary">Sigil</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg font-light text-on-surface-variant md:text-2xl">
          Crafting digital sigils of power. We transmute complex challenges into
          elegant software solutions.
        </p>

        {/* CTA button */}
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
