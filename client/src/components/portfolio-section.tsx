import { motion } from "framer-motion";
import ImageIcon from "lucide-react/dist/esm/icons/image";

const portfolioItems = [
  {
    title: "Local Café Website",
    description: "Modern design with online menu and booking system",
    category: "Restaurant",
    categoryColor: "bg-gold"
  },
  {
    title: "Hair Salon Portfolio",
    description: "Stylish gallery with appointment booking",
    category: "Beauty",
    categoryColor: "bg-coral"
  },
  {
    title: "Electrician Services",
    description: "Professional site with service area maps",
    category: "Trades",
    categoryColor: "bg-ink-800"
  }
];

export default function PortfolioSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="section-padding bg-warm-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-ink-800 mb-4">
            Portfolio
          </h2>
          <p className="text-xl text-warm-600 max-w-2xl mx-auto">
            See how I've helped other small businesses create their perfect website.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
            >
              <div className="h-48 bg-gradient-to-br from-warm-200 to-warm-300 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-warm-400 mb-2 mx-auto" />
                  <p className="text-warm-600 font-medium">Coming Soon</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-ink-800 mb-2">{item.title}</h3>
                <p className="text-warm-600 mb-4">{item.description}</p>
                <span className={`inline-block ${item.categoryColor} text-white px-3 py-1 rounded-full text-sm`}>
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg inline-block"
          >
            <h3 className="font-playfair text-2xl font-semibold text-ink-800 mb-4">
              Let's Talk About Yours
            </h3>
            <p className="text-warm-600 mb-6">
              Ready to see your business with a beautiful new website?
            </p>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-ink-800 text-white px-8 py-3 rounded-full hover:bg-ink-600 transition-colors duration-200"
            >
              Start Your Project
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
