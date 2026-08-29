"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { Calendar, Car, Clock, User, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formatTime = (timeString) => {
  try {
    return format(parseISO(`2022-01-01T${timeString}`), "h:mm a");
  } catch (error) {
    return timeString;
  }
};

const getStatusBadge = (status) => {
  switch (status) {
    case "PENDING":
      return <Badge className="bg-amber-500/15 text-amber-500 border border-amber-500/30 font-semibold">Pending</Badge>;
    case "CONFIRMED":
      return <Badge className="bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 font-semibold">Confirmed</Badge>;
    case "COMPLETED":
      return <Badge className="bg-[#0EA5E9]/15 text-[#0EA5E9] border border-[#0EA5E9]/30 font-semibold">Completed</Badge>;
    case "CANCELLED":
      return <Badge className="bg-gray-500/15 text-muted-foreground border border-border font-semibold">Cancelled</Badge>;
    case "NO_SHOW":
      return <Badge className="bg-red-500/15 text-red-500 border border-red-500/30 font-semibold">No Show</Badge>;
    default:
      return <Badge variant="outline" className="border-border text-foreground">{status}</Badge>;
  }
};

export function TestDriveCard({
  booking,
  onCancel,
  showActions = true,
  isPast = false,
  isAdmin = false,
  isCancelling = false,
  renderStatusSelector = () => null,
}) {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const handleCancel = async () => {
    if (!onCancel) return;
    await onCancel(booking.id);
    setCancelDialogOpen(false);
  };

  return (
    <>
      <Card
        className={`glass-card overflow-hidden border-border bg-card text-card-foreground shadow-sm transition-colors duration-300 ${
          isPast ? "opacity-75 hover:opacity-100 transition-opacity" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Car Image - Left */}
          <div className="sm:w-1/3 relative h-48 sm:h-auto bg-muted">
            {booking.car.images && booking.car.images.length > 0 ? (
              <div className="relative w-full h-full">
                <Image
                  src={booking.car.images[0]}
                  alt={`${booking.car.make} ${booking.car.model}`}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Car className="h-12 w-12 text-muted-foreground/40" />
              </div>
            )}
            <div className="absolute top-3 right-3 sm:hidden">
              {getStatusBadge(booking.status)}
            </div>
          </div>

          {/* Booking Details - Middle */}
          <div className="p-5 sm:w-1/2 sm:flex-1">
            <div className="hidden sm:block mb-2">
              {getStatusBadge(booking.status)}
            </div>

            <h3 className="text-xl font-bold text-foreground mb-1">
              {booking.car.year} {booking.car.make} {booking.car.model}
            </h3>
            {renderStatusSelector()}

            <div className="space-y-2 my-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-[#0EA5E9]" />
                {format(new Date(booking.bookingDate), "EEEE, MMMM d, yyyy")}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-[#0EA5E9]" />
                {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
              </div>

              {isAdmin && booking.user && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-[#0EA5E9]" />
                  {booking.user.name || booking.user.email}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons - Right */}
          {showActions && (
            <div className="p-5 border-t sm:border-t-0 sm:border-l border-border sm:w-1/3 sm:flex sm:flex-col sm:justify-center sm:items-center sm:space-y-3 bg-muted/20">
              {booking.notes && (
                <div className="bg-muted p-3 rounded-xl border border-border text-xs w-full mb-2">
                  <p className="font-semibold text-[#0EA5E9]">Notes:</p>
                  <p className="text-muted-foreground mt-0.5">{booking.notes}</p>
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                className="w-full border-border text-foreground hover:bg-muted rounded-xl text-xs font-semibold"
                asChild
              >
                <Link
                  href={`/cars/${booking.carId}`}
                  className="flex items-center justify-center gap-1.5"
                >
                  <span>View Car</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
              {(booking.status === "PENDING" ||
                booking.status === "CONFIRMED") && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full rounded-xl text-xs font-semibold bg-red-500/15 text-red-500 hover:bg-red-500/25 border border-red-500/30"
                  onClick={() => setCancelDialogOpen(true)}
                  disabled={isCancelling}
                >
                  {isCancelling ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    "Cancel Reservation"
                  )}
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Cancel Confirmation Dialog */}
      {onCancel && (
        <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <DialogContent className="bg-card border border-border text-card-foreground sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-foreground">Cancel Test Drive</DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">
                Are you sure you want to cancel your test drive for the{" "}
                <span className="text-[#0EA5E9] font-semibold">
                  {booking.car.year} {booking.car.make} {booking.car.model}
                </span>?
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="space-y-2 text-sm bg-muted/40 p-4 rounded-xl border border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-semibold text-foreground">
                    {format(
                      new Date(booking.bookingDate),
                      "EEEE, MMMM d, yyyy"
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-semibold text-foreground">
                    {formatTime(booking.startTime)} -{" "}
                    {formatTime(booking.endTime)}
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setCancelDialogOpen(false)}
                disabled={isCancelling}
                className="border-border text-foreground hover:bg-muted rounded-xl"
              >
                Keep Reservation
              </Button>
              <Button
                variant="destructive"
                onClick={handleCancel}
                disabled={isCancelling}
                className="bg-red-500 text-white hover:bg-red-600 rounded-xl"
              >
                {isCancelling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  "Confirm Cancel"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
