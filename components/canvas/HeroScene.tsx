'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Environment, Sphere } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Inner mesh that reacts to mouse ───────────────────── */
function GeometricCore() {
  const meshRef   = useRef<THREE.Mesh>(null);
  const glowRef   = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Gentle auto-rotation
    meshRef.current.rotation.x += delta * 0.12;
    meshRef.current.rotation.y += delta * 0.18;
    // Subtle mouse-tracking tilt
    meshRef.current.rotation.x +=
      (pointer.y * 0.3 - meshRef.current.rotation.x) * 0.04;
    meshRef.current.rotation.y +=
      (pointer.x * 0.5 - meshRef.current.rotation.y) * 0.04;

    // Glow sphere counter-rotation
    if (glowRef.current) {
      glowRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <Float
      speed={1.8}
      rotationIntensity={0.15}
      floatIntensity={0.6}
      floatingRange={[-0.08, 0.08]}
    >
      {/* ── Main torus knot ──────────────────────────── */}
      <mesh ref={meshRef} castShadow>
        <torusKnotGeometry args={[1, 0.32, 160, 24, 2, 3]} />
        <MeshDistortMaterial
          color="#00d4ff"
          emissive="#002233"
          emissiveIntensity={0.4}
          metalness={0.95}
          roughness={0.05}
          distort={0.08}
          speed={1.2}
          transparent
          opacity={0.92}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* ── Outer ghost shell ────────────────────────── */}
      <mesh ref={glowRef} scale={1.18}>
        <torusKnotGeometry args={[1, 0.32, 80, 16, 2, 3]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.15}
          transparent
          opacity={0.06}
          wireframe={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* ── Wireframe accent ─────────────────────────── */}
      <mesh scale={1.06}>
        <torusKnotGeometry args={[1, 0.32, 60, 8, 2, 3]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.07}
          wireframe
        />
      </mesh>
    </Float>
  );
}

/* ─── Orbiting particles ────────────────────────────────── */
function OrbitParticles({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r     = 2.2 + Math.random() * 1.4;
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#00d4ff"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Ambient glow sphere ───────────────────────────────── */
function GlowSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 0.6) * 0.04;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <Sphere ref={ref} args={[1.6, 32, 32]}>
      <meshBasicMaterial
        color="#00d4ff"
        transparent
        opacity={0.025}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

/* ─── Canvas wrapper ────────────────────────────────────── */
export default function HeroScene() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.88 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.15} />
          <pointLight position={[4, 4, 4]}  intensity={1.8} color="#00d4ff" />
          <pointLight position={[-4, -2, -4]} intensity={1.2} color="#7c3aed" />
          <pointLight position={[0, -4, 2]} intensity={0.6} color="#8b5cf6" />

          {/* Environment for reflections */}
          <Environment preset="night" />

          {/* Objects */}
          <GeometricCore />
          <OrbitParticles count={140} />
          <GlowSphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
