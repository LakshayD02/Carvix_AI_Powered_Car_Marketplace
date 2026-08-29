import Image from "next/image";
import { CheckCircle2, Shield, Users, Target, Sparkles, Cpu, Award, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | Carvix AI",
  description: "Learn more about Carvix AI and our mission to revolutionize the car buying experience.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col pt-4 sm:pt-6 bg-background text-foreground transition-colors duration-300">
      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="relative py-10 sm:py-12 flex items-center justify-center overflow-hidden border-b border-border">
        {/* Background Spotlight */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#0EA5E9]/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#818CF8]/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 text-[#0EA5E9] text-sm font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Empowering Next-Gen Mobility
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Revolutionizing How You Find <br className="hidden sm:inline" />
            <span className="gradient-title">Your Next Vehicle</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Carvix AI combines computer vision, neural pricing algorithms, and seamless dealership workflows to make discovering your dream car effortless, transparent, and enjoyable.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-6 rounded-2xl bg-card border border-border shadow-sm">
            {[
              { value: "10,000+", label: "Verified Vehicles" },
              { value: "500+", label: "Partner Dealerships" },
              { value: "99.2%", label: "Satisfaction Rate" },
              { value: "$50M+", label: "Transactions Facilitated" },
            ].map(({ value, label }) => (
              <div key={label} className="p-3 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0EA5E9]">{value}</div>
                <div className="text-xs text-muted-foreground uppercase font-semibold mt-1 tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MISSION & PILLARS SECTION
      ══════════════════════════════════════ */}
      <section className="py-24 bg-card border-b border-border transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-[#0EA5E9] text-xs font-semibold uppercase tracking-widest">Our Vision</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                Building the World's Most Intelligent Automotive Marketplace
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                We believe buying a car should be transparent, delightful, and instantaneous. By replacing cumbersome dealership visits with AI-driven discovery, real-time booking, and automated pricing analysis, Carvix puts you in total control.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                Snap a picture of any car on the street, and our visual neural network identifies the exact make, model, trim, and nearby available inventory within seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Target,
                  color: "text-[#0EA5E9] bg-[#0EA5E9]/10 border-[#0EA5E9]/20",
                  title: "Precision AI",
                  desc: "Neural visual search matches exact vehicles from photos or exact specifications.",
                },
                {
                  icon: Shield,
                  color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
                  title: "100% Trust",
                  desc: "Every listing undergoes 150-point verification with transparent pricing data.",
                },
                {
                  icon: Users,
                  color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
                  title: "Direct Connect",
                  desc: "Instant communication with certified dealerships and verified owners.",
                },
                {
                  icon: CheckCircle2,
                  color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
                  title: "Seamless Booking",
                  desc: "Schedule test drives in 30 seconds with automated calendar sync.",
                },
              ].map(({ icon: Icon, color, title, desc }) => (
                <div key={title} className="p-6 rounded-2xl bg-background border border-border shadow-sm hover:border-[#0EA5E9]/40 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          AI INNOVATION SHOWCASE
      ══════════════════════════════════════ */}
      <section className="py-24 bg-background transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-[#0EA5E9] text-xs font-semibold uppercase tracking-widest mb-2">Technology Core</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How Carvix Intelligence Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              Our proprietary neural network transforms raw inventory data into actionable automotive insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                step: "01",
                title: "Visual Feature Extraction",
                desc: "Analyzes body lines, headlights, grille shapes, and badges from user-submitted photos.",
              },
              {
                icon: Zap,
                step: "02",
                title: "Market Valuation Index",
                desc: "Evaluates historical sales and regional price benchmarks to score every listing's deal value.",
              },
              {
                icon: Award,
                step: "03",
                title: "Certified Health Check",
                desc: "Cross-references car history reports, mileage metrics, and dealership inspection logs.",
              },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="glass-card p-8 bg-card border-border rounded-2xl shadow-sm text-center relative">
                <div className="w-14 h-14 rounded-2xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 text-[#0EA5E9] flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════ */}
      <section className="py-24 bg-card border-t border-border transition-colors duration-300">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
            Ready to Experience <span className="gradient-title">Carvix AI?</span>
          </h2>
          <p className="text-muted-foreground mb-8 text-base">
            Explore our curated inventory or try our visual AI search to find your next car in seconds.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-semibold rounded-full px-8 hover:shadow-[0_0_35px_rgba(14,165,233,0.4)] transition-all duration-200"
            asChild
          >
            <Link href="/cars">
              Browse Cars Inventory <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
