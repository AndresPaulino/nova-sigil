"use client";

import { type FormEvent, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { CrosshairMarker } from "@/components/ui/CrosshairMarker";

gsap.registerPlugin(ScrollTrigger);

// ─── Animation ───

const fieldVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const formContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Component ───

export function Contact() {
  const glowRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const st = ScrollTrigger.create({
      trigger: "#contact",
      start: "top 80%",
      end: "top center",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(glow, {
          scale: p,
          opacity: 0.6 * p,
        });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      id="contact"
      className="relative z-20 overflow-hidden bg-surface px-8 py-28"
    >
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(600px circle at 50% 50%, rgba(200,168,78,0.04), transparent 70%)",
          transform: "scale(0)",
          opacity: 0,
        }}
      />

      {/* Background sigil */}
      <img
        src="/sigils/metatrons-cube.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] translate-x-1/4 -translate-y-1/2 select-none opacity-[0.02] animate-[spin_60s_linear_infinite]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 md:grid-cols-5">
        {/* Corner crosshairs */}
        <CrosshairMarker className="absolute -top-8 left-0 text-label" />
        <CrosshairMarker className="absolute -top-8 right-0 text-label" />

        {/* LEFT — Heading + Email */}
        <motion.div
          className="relative md:col-span-2"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionNumber number="04" />
          {/* Heading crosshairs */}
          <CrosshairMarker className="absolute -left-8 top-3 text-label" />
          <h2 className="font-headline text-4xl font-bold leading-tight text-heading md:text-5xl">
            <TextReveal>Initiate the Transmutation.</TextReveal>
          </h2>
          <CrosshairMarker className="absolute -right-8 top-3 text-label" />
          <p className="mt-6 text-lg leading-relaxed text-body">
            Ready to bring your vision into the physical realm? Reach out to our
            leads.
          </p>

          <div className="mt-12">
            <span className="text-xs font-bold uppercase tracking-widest text-label">
              Direct Channel
            </span>
            <a
              href="mailto:hello@novasigil.com"
              className="mt-2 block font-headline text-2xl text-body transition-colors duration-300 hover:text-heading md:text-3xl"
            >
              hello@novasigil.com
            </a>
          </div>
        </motion.div>

        {/* RIGHT — Contact Form */}
        <motion.div
          className="md:col-span-3"
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-md border border-divider bg-surface-card p-8 md:p-12"
          >
            <motion.div
              className="flex flex-col gap-8"
              variants={formContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Name + Email row */}
              <div className="grid gap-8 md:grid-cols-2">
                <motion.div variants={fieldVariants}>
                  <label htmlFor="contact-name" className="mb-2 block text-xs font-bold uppercase tracking-widest text-label">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full border-b border-divider-hover bg-transparent py-3 text-heading placeholder:text-muted focus:border-accent focus:outline-none focus:ring-0"
                  />
                </motion.div>
                <motion.div variants={fieldVariants}>
                  <label htmlFor="contact-email" className="mb-2 block text-xs font-bold uppercase tracking-widest text-label">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    className="w-full border-b border-divider-hover bg-transparent py-3 text-heading placeholder:text-muted focus:border-accent focus:outline-none focus:ring-0"
                  />
                </motion.div>
              </div>

              {/* Textarea */}
              <motion.div variants={fieldVariants}>
                <label htmlFor="contact-message" className="mb-2 block text-xs font-bold uppercase tracking-widest text-label">
                  Your Vision
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  required
                  className="w-full resize-none border-b border-divider-hover bg-transparent py-3 text-heading placeholder:text-muted focus:border-accent focus:outline-none focus:ring-0"
                />
              </motion.div>

              {/* Submit */}
              <motion.div variants={fieldVariants}>
                <MagneticButton className="w-full" strength={0.15} radius={200}>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-accent py-5 text-lg font-bold text-black transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_25px_rgba(200,168,78,0.3)]"
                  >
                    Send Message
                  </button>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
