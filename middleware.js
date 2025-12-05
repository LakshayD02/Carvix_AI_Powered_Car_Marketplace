import { authMiddleware } from "@clerk/nextjs";
import arcjet, { detectBot, shield } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
  ],
});

// Lightweight Clerk function
const clerk = authMiddleware({
  publicRoutes: [
    "/",
    "/login(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/public(.*)",
  ],
});

export default async function middleware(req) {
  // Run ArcJet first
  const res = await aj(req);
  if (res) return res;

  // Then run Clerk
  return clerk(req);
}

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|css|js)).*)",
  ],
};
