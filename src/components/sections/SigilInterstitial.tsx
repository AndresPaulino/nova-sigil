"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

// ─── Color Interpolation ───

function lerpColor(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): string {
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)})`;
}

const COLOR_DARK: [number, number, number] = [51, 51, 51];
const COLOR_GOLD: [number, number, number] = [200, 168, 78];

// ─── Words ───

const WORDS = [
  { text: "Ship faster.", threshold: 0.20, gold: false },
  { text: "Scale confidently.", threshold: 0.45, gold: false },
  { text: "Sleep at night.", threshold: 0.70, gold: true },
];

// ─── Component ───

export function SigilInterstitial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sigilRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([null, null, null]);

  useEffect(() => {
    const section = sectionRef.current;
    const sigil = sigilRef.current;
    if (!section || !sigil) return;

    const mm = gsap.matchMedia();

    const animate = (self: ScrollTrigger) => {
      const p = self.progress;

      // Rotation: full 360deg over scroll
      gsap.set(sigil, { rotation: p * 360 });

      // Opacity: sine wave — 0.02 at edges, 0.08 at center
      sigil.style.opacity = String(0.02 + 0.06 * Math.sin(Math.PI * p));

      // Stroke color: #333 → gold flash at 50% → #333
      const colorT = Math.max(0, 1 - Math.abs(p - 0.5) * 2);
      sigil.style.color = lerpColor(COLOR_DARK, COLOR_GOLD, colorT);

      // Words: sequential reveal with stagger
      WORDS.forEach((word, i) => {
        const el = wordRefs.current[i];
        if (!el) return;
        const start = word.threshold - 0.05;
        const end = word.threshold + 0.05;
        const t = Math.min(1, Math.max(0, (p - start) / (end - start)));
        gsap.set(el, { opacity: t, y: 20 * (1 - t) });
      });
    };

    mm.add("(min-width: 768px)", () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=450vh",
        pin: true,
        scrub: 2,
        onUpdate: animate,
      });
      return () => st.kill();
    });

    mm.add("(max-width: 767px)", () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=300vh",
        pin: true,
        scrub: 2,
        onUpdate: animate,
      });
      return () => st.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative z-20 flex h-screen items-center justify-center overflow-hidden bg-black/95"
    >
      {/* Massive rotating sigil */}
      <div
        ref={sigilRef}
        className="absolute h-[150vw] w-[150vw] md:h-[120vh] md:w-[120vh]"
        style={{ color: "#333333", opacity: 0.02, willChange: "transform" }}
      >
        <MetatronsCube className="h-full w-full" />
      </div>

      {/* Center text */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {WORDS.map((word, i) => (
          <span
            key={word.text}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            className={`font-headline text-3xl font-bold md:text-5xl ${
              word.gold ? "text-accent" : "text-heading"
            }`}
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            {word.text}
          </span>
        ))}
      </div>
    </div>
  );
}
