import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

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

// Clerk lightweight auth middleware
const clerk = authMiddleware({
  publicRoutes: [
    "/",
    "/api/public(.*)",
    "/login(.*)",
    "/signup(.*)",
  ],
});

export default createMiddleware(aj, clerk);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
