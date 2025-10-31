import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ViolinModel() {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/models/violin.glb");

  useEffect(() => {
    if (!group.current) return;

    gsap.to(group.current.rotation, {
      y: Math.PI * 2,       // full 360 spin
      ease: "none",
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,        // ties scroll to rotation
      },
    });
  }, [scene]);

  return <primitive ref={group} object={scene} />;
}

export default function ViolinScene() {
  return (
    <div id="scroll-container" style={{ height: "400vh" }}>
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1.5} />
        <ViolinModel />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
