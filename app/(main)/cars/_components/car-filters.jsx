"use client";

import { useCallback, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Filter, X, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { CarFilterControls } from "./filter-controls";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CarFilters = ({ filters }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentMake = searchParams.get("make") || "";
  const currentBodyType = searchParams.get("bodyType") || "";
  const currentFuelType = searchParams.get("fuelType") || "";
  const currentTransmission = searchParams.get("transmission") || "";
  const currentMinPrice = searchParams.get("minPrice")
    ? parseInt(searchParams.get("minPrice"))
    : filters.priceRange.min;
  const currentMaxPrice = searchParams.get("maxPrice")
    ? parseInt(searchParams.get("maxPrice"))
    : filters.priceRange.max;
  const currentSortBy = searchParams.get("sortBy") || "newest";

  const [make, setMake] = useState(currentMake);
  const [bodyType, setBodyType] = useState(currentBodyType);
  const [fuelType, setFuelType] = useState(currentFuelType);
  const [transmission, setTransmission] = useState(currentTransmission);
  const [priceRange, setPriceRange] = useState([
    currentMinPrice,
    currentMaxPrice,
  ]);
  const [sortBy, setSortBy] = useState(currentSortBy);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setMake(currentMake);
    setBodyType(currentBodyType);
    setFuelType(currentFuelType);
    setTransmission(currentTransmission);
    setPriceRange([currentMinPrice, currentMaxPrice]);
    setSortBy(currentSortBy);
  }, [
    currentMake,
    currentBodyType,
    currentFuelType,
    currentTransmission,
    currentMinPrice,
    currentMaxPrice,
    currentSortBy,
  ]);

  const activeFilterCount = [
    make,
    bodyType,
    fuelType,
    transmission,
    currentMinPrice > filters.priceRange.min ||
      currentMaxPrice < filters.priceRange.max,
  ].filter(Boolean).length;

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();

    if (make) params.set("make", make);
    if (bodyType) params.set("bodyType", bodyType);
    if (fuelType) params.set("fuelType", fuelType);
    if (transmission) params.set("transmission", transmission);
    if (priceRange[0] > filters.priceRange.min)
      params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < filters.priceRange.max)
      params.set("maxPrice", priceRange[1].toString());
    if (sortBy !== "newest") params.set("sortBy", sortBy);

    const search = searchParams.get("search");
    const page = searchParams.get("page");
    if (search) params.set("search", search);
    if (page && page !== "1") params.set("page", page);

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    router.push(url);
    setIsSheetOpen(false);
  }, [
    make,
    bodyType,
    fuelType,
    transmission,
    priceRange,
    sortBy,
    pathname,
    searchParams,
    filters.priceRange.min,
    filters.priceRange.max,
  ]);

  const handleFilterChange = (filterName, value) => {
    switch (filterName) {
      case "make":
        setMake(value);
        break;
      case "bodyType":
        setBodyType(value);
        break;
      case "fuelType":
        setFuelType(value);
        break;
      case "transmission":
        setTransmission(value);
        break;
      case "priceRange":
        setPriceRange(value);
        break;
    }
  };

  const handleClearFilter = (filterName) => {
    handleFilterChange(filterName, "");
  };

  const clearFilters = () => {
    setMake("");
    setBodyType("");
    setFuelType("");
    setTransmission("");
    setPriceRange([filters.priceRange.min, filters.priceRange.max]);
    setSortBy("newest");

    const params = new URLSearchParams();
    const search = searchParams.get("search");
    if (search) params.set("search", search);

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    router.push(url);
    setIsSheetOpen(false);
  };

  const currentFilters = {
    make,
    bodyType,
    fuelType,
    transmission,
    priceRange,
    priceRangeMin: filters.priceRange.min,
    priceRangeMax: filters.priceRange.max,
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile Filter trigger + Sort Row */}
      <div className="flex items-center justify-between gap-3 lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-border bg-card text-foreground hover:bg-muted rounded-xl"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#0EA5E9]" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <Badge className="ml-1 bg-[#0EA5E9] text-white text-xs h-5 px-1.5 rounded-full">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-full sm:max-w-md bg-card border-r border-border text-card-foreground p-0 flex flex-col"
          >
            <SheetHeader className="p-6 border-b border-border text-left">
              <SheetTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-[#0EA5E9]" />
                <span>Filter Inventory</span>
              </SheetTitle>
            </SheetHeader>

            <div className="p-6 flex-1 overflow-y-auto">
              <CarFilterControls
                filters={filters}
                currentFilters={currentFilters}
                onFilterChange={handleFilterChange}
                onClearFilter={handleClearFilter}
              />
            </div>

            <SheetFooter className="p-4 border-t border-border bg-muted/40 flex gap-3 flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                className="flex-1 border-border text-muted-foreground hover:text-foreground rounded-xl"
              >
                Reset
              </Button>
              <Button
                type="button"
                onClick={applyFilters}
                className="flex-1 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white rounded-xl font-medium"
              >
                Apply Filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Mobile Sort dropdown */}
        <Select
          value={sortBy}
          onValueChange={(value) => {
            setSortBy(value);
            setTimeout(() => applyFilters(), 0);
          }}
        >
          <SelectTrigger className="w-[170px] bg-card border-border text-foreground rounded-xl text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border text-card-foreground">
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="priceAsc">Price: Low to High</SelectItem>
            <SelectItem value="priceDesc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Filters Sidebar */}
      <div className="hidden lg:block sticky top-24">
        <div className="glass-card overflow-hidden bg-card border border-border rounded-2xl shadow-xl transition-colors duration-300">
          {/* Header */}
          <div className="p-5 border-b border-border flex justify-between items-center bg-muted/30">
            <h3 className="font-bold text-foreground flex items-center gap-2 text-base">
              <SlidersHorizontal className="h-4 w-4 text-[#0EA5E9]" />
              <span>Filters</span>
            </h3>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-muted-foreground hover:text-[#0EA5E9] hover:bg-muted px-2 rounded-lg"
                onClick={clearFilters}
              >
                <RotateCcw className="mr-1 h-3 w-3" />
                Clear
              </Button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="p-4 border-b border-border">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
              Sort Order
            </label>
            <Select
              value={sortBy}
              onValueChange={(value) => {
                setSortBy(value);
                setTimeout(() => applyFilters(), 0);
              }}
            >
              <SelectTrigger className="w-full bg-background border-border text-foreground rounded-xl text-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border text-card-foreground">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                <SelectItem value="priceDesc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Controls Body */}
          <div className="p-5 max-h-[calc(100vh-280px)] overflow-y-auto">
            <CarFilterControls
              filters={filters}
              currentFilters={currentFilters}
              onFilterChange={handleFilterChange}
              onClearFilter={handleClearFilter}
            />
          </div>

          {/* Apply Action */}
          <div className="p-4 border-t border-border bg-muted/30">
            <Button
              onClick={applyFilters}
              className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
