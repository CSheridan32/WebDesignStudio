import { motion } from "framer-motion";
import Heart from "lucide-react/dist/esm/icons/heart";
import Clock from "lucide-react/dist/esm/icons/clock";
import Smartphone from "lucide-react/dist/esm/icons/smartphone";

const values = [
  {
    icon: Heart,
    title: "Personal Attention",
    description: "Every website gets my full attention. No templates, no cookie-cutter solutions. Just thoughtful design tailored to your business.",
    color: "bg-gold"
  },
  {
    icon: Clock,
    title: "Reliable Timeline",
    description: "I understand you need your website yesterday. Clear timelines, regular updates, and delivery when promised.",
    color: "bg-coral"
  },
  {
    icon: Smartphone,
    title: "Modern Standards",
    description: "Your website will look great on every device, load fast, and rank well on Google. Built to today's standards.",
    color: "bg-ink-800"
  }
];

export default function ValuesSection() {
  return (
    <section className="section-padding bg-warm-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-ink-800 mb-4">
            Why Small Businesses Trust Me
          </h2>
          <p className="text-xl text-warm-600 max-w-2xl mx-auto">
            Three core principles that guide every project I take on.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg card-hover"
            >
              <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mb-6`}>
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-ink-800 mb-4">{value.title}</h3>
              <p className="text-warm-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
