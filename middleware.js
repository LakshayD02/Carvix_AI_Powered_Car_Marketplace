import { authMiddleware } from "@clerk/nextjs";
import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";

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

// Clerk lightweight middleware
const clerk = authMiddleware({
  publicRoutes: [
    "/",
    "/login(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/public(.*)",
  ],
});

export default createMiddleware(aj, clerk);

export const config = {
  matcher: [
    // Only run middleware where absolutely needed
    "/((?!_next|static|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|css|js)).*)",
  ],
};
