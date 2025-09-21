import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, MapPin, Briefcase } from "lucide-react";
import profileImage from "@/assets/konan-profile.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:24px_24px]" />
      </div>
      
      <div className="container relative z-10 px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left animate-slide-up">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              <Briefcase className="h-4 w-4 mr-2" />
              Informaticien Professionnel
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-poppins text-primary-foreground mb-6 leading-tight">
              KONAN
              <span className="block text-accent font-light">Abodje Inde</span>
              <span className="block text-primary-foreground">GERVAIS</span>
            </h1>
            
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 text-primary-foreground/80">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="font-roboto">D&G CONSEIL</span>
            </div>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 font-roboto leading-relaxed">
              Expert en développement web et applications mobiles avec une approche 
              <span className="text-accent font-semibold"> créative et innovante</span> pour 
              résoudre les défis technologiques complexes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" className="group">
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Me Contacter
              </Button>
              <Button variant="premium" size="xl" className="group">
                <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Télécharger CV
              </Button>
            </div>
          </div>
          
          {/* Right Content - Profile Image */}
          <div className="flex-shrink-0 animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-gold rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-accent shadow-gold">
                <img 
                  src={profileImage} 
                  alt="Konan Abodje Inde Gervais"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center animate-bounce">
                <Briefcase className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-background">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
};