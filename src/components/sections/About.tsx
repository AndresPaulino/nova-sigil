"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { CrosshairMarker } from "@/components/ui/CrosshairMarker";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

// ─── Material Symbols (viewBox 0 -960 960 960) ───

const ICONS = {
  architecture:
    "M480-40v-200q-51-14-85.5-53T360-386v-94h-80v-200l200-120 200 120v200h-80v94q0 54-34.5 93T480-240v200h-80Zm0-346q17 0 28.5-11.5T520-426q0-17-11.5-28.5T480-466q-17 0-28.5 11.5T440-426q0 17 11.5 28.5T480-386Zm-80-174h160v-106l-80-48-80 48v106Z",
  auto_graph:
    "M200-120q-51 0-72.5-45.5T138-250l142-142q-3-12-2-25.5t7-25.5l-84-84q-14 5-28 .5T147-541l-57-57q-20-20-14.5-47t31.5-38q17-7 35-2t31 19l57 57q10 10 14.5 24t.5 28l84 84q12-6 25.5-7t25.5 2l172-172q-5-14-.5-28t14.5-24l57-57q13-13 31-18.5t35 2.5q26 11 31.5 38T742-738l-57 57q-10 10-24 14.5t-28 .5l-172 172q3 12 2 25.5t-7 25.5l62 62q14-5 28-.5t24 14.5l97 97q20 20 14.5 47T650-192q-17 7-35 2t-31-19l-97-97q-10-10-14.5-24t-.5-28l-62-62q-12 6-25.5 7t-25.5-2L218-276q5 14 .5 28T204-224l-14 14q-17 17-17 45t17 45h-70Z",
};

function MaterialIcon({
  name,
  className = "",
}: {
  name: keyof typeof ICONS;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={className}
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

// ─── Inline Seed of Life ───

function SeedOfLife({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 500" fill="none" className={className}>
      <g stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.6">
        <circle cx="250" cy="250" r="80" />
        <circle cx="250" cy="170" r="80" />
        <circle cx="319.28" cy="210" r="80" />
        <circle cx="319.28" cy="290" r="80" />
        <circle cx="250" cy="330" r="80" />
        <circle cx="180.72" cy="290" r="80" />
        <circle cx="180.72" cy="210" r="80" />
      </g>
      <circle cx="250" cy="250" r="88" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.35" />
      <circle cx="250" cy="250" r="164" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.2" />
    </svg>
  );
}

// ─── Data ───

const FEATURES = [
  {
    icon: "architecture" as const,
    title: "Immutable Quality",
    description:
      "We refuse to ship compromises. Performance and security are integrated into our core DNA.",
  },
  {
    icon: "auto_graph" as const,
    title: "Future-Proofed Logic",
    description:
      "Built to evolve. Our architectures are designed to grow with your ambition, not hinder it.",
  },
];

// ─── Animation ───

const bulletContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const bulletVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─── Component ───

export function About() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    const triggers: ScrollTrigger[] = [];

    // Left column: slide in from left
    const stLeft = ScrollTrigger.create({
      trigger: left,
      start: "top 80%",
      end: "top 40%",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(left, {
          x: -100 * (1 - p),
          opacity: p,
        });
      },
    });
    triggers.push(stLeft);

    // Right column: slide in from right
    const stRight = ScrollTrigger.create({
      trigger: right,
      start: "top 80%",
      end: "top 40%",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(right, {
          x: 100 * (1 - p),
          opacity: p,
        });
      },
    });
    triggers.push(stRight);

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="about" className="relative z-20 overflow-hidden bg-surface-alt px-8 py-28">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">
        {/* Corner crosshairs */}
        <CrosshairMarker className="absolute -top-8 left-0 text-label" />
        <CrosshairMarker className="absolute -top-8 right-0 text-label" />

        {/* LEFT — Sigil Visual */}
        <div
          ref={leftRef}
          className="relative"
          style={{ opacity: 0, transform: "translateX(-100px)" }}
        >
          <div className="aspect-square overflow-hidden">
            <SeedOfLife className="h-full w-full animate-[spin_60s_linear_infinite] text-white/[0.08] p-12" />
          </div>

          {/* Experience stat */}
          <div className="absolute -bottom-6 -right-6 hidden md:block">
            <span className="block font-headline text-[5rem] font-bold leading-none text-heading">
              12+
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-label">
              Years Experience
            </span>
          </div>
        </div>

        {/* RIGHT — Philosophy Text */}
        <div
          ref={rightRef}
          className="relative"
          style={{ opacity: 0, transform: "translateX(100px)" }}
        >
          <SectionNumber number="03" />
          {/* Heading crosshairs */}
          <CrosshairMarker className="absolute -left-8 top-8 text-label" />
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-label">
            The Philosophy
          </span>
          <h2 className="mt-4 font-headline text-4xl font-bold leading-tight text-heading md:text-5xl">
            <TextReveal>Craftsmanship and Precision.</TextReveal>
          </h2>
          <CrosshairMarker className="absolute -right-8 top-8 text-label" />
          <p className="mt-6 text-lg leading-relaxed text-body">
            At Nova Sigil, we believe software is not just a tool, but an
            expression of logic and intent. We approach every codebase with the
            same reverence a master smith gives to an heirloom blade.
          </p>

          {/* Feature bullets */}
          <motion.div
            className="mt-10 flex flex-col gap-8"
            variants={bulletContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {FEATURES.map((feat) => (
              <motion.div
                key={feat.title}
                variants={bulletVariants}
              >
                <SpotlightCard className="flex gap-5 rounded-lg p-4 -m-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20">
                    <MaterialIcon name={feat.icon} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-heading">
                      {feat.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-body">
                      {feat.description}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
