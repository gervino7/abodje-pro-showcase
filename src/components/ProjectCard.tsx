import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code, Zap } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image?: string;
}

export const ProjectCard = ({ title, description, technologies, link, image }: ProjectCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card border-0 shadow-card hover:shadow-gold transition-all duration-500 hover:scale-105 animate-fade-in">
      <div className="relative">
        {image && (
          <div className="aspect-video bg-gradient-section overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold font-poppins text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <Zap className="h-5 w-5 text-accent animate-pulse" />
        </div>
        
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <Button 
          variant="hero" 
          size="lg" 
          className="w-full group-hover:animate-glow"
          asChild
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            Voir le projet
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};