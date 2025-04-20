
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ProjectCard from "./ProjectCard";

interface Project {
  id: string;
  title: string;
  description: string;
  category: "design" | "cad" | "hobbies";
  thumbnail: string;
  images: Array<{ src: string, caption?: string }>;
}

// Sample projects data
const projects: Project[] = [
  // Design Projects
  {
    id: "social-media",
    title: "Social Media Posting Designs",
    description: "A collection of eye-catching social media designs created for various brands and campaigns.",
    category: "design",
    thumbnail: "/assets/project-placeholder.svg",
    images: [
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Instagram carousel design for architectural showcase"
      },
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Social media campaign for sustainable architecture"
      },
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Brand consistency across platforms"
      }
    ]
  },
  {
    id: "architectural-commissions",
    title: "Architectural Commissions",
    description: "Professional architectural design work for residential and commercial clients.",
    category: "design",
    thumbnail: "/assets/project-placeholder.svg",
    images: [
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Modern residential concept" 
      },
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Commercial space renovation"
      },
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Sustainable urban planning proposal"
      }
    ]
  },
  
  // CAD Projects
  {
    id: "tiny-home",
    title: "Tiny Home Project",
    description: "A sustainable, space-efficient tiny home design with modern amenities.",
    category: "cad",
    thumbnail: "/assets/project-placeholder.svg",
    images: [
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Exterior rendering of tiny home design"
      },
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Interior layout optimization"
      },
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Sustainable features diagram"
      }
    ]
  },
  {
    id: "gadget-design",
    title: "Gadget Design",
    description: "Innovative gadget concepts designed for everyday convenience.",
    category: "cad",
    thumbnail: "/assets/project-placeholder.svg",
    images: [
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Smart home controller prototype" 
      },
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Ergonomic design process"
      }
    ]
  },
  {
    id: "furniture-design",
    title: "Furniture Design",
    description: "Custom furniture pieces designed with both aesthetics and functionality in mind.",
    category: "cad",
    thumbnail: "/assets/project-placeholder.svg",
    images: [
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Modular shelving system"
      },
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Ergonomic chair design"
      },
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Multi-functional table concept"
      }
    ]
  },
  
  // Hobby Projects
  {
    id: "nail-art",
    title: "Nail Art",
    description: "Creative nail art designs exploring color, texture, and patterns.",
    category: "hobbies",
    thumbnail: "/assets/project-placeholder.svg",
    images: [
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Geometric pattern collection"
      },
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Architectural inspiration series" 
      }
    ]
  },
  {
    id: "visual-arts",
    title: "Visual Arts",
    description: "Personal art projects across various mediums including digital and traditional.",
    category: "hobbies",
    thumbnail: "/assets/project-placeholder.svg",
    images: [
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Digital abstract compositions"
      },
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Mixed media explorations"
      }
    ]
  },
  {
    id: "photography",
    title: "Photography & Photoshop",
    description: "Photography work enhanced with creative Photoshop techniques.",
    category: "hobbies",
    thumbnail: "/assets/project-placeholder.svg",
    images: [
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Urban geometry photo series"
      },
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Light and shadow studies"
      },
      { 
        src: "/assets/project-placeholder.svg", 
        caption: "Digital composition experiments"
      }
    ]
  },
];

interface ProjectThumbnailProps {
  project: Project;
  onClick: () => void;
  delay: number;
}

const ProjectThumbnail = ({ project, onClick, delay }: ProjectThumbnailProps) => {
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-xl cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <div className="aspect-[4/3] w-full bg-gradient-to-br from-portfolio-purple/50 via-portfolio-pink/50 to-portfolio-blue/50 rounded-xl overflow-hidden shadow-lg relative">
        {/* Thumbnail image */}
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover opacity-90"
        />
        
        {/* Architectural grid overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="w-full h-full grid grid-cols-8 grid-rows-6">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-white/10"></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hover overlay with animated assembly effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-portfolio-dark/90 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Title with gradient animation */}
        <h3 className="text-lg font-semibold mb-1">
          <span className="bg-gradient-to-r from-portfolio-purple via-portfolio-pink to-portfolio-blue bg-clip-text text-transparent bg-[size:200%] hover:bg-[position:100%] transition-[background-position] duration-500">
            {project.title}
          </span>
        </h3>
        
        <p className="text-sm text-white/70 line-clamp-2">{project.description}</p>
      </div>
    </motion.div>
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
  
  // Create architectural blueprint lines
  const createBlueprintLines = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <div 
        key={`h-line-${index}`} 
        className="absolute left-0 right-0 h-px bg-white/5"
        style={{ top: `${(index + 1) * 10}%` }}
      />
    )).concat(
      Array.from({ length: 8 }).map((_, index) => (
        <div 
          key={`v-line-${index}`} 
          className="absolute top-0 bottom-0 w-px bg-white/5"
          style={{ left: `${(index + 1) * 10}%` }}
        />
      ))
    );
  };
  
  return (
    <section id={id} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* Blueprint grid background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {createBlueprintLines()}
        </div>
        
        {/* Section title with animated gradient */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-4xl md:text-5xl font-display font-bold mb-6 relative group`}>
            <span className="inline-block relative">
              {/* Gradient text */}
              <span className={`bg-gradient-to-r from-portfolio-purple via-portfolio-pink to-portfolio-blue bg-clip-text text-transparent bg-[size:200%] group-hover:bg-[position:100%] transition-[background-position] duration-700`}>
                {title}
              </span>
              
              {/* Bottom glowing line */}
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-portfolio-purple via-portfolio-pink to-portfolio-blue opacity-70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></span>
            </span>
          </h2>
          
          <p className="text-lg text-white/70 max-w-2xl mb-12">{description}</p>
        </motion.div>
        
        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectThumbnail 
              key={project.id}
              project={project}
              onClick={() => onProjectClick(project)}
              delay={index}
            />
          ))}
        </div>
      </div>
      
      {/* Background accent */}
      <motion.div 
        className={`absolute ${category === "design" ? "top-1/4 -left-40" : category === "cad" ? "bottom-1/4 -right-40" : "top-1/2 left-1/2 transform -translate-x-1/2"} w-96 h-96 rounded-full filter blur-[150px] -z-10 opacity-30`}
        style={{
          background: category === "design" 
            ? "radial-gradient(circle, rgba(155, 135, 245, 0.5) 0%, rgba(155, 135, 245, 0) 70%)"
            : category === "cad"
            ? "radial-gradient(circle, rgba(217, 70, 239, 0.4) 0%, rgba(217, 70, 239, 0) 70%)"
            : "radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, rgba(14, 165, 233, 0) 70%)"
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.35, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </section>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
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

      {selectedProject && (
        <ProjectCard
          title={selectedProject.title}
          description={selectedProject.description}
          images={selectedProject.images}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProjectsSection;
