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
      start: "top 90%",
      end: "top 60%",
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
    <div className="relative z-20 bg-black/95">
      <div
        ref={containerRef}
        className="mx-auto max-w-lg px-8 py-8"
        style={{ transform: "scaleX(0)", transformOrigin: "center center" }}
      >
        <svg
          viewBox="0 0 800 100"
          fill="none"
          className="w-full text-muted"
          aria-hidden="true"
        >
          {/* Main lines */}
          <g stroke="currentColor" strokeOpacity="0.3">
            <line x1="40" y1="50" x2="340" y2="50" strokeWidth="0.5" />
            <line x1="460" y1="50" x2="760" y2="50" strokeWidth="0.5" />
          </g>
          {/* Secondary lines */}
          <g stroke="currentColor" strokeOpacity="0.15">
            <line x1="100" y1="42" x2="355" y2="42" strokeWidth="0.3" />
            <line x1="445" y1="42" x2="700" y2="42" strokeWidth="0.3" />
            <line x1="100" y1="58" x2="355" y2="58" strokeWidth="0.3" />
            <line x1="445" y1="58" x2="700" y2="58" strokeWidth="0.3" />
          </g>
          {/* Center diamonds */}
          <polygon points="400,28 422,50 400,72 378,50" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
          <polygon points="400,38 412,50 400,62 388,50" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.4" />
          <circle cx="400" cy="50" r="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
          {/* Node dots */}
          <circle cx="362" cy="50" r="2.5" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.4" />
          <circle cx="438" cy="50" r="2.5" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.4" />
          <circle cx="320" cy="50" r="1.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.25" />
          <circle cx="280" cy="50" r="1.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.25" />
          <circle cx="240" cy="50" r="1.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.25" />
          <circle cx="480" cy="50" r="1.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.25" />
          <circle cx="520" cy="50" r="1.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.25" />
          <circle cx="560" cy="50" r="1.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.25" />
        </svg>
      </div>
    </div>
  );
}
