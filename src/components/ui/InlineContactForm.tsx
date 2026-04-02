"use client";

import { type FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;

export function InlineContactForm() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto max-w-3xl">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="cta"
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <h2 className="font-headline text-3xl font-bold text-heading md:text-4xl">
              Have a similar challenge?
            </h2>
            <p className="mt-4 text-lg text-body">
              Let&apos;s talk about how we can solve it.
            </p>
            <div className="mt-8">
              <MagneticButton>
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="inline-block rounded-md bg-accent px-10 py-5 text-base font-bold text-black transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(200,168,78,0.3)]"
                >
                  Start a Conversation
                </button>
              </MagneticButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <h2 className="text-center font-headline text-3xl font-bold text-heading md:text-4xl">
              Tell us about your project
            </h2>
            <form
              onSubmit={handleSubmit}
              className="mt-10 rounded-md border border-divider bg-surface-card p-8 md:p-12"
            >
              <div className="flex flex-col gap-8">
                {/* Name + Email row */}
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="inline-name"
                      className="mb-2 block text-xs font-bold uppercase tracking-widest text-label"
                    >
                      Full Name
                    </label>
                    <input
                      id="inline-name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="w-full border-b border-divider-hover bg-transparent py-3 text-heading placeholder:text-muted focus:border-accent focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="inline-email"
                      className="mb-2 block text-xs font-bold uppercase tracking-widest text-label"
                    >
                      Email Address
                    </label>
                    <input
                      id="inline-email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      className="w-full border-b border-divider-hover bg-transparent py-3 text-heading placeholder:text-muted focus:border-accent focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                {/* Textarea */}
                <div>
                  <label
                    htmlFor="inline-message"
                    className="mb-2 block text-xs font-bold uppercase tracking-widest text-label"
                  >
                    Tell us about your project
                  </label>
                  <textarea
                    id="inline-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    required
                    className="w-full resize-none border-b border-divider-hover bg-transparent py-3 text-heading placeholder:text-muted focus:border-accent focus:outline-none focus:ring-0"
                  />
                </div>

                {/* Submit */}
                <MagneticButton className="w-full" strength={0.15} radius={200}>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-accent py-5 text-lg font-bold text-black transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_25px_rgba(200,168,78,0.3)]"
                  >
                    Send Message
                  </button>
                </MagneticButton>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
