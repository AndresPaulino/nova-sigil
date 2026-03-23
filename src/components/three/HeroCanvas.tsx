"use client";

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

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 opacity-60">
      <HeroScene />
    </div>
  );
}
