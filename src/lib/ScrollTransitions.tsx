"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollTransitions() {
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // ─── Hero Perspective Scale (card-stacking) ───
    const hero = document.getElementById("hero");
    const services = document.getElementById("services");

    if (hero && services) {
      const st = ScrollTrigger.create({
        trigger: services,
        start: "top bottom",
        end: "top top",
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(hero, {
            scale: 1 - 0.05 * p,
            rotateX: 2 * p,
            filter: `brightness(${1 - 0.5 * p})`,
            borderRadius: `${24 * p}px`,
          });
        },
      });
      triggers.push(st);
    }

    // ─── Parallax H2 Headings ───
    const headings = gsap.utils.toArray<HTMLElement>("section h2");
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
