import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/ProjectCard";
import { Folder, Sparkles } from "lucide-react";

export const ProjectsSection = () => {
  const projects = [
    {
      title: "Ivoire Riz",
      description: "Plateforme digitale complète pour la filière riz en Côte d'Ivoire. Solution innovante intégrant gestion des stocks, traçabilité de la production et système de commandes en ligne pour connecter producteurs, distributeurs et consommateurs.",
      technologies: ["React", "Node.js", "PostgreSQL", "API REST", "Dashboard Admin", "E-commerce"],
      link: "https://ivoireriz.abodje.com/",
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <ProjectCard {...project} />
            </div>
          ))}
          
          {/* Coming Soon Cards */}
          <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="bg-card/10 backdrop-blur-sm border border-accent/20 rounded-lg p-8 text-center min-h-[400px] flex flex-col justify-center">
              <Sparkles className="h-12 w-12 text-accent mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-bold font-poppins text-primary-foreground mb-3">
                Nouveaux Projets
              </h3>
              <p className="text-primary-foreground/70 mb-6">
                D'autres réalisations exceptionnelles arrivent bientôt...
              </p>
              <Badge variant="outline" className="border-accent text-accent mx-auto">
                En Développement
              </Badge>
            </div>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <div className="bg-card/10 backdrop-blur-sm border border-accent/20 rounded-lg p-8 text-center min-h-[400px] flex flex-col justify-center">
              <Sparkles className="h-12 w-12 text-accent mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-bold font-poppins text-primary-foreground mb-3">
                Solutions sur Mesure  
              </h3>
              <p className="text-primary-foreground/70 mb-6">
                Chaque projet est unique et développé selon vos besoins spécifiques
              </p>
              <Badge variant="outline" className="border-accent text-accent mx-auto">
                Personnalisé
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};