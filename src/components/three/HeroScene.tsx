"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import vertexShader from "@/shaders/sigil.vert";
import fragmentShader from "@/shaders/sigil.frag";

gsap.registerPlugin(ScrollTrigger);

// ─── Noise-displaced Icosahedron ───

function SigilMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uStrength: { value: 0.3 },
      uDensity: { value: 1.5 },
    }),
    [],
  );

  // Bind scroll offset → uStrength via GSAP ScrollTrigger (Lenis-synced)
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });
    return () => {
      trigger.kill();
    };
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    // Animate time
    uniforms.uTime.value = elapsed;

    // Smooth-lerp scroll progress into distortion strength (0.3 → 1.0)
    const target = 0.3 + scrollProgress.current * 0.7;
    uniforms.uStrength.value +=
      (target - uniforms.uStrength.value) * 0.1;

    // Gentle rotation
    if (meshRef.current) {
      meshRef.current.rotation.y = elapsed * 0.15;
      meshRef.current.rotation.x = Math.sin(elapsed * 0.1) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        toneMapped={false}
      />
    </mesh>
  );
}

// ─── Mouse Parallax Camera ───

function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    const cam = state.camera;
    cam.position.x += (mouse.current.x * 0.5 - cam.position.x) * 0.02;
    cam.position.y += (-mouse.current.y * 0.5 - cam.position.y) * 0.02;
    cam.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Canvas Wrapper ───

export function HeroScene() {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 3], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(1.5)}
      >
        <CameraRig />
        <SigilMesh />
        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={1}
            intensity={2}
            radius={0.4}
          />
        </EffectComposer>
      </PerformanceMonitor>
    </Canvas>
  );
}
