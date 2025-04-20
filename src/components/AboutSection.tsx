
import { useEffect, useRef } from "react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (textRef.current) {
              textRef.current.classList.add("animate-slide-up");
            }
            if (imageRef.current) {
              imageRef.current.classList.add("animate-scale-up");
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="section-padding min-h-screen flex flex-col justify-center relative"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Image Column */}
          <div 
            ref={imageRef}
            className="relative order-2 lg:order-1 opacity-0"
          >
            <div className="relative z-10">
              <div className="aspect-[3/4] bg-gradient-to-br from-portfolio-purple via-portfolio-pink to-portfolio-blue rounded-xl overflow-hidden shadow-xl">
                {/* Replace with actual image */}
                <img 
                  src="/assets/placeholder-portrait.svg" 
                  alt="Mikiko portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating icons */}
              <div className="absolute -left-5 top-10 p-3 glass-morphism rounded-lg animate-float shadow-lg">
                <div className="w-10 h-10 bg-portfolio-purple/30 rounded-md flex items-center justify-center">
                  <span className="text-xl">🖌️</span>
                </div>
              </div>
              
              <div className="absolute -right-5 top-32 p-3 glass-morphism rounded-lg animate-float shadow-lg" style={{ animationDelay: "1s" }}>
                <div className="w-10 h-10 bg-portfolio-purple/30 rounded-md flex items-center justify-center">
                  <span className="text-xl">🏗️</span>
                </div>
              </div>
              
              <div className="absolute right-10 -bottom-5 p-3 glass-morphism rounded-lg animate-float shadow-lg" style={{ animationDelay: "1.5s" }}>
                <div className="w-10 h-10 bg-portfolio-purple/30 rounded-md flex items-center justify-center">
                  <span className="text-xl">💡</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Text Column */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">Hello, I'm Mikiko</h2>
            
            <p 
              ref={textRef}
              className="text-lg text-white/80 leading-relaxed mb-8 opacity-0"
            >
              I'm an Architectural Engineering student at the University of Waterloo. I'm passionate about design and driven by a love for problem-solving. Whether in my personal projects or professional work, I'm constantly inspired by the challenge of creating thoughtful, impactful solutions that make life better—and more meaningful.
            </p>
            
            {/* Tools & Technologies */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-white/90 mb-4">Tools & Technologies</h3>
              
              <div className="flex flex-wrap gap-3">
                {["AutoCAD", "Rhino", "Adobe CC", "Photoshop", "Illustrator", "InDesign"].map((tool) => (
                  <div 
                    key={tool}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition-all duration-300 hover-scale"
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-portfolio-purple/20 rounded-full filter blur-[120px] -z-10 opacity-40"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-portfolio-blue/20 rounded-full filter blur-[100px] -z-10 opacity-40"></div>
    </section>
  );
};

export default AboutSection;
