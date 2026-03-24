"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { loadingState } from "@/lib/loadingState";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───

interface SigilConfig {
  url: string;
  position: [number, number, number];
  scale: number;
  opacity: number;
  rotation: [number, number, number];
  extrudeDepth: number;
}

// ─── Constants ───

const ALL_SIGIL_CONFIGS: SigilConfig[] = [
  { url: "/sigils/flower-of-life.svg", position: [-3.5, 2, -8], scale: 1.2, opacity: 0.12, rotation: [0, 0, 0.001], extrudeDepth: 0.05 },
  { url: "/sigils/metatrons-cube.svg", position: [3, -1, -12], scale: 1.5, opacity: 0.08, rotation: [0, 0.0008, 0], extrudeDepth: 0.03 },
  { url: "/sigils/sri-yantra.svg", position: [-2, -3, -10], scale: 1.0, opacity: 0.1, rotation: [0, 0, -0.0006], extrudeDepth: 0.04 },
  { url: "/sigils/seed-of-life.svg", position: [4, 3, -6], scale: 0.8, opacity: 0.15, rotation: [0.0005, 0, 0], extrudeDepth: 0.06 },
  { url: "/sigils/nova-sigil-mark.svg", position: [-4, 0, -15], scale: 1.8, opacity: 0.06, rotation: [0, -0.0004, 0.0003], extrudeDepth: 0.02 },
];

const LINE_HALF_WIDTH = 0.25;
const SCALE_FACTOR = 0.004;

// Module-level shared state (singleton component, client-only)
const mousePos = { x: 0.5, y: 0.5 };
const scrollState = { progress: 0 };

// ─── SVG → Geometry ───

function parseSVGToGeometry(
  paths: THREE.ShapePath[],
  extrudeDepth: number,
): THREE.BufferGeometry {
  const allShapes: THREE.Shape[] = [];

  for (const shapePath of paths) {
    // Try createShapes first (works for closed paths: circles, polygons, rects)
    const shapes = SVGLoader.createShapes(shapePath);
    if (shapes.length > 0) {
      allShapes.push(...shapes);
      continue;
    }

    // Fallback for stroke-only open paths (lines, arcs)
    for (const subPath of shapePath.subPaths) {
      const points = subPath.getPoints();
      if (points.length < 2) continue;

      if (points.length === 2) {
        // 2-point line → thin rectangle
        const [p0, p1] = points;
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len < 0.001) continue;
        const nx = (-dy / len) * LINE_HALF_WIDTH;
        const ny = (dx / len) * LINE_HALF_WIDTH;

        const rect = new THREE.Shape();
        rect.moveTo(p0.x + nx, p0.y + ny);
        rect.lineTo(p1.x + nx, p1.y + ny);
        rect.lineTo(p1.x - nx, p1.y - ny);
        rect.lineTo(p0.x - nx, p0.y - ny);
        rect.closePath();
        allShapes.push(rect);
      } else {
        allShapes.push(new THREE.Shape(points));
      }
    }
  }

  if (allShapes.length === 0) {
    return new THREE.BufferGeometry();
  }

  const geometry = new THREE.ExtrudeGeometry(allShapes, {
    depth: extrudeDepth,
    bevelEnabled: false,
  });

  // Center geometry
  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  geometry.translate(
    -(box.max.x + box.min.x) / 2,
    -(box.max.y + box.min.y) / 2,
    -(box.max.z + box.min.z) / 2,
  );

  // Flip Y (SVG Y-down → Three.js Y-up)
  geometry.scale(1, -1, 1);

  return geometry;
}

// ─── Floating Sigil Mesh ───

