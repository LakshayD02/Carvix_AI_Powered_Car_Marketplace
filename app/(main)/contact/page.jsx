"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Sparkles, Clock, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col pt-4 sm:pt-6 bg-background text-foreground transition-colors duration-300 min-h-screen">
      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="relative py-10 sm:py-12 flex items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#0EA5E9]/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 text-[#0EA5E9] text-sm font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            24/7 Concierge Support
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Get in Touch With <br className="hidden sm:inline" />
            <span className="gradient-title">Carvix AI</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions about our AI search, test drive scheduling, or dealership listings? Our specialists are ready to assist you.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT FORM & CARDS SECTION
      ══════════════════════════════════════ */}
      <section className="py-20 bg-background transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Contact Info Cards (Left) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Contact Information</h3>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 text-[#0EA5E9] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">Email Inquiries</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">support@carvix.ai</p>
                    <p className="text-xs text-muted-foreground">partnerships@carvix.ai</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 text-[#0EA5E9] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">Phone Support</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">+1 (800) 555-CARVIX</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Mon - Fri: 8:00 AM - 7:00 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 text-[#0EA5E9] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">Headquarters</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">100 Innovation Way, Tech District</p>
                    <p className="text-xs text-muted-foreground">San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>

              {/* Live Support Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/15 to-purple-500/10 border border-[#0EA5E9]/30">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground mb-2">
                  <Clock className="w-4 h-4 text-[#0EA5E9]" />
                  <span>Fast Response Guarantee</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Our average response time for general inquiries is under 15 minutes during operating hours.
                </p>
              </div>
            </div>

            {/* Contact Form (Right) */}
            <div className="lg:col-span-7 p-8 rounded-2xl bg-card border border-border shadow-sm transition-colors duration-300">
              <h3 className="text-2xl font-bold text-foreground mb-2">Send Us a Message</h3>
              <p className="text-xs text-muted-foreground mb-6">
                Fill out the form below and a Carvix AI specialist will reach out immediately.
              </p>

              {submitted ? (
                <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h4 className="text-lg font-bold text-foreground">Message Sent Successfully!</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    We've received your message and will respond to your email within 15 minutes.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-border text-foreground hover:bg-muted"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="firstName" className="text-xs font-semibold text-foreground">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="py-5 rounded-xl bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-[#0EA5E9]"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="lastName" className="text-xs font-semibold text-foreground">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="py-5 rounded-xl bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-[#0EA5E9]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-foreground">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="py-5 rounded-xl bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-[#0EA5E9]"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-semibold text-foreground">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="e.g. Test Drive Inquiry / AI Search Assistance"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="py-5 rounded-xl bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-[#0EA5E9]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-semibold text-foreground">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl bg-background border border-border p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#0EA5E9] outline-none resize-none transition-colors"
                      placeholder="Tell us how we can assist you..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-6 rounded-xl text-base font-bold bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white hover:shadow-[0_0_25px_rgba(14,165,233,0.4)] transition-all"
                    disabled={loading}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {loading ? "Sending Message..." : "Submit Inquiry"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ / ACCORDION SECTION
      ══════════════════════════════════════ */}
      <section className="py-20 bg-card border-t border-border transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-[#0EA5E9] text-xs font-semibold uppercase tracking-widest mb-2">Quick Answers</p>
            <h2 className="text-3xl font-bold text-foreground">Common Support Questions</h2>
          </div>

          <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
            {[
              {
                question: "How does the AI Visual Search work?",
                answer: "Upload any car photo and our neural model identifies the exact make, model, year range, and matches it against current available inventory in real time.",
              },
              {
                question: "Is test drive booking guaranteed?",
                answer: "Yes! Test drive reservations sync directly with official dealership calendars for instant confirmation and guaranteed availability.",
              },
              {
                question: "Are there any hidden fees when buying through Carvix?",
                answer: "No. All prices listed on Carvix AI represent transparent market values verified directly by our partner dealerships with zero hidden markups.",
              },
              {
                question: "How can I contact customer support or visit the dealership?",
                answer: "You can reach us 24/7 via support@carvix.ai or call +1 (800) 555-CARVIX. Our Experience Center is open Monday through Saturday for walk-ins.",
              },
            ].map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="glass-card overflow-hidden border-border bg-background rounded-xl transition-all duration-200"
              >
                <AccordionTrigger className="px-6 py-5 text-left text-base font-semibold text-foreground hover:text-[#0EA5E9] hover:no-underline transition-colors [&[data-state=open]]:text-[#0EA5E9]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-1 text-muted-foreground text-sm leading-relaxed border-t border-border/40">
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
