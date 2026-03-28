"use client";

import { motion } from "framer-motion";

interface HeroStatsProps {
  delay?: number;
}

const stats = [
  { value: "Enterprise-Grade", label: "Systems" },
  { value: "12+ Years", label: "Financial Services & Engineering" },
  { value: "Production-Hardened", label: "Architecture" },
];

const containerVariants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.15, delayChildren: delay },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HeroStats({ delay = 0 }: HeroStatsProps) {
  return (
    <motion.div
      className="absolute bottom-24 right-8 z-10 hidden gap-12 md:flex md:right-16 lg:right-24"
      variants={containerVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={itemVariants} className="flex flex-col">
          <span className="font-headline text-2xl text-heading">{stat.value}</span>
          <span className="text-xs font-mono uppercase tracking-widest text-label">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
