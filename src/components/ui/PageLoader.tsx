"use client";

import { useState, useEffect, useRef } from "react";
import { loadingState } from "@/lib/loadingState";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressValue = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const animateProgress = () => {
      const target = loadingState.sceneReady ? 100 : 85;
      const speed = loadingState.sceneReady ? 3 : 0.3;
      progressValue.current +=
        (target - progressValue.current) * speed * 0.016;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progressValue.current / 100})`;
      }

      if (loadingState.sceneReady && progressValue.current > 99) {
        setFading(true);
        setTimeout(() => setVisible(false), 800);
        return;
      }

      rafRef.current = requestAnimationFrame(animateProgress);
    };

    rafRef.current = requestAnimationFrame(animateProgress);

    const unsub = loadingState.subscribe(() => {
      // Progress will accelerate to 100 on next frame
    });

    const timeout = setTimeout(() => {
      loadingState.markReady();
    }, 5000);

    return () => {
      cancelAnimationFrame(rafRef.current);
      unsub();
      clearTimeout(timeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-surface transition-opacity duration-800 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Rotating sigil mark — inline SVG */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        className="h-20 w-20 animate-[spin_4s_linear_infinite]"
        aria-hidden="true"
      >
        <circle
          cx="250"
          cy="250"
          r="180"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        <circle
          cx="250"
          cy="250"
          r="126"
          stroke="white"
          strokeWidth="0.6"
          strokeOpacity="0.2"
        />
        <polygon
          points="250,84.4 415.6,250 250,415.6 84.4,250"
          stroke="white"
          strokeWidth="0.9"
          strokeOpacity="0.25"
        />
        <rect
          x="133"
          y="133"
          width="234"
          height="234"
          stroke="white"
          strokeWidth="0.6"
          strokeOpacity="0.15"
        />
        <g stroke="white" strokeWidth="0.5" strokeOpacity="0.15">
          <line x1="70" y1="250" x2="430" y2="250" />
          <line x1="250" y1="70" x2="250" y2="430" />
        </g>
        <circle
          cx="250"
          cy="250"
          r="12"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        <circle
          cx="250"
          cy="250"
          r="4"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
      </svg>

      {/* Brand text */}
      <span className="mt-6 font-mono text-sm tracking-[0.5em] text-label">
        NOVA SIGIL
      </span>

      {/* Progress bar */}
      <div className="mt-8 h-px w-48 overflow-hidden bg-surface-card">
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
