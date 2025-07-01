import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import Mail from "lucide-react/dist/esm/icons/mail";
import Clock from "lucide-react/dist/esm/icons/clock";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import Check from "lucide-react/dist/esm/icons/check";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  business: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      business: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('business', data.business || '');
      formData.append('message', data.message);
      
      const response = await fetch("https://formspree.io/f/xdkzbjne", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="section-padding bg-ink-800 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Get Started
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Start your new website with one message. Let's discuss your project and how I can help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="font-playfair text-2xl font-semibold mb-6">Ready to Begin?</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="text-gold text-xl mr-4 mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:conall@conallsheridan.ie" className="text-gray-300 hover:text-gold transition-colors">
                    conall@conallsheridan.ie
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-gold text-xl mr-4 mt-1">📱</div>
                <div>
                  <p className="font-medium">Phone & WhatsApp</p>
                  <a href="tel:+353861688112" className="text-gray-300 hover:text-gold transition-colors">
                    +353 86 1688112
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="text-gold text-xl mr-4 mt-1" />
                <div>
                  <p className="font-medium">Response Time</p>
                  <p className="text-gray-300">Usually within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="text-gold text-xl mr-4 mt-1" />
                <div>
                  <p className="font-medium">Project Timeline</p>
                  <p className="text-gray-300">Most websites completed in 2-4 weeks</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-warm-800 to-ink-600 rounded-xl">
              <h4 className="font-playfair text-xl font-semibold mb-3">What happens next?</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <Check className="text-gold mr-2 w-4 h-4" />
                  We'll schedule a brief call to discuss your needs
                </li>
                <li className="flex items-center">
                  <Check className="text-gold mr-2 w-4 h-4" />
                  I'll create a custom proposal and timeline
                </li>
                <li className="flex items-center">
                  <Check className="text-gold mr-2 w-4 h-4" />
                  You'll see designs and provide feedback
                </li>
                <li className="flex items-center">
                  <Check className="text-gold mr-2 w-4 h-4" />
                  Your website goes live!
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink-800">Name *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="focus:ring-gold focus:border-transparent text-ink-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink-800">Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          {...field} 
                          className="focus:ring-gold focus:border-transparent text-ink-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="business"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink-800">Business Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="focus:ring-gold focus:border-transparent text-ink-800">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hairdresser">Hairdresser/Salon</SelectItem>
                          <SelectItem value="cafe">Café/Restaurant</SelectItem>
                          <SelectItem value="dentist">Dentist/Medical</SelectItem>
                          <SelectItem value="plumber">Plumber</SelectItem>
                          <SelectItem value="electrician">Electrician</SelectItem>
                          <SelectItem value="law">Law Firm</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ink-800">Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={4}
                          placeholder="Tell me about your business and what you need from your website..."
                          className="focus:ring-gold focus:border-transparent text-ink-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full bg-ink-800 text-white hover:bg-ink-600 transition-colors duration-200"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}