"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Car, Calendar, Cog, LogOut, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";
import { Logo } from "@/components/logo";

// Navigation items
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Cars Inventory",
    icon: Car,
    href: "/admin/cars",
  },
  {
    label: "Test Drives",
    icon: Calendar,
    href: "/admin/test-drives",
  },
  {
    label: "Settings",
    icon: Cog,
    href: "/admin/settings",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full flex-col overflow-y-auto bg-card border-r border-border text-card-foreground transition-colors duration-300">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo width={120} height={36} />
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#0EA5E9] bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 px-2 py-0.5 rounded-full">
            Admin
          </span>
        </div>

        <div className="flex flex-col w-full py-4 gap-1 px-3">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-x-3 text-sm font-medium px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "text-[#0EA5E9] bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <route.icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-[#0EA5E9]" : "text-muted-foreground"
                  )}
                />
                {route.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto p-4 border-t border-border">
          <SignOutButton>
            <button className="flex items-center gap-x-3 w-full text-left px-4 py-3 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-xl text-sm font-medium transition-all duration-200">
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>

      {/* Mobile Bottom Tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border flex justify-around items-center h-16">
        {routes.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 py-1 flex-1",
                isActive ? "text-[#0EA5E9]" : "text-muted-foreground"
              )}
            >
              <route.icon
                className={cn(
                  "h-5 w-5 mb-0.5",
                  isActive ? "text-[#0EA5E9]" : "text-muted-foreground"
                )}
              />
              {route.label}
            </Link>
          );
        })}
      </div>
    </>
  );
};
