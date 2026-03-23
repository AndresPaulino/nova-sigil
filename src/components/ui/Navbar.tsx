"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
] as const;

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const trigger = ScrollTrigger.create({
      start: 80,
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 80) {
          inner.classList.add("nav-pill");
        } else if (self.scroll() <= 80) {
          inner.classList.remove("nav-pill");
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div
        ref={innerRef}
        className="nav-inner mx-auto flex max-w-7xl items-center justify-between px-6 py-3"
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-2xl font-headline font-bold text-primary"
        >
          Nova Sigil
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-sm font-body font-medium text-on-surface-variant hover:text-on-surface transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <MagneticButton strength={0.25} radius={80}>
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="rounded-md bg-primary-container px-5 py-2 text-sm font-body font-semibold text-on-primary hover:bg-primary transition-colors duration-300"
            >
              Contact
            </a>
          </MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex md:hidden items-center justify-center w-10 h-10 text-on-surface-variant hover:text-on-surface transition-colors duration-300"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
