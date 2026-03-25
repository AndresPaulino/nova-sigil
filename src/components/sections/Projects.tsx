"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { CrosshairMarker } from "@/components/ui/CrosshairMarker";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { lenisState } from "@/lib/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

// ─── Inline Geometric SVGs ───

function SquareNest({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="40" y="40" width="320" height="320" stroke="currentColor" strokeWidth="1" />
      <rect x="80" y="80" width="240" height="240" stroke="currentColor" strokeWidth="1" />
      <rect x="120" y="120" width="160" height="160" stroke="currentColor" strokeWidth="1" />
      <rect x="160" y="160" width="80" height="80" stroke="currentColor" strokeWidth="1" />
      <line x1="40" y1="40" x2="160" y2="160" stroke="currentColor" strokeWidth="0.5" />
      <line x1="360" y1="40" x2="240" y2="160" stroke="currentColor" strokeWidth="0.5" />
      <line x1="40" y1="360" x2="160" y2="240" stroke="currentColor" strokeWidth="0.5" />
      <line x1="360" y1="360" x2="240" y2="240" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

function DiamondCircle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1" />
      <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="0.5" />
      <polygon
        points="200,50 350,200 200,350 50,200"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <polygon
        points="200,100 300,200 200,300 100,200"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
      />
      <line x1="200" y1="40" x2="200" y2="360" stroke="currentColor" strokeWidth="0.3" />
      <line x1="40" y1="200" x2="360" y2="200" stroke="currentColor" strokeWidth="0.3" />
    </svg>
  );
}

