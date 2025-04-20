
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isOverLink, setIsOverLink] = useState(false);

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

  const cursorStyles = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : isOverLink ? 1.5 : 1})`,
    backgroundColor: isOverLink ? "rgba(155, 135, 245, 0.2)" : "transparent",
    mixBlendMode: "difference" as const,
  };

  return (
    <>
      {/* Main cursor */}
      <div 
        className="custom-cursor"
        style={cursorStyles}
      />
      
      {/* Inner dot */}
      <div 
        className="fixed w-1.5 h-1.5 pointer-events-none z-50 rounded-full bg-white transition-transform duration-150 ease-out transform-gpu"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 1.2 : isOverLink ? 0 : 1})`,
          mixBlendMode: "difference",
        }}
      />
      
      {/* Glow effect */}
      {isOverLink && (
        <div 
          className="fixed w-12 h-12 pointer-events-none z-40 rounded-full bg-portfolio-purple blur-md opacity-50 transition-transform duration-150 ease-out transform-gpu"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: `translate(-50%, -50%)`,
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
