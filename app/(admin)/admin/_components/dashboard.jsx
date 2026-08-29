"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Car,
  Calendar,
  TrendingUp,
  Info,
  CheckCircle,
  Clock,
  XCircle,
  Star,
  DollarSign,
  Sparkles,
} from "lucide-react";

export function Dashboard({ initialData }) {
  const [activeTab, setActiveTab] = useState("overview");

  // Show error if data fetch failed
  if (!initialData || !initialData.success) {
    return (
      <Alert className="bg-red-500/10 border-red-500/30 text-red-400">
        <Info className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {initialData?.error || "Failed to load dashboard data"}
        </AlertDescription>
      </Alert>
    );
  }

  const { cars, testDrives } = initialData.data;

  return (
    <div className="space-y-8 bg-background min-h-screen text-foreground transition-colors duration-300">
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="bg-muted border border-border p-1 rounded-xl">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-[#0EA5E9] data-[state=active]:text-white text-muted-foreground rounded-lg px-5 py-2 font-semibold text-sm transition-all"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="test-drives"
            className="data-[state=active]:bg-[#0EA5E9] data-[state=active]:text-white text-muted-foreground rounded-lg px-5 py-2 font-semibold text-sm transition-all"
          >
            Test Drives
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* KPI Summary Cards */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <Card className="glass-card border-border bg-card/90 text-card-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Cars
                </CardTitle>
                <div className="p-2 rounded-lg bg-[#0EA5E9]/10 text-[#0EA5E9]">
                  <Car className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-foreground">{cars.total}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-emerald-500 font-semibold">{cars.available}</span> available • <span className="text-[#0EA5E9] font-semibold">{cars.sold}</span> sold
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border bg-card/90 text-card-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Test Drives
                </CardTitle>
                <div className="p-2 rounded-lg bg-[#818CF8]/10 text-[#818CF8]">
                  <Calendar className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-foreground">{testDrives.total}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-amber-500 font-semibold">{testDrives.pending}</span> pending • <span className="text-emerald-500 font-semibold">{testDrives.confirmed}</span> confirmed
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border bg-card/90 text-card-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Conversion Rate
                </CardTitle>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-emerald-500">
                  {testDrives.conversionRate}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  From test drives to sales
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border bg-card/90 text-card-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Cars Sold
                </CardTitle>
                <div className="p-2 rounded-lg bg-[#0EA5E9]/10 text-[#0EA5E9]">
                  <DollarSign className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-foreground">{cars.sold}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((cars.sold / (cars.total || 1)) * 100).toFixed(1)}% of inventory
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Dealership Summary Card */}
          <Card className="glass-card border-border bg-card/90 text-card-foreground">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#0EA5E9]" />
                Dealership Analytics Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-muted/50 p-5 rounded-2xl border border-border">
                    <h3 className="font-semibold text-sm mb-3 text-foreground">Car Inventory Utilization</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] h-full rounded-full"
                          style={{
                            width: `${(cars.available / (cars.total || 1)) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-[#0EA5E9]">
                        {((cars.available / (cars.total || 1)) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Available inventory capacity
                    </p>
                  </div>

                  <div className="bg-muted/50 p-5 rounded-2xl border border-border">
                    <h3 className="font-semibold text-sm mb-3 text-foreground">
                      Test Drive Completion
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#818CF8] to-[#6366F1] h-full rounded-full"
                          style={{
                            width: `${
                              (testDrives.completed / (testDrives.total || 1)) * 100
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-[#818CF8]">
                        {(
                          (testDrives.completed / (testDrives.total || 1)) * 100
                        ).toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Completed test drives ratio
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="text-center p-4 bg-muted/40 rounded-xl border border-border">
                    <span className="text-3xl font-extrabold text-[#0EA5E9]">
                      {cars.sold}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">Cars Sold</p>
                  </div>
                  <div className="text-center p-4 bg-muted/40 rounded-xl border border-border">
                    <span className="text-3xl font-extrabold text-amber-500">
                      {testDrives.pending + testDrives.confirmed}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">
                      Upcoming Test Drives
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted/40 rounded-xl border border-border">
                    <span className="text-3xl font-extrabold text-emerald-500">
                      {((cars.available / (cars.total || 1)) * 100).toFixed(0)}%
                    </span>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">
                      Inventory Rate
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Test Drives Tab */}
        <TabsContent value="test-drives" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card className="glass-card border-border bg-card/90 text-card-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{testDrives.total}</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-border bg-card/90 text-card-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-amber-500">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">{testDrives.pending}</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-border bg-card/90 text-card-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-emerald-500">Confirmed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-500">{testDrives.confirmed}</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-border bg-card/90 text-card-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-[#0EA5E9]">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0EA5E9]">{testDrives.completed}</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-border bg-card/90 text-card-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-red-500">Cancelled</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">{testDrives.cancelled}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
