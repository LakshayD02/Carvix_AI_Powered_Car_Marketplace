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

        <footer className="bg-gray-50 border-t border-gray-200 py-12">
  <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
    {/* Branding / Description */}
    <div className="text-center md:text-left max-w-md">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Carvix AI</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Revolutionizing the car buying experience with AI-powered search, automated data extraction, and seamless test drive booking.
      </p>
    </div>

    {/* Legal / Copyright */}
    <div className="text-center md:text-right text-gray-500 text-sm">
      <p>© {new Date().getFullYear()} Carvix AI. All rights reserved.</p>
      <p className="mt-1">Built for modern car buyers and dealerships.</p>
    </div>
  </div>
</footer>


        </body>
      </html>
    </ClerkProvider>
  );
}
