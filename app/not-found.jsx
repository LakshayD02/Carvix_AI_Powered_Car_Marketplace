import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Car } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 text-center bg-background text-foreground transition-colors duration-300">
      <div className="p-4 rounded-full bg-[#0EA5E9]/10 text-[#0EA5E9] mb-6">
        <Car className="h-12 w-12" />
      </div>
      <h1 className="text-7xl font-extrabold gradient-title mb-2">404</h1>
      <h2 className="text-2xl font-bold text-foreground mb-3">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md text-sm leading-relaxed">
        The vehicle page or link you're looking for doesn't exist or has been moved.
      </p>
      <Button
        className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-semibold rounded-full px-6 hover:shadow-[0_0_25px_rgba(14,165,233,0.4)] transition-all duration-200"
        asChild
      >
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft size={16} />
          <span>Return Home</span>
        </Link>
      </Button>
    </div>
  );
}
