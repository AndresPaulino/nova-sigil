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
        // Parallax at 0.7x — offset from center
        const yOffset = (self.progress - 0.5) * 0.3 * window.innerHeight;
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
      className="pointer-events-none absolute -left-2 -top-12 select-none font-headline text-[8rem] font-bold leading-none text-primary/[0.03]"
    >
      {number}
    </span>
  );
}
