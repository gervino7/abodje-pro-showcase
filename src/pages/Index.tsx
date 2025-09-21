import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { ChatBot } from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <ChatBot />
      
      {/* Footer */}
      <footer className="bg-primary py-8 border-t border-primary-light">
        <div className="container px-4 text-center">
          <p className="text-primary-foreground/70 font-roboto">
            © 2024 Konan Abodje Inde Gervais. Tous droits réservés.
          </p>
          <p className="text-primary-foreground/50 text-sm mt-2">
            Développé avec passion et expertise
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;