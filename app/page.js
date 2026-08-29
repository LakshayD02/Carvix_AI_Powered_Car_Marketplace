// app/page.js
import { Car, Calendar, Shield, CheckCircle2, Star, Sparkles, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SignedOut } from "@clerk/nextjs";
import { getFeaturedCars } from "@/actions/home";
import { CarCard } from "@/components/car-card";
import { HomeSearch } from "@/components/home-search";
import Link from "next/link";
import Image from "next/image";
import { bodyTypes, carMakes, faqItems } from "@/lib/data";

export default async function Home() {
  const featuredCars = await getFeaturedCars();

  return (
    <div className="flex flex-col pt-4 sm:pt-6 bg-background text-foreground transition-colors duration-300">

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="relative flex items-center justify-center overflow-hidden py-10 sm:py-12">
        {/* Background Spotlight */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#0EA5E9]/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#818CF8]/5 rounded-full blur-[100px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 py-6 sm:py-10">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 text-[#0EA5E9] text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Car Marketplace
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold mb-4 leading-none tracking-tight animate-slide-up">
            <span className="gradient-title">Carvix AI</span>
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight animate-fade-in">
            Revolutionizing How You Find Your Next Vehicle
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Thousands of verified vehicles, intelligent AI-powered search, and seamless
            test drive booking — all in one premium platform.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in">
            {[
              { value: "10K+", label: "Vehicles" },
              { value: "500+", label: "Dealerships" },
              { value: "98%", label: "Satisfaction" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-[#0EA5E9]">{value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Search box */}
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="glass-card p-4 md:p-6 shadow-[0_0_60px_rgba(14,165,233,0.08)]">
              <HomeSearch />
            </div>
          </div>

          {/* Scroll cue */}
          <div className="mt-16 flex flex-col items-center gap-2 animate-float">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#0EA5E9]/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURED CARS
      ══════════════════════════════════════ */}
      <section className="py-20 bg-muted/30 border-y border-border transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[#0EA5E9] text-xs font-semibold uppercase tracking-widest mb-2">
                Handpicked for you
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Cars</h2>
              <div className="gradient-line w-16 mt-3" />
            </div>
            <Button
              variant="ghost"
              className="text-[#0EA5E9] hover:text-[#0EA5E9] hover:bg-[#0EA5E9]/10 rounded-full flex items-center gap-1.5 text-sm"
              asChild
            >
              <Link href="/cars">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BROWSE BY MAKE
      ══════════════════════════════════════ */}
      <section className="py-20 bg-background transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[#0EA5E9] text-xs font-semibold uppercase tracking-widest mb-2">
                Shop by brand
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Browse by Make</h2>
              <div className="gradient-line w-16 mt-3" />
            </div>
            <Button
              variant="ghost"
              className="text-[#0EA5E9] hover:text-[#0EA5E9] hover:bg-[#0EA5E9]/10 rounded-full flex items-center gap-1.5 text-sm"
              asChild
            >
              <Link href="/cars">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {carMakes.map((make) => (
              <Link
                key={make.name}
                href={`/cars?make=${make.name}`}
                className="glass-card p-5 text-center bg-card border-border hover:border-[#0EA5E9]/40 hover:shadow-[0_0_20px_rgba(14,165,233,0.1)] transition-all duration-300 group"
              >
                <div className="h-14 w-auto mx-auto mb-3 relative">
                  <Image
                    src={make.imageUrl || `/make/${make.name.toLowerCase()}.webp`}
                    alt={make.name}
                    fill
                    style={{ objectFit: "contain" }}
                    className="opacity-80 dark:invert-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
                <h3 className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  {make.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════ */}
      <section className="py-24 bg-card border-y border-border transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-[#0EA5E9] text-xs font-semibold uppercase tracking-widest mb-3">
              The Carvix Advantage
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Carvix AI
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We've reimagined every step of the car buying journey to make it effortless and transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Car,
                color: "from-[#0EA5E9] to-[#0284C7]",
                glow: "rgba(14,165,233,0.15)",
                title: "Wide Selection",
                desc: "Access thousands of verified vehicles from trusted dealerships and private sellers, all in one platform.",
              },
              {
                icon: Calendar,
                color: "from-[#818CF8] to-[#6366F1]",
                glow: "rgba(129,140,248,0.15)",
                title: "Easy Test Drive",
                desc: "Book test drives online in minutes with flexible scheduling and real-time availability.",
              },
              {
                icon: Shield,
                color: "from-[#10B981] to-[#059669]",
                glow: "rgba(16,185,129,0.15)",
                title: "Secure Process",
                desc: "Verified listings and secure booking process ensure peace of mind for every transaction.",
              },
            ].map(({ icon: Icon, color, glow, title, desc }) => (
              <div
                key={title}
                className="glass-card p-8 text-center bg-background border-border card-glow group relative overflow-hidden transition-colors duration-300"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${glow}, transparent 70%)` }}
                />
                <div
                  className={`relative bg-gradient-to-br ${color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BROWSE BY BODY TYPE
      ══════════════════════════════════════ */}
      <section className="py-20 bg-background transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[#0EA5E9] text-xs font-semibold uppercase tracking-widest mb-2">
                Find your style
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Browse by Body Type</h2>
              <div className="gradient-line w-16 mt-3" />
            </div>
            <Button
              variant="ghost"
              className="text-[#0EA5E9] hover:text-[#0EA5E9] hover:bg-[#0EA5E9]/10 rounded-full flex items-center gap-1.5 text-sm"
              asChild
            >
              <Link href="/cars">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyTypes.map((type) => (
              <Link
                key={type.name}
                href={`/cars?bodyType=${type.name}`}
                className="relative group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={type.imageUrl || `/body/${type.name.toLowerCase()}.webp`}
                    alt={type.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 dark:brightness-75"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-end p-4">
                  <div>
                    <h3 className="text-white text-lg font-bold leading-tight">{type.name}</h3>
                    <div className="h-0.5 w-0 bg-[#0EA5E9] mt-1 group-hover:w-8 transition-all duration-300 rounded-full" />
                  </div>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-[#0EA5E9] rounded-full p-1.5">
                    <ArrowRight className="h-3 w-3 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="py-24 bg-muted/30 border-y border-border transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-[#0EA5E9] text-xs font-semibold uppercase tracking-widest mb-3">
              Simple Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                icon: Sparkles,
                title: "Search Your Car",
                desc: "Use AI image search or advanced filters to find the perfect vehicle matching your exact needs.",
              },
              {
                step: "02",
                icon: Calendar,
                title: "Book Test Drive",
                desc: "Schedule a test drive at your convenience with our real-time availability calendar.",
              },
              {
                step: "03",
                icon: CheckCircle2,
                title: "Finalize Purchase",
                desc: "Complete your paperwork securely and drive away in your new dream car.",
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center relative">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center shadow-sm">
                    <Icon className="h-8 w-8 text-[#0EA5E9]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0EA5E9] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {step.slice(1)}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="py-24 bg-background relative overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <p className="text-[#0EA5E9] text-xs font-semibold uppercase tracking-widest mb-3">
              Social Proof
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Jenkins",
                role: "First-time Buyer",
                initials: "SJ",
                color: "from-[#0EA5E9] to-[#0284C7]",
                quote: "The AI image search is incredible! I snapped a picture of a car I liked on the street, and Carvix found the exact model in my area.",
              },
              {
                name: "Michael Chang",
                role: "Car Enthusiast",
                initials: "MC",
                color: "from-[#818CF8] to-[#6366F1]",
                quote: "Booking a test drive was so seamless. No phone calls, no waiting around. The dealership was ready when I arrived.",
              },
              {
                name: "Emily Rodriguez",
                role: "Family Car Upgrader",
                initials: "ER",
                color: "from-[#10B981] to-[#059669]",
                quote: "The detailed specifications and transparent pricing helped me make the right choice for my growing family. Highly recommended!",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="glass-card p-7 flex flex-col bg-card border-border hover:border-[#0EA5E9]/40 transition-all duration-300"
              >
                <div className="text-4xl text-[#0EA5E9]/30 font-serif leading-none mb-3">"</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                  {t.quote}
                </p>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{t.name}</h4>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ SECTION
      ══════════════════════════════════════ */}
      <section className="py-24 bg-card border-t border-border transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-14">
            <p className="text-[#0EA5E9] text-xs font-semibold uppercase tracking-widest mb-3">
              Got questions?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqItems.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card overflow-hidden border-border bg-background px-0"
              >
                <AccordionTrigger className="px-6 py-5 text-left text-base font-medium text-foreground hover:text-[#0EA5E9] hover:no-underline transition-colors duration-200 [&[data-state=open]]:text-[#0EA5E9]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-muted-foreground leading-relaxed text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════ */}
      <section className="py-24 bg-background relative overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 text-[#0EA5E9] text-sm font-medium mb-8">
            <Zap className="h-3.5 w-3.5" />
            Start Your Journey Today
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight">
            Ready to Find Your
            <br />
            <span className="gradient-title">Dream Car?</span>
          </h2>
          <p className="text-muted-foreground mb-10 text-lg max-w-xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who found their perfect vehicle through our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-semibold rounded-full px-8 hover:shadow-[0_0_35px_rgba(14,165,233,0.5)] transition-all duration-200"
              asChild
            >
              <Link href="/cars">
                Browse All Cars <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <SignedOut>
              <Button
                size="lg"
                variant="ghost"
                className="border border-border text-foreground hover:bg-muted rounded-full px-8 transition-all duration-200"
                asChild
              >
                <Link href="/sign-up">Create Free Account</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  );
}
