"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CrosshairMarker } from "@/components/ui/CrosshairMarker";
import { SectionNumber } from "@/components/ui/SectionNumber";

gsap.registerPlugin(ScrollTrigger);

// ─── Inline Sigil SVGs ───

function NovaSigilMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 500" fill="none" className={className}>
      <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      <circle cx="250" cy="250" r="126" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.4" />
      <polygon points="250,84.4 415.6,250 250,415.6 84.4,250" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.55" />
      <rect x="133" y="133" width="234" height="234" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.35" />
      <g stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3">
        <line x1="70" y1="250" x2="430" y2="250" />
        <line x1="250" y1="70" x2="250" y2="430" />
      </g>
      <g stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.2">
        <line x1="84.4" y1="84.4" x2="415.6" y2="415.6" />
        <line x1="415.6" y1="84.4" x2="84.4" y2="415.6" />
      </g>
      <g stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.5">
        <circle cx="376" cy="250" r="6" />
        <circle cx="339.1" cy="339.1" r="6" />
        <circle cx="250" cy="376" r="6" />
        <circle cx="160.9" cy="339.1" r="6" />
        <circle cx="124" cy="250" r="6" />
        <circle cx="160.9" cy="160.9" r="6" />
        <circle cx="250" cy="124" r="6" />
        <circle cx="339.1" cy="160.9" r="6" />
      </g>
      <circle cx="250" cy="250" r="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
      <circle cx="250" cy="250" r="4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.9" />
      <polygon points="250,97 257,111 243,111" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
      <polygon points="403,250 389,257 389,243" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
      <polygon points="250,403 243,389 257,389" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
      <polygon points="97,250 111,243 111,257" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
    </svg>
  );
}

function FlowerOfLife({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 500" fill="none" className={className}>
      <g stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.6">
        <circle cx="250" cy="250" r="50" />
        <circle cx="300" cy="250" r="50" />
        <circle cx="275" cy="293.3" r="50" />
        <circle cx="225" cy="293.3" r="50" />
        <circle cx="200" cy="250" r="50" />
        <circle cx="225" cy="206.7" r="50" />
        <circle cx="275" cy="206.7" r="50" />
        <circle cx="350" cy="250" r="50" />
        <circle cx="300" cy="336.6" r="50" />
        <circle cx="200" cy="336.6" r="50" />
        <circle cx="150" cy="250" r="50" />
        <circle cx="200" cy="163.4" r="50" />
        <circle cx="300" cy="163.4" r="50" />
        <circle cx="325" cy="293.3" r="50" />
        <circle cx="250" cy="336.6" r="50" />
        <circle cx="175" cy="293.3" r="50" />
        <circle cx="175" cy="206.7" r="50" />
        <circle cx="250" cy="163.4" r="50" />
        <circle cx="325" cy="206.7" r="50" />
      </g>
      <circle cx="250" cy="250" r="112" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
      <circle cx="250" cy="250" r="120" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.3" />
    </svg>
  );
}

// ─── Metatron's Cube ───

const MC_VERTICES: [number, number][] = [
  [250, 250], [250, 170], [319.28, 210], [319.28, 290],
  [250, 330], [180.72, 290], [180.72, 210], [250, 90],
  [388.56, 170], [388.56, 330], [250, 410], [111.44, 330],
  [111.44, 170],
];

function MetatronsCube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 500" fill="none" className={className}>
      <g stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.4">
        {MC_VERTICES.flatMap((v1, i) =>
          MC_VERTICES.slice(i + 1).map((v2, j) => (
            <line key={`${i}-${i + j + 1}`} x1={v1[0]} y1={v1[1]} x2={v2[0]} y2={v2[1]} />
          ))
        )}
      </g>
      <g stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.7">
        {MC_VERTICES.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="40" />
        ))}
      </g>
      <circle cx="250" cy="250" r="210" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
    </svg>
  );
}

// ─── Data ───

const SERVICES = [
  {
    label: "CUSTOM DEVELOPMENT",
    title: "Bespoke software engines",
    description:
      "Engineered for performance, security, and scalability. Every line of code is a deliberate stroke of craftsmanship.",
    Sigil: NovaSigilMark,
  },
  {
    label: "SAAS PRODUCTS",
    title: "Architecture for the modern web",
    description:
      "We build resilient SaaS ecosystems that handle millions of requests while maintaining flawless user experiences.",
    Sigil: FlowerOfLife,
  },
  {
    label: "AUTOMATION & INTEGRATION",
    title: "Connecting the disparate",
    description:
      "We build the invisible nervous systems that allow your digital tools to communicate and operate without friction.",
    Sigil: MetatronsCube,
  },
];

// ─── Kinetic Heading ───

const HEADING_WORDS = ["Core", "Expertise"];

