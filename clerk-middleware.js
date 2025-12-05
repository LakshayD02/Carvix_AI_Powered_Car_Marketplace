// clerk-middleware.js — Clerk ONLY

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/login(.*)",
    "/api/public(.*)",
    "/favicon.ico",
  ],
});

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|css|js)).*)",
  ],
};
