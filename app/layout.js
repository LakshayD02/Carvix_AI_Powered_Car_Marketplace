import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { Logo } from "@/components/logo";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Carvix AI — Find Your Dream Car",
    template: "%s | Carvix AI",
  },
  description:
    "AI-powered car marketplace. Buy, rent, and discover thousands of verified vehicles with intelligent search, seamless test drive booking, and transparent pricing.",
  keywords: ["car marketplace", "buy car", "rent car", "AI car search", "test drive", "dealership"],
  openGraph: {
    title: "Carvix AI — Find Your Dream Car",
    description: "AI-powered car marketplace with thousands of verified vehicles.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="alternate icon" href="/logo-white.png" />
        </head>
        <body className={`${outfit.className} bg-background text-foreground antialiased min-h-screen flex flex-col transition-colors duration-300`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            <Header />
            <main className="flex-1">{children}</main>
            <Toaster richColors />

            {/* ── Premium Footer ── */}
            <footer className="bg-card border-t border-border mt-auto transition-colors duration-300">
              {/* Top gradient line */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#0EA5E9]/60 to-transparent" />

              <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                  {/* Brand Column */}
                  <div className="md:col-span-2">
                    <Logo width={140} height={45} className="mb-4" />
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
                      Carvix AI revolutionizes how you discover, compare, and purchase
                      vehicles — with intelligent search, verified listings, and seamless
                      test drive booking.
                    </p>
                    {/* Social icons */}
                    <div className="flex gap-3">
                      {[
                        { label: "Twitter", icon: "𝕏" },
                        { label: "LinkedIn", icon: "in" },
                        { label: "Instagram", icon: "◎" },
                      ].map(({ label, icon }) => (
                        <button
                          key={label}
                          aria-label={label}
                          className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground text-sm hover:border-[#0EA5E9] hover:text-[#0EA5E9] hover:bg-[#0EA5E9]/10 transition-all duration-200"
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0EA5E9] mb-5">
                      Quick Links
                    </h4>
                    <ul className="space-y-3">
                      {[
                        { label: "Browse Cars", href: "/cars" },
                        { label: "About Us", href: "/about" },
                        { label: "Contact", href: "/contact" },
                        { label: "Dealerships", href: "/cars" },
                      ].map(({ label, href }) => (
                        <li key={label}>
                          <Link
                            href={href}
                            className="text-muted-foreground text-sm hover:text-foreground hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
                          >
                            <span className="w-0 group-hover:w-3 h-px bg-[#0EA5E9] transition-all duration-200" />
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Support */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0EA5E9] mb-5">
                      Support
                    </h4>
                    <ul className="space-y-3">
                      {[
                        { label: "Help Center", href: "/contact" },
                        { label: "Privacy Policy", href: "/contact" },
                        { label: "Terms of Service", href: "/contact" },
                        { label: "Cookie Policy", href: "/contact" },
                      ].map(({ label, href }) => (
                        <li key={label}>
                          <Link
                            href={href}
                            className="text-muted-foreground text-sm hover:text-foreground hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
                          >
                            <span className="w-0 group-hover:w-3 h-px bg-[#0EA5E9] transition-all duration-200" />
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-muted-foreground text-xs">
                    © {new Date().getFullYear()} Carvix AI. All rights reserved. Built with ❤️
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-muted-foreground text-xs">All systems operational</span>
                  </div>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