function InfinityLoop({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M200 200 C200 140, 300 100, 340 160 C380 220, 280 280, 200 200 C200 200, 120 120, 60 160 C20 220, 100 280, 200 200Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M200 200 C200 160, 280 120, 320 170 C360 220, 260 260, 200 200 C200 200, 140 140, 80 170 C40 220, 120 260, 200 200Z"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <circle cx="130" cy="200" r="60" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="270" cy="200" r="60" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="200" cy="200" r="4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// ─── Data ───

interface Project {
  title: string;
  category: string;
  description: string;
  featured: boolean;
  visual: (className?: string) => ReactNode;
}

const PROJECTS: Project[] = [
  {
    title: "Vanguard OS",
    category: "Enterprise / ERP",
    description:
      "A modular operating system for enterprise resource planning. Built for scale, designed for clarity.",
    featured: false,
    visual: (className) => <SquareNest className={className} />,
  },
  {
    title: "Aetherium SaaS",
    category: "Fintech / Analytics",
    description:
      "Real-time financial analytics platform processing millions of transactions with sub-second latency.",
    featured: true,
    visual: (className) => <DiamondCircle className={className} />,
  },
  {
    title: "Lumina Automate",
    category: "IoT / Integration",
    description:
      "Autonomous integration fabric connecting thousands of IoT endpoints into a unified control plane.",
    featured: false,
    visual: (className) => <InfinityLoop className={className} />,
  },
];

// ─── Component ───

export function Projects() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    const hint = hintRef.current;
    if (!pin || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const cards = track.querySelectorAll<HTMLElement>("[data-project-card]");
      const visuals = track.querySelectorAll<HTMLElement>(
        "[data-project-visual]",
      );

      const totalWidth = track.scrollWidth;
      const vw = window.innerWidth;
      const scrollDistance = totalWidth - vw;
      if (scrollDistance <= 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: `+=${scrollDistance * 2}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Fade out scroll hint
            if (hint) {
              gsap.set(hint, {
                opacity: Math.max(0, 1 - self.progress * 5),
              });
            }
          },
        },
      });

      tl.to(track, { x: -scrollDistance, ease: "none" });

      // Parallax on visuals at 0.5x rate
      visuals.forEach((visual) => {
        gsap.to(visual, {
          x: scrollDistance * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: `+=${scrollDistance * 2}`,
            scrub: 1,
          },
        });
      });

      // Velocity-based skew on cards
      const skewSetters = Array.from(cards).map((card) =>
        gsap.quickTo(card, "skewX", { duration: 0.4, ease: "power2.out" }),
      );

      const onTick = () => {
        const clamped = Math.max(
          -3,
          Math.min(3, lenisState.velocity * 0.3),
        );
        skewSetters.forEach((setter) => setter(clamped));
      };
      gsap.ticker.add(onTick);

      // Staggered card reveals
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          filter: "blur(4px)",
          duration: 0.6,
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: "left 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      return () => {
        gsap.ticker.remove(onTick);
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id="projects" className="relative z-20 bg-surface">
      {/* Header — normal flow, scrolls away before pin */}
      <div className="relative mx-auto max-w-7xl px-8 pt-28 pb-16">
        <CrosshairMarker className="absolute -top-8 left-0 text-label" />
        <CrosshairMarker className="absolute -top-8 right-0 text-label" />
        <SectionNumber number="02" />
        <CrosshairMarker className="absolute -left-8 top-8 text-label" />
        <span className="font-mono text-xs uppercase tracking-widest text-label">
          Portfolio
        </span>
        <h2 className="mt-4 font-headline text-5xl font-bold text-heading md:text-6xl">
          <TextReveal>Selected Case Studies</TextReveal>
        </h2>
        <CrosshairMarker className="absolute -right-8 top-8 text-label" />
      </div>

      {/* Desktop: Horizontal scroll (pinned) */}
      <div
        ref={pinRef}
        className="relative hidden h-screen md:flex items-center overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex gap-8 px-[4vw]"
          style={{ willChange: "transform" }}
        >
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              data-project-card
              className="w-[80vw] shrink-0 group"
            >
              <SpotlightCard
                className={`relative aspect-[16/10] overflow-hidden rounded-lg border border-divider bg-surface-card transition-all duration-300 group-hover:border-divider-hover ${
                  project.featured ? "glow-white" : ""
                }`}
              >
                {/* Abstract geometric visual */}
                <div
                  data-project-visual
                  className="absolute inset-0 flex items-center justify-center p-12"
                >
                  {project.visual(
                    "h-full w-full text-white/10 transition-all duration-500 group-hover:text-white/20",
                  )}
                </div>

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface-card/90 to-transparent" />

                {/* Category + title */}
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-label">
                    {project.category}
                  </span>
                  <h3 className="mt-2 font-headline text-3xl font-bold text-heading">
                    {project.title}
                  </h3>
                </div>
              </SpotlightCard>

              {/* Description */}
              <div className="mt-6">
                <p className="leading-relaxed text-body">
                  {project.description}
                </p>
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-body transition-colors duration-300 hover:text-accent"
                >
                  View Case Study
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="absolute right-8 top-1/2 flex -translate-y-1/2 items-center gap-3"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-label">
            Scroll to explore
          </span>
          <span className="text-label">&rarr;</span>
        </div>
      </div>

      {/* Mobile: Stacked cards */}
      <div className="grid gap-8 px-8 pb-28 md:hidden">
        {PROJECTS.map((project) => (
          <article key={project.title} className="group">
            <SpotlightCard className="relative aspect-[4/5] overflow-hidden rounded-lg border border-divider bg-surface-card transition-all duration-300 group-hover:border-divider-hover">
              <div className="absolute inset-0 flex items-center justify-center p-12">
                {project.visual(
                  "h-full w-full text-white/10 transition-all duration-500 group-hover:text-white/20",
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface-card/90 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-label">
                  {project.category}
                </span>
                <h3 className="mt-1 font-headline text-2xl font-bold text-heading">
                  {project.title}
                </h3>
              </div>
            </SpotlightCard>
            <div className="mt-4">
              <p className="leading-relaxed text-body">
                {project.description}
              </p>
              <a
                href="#contact"
                className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-body transition-colors duration-300 hover:text-accent"
              >
                View Case Study <span>&rarr;</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
