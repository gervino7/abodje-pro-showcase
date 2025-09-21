import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/ProjectCard";
import { Folder, Sparkles } from "lucide-react";

export const ProjectsSection = () => {
  const projects = [
    {
      title: "Ivoire Riz",
      description: "Plateforme e-commerce premium pour le riz local ivoirien. 15+ années d'expérience, 500+ partenaires distributeurs, production de 10K+ tonnes/an. Valorisation du patrimoine agricole avec innovation technologique.",
      technologies: ["E-commerce", "React", "Node.js", "WhatsApp Business", "Gestion Stocks", "B2B/B2C"],
      link: "https://ivoireriz.abodje.com/",
      image: "/placeholder.svg"
    },
    {
      title: "ONG-AEM",
      description: "\"L'Amour en Manifestation\" - Plateforme humanitaire dédiée à l'assistance aux populations démunies de RDC. Mission d'aide alimentaire, santé, éducation et soutien communautaire avec transparence totale.",
      technologies: ["React", "CMS", "Donations", "Responsive Design", "Multi-langues", "Humanitarian"],
      link: "https://ong-aem.abodje.com/",
      image: "/placeholder.svg"
    },
    {
      title: "Formation Pro CEFP-DA",
      description: "Plateforme de formation entrepreneuriale révolutionnaire. Transformez vos ressources en activité génératrice de revenus en 2 jours. Programme clé en main avec méthode éprouvée et outils pratiques.",
      technologies: ["Formation", "React", "Landing Page", "Countdown Timer", "Booking System", "EdTech"],
      link: "https://formationpro.abodje.com/",
      image: "/placeholder.svg"
    },
    {
      title: "Jean Louis Billon 2025",
      description: "Site de campagne présidentielle officiel pour JBL 2025. Plateforme politique moderne présentant le \"Plan B pour la Côte d'Ivoire\", galerie photos, countdown électoral et engagement citoyen.",
      technologies: ["Political Campaign", "React", "Galerie", "Countdown", "Booking RDV", "Interactive"],
      link: "https://jbl.abodje.com/",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-20 bg-primary">
      <div className="container px-4">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Folder className="h-4 w-4 mr-2" />
            Portfolio
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-primary-foreground mb-6">
            Projets <span className="text-accent">Réalisés</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full mb-6" />
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-roboto">
            Découvrez mes réalisations qui allient innovation technologique et impact business
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <ProjectCard {...project} />
            </div>
          ))}
          
          {/* Innovation Card */}
          <div className="animate-slide-up" style={{ animationDelay: "0.8s" }}>
            <div className="bg-gradient-to-br from-accent/20 via-primary/10 to-accent/10 backdrop-blur-sm border border-accent/30 rounded-lg p-8 text-center min-h-[400px] flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(51_100%_50%/0.1),transparent_50%)]" />
              <Sparkles className="h-12 w-12 text-accent mx-auto mb-4 animate-pulse relative z-10" />
              <h3 className="text-xl font-bold font-poppins text-primary-foreground mb-3 relative z-10">
                Innovation Continue
              </h3>
              <p className="text-primary-foreground/80 mb-6 relative z-10">
                Chaque projet pousse les limites de la créativité et de la technologie pour des résultats exceptionnels
              </p>
              <Badge variant="outline" className="border-accent text-accent mx-auto relative z-10 bg-background/20">
                Excellence Garantie
              </Badge>
            </div>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: "1s" }}>
            <div className="bg-gradient-to-bl from-primary/30 via-accent/10 to-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg p-8 text-center min-h-[400px] flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(220_100%_50%/0.1),transparent_50%)]" />
              <Sparkles className="h-12 w-12 text-accent mx-auto mb-4 animate-pulse relative z-10" />
              <h3 className="text-xl font-bold font-poppins text-primary-foreground mb-3 relative z-10">
                Solutions sur Mesure  
              </h3>
              <p className="text-primary-foreground/80 mb-6 relative z-10">
                Développement personnalisé selon vos besoins spécifiques et votre vision unique
              </p>
              <Badge variant="outline" className="border-accent text-accent mx-auto relative z-10 bg-background/20">
                100% Personnalisé
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};