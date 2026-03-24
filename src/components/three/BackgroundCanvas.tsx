"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const BackgroundSigils = dynamic(
  () =>
    import("@/components/three/BackgroundSigils").then((m) => ({
      default: m.BackgroundSigils,
    })),
  { ssr: false, loading: () => null },
);

export function BackgroundCanvas() {
  const [gpuTier, setGpuTier] = useState<number | null>(null);

  useEffect(() => {
    import("detect-gpu")
      .then((m) => m.getGPUTier())
      .then((result) => setGpuTier(result.tier))
      .catch(() => setGpuTier(0));
  }, []);

  // Tier 0 or still loading → no background layer
  if (gpuTier === null || gpuTier === 0) return null;

  return (
    <div
      className="fixed inset-0 z-0 opacity-70 pointer-events-none"
      aria-hidden="true"
    >
      <BackgroundSigils />
    </div>
  );
}
