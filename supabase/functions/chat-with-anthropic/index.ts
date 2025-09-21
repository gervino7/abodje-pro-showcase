import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not configured');
    }

    const { message } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    console.log('Received message:', message);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        system: `Tu es un assistant personnel de Konan Abodje Inde Gervais, informaticien professionnel chez D&G CONSEIL.

Voici les informations sur Konan :
- Nom complet : KONAN Abodje Inde GERVAIS
- Fonction : Informaticien
- Employeur : D&G CONSEIL
- Email : inddger7@gmail.com
- Téléphone : +225 05 06 80 31 13

Formation :
- Licence en Science Informatique – Université Félix Houphouët-Boigny (2013)
- Master en Développement d'Applications – Groupe ITA (2014)
- Master en Administration des Affaires – Affaires Internationales – Amity University (Inde, 2018)

Projets réalisés :
1. Ivoire Riz (https://ivoireriz.abodje.com/) - Plateforme de commerce de riz avec géolocalisation et gestion des stocks
2. ONG-AEM (https://ong-aem.abodje.com/) - Site web pour l'ONG Association Enfants du Monde
3. Formation Pro CEFP-DA (https://formationpro.abodje.com/) - Plateforme de formation professionnelle
4. Jean Louis Billon 2025 (https://jbl.abodje.com/) - Site de campagne politique

Compétences clés :
- Développement web et applications mobiles
- Conception et architecture logicielle
- Conseil en solutions technologiques
- Résolution de problèmes complexes
- Créativité et innovation
- Adaptabilité aux nouvelles technologies

Tu dois répondre aux questions des visiteurs de manière professionnelle et chaleureuse, en mettant en avant l'expertise et l'expérience de Konan. Reste dans le contexte professionnel et aide les visiteurs à mieux comprendre son profil et ses compétences.`,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Anthropic response:', data);

    const assistantMessage = data.content[0]?.text || 'Je ne peux pas répondre à cette question pour le moment.';

    return new Response(JSON.stringify({ 
      response: assistantMessage 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-with-anthropic function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Une erreur est survenue' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});