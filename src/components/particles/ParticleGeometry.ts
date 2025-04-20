
import * as THREE from "three";

export const createGeometries = () => {
  return [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.BoxGeometry(1.5, 0.5, 0.5),
    new THREE.BoxGeometry(0.5, 1.5, 0.5),
    new THREE.BoxGeometry(0.5, 0.5, 1.5),
    new THREE.CylinderGeometry(0.3, 0.3, 1.5, 6),
  ];
};

export const colors = [
  '#9b87f5', // Purple
  '#7E69AB', // Medium Purple
  '#D946EF', // Pink
  '#33C3F0', // Light Blue
  '#0EA5E9', // Blue
];

