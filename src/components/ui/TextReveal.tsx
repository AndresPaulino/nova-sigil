"use client";

import { motion } from "framer-motion";

type TextRevealVariant = "slide" | "inscribe";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  variant?: TextRevealVariant;
  stagger?: number;
}

const variantConfigs = {
  slide: {
    defaultStagger: 0.03,
    charHidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    charVisible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
    },
    containerStyle: undefined as React.CSSProperties | undefined,
    charStyle: undefined as React.CSSProperties | undefined,
  },
  inscribe: {
    defaultStagger: 0.04,
    charHidden: { opacity: 0, rotateX: 90 },
    charVisible: {
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
    containerStyle: { perspective: 600 } as React.CSSProperties,
    charStyle: { transformOrigin: "bottom center" } as React.CSSProperties,
  },
} as const;

export function TextReveal({
  children,
  className = "",
  delay = 0,
  variant = "slide",
  stagger,
}: TextRevealProps) {
  const config = variantConfigs[variant];
  const resolvedStagger = stagger ?? config.defaultStagger;
  const words = children.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: resolvedStagger },
    },
  };

  const charVariants = {
    hidden: config.charHidden,
    visible: config.charVisible,
  };

  return (
    <>
      <span className="sr-only">{children}</span>
      <motion.span
        className={className}
        aria-hidden="true"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delayChildren: delay }}
        style={config.containerStyle}
      >
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split("").map((char, ci) => (
              <motion.span
                key={ci}
                className="inline-block"
                variants={charVariants}
                style={config.charStyle}
              >
                {char}
              </motion.span>
            ))}
            {wi < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </motion.span>
    </>
  );
}
