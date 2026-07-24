import Image from "next/image";
import { CheckCircle2, Shield, Users, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | Carvix AI",
  description: "Learn more about Carvix AI and our mission to revolutionize the car buying experience.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col pt-24 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/dots-pattern.svg')] bg-repeat opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Revolutionizing How You Find Your Next Car
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Carvix AI leverages cutting-edge artificial intelligence to make discovering, researching, and buying your dream car a seamless experience.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that buying a car shouldn't be stressful, time-consuming, or opaque. Our mission is to bring radical transparency and unparalleled convenience to the automotive marketplace through the power of AI.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you're looking for a family SUV or a sporty coupe, our AI image search and intelligent filtering systems understand exactly what you want, matching you with the perfect vehicle in seconds.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-2xl">
                <Target className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">Precision</h3>
                <p className="text-gray-600">AI-driven search ensures you find exactly what you're looking for.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-2xl">
                <Shield className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">Trust</h3>
                <p className="text-gray-600">Verified listings and secure, transparent transactions.</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-2xl">
                <Users className="w-10 h-10 text-pink-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">Community</h3>
                <p className="text-gray-600">Connecting buyers and sellers with confidence.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-2xl">
                <CheckCircle2 className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">Simplicity</h3>
                <p className="text-gray-600">A streamlined process from search to test drive.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to find your perfect car?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the future of car buying today. Use our AI image search or browse our extensive inventory.
          </p>
          <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white border-0">
            <Link href="/cars">Browse Inventory</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
