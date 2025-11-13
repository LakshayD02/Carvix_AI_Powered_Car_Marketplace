import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Carvix AI",
  description: "Find your Dream Car",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-white.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-gray-900 text-gray-300 py-16">
  <div className="container mx-auto px-4 text-center md:text-left">
    {/* Logo & Description */}
    <div className="mb-8 md:mb-0">
      <img
        src="/logo.png"
        alt="Carvix AI Logo"
        className="h-10 mb-4 mx-auto md:mx-0"
      />
      <p className="text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0">
        Carvix AI is a modern, full-stack SaaS platform revolutionizing car buying with AI-powered image search, automated data extraction, and seamless test drive booking. 
        Our platform enhances the car buying experience by providing detailed car insights, real-time availability, and a secure, user-friendly interface.
      </p>
    </div>

    {/* Bottom copyright */}
    <div className="border-t border-gray-800 mt-12 pt-6 text-gray-500 text-sm">
      © {new Date().getFullYear()} Carvix AI. All rights reserved.
    </div>
  </div>
</footer>

        </body>
      </html>
    </ClerkProvider>
  );
}
