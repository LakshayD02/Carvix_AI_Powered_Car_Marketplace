import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Contact Us | Carvix AI",
  description: "Get in touch with the Carvix AI team for support, inquiries, or feedback.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col pt-24 min-h-screen bg-gray-50">
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our AI search? Want to partner with us? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-blue-50 p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full shadow-sm mr-4 text-blue-600">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Email Us</h4>
                      <p className="text-gray-600">support@carvix.ai</p>
                      <p className="text-gray-600">partnerships@carvix.ai</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full shadow-sm mr-4 text-blue-600">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Call Us</h4>
                      <p className="text-gray-600">+1 (800) 555-0198</p>
                      <p className="text-sm text-gray-500 mt-1">Mon-Fri from 8am to 6pm EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full shadow-sm mr-4 text-blue-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Headquarters</h4>
                      <p className="text-gray-600">100 Innovation Way<br/>Tech District<br/>San Francisco, CA 94107</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                    <Input id="firstName" placeholder="John" className="py-6 rounded-xl bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                    <Input id="lastName" placeholder="Doe" className="py-6 rounded-xl bg-gray-50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <Input id="email" type="email" placeholder="john@example.com" className="py-6 rounded-xl bg-gray-50" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                  <Input id="subject" placeholder="How can we help?" className="py-6 rounded-xl bg-gray-50" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="w-full rounded-xl border-gray-300 bg-gray-50 p-4 text-sm focus:border-blue-500 focus:ring-blue-500 resize-none border outline-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                
                <Button type="button" className="w-full py-6 rounded-xl text-lg flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
