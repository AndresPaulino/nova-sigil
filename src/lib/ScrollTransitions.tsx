"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollTransitions() {
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // ─── Hero Perspective Scale (card-stacking, self-pinned) ───
    const hero = document.getElementById("hero");

    if (hero) {
      const st = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "+=50vh",
        pin: true,
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(hero, {
            scale: 1 - 0.05 * p,
            transformPerspective: 1200,
            rotateX: 2 * p,
            filter: `brightness(${1 - 0.5 * p})`,
            borderRadius: `${24 * p}px`,
          });
        },
      });
      triggers.push(st);
    }

    // ─── Parallax H2 Headings ───
    const headings = gsap.utils.toArray<HTMLElement>("section:not([data-no-h2-parallax]) h2");
    const vh = window.innerHeight;

    headings.forEach((h2) => {
      const st = ScrollTrigger.create({
        trigger: h2,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
        onUpdate: (self) => {
          const yOffset = -(0.15 * self.progress * vh);
          gsap.set(h2, { y: yOffset });
        },
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return null;
}
