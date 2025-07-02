import { Mail, Phone, Clock, Calendar, CheckCircle } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Start your new website with one message. Let's discuss your project and
            how I can help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left Side - Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Ready to Begin?</h3>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-slate-900" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-gray-300">conall@conallsheridan.ie</div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-slate-900" />
                </div>
                <div>
                  <div className="font-semibold">Phone & WhatsApp</div>
                  <div className="text-gray-300">+353 86 1688112</div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-slate-900" />
                </div>
                <div>
                  <div className="font-semibold">Response Time</div>
                  <div className="text-gray-300">Usually within 24 hours</div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-slate-900" />
                </div>
                <div>
                  <div className="font-semibold">Project Timeline</div>
                  <div className="text-gray-300">Most websites completed in 2-4 weeks</div>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold mb-6">What happens next?</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">We'll schedule a brief call to discuss your needs</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">I'll create a custom proposal and timeline</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">You'll see designs and provide feedback</span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <form
              action="https://formspree.io/f/xdkzbjne"
              method="POST"
              className="space-y-6"
            >
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900 bg-gray-50"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900 bg-gray-50"
                />
              </div>

              {/* Business Type */}
              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type
                </label>
                <input
                  id="businessType"
                  name="businessType"
                  type="text"
                  placeholder="e.g., Café, Salon, Construction"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900 bg-gray-50 placeholder-gray-400"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900 bg-gray-50 placeholder-gray-400 resize-none"
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
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}