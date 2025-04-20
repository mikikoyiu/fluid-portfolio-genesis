
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectImage {
  src: string;
  caption?: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  images: ProjectImage[];
  onClose: () => void;
}

const ProjectCard = ({ title, description, images, onClose }: ProjectCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
    playFlipSound();
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
    playFlipSound();
  };

  const playFlipSound = () => {
    // Create audio element for page flip sound
    const audio = new Audio("/assets/page-flip.mp3");
    audio.volume = 0.3;
    audio.play().catch(err => console.log("Audio play failed:", err));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      rotateY: direction > 0 ? -45 : 45,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    })
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <motion.div 
        className="relative bg-portfolio-dark/95 border border-white/10 rounded-2xl max-w-4xl w-full overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <span className="text-white text-xl">&times;</span>
        </button>
        
        {/* Project info */}
        <div className="p-8 pb-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-portfolio-purple via-portfolio-pink to-portfolio-blue bg-clip-text text-transparent mb-2">
            {title}
          </h2>
          <p className="text-white/80 mb-4">{description}</p>
        </div>
        
        {/* Image carousel */}
        <div className="relative h-[50vh] overflow-hidden">
          <AnimatePresence custom={direction} initial={false} mode="wait">
            <motion.div
              key={currentImageIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center perspective-1000"
            >
              <div className="relative w-full h-full perspective-1000">
                {/* Image */}
                <img
                  src={images[currentImageIndex].src || "/assets/project-placeholder.svg"}
                  alt={title}
                  className="w-full h-full object-contain"
                />
                
                {/* Image reflection/shadow for 3D effect */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent"
                  style={{
                    transform: "rotateX(180deg) translateY(100%)",
                    opacity: 0.4,
                    filter: "blur(3px)"
                  }}
                />
                
                {/* Caption */}
                {images[currentImageIndex].caption && (
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <div className="inline-block backdrop-blur-sm bg-black/50 px-4 py-2 rounded-full text-sm text-white/90">
                      {images[currentImageIndex].caption}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="text-white" size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="text-white" size={24} />
              </button>
            </>
          )}
          
          {/* Pagination dots */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentImageIndex ? 1 : -1);
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImageIndex === index 
                      ? "bg-white scale-125" 
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
