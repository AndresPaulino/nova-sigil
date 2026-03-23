"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[10000] h-[3px] w-full origin-left bg-gradient-to-r from-primary to-primary-container"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
