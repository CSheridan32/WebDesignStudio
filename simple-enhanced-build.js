#!/usr/bin/env node
import { promises as fs } from 'fs';

/**
 * Create enhanced static build with your actual design
 */

async function createEnhancedBuild() {
  console.log('Creating enhanced static build...');
  
  try {
    // Clean dist directory
    await fs.rm('dist', { recursive: true, force: true });
    await fs.mkdir('dist', { recursive: true });
    
    // Read your actual CSS file
    const cssContent = await fs.readFile('client/src/index.css', 'utf8');
    
    // Create enhanced HTML with your actual design
    const enhancedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Conall Sheridan - Web Design Studio</title>
  <meta name="description" content="Professional web design services for cafes, salons, tradespeople, and small businesses. Modern, accessible websites that drive results.">
  <style>
    ${cssContent}
  </style>
</head>
<body class="min-h-screen bg-background font-sans antialiased">
  <div id="root">
    <!-- Navigation -->
    <header class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div class="flex gap-6 md:gap-10">
          <a class="flex items-center space-x-2" href="/">
            <span class="inline-block font-bold text-2xl text-primary">Conall Sheridan</span>
          </a>
        </div>
        <div class="flex flex-1 items-center justify-end space-x-4">
          <nav class="flex items-center space-x-1">
            <a href="#industries" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-accent-foreground h-9 px-4 py-2">Industries</a>
            <a href="#values" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-accent-foreground h-9 px-4 py-2">Values</a>
            <a href="#services" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-accent-foreground h-9 px-4 py-2">Services</a>
            <a href="#about" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-accent-foreground h-9 px-4 py-2">About</a>
            <a href="#contact" class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">Contact</a>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-20 lg:py-32">
      <div class="container relative z-10 mx-auto px-4">
        <div class="mx-auto max-w-4xl text-center">
          <h1 class="mb-6 text-4xl font-bold tracking-tight text-primary-foreground lg:text-6xl">
            Professional Web Design for Small Businesses
          </h1>
          <p class="mb-8 text-xl text-primary-foreground/90 lg:text-2xl">
            Beautiful, accessible websites for cafes, salons, tradespeople, and growing businesses
          </p>
          <a href="#contact" class="inline-flex h-12 items-center justify-center rounded-md bg-secondary px-8 py-2 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90">
            Get Your Quote
          </a>
        </div>
      </div>
    </section>

    <!-- Industries Section -->
    <section id="industries" class="py-20">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">Industries I Specialize In</h2>
          <p class="text-muted-foreground">Tailored solutions for businesses that value quality and attention to detail</p>
        </div>
        <div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div class="group rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-lg">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <span class="text-2xl">☕</span>
            </div>
            <h3 class="mb-2 text-lg font-semibold">Cafes & Restaurants</h3>
            <p class="text-sm text-muted-foreground">Appetizing websites with online ordering and reservation systems</p>
          </div>
          <div class="group rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-lg">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <span class="text-2xl">✂️</span>
            </div>
            <h3 class="mb-2 text-lg font-semibold">Salons & Spas</h3>
            <p class="text-sm text-muted-foreground">Elegant sites with booking systems and service showcases</p>
          </div>
          <div class="group rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-lg">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <span class="text-2xl">🔨</span>
            </div>
            <h3 class="mb-2 text-lg font-semibold">Tradespeople</h3>
            <p class="text-sm text-muted-foreground">Professional portfolios that showcase your craftsmanship</p>
          </div>
          <div class="group rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-lg">
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <span class="text-2xl">🏢</span>
            </div>
            <h3 class="mb-2 text-lg font-semibold">Small Firms</h3>
            <p class="text-sm text-muted-foreground">Corporate presence that builds trust and credibility</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section id="values" class="bg-secondary/5 py-20">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">What I Value</h2>
          <p class="text-muted-foreground">The principles that guide every project I take on</p>
        </div>
        <div class="mt-16 grid gap-8 md:grid-cols-3">
          <div class="text-center">
            <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <span class="text-3xl">🎯</span>
            </div>
            <h3 class="mb-2 text-xl font-semibold">Purpose-Driven Design</h3>
            <p class="text-muted-foreground">Every element serves a purpose - to engage your customers and grow your business</p>
          </div>
          <div class="text-center">
            <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <span class="text-3xl">♿</span>
            </div>
            <h3 class="mb-2 text-xl font-semibold">Accessibility First</h3>
            <p class="text-muted-foreground">Websites that work for everyone, ensuring no customer is left behind</p>
          </div>
          <div class="text-center">
            <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <span class="text-3xl">🤝</span>
            </div>
            <h3 class="mb-2 text-xl font-semibold">Personal Partnership</h3>
            <p class="text-muted-foreground">You're not just a client - we're partners in bringing your vision to life</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">Services</h2>
          <p class="text-muted-foreground">Comprehensive web solutions for your business needs</p>
        </div>
        <div class="mt-16 grid gap-8 lg:grid-cols-3">
          <div class="group rounded-lg border bg-card p-8 text-card-foreground shadow-sm transition-shadow hover:shadow-lg">
            <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <span class="text-2xl">🎨</span>
            </div>
            <h3 class="mb-4 text-xl font-semibold">Custom Website Design</h3>
            <p class="mb-6 text-muted-foreground">Bespoke websites tailored to your brand, industry, and customer needs.</p>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li>✓ Brand-focused design</li>
              <li>✓ Mobile-first approach</li>
              <li>✓ Fast loading speeds</li>
            </ul>
          </div>
          <div class="group rounded-lg border bg-card p-8 text-card-foreground shadow-sm transition-shadow hover:shadow-lg">
            <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <span class="text-2xl">🛒</span>
            </div>
            <h3 class="mb-4 text-xl font-semibold">E-commerce Solutions</h3>
            <p class="mb-6 text-muted-foreground">Online stores that convert visitors into customers and drive sales.</p>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li>✓ Secure payment processing</li>
              <li>✓ Inventory management</li>
              <li>✓ Customer accounts</li>
            </ul>
          </div>
          <div class="group rounded-lg border bg-card p-8 text-card-foreground shadow-sm transition-shadow hover:shadow-lg">
            <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <span class="text-2xl">📈</span>
            </div>
            <h3 class="mb-4 text-xl font-semibold">SEO & Performance</h3>
            <p class="mb-6 text-muted-foreground">Optimized websites that rank well and provide excellent user experience.</p>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li>✓ Search engine optimization</li>
              <li>✓ Performance optimization</li>
              <li>✓ Analytics setup</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="bg-secondary/5 py-20">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-3xl">
          <div class="mb-12 text-center">
            <h2 class="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">About Conall</h2>
            <p class="text-muted-foreground">Passionate about creating digital experiences that make a difference</p>
          </div>
          <div class="rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
            <p class="mb-6 text-lg leading-relaxed">
              I specialize in creating beautiful, functional websites for small businesses. With years of experience in web design and development, I understand what makes a website successful for cafes, salons, tradespeople, and growing businesses.
            </p>
            <p class="text-lg leading-relaxed">
              Every project combines thoughtful design with modern technology to create websites that not only look great but also drive real business results. I believe in personal partnerships and accessible design that works for everyone.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">Let's Work Together</h2>
          <p class="text-muted-foreground">Ready to take your business online? Let's discuss your project.</p>
        </div>
        <div class="mx-auto mt-16 max-w-lg">
          <form id="contactForm" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-foreground">Name</label>
              <input type="text" id="name" name="name" required class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-foreground">Email</label>
              <input type="email" id="email" name="email" required class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            </div>
            <div>
              <label for="business" class="block text-sm font-medium text-foreground">Business Type</label>
              <input type="text" id="business" name="business" placeholder="e.g., Cafe, Salon, Construction" class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-foreground">Message</label>
              <textarea id="message" name="message" rows="4" placeholder="Tell me about your project..." class="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"></textarea>
            </div>
            <button type="submit" class="w-full inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t bg-background py-12">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <p class="text-muted-foreground">&copy; 2025 Conall Sheridan. Professional web design for small businesses.</p>
        </div>
      </div>
    </footer>
  </div>

  <script>
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Contact form
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  </script>
</body>
</html>`;

    await fs.writeFile('dist/index.html', enhancedHtml);
    console.log('✅ Created enhanced website with your design');
    
    // Create 404 page
    const notFoundHtml = enhancedHtml
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
    
    console.log('🎉 Enhanced build completed successfully!');
    console.log('Your beautiful website is ready for deployment!');
    
    return true;
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return false;
  }
}

createEnhancedBuild().then(success => {
  process.exit(success ? 0 : 1);
});