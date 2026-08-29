"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Car, SearchX, RotateCcw } from "lucide-react";
import { CarCard } from "@/components/car-card";
import useFetch from "@/hooks/use-fetch";
import { getCars } from "@/actions/car-listing";
import CarListingsLoading from "./car-listing-loading";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function CarListings() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  // Extract filter values from searchParams
  const search = searchParams.get("search") || "";
  const make = searchParams.get("make") || "";
  const bodyType = searchParams.get("bodyType") || "";
  const fuelType = searchParams.get("fuelType") || "";
  const transmission = searchParams.get("transmission") || "";
  const minPrice = searchParams.get("minPrice") || 0;
  const maxPrice = searchParams.get("maxPrice") || Number.MAX_SAFE_INTEGER;
  const sortBy = searchParams.get("sortBy") || "newest";
  const page = parseInt(searchParams.get("page") || "1");

  // Use the useFetch hook
  const { loading, fn: fetchCars, data: result, error } = useFetch(getCars);

  // Fetch cars when filters change
  useEffect(() => {
    fetchCars({
      search,
      make,
      bodyType,
      fuelType,
      transmission,
      minPrice,
      maxPrice,
      sortBy,
      page,
      limit,
    });
  }, [
    search,
    make,
    bodyType,
    fuelType,
    transmission,
    minPrice,
    maxPrice,
    sortBy,
    page,
  ]);

  // Update URL when page changes
  useEffect(() => {
    if (currentPage !== page) {
      const params = new URLSearchParams(searchParams);
      params.set("page", currentPage.toString());
      router.push(`?${params.toString()}`);
    }
  }, [currentPage, router, searchParams, page]);

  // Handle pagination clicks
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  // Generate pagination URL
  const getPaginationUrl = (pageNum) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNum.toString());
    return `?${params.toString()}`;
  };

  // Show loading state
  if (loading && !result) {
    return <CarListingsLoading />;
  }

  // Handle error
  if (error || (result && !result.success)) {
    return (
      <Alert className="bg-red-500/10 border-red-500/30 text-red-400">
        <Info className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load cars. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  // If no results yet, return empty placeholder
  if (!result || !result.data) {
    return null;
  }

  const { data: cars, pagination } = result;

  // No results
  if (cars.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-10 border border-border rounded-2xl glass-card bg-card/60 text-card-foreground">
        <div className="p-4 rounded-full bg-[#0EA5E9]/10 text-[#0EA5E9] mb-4">
          <SearchX className="h-10 w-10" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">No vehicles found</h3>
        <p className="text-muted-foreground mb-6 max-w-md text-sm">
          We couldn't find any vehicles matching your current search criteria. Try adjusting or clearing your filters.
        </p>
        <Button
          variant="outline"
          className="border-border text-foreground hover:bg-muted rounded-xl gap-2"
          asChild
        >
          <Link href="/cars">
            <RotateCcw className="h-4 w-4 text-[#0EA5E9]" />
            Reset all filters
          </Link>
        </Button>
      </div>
    );
  }

  // Generate pagination items
  const paginationItems = [];
  const visiblePageNumbers = [];
  visiblePageNumbers.push(1);

  for (
    let i = Math.max(2, page - 1);
    i <= Math.min(pagination.pages - 1, page + 1);
    i++
  ) {
    visiblePageNumbers.push(i);
  }

  if (pagination.pages > 1) {
    visiblePageNumbers.push(pagination.pages);
  }

  const uniquePageNumbers = [...new Set(visiblePageNumbers)].sort(
    (a, b) => a - b
  );

  let lastPageNumber = 0;
  uniquePageNumbers.forEach((pageNumber) => {
    if (pageNumber - lastPageNumber > 1) {
      paginationItems.push(
        <PaginationItem key={`ellipsis-${pageNumber}`}>
          <PaginationEllipsis className="text-muted-foreground" />
        </PaginationItem>
      );
    }

    paginationItems.push(
      <PaginationItem key={pageNumber}>
        <PaginationLink
          href={getPaginationUrl(pageNumber)}
          isActive={pageNumber === page}
          className={
            pageNumber === page
              ? "bg-[#0EA5E9] text-white font-bold border-[#0EA5E9]"
              : "text-muted-foreground hover:text-foreground border-border hover:bg-muted"
          }
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(pageNumber);
          }}
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );

    lastPageNumber = pageNumber;
  });

  return (
    <div>
      {/* Results count header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
        <p className="text-muted-foreground text-sm">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {(page - 1) * limit + 1}-{Math.min(page * limit, pagination.total)}
          </span>{" "}
          of <span className="font-semibold text-[#0EA5E9]">{pagination.total}</span> vehicles
        </p>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <Pagination className="mt-12">
          <PaginationContent className="gap-2">
            <PaginationItem>
              <PaginationPrevious
                href={getPaginationUrl(page - 1)}
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) {
                    handlePageChange(page - 1);
                  }
                }}
                className={`border-border text-muted-foreground hover:text-foreground ${
                  page <= 1 ? "pointer-events-none opacity-40" : ""
                }`}
              />
            </PaginationItem>

            {paginationItems}

            <PaginationItem>
              <PaginationNext
                href={getPaginationUrl(page + 1)}
                onClick={(e) => {
                  e.preventDefault();
                  if (page < pagination.pages) {
                    handlePageChange(page + 1);
                  }
                }}
                className={`border-border text-muted-foreground hover:text-foreground ${
                  page >= pagination.pages ? "pointer-events-none opacity-40" : ""
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
