"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { projects } from "@/lib/content";

// 3D Poster Node
const PosterNode = ({ position, rotation, imagePath }: { position: [number, number, number], rotation: [number, number, number], imagePath: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imagePath);
  
  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[1.5, 2.2]} />
      <meshStandardMaterial 
        map={texture}
        color="#ffffff"
        roughness={0.6}
        metalness={0.2}
      />
    </mesh>
  );
};

// Simple Curved Wall
const Wall = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create a curved grid of posters
  const posters = [];
  const radius = 6;
  const rows = 2;
  const cols = 5;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const angle = (col / (cols - 1)) * Math.PI - Math.PI / 2; // -90 to 90 degrees
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius - radius;
      const y = (row - rows / 2 + 0.5) * 2.5;
      
      const project = projects[(row * cols + col) % projects.length];
      
      posters.push(
        <PosterNode 
          key={`${row}-${col}`} 
          position={[x, y, z]} 
          rotation={[0, -angle, 0]} 
          imagePath={project.image || "/posters/placeholder.png"}
        />
      );
    }
  }

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle auto-rotation driven by mouse
      const targetRotation = (state.pointer.x * Math.PI) / 8;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {posters}
    </group>
  );
};

import Image from "next/image";

export const FilmographyWall = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full h-[80vh] bg-void overflow-hidden flex flex-col justify-center items-center py-20">
      <div className="absolute top-12 z-20 text-center w-full pointer-events-none">
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-display text-white mix-blend-difference">The Gallery</h2>
        <p className="text-chrome-silver text-sm uppercase tracking-widest mt-2">Explore the Archive</p>
      </div>

      {!isMobile ? (
        <div className="w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 0, 5]} intensity={1} />
            <React.Suspense fallback={null}>
              <Wall />
            </React.Suspense>
          </Canvas>
        </div>
      ) : (
        <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory px-8 gap-4 items-center hide-scrollbar">
           {projects.map((p, i) => (
             <div key={i} className="relative flex-shrink-0 w-[80vw] h-[60vh] bg-elevated border border-chrome-silver/10 rounded-card snap-center overflow-hidden flex items-end p-8 text-left shadow-2xl">
                <Image src={p.image || "/posters/placeholder.png"} alt={p.title} fill className="object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
                <div className="relative z-10 w-full">
                  <h3 className="text-2xl md:text-4xl font-display text-white">{p.title}</h3>
                </div>
             </div>
           ))}
        </div>
      )}
    </section>
  );
};
