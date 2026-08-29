"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Car as CarIcon, Loader2, Gauge, Fuel, Cog, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { toggleSavedCar } from "@/actions/car-listing";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";

// Helper functions for inventory detail formatting
const formatMileage = (mileage) => {
  if (mileage === undefined || mileage === null || mileage === "") return "N/A";
  const num = typeof mileage === "number" ? mileage : parseInt(mileage, 10);
  if (isNaN(num)) return "N/A";
  if (num >= 1000) {
    const value = (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1);
    return `${value}k mi`;
  }
  return `${num} mi`;
};

const formatTitleCase = (str, fallback = "N/A") => {
  if (!str) return fallback;
  const formatted = str.toString().replace(/_/g, " ").replace(/-/g, " ");
  return formatted
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const CarCard = ({ car }) => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(car.wishlisted);

  const {
    loading: isToggling,
    fn: toggleSavedCarFn,
    data: toggleResult,
    error: toggleError,
  } = useFetch(toggleSavedCar);

  useEffect(() => {
    if (toggleResult?.success && toggleResult.saved !== isSaved) {
      setIsSaved(toggleResult.saved);
      toast.success(toggleResult.message);
    }
  }, [toggleResult, isSaved]);

  useEffect(() => {
    if (toggleError) {
      toast.error("Failed to update favorites");
    }
  }, [toggleError]);

  const handleToggleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      toast.error("Please sign in to save cars");
      router.push("/sign-in");
      return;
    }

    if (isToggling) return;
    await toggleSavedCarFn(car.id);
  };

  return (
    <Card className="glass-card overflow-hidden card-glow group flex flex-col justify-between border-border bg-card/90 text-card-foreground backdrop-blur-md transition-colors duration-300">
      <div>
        {/* Car Image Container */}
        <div className="relative h-52 w-full overflow-hidden bg-muted">
          {car.images && car.images.length > 0 ? (
            <Image
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <CarIcon className="h-12 w-12 text-muted-foreground/40" />
            </div>
          )}

          {/* Top Gradient Overlay */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-[#0EA5E9] text-white border-none shadow-sm backdrop-blur-md text-xs font-bold px-2.5 py-0.5">
              {car.year || "N/A"}
            </Badge>
            <Badge variant="outline" className="bg-background/80 text-foreground border-border backdrop-blur-md text-xs">
              {formatTitleCase(car.bodyType)}
            </Badge>
          </div>

          {/* Save / Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 rounded-full h-9 w-9 backdrop-blur-md transition-all duration-200 ${
              isSaved
                ? "bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500/30"
                : "bg-background/70 text-muted-foreground border border-border hover:text-foreground hover:bg-background"
            }`}
            onClick={handleToggleSave}
            disabled={isToggling}
          >
            {isToggling ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Heart className={isSaved ? "fill-current" : ""} size={18} />
            )}
          </Button>
        </div>

        {/* Content */}
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider">
                {car.make || "Vehicle"}
              </span>
              <h3 className="text-xl font-bold text-foreground line-clamp-1 group-hover:text-[#0EA5E9] transition-colors">
                {car.model || "Details"}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-[#0EA5E9]">
                ${car.price !== undefined && car.price !== null ? car.price.toLocaleString() : "N/A"}
              </span>
            </div>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-muted/50 border border-border mb-4 text-xs text-muted-foreground">
            <div className="flex flex-col items-center justify-center text-center gap-1">
              <Gauge className="h-3.5 w-3.5 text-[#0EA5E9]" />
              <span className="font-semibold text-foreground">{formatMileage(car.mileage)}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-1 border-x border-border">
              <Cog className="h-3.5 w-3.5 text-[#0EA5E9]" />
              <span className="font-semibold text-foreground">{formatTitleCase(car.transmission)}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-1">
              <Fuel className="h-3.5 w-3.5 text-[#0EA5E9]" />
              <span className="font-semibold text-foreground">{formatTitleCase(car.fuelType)}</span>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Footer CTA */}
      <div className="px-5 pb-5 pt-0">
        <Button
          className="w-full bg-[#0EA5E9]/10 hover:bg-[#0EA5E9] text-[#0EA5E9] hover:text-white border border-[#0EA5E9]/30 hover:border-[#0EA5E9] rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          onClick={() => {
            router.push(`/cars/${car.id}`);
          }}
        >
          <span>View Details</span>
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Card>
  );
};
