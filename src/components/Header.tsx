
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavLink {
  title: string;
  href: string;
}

const navLinks: NavLink[] = [
  { title: "About", href: "#about" },
  { title: "Design", href: "#design" },
  { title: "CAD", href: "#cad" },
  { title: "Hobbies", href: "#hobbies" },
  { title: "Contact", href: "#contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Add background when scrolled down
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = document.querySelectorAll("section[id]");
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.getAttribute("id") || "";
        
        if (sectionTop <= 100 && sectionTop >= -section.clientHeight + 100) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out py-5 px-6 md:px-10",
        isScrolled ? "backdrop-blur-md bg-portfolio-dark/80 border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="font-display font-bold text-xl md:text-2xl text-gradient relative"
        >
          MIKIKO
          <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-portfolio-purple to-portfolio-blue group-hover:w-full transition-all duration-300"></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className={cn(
                "text-sm font-medium relative transition-all duration-300 hover:text-white group",
                activeSection === link.href.replace("#", "") ? "text-white" : "text-white/70"
              )}
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(link.href);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                  // Optional: update URL without full page reload
                  window.history.pushState(null, "", link.href);
                }
              }}
            >
              {link.title}
              <span className={cn(
                "absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-portfolio-purple to-portfolio-blue transition-all duration-300",
                activeSection === link.href.replace("#", "") ? "w-full" : "w-0 group-hover:w-full" 
              )}></span>
            </a>
          ))}
        </nav>
        
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span 
            className={cn(
              "w-5 h-0.5 bg-white transition-all duration-300",
              isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
            )}
          />
          <span 
            className={cn(
              "w-5 h-0.5 bg-white transition-all duration-300",
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            )}
          />
          <span 
            className={cn(
              "w-5 h-0.5 bg-white transition-all duration-300",
              isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
            )}
          />
        </button>
        
        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 z-40 bg-portfolio-dark/95 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-500",
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
        >
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.title}
                href={link.href}
                className={cn(
                  "text-xl font-medium relative transition-all duration-300 hover:text-white",
                  activeSection === link.href.replace("#", "") ? "text-white" : "text-white/70"
                )}
                style={{
                  animation: isMobileMenuOpen 
                    ? `fadeInDown 0.4s ${0.1 + index * 0.1}s both` 
                    : "none"
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  const element = document.querySelector(link.href);
                  if (element) {
                    setTimeout(() => {
                      element.scrollIntoView({ behavior: "smooth" });
                      window.history.pushState(null, "", link.href);
                    }, 300);
                  }
                }}
              >
                {link.title}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-portfolio-purple to-portfolio-blue transition-all duration-300",
                  activeSection === link.href.replace("#", "") ? "w-full" : "w-0 group-hover:w-full" 
                )}></span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
