import { authSession } from "~/auth";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";

// export { authSession as middleware } from "~/auth";

export default authSession(async function middleware(req) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // console.log("***Middleware***", req.auth);

  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);

  // const isAdminRoute = nextUrl.pathname.startsWith(adminPrefix);
  // const isAdmin = req.auth?.user.role === "ADMIN";

  if (isApiAuthRoutes) {
    if (isLoggedIn)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    return undefined;
  }

  if (isAuthRoutes) {
    if (isLoggedIn)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    return undefined;
  }
  if (!isLoggedIn && !isPublicRoutes) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // if (isAdminRoute) {
  //   if (!isAdmin) return new Response("Not found", { status: 404 });
  // }

  return undefined;
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
