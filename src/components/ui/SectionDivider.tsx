"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionDivider() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      end: "top 50%",
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(el, { scaleX: self.progress });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mx-auto max-w-lg px-8 py-8"
      style={{ transform: "scaleX(0)", transformOrigin: "center center" }}
    >
      <img
        src="/sigils/separator.svg"
        alt=""
        aria-hidden="true"
        className="w-full opacity-20"
      />
    </div>
  );
}
