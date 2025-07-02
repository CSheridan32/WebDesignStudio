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
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contact-submissions'] });
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
              <form
                action="https://formspree.io/f/xdkzbjne"
                method="POST"
                className="space-y-4"
              >
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Your Name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Your Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Business Type</span>
                  <select
                    name="businessType"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Select your industry</option>
                    <option value="hairdresser">Hairdresser</option>
                    <option value="cafe">Café / Restaurant</option>
                    <option value="tradesperson">Tradesperson</option>
                    <option value="small-firm">Small Firm</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Message</span>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Tell me about your business and what you need from your website…"
                  />
                </label>

                {/* honeypot to trap bots */}
                <input type="text" name="_gotcha" style={{ display: 'none' }} />

                {/* optional: custom email subject */}
                <input
                  type="hidden"
                  name="_subject"
                  value="New enquiry from conallsheridan.ie"
                />

                <button
                  type="submit"
                  className="inline-block w-full rounded bg-yellow-400 px-6 py-3 text-center font-semibold text-white hover:bg-yellow-500"
                >
                  Send Message
                </button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}