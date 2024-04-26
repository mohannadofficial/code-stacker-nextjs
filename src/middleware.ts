import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtecRoute = createRouteMatcher([
  "/",
  "/api/webhook",
  "/question/:id",
  "/tags",
  "/tags/:id",
  "/profile/:id",
  "/community",
  "/jobs",
]);

export default clerkMiddleware(
  (auth, req) => {
    if (isProtecRoute(req)) auth().protect();
  },
  { afterSignInUrl: "/", afterSignUpUrl: "/" },
);

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