// ─── Component ───

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const sigilRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const sigilContainerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Kinetic typography — word-by-word highlight (all viewports)
    const headingEl = headingRef.current;
    if (headingEl) {
      const words =
        headingEl.querySelectorAll<HTMLElement>("[data-kinetic-word]");
      const wordCount = words.length;

      const st = ScrollTrigger.create({
        trigger: headingEl,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          words.forEach((word, i) => {
            const wordStart = i / (wordCount + 0.5);
            const wordEnd = (i + 1.5) / (wordCount + 0.5);
            const t = Math.min(
              1,
              Math.max(0, (p - wordStart) / (wordEnd - wordStart)),
            );
            // Interpolate from #555555 (85) to #ffffff (255)
            const gray = Math.round(85 + t * 170);
            word.style.color = `rgb(${gray},${gray},${gray})`;
          });
        },
      });
      triggers.push(st);
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const section = sectionRef.current;
      if (!section) return;

      const texts = textRefs.current;
      const sigils = sigilRefs.current;
      const sigilContainer = sigilContainerRef.current;
      const counter = counterRef.current;

      const B1 = 1 / 3;
      const B2 = 2 / 3;
      const HW = 0.08;

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress;

          for (let i = 0; i < 3; i++) {
            const text = texts[i];
            const sigil = sigils[i];
            if (!text || !sigil) continue;

            let vis = 0;
            let y = 0;

            if (i === 0) {
              if (p < B1 - HW) {
                vis = 1;
              } else if (p < B1 + HW) {
                const t = (p - (B1 - HW)) / (2 * HW);
                vis = 1 - t;
                y = -40 * t;
              }
            } else if (i === 1) {
              if (p < B1 - HW) {
                y = 40;
              } else if (p < B1 + HW) {
                const t = (p - (B1 - HW)) / (2 * HW);
                vis = t;
                y = 40 * (1 - t);
              } else if (p < B2 - HW) {
                vis = 1;
              } else if (p < B2 + HW) {
                const t = (p - (B2 - HW)) / (2 * HW);
                vis = 1 - t;
                y = -40 * t;
              }
            } else {
              if (p < B2 - HW) {
                y = 40;
              } else if (p < B2 + HW) {
                const t = (p - (B2 - HW)) / (2 * HW);
                vis = t;
                y = 40 * (1 - t);
              } else {
                vis = 1;
              }
            }

            gsap.set(text, { opacity: vis, y });
            gsap.set(sigil, { opacity: vis * 0.15 });
          }

          // Rotate sigil container with scroll
          if (sigilContainer) {
            gsap.set(sigilContainer, { rotation: p * 360 });
          }

          // Update counter
          if (counter) {
            const active = p < B1 ? 1 : p < B2 ? 2 : 3;
            counter.textContent = `0${active} / 03`;
          }
        },
      });

      return () => st.kill();
    });

    return () => {
      triggers.forEach((st) => st.kill());
      mm.revert();
    };
  }, []);

  return (
    <section id="services" className="relative z-20">
      {/* Section header with kinetic typography */}
      <div className="relative mx-auto max-w-7xl px-8 pt-28 pb-16 bg-surface-alt">
        <SectionNumber number="01" />
        <CrosshairMarker className="absolute -left-8 top-8 text-label" />
        <span className="font-mono text-xs uppercase tracking-widest text-label">
          What We Do
        </span>
        <h2
          ref={headingRef}
          className="mt-4 font-headline text-5xl font-bold md:text-6xl"
        >
          {HEADING_WORDS.map((word) => (
            <span
              key={word}
              data-kinetic-word
              className="mr-[0.3em] inline-block text-label"
            >
              {word}
            </span>
          ))}
        </h2>
        <CrosshairMarker className="absolute -right-8 top-8 text-label" />
      </div>

      {/* Desktop: Pinned scroll experience */}
      <div ref={sectionRef} className="relative hidden md:block" style={{ height: "250vh" }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-surface-alt">
          <div className="relative mx-auto flex w-full max-w-7xl items-center gap-16 px-8">
            {/* Corner crosshairs */}
            <CrosshairMarker className="absolute -top-8 left-0 text-label" />
            <CrosshairMarker className="absolute -top-8 right-0 text-label" />

            {/* LEFT: Service content (60%) */}
            <div className="grid w-[60%]">
              {SERVICES.map((service, i) => (
                <div
                  key={service.label}
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                  className="col-start-1 row-start-1 flex flex-col justify-center"
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    transform: i === 0 ? "none" : "translateY(40px)",
                  }}
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-label">
                    {service.label}
                  </span>
                  <h3 className="mt-4 font-headline text-5xl font-bold leading-tight text-heading">
                    {service.title}
                  </h3>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-body">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="group/link mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-body transition-colors duration-300 hover:text-heading"
                  >
                    Learn more
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                      &rarr;
                    </span>
                  </a>
                </div>
              ))}
            </div>

            {/* RIGHT: Sigil visual (40%) */}
            <div className="flex w-[40%] items-center justify-center">
              <div
                ref={sigilContainerRef}
                className="grid h-[500px] w-[500px]"
                style={{ willChange: "transform" }}
              >
                {SERVICES.map((service, i) => (
                  <div
                    key={service.label}
                    ref={(el) => {
                      sigilRefs.current[i] = el;
                    }}
                    className="col-start-1 row-start-1"
                    style={{ opacity: i === 0 ? 0.15 : 0 }}
                  >
                    <service.Sigil className="h-full w-full text-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress counter */}
          <div className="absolute bottom-8 right-12">
            <span ref={counterRef} className="font-mono text-sm text-label">
              01 / 03
            </span>
          </div>
        </div>
      </div>

      {/* Mobile: Stacked layout */}
      <div className="block space-y-16 bg-surface-alt px-8 pb-28 md:hidden">
        {SERVICES.map((service) => (
          <div key={service.label}>
            <span className="font-mono text-xs uppercase tracking-widest text-label">
              {service.label}
            </span>
            <h3 className="mt-3 font-headline text-3xl font-bold leading-tight text-heading">
              {service.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-body">
              {service.description}
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-body transition-colors duration-300 hover:text-heading"
            >
              Learn more <span>&rarr;</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
