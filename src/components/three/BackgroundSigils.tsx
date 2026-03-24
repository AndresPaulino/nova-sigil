"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

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

// ─── Scene ───

function Scene({
  maxSigils,
  bloomEnabled,
}: {
  maxSigils: number;
  bloomEnabled: boolean;
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
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1]}
      frameloop={reducedMotion ? "demand" : "always"}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: false, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <PerformanceMonitor
        onDecline={() => {
          setMaxSigils(3);
          setBloomEnabled(false);
        }}
        onIncline={() => {
          setMaxSigils(5);
          setBloomEnabled(true);
        }}
      >
        <Scene maxSigils={maxSigils} bloomEnabled={bloomEnabled} />
      </PerformanceMonitor>
    </Canvas>
  );
}
