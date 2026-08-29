import React from "react";
import { Button } from "./ui/button";
import { Heart, CarFront, Layout, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import { NavContent, MobileMenu } from "./header-nav";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";

const Header = async ({ isAdminPage = false }) => {
  const user = await checkUser();
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border transition-colors duration-300">
      <nav className="mx-auto px-4 sm:px-6 py-3 flex items-center justify-between max-w-[1400px]">
        {/* Logo */}
        <Link
          href={isAdminPage ? "/admin" : "/"}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <Logo width={130} height={42} />
          {isAdminPage && (
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0EA5E9] bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 px-2 py-0.5 rounded-full">
              admin
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <NavContent isAdminPage={isAdminPage} />

        {/* Action Buttons & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {isAdminPage ? (
            <Link href="/">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted border border-border rounded-full text-sm"
              >
                <ArrowLeft size={15} />
                <span>Back to App</span>
              </Button>
            </Link>
          ) : (
            <SignedIn>
              {!isAdmin && (
                <Link href="/reservations">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted border border-border rounded-full text-sm transition-all"
                  >
                    <CarFront size={15} />
                    <span className="hidden md:inline">My Reservations</span>
                  </Button>
                </Link>
              )}
              <Link href="/saved-cars">
                <Button className="flex items-center gap-2 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-semibold rounded-full hover:shadow-[0_0_20px_rgba(14,165,233,0.35)] transition-all duration-200 text-sm">
                  <Heart size={14} />
                  <span className="hidden md:inline">Saved Cars</span>
                </Button>
              </Link>
              {isAdmin && (
                <Link href="/admin">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted border border-border rounded-full text-sm"
                  >
                    <Layout size={15} />
                    <span className="hidden md:inline">Admin Portal</span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}

          <SignedOut>
            {!isAdminPage && (
              <div className="flex items-center gap-2">
                <SignInButton forceRedirectUrl="/">
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground hover:bg-muted border border-border rounded-full text-sm transition-all"
                  >
                    Login
                  </Button>
                </SignInButton>
                <Link href="/sign-up">
                  <Button className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-semibold rounded-full hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all duration-200 text-sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-9 h-9 ring-2 ring-[#0EA5E9]/30 hover:ring-[#0EA5E9]/60 transition-all",
                },
              }}
            />
          </SignedIn>

          {/* Mobile hamburger */}
          <MobileMenu isAdminPage={isAdminPage} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
