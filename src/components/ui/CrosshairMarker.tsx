"use client";

import { motion } from "framer-motion";

interface CrosshairMarkerProps {
  className?: string;
}

export function CrosshairMarker({ className = "" }: CrosshairMarkerProps) {
  return (
    <motion.div
      className={`pointer-events-none hidden select-none md:block ${className}`}
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <svg
        width="20"
        height="20"
        viewBox="-10 -10 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="-10" y1="0" x2="10" y2="0" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="-10" x2="0" y2="10" stroke="currentColor" strokeWidth="1" />
      </svg>
    </motion.div>
  );
}
