"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Suppress upstream R3F internal THREE.Clock deprecation notice in Three.js r185+
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock: This module has been deprecated")) {
      return;
    }
    originalWarn(...args);
  };
}

// --- Procedural Authentic Batak Ulos Weave Texture Generator ---
function createUlosTexture(): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Base Deep Maroon / Crimson Ulos Cloth
    ctx.fillStyle = "#6B141E";
    ctx.fillRect(0, 0, 512, 1024);

    // Charcoal & Navy Weave Bands
    ctx.fillStyle = "#181418";
    ctx.fillRect(40, 0, 432, 1024);
    ctx.fillStyle = "#541018";
    ctx.fillRect(80, 0, 352, 1024);

    // Golden Edge Stripes (Rambu / Pinggiran Emas)
    ctx.fillStyle = "#D4AF37";
    ctx.fillRect(15, 0, 10, 1024);
    ctx.fillRect(35, 0, 4, 1024);
    ctx.fillRect(473, 0, 4, 1024);
    ctx.fillRect(487, 0, 10, 1024);

    // Geometric Batak Gorga Diamond Weave Patterns (Ragi Hotang Motifs)
    ctx.strokeStyle = "#E8C84A";
    ctx.lineWidth = 3;

    for (let y = 30; y < 1024; y += 70) {
      // Diamond Gorga Motifs
      ctx.beginPath();
      ctx.moveTo(256, y);
      ctx.lineTo(310, y + 35);
      ctx.lineTo(256, y + 70);
      ctx.lineTo(202, y + 35);
      ctx.closePath();
      ctx.fillStyle = "#8B1A1A";
      ctx.fill();
      ctx.stroke();

      // Inner Gold Star / Cross (Batak Sirat Motif)
      ctx.fillStyle = "#F5E6B3";
      ctx.beginPath();
      ctx.arc(256, y + 35, 6, 0, Math.PI * 2);
      ctx.fill();

      // Side Zigzag Geometrics
      ctx.beginPath();
      ctx.moveTo(110, y);
      ctx.lineTo(145, y + 35);
      ctx.lineTo(110, y + 70);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(402, y);
      ctx.lineTo(367, y + 35);
      ctx.lineTo(402, y + 70);
      ctx.stroke();
    }

    // White Silk Thread Accents
    ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
    ctx.lineWidth = 1.5;
    for (let y = 10; y < 1024; y += 35) {
      ctx.beginPath();
      ctx.moveTo(60, y);
      ctx.lineTo(452, y);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 2);
  return texture;
}

