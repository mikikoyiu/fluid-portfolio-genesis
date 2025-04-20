
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isOverLink, setIsOverLink] = useState(false);
  const [trails, setTrails] = useState<{ x: number; y: number; opacity: number }[]>([]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
      
      // Check if mouse is over a clickable element
      const target = e.target as HTMLElement;
      setIsOverLink(
        target.tagName === "A" || 
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.classList.contains("clickable")
      );
      
      // Add trail point
      setTrails(prev => {
        const newTrails = [
          { x: e.clientX, y: e.clientY, opacity: 0.8 },
          ...prev.slice(0, 5)
        ].map((trail, i) => ({
          ...trail,
          opacity: trail.opacity - 0.15
        }));
        
        return newTrails;
      });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!visible) return null;

  // Grid size for architectural dot matrix
  const gridSize = 3;
  const gridSpacing = 4;

  return (
    <>
      {/* Trail effect */}
      {trails.map((trail, i) => (
        <div 
          key={i}
          className="fixed w-1 h-1 pointer-events-none z-50 rounded-full bg-portfolio-purple/30"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            opacity: trail.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* Architectural cursor - dot matrix grid */}
      <div 
        className="fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out transform-gpu"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : isOverLink ? 1.5 : 1})`,
          width: `${gridSize * gridSpacing}px`,
          height: `${gridSize * gridSpacing}px`,
        }}
      >
        {/* Generate grid of dots for architectural pattern */}
        {Array.from({ length: gridSize }).map((_, rowIndex) => (
          Array.from({ length: gridSize }).map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="absolute bg-white rounded-full transition-all duration-200"
              style={{
                width: isOverLink ? '2px' : '1.5px',
                height: isOverLink ? '2px' : '1.5px',
                left: colIndex * gridSpacing,
                top: rowIndex * gridSpacing,
                opacity: isOverLink ? 0.9 : 0.7,
              }}
            />
          ))
        ))}
      </div>
      
      {/* Center dot or reticle */}
      <div 
        className="fixed w-2 h-2 pointer-events-none z-50 rounded-full transition-transform duration-150 ease-out transform-gpu"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 1.2 : isOverLink ? 1.5 : 1})`,
          background: isOverLink ? 'rgba(155, 135, 245, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          boxShadow: isOverLink ? '0 0 10px rgba(155, 135, 245, 0.7)' : 'none',
        }}
      />
      
      {/* Outer ring */}
      <div 
        className="fixed pointer-events-none z-50 rounded-full border transition-all duration-200 ease-out transform-gpu"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.9 : isOverLink ? 1.5 : 1})`,
          width: isOverLink ? '32px' : '24px',
          height: isOverLink ? '32px' : '24px',
          borderWidth: '1px',
          borderColor: isOverLink ? 'rgba(217, 70, 239, 0.7)' : 'rgba(255, 255, 255, 0.2)',
        }}
      />
      
      {/* Hover interaction indicator */}
      {isOverLink && (
        <div 
          className="fixed w-48 h-48 pointer-events-none z-40 rounded-full blur-3xl opacity-10 transition-all duration-300 ease-out transform-gpu"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(155, 135, 245, 0.8) 0%, rgba(217, 70, 239, 0.3) 50%, transparent 80%)',
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