function FloatingSigil({
  config,
  geometry,
}: {
  config: SigilConfig;
  geometry: THREE.BufferGeometry;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  const [baseX, baseY, z] = config.position;
  const parallaxSpeed = THREE.MathUtils.mapLinear(z, -6, -15, -2, -0.5);
  const mouseStrength = 5 / Math.abs(z);

  useEffect(() => {
    return () => {
      materialRef.current?.dispose();
    };
  }, []);

  useFrame(() => {
    if (!meshRef.current || reducedMotion) return;

    // Slow rotation
    meshRef.current.rotation.x += config.rotation[0];
    meshRef.current.rotation.y += config.rotation[1];
    meshRef.current.rotation.z += config.rotation[2];

    // Scroll parallax
    const scrollY = baseY + scrollState.progress * parallaxSpeed;

    // Mouse parallax (lerped for smoothness)
    const targetX = (mousePos.x - 0.5) * -0.3 * mouseStrength;
    const targetY = (mousePos.y - 0.5) * -0.3 * mouseStrength;
    offsetRef.current.x += (targetX - offsetRef.current.x) * 0.05;
    offsetRef.current.y += (targetY - offsetRef.current.y) * 0.05;

    meshRef.current.position.x = baseX + offsetRef.current.x;
    meshRef.current.position.y = scrollY + offsetRef.current.y;
    meshRef.current.position.z = z;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[baseX, baseY, z]}
      scale={config.scale * SCALE_FACTOR}
    >
      <meshBasicMaterial
        ref={materialRef}
        color="#f2ca50"
        wireframe
        transparent
        opacity={config.opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

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

const GOLD_COLOR = new THREE.Color("#f2ca50");
const PARTICLE_Z_MIN = -5;
const PARTICLE_Z_MAX = -20;
const PARTICLE_Z_MID = -12;
const PARTICLE_BOUNDS = 20;
const REPULSION_RADIUS = 3;
const REPULSION_STRENGTH = 0.5;
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
        pos[i3] = (Math.random() - 0.5) * PARTICLE_BOUNDS * 2;
        pos[i3 + 1] = (Math.random() - 0.5) * PARTICLE_BOUNDS * 2;
        pos[i3 + 2] = PARTICLE_Z_MIN + Math.random() * (PARTICLE_Z_MAX - PARTICLE_Z_MIN);

        col[i3] = GOLD_COLOR.r * 0.05;
        col[i3 + 1] = GOLD_COLOR.g * 0.05;
        col[i3 + 2] = GOLD_COLOR.b * 0.05;

        spd[i] = 0.001 + Math.random() * 0.004;
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
    PARTICLE_Z_MID, -6, -15, -2, -0.5,
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
      if (posArr[i3 + 1] > PARTICLE_BOUNDS) {
        posArr[i3 + 1] = -PARTICLE_BOUNDS;
        posArr[i3] = (Math.random() - 0.5) * PARTICLE_BOUNDS * 2;
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
      const brightness = 0.02 + (twinkle * 0.5 + 0.5) * 0.06; // range [0.02, 0.08]
      colArr[i3] = GOLD_COLOR.r * brightness;
      colArr[i3 + 1] = GOLD_COLOR.g * brightness;
      colArr[i3 + 2] = GOLD_COLOR.b * brightness;
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
        uniforms={{ uSize: { value: 0.8 } }}
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
      pos[i3] = (Math.random() - 0.5) * PARTICLE_BOUNDS * 2;
      pos[i3 + 1] = (Math.random() - 0.5) * PARTICLE_BOUNDS * 2;
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
    STAR_Z_MID, -6, -15, -2, -0.5,
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
      if (posArr[i3 + 1] > PARTICLE_BOUNDS) {
        posArr[i3 + 1] = -PARTICLE_BOUNDS;
        posArr[i3] = (Math.random() - 0.5) * PARTICLE_BOUNDS * 2;
      }

      // Twinkle — dim white, range [0.03, 0.06]
      const twinkle = Math.sin(time * twinkleFreq[i] + twinklePhase[i]);
      const brightness = 0.03 + (twinkle * 0.5 + 0.5) * 0.03;
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
        uniforms={{ uSize: { value: 0.5 } }}
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
  maxSigils,
  bloomEnabled,
  particleCount,
}: {
  maxSigils: number;
  bloomEnabled: boolean;
  particleCount: number;
}) {
  const [geometries, setGeometries] = useState<Map<string, THREE.BufferGeometry>>(
    new Map(),
  );
  const geometriesRef = useRef<THREE.BufferGeometry[]>([]);
  const configs = useMemo(
    () => ALL_SIGIL_CONFIGS.slice(0, maxSigils),
    [maxSigils],
  );

  useEffect(() => {
    const loader = new SVGLoader();
    let disposed = false;

    Promise.all(
      ALL_SIGIL_CONFIGS.map(async (config) => {
        const data = await loader.loadAsync(config.url);
        const result = data as { paths: THREE.ShapePath[] };
        return [config.url, parseSVGToGeometry(result.paths, config.extrudeDepth)] as const;
      }),
    ).then((results) => {
      if (disposed) {
        results.forEach(([, geo]) => geo.dispose());
        return;
      }
      const geos = results.map(([, geo]) => geo);
      geometriesRef.current = geos;
      setGeometries(new Map(results));
    });

    return () => {
      disposed = true;
      geometriesRef.current.forEach((geo) => geo.dispose());
      geometriesRef.current = [];
    };
  }, []);

  return (
    <>
      <MouseTracker />
      <ScrollTracker />
      <Starscape />
      <GoldParticles count={particleCount} />
      {configs.map((config) => {
        const geometry = geometries.get(config.url);
        if (!geometry) return null;
        return (
          <FloatingSigil key={config.url} config={config} geometry={geometry} />
        );
      })}
      {bloomEnabled && (
        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={2.0}
            intensity={0.4}
            radius={0.2}
          />
        </EffectComposer>
      )}
    </>
  );
}

// ─── Canvas Wrapper ───

export function BackgroundSigils() {
  const [maxSigils, setMaxSigils] = useState(5);
  const [bloomEnabled, setBloomEnabled] = useState(true);
  const [particleCount, setParticleCount] = useState(3000);
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1]}
      frameloop={reducedMotion ? "demand" : "always"}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: false, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={() => loadingState.markReady()}
    >
      <PerformanceMonitor
        onDecline={() => {
          setMaxSigils(3);
          setBloomEnabled(false);
          setParticleCount(1000);
        }}
        onIncline={() => {
          setMaxSigils(5);
          setBloomEnabled(true);
          setParticleCount(3000);
        }}
      >
        <Scene maxSigils={maxSigils} bloomEnabled={bloomEnabled} particleCount={particleCount} />
      </PerformanceMonitor>
    </Canvas>
  );
}
