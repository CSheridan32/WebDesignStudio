// client/src/components/contact-section.tsx
export default function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container mx-auto px-6 max-w-lg">
        <h2 className="section-title text-center">Get in Touch</h2>
        <form
          action="https://formspree.io/f/xdkzbjne"
          method="POST"
          className="mt-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          {/* Business Type */}
          <div>
            <label
              htmlFor="businessType"
              className="block text-sm font-medium text-gray-700"
            >
              Business Type
            </label>
            <select
              id="businessType"
              name="businessType"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="">Select your industry</option>
              <option value="hairdresser">Hairdresser</option>
              <option value="cafe">Café</option>
              <option value="restaurant">Restaurant</option>
              <option value="dentist">Dentist</option>
              <option value="tradesperson">Tradesperson</option>
              <option value="plumber">Plumber</option>
              <option value="electrician">Electrician</option>
              <option value="law-firm">Law Firm</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Tell me about your business and what you need from your website…"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          {/* Honeypot & Subject */}
          <input type="text" name="_gotcha" className="hidden" />
          <input
            type="hidden"
            name="_subject"
            value="New enquiry from conallsheridan.ie"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md bg-yellow-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}