
import { useRef, useState } from "react";
import * as THREE from "three";
import { useParticleScene } from "./particles/useParticleScene";
import { useParticleAnimation } from "./particles/useParticleAnimation";

interface ParticleBackgroundProps {
  particleCount?: number;
}

const ParticleBackground = ({ particleCount = 60 }: ParticleBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sceneState, setSceneState] = useState<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    cubes: THREE.Mesh[];
  }>({ scene: null, camera: null, renderer: null, cubes: [] });

  useParticleScene({
    particleCount,
    onSceneReady: (scene, camera, renderer, cubes) => {
      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }
      setSceneState({ scene, camera, renderer, cubes });
    },
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useParticleAnimation({
    containerRef,
    scene: sceneState.scene!,
    camera: sceneState.camera!,
    renderer: sceneState.renderer!,
    cubes: sceneState.cubes,
    mousePosition,
  });

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-80"
    />
  );
};

export default ParticleBackground;
