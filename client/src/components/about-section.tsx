import { motion } from "framer-motion";

export default function AboutSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="/images/conall-headshot-2025.jpeg" 
              alt="Conall Sheridan - Professional headshot" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-ink-800 mb-6">
              About Conall
            </h2>
            <div className="space-y-6 text-lg text-warm-600 leading-relaxed">
              <p>
                I build websites that make it easy for customers to trust you. After years of seeing small businesses struggle with complicated web solutions, I decided to focus on what really matters: clean design, reliable performance, and real results.
              </p>
              <p>
                My approach is simple: listen to your needs, understand your customers, and create something beautiful that works. No jargon, no overselling, just thoughtful design that helps your business grow.
              </p>
              <p>
                Whether you're a hairdresser who needs to showcase your work, a plumber who wants to be found online, or a café owner ready to share your story, I'm here to help you create something you'll be proud of.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-gold text-white px-8 py-3 rounded-full hover:bg-yellow-600 transition-colors duration-200 text-center"
              >
                Let's Work Together
              </button>
              <a 
                href="mailto:conall@conallsheridan.ie" 
                className="border-2 border-ink-800 text-ink-800 px-8 py-3 rounded-full hover:bg-ink-800 hover:text-white transition-colors duration-200 text-center"
              >
                Email Me Directly
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
