import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users } from "lucide-react";

interface CalendlySchedulerProps {
  url?: string;
  className?: string;
}

export const CalendlyScheduler = ({ 
  url = "https://calendly.com/votre-compte", // Remplacez par votre URL Calendly
  className = "" 
}: CalendlySchedulerProps) => {
  const calendlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Charger le script Calendly
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Nettoyer le script lors du démontage
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  useEffect(() => {
    // Initialiser le widget Calendly
    if (calendlyRef.current && (window as any).Calendly) {
      (window as any).Calendly.initInlineWidget({
        url: url,
        parentElement: calendlyRef.current,
        prefill: {},
        utm: {}
      });
    }
  }, [url]);

  return (
    <div className={`animate-slide-up ${className}`}>
      <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/50">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="border-primary text-primary">
                <Calendar className="h-4 w-4 mr-2" />
                Planification
              </Badge>
            </div>
            <h3 className="text-2xl font-bold font-poppins text-foreground mb-2">
              Réservez votre <span className="text-accent">Consultation</span>
            </h3>
            <p className="text-muted-foreground font-roboto">
              Choisissez un créneau qui vous convient pour discuter de votre projet
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>30-60 min</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span>Consultation gratuite</span>
              </div>
            </div>
          </div>
          
          {/* Widget Calendly */}
          <div className="relative">
            <div 
              ref={calendlyRef}
              className="calendly-inline-widget min-h-[500px] w-full"
              style={{
                minWidth: '320px',
                height: '580px'
              }}
            />
            
            {/* Fallback pour le cas où Calendly ne charge pas */}
            <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm" id="calendly-fallback">
              <div className="text-center p-8">
                <Calendar className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-4">Chargement du calendrier...</p>
                <a 
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors underline"
                >
                  Ouvrir Calendly dans un nouvel onglet
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Fonction utilitaire pour ouvrir Calendly en popup
export const openCalendlyPopup = (url: string) => {
  if ((window as any).Calendly) {
    (window as any).Calendly.showPopupWidget(url);
  } else {
    // Fallback - ouvrir dans un nouvel onglet
    window.open(url, '_blank');
  }
};