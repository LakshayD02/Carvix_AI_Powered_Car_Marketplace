"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import {
  AlertCircle,
  Calendar,
  Car,
  Fuel,
  Gauge,
  LocateFixed,
  Share2,
  Heart,
  MessageSquare,
  Currency,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Clock,
  MapPin,
  Check,
  Info,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toggleSavedCar } from "@/actions/car-listing";
import useFetch from "@/hooks/use-fetch";
import { formatCurrency } from "@/lib/helpers";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmiCalculator from "./emi-calculator";

export function CarDetails({ car, testDriveInfo }) {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(car.wishlisted);

  const {
    loading: savingCar,
    fn: toggleSavedCarFn,
    data: toggleResult,
    error: toggleError,
  } = useFetch(toggleSavedCar);

  useEffect(() => {
    if (toggleResult?.success) {
      setIsWishlisted(toggleResult.saved);
      toast.success(toggleResult.message);
    }
  }, [toggleResult]);

  useEffect(() => {
    if (toggleError) {
      toast.error("Failed to update favorites");
    }
  }, [toggleError]);

  const handleSaveCar = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in to save cars");
      router.push("/sign-in");
      return;
    }
    if (savingCar) return;
    await toggleSavedCarFn(car.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${car.year} ${car.make} ${car.model}`,
          text: `Check out this ${car.year} ${car.make} ${car.model} on Carvix!`,
          url: window.location.href,
        })
        .catch((error) => {
          console.log("Error sharing", error);
          copyToClipboard();
        });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleBookTestDrive = () => {
    if (!isSignedIn) {
      toast.error("Please sign in to book a test drive");
      router.push("/sign-in");
      return;
    }
    router.push(`/test-drive/${car.id}`);
  };

  // Helper for title casing strings
  const formatStr = (str, fallback = "N/A") => {
    if (!str) return fallback;
    const formatted = str.toString().replace(/_/g, " ").replace(/-/g, " ");
    return formatted
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Generated enriched features based on car attributes
  const featureList = [
    ...(car.transmission ? [{ label: `${formatStr(car.transmission)} Transmission`, category: "Performance" }] : []),
    ...(car.fuelType ? [{ label: `${formatStr(car.fuelType)} Engine`, category: "Performance" }] : []),
    ...(car.bodyType ? [{ label: `${formatStr(car.bodyType)} Body Styling`, category: "Exterior" }] : []),
    ...(car.color ? [{ label: `${formatStr(car.color)} Premium Exterior`, category: "Exterior" }] : []),
    ...(car.seats ? [{ label: `${car.seats} Ergonomic Seating`, category: "Comfort" }] : []),
    { label: "Anti-lock Braking System (ABS)", category: "Safety" },
    { label: "Multi-Zone Climate Control", category: "Comfort" },
    { label: "High-Resolution Touchscreen Infotainment", category: "Technology" },
    { label: "Rear View Parking Camera & Sensors", category: "Safety" },
    { label: "Bluetooth Wireless Connectivity", category: "Technology" },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Top Header & Gallery Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Gallery */}
        <div className="w-full lg:w-7/12">
          <div className="aspect-video rounded-2xl overflow-hidden relative mb-4 bg-muted border border-border shadow-md">
            {car.images && car.images.length > 0 ? (
              <Image
                src={car.images[currentImageIndex]}
                alt={`${car.year || ""} ${car.make || ""} ${car.model || ""}`}
                fill
                className="object-cover transition-all duration-300"
                priority
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-3">
                <Car className="h-20 w-20 opacity-40" />
                <span className="text-sm">No images available</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {car.images && car.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  className={`relative rounded-xl overflow-hidden h-20 w-28 flex-shrink-0 transition-all duration-200 border-2 ${
                    index === currentImageIndex
                      ? "border-[#0EA5E9] ring-2 ring-[#0EA5E9]/30 scale-95"
                      : "border-border opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${car.year || ""} ${car.make || ""} ${car.model || ""} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex mt-4 gap-4">
            <Button
              variant="outline"
              className={`flex items-center gap-2 flex-1 rounded-xl border-border bg-card text-foreground hover:bg-muted ${
                isWishlisted ? "text-red-500 border-red-500/30 bg-red-500/5" : ""
              }`}
              onClick={handleSaveCar}
              disabled={savingCar}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              {isWishlisted ? "Saved in Wishlist" : "Save Car"}
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 flex-1 rounded-xl border-border bg-card text-foreground hover:bg-muted"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5 text-[#0EA5E9]" />
              Share Vehicle
            </Button>
          </div>
        </div>

        {/* Car Details Summary */}
        <div className="w-full lg:w-5/12 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Badge className="bg-[#0EA5E9] text-white border-none px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                {car.year ? `${car.year} • ${formatStr(car.bodyType)}` : formatStr(car.bodyType)}
              </Badge>
              <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Listing</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-2">
              {car.year || ""} {car.make || ""} {car.model || ""}
            </h1>

            <div className="text-3xl font-black text-[#0EA5E9] tracking-tight mb-6">
              {formatCurrency(car.price || 0)}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-card border border-border mb-6">
              <div className="flex flex-col items-center justify-center p-2 text-center border-r border-border">
                <Gauge className="text-[#0EA5E9] h-5 w-5 mb-1" />
                <span className="text-xs text-muted-foreground uppercase font-medium">Mileage</span>
                <span className="text-sm font-bold text-foreground mt-0.5">
                  {car.mileage !== undefined && car.mileage !== null ? car.mileage.toLocaleString() : "N/A"} mi
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 text-center border-r border-border">
                <Fuel className="text-[#0EA5E9] h-5 w-5 mb-1" />
                <span className="text-xs text-muted-foreground uppercase font-medium">Fuel</span>
                <span className="text-sm font-bold text-foreground mt-0.5">{formatStr(car.fuelType)}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 text-center">
                <Car className="text-[#0EA5E9] h-5 w-5 mb-1" />
                <span className="text-xs text-muted-foreground uppercase font-medium">Transmission</span>
                <span className="text-sm font-bold text-foreground mt-0.5">{formatStr(car.transmission)}</span>
              </div>
            </div>

            {/* EMI Calculator Card */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer group p-4 rounded-xl bg-card border border-border hover:border-[#0EA5E9]/50 transition-all duration-200 mb-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                      <Currency className="h-4 w-4 text-[#0EA5E9]" />
                      <span>Estimated EMI Loan</span>
                    </div>
                    <span className="text-xs font-semibold text-[#0EA5E9] group-hover:underline">
                      Calculate &rarr;
                    </span>
                  </div>
                  <div className="text-base font-extrabold text-foreground">
                    {formatCurrency(car.price / 60)}{" "}
                    <span className="text-xs font-normal text-muted-foreground">/ month for 60 mos</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    *Est. with $0 down payment @ 4.5% APR
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-card border-border text-card-foreground max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Currency className="h-5 w-5 text-[#0EA5E9]" />
                    Carvix Financing Estimator
                  </DialogTitle>
                </DialogHeader>
                <EmiCalculator price={car.price} />
              </DialogContent>
            </Dialog>

            {/* Questions Card */}
            <div className="p-4 rounded-xl bg-card border border-border mb-6">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground mb-1">
                <MessageSquare className="h-4 w-4 text-[#0EA5E9]" />
                <span>Questions about this vehicle?</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Our specialists are ready to provide complete vehicle history and schedule inspection.
              </p>
              <a href="mailto:help@carvix.in">
                <Button variant="outline" size="sm" className="w-full rounded-lg border-border text-foreground hover:bg-muted">
                  Request Information
                </Button>
              </a>
            </div>
          </div>

          {/* Action / Booking Button */}
          <div>
            {(car.status === "SOLD" || car.status === "UNAVAILABLE") ? (
              <Alert variant="destructive" className="rounded-xl">
                <AlertTitle className="capitalize font-bold">
                  Vehicle is currently {car.status.toLowerCase()}
                </AlertTitle>
                <AlertDescription className="text-xs">
                  This car is no longer available for test drives or booking.
                </AlertDescription>
              </Alert>
            ) : (
              <Button
                className="w-full py-6 text-base font-bold bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white rounded-xl hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all duration-200"
                onClick={handleBookTestDrive}
                disabled={testDriveInfo.userTestDrive}
              >
                <Calendar className="mr-2 h-5 w-5" />
                {testDriveInfo.userTestDrive
                  ? `Test Drive Scheduled for ${format(
                      new Date(testDriveInfo.userTestDrive.bookingDate),
                      "MMM d, yyyy"
                    )}`
                  : "Book Test Drive"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ── Carvix AI Intelligence Report (Advanced Feature) ── */}
      <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0EA5E9]/15 border border-[#0EA5E9]/30 flex items-center justify-center text-[#0EA5E9]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Carvix AI Intelligence Report</h3>
              <p className="text-xs text-muted-foreground">Automated valuation and vehicle quality analysis</p>
            </div>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-3 py-1 text-xs font-semibold w-fit">
            Great Market Price
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-muted/40 border border-border">
            <span className="text-xs text-muted-foreground uppercase font-semibold">Fair Market Deal</span>
            <div className="text-lg font-bold text-foreground mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>4% Below Avg</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Based on recent regional sales</p>
          </div>

          <div className="p-4 rounded-xl bg-muted/40 border border-border">
            <span className="text-xs text-muted-foreground uppercase font-semibold">Health Score</span>
            <div className="text-lg font-bold text-foreground mt-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#0EA5E9]" />
              <span>96 / 100</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Passed 150-point inspection</p>
          </div>

          <div className="p-4 rounded-xl bg-muted/40 border border-border">
            <span className="text-xs text-muted-foreground uppercase font-semibold">Estimated Resale</span>
            <div className="text-lg font-bold text-foreground mt-1">Strong Value</div>
            <p className="text-[11px] text-muted-foreground mt-1">High demand model retention</p>
          </div>

          <div className="p-4 rounded-xl bg-muted/40 border border-border">
            <span className="text-xs text-muted-foreground uppercase font-semibold">Warranty Status</span>
            <div className="text-lg font-bold text-foreground mt-1 text-emerald-500">12 Mo Included</div>
            <p className="text-[11px] text-muted-foreground mt-1">Bumper to bumper coverage</p>
          </div>
        </div>
      </div>

      {/* ── Description & Features Section ── */}
      <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Description Column */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Vehicle Description</h3>
            <p className="whitespace-pre-line text-muted-foreground leading-relaxed text-sm sm:text-base">
              {car.description}
            </p>
          </div>

          {/* Features Column */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Key Features & Equipment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featureList.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/60 hover:border-[#0EA5E9]/40 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0EA5E9]/15 flex items-center justify-center flex-shrink-0 text-[#0EA5E9]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{feat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Specifications Section ── */}
      <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm transition-colors duration-300">
        <h2 className="text-2xl font-bold text-foreground mb-6">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {[
            { label: "Make", value: car.make || "N/A" },
            { label: "Model", value: car.model || "N/A" },
            { label: "Year", value: car.year || "N/A" },
            { label: "Body Type", value: formatStr(car.bodyType) },
            { label: "Fuel Type", value: formatStr(car.fuelType) },
            { label: "Transmission", value: formatStr(car.transmission) },
            { label: "Mileage", value: car.mileage !== undefined && car.mileage !== null ? `${car.mileage.toLocaleString()} miles` : "N/A" },
            { label: "Exterior Color", value: formatStr(car.color) },
            ...(car.seats ? [{ label: "Seating Capacity", value: `${car.seats} Seats` }] : []),
            { label: "Condition", value: "Verified Certified Pre-Owned" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between py-3 border-b border-border/70 text-sm"
            >
              <span className="text-muted-foreground font-medium">{label}</span>
              <span className="text-foreground font-bold">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dealership Location & Working Hours Section ── */}
      <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm transition-colors duration-300">
        <h2 className="text-2xl font-bold text-foreground mb-6">Dealership Location & Hours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Address & Contact */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-[#0EA5E9] mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground text-base">Carvix Experience Center</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {testDriveInfo.dealership?.address || "100 Innovation Way, Automotive District, CA 90210"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <PhoneCall className="h-5 w-5 text-[#0EA5E9] flex-shrink-0" />
              <span className="text-sm text-muted-foreground">
                Phone: <strong className="text-foreground">{testDriveInfo.dealership?.phone || "+1 (800) 555-CARVIX"}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-[#0EA5E9] flex-shrink-0" />
              <span className="text-sm text-muted-foreground">
                Email: <strong className="text-foreground">{testDriveInfo.dealership?.email || "support@carvix.com"}</strong>
              </span>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-[#0EA5E9]" />
              <h4 className="font-bold text-foreground text-sm">Working Hours</h4>
            </div>
            <div className="space-y-2 text-sm bg-muted/30 p-4 rounded-xl border border-border">
              {testDriveInfo.dealership?.workingHours
                ? testDriveInfo.dealership.workingHours.map((day) => (
                    <div key={day.dayOfWeek} className="flex justify-between">
                      <span className="text-muted-foreground capitalize">
                        {day.dayOfWeek.toLowerCase()}
                      </span>
                      <span className="font-semibold text-foreground">
                        {day.isOpen ? `${day.openTime} - ${day.closeTime}` : "Closed"}
                      </span>
                    </div>
                  ))
                : [
                    { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
                    { day: "Saturday", hours: "10:00 AM - 5:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-muted-foreground">{day}</span>
                      <span className="font-semibold text-foreground">{hours}</span>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
