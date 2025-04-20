
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { setupScene, createBlocks } from "./ParticleScene";

interface UseParticleSceneProps {
  particleCount: number;
  onSceneReady: (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, cubes: THREE.Mesh[]) => void;
}

export const useParticleScene = ({ particleCount, onSceneReady }: UseParticleSceneProps) => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    // Scene setup
    const scene = setupScene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    
    // Create and add blocks
    const blocks = createBlocks(particleCount);
    cubesRef.current = blocks;
    blocks.forEach(block => scene.add(block));

    // Notify parent component
    onSceneReady(scene, camera, renderer, blocks);

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Clean up geometries and materials
      cubesRef.current.forEach(cube => {
        cube.geometry.dispose();
        if (Array.isArray(cube.material)) {
          cube.material.forEach(material => material.dispose());
        } else {
          cube.material.dispose();
        }
      });
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, [particleCount, onSceneReady]);

  return {
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    cubes: cubesRef.current
  };
};
