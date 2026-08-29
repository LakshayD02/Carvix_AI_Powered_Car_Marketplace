import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/saved-cars(.*)",
  "/reservations(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // Redirect to sign-in if the route is protected and user is not logged in
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, but process HTML, API, and JSON routes
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

