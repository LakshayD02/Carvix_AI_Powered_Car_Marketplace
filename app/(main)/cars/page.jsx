import { CarFilters } from "./_components/car-filters";
import { getCarFilters } from "@/actions/car-listing";
import { CarListings } from "./_components/cars-listing";

export const metadata = {
  title: "Inventory | Carvix AI",
  description: "Browse and search our premium selection of verified cars",
};

export default async function CarsPage() {
  const filtersData = await getCarFilters();

  return (
    <div className="min-h-screen bg-background text-foreground pt-4 sm:pt-6 pb-16 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Title Header */}
        <div className="mb-10 text-left">
          <p className="text-[#0EA5E9] text-xs font-semibold uppercase tracking-widest mb-2">
            Explore Marketplace
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-3">
            Car Inventory
          </h1>
          <p className="text-muted-foreground text-base max-w-xl">
            Filter by make, body style, price, or fuel type to find your ideal vehicle.
          </p>
          <div className="h-0.5 w-20 bg-gradient-to-r from-[#0EA5E9] to-[#818CF8] mt-4 rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <CarFilters filters={filtersData.data} />
          </div>

          {/* Car Listings */}
          <div className="flex-1">
            <CarListings />
          </div>
        </div>
      </div>
    </div>
  );
}
