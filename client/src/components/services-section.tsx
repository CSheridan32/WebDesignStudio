import { motion } from "framer-motion";
import { Check } from "lucide-react";

const services = [
  {
    title: "Website Design & Development",
    items: [
      "Custom website design from scratch",
      "Website redesigns and modernization",
      "Mobile-responsive development",
      "Fast loading and SEO optimized"
    ]
  },
  {
    title: "Technical Setup",
    items: [
      "Reliable hosting setup",
      "Local SEO optimization",
      "Contact forms and email setup",
      "Content management systems"
    ]
  },
  {
    title: "Content & Strategy",
    items: [
      "Content structuring and organization",
      "Professional copywriting guidance",
      "Brand consistency and messaging",
      "Social media integration"
    ]
  },
  {
    title: "Ongoing Support",
    items: [
      "Regular updates and maintenance",
      "Security monitoring and backups",
      "Performance optimization",
      "Training and support"
    ]
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-ink-800 mb-4">
            Services
          </h2>
          <p className="text-xl text-warm-600 max-w-2xl mx-auto">
            Everything you need to establish a professional online presence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-warm-50 p-8 rounded-xl border border-warm-100"
            >
              <h3 className="font-playfair text-2xl font-semibold text-ink-800 mb-4">{service.title}</h3>
              <ul className="space-y-3 text-warm-600">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-gold mr-3 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
