"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
];

const SOCIAL_LINKS = [
  { label: "X / Twitter", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export function Footer() {
  const sigilRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const sigil = sigilRef.current;
    if (!sigil) return;

    const st = ScrollTrigger.create({
      trigger: sigil.closest("footer"),
      start: "top 90%",
      end: "top 40%",
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(sigil, { opacity: 0.02 * self.progress });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <footer className="relative bg-surface-container-lowest overflow-hidden">
      {/* Full-width sigil background */}
      <img
        ref={sigilRef}
        src="/sigils/flower-of-life.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-auto h-full w-full max-w-[1200px] select-none object-contain"
        style={{ opacity: 0 }}
      />

      {/* Separator */}
      <div className="relative mx-auto max-w-lg px-8 py-8">
        <img
          src="/sigils/separator.svg"
          alt=""
          aria-hidden="true"
          className="w-full opacity-30"
        />
      </div>

      <div className="relative px-8 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-12 md:flex-row md:justify-between">
          {/* LEFT — Branding */}
          <div className="max-w-xs">
            <span className="font-headline text-xl font-bold text-primary">
              Nova Sigil
            </span>
            <p className="mt-4 text-sm leading-relaxed text-on-surface-variant opacity-80">
              Architecting high-performance digital infrastructure for the next
              generation of industry leaders.
            </p>
            <p className="mt-4 text-sm italic text-on-surface-variant">
              &copy; 2026 Nova Sigil LLC
            </p>
          </div>

          {/* RIGHT — Link columns */}
          <div className="grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-24">
            {/* Navigation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
                Navigation
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-on-surface-variant transition-colors duration-300 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
                Connect
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-on-surface-variant transition-colors duration-300 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inquiry */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
                Inquiry
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <a
                    href="mailto:hello@novasigil.com"
                    className="text-sm text-on-surface-variant transition-colors duration-300 hover:text-primary"
                  >
                    hello@novasigil.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Decorative bottom line */}
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="h-px bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent" />
        </div>
      </div>
    </footer>
  );
}
