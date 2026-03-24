"use client";

import { motion } from "framer-motion";

interface HeroStatsProps {
  delay?: number;
}

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "12+", label: "Years Experience" },
  { value: "99.9%", label: "Uptime SLA" },
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
      className="absolute bottom-12 right-8 z-10 hidden gap-10 md:flex md:right-16 lg:right-24"
      variants={containerVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={itemVariants} className="flex flex-col">
          <span className="font-headline text-2xl text-primary">{stat.value}</span>
          <span className="text-xs uppercase tracking-widest text-on-surface-variant/60">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
