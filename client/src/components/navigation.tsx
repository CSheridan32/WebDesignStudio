import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur border-b border-warm-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="font-playfair text-2xl font-semibold text-ink-800">
            Conall Sheridan
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-warm-600 hover:text-ink-800 transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-warm-600 hover:text-ink-800 transition-colors duration-200"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('industries')} 
              className="text-warm-600 hover:text-ink-800 transition-colors duration-200"
            >
              Industries
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className="text-warm-600 hover:text-ink-800 transition-colors duration-200"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-warm-600 hover:text-ink-800 transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-gold text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-200"
            >
              Get Started
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-ink-800"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-warm-100 pt-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-warm-600 hover:text-ink-800 transition-colors duration-200 text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-warm-600 hover:text-ink-800 transition-colors duration-200 text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('industries')} 
                className="text-warm-600 hover:text-ink-800 transition-colors duration-200 text-left"
              >
                Industries
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')} 
                className="text-warm-600 hover:text-ink-800 transition-colors duration-200 text-left"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-warm-600 hover:text-ink-800 transition-colors duration-200 text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="bg-gold text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-200 text-center"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
