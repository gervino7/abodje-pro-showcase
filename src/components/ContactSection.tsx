import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Linkedin, Github, MessageCircle } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";

export const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "inddger7@gmail.com",
      link: "mailto:inddger7@gmail.com"
    },
    {
      icon: Phone, 
      label: "Téléphone",
      value: "+225 05 06 80 31 13",
      link: "tel:+2250506803113"
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
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(120,119,198,0.3),transparent_50%)] animate-pulse-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,215,0,0.15),transparent_50%)]" />
      
      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="professional-tag inline-flex items-center mb-4">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact
          </div>
          <h2 className="hero-title text-4xl md:text-5xl text-white mb-6">
            Discutons de votre <span className="text-gradient-gold">Projet</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full shadow-gold mb-6" />
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Prêt à transformer vos idées en solutions numériques innovantes ? Contactons-nous !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <div className="animate-slide-up">
            <Card className="border-0 shadow-elegant bg-white/10 backdrop-blur-md border border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Informations de Contact
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-4 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center group-hover:bg-yellow-400/30 transition-colors border border-yellow-400/30">
                        <info.icon className="h-5 w-5 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white/70 font-medium">{info.label}</p>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="text-white hover:text-yellow-400 transition-colors text-base"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white text-base">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Réseaux Sociaux
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        className="w-10 h-10 bg-white/10 hover:bg-yellow-400/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group border border-white/20 hover:border-yellow-400/30"
                      >
                        <social.icon className="h-5 w-5 text-white group-hover:text-yellow-400 transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="space-y-3">
                    <Button className="w-full group cta-primary">
                      <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      Envoyer un Email
                    </Button>
                    <Button className="w-full cta-secondary">
                      <Phone className="h-5 w-5" />
                      Appeler Maintenant
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="animate-slide-up">
            <BookingForm />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="border-0 shadow-gold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.2),transparent_50%)]" />
            <CardContent className="p-8 relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Pourquoi Choisir Nos Services ?
                </h3>
                <p className="text-white/90 text-lg">
                  Découvrez les avantages de travailler avec un expert
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full flex-shrink-0" />
                  <p className="text-white/95 text-base">Consultation gratuite de 30 minutes</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full flex-shrink-0" />
                  <p className="text-white/95 text-base">Devis détaillé et personnalisé</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full flex-shrink-0" />
                  <p className="text-white/95 text-base">Accompagnement de A à Z</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full flex-shrink-0" />
                  <p className="text-white/95 text-base">Solutions innovantes sur mesure</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};