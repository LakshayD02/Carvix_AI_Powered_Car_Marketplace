import { createMiddleware, shield, detectBot } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Match protected routes
const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/saved-cars(.*)",
  "/reservations(.*)",
]);

// Arcjet configuration
const arcjetMiddleware = createMiddleware(
  shield({ mode: "LIVE" }),
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE"],
  })
);

// Clerk auth middleware
const clerk = clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }
  return NextResponse.next();
});

// Combined middleware
export default createMiddleware(arcjetMiddleware, clerk);

// Matcher config
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
