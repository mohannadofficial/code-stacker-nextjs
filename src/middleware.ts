import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtecRoute = createRouteMatcher([
  "/ask-question",
  "/profile",
  "/collection",
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
