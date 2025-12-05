import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/public(.*)",
  ],
});

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|css|js)).*)",
  ],
};
