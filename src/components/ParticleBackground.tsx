
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ParticleBackgroundProps {
  particleCount?: number;
}

const ParticleBackground = ({ particleCount = 60 }: ParticleBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubesRef = useRef<THREE.Mesh[]>([]);

  // Generate gradient colors for particles
  const colors = [
    '#9b87f5', // Purple
    '#7E69AB', // Medium Purple
    '#D946EF', // Pink
    '#33C3F0', // Light Blue
    '#0EA5E9', // Blue
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
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
    
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
    
    // Add point lights for glow effects
    const purpleLight = new THREE.PointLight(0x9b87f5, 0.8, 50);
    purpleLight.position.set(10, 5, 10);
    scene.add(purpleLight);
    
    const pinkLight = new THREE.PointLight(0xD946EF, 0.8, 50);
    pinkLight.position.set(-10, -5, 10);
    scene.add(pinkLight);
    
    // Create architectural blocks
    const createBlocks = () => {
      cubesRef.current = [];
      
      // Different geometric shapes for architectural feel
      const geometries = [
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.BoxGeometry(1.5, 0.5, 0.5),
        new THREE.BoxGeometry(0.5, 1.5, 0.5),
        new THREE.BoxGeometry(0.5, 0.5, 1.5),
        new THREE.CylinderGeometry(0.3, 0.3, 1.5, 6),
      ];
      
      for (let i = 0; i < particleCount; i++) {
        // Choose a random geometry for variety
        const geometryIndex = Math.floor(Math.random() * geometries.length);
        const geometry = geometries[geometryIndex];
        
        // Create semi-transparent material with gradient color
        const colorIndex = Math.floor(Math.random() * colors.length);
        const material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(colors[colorIndex]),
          transparent: true,
          opacity: Math.random() * 0.3 + 0.1,
          metalness: 0.2,
          roughness: 0.5,
          transmission: 0.6,
          reflectivity: 0.5,
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Position cubes in space
        const spread = 40;
        cube.position.x = (Math.random() - 0.5) * spread;
        cube.position.y = (Math.random() - 0.5) * spread;
        cube.position.z = (Math.random() - 0.5) * spread;
        
        // Random rotation
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        cube.rotation.z = Math.random() * Math.PI;
        
        // Add to scene and reference array
        scene.add(cube);
        cubesRef.current.push(cube);
      }
    };
    
    createBlocks();
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Handle mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to range -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      // Move camera slightly based on mouse position (parallax effect)
      if (cameraRef.current) {
        const targetX = mousePosition.x * 2; 
        const targetY = mousePosition.y * 2;
        
        // Smooth camera movement
        cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.05;
        cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.05;
        
        cameraRef.current.lookAt(0, 0, 0);
      }
      
      // Animate cubes
      cubesRef.current.forEach(cube => {
        // Slow rotation
        cube.rotation.x += 0.002;
        cube.rotation.y += 0.003;
        
        // Subtle floating motion
        const time = Date.now() * 0.001;
        const index = cubesRef.current.indexOf(cube);
        cube.position.y += Math.sin(time + index) * 0.003;
        cube.position.x += Math.cos(time + index * 0.5) * 0.002;
      });
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (rendererRef.current && rendererRef.current.domElement) {
        if (containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }
      
      // Clean up geometries and materials
      if (cubesRef.current.length > 0) {
        cubesRef.current.forEach(cube => {
          cube.geometry.dispose();
          if (Array.isArray(cube.material)) {
            cube.material.forEach(material => material.dispose());
          } else {
            cube.material.dispose();
          }
          if (sceneRef.current) {
            sceneRef.current.remove(cube);
          }
        });
      }
      
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, [particleCount, colors]);
  
  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-80"
    />
  );
};

export default ParticleBackground;
