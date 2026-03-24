"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/ui/TextReveal";

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
      {/* Diagonal connectors */}
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
      {/* Diamond */}
      <polygon
        points="200,50 350,200 200,350 50,200"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      {/* Inner diamond */}
      <polygon
        points="200,100 300,200 200,300 100,200"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
      />
      {/* Cross hairs */}
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
      {/* Infinity / lemniscate paths */}
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
      {/* Orbital circles */}
      <circle cx="130" cy="200" r="60" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="270" cy="200" r="60" stroke="currentColor" strokeWidth="0.5" />
      {/* Center node */}
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

// ─── Animation ───

const cardVariants = {
  hidden: { y: 40, opacity: 0, filter: "blur(4px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─── Component ───

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Skip horizontal scroll on mobile
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const cards = track.querySelectorAll<HTMLElement>("[data-project-card]");
      const visuals = track.querySelectorAll<HTMLElement>("[data-project-visual]");

      // Calculate scroll distance
      const totalTrackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalTrackWidth - viewportWidth;

      if (scrollDistance <= 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance * 1.5}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Translate the track
      tl.to(track, {
        x: -scrollDistance,
        ease: "none",
      });

      // Parallax on visuals at 0.5x rate
      visuals.forEach((visual) => {
        gsap.to(visual, {
          x: scrollDistance * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${scrollDistance * 1.5}`,
            scrub: 1,
          },
        });
      });

      // Stagger card reveals
      cards.forEach((card, i) => {
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
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-20 overflow-hidden bg-surface-container-lowest px-8 py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
            Portfolio
          </span>
          <h2 className="mt-4 font-headline text-5xl font-bold text-on-surface md:text-6xl">
            <TextReveal>Selected Case Studies</TextReveal>
          </h2>
        </div>

        {/* Project Track */}
        <div
          ref={trackRef}
          className="grid gap-8 md:flex md:gap-8"
          style={{ willChange: "transform" }}
        >
          {PROJECTS.map((project) => (
            <motion.article
              key={project.title}
              data-project-card
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className={`group md:w-[80vw] md:shrink-0 ${project.featured ? "md:translate-y-12" : ""}`}
            >
              {/* Image container */}
              <div
                className={`relative aspect-[4/5] md:aspect-[16/10] overflow-hidden border border-outline-variant/10 bg-surface-container-low transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/30 ${
                  project.featured ? "sigil-glow" : ""
                }`}
              >
                {/* Abstract geometric visual */}
                <div
                  data-project-visual
                  className="absolute inset-0 flex items-center justify-center p-12"
                >
                  {project.visual(
                    "h-full w-full text-primary/20 transition-colors duration-500 group-hover:text-primary/40",
                  )}
                </div>

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface-container-lowest/90 to-transparent" />

                {/* Category + title over image */}
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">
                    {project.category}
                  </span>
                  <h3 className="mt-1 font-headline text-2xl font-bold text-on-surface">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <p className="leading-relaxed text-on-surface-variant">
                  {project.description}
                </p>
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary transition-opacity duration-300 hover:opacity-80"
                >
                  View Case Study
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
