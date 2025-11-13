"use client";

import React from "react";
import { SignedIn, SignedOut, useUser, UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";
import Image from "next/image";

const Header = ({ isAdminPage = false }) => {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "ADMIN"; // client-side role

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={isAdminPage ? "/admin" : "/"} className="flex items-center gap-2">
          <Image src="/logo.png" alt="Carvix Logo" width={200} height={60} />
          {isAdminPage && <span className="text-xs font-extralight">admin</span>}
        </Link>

        <div className="flex items-center space-x-4">
          {isAdminPage && (
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={18} />
                <span>Back to App</span>
              </Button>
            </Link>
          )}

          <SignedIn>
            {!isAdmin && (
              <Link href="/reservations">
                <Button variant="outline" className="flex items-center gap-2">
                  <CarFront size={18} />
                  <span className="hidden md:inline">My Reservations</span>
                </Button>
              </Link>
            )}
            <Link href="/saved-cars">
              <Button className="flex items-center gap-2">
                <Heart size={18} />
                <span className="hidden md:inline">Saved Cars</span>
              </Button>
            </Link>
            {isAdmin && (
              <Link href="/admin">
                <Button variant="outline" className="flex items-center gap-2">
                  <Layout size={18} />
                  <span className="hidden md:inline">Admin Portal</span>
                </Button>
              </Link>
            )}
            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
          </SignedIn>

          <SignedOut>
            {!isAdminPage && (
              <div className="flex items-center space-x-2">
                <Link href="/sign-up">
                  <Button variant="default">Sign Up</Button>
                </Link>
                <SignInButton forceRedirectUrl="/">
                  <Button variant="outline">Login</Button>
                </SignInButton>
              </div>
            )}
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
