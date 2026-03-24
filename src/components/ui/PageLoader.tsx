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
    // Animate progress bar
    const animateProgress = () => {
      const target = loadingState.sceneReady ? 100 : 85;
      const speed = loadingState.sceneReady ? 3 : 0.3;
      progressValue.current += (target - progressValue.current) * speed * 0.016;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progressValue.current / 100})`;
      }

      if (loadingState.sceneReady && progressValue.current > 99) {
        setFading(true);
        setTimeout(() => setVisible(false), 600);
        return;
      }

      rafRef.current = requestAnimationFrame(animateProgress);
    };

    rafRef.current = requestAnimationFrame(animateProgress);

    // Listen for scene ready
    const unsub = loadingState.subscribe(() => {
      // Progress will accelerate to 100 on next frame
    });

    // Fallback timeout — don't block forever
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
      className={`fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Rotating sigil mark */}
      <img
        src="/sigils/nova-sigil-mark.svg"
        alt=""
        aria-hidden="true"
        className="h-20 w-20 animate-[spin_4s_linear_infinite] opacity-40"
        style={{ filter: "sepia(1) saturate(3) hue-rotate(10deg) brightness(0.8)" }}
      />

      {/* Progress bar */}
      <div className="mt-8 h-px w-48 overflow-hidden bg-surface-container">
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-primary"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