// --- 3D Flowing Batak Ulos Silk Ribbon (Organic Cloth Wave Physics) ---
function FloatingUlosRibbon({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ulosTexture = useMemo(() => createUlosTexture(), []);

  // Parametric Plane for Cloth Ripple
  const geometry = useMemo(() => new THREE.PlaneGeometry(isMobile ? 1.8 : 2.8, isMobile ? 8 : 11, 32, 64), [isMobile]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = performance.now() * 0.0012;
    const pos = geometry.attributes.position;
    const count = pos.count;
    const mouseX = state.pointer.x * 0.5;

    for (let i = 0; i < count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);

      // Natural Silken Cloth Flutter & Drape Equation
      const zWave =
        Math.sin(v * 0.85 + t * 2.2) * 0.45 +
        Math.cos(u * 1.5 + t * 1.6) * 0.25 +
        Math.sin((u + v) * 0.5 + t * 3.0) * 0.12;

      pos.setZ(i, zWave);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();

    // Gentle Floating Rotation & Position Sway
    meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.08 - 0.18;
    meshRef.current.rotation.y = Math.cos(t * 0.4) * 0.12 + 0.35 + mouseX * 0.15;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.25 - 0.2;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[isMobile ? 1.2 : 3.4, 0.2, -2.5]}
      rotation={[-0.2, 0.4, -0.2]}
    >
      <meshStandardMaterial
        map={ulosTexture}
        roughness={0.4}
        metalness={0.25}
        side={THREE.DoubleSide}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// --- Dual Color 3D Falling Rose & White Blossom Petals ---
function FloatingPetals({ isMobile }: { isMobile: boolean }) {
  const meshBlushRef = useRef<THREE.InstancedMesh>(null!);
  const meshIvoryRef = useRef<THREE.InstancedMesh>(null!);
  const count = isMobile ? 25 : 50;

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Petal Data
  const blushParticles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 18,
        z: (Math.random() - 0.5) * 6,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        speedY: 0.005 + Math.random() * 0.007,
        speedRot: (Math.random() - 0.5) * 0.015,
        scale: 0.12 + Math.random() * 0.12,
        swayFreq: 0.4 + Math.random() * 0.6,
      });
    }
    return temp;
  }, [count]);

  const ivoryParticles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 18,
        z: (Math.random() - 0.5) * 6,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        speedY: 0.004 + Math.random() * 0.006,
        speedRot: (Math.random() - 0.5) * 0.012,
        scale: 0.1 + Math.random() * 0.1,
        swayFreq: 0.5 + Math.random() * 0.5,
      });
    }
    return temp;
  }, [count]);

  // Realistic Organic Petal Geometry
  const petalGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.35, 0.35, 0.45, 0.85, 0, 1.25);
    shape.bezierCurveTo(-0.45, 0.85, -0.35, 0.35, 0, 0);
    const geo = new THREE.ShapeGeometry(shape, 8);
    return geo;
  }, []);

  useFrame((state) => {
    const t = performance.now() * 0.001;
    const mouseX = state.pointer.x * 0.8;

    // Update Blush Rose Petals
    if (meshBlushRef.current) {
      blushParticles.forEach((p, i) => {
        p.y -= p.speedY;
        p.x += Math.sin(t * p.swayFreq + i) * 0.004 + mouseX * 0.002;
        p.rotX += p.speedRot;
        p.rotY += p.speedRot * 1.3;
        p.rotZ += p.speedRot * 0.5;

        if (p.y < -9) {
          p.y = 9;
          p.x = (Math.random() - 0.5) * 16;
        }

        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
        dummy.scale.set(p.scale, p.scale, p.scale);
        dummy.updateMatrix();
        meshBlushRef.current.setMatrixAt(i, dummy.matrix);
      });
      meshBlushRef.current.instanceMatrix.needsUpdate = true;
    }

    // Update Silk Ivory Petals
    if (meshIvoryRef.current) {
      ivoryParticles.forEach((p, i) => {
        p.y -= p.speedY;
        p.x += Math.cos(t * p.swayFreq + i) * 0.003 - mouseX * 0.0015;
        p.rotX += p.speedRot * 1.1;
        p.rotY += p.speedRot;

        if (p.y < -9) {
          p.y = 9;
          p.x = (Math.random() - 0.5) * 16;
        }

        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
        dummy.scale.set(p.scale, p.scale, p.scale);
        dummy.updateMatrix();
        meshIvoryRef.current.setMatrixAt(i, dummy.matrix);
      });
      meshIvoryRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Blush Rose Petals */}
      <instancedMesh ref={meshBlushRef} args={[petalGeometry, undefined, count]}>
        <meshStandardMaterial
          color="#EEA89B"
          emissive="#F7D8D0"
          emissiveIntensity={0.25}
          roughness={0.35}
          metalness={0.08}
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
        />
      </instancedMesh>

      {/* Silk Ivory Petals */}
      <instancedMesh ref={meshIvoryRef} args={[petalGeometry, undefined, count]}>
        <meshStandardMaterial
          color="#FFFDF8"
          emissive="#FFF6E8"
          emissiveIntensity={0.35}
          roughness={0.4}
          metalness={0.05}
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </instancedMesh>
    </>
  );
}

// --- Shimmering Champagne Gold Sparkles & Floating Bokeh ---
function ChampagneDust({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = isMobile ? 60 : 130;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const t = performance.now() * 0.001;

    for (let i = 0; i < count; i++) {
      const iy = i * 3 + 1;
      pos[iy] += 0.0035;
      if (pos[iy] > 9) pos[iy] = -9;
      pos[i * 3] += Math.sin(t * 0.4 + i) * 0.0015;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.06 : 0.08}
        color="#D4AF37"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// --- Smooth Camera Sways with Pointer & Scroll ---
function CameraRig() {
  const { camera } = useThree();

  useFrame((state) => {
    const targetX = state.pointer.x * 0.35;
    const targetY = state.pointer.y * 0.25;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.03);
  });

  return null;
}

export default function UlosBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, isMobile ? 1 : 1.5]}
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", pointerEvents: "none" }}
        className="pointer-events-none"
      >
        <ambientLight intensity={1.2} color="#FFFFFF" />
        <directionalLight position={[5, 9, 5]} intensity={1.4} color="#FFF5E4" />
        <pointLight position={[-4, -3, 4]} intensity={0.8} color="#FCEAE1" />
        <pointLight position={[3, 4, 2]} intensity={1.0} color="#FFDF9E" />

        <CameraRig />
        <FloatingUlosRibbon isMobile={isMobile} />
        <FloatingPetals isMobile={isMobile} />
        <ChampagneDust isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
