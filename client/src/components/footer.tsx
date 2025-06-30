import logoImage from "@assets/ChatGPT Image Jun 25, 2025, 11_19_09 PM_1750889973785.png";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-warm-100 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logoImage} 
                alt="Conall Sheridan Logo" 
                className="h-8 w-auto"
              />
              <h3 className="font-playfair text-2xl font-semibold text-ink-800">Conall Sheridan</h3>
            </div>
            <p className="text-warm-600">Beautiful websites for small businesses who never thought they could afford them.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-ink-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-warm-600 hover:text-ink-800 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('industries')} 
                  className="text-warm-600 hover:text-ink-800 transition-colors"
                >
                  Industries
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('portfolio')} 
                  className="text-warm-600 hover:text-ink-800 transition-colors"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-warm-600 hover:text-ink-800 transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-ink-800 mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:conall@conallsheridan.ie" 
                  className="text-warm-600 hover:text-ink-800 transition-colors"
                >
                  conall@conallsheridan.ie
                </a>
              </li>
              <li className="text-warm-600">Dublin, Ireland</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-warm-200 mt-8 pt-8 text-center text-warm-600">
          <p>&copy; 2024 Conall Sheridan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
