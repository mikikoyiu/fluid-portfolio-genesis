
import * as THREE from "three";
import { colors, createGeometries } from "./ParticleGeometry";

export const setupScene = () => {
  const scene = new THREE.Scene();
  
  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(0, 10, 10);
  scene.add(directionalLight);
  
  const purpleLight = new THREE.PointLight(0x9b87f5, 0.8, 50);
  purpleLight.position.set(10, 5, 10);
  scene.add(purpleLight);
  
  const pinkLight = new THREE.PointLight(0xD946EF, 0.8, 50);
  pinkLight.position.set(-10, -5, 10);
  scene.add(pinkLight);
  
  return scene;
};

export const createBlocks = (particleCount: number) => {
  const cubes: THREE.Mesh[] = [];
  const geometries = createGeometries();
  
  for (let i = 0; i < particleCount; i++) {
    const geometryIndex = Math.floor(Math.random() * geometries.length);
    const geometry = geometries[geometryIndex];
    
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
    
    const spread = 40;
    cube.position.x = (Math.random() - 0.5) * spread;
    cube.position.y = (Math.random() - 0.5) * spread;
    cube.position.z = (Math.random() - 0.5) * spread;
    
    cube.rotation.x = Math.random() * Math.PI;
    cube.rotation.y = Math.random() * Math.PI;
    cube.rotation.z = Math.random() * Math.PI;
    
    cubes.push(cube);
  }
  
  return cubes;
};

