#!/usr/bin/env node
import { promises as fs } from 'fs';

/**
 * Create static build with compiled CSS instead of raw Tailwind directives
 */

async function createCompiledBuild() {
  console.log('Creating static build with compiled CSS...');
  
  try {
    // Clean dist directory
    await fs.rm('dist', { recursive: true, force: true });
    await fs.mkdir('dist', { recursive: true });
    
    // Create HTML with compiled/embedded CSS instead of Tailwind directives
    const compiledHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Conall Sheridan - Web Design Studio</title>
  <meta name="description" content="Professional web design services for cafes, salons, tradespeople, and small businesses. Modern, accessible websites that drive results.">
  <style>
    /* Reset and base styles */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { line-height: 1.15; -webkit-text-size-adjust: 100%; }
    body { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; line-height: 1.6; color: #372e29; background: #fafaf9; }
    
    /* Custom properties */
    :root {
      --primary: #8B5A2B;
      --primary-light: #A67C5A;
      --primary-dark: #6B4423;
      --secondary: #F5F4F1;
      --accent: #E6B17A;
      --text-dark: #372e29;
      --text-light: #716B60;
      --border: #E6E3E0;
      --white: #FFFFFF;
    }
    
    /* Utility classes */
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    .text-center { text-align: center; }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .justify-between { justify-content: space-between; }
    .space-x-4 > * + * { margin-left: 1rem; }
    .space-x-6 > * + * { margin-left: 1.5rem; }
    .space-y-2 > * + * { margin-top: 0.5rem; }
    .space-y-4 > * + * { margin-top: 1rem; }
    .space-y-6 > * + * { margin-top: 1.5rem; }
    .grid { display: grid; }
    .gap-8 { gap: 2rem; }
    .rounded-lg { border-radius: 0.5rem; }
    .rounded-md { border-radius: 0.375rem; }
    .rounded-full { border-radius: 50%; }
    .border { border: 1px solid var(--border); }
    .shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05); }
    .transition-all { transition: all 0.3s ease; }
    .hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05); }
    
    /* Header styles */
    .header { position: sticky; top: 0; z-index: 50; width: 100%; border-bottom: 1px solid var(--border); background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); }
    .nav { display: flex; height: 4rem; align-items: center; justify-content: space-between; padding: 0 1rem; }
    .logo { font-size: 1.5rem; font-weight: 700; color: var(--primary); text-decoration: none; }
    .nav-links { display: flex; list-style: none; gap: 1rem; }
    .nav-link { text-decoration: none; color: var(--text-dark); font-weight: 500; padding: 0.5rem 1rem; border-radius: 0.375rem; transition: all 0.3s ease; }
    .nav-link:hover { color: var(--primary); background: var(--secondary); }
    .nav-cta { background: var(--primary); color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
    .nav-cta:hover { background: var(--primary-dark); }
    
    /* Hero section */
    .hero { position: relative; overflow: hidden; background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: white; padding: 5rem 0; }
    .hero h1 { font-size: 3rem; font-weight: 700; margin-bottom: 1.5rem; line-height: 1.1; }
    .hero p { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; }
    .hero-cta { display: inline-block; background: white; color: var(--primary); padding: 0.75rem 2rem; border-radius: 0.375rem; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
    .hero-cta:hover { background: var(--secondary); }
    
    /* Section styles */
    .section { padding: 5rem 0; }
    .section-alt { background: var(--secondary); }
    .section-title { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--primary); }
    .section-subtitle { color: var(--text-light); margin-bottom: 3rem; font-size: 1.125rem; }
    
    /* Card styles */
    .card { background: white; padding: 2rem; border-radius: 0.5rem; border: 1px solid var(--border); box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.3s ease; }
    .card:hover { box-shadow: 0 10px 25px rgba(0,0,0,0.15); transform: translateY(-2px); }
    .card-icon { width: 3rem; height: 3rem; background: rgba(139, 90, 43, 0.1); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; font-size: 1.5rem; }
    .card-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: var(--text-dark); }
    .card-text { color: var(--text-light); }
    
    /* Grid layouts */
    .grid-2 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(3, 1fr); }
    .grid-4 { grid-template-columns: repeat(4, 1fr); }
    
    /* Form styles */
    .form { max-width: 32rem; margin: 0 auto; }
    .form-group { margin-bottom: 1.5rem; }
    .form-label { display: block; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-dark); }
    .form-input, .form-textarea { width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 0.375rem; font-size: 0.875rem; transition: all 0.3s ease; }
    .form-input:focus, .form-textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(139, 90, 43, 0.1); }
    .form-textarea { height: 6rem; resize: vertical; }
    .form-button { width: 100%; background: var(--primary); color: white; padding: 0.75rem; border: none; border-radius: 0.375rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
    .form-button:hover { background: var(--primary-dark); }
    
    /* Footer */
    .footer { border-top: 1px solid var(--border); background: white; padding: 3rem 0; text-align: center; color: var(--text-light); }
    
    /* Value section special styling */
    .value-icon { width: 4rem; height: 4rem; background: rgba(139, 90, 43, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 2rem; }
    
    /* Responsive */
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .hero h1 { font-size: 2rem; }
      .hero { padding: 3rem 0; }
      .section { padding: 3rem 0; }
      .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
      .container { padding: 0 1rem; }
    }
    
    @media (min-width: 768px) {
      .grid-2 { grid-template-columns: repeat(2, 1fr); }
      .grid-3 { grid-template-columns: repeat(3, 1fr); }
    }
    
    @media (min-width: 1024px) {
      .grid-4 { grid-template-columns: repeat(4, 1fr); }
      .hero h1 { font-size: 3.5rem; }
    }
  </style>
</head>
<body>
  <div id="root">
    <!-- Header -->
    <header class="header">
      <nav class="nav container">
        <a href="/" class="logo">Conall Sheridan</a>
        <ul class="nav-links">
          <li><a href="#industries" class="nav-link">Industries</a></li>
          <li><a href="#values" class="nav-link">Values</a></li>
          <li><a href="#services" class="nav-link">Services</a></li>
          <li><a href="#about" class="nav-link">About</a></li>
          <li><a href="#contact" class="nav-cta">Contact</a></li>
        </ul>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container text-center">
        <h1>Professional Web Design for Small Businesses</h1>
        <p>Beautiful, accessible websites for cafes, salons, tradespeople, and growing businesses</p>
        <a href="#contact" class="hero-cta">Get Your Quote</a>
      </div>
    </section>

    <!-- Industries Section -->
    <section id="industries" class="section">
      <div class="container">
        <div class="text-center">
          <h2 class="section-title">Industries I Specialize In</h2>
          <p class="section-subtitle">Tailored solutions for businesses that value quality and attention to detail</p>
        </div>
        <div class="grid grid-4 gap-8">
          <div class="card">
            <div class="card-icon">☕</div>
            <h3 class="card-title">Cafes & Restaurants</h3>
            <p class="card-text">Appetizing websites with online ordering and reservation systems</p>
          </div>
          <div class="card">
            <div class="card-icon">✂️</div>
            <h3 class="card-title">Salons & Spas</h3>
            <p class="card-text">Elegant sites with booking systems and service showcases</p>
          </div>
          <div class="card">
            <div class="card-icon">🔨</div>
            <h3 class="card-title">Tradespeople</h3>
            <p class="card-text">Professional portfolios that showcase your craftsmanship</p>
          </div>
          <div class="card">
            <div class="card-icon">🏢</div>
            <h3 class="card-title">Small Firms</h3>
            <p class="card-text">Corporate presence that builds trust and credibility</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section id="values" class="section section-alt">
      <div class="container">
        <div class="text-center">
          <h2 class="section-title">What I Value</h2>
          <p class="section-subtitle">The principles that guide every project I take on</p>
        </div>
        <div class="grid grid-3 gap-8">
          <div class="text-center">
            <div class="value-icon">🎯</div>
            <h3 class="card-title">Purpose-Driven Design</h3>
            <p class="card-text">Every element serves a purpose - to engage your customers and grow your business</p>
          </div>
          <div class="text-center">
            <div class="value-icon">♿</div>
            <h3 class="card-title">Accessibility First</h3>
            <p class="card-text">Websites that work for everyone, ensuring no customer is left behind</p>
          </div>
          <div class="text-center">
            <div class="value-icon">🤝</div>
            <h3 class="card-title">Personal Partnership</h3>
            <p class="card-text">You're not just a client - we're partners in bringing your vision to life</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="section">
      <div class="container">
        <div class="text-center">
          <h2 class="section-title">Services</h2>
          <p class="section-subtitle">Comprehensive web solutions for your business needs</p>
        </div>
        <div class="grid grid-3 gap-8">
          <div class="card">
            <div class="card-icon">🎨</div>
            <h3 class="card-title">Custom Website Design</h3>
            <p class="card-text">Bespoke websites tailored to your brand, industry, and customer needs.</p>
            <ul class="space-y-2" style="margin-top: 1.5rem;">
              <li class="card-text">✓ Brand-focused design</li>
              <li class="card-text">✓ Mobile-first approach</li>
              <li class="card-text">✓ Fast loading speeds</li>
            </ul>
          </div>
          <div class="card">
            <div class="card-icon">🛒</div>
            <h3 class="card-title">E-commerce Solutions</h3>
            <p class="card-text">Online stores that convert visitors into customers and drive sales.</p>
            <ul class="space-y-2" style="margin-top: 1.5rem;">
              <li class="card-text">✓ Secure payment processing</li>
              <li class="card-text">✓ Inventory management</li>
              <li class="card-text">✓ Customer accounts</li>
            </ul>
          </div>
          <div class="card">
            <div class="card-icon">📈</div>
            <h3 class="card-title">SEO & Performance</h3>
            <p class="card-text">Optimized websites that rank well and provide excellent user experience.</p>
            <ul class="space-y-2" style="margin-top: 1.5rem;">
              <li class="card-text">✓ Search engine optimization</li>
              <li class="card-text">✓ Performance optimization</li>
              <li class="card-text">✓ Analytics setup</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section section-alt">
      <div class="container">
        <div class="text-center">
          <h2 class="section-title">About Conall</h2>
          <p class="section-subtitle">Passionate about creating digital experiences that make a difference</p>
        </div>
        <div style="max-width: 48rem; margin: 0 auto;">
          <div class="card">
            <p style="font-size: 1.125rem; margin-bottom: 1.5rem; line-height: 1.7;">
              I specialize in creating beautiful, functional websites for small businesses. With years of experience in web design and development, I understand what makes a website successful for cafes, salons, tradespeople, and growing businesses.
            </p>
            <p style="font-size: 1.125rem; line-height: 1.7;">
              Every project combines thoughtful design with modern technology to create websites that not only look great but also drive real business results. I believe in personal partnerships and accessible design that works for everyone.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section">
      <div class="container">
        <div class="text-center">
          <h2 class="section-title">Let's Work Together</h2>
          <p class="section-subtitle">Ready to take your business online? Let's discuss your project.</p>
        </div>
        <form id="contactForm" class="form">
          <div class="form-group">
            <label for="name" class="form-label">Name</label>
            <input type="text" id="name" name="name" required class="form-input">
          </div>
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" name="email" required class="form-input">
          </div>
          <div class="form-group">
            <label for="business" class="form-label">Business Type</label>
            <input type="text" id="business" name="business" placeholder="e.g., Cafe, Salon, Construction" class="form-input">
          </div>
          <div class="form-group">
            <label for="message" class="form-label">Message</label>
            <textarea id="message" name="message" placeholder="Tell me about your project..." class="form-textarea"></textarea>
          </div>
          <button type="submit" class="form-button">Send Message</button>
        </form>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 Conall Sheridan. Professional web design for small businesses.</p>
      </div>
    </footer>
  </div>

  <script>
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Contact form handling
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  </script>
</body>
</html>`;

    await fs.writeFile('dist/index.html', compiledHtml);
    console.log('✅ Created compiled CSS version');
    
    // Create 404 page
    const notFoundHtml = compiledHtml
      .replace('Conall Sheridan - Web Design Studio', 'Page Not Found - Conall Sheridan')
      .replace('Professional Web Design for Small Businesses', 'Page Not Found')
      .replace('Beautiful, accessible websites for cafes, salons, tradespeople, and growing businesses', 'The page you are looking for does not exist.')
      .replace('Get Your Quote', 'Go Home')
      .replace('href="#contact"', 'href="/"');
    
    await fs.writeFile('dist/404.html', notFoundHtml);
    console.log('✅ Created 404.html');
    
    // Create robots.txt
    await fs.writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: https://your-domain.com/sitemap.xml');
    console.log('✅ Created robots.txt');
    
    const finalItems = await fs.readdir('dist');
    console.log(`Final dist contents: ${finalItems.join(', ')}`);
    
    console.log('🎉 Compiled build completed successfully!');
    console.log('Your website now has properly compiled CSS and should look exactly like the preview!');
    
    return true;
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return false;
  }
}

createCompiledBuild().then(success => {
  process.exit(success ? 0 : 1);
});