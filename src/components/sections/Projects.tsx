"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { CrosshairMarker } from "@/components/ui/CrosshairMarker";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { lenisState } from "@/lib/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ───

interface Project {
  title: string;
  category: string;
  description: string;
  featured: boolean;
  href: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    title: "DocuSign Orchestration for Complex Entity Structures",
    category: "Financial Services / Document Automation",
    description:
      "Built a custom API (Python/Flask) that automates document assembly, signer routing, and tab placement for complex legal entity onboarding. Handles LLCs, trusts, and multi-signer corporate accounts. Replaced a 30+ minute manual process with instant automated generation.",
    featured: false,
    href: "/projects/docusign-orchestration",
    image: "/case_studies/docusign.png",
  },
  {
    title: "Digital Onboarding Modernization",
    category: "Financial Services / Platform Engineering",
    description:
      "Automated PDF generation from KYC data, pre-populated external platform account forms (Pershing), and redesigned multi-step advisor workflows. Dozens of targeted improvements that compounded into a fundamentally faster onboarding process.",
    featured: true,
    href: "/projects/onboarding-modernization",
    image: "/case_studies/forms_automation.png",
  },
  {
    title: "Multi-Location Data Extraction Tool",
    category: "Automation / Data Engineering",
    description:
      "Python/Playwright automation that logs into 600+ accounts on a third-party platform, extracts operational data, and compiles structured Excel reports. Runs overnight on a schedule. Delivered as a standalone desktop app with GUI, progress tracking, and email notifications.",
    featured: false,
    href: "/projects/automated-data-extraction",
    image: "/case_studies/parking_automation.png",
  },
];

// ─── Component ───

export function Projects() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const cards = track.querySelectorAll<HTMLElement>("[data-project-card]");

      const totalWidth = track.scrollWidth;
      const vw = window.innerWidth;
      const scrollDistance = totalWidth - vw;
      if (scrollDistance <= 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: `+=${scrollDistance * 1.5}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { x: -scrollDistance, ease: "none" });

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
    <section id="projects" className="relative z-20 bg-black/95">
      {/* Header — normal flow, scrolls away before pin */}
      <div className="relative mx-auto max-w-7xl px-8 pt-28 pb-16">
        <CrosshairMarker className="absolute -top-8 left-0 text-label" />
        <CrosshairMarker className="absolute -top-8 right-0 text-label" />
        <SectionNumber number="02" />
        <CrosshairMarker className="absolute -left-8 top-8 text-label" />
        <span className="font-mono text-xs uppercase tracking-widest text-label">
          Capabilities
        </span>
        <h2 className="mt-4 font-headline text-5xl font-bold text-heading md:text-6xl">
          <TextReveal>Selected Projects</TextReveal>
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
              className="w-[70vw] shrink-0 group"
            >
              <a href={project.href} className="block">
                <SpotlightCard
                  className={`relative aspect-[16/9] overflow-hidden rounded-lg border border-divider bg-surface-card transition-all duration-300 group-hover:border-divider-hover ${
                    project.featured ? "glow-white" : ""
                  }`}
                >
                  {/* Screenshot visual */}
                  <div
                    className="absolute inset-0"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover object-top opacity-60 transition-opacity duration-500 group-hover:opacity-80"
                    />
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
              </a>

              {/* Description */}
              <div className="mt-6">
                <p className="leading-relaxed text-body">
                  {project.description}
                </p>
                <a
                  href={project.href}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-body transition-colors duration-300 hover:text-accent"
                >
                  Discuss Your Project
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Mobile: Stacked cards */}
      <div className="grid gap-8 px-8 pb-28 md:hidden">
        {PROJECTS.map((project) => (
          <article key={project.title} className="group">
            <a href={project.href} className="block">
              <SpotlightCard className="relative aspect-[4/5] overflow-hidden rounded-lg border border-divider bg-surface-card transition-all duration-300 group-hover:border-divider-hover">
                <div className="absolute inset-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover object-top opacity-60 transition-opacity duration-500 group-hover:opacity-80"
                  />
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
            </a>
            <div className="mt-4">
              <p className="leading-relaxed text-body">
                {project.description}
              </p>
              <a
                href={project.href}
                className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-body transition-colors duration-300 hover:text-accent"
              >
                Discuss Your Project <span>&rarr;</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
