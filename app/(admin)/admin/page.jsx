import { getDashboardData } from "@/actions/admin";
import { Dashboard } from "./_components/dashboard";
import arcjet, { detectBot, shield } from "@arcjet/next";

export const metadata = {
  title: "Dashboard | Carvix Admin",
  description: "Admin dashboard for Carvix car marketplace",
};

export default async function AdminDashboardPage() {
  // Initialize ArcJet
  const aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
      shield({ mode: "LIVE" }),
      detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE"], // Allow search engines
      }),
    ],
  });

  // Run ArcJet check
  const req = new Request("https://example.com"); // Can use real request if needed
  const result = await aj(req);

  if (result?.isBlocked()) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-6">
          Access Denied — Bot Detected
        </h1>
        <p>Your request was blocked by ArcJet.</p>
      </div>
    );
  }

  // Fetch dashboard data only if not blocked
  const dashboardData = await getDashboardData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Dashboard initialData={dashboardData} />
    </div>
  );
}
