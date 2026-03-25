"use client";

import { useRef, useCallback, type ReactNode } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function SpotlightCard({
  children,
  className = "",
  ...rest
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      ref.current.style.setProperty(
        "--spotlight-x",
        `${e.clientX - rect.left}px`,
      );
      ref.current.style.setProperty(
        "--spotlight-y",
        `${e.clientY - rect.top}px`,
      );
    },
    [],
  );

  return (
    <div
      ref={ref}
      className={`group/spotlight relative ${className}`}
      onMouseMove={handleMouseMove}
      {...rest}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--spotlight-x, -999px) var(--spotlight-y, -999px), rgba(255,255,255,0.03), transparent 70%)",
        }}
      />
    </div>
  );
}
