"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[10000] h-[3px] w-full origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(to right, #333333, #ffffff)",
      }}
    />
  );
}
