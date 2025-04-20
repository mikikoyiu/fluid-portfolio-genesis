
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";

interface LoadingAnimationProps {
  onLoadingComplete: () => void;
}

const LoadingAnimation = ({ onLoadingComplete }: LoadingAnimationProps) => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Pouring in creativity...");
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const liquidRef = useRef<THREE.Mesh | null>(null);

  const messages = [
    "Pouring in creativity...",
    "Hydrating ideas...",
    "Mixing design elements...",
    "Adding a splash of innovation...",
    "Stirring the creative waters...",
  ];

  // Setup three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 5);
    scene.add(directionalLight);

    // Add point lights for better reflections
    const pointLight1 = new THREE.PointLight(0x9b87f5, 1, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xD946EF, 1, 50);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      requestAnimationFrame(animate);
      
      // Update any animated objects here
      if (liquidRef.current) {
        // Simulate liquid sloshing
        const time = Date.now() * 0.001;
        const liquidMesh = liquidRef.current;
        
        // Get geometry vertices and modify for wave effect
        if (liquidMesh.geometry instanceof THREE.BoxGeometry) {
          liquidMesh.rotation.x = Math.sin(time * 0.7) * 0.05;
          liquidMesh.rotation.z = Math.sin(time * 0.3) * 0.05;
          
          // Update liquid position based on loading percentage
          const maxHeight = 4; // Full height
          const targetHeight = (loadingPercentage / 100) * maxHeight - 2; // -2 to center at origin
          liquidMesh.position.y = targetHeight * 0.5 - 1.5; // Adjust position
          
          // Scale the liquid based on loading percentage
          liquidMesh.scale.y = (loadingPercentage / 100) * 0.8 + 0.05;
        }
      }
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    
    // Create liquid effect when letterRef is ready
    const createLiquidEffect = () => {
      if (!letterRef.current || !sceneRef.current) return;
      
      // Create a box geometry to represent liquid
      const liquidGeometry = new THREE.BoxGeometry(3, 3, 1.5);
      
      // Create a material with liquid-like properties
      const liquidMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x9b87f5,
        metalness: 0.1,
        roughness: 0.2,
        transmission: 0.95,
        thickness: 0.5,
        envMapIntensity: 1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.8
      });
      
      // Create the liquid mesh
      const liquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
      liquid.position.y = -2; // Start below
      liquid.position.z = -0.5; // Behind the letter
      liquidRef.current = liquid;
      
      sceneRef.current.add(liquid);
    };
    
    createLiquidEffect();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
      
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, []);

  // Loading simulation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let timeout: ReturnType<typeof setTimeout>;

    const simulateLoading = () => {
      interval = setInterval(() => {
        setLoadingPercentage((prev) => {
          const next = prev + Math.random() * 3;
          if (next >= 100) {
            clearInterval(interval);
            setLoadingPercentage(100);
            
            // Complete loading with some transition effects
            timeout = setTimeout(() => {
              if (containerRef.current) {
                containerRef.current.classList.add("animate-fade-out");
                // Add camera zoom effect
                if (cameraRef.current) {
                  const zoomOut = () => {
                    if (!cameraRef.current) return;
                    cameraRef.current.position.z -= 0.2;
                    if (cameraRef.current.position.z > 3) {
                      requestAnimationFrame(zoomOut);
                    }
                  };
                  zoomOut();
                }
                setTimeout(onLoadingComplete, 1200);
              }
            }, 1500);
            
            return 100;
          }
          return next;
        });

        // Change message during loading
        if (loadingPercentage < 20) {
          setLoadingMessage(messages[0]);
        } else if (loadingPercentage < 40) {
          setLoadingMessage(messages[1]);
        } else if (loadingPercentage < 60) {
          setLoadingMessage(messages[2]);
        } else if (loadingPercentage < 80) {
          setLoadingMessage(messages[3]);
        } else if (loadingPercentage < 100) {
          setLoadingMessage(messages[4]);
        }
      }, 100);
    };

    simulateLoading();

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onLoadingComplete, loadingPercentage]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-portfolio-dark"
    >
      <div className="relative h-64 mb-10">
        {/* 3D Canvas for Three.js rendering */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 z-10"
        />
        
        {/* 3D Text Reference */}
        <div ref={letterRef} className="text-[120px] md:text-[180px] font-display font-bold text-transparent relative">
          <span className="absolute inset-0 text-transparent" style={{ 
            WebkitTextStroke: '3px rgba(255,255,255,0.8)'
          }}>
            MY
          </span>
        </div>
      </div>
      
      <div className="flex flex-col items-center z-20">
        <p className="text-white/90 text-lg font-medium mb-3">
          {loadingMessage}
        </p>
        
        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-portfolio-purple via-portfolio-pink to-portfolio-blue rounded-full"
            style={{ width: `${loadingPercentage}%`, transition: 'width 0.3s ease-out' }}
          ></div>
        </div>
        
        <p className="mt-2 text-white/70 text-sm">
          {Math.round(loadingPercentage)}%
        </p>
      </div>
      
      {loadingPercentage === 100 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 rounded-full border border-portfolio-purple/50 animate-ripple"></div>
        </div>
      )}
    </div>
  );
};

export default LoadingAnimation;
