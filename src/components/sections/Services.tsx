"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionNumber } from "@/components/ui/SectionNumber";

gsap.registerPlugin(ScrollTrigger);

// ─── Material Symbols Outlined (viewBox 0 -960 960 960) ───

const ICONS = {
  code: "M320-240 80-480l240-240 57 57-184 183 184 183-57 57Zm320 0-57-57 184-183-184-183 57-57 240 240-240 240Z",
  cloud_done:
    "M424-328 292-460l56-56 76 76 148-148 56 56-204 204ZM260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Z",
  hub: "M480-80q-33 0-56.5-23.5T400-160q0-23 12.5-42.5T445-232v-128q-20-8-36-21.5T383-410l-111 64q5 13 6.5 26.5T280-293q0 56-39 94.5T147-160q-56 0-95.5-39T13-293q0-56 39-95.5t94-39.5q17 0 33 4t31 12l111-64q-3-7-5-14.5t-2-15.5q0-8 2-15.5t5-14.5l-111-64q-15 8-31 12t-33 4q-55 0-94-39.5T13-667q0-56 38.5-95.5T147-802q56 0 94 39.5t38 95.5q0 13-1.5 26.5T271-614l111 64q10-15 26-28.5t36-21.5v-128q-20-10-32.5-29T399-800q0-33 23.5-56.5T479-880q33 0 56.5 23.5T559-800q0 24-12.5 42.5T514-728v128q20 8 36 21.5t26 28.5l111-64q-5-13-6.5-26.5T679-667q0-56 38-95.5t94-39.5q56 0 95.5 39.5T945-667q0 56-39.5 95.5T811-532q-17 0-33-4t-31-12L636-484q3 7 5 14.5t2 15.5q0 8-2 15.5t-5 14.5l111 64q15-8 31-12t33-4q56 0 95.5 39.5T945-293q0 55-39.5 94.5T811-160q-55 0-94-38.5T679-293q0-13 1.5-26.5T687-346l-111-64q-10 15-26 28.5T514-360v128q20 10 32.5 29.5T559-160q0 33-23.5 56.5T479-80Z",
} as const;

type IconName = keyof typeof ICONS;

function MaterialIcon({
  name,
  size = 48,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={className}
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

// ─── Data ───

const SERVICES = [
  {
    title: "Custom Development",
    icon: "code" as IconName,
    description:
      "Bespoke software engines engineered for performance, security, and scalability.",
    featured: false,
  },
  {
    title: "SaaS Products",
    icon: "cloud_done" as IconName,
    description:
      "Architecture for the modern web. We build resilient SaaS ecosystems that scale with your ambition.",
    featured: true,
  },
  {
    title: "Automation & Integration",
    icon: "hub" as IconName,
    description:
      "Connecting the disparate. We build the invisible nervous systems that power seamless operations.",
    featured: false,
  },
] as const;

// ─── Animation Variants ───

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

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

export function Services() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const words = heading.querySelectorAll<HTMLSpanElement>("[data-scroll-word]");
    const triggers: ScrollTrigger[] = [];

    words.forEach((word, i) => {
      const st = ScrollTrigger.create({
        trigger: heading,
        start: "top 80%",
        end: "top 40%",
        scrub: 0.5,
        onUpdate: (self) => {
          const wordStart = i / words.length;
          const wordEnd = (i + 1) / words.length;
          const t = Math.min(1, Math.max(0, (self.progress - wordStart) / (wordEnd - wordStart)));
          word.style.opacity = String(0.4 + t * 0.6);
          word.style.color = t > 0.5
            ? "var(--on-surface)"
            : "var(--on-surface-variant)";
        },
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="services" className="relative z-20 overflow-hidden bg-background px-8 py-28">
      {/* Background sigil */}
      <img
        src="/sigils/flower-of-life.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.05]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="relative">
            <SectionNumber number="01" />
            <h2
              ref={headingRef}
              className="font-headline text-4xl font-bold md:text-5xl"
            >
              <span className="sr-only">Core Expertise</span>
              {["Core", "Expertise"].map((word) => (
                <span
                  key={word}
                  data-scroll-word
                  aria-hidden="true"
                  className="mr-[0.3em] inline-block transition-colors duration-200"
                  style={{ opacity: 0.4, color: "var(--on-surface-variant)" }}
                >
                  {word}
                </span>
              ))}
            </h2>
            <div className="mt-4 h-1 w-24 bg-primary" />
          </div>
          <p className="max-w-md text-lg italic text-on-surface-variant">
            Our services are forged at the intersection of technical mastery and
            artistic vision.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
              }}
              className={`group relative flex min-h-[400px] flex-col justify-between overflow-hidden border-t p-10 transition-all duration-300 hover:-translate-y-1 ${
                service.featured
                  ? "sigil-glow border-t-primary/20 bg-surface-container-high hover:border-t-primary/40 hover:bg-surface-container"
                  : "border-outline-variant/10 bg-surface-container-low hover:border-t-primary/30 hover:bg-surface-container"
              }`}
            >
              {/* Cursor spotlight glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(242,202,80,0.04), transparent 70%)",
                }}
              />

              {/* Featured badge */}
              {service.featured && (
                <div className="absolute right-6 top-6 rounded-sm bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                  Featured
                </div>
              )}

              {/* Top content */}
              <div>
                <MaterialIcon
                  name={service.icon}
                  size={48}
                  className="text-primary opacity-40 transition-opacity duration-300 group-hover:opacity-100"
                />
                <h3 className="mt-6 font-headline text-2xl font-bold text-on-surface">
                  {service.title}
                </h3>
                <p className="mt-4 leading-relaxed text-on-surface-variant">
                  {service.description}
                </p>
              </div>

              {/* Bottom link */}
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary transition-opacity duration-300 hover:opacity-80"
              >
                Explore Service
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>

              {/* Large decorative icon */}
              <MaterialIcon
                name={service.icon}
                size={200}
                className="pointer-events-none absolute -bottom-6 -right-6 text-on-surface opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.08]"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
