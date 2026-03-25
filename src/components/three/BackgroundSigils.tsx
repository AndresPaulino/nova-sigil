"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { loadingState } from "@/lib/loadingState";

gsap.registerPlugin(ScrollTrigger);

// Module-level shared state (singleton component, client-only)
const mousePos = { x: 0.5, y: 0.5 };
const scrollState = { progress: 0 };

// ─── Input Trackers ───

function MouseTracker() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.x = e.clientX / window.innerWidth;
      mousePos.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}

function ScrollTracker() {
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });
    return () => {
      trigger.kill();
    };
  }, []);
  return null;
}

// ─── Particle Shaders ───

const particleVertexShader = /* glsl */ `
attribute vec3 color;
varying vec3 vColor;
uniform float uSize;

void main() {
  vColor = color;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = uSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const particleFragmentShader = /* glsl */ `
varying vec3 vColor;

void main() {
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);

  if (dist > 0.5) discard;

  float alpha = 1.0 - smoothstep(0.0, 0.5, dist);

  gl_FragColor = vec4(vColor, alpha);
}
`;

// ─── Particle Constants ───

const PARTICLE_COLOR = new THREE.Color("#ffffff");
const PARTICLE_Z_MIN = -3;
const PARTICLE_Z_MAX = -15;
const PARTICLE_Z_MID = -9;
const PARTICLE_BOUNDS_X = 30;
const PARTICLE_BOUNDS_Y = 60;
const REPULSION_RADIUS = 4;
const REPULSION_STRENGTH = 0.8;
const REPULSION_DECAY = 0.03;

// Cached vectors to avoid GC pressure in useFrame
const _mouseWorld = new THREE.Vector3();
const _dir = new THREE.Vector3();

// ─── Gold Particles ───

function GoldParticles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { camera } = useThree();
  const reducedMotion = useReducedMotion();

  const { positions, colors, speeds, twinkleFreq, twinklePhase, repulsionX, repulsionY } =
    useMemo(() => {
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const spd = new Float32Array(count);
      const freq = new Float32Array(count);
      const phase = new Float32Array(count);
      const repX = new Float32Array(count);
      const repY = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        pos[i3] = (Math.random() - 0.5) * PARTICLE_BOUNDS_X * 2;
        pos[i3 + 1] = (Math.random() - 0.5) * PARTICLE_BOUNDS_Y * 2;
        pos[i3 + 2] = PARTICLE_Z_MIN + Math.random() * (PARTICLE_Z_MAX - PARTICLE_Z_MIN);

        col[i3] = PARTICLE_COLOR.r * 0.08;
        col[i3 + 1] = PARTICLE_COLOR.g * 0.08;
        col[i3 + 2] = PARTICLE_COLOR.b * 0.08;

        spd[i] = 0.002 + Math.random() * 0.006;
        freq[i] = 0.5 + Math.random() * 1.5;
        phase[i] = Math.random() * Math.PI * 2;
        repX[i] = 0;
        repY[i] = 0;
      }

      return {
        positions: pos,
        colors: col,
        speeds: spd,
        twinkleFreq: freq,
        twinklePhase: phase,
        repulsionX: repX,
        repulsionY: repY,
      };
    }, [count]);

  const parallaxSpeed = THREE.MathUtils.mapLinear(
    PARTICLE_Z_MID, -6, -15, -3, -0.8,
  );

  useFrame(({ clock }) => {
    if (!pointsRef.current || reducedMotion) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const colAttr = geo.getAttribute("color") as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;
    const colArr = colAttr.array as Float32Array;
    const time = clock.getElapsedTime();

    // Project mouse to world at z = PARTICLE_Z_MID
    const ndcX = mousePos.x * 2 - 1;
    const ndcY = -(mousePos.y * 2 - 1);
    _mouseWorld.set(ndcX, ndcY, 0.5).unproject(camera);
    _dir.copy(_mouseWorld).sub(camera.position).normalize();
    const t = (PARTICLE_Z_MID - camera.position.z) / _dir.z;
    const worldMX = camera.position.x + _dir.x * t;
    const worldMY = camera.position.y + _dir.y * t;

    // Scroll parallax offset for entire group
    const scrollOffsetY = scrollState.progress * parallaxSpeed;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Drift upward
      posArr[i3 + 1] += speeds[i];

      // Recycle at top boundary
      if (posArr[i3 + 1] > PARTICLE_BOUNDS_Y) {
        posArr[i3 + 1] = -PARTICLE_BOUNDS_Y;
        posArr[i3] = (Math.random() - 0.5) * PARTICLE_BOUNDS_X * 2;
        posArr[i3 + 2] = PARTICLE_Z_MIN + Math.random() * (PARTICLE_Z_MAX - PARTICLE_Z_MIN);
        repulsionX[i] = 0;
        repulsionY[i] = 0;
      }

      // Mouse repulsion
      const dx = posArr[i3] - worldMX;
      const dy = (posArr[i3 + 1] + scrollOffsetY) - worldMY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPULSION_RADIUS && dist > 0.001) {
        const force = REPULSION_STRENGTH * (1 - dist / REPULSION_RADIUS);
        repulsionX[i] += (dx / dist) * force;
        repulsionY[i] += (dy / dist) * force;
      }

      // Decay repulsion
      repulsionX[i] *= (1 - REPULSION_DECAY);
      repulsionY[i] *= (1 - REPULSION_DECAY);

      // Apply repulsion offset to position
      posArr[i3] += repulsionX[i] * 0.1;
      posArr[i3 + 1] += repulsionY[i] * 0.1;

      // Twinkle — modulate RGB brightness to simulate alpha with additive blending
      const twinkle = Math.sin(time * twinkleFreq[i] + twinklePhase[i]);
      const brightness = 0.04 + (twinkle * 0.5 + 0.5) * 0.08; // range [0.04, 0.12]
      colArr[i3] = PARTICLE_COLOR.r * brightness;
      colArr[i3 + 1] = PARTICLE_COLOR.g * brightness;
      colArr[i3 + 2] = PARTICLE_COLOR.b * brightness;
    }

    // Apply scroll parallax to group position
    pointsRef.current.position.y = scrollOffsetY;

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={{ uSize: { value: 2.5 } }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

// ─── Starscape ───

const STAR_COUNT = 150;
const STAR_Z_MIN = -25;
const STAR_Z_MAX = -40;
const STAR_Z_MID = -32;

function Starscape() {
  const pointsRef = useRef<THREE.Points>(null);
  const reducedMotion = useReducedMotion();

  const { positions, colors, speeds, twinkleFreq, twinklePhase } = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    const col = new Float32Array(STAR_COUNT * 3);
    const spd = new Float32Array(STAR_COUNT);
    const freq = new Float32Array(STAR_COUNT);
    const phase = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * PARTICLE_BOUNDS_X * 2;
      pos[i3 + 1] = (Math.random() - 0.5) * PARTICLE_BOUNDS_Y * 2;
      pos[i3 + 2] = STAR_Z_MIN + Math.random() * (STAR_Z_MAX - STAR_Z_MIN);

      col[i3] = 0.04;
      col[i3 + 1] = 0.04;
      col[i3 + 2] = 0.04;

      spd[i] = 0.0005 + Math.random() * 0.0015;
      freq[i] = 0.5 + Math.random() * 1.5;
      phase[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, colors: col, speeds: spd, twinkleFreq: freq, twinklePhase: phase };
  }, []);

  const parallaxSpeed = THREE.MathUtils.mapLinear(
    STAR_Z_MID, -6, -15, -3, -0.8,
  );

  useFrame(({ clock }) => {
    if (!pointsRef.current || reducedMotion) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const colAttr = geo.getAttribute("color") as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;
    const colArr = colAttr.array as Float32Array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;

      // Slow drift upward
      posArr[i3 + 1] += speeds[i];

      // Recycle
      if (posArr[i3 + 1] > PARTICLE_BOUNDS_Y) {
        posArr[i3 + 1] = -PARTICLE_BOUNDS_Y;
        posArr[i3] = (Math.random() - 0.5) * PARTICLE_BOUNDS_X * 2;
      }

      // Twinkle — dim white, range [0.02, 0.05]
      const twinkle = Math.sin(time * twinkleFreq[i] + twinklePhase[i]);
      const brightness = 0.02 + (twinkle * 0.5 + 0.5) * 0.03;
      colArr[i3] = brightness;
      colArr[i3 + 1] = brightness;
      colArr[i3 + 2] = brightness;
    }

    // Scroll parallax (slower — deeper z)
    pointsRef.current.position.y = scrollState.progress * parallaxSpeed;

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={STAR_COUNT}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={STAR_COUNT}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={{ uSize: { value: 0.8 } }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

// ─── Scene ───

function Scene({
  bloomEnabled,
  particleCount,
}: {
  bloomEnabled: boolean;
  particleCount: number;
}) {
  return (
    <>
      <MouseTracker />
      <ScrollTracker />
      <Starscape />
      <GoldParticles count={particleCount} />
      {bloomEnabled && (
        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={2.5}
            intensity={0.3}
            radius={0.2}
          />
        </EffectComposer>
      )}
    </>
  );
}

// ─── Canvas Wrapper ───

export function BackgroundSigils() {
  const [bloomEnabled, setBloomEnabled] = useState(true);
  const [particleCount, setParticleCount] = useState(5000);
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={reducedMotion ? "demand" : "always"}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: false, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={() => loadingState.markReady()}
    >
      <PerformanceMonitor
        onDecline={() => {
          setBloomEnabled(false);
          setParticleCount(2000);
        }}
        onIncline={() => {
          setBloomEnabled(true);
          setParticleCount(5000);
        }}
      >
        <Scene bloomEnabled={bloomEnabled} particleCount={particleCount} />
      </PerformanceMonitor>
    </Canvas>
  );
}
