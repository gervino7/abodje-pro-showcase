import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message, preferred_date } = await req.json();

    console.log('Creating appointment for:', { name, email, preferred_date });

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Save contact to database first
    const { data: contact, error: contactError } = await supabase
      .from('contacts')
      .insert({
        name,
        email,
        message,
        preferred_date,
        status: 'processing'
      })
      .select()
      .single();

    if (contactError) {
      console.error('Error saving contact:', contactError);
      throw new Error('Failed to save contact information');
    }

    console.log('Contact saved:', contact);

    // Create Calendly appointment
    const calendlyToken = Deno.env.get('CALENDLY_TOKEN');
    if (!calendlyToken) {
      throw new Error('Calendly token not configured');
    }

    const eventTypeUri = 'https://api.calendly.com/event_types/08d71a58-bdee-4272-bf9c-39bc3d2dfb9b';
    
    // Format the preferred date for Calendly
    const appointmentDate = new Date(preferred_date);
    const endTime = new Date(appointmentDate.getTime() + 60 * 60 * 1000); // 1 hour duration

    const calendlyPayload = {
      event_type: eventTypeUri,
      start_time: appointmentDate.toISOString(),
      end_time: endTime.toISOString(),
      invitee: {
        name: name,
        email: email,
        text_reminder_number: null
      },
      location: {
        type: "custom",
        location: "Appel vidéo - lien envoyé par email"
      },
      answers: [
        {
          question: "Message",
          answer: message || "Aucun message spécifique"
        }
      ]
    };

    console.log('Creating Calendly event with payload:', calendlyPayload);

    const calendlyResponse = await fetch('https://api.calendly.com/scheduled_events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${calendlyToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(calendlyPayload),
    });

    const calendlyData = await calendlyResponse.json();
    console.log('Calendly response:', calendlyData);

    if (!calendlyResponse.ok) {
      console.error('Calendly API error:', calendlyData);
      
      // Update contact status to failed but still return success to user
      await supabase
        .from('contacts')
        .update({ 
          status: 'calendly_failed',
          calendly_event_uri: JSON.stringify(calendlyData)
        })
        .eq('id', contact.id);

      // Return success anyway - contact is saved
      return new Response(JSON.stringify({ 
        success: true,
        message: 'Votre demande a été enregistrée. Nous vous contacterons bientôt.',
        contact_id: contact.id,
        calendly_error: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Update contact with Calendly event URI
    const { error: updateError } = await supabase
      .from('contacts')
      .update({ 
        status: 'completed',
        calendly_event_uri: calendlyData.resource?.uri || calendlyData.uri
      })
      .eq('id', contact.id);

    if (updateError) {
      console.error('Error updating contact:', updateError);
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Rendez-vous créé avec succès ! Vous recevrez un email de confirmation.',
      contact_id: contact.id,
      calendly_event: calendlyData.resource || calendlyData
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in create-appointment function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});