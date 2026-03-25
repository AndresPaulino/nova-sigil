"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "@/lib/useReducedMotion";
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
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const scrollProgress = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uStrength: { value: 0.3 },
      uDensity: { value: 1.5 },
      uOpacity: { value: 1.0 },
    }),
    [],
  );

  // Dispose ShaderMaterial + geometry on unmount
  useEffect(() => {
    return () => {
      materialRef.current?.dispose();
      meshRef.current?.geometry.dispose();
    };
  }, []);

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

    uniforms.uTime.value = elapsed;

    const target = 0.3 + scrollProgress.current * 0.7;
    uniforms.uStrength.value +=
      (target - uniforms.uStrength.value) * 0.1;

    // Scroll exit: 0.7→1.0 progress
    const scroll = scrollProgress.current;
    const exitProgress = Math.min(Math.max((scroll - 0.7) / 0.3, 0), 1);
    const exitEase = exitProgress * exitProgress; // quadratic ease

    uniforms.uOpacity.value = 1 - exitEase;

    if (meshRef.current) {
      meshRef.current.rotation.y = elapsed * 0.15;
      meshRef.current.rotation.x = Math.sin(elapsed * 0.1) * 0.1;

      const baseScale = 0.6 * (1 - exitEase * 0.4);
      meshRef.current.scale.setScalar(baseScale);
      meshRef.current.position.y = exitEase * 1.5;
    }
  });

  return (
    <mesh ref={meshRef} scale={[0.6, 0.6, 0.6]}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        toneMapped={false}
        wireframe
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
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
  const [bloomEnabled, setBloomEnabled] = useState(true);
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      dpr={[1, dpr]}
      frameloop={reducedMotion ? "demand" : "always"}
      camera={{ position: [0, 0, 3], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <PerformanceMonitor
        onDecline={() => {
          setDpr(1);
          setBloomEnabled(false);
        }}
        onIncline={() => {
          setDpr(1.5);
          setBloomEnabled(true);
        }}
      >
        <CameraRig />
        <SigilMesh />
        {bloomEnabled && (
          <EffectComposer>
            <Bloom
              mipmapBlur
              luminanceThreshold={1.8}
              intensity={0.6}
              radius={0.3}
            />
          </EffectComposer>
        )}
      </PerformanceMonitor>
    </Canvas>
  );
}
