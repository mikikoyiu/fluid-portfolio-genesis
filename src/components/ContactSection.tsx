
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail } from "lucide-react";

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      
      // Reset success message after delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding min-h-screen flex flex-col justify-center relative">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient">Let's Connect</h2>
            <p className="text-lg text-white/70 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            {/* Social Links */}
            <div className="space-y-6 py-6">
              <a 
                href="mailto:contact@example.com" 
                className="flex items-center gap-4 p-4 glass-morphism rounded-xl transition-all duration-300 hover-scale"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10">
                  <Mail className="w-5 h-5 text-portfolio-purple" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/60">Email</p>
                  <p className="text-white">contact@example.com</p>
                </div>
              </a>

              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-morphism rounded-xl transition-all duration-300 hover-scale"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10">
                  <Linkedin className="w-5 h-5 text-portfolio-purple" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/60">LinkedIn</p>
                  <p className="text-white">linkedin.com/in/mikiko</p>
                </div>
              </a>

              <a 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-morphism rounded-xl transition-all duration-300 hover-scale"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10">
                  <Github className="w-5 h-5 text-portfolio-purple" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/60">GitHub</p>
                  <p className="text-white">github.com/mikiko</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-morphism rounded-2xl p-6 md:p-8 shadow-lg">
            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-portfolio-purple/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-portfolio-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-white/70">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-6">Send Me a Message</h3>
                
                <div className="space-y-4">
                  {/* Name Field */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full h-12 px-4 pt-2 bg-transparent border border-white/20 rounded-lg focus:border-portfolio-purple/50 outline-none transition-all duration-200",
                        formState.name ? "border-white/30" : ""
                      )}
                    />
                    <label
                      htmlFor="name"
                      className={cn(
                        "absolute left-4 transition-all duration-200",
                        formState.name 
                          ? "top-1 text-xs text-white/50" 
                          : "top-1/2 -translate-y-1/2 text-white/40"
                      )}
                    >
                      Your Name
                    </label>
                  </div>
                  
                  {/* Email Field */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full h-12 px-4 pt-2 bg-transparent border border-white/20 rounded-lg focus:border-portfolio-purple/50 outline-none transition-all duration-200",
                        formState.email ? "border-white/30" : ""
                      )}
                    />
                    <label
                      htmlFor="email"
                      className={cn(
                        "absolute left-4 transition-all duration-200",
                        formState.email 
                          ? "top-1 text-xs text-white/50" 
                          : "top-1/2 -translate-y-1/2 text-white/40"
                      )}
                    >
                      Your Email
                    </label>
                  </div>
                  
                  {/* Message Field */}
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className={cn(
                        "w-full p-4 pt-6 bg-transparent border border-white/20 rounded-lg focus:border-portfolio-purple/50 outline-none transition-all duration-200 resize-none",
                        formState.message ? "border-white/30" : ""
                      )}
                    />
                    <label
                      htmlFor="message"
                      className={cn(
                        "absolute left-4 transition-all duration-200",
                        formState.message 
                          ? "top-2 text-xs text-white/50" 
                          : "top-4 text-white/40"
                      )}
                    >
                      Your Message
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full py-3 rounded-lg font-medium transition-all duration-300",
                    isSubmitting 
                      ? "bg-portfolio-purple/50 cursor-not-allowed" 
                      : "bg-gradient-to-r from-portfolio-purple to-portfolio-pink hover:shadow-lg hover:shadow-portfolio-purple/20"
                  )}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-portfolio-purple/10 to-transparent -z-10"></div>
    </section>
  );
};

export default ContactSection;
