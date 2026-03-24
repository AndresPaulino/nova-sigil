"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () =>
    import("@/components/three/HeroScene").then((m) => ({
      default: m.HeroScene,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-surface-container-lowest" />
    ),
  },
);

function StaticFallback() {
  return (
    <div className="absolute right-0 top-0 bottom-0 flex w-[55vw] items-center justify-center md:w-[50vw] lg:w-[45vw]">
      <img
        src="/sigils/nova-sigil-mark.svg"
        alt=""
        aria-hidden="true"
        className="h-[300px] w-[300px] opacity-20 animate-[spin_60s_linear_infinite]"
        style={{ filter: "sepia(1) saturate(3) hue-rotate(10deg) brightness(0.8)" }}
      />
    </div>
  );
}

export function HeroCanvas() {
  const [gpuTier, setGpuTier] = useState<number | null>(null);

  useEffect(() => {
    import("detect-gpu")
      .then((m) => m.getGPUTier())
      .then((result) => setGpuTier(result.tier))
      .catch(() => setGpuTier(0));
  }, []);

  // Still loading GPU detection
  if (gpuTier === null) {
    return <div className="absolute right-0 top-0 bottom-0 w-[55vw] bg-surface-container-lowest md:w-[50vw] lg:w-[45vw]" />;
  }

  // Tier 0 — no WebGL or very weak GPU
  if (gpuTier === 0) {
    return <StaticFallback />;
  }

  return (
    <div className="absolute right-0 top-0 bottom-0 w-[55vw] opacity-60 md:w-[50vw] lg:w-[45vw]">
      <div className="absolute inset-y-0 left-0 z-[1] w-1/3 bg-gradient-to-r from-background to-transparent" />
      <HeroScene />
    </div>
  );
}
