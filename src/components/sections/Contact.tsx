"use client";

import { type FormEvent } from "react";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

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
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-surface-container-lowest px-8 py-28"
    >
      {/* Background sigil */}
      <img
        src="/sigils/sri-yantra.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 h-[600px] w-[600px] -translate-x-1/4 -translate-y-1/2 select-none opacity-[0.04]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 md:grid-cols-5">
        {/* LEFT — Heading + Email */}
        <motion.div
          className="md:col-span-2"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-headline text-4xl font-bold leading-tight text-on-surface md:text-5xl">
            <TextReveal>Initiate the Transmutation.</TextReveal>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-on-surface-variant">
            Ready to bring your vision into the physical realm? Reach out to our
            leads.
          </p>

          <div className="mt-12">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Direct Channel
            </span>
            <a
              href="mailto:hello@novasigil.com"
              className="mt-2 block font-headline text-2xl text-primary transition-colors duration-300 hover:text-on-surface md:text-3xl"
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
            className="rounded-md border border-outline-variant/10 bg-surface-container-low p-8 md:p-12"
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
                  <label htmlFor="contact-name" className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full border-b border-outline-variant/40 bg-transparent py-3 text-on-surface placeholder:text-on-surface/20 focus:border-primary focus:outline-none focus:ring-0"
                  />
                </motion.div>
                <motion.div variants={fieldVariants}>
                  <label htmlFor="contact-email" className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    className="w-full border-b border-outline-variant/40 bg-transparent py-3 text-on-surface placeholder:text-on-surface/20 focus:border-primary focus:outline-none focus:ring-0"
                  />
                </motion.div>
              </div>

              {/* Textarea */}
              <motion.div variants={fieldVariants}>
                <label htmlFor="contact-message" className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  Your Vision
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  required
                  className="w-full resize-none border-b border-outline-variant/40 bg-transparent py-3 text-on-surface placeholder:text-on-surface/20 focus:border-primary focus:outline-none focus:ring-0"
                />
              </motion.div>

              {/* Submit */}
              <motion.div variants={fieldVariants}>
                <MagneticButton className="w-full" strength={0.15} radius={200}>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-primary-container py-5 text-lg font-bold text-on-primary transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]"
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
