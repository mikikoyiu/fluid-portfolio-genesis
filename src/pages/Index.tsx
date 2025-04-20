
import { useState, useEffect } from "react";
import LoadingAnimation from "../components/LoadingAnimation";
import ParticleBackground from "../components/ParticleBackground";
import CustomCursor from "../components/CustomCursor";
import Header from "../components/Header";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Optional: You can add a minimum loading time to ensure the animation is shown
    const minLoadingTime = 3500; // ms
    const startTime = Date.now();
    
    // Preload any necessary assets here
    const preloadAssets = async () => {
      // Simulate preloading time
      await new Promise((resolve) => {
        const remainingTime = Math.max(0, minLoadingTime - (Date.now() - startTime));
        setTimeout(resolve, remainingTime);
      });
      
      setIsLoading(false);
    };
    
    preloadAssets();
  }, []);

  if (isLoading) {
    return <LoadingAnimation onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      <CustomCursor />
      <ParticleBackground />
      <Header />
      
      <main className="pt-16">
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
