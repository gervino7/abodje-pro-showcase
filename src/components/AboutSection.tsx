import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Lightbulb, Zap, Target, Users } from "lucide-react";

export const AboutSection = () => {
  const formations = [
    {
      degree: "Master en Administration des Affaires",
      field: "Affaires Internationales", 
      school: "Amity University",
      year: "2018",
      location: "Inde"
    },
    {
      degree: "Master en Développement d'Applications",
      field: "Informatique",
      school: "Groupe ITA", 
      year: "2014",
      location: "Côte d'Ivoire"
    },
    {
      degree: "Licence en Science Informatique",
      field: "Informatique",
      school: "Université Félix Houphouët-Boigny",
      year: "2013", 
      location: "Côte d'Ivoire"
    }
  ];

  const competences = [
    { icon: Zap, title: "Développement Web", desc: "Applications modernes et performantes" },
    { icon: Target, title: "Résolution de Problèmes", desc: "Solutions innovantes et efficaces" },
    { icon: Lightbulb, title: "Créativité", desc: "Approche originale des défis" },
    { icon: Users, title: "Conseil", desc: "Accompagnement stratégique" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)] animate-pulse-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,215,0,0.15),transparent_50%)]" />
      
      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="professional-tag inline-flex items-center mb-4">
            <Award className="h-4 w-4 mr-2" />
            À Propos
          </div>
          <h2 className="hero-title text-4xl md:text-5xl text-white mb-6">
            Profil <span className="text-gradient-gold">Professionnel</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full shadow-gold" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Bio Section */}
          <div className="animate-slide-up">
            <Card className="border-0 shadow-elegant bg-white/10 backdrop-blur-md border border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Lightbulb className="h-6 w-6 text-yellow-400 mr-3" />
                  Vision & Expertise
                </h3>
                <div className="space-y-4 text-white/90 leading-relaxed text-base">
                  <p>
                    Informaticien passionné avec plus de <span className="text-yellow-400 font-semibold">10 ans d'expérience</span> 
                    dans le développement d'applications et le conseil technologique, je transforme les idées en solutions 
                    numériques performantes.
                  </p>
                  <p>
                    Ma formation internationale et ma maîtrise des technologies modernes me permettent d'offrir 
                    une <span className="text-blue-300 font-semibold">approche créative et adaptable</span> pour 
                    résoudre les défis les plus complexes.
                  </p>
                  <p>
                    Chez <span className="text-yellow-400 font-semibold">D&G CONSEIL</span>, je développe des stratégies 
                    innovantes qui allient expertise technique et vision business pour maximiser l'impact des projets digitaux.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Compétences */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {competences.map((comp, index) => (
                <Card key={index} className="border-0 shadow-gold hover:shadow-gold bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 group hover:scale-105">
                  <CardContent className="p-4 text-center">
                    <comp.icon className="h-8 w-8 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-white mb-1">{comp.title}</h4>
                    <p className="text-xs text-white/70">{comp.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Formation Section */}
          <div className="animate-slide-up">
            <Card className="border-0 shadow-elegant bg-white/10 backdrop-blur-md border border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <GraduationCap className="h-6 w-6 text-yellow-400 mr-3" />
                  Formation Académique
                </h3>
                
                <div className="space-y-6">
                  {formations.map((formation, index) => (
                    <div key={index} className="relative pl-8 pb-6 last:pb-0">
                      {/* Timeline */}
                      <div className="absolute left-0 top-1 w-4 h-4 bg-yellow-400 rounded-full border-4 border-slate-800 shadow-gold" />
                      {index < formations.length - 1 && (
                        <div className="absolute left-2 top-5 w-0.5 h-16 bg-white/30" />
                      )}
                      
                      <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="text-xs px-2 py-1 bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                            {formation.year}
                          </Badge>
                          <Badge className="text-xs px-2 py-1 bg-blue-400/20 text-blue-300 border-blue-400/30">
                            {formation.location}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-white mb-1">
                          {formation.degree}
                        </h4>
                        <p className="text-sm text-blue-300 font-medium mb-1">{formation.field}</p>
                        <p className="text-sm text-white/70">{formation.school}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};