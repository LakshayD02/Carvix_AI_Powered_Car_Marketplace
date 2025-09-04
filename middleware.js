import { NextResponse } from "next/server";
import { createMiddleware, detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Match protected routes
const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/saved-cars(.*)",
  "/reservations(.*)",
]);

// Arcjet middleware (rules only)
const arcjet = createMiddleware(
  shield({ mode: "LIVE" }),
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE"],
  })
);

// Clerk middleware with auth check
const clerk = clerkMiddleware(async (auth, req) => {
  const authResult = await auth();
  if (!authResult.userId && isProtectedRoute(req)) {
    const redirect = await authResult.redirectToSignIn();
    return redirect;
  }

  return NextResponse.next();
});

// Compose middleware
export default createMiddleware(arcjet, clerk);

// Apply to relevant paths only
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
