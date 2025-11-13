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

            <footer className="bg-blue-50 border-t border-gray-200">
            <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
              {/* Logo and Tagline */}
              <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                <div className="flex items-center space-x-2">
                  <img src="/logo-white.png" alt="Carvix AI" className="h-10 w-auto" />
                  <span className="text-xl font-semibold text-gray-800">Carvix AI</span>
                </div>
                <p className="mt-2 text-gray-500 max-w-xs text-center md:text-left">
                  A modern AI-driven platform redefining car buying with smart search, seamless test drives, and trusted listings.
                </p>
              </div>
          
              {/* Footer Info */}
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 text-gray-600 text-sm text-center md:text-left">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Company</h4>
                  <p>About Us</p>
                  <p>Careers</p>
                  <p>Blog</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Support</h4>
                  <p>Contact</p>
                  <p>Help Center</p>
                  <p>Privacy Policy</p>
                </div>
              </div>
            </div>
          
            {/* Bottom Bar */}
            <div className="border-t border-gray-200 mt-8 py-4 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Carvix AI. All rights reserved.
            </div>
          </footer>


        </body>
      </html>
    </ClerkProvider>
  );
}
