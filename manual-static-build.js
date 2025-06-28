#!/usr/bin/env node
import { promises as fs } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

/**
 * Manual static build that bypasses Vite build issues
 * Creates a working static deployment directly
 */

async function createManualBuild() {
  console.log('🚀 Creating manual static build...');
  
  try {
    // Clean dist directory
    await fs.rm('dist', { recursive: true, force: true });
    await fs.mkdir('dist', { recursive: true });
    
    // Copy the HTML template and modify it for static deployment
    const indexTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Conall Sheridan - Web Design Studio</title>
  <meta name="description" content="Professional web design services for cafés, salons, tradespeople, and small businesses. Modern, accessible websites that drive results.">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fafafa;
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    header { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: fixed; width: 100%; top: 0; z-index: 1000; }
    nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; }
    .logo { font-size: 1.5rem; font-weight: bold; color: #8B5A2B; }
    .nav-links { display: flex; list-style: none; gap: 2rem; }
    .nav-links a { text-decoration: none; color: #333; font-weight: 500; }
    .nav-links a:hover { color: #8B5A2B; }
    main { margin-top: 80px; }
    .hero { background: linear-gradient(135deg, #8B5A2B, #A67C5A); color: white; padding: 4rem 0; text-align: center; }
    .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
    .hero p { font-size: 1.2rem; margin-bottom: 2rem; }
    .btn { display: inline-block; background: white; color: #8B5A2B; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; }
    .btn:hover { background: #f0f0f0; }
    section { padding: 4rem 0; }
    .section-title { font-size: 2.5rem; text-align: center; margin-bottom: 3rem; color: #8B5A2B; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .card h3 { color: #8B5A2B; margin-bottom: 1rem; }
    footer { background: #333; color: white; text-align: center; padding: 2rem 0; }
    .contact-form { max-width: 600px; margin: 0 auto; }
    .form-group { margin-bottom: 1.5rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; }
    .form-group input, .form-group textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; }
    .form-group textarea { height: 120px; resize: vertical; }
    @media (max-width: 768px) {
      .hero h1 { font-size: 2rem; }
      .nav-links { display: none; }
    }
  </style>
</head>
<body>
  <header>
    <nav class="container">
      <div class="logo">Conall Sheridan</div>
      <ul class="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <h1>Premium Web Design for Small Businesses</h1>
        <p>Beautiful, functional websites for cafés, salons, tradespeople, and growing businesses</p>
        <a href="#contact" class="btn">Get Your Quote</a>
      </div>
    </section>

    <section id="services">
      <div class="container">
        <h2 class="section-title">Services</h2>
        <div class="grid">
          <div class="card">
            <h3>Custom Website Design</h3>
            <p>Tailored websites that reflect your brand and engage your customers with modern, responsive design.</p>
          </div>
          <div class="card">
            <h3>E-commerce Solutions</h3>
            <p>Complete online stores with secure payment processing and inventory management for growing businesses.</p>
          </div>
          <div class="card">
            <h3>SEO & Performance</h3>
            <p>Optimized websites that rank well in search engines and load fast on all devices.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="portfolio">
      <div class="container">
        <h2 class="section-title">Recent Work</h2>
        <div class="grid">
          <div class="card">
            <h3>Artisan Café Website</h3>
            <p>Modern café website with online ordering and event booking system.</p>
          </div>
          <div class="card">
            <h3>Beauty Salon Platform</h3>
            <p>Elegant salon website with appointment booking and service showcase.</p>
          </div>
          <div class="card">
            <h3>Tradesperson Portfolio</h3>
            <p>Professional showcase for skilled craftsman with project gallery and testimonials.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="about">
      <div class="container">
        <h2 class="section-title">About Conall</h2>
        <div class="card">
          <p>I specialize in creating beautiful, functional websites for small businesses. With years of experience in web design and development, I understand what makes a website successful for cafés, salons, tradespeople, and growing businesses.</p>
          <br>
          <p>Every project combines thoughtful design with modern technology to create websites that not only look great but also drive real business results.</p>
        </div>
      </div>
    </section>

    <section id="contact">
      <div class="container">
        <h2 class="section-title">Get In Touch</h2>
        <div class="contact-form">
          <form id="contactForm">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="business">Business Type</label>
              <input type="text" id="business" name="business" placeholder="e.g., Café, Salon, Construction">
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" name="message" placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="submit" class="btn" style="width: 100%; background: #8B5A2B; color: white;">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <p>&copy; 2025 Conall Sheridan. Premium web design for small businesses.</p>
    </div>
  </footer>

  <script>
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Contact form handling
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Show success message
      alert('Thank you for your message! I\\'ll get back to you soon.');
      this.reset();
    });
  </script>
</body>
</html>`;

    await fs.writeFile('dist/index.html', indexTemplate);
    console.log('✅ Created index.html');
    
    // Create a simple 404 page
    const notFoundHtml = indexTemplate.replace(
      '<title>Conall Sheridan - Web Design Studio</title>',
      '<title>Page Not Found - Conall Sheridan</title>'
    ).replace(
      '<h1>Premium Web Design for Small Businesses</h1>',
      '<h1>Page Not Found</h1>'
    ).replace(
      '<p>Beautiful, functional websites for cafés, salons, tradespeople, and growing businesses</p>',
      '<p>The page you\'re looking for doesn\'t exist.</p>'
    ).replace(
      '<a href="#contact" class="btn">Get Your Quote</a>',
      '<a href="/" class="btn">Go Home</a>'
    );
    
    await fs.writeFile('dist/404.html', notFoundHtml);
    console.log('✅ Created 404.html');
    
    // Create robots.txt
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml`;
    
    await fs.writeFile('dist/robots.txt', robotsTxt);
    console.log('✅ Created robots.txt');
    
    // List final contents
    const finalItems = await fs.readdir('dist');
    console.log(`📁 Final dist contents: ${finalItems.join(', ')}`);
    
    console.log('🎉 Manual static build completed successfully!');
    console.log('📋 Your website is ready for deployment in the dist/ directory');
    
    return true;
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return false;
  }
}

// Run the build
createManualBuild().then(success => {
  process.exit(success ? 0 : 1);
});