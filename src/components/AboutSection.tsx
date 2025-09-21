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
    <section className="py-20 bg-gradient-section">
      <div className="container px-4">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 px-4 py-2 border-primary text-primary">
            <Award className="h-4 w-4 mr-2" />
            À Propos
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-foreground mb-6">
            Profil <span className="text-accent">Professionnel</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Bio Section */}
          <div className="animate-slide-up">
            <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold font-poppins text-foreground mb-6 flex items-center">
                  <Lightbulb className="h-6 w-6 text-accent mr-3" />
                  Vision & Expertise
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Informaticien passionné avec plus de <span className="text-accent font-semibold">10 ans d'expérience</span> 
                    dans le développement d'applications et le conseil technologique, je transforme les idées en solutions 
                    numériques performantes.
                  </p>
                  <p>
                    Ma formation internationale et ma maîtrise des technologies modernes me permettent d'offrir 
                    une <span className="text-primary font-semibold">approche créative et adaptable</span> pour 
                    résoudre les défis les plus complexes.
                  </p>
                  <p>
                    Chez <span className="text-accent font-semibold">D&G CONSEIL</span>, je développe des stratégies 
                    innovantes qui allient expertise technique et vision business pour maximiser l'impact des projets digitaux.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Compétences */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {competences.map((comp, index) => (
                <Card key={index} className="border-0 shadow-card hover:shadow-gold transition-all duration-300 group">
                  <CardContent className="p-4 text-center">
                    <comp.icon className="h-8 w-8 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold font-poppins text-foreground mb-1">{comp.title}</h4>
                    <p className="text-xs text-muted-foreground">{comp.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Formation Section */}
          <div className="animate-slide-up">
            <Card className="border-0 shadow-card bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold font-poppins text-foreground mb-6 flex items-center">
                  <GraduationCap className="h-6 w-6 text-accent mr-3" />
                  Formation Académique
                </h3>
                
                <div className="space-y-6">
                  {formations.map((formation, index) => (
                    <div key={index} className="relative pl-8 pb-6 last:pb-0">
                      {/* Timeline */}
                      <div className="absolute left-0 top-1 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-md" />
                      {index < formations.length - 1 && (
                        <div className="absolute left-2 top-5 w-0.5 h-16 bg-border" />
                      )}
                      
                      <div className="bg-background/50 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs px-2 py-1">
                            {formation.year}
                          </Badge>
                          <Badge variant="outline" className="text-xs px-2 py-1 border-accent text-accent">
                            {formation.location}
                          </Badge>
                        </div>
                        <h4 className="font-semibold font-poppins text-foreground">
                          {formation.degree}
                        </h4>
                        <p className="text-sm text-primary font-medium">{formation.field}</p>
                        <p className="text-sm text-muted-foreground">{formation.school}</p>
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