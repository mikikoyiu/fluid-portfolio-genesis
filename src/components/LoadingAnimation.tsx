
import { useEffect, useState, useRef } from "react";

interface LoadingAnimationProps {
  onLoadingComplete: () => void;
}

const LoadingAnimation = ({ onLoadingComplete }: LoadingAnimationProps) => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Pouring in creativity...");
  const containerRef = useRef<HTMLDivElement>(null);

  const messages = [
    "Pouring in creativity...",
    "Hydrating ideas...",
    "Mixing design elements...",
    "Adding a splash of innovation...",
    "Stirring the creative waters...",
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let timeout: ReturnType<typeof setTimeout>;

    const simulateLoading = () => {
      interval = setInterval(() => {
        setLoadingPercentage((prev) => {
          const next = prev + Math.random() * 5;
          if (next >= 100) {
            clearInterval(interval);
            setLoadingPercentage(100);
            
            // Complete loading with some transition effects
            timeout = setTimeout(() => {
              if (containerRef.current) {
                containerRef.current.classList.add("animate-fade-out");
                setTimeout(onLoadingComplete, 800);
              }
            }, 1000);
            
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
  }, [onLoadingComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-portfolio-dark"
    >
      <div className="relative h-64 mb-10">
        <div className="text-[120px] md:text-[180px] font-display font-bold text-transparent relative">
          {/* Outlined MY letters */}
          <span className="absolute inset-0 text-transparent" style={{ 
            WebkitTextStroke: '2px rgba(255,255,255,0.8)'
          }}>
            MY
          </span>
          
          {/* Liquid fill container */}
          <div className="absolute inset-0 overflow-hidden" style={{ 
            height: `${loadingPercentage}%`, 
            transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
          }}>
            {/* Animated gradient text */}
            <span className="block text-transparent bg-gradient-to-b from-portfolio-purple via-portfolio-pink to-portfolio-blue bg-clip-text">
              MY
            </span>
            
            {/* Wave effect at top of liquid */}
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-portfolio-purple/50 via-portfolio-pink/50 to-portfolio-blue/50 opacity-80 animate-wave" 
              style={{ 
                borderRadius: '50% 50% 0 0',
                filter: 'blur(2px)'
              }}>
            </div>
            
            {/* Bubbles */}
            {loadingPercentage > 30 && (
              <>
                <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-white/60 animate-float opacity-80"></div>
                <div className="absolute bottom-2/3 right-1/3 w-3 h-3 rounded-full bg-white/60 animate-float opacity-80" 
                  style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-white/60 animate-float opacity-80"
                  style={{ animationDelay: '1s' }}></div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center">
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
