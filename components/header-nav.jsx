"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, Car, Info, Mail, Heart, CalendarRange } from "lucide-react";
import { Button } from "./ui/button";
import { Logo } from "@/components/logo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Inventory", href: "/cars", icon: Car },
  { label: "About Us", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Mail },
  { label: "Reservations", href: "/reservations", icon: CalendarRange },
  { label: "Saved Cars", href: "/saved-cars", icon: Heart },
];

export function NavContent({ isAdminPage }) {
  const pathname = usePathname();

  if (isAdminPage) return null;

  return (
    <div className="hidden md:flex items-center space-x-1">
      {NAV_LINKS.slice(0, 3).map(({ label, href }) => {
        const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 group ${
              isActive ? "text-[#0EA5E9]" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
            <span
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] transition-all duration-300 ${
                isActive ? "w-4/5 opacity-100" : "w-0 opacity-0 group-hover:w-4/5 group-hover:opacity-60"
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
}

export function MobileMenu({ isAdminPage }) {
  const pathname = usePathname();
  if (isAdminPage) return null;

  return (
    <div className="md:hidden ml-auto">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-full h-10 w-10 transition-colors"
            aria-label="Open Mobile Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="top"
          className="w-full max-h-[85vh] overflow-y-auto bg-card/95 backdrop-blur-2xl border-b border-border rounded-b-3xl p-6 text-foreground shadow-2xl transition-all duration-500 ease-in-out"
        >
          <div className="flex flex-col space-y-6 max-w-md mx-auto pt-2">
            {/* Brand Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <Logo width={120} height={38} />
              <span className="text-xs uppercase font-bold tracking-widest text-[#0EA5E9] bg-[#0EA5E9]/10 px-2.5 py-1 rounded-full border border-[#0EA5E9]/20">
                Menu
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
                return (
                  <SheetClose asChild key={href}>
                    <Link
                      href={href}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-[#0EA5E9]/10 text-[#0EA5E9] border border-[#0EA5E9]/25 shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${isActive ? "bg-[#0EA5E9]/15 text-[#0EA5E9]" : "bg-muted text-muted-foreground"}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span>{label}</span>
                      </div>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#0EA5E9] shadow-[0_0_8px_#0EA5E9]" />
                      )}
                    </Link>
                  </SheetClose>
                );
              })}
            </div>

            {/* Bottom Call to Action */}
            <div className="pt-2">
              <SheetClose asChild>
                <Link href="/cars">
                  <Button className="w-full py-6 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-bold text-base rounded-2xl hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    <span>Explore All Inventory</span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
