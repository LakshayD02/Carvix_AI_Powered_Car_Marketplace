// middleware.js — ArcJet ONLY

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

// ArcJet runs here
export default async function middleware(req) {
  const result = await aj(req);
  return result; // If ArcJet blocks, this returns a response
}

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|css|js)).*)",
  ],
};
