
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-white/10 py-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-white/50 text-sm">
            © {currentYear} Mikiko. All rights reserved.
          </p>
        </div>
        
        <div className="flex space-x-4">
          <a 
            href="mailto:contact@example.com" 
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:text-portfolio-purple"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a 
            href="https://linkedin.com/" 
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:text-portfolio-purple"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a 
            href="https://github.com/" 
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:text-portfolio-purple"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
