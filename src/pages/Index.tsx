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
      <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-8 border-t border-white/20">
        <div className="container px-4 text-center">
          <p className="text-white/80 text-base">
            © 2024 Konan Abodje Inde Gervais. Tous droits réservés.
          </p>
          <p className="text-white/60 text-sm mt-2">
            Développé avec passion et expertise
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;