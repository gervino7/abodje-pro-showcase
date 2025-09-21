import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Linkedin, Github, MessageCircle } from "lucide-react";

export const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "konan.abodje@dgconseil.ci",
      link: "mailto:konan.abodje@dgconseil.ci"
    },
    {
      icon: Phone, 
      label: "Téléphone",
      value: "+225 07 XX XX XX XX",
      link: "tel:+22507XXXXXXXX"
    },
    {
      icon: MapPin,
      label: "Localisation", 
      value: "Abidjan, Côte d'Ivoire",
      link: null
    }
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", link: "#" },
    { icon: Github, label: "GitHub", link: "#" },
    { icon: MessageCircle, label: "WhatsApp", link: "#" }
  ];

  return (
    <section className="py-20 bg-gradient-section">
      <div className="container px-4">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 px-4 py-2 border-primary text-primary">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-foreground mb-6">
            Discutons de votre <span className="text-accent">Projet</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-roboto">
            Prêt à transformer vos idées en solutions numériques innovantes ? Contactons-nous !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          
          {/* Contact Info */}
          <div className="animate-slide-up">
            <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold font-poppins text-foreground mb-6">
                  Informations de Contact
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-4 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                        <info.icon className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground font-medium">{info.label}</p>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="text-foreground hover:text-accent transition-colors font-roboto"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-roboto">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-lg font-semibold font-poppins text-foreground mb-4">
                    Réseaux Sociaux
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        className="w-10 h-10 bg-primary/10 hover:bg-accent/10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                      >
                        <social.icon className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="animate-slide-up">
            <Card className="border-0 shadow-gold bg-gradient-hero text-primary-foreground overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(51_100%_50%/0.1),transparent_50%)]" />
              <CardContent className="p-8 relative z-10">
                <h3 className="text-2xl font-bold font-poppins mb-6">
                  Démarrons votre Projet
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <p className="text-primary-foreground/90">Consultation gratuite</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <p className="text-primary-foreground/90">Devis personnalisé</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <p className="text-primary-foreground/90">Accompagnement complet</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <p className="text-primary-foreground/90">Solutions sur mesure</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="hero" size="lg" className="w-full group">
                    <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    Envoyer un Email
                  </Button>
                  <Button variant="outline" size="lg" className="w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Phone className="h-5 w-5" />
                    Programmer un Appel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};