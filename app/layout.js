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
  
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 flex flex-col items-center text-center">
              {/* Logo */}
              <Image
                src="/logo.png"
                alt="Carvix Logo"
                width={150}
                height={50}
                className="mb-4 object-contain"
              />
          
              {/* Description */}
              <p className="text-gray-600 max-w-md mb-4">
                Carvix AI is a modern SaaS platform revolutionizing the car buying experience with AI-powered search, seamless test drive booking, and verified vehicle listings.
              </p>
          
              {/* Copyright */}
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Carvix AI. All rights reserved.
              </p>
            </div>
          </footer>

        </body>
      </html>
    </ClerkProvider>
  );
}
