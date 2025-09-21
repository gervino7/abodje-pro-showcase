import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, User, Mail, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  message: z.string().optional(),
  preferred_date: z.date(),
  preferred_time: z.string().min(1, "Veuillez sélectionner une heure"),
});

type FormData = z.infer<typeof formSchema>;

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

export const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      preferred_time: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    console.log("Submitting form with values:", values);

    try {
      // Combine date and time
      const [hours, minutes] = values.preferred_time.split(':').map(Number);
      const appointmentDateTime = new Date(values.preferred_date);
      appointmentDateTime.setHours(hours, minutes, 0, 0);

      console.log("Creating appointment for:", appointmentDateTime);

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('create-appointment', {
        body: {
          name: values.name,
          email: values.email,
          message: values.message,
          preferred_date: appointmentDateTime.toISOString(),
        },
      });

      console.log("Edge function response:", { data, error });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Une erreur est survenue");
      }

      if (data?.success) {
        setIsSuccess(true);
        toast({
          title: "✅ Rendez-vous confirmé !",
          description: data.message || "Votre demande a été traitée avec succès.",
          duration: 5000,
        });
        
        // Reset form
        form.reset();
      } else {
        throw new Error(data?.error || "Une erreur est survenue");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "❌ Erreur",
        description: error.message || "Une erreur est survenue lors de la soumission.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-elegant border-primary/20">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4 animate-scale-in" />
            <h3 className="text-2xl font-bold font-poppins text-primary mb-2">
              Rendez-vous confirmé ! 🎉
            </h3>
            <p className="text-muted-foreground font-roboto">
              Votre demande a été traitée avec succès. Vous recevrez un email de confirmation avec tous les détails.
            </p>
          </div>
          <Button 
            onClick={() => setIsSuccess(false)}
            className="bg-gradient-gold hover:bg-accent-hover text-accent-foreground font-medium shadow-gold"
          >
            Faire une nouvelle demande
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-elegant border-primary/20 animate-slide-up">
      <CardHeader className="text-center bg-gradient-hero text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Clock className="h-6 w-6" />
          <CalendarIcon className="h-6 w-6" />
        </div>
        <CardTitle className="text-3xl font-bold font-poppins">
          Réservez votre <span className="text-accent">consultation</span>
        </CardTitle>
        <CardDescription className="text-primary-foreground/80 text-lg">
          Planifiez un rendez-vous personnalisé pour discuter de votre projet
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2 text-primary font-medium">
                    <User className="h-4 w-4" />
                    <span>Nom complet *</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Votre nom et prénom" 
                      {...field}
                      className="h-12 border-primary/20 focus:border-primary focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2 text-primary font-medium">
                    <Mail className="h-4 w-4" />
                    <span>Adresse email *</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="votre.email@exemple.com" 
                      {...field}
                      className="h-12 border-primary/20 focus:border-primary focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Selection */}
            <FormField
              control={form.control}
              name="preferred_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center space-x-2 text-primary font-medium">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Date souhaitée *</span>
                  </FormLabel>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-12 justify-start text-left font-normal border-primary/20 hover:border-primary",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                          {field.value ? (
                            format(field.value, "PPP", { locale: undefined })
                          ) : (
                            <span>Sélectionner une date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setIsCalendarOpen(false);
                        }}
                        disabled={(date) =>
                          date < new Date() || date.getDay() === 0 || date.getDay() === 6
                        }
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Sélectionnez une date (lun-ven uniquement)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Selection */}
            <FormField
              control={form.control}
              name="preferred_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2 text-primary font-medium">
                    <Clock className="h-4 w-4" />
                    <span>Heure souhaitée *</span>
                  </FormLabel>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={field.value === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => field.onChange(time)}
                        className={cn(
                          "h-10 text-sm",
                          field.value === time 
                            ? "bg-primary text-primary-foreground shadow-md" 
                            : "border-primary/20 hover:border-primary hover:bg-primary/5"
                        )}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message Field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2 text-primary font-medium">
                    <MessageSquare className="h-4 w-4" />
                    <span>Message (optionnel)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez brièvement votre projet ou vos besoins..."
                      rows={4}
                      {...field}
                      className="border-primary/20 focus:border-primary focus:ring-primary resize-none"
                    />
                  </FormControl>
                  <FormDescription>
                    Partagez des détails sur votre projet pour une meilleure préparation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-semibold bg-gradient-gold hover:bg-accent-hover text-accent-foreground shadow-gold animate-glow"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                    <span>Création en cours...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Confirmer le rendez-vous</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Form>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-border">
          <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg">
            <CheckCircle className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-primary">Consultation gratuite</h4>
              <p className="text-sm text-muted-foreground">30-60 minutes selon vos besoins</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-accent/10 rounded-lg">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-primary">Réponse rapide</h4>
              <p className="text-sm text-muted-foreground">Confirmation sous 24h maximum</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};