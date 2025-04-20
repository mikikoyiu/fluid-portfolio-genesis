
import { useEffect, useRef, RefObject } from "react";
import * as THREE from "three";

interface UseParticleAnimationProps {
  containerRef: RefObject<HTMLDivElement>;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  cubes: THREE.Mesh[];
  mousePosition: { x: number; y: number };
}

export const useParticleAnimation = ({
  containerRef,
  scene,
  camera,
  renderer,
  cubes,
  mousePosition,
}: UseParticleAnimationProps) => {
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    
    containerRef.current.appendChild(renderer.domElement);
    
    const animate = () => {
      if (!scene || !camera || !renderer) return;
      
      // Move camera based on mouse position (parallax effect)
      const targetX = mousePosition.x * 2;
      const targetY = mousePosition.y * 2;
      
      // Smooth camera movement
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      
      camera.lookAt(0, 0, 0);
      
      // Animate cubes
      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.002;
        cube.rotation.y += 0.003;
        
        const time = Date.now() * 0.001;
        cube.position.y += Math.sin(time + index) * 0.003;
        cube.position.x += Math.cos(time + index * 0.5) * 0.002;
      });
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [containerRef, scene, camera, renderer, cubes, mousePosition]);
};

