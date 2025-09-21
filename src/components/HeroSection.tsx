import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Mail } from "lucide-react";
import profileImage from "@/assets/konan-profile.jpg";
import { useEffect, useRef } from "react";

export const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };

    // Particle explosion on click
    const handleClick = (e: MouseEvent) => {
      if (!particlesRef.current) return;
      
      const rect = particlesRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create explosion particles
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-explosion';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--angle', `${(i * 30)}deg`);
        particlesRef.current.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Luminous Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="orb-luminous"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Particle explosion container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-50" />
      
      <div className="container relative z-10 px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <Badge className="professional-tag">
              Informaticien Professionnel
            </Badge>
            
            <h1 className="hero-title">
              <span className="typing-animation">KONAN</span>
              <span className="block text-gradient-gold font-light">Abodje Inde</span>
              <span className="block text-white">GERVAIS</span>
            </h1>
            
            <div className="company-name">
              D&G CONSEIL
            </div>
            
            <p className="hero-description">
              Expert en développement web et applications mobiles avec une approche 
              <span className="highlight-gradient"> créative et innovante</span> pour 
              résoudre les défis technologiques complexes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="cta-primary group">
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Me Contacter
              </Button>
              <Button className="cta-secondary group">
                <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Télécharger CV
              </Button>
            </div>
          </div>
          
          {/* Right Content - Profile Section */}
          <div className="flex justify-center">
            <div className="profile-container">
              {/* Rotating Background */}
              <div className="profile-bg-rotate" />
              
              {/* Profile Image */}
              <div className="profile-image-wrapper">
                <img 
                  src={profileImage} 
                  alt="Konan Abodje Inde Gervais"
                  className="profile-image"
                />
                <div className="profile-glow" />
              </div>
              
              {/* Orbiting Skills */}
              <div className="skills-orbit">
                <div className="skill-item" style={{'--orbit-angle': '0deg'} as React.CSSProperties}>React</div>
                <div className="skill-item" style={{'--orbit-angle': '90deg'} as React.CSSProperties}>Node.js</div>
                <div className="skill-item" style={{'--orbit-angle': '180deg'} as React.CSSProperties}>Mobile</div>
                <div className="skill-item" style={{'--orbit-angle': '270deg'} as React.CSSProperties}>UI/UX</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};