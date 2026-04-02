"use client";

import { motion } from "framer-motion";
import { Footer } from "@/components/sections/Footer";
import { MagneticButton } from "@/components/ui/MagneticButton";

// ─── Types ───

interface CaseStudySection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface CaseStudyLayoutProps {
  category: string;
  title: string;
  summary: string;
  sections: CaseStudySection[];
  techStack: string[];
}

// ─── Animation Variants ───

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// ─── Component ───

export function CaseStudyLayout({
  category,
  title,
  summary,
  sections,
  techStack,
}: CaseStudyLayoutProps) {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-transparent bg-surface/80 px-6 py-3 backdrop-blur-md">
          <a
            href="/"
            className="font-headline text-2xl font-bold text-heading"
          >
            Nova <span className="gold-gradient-text">Sigil</span>
          </a>
          <a
            href="/"
            className="font-body text-sm font-medium text-body transition-colors duration-300 hover:text-heading"
          >
            &larr; Back to Home
          </a>
        </div>
      </nav>

      <main id="main">
        {/* Hero */}
        <section className="relative z-20 bg-surface px-8 pt-32 pb-20">
          <div className="mx-auto max-w-3xl">
            <motion.span
              className="block font-mono text-xs uppercase tracking-widest text-accent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              {category}
            </motion.span>
            <motion.h1
              className="mt-4 font-headline text-4xl font-bold leading-tight text-heading md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              {summary}
            </motion.p>
          </div>
        </section>

        {/* Divider */}
        <div className="relative z-20 bg-surface">
          <div className="mx-auto max-w-3xl px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>

        {/* Content Body */}
        <section className="relative z-20 bg-surface px-8 py-20">
          <motion.div
            className="mx-auto max-w-3xl"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {sections.map((section) => (
              <motion.div
                key={section.heading}
                className="mb-16 last:mb-0"
                variants={fadeUp}
              >
                <h2 className="font-headline text-2xl font-bold text-heading md:text-3xl">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((paragraph, i) => (
                  <p
                    key={i}
                    className="mt-4 text-lg leading-relaxed text-body"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 flex flex-col gap-3">
                    {section.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-lg leading-relaxed text-body"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}

            {/* Tech Stack */}
            {techStack.length > 0 && (
              <motion.div className="mt-16" variants={fadeUp}>
                <h2 className="font-headline text-2xl font-bold text-heading md:text-3xl">
                  Tech Stack
                </h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-divider-hover px-4 py-1.5 font-mono text-xs text-body transition-colors duration-300 hover:border-accent/40 hover:text-heading"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="relative z-20 bg-surface px-8 pb-20">
          <div className="mx-auto max-w-3xl">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <motion.div
            className="mx-auto max-w-3xl pt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          >
            <h2 className="font-headline text-3xl font-bold text-heading md:text-4xl">
              Have a similar challenge?
            </h2>
            <p className="mt-4 text-lg text-body">
              Let&apos;s talk about how we can solve it.
            </p>
            <div className="mt-8">
              <MagneticButton>
                <a
                  href="/#contact"
                  className="inline-block rounded-md bg-accent px-10 py-5 text-base font-bold text-black transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(200,168,78,0.3)]"
                >
                  Start a Conversation
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
