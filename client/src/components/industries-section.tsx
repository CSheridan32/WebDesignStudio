import { motion } from "framer-motion";
import { Scissors, Coffee, Heart, Wrench, Zap, Scale, Settings, MoreHorizontal } from "lucide-react";

const industries = [
  {
    icon: Scissors,
    title: "Hairdressers",
    description: "Showcase your style and book appointments online"
  },
  {
    icon: Coffee,
    title: "Cafés & Restaurants",
    description: "Share your menu and atmosphere with the world"
  },
  {
    icon: Heart,
    title: "Dentists",
    description: "Build trust with professional online presence"
  },
  {
    icon: Wrench,
    title: "Tradespeople",
    description: "Get found and get booked with local SEO"
  },
  {
    icon: Zap,
    title: "Electricians",
    description: "Highlight your expertise and reliability"
  },
  {
    icon: Scale,
    title: "Law Firms",
    description: "Professional sites that inspire confidence"
  },
  {
    icon: Settings,
    title: "Plumbers",
    description: "Be the first call when emergencies happen"
  },
  {
    icon: MoreHorizontal,
    title: "And More",
    description: "Whatever your business, I can help"
  }
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-ink-800 mb-4">
            Industries I Serve
          </h2>
          <p className="text-xl text-warm-600 max-w-2xl mx-auto">
            From cafés to clinics, I help small businesses create their perfect online presence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-warm-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold transition-colors duration-200">
                <industry.icon className="w-8 h-8 text-ink-800 industry-icon" />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-ink-800 mb-2">{industry.title}</h3>
              <p className="text-warm-600">{industry.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
