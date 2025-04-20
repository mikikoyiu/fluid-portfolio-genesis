
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  category: "design" | "cad" | "hobbies";
  thumbnail: string;
}

// Sample projects data
const projects: Project[] = [
  // Design Projects
  {
    id: "social-media",
    title: "Social Media Posting Designs",
    description: "A collection of eye-catching social media designs created for various brands and campaigns.",
    category: "design",
    thumbnail: "social-media.jpg",
  },
  {
    id: "architectural-commissions",
    title: "Architectural Commissions",
    description: "Professional architectural design work for residential and commercial clients.",
    category: "design",
    thumbnail: "architecture.jpg",
  },
  
  // CAD Projects
  {
    id: "tiny-home",
    title: "Tiny Home Project",
    description: "A sustainable, space-efficient tiny home design with modern amenities.",
    category: "cad",
    thumbnail: "tiny-home.jpg",
  },
  {
    id: "gadget-design",
    title: "Gadget Design",
    description: "Innovative gadget concepts designed for everyday convenience.",
    category: "cad",
    thumbnail: "gadget.jpg",
  },
  {
    id: "furniture-design",
    title: "Furniture Design",
    description: "Custom furniture pieces designed with both aesthetics and functionality in mind.",
    category: "cad",
    thumbnail: "furniture.jpg",
  },
  
  // Hobby Projects
  {
    id: "nail-art",
    title: "Nail Art",
    description: "Creative nail art designs exploring color, texture, and patterns.",
    category: "hobbies",
    thumbnail: "nail-art.jpg",
  },
  {
    id: "visual-arts",
    title: "Visual Arts",
    description: "Personal art projects across various mediums including digital and traditional.",
    category: "hobbies",
    thumbnail: "visual-arts.jpg",
  },
  {
    id: "photography",
    title: "Photography & Photoshop",
    description: "Photography work enhanced with creative Photoshop techniques.",
    category: "hobbies",
    thumbnail: "photography.jpg",
  },
];

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <div 
      className="group relative overflow-hidden rounded-xl hover-scale cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[4/3] w-full bg-gradient-to-br from-portfolio-purple/50 via-portfolio-pink/50 to-portfolio-blue/50 rounded-xl overflow-hidden shadow-lg">
        <img 
          src="/assets/project-placeholder.svg" 
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-portfolio-dark/90 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
        <p className="text-sm text-white/70 line-clamp-2">{project.description}</p>
      </div>
    </div>
  );
};

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;
  
  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-portfolio-dark/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-portfolio-dark/95 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-xl animate-scale-up">
        <button 
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          onClick={onClose}
        >
          <span className="text-white">&times;</span>
        </button>
        
        {/* Project Image */}
        <div className="w-full aspect-video bg-gradient-to-r from-portfolio-purple/30 via-portfolio-pink/30 to-portfolio-blue/30 overflow-hidden">
          <img 
            src="/assets/project-placeholder.svg" 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Project Details */}
        <div className="p-6">
          <h3 className="text-2xl font-display font-bold text-white mb-3">{project.title}</h3>
          <p className="text-white/80 mb-6">{project.description}</p>
          
          <div className="flex items-center">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70 uppercase tracking-wide">
              {project.category}
            </span>
          </div>
          
          {/* Project specific content could be added here based on category */}
        </div>
      </div>
    </div>
  );
};

interface CategorySectionProps {
  id: string;
  title: string;
  description: string;
  color: string;
  category: "design" | "cad" | "hobbies";
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const CategorySection = ({ id, title, description, color, category, projects, onProjectClick }: CategorySectionProps) => {
  const filteredProjects = projects.filter(project => project.category === category);
  
  return (
    <section id={id} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <h2 
          className={`text-4xl md:text-5xl font-display font-bold mb-6 ${color}`}
        >
          {title}
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mb-12">{description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="opacity-0 animate-slide-up" 
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <ProjectCard project={project} onClick={() => onProjectClick(project)} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Background accent */}
      <div 
        className={`absolute ${category === "design" ? "top-1/4 -left-40" : category === "cad" ? "bottom-1/4 -right-40" : "top-1/2 left-1/2 transform -translate-x-1/2"} w-96 h-96 rounded-full filter blur-[150px] -z-10 opacity-30`}
        style={{
          background: category === "design" 
            ? "radial-gradient(circle, rgba(155, 135, 245, 0.5) 0%, rgba(155, 135, 245, 0) 70%)"
            : category === "cad"
            ? "radial-gradient(circle, rgba(217, 70, 239, 0.4) 0%, rgba(217, 70, 239, 0) 70%)"
            : "radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, rgba(14, 165, 233, 0) 70%)"
        }}
      />
    </section>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Clear selected project after animation
  };

  return (
    <div className="relative">
      <CategorySection
        id="design"
        title="Design Projects"
        description="A collection of creative design work spanning various mediums and purposes."
        color="text-portfolio-purple"
        category="design"
        projects={projects}
        onProjectClick={handleProjectClick}
      />
      
      <CategorySection
        id="cad"
        title="CAD Projects"
        description="Technical designs and 3D modeling work showcasing architectural and product design skills."
        color="text-portfolio-pink"
        category="cad"
        projects={projects}
        onProjectClick={handleProjectClick}
      />
      
      <CategorySection
        id="hobbies"
        title="Just-for-Fun / Hobbies"
        description="Personal creative projects that reflect my broader interests and artistic expression."
        color="text-portfolio-blue"
        category="hobbies"
        projects={projects}
        onProjectClick={handleProjectClick}
      />

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProjectsSection;
