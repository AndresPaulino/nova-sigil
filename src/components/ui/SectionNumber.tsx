"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionNumberProps {
  number: string;
}

export function SectionNumber({ number }: SectionNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => {
        // Parallax at 0.8x — offset from center
        const yOffset = (self.progress - 0.5) * 0.2 * window.innerHeight;
        gsap.set(el, { y: yOffset });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 hidden select-none font-mono text-[10rem] font-extralight leading-none text-muted md:block"
    >
      {number}
    </span>
  );
}
