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
    // Vérifier si le script Calendly est déjà chargé
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        // Cacher le fallback une fois le script chargé
        const fallback = document.getElementById('calendly-fallback');
        if (fallback) {
          fallback.style.display = 'none';
        }
        // Initialiser le widget
        initializeWidget();
      };
      document.body.appendChild(script);
    } else {
      // Script déjà chargé, initialiser directement
      setTimeout(initializeWidget, 100);
    }

    return () => {
      // Pas de nettoyage automatique pour éviter les conflits
    };
  }, []);

  const initializeWidget = () => {
    if (calendlyRef.current && (window as any).Calendly) {
      // Nettoyer le contenu précédent
      calendlyRef.current.innerHTML = '';
      
      // Initialiser le widget Calendly avec configuration avancée
      (window as any).Calendly.initInlineWidget({
        url: url,
        parentElement: calendlyRef.current,
        prefill: {
          // Pré-remplir avec des données du site si disponibles
        },
        utm: {
          utmSource: 'website',
          utmMedium: 'inline_widget'
        }
      });
      
      // Cacher le fallback une fois initialisé
      const fallback = document.getElementById('calendly-fallback');
      if (fallback) {
        fallback.style.display = 'none';
      }
    }
  };

  useEffect(() => {
    // Initialiser le widget si Calendly est déjà disponible
    if ((window as any).Calendly) {
      initializeWidget();
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
            
            {/* Loader intégré pendant le chargement */}
            <div className="absolute inset-0 flex items-center justify-center bg-card/95 backdrop-blur-sm transition-all duration-500" id="calendly-fallback">
              <div className="text-center p-8">
                <div className="relative">
                  <Calendar className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
                  <div className="absolute inset-0 h-16 w-16 mx-auto border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <p className="text-muted-foreground mb-2 font-medium">Préparation de votre calendrier...</p>
                <p className="text-xs text-muted-foreground/70">Intégration directe sans redirection</p>
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