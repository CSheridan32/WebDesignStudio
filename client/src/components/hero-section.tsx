import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-bg pt-20 section-padding">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-ink-800 mb-6 leading-tight">
              Beautiful websites for <span className="text-gradient">small businesses</span> who never thought they could afford them.
            </h1>
            <p className="text-xl text-warm-600 mb-8 leading-relaxed">
              I build websites that make it easy for customers to trust you. Clean, modern design that elevates your business online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-ink-800 text-white px-8 py-4 rounded-full hover:bg-ink-600 transition-colors duration-200 text-center font-medium"
              >
                Let's build something beautiful
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="border-2 border-ink-800 text-ink-800 px-8 py-4 rounded-full hover:bg-ink-800 hover:text-white transition-colors duration-200 text-center font-medium"
              >
                View Services
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src="/images/conall-headshot.jpeg" 
              alt="Conall Sheridan – Web Designer" 
              className="rounded-xl shadow-2xl w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
