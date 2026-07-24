import React from "react";
import { Button } from "./ui/button";
import { Heart, CarFront, Layout, ArrowLeft, Menu } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Header = async ({ isAdminPage = false }) => {
  const user = await checkUser();
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={isAdminPage ? "/admin" : "/"} className="flex">
          <Image
            src={"/logo.png"}
            alt="Carvix Logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
          />
          {isAdminPage && (
            <span className="text-xs font-extralight">admin</span>
          )}
        </Link>

        {/* Navigation Links */}
        {!isAdminPage && (
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/cars" className="px-4 py-2 rounded-full text-sm font-semibold text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all">
              Inventory
            </Link>
            <Link href="/about" className="px-4 py-2 rounded-full text-sm font-semibold text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all">
              About Us
            </Link>
            <Link href="/contact" className="px-4 py-2 rounded-full text-sm font-semibold text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all">
              Contact
            </Link>
          </div>
        )}

        {/* Mobile Menu */}
        {!isAdminPage && (
          <div className="md:hidden ml-auto mr-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="p-0 h-auto">
                  <Menu className="h-6 w-6 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <SheetClose asChild>
                    <Link href="/cars" className="flex items-center px-4 py-3 rounded-xl text-lg font-semibold text-gray-800 hover:text-blue-700 hover:bg-blue-50 transition-all">
                      Inventory
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/about" className="flex items-center px-4 py-3 rounded-xl text-lg font-semibold text-gray-800 hover:text-blue-700 hover:bg-blue-50 transition-all">
                      About Us
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/contact" className="flex items-center px-4 py-3 rounded-xl text-lg font-semibold text-gray-800 hover:text-blue-700 hover:bg-blue-50 transition-all">
                      Contact
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {isAdminPage ? (
            <>
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft size={18} />
                  <span>Back to App</span>
                </Button>
              </Link>
            </>
          ) : (
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
              <a href="/saved-cars">
                <Button className="flex items-center gap-2">
                  <Heart size={18} />
                  <span className="hidden md:inline">Saved Cars</span>
                </Button>
              </a>
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Layout size={18} />
                    <span className="hidden md:inline">Admin Portal</span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}

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

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
