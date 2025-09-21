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
    <Card className="group overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-elegant hover:shadow-gold transition-all duration-500 hover:scale-105 animate-fade-in">
      <div className="relative">
        {image && (
          <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
            {title}
          </h3>
          <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
        </div>
        
        <p className="text-white/90 mb-4 leading-relaxed text-base">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <Button 
          className="w-full cta-primary group"
          asChild
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            Voir le projet
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};