"use client"; // Mark as client component since we use SignedIn/SignedOut

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

const Header = ({ isAdminPage = false }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch user client-side to avoid server-side prerender issues
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await checkUser();
        setUser(currentUser);
        setIsAdmin(currentUser?.role === "ADMIN");
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={isAdminPage ? "/admin" : "/"}
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="Carvix Logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
          />
          {isAdminPage && (
            <span className="text-xs font-extralight">admin</span>
          )}
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Admin page back button */}
          {isAdminPage && (
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={18} />
                <span>Back to App</span>
              </Button>
            </Link>
          )}

          {/* SignedIn Buttons */}
          <SignedIn>
            {!isAdmin && (
              <Link
                href="/reservations"
                className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
              >
                <Button variant="outline">
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

            <UserButton
              appearance={{
                elements: { avatarBox: "w-10 h-10" },
              }}
            />
          </SignedIn>

          {/* SignedOut Buttons */}
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
