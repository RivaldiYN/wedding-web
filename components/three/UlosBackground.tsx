"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// --- Dual Color 3D Falling Rose & White Blossom Petals ---
function FloatingPetals({ isMobile }: { isMobile: boolean }) {
  const meshBlushRef = useRef<THREE.InstancedMesh>(null!);
  const meshIvoryRef = useRef<THREE.InstancedMesh>(null!);
  const count = isMobile ? 30 : 65;

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
        speedY: 0.005 + Math.random() * 0.008,
        speedRot: (Math.random() - 0.5) * 0.015,
        scale: 0.12 + Math.random() * 0.14,
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
        speedY: 0.004 + Math.random() * 0.007,
        speedRot: (Math.random() - 0.5) * 0.012,
        scale: 0.1 + Math.random() * 0.12,
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
    const geo = new THREE.ShapeGeometry(shape, 10);
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
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
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.08}
          side={THREE.DoubleSide}
          transparent
          opacity={0.88}
        />
      </instancedMesh>

      {/* Silk Ivory Petals */}
      <instancedMesh ref={meshIvoryRef} args={[petalGeometry, undefined, count]}>
        <meshStandardMaterial
          color="#FFFDF8"
          emissive="#FFF6E8"
          emissiveIntensity={0.4}
          roughness={0.35}
          metalness={0.05}
          side={THREE.DoubleSide}
          transparent
          opacity={0.82}
        />
      </instancedMesh>
    </>
  );
}

// --- 3D Interlocking Golden Wedding Rings (Delicate Luxury Accent) ---
function FloatingWeddingRings({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.35) * 0.15 + (isMobile ? 2.2 : 2.8);
  });

  const ringScale = isMobile ? 0.38 : 0.48;

  return (
    <group ref={groupRef} position={[isMobile ? 1.4 : 3.8, 2.8, -1.5]} scale={ringScale}>
      {/* Groom's Ring */}
      <mesh position={[-0.28, 0, 0]} rotation={[0.4, 0.6, 0]}>
        <torusGeometry args={[0.5, 0.05, 20, 64]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#9E7B35"
          emissiveIntensity={0.3}
          roughness={0.15}
          metalness={0.92}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Bride's Ring */}
      <mesh position={[0.28, 0.15, 0.15]} rotation={[-0.3, 0.4, 0.3]}>
        <torusGeometry args={[0.44, 0.042, 20, 64]} />
        <meshStandardMaterial
          color="#F5E6B3"
          emissive="#C5A869"
          emissiveIntensity={0.4}
          roughness={0.12}
          metalness={0.95}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

// --- Shimmering Champagne Gold Sparkles & Floating Bokeh ---
function ChampagneDust({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = isMobile ? 80 : 180;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const t = state.clock.getElapsedTime();

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
        size={isMobile ? 0.06 : 0.085}
        color="#D4AF37"
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

// --- Smooth Camera Sways with Pointer & Scroll ---
function CameraRig() {
  const { camera } = useThree();

  useFrame((state) => {
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.3;
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
        <directionalLight position={[5, 9, 5]} intensity={1.3} color="#FFF5E4" />
        <pointLight position={[-4, -3, 4]} intensity={0.7} color="#FCEAE1" />
        <pointLight position={[3, 4, 2]} intensity={0.9} color="#FFDF9E" />

        <CameraRig />
        <FloatingWeddingRings isMobile={isMobile} />
        <FloatingPetals isMobile={isMobile} />
        <ChampagneDust isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
