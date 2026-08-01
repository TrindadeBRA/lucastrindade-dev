"use client"

import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Shape1() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[-2, 0, 0]}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.4}
        speed={1.5}
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
}

function Shape2() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Torus ref={meshRef} args={[0.8, 0.3, 16, 100]} position={[2, 0, 0]}>
      <MeshDistortMaterial
        color="#ec4899"
        attach="material"
        distort={0.3}
        speed={2}
        transparent
        opacity={0.6}
      />
    </Torus>
  );
}

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 -z-10 opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Shape1 />
        <Shape2 />
      </Canvas>
    </div>
  );
}
