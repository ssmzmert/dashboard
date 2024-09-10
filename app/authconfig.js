import { getToken } from "next-auth/jwt"; // Import this to get token from the request

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth, request }) => {
      const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
      });

      const isLoggedIn = auth?.user;
      const isOnDashboardRoot = request.nextUrl.pathname === "/dashboard";
      const isOnDashboardSubPage =
        request.nextUrl.pathname.startsWith("/dashboard/");

      // Allow access to /dashboard for all logged-in users
      if (isOnDashboardRoot) {
        return isLoggedIn; // Allow access to /dashboard if logged in
      }

      // If the user is trying to access /dashboard/*, restrict non-admin users
      if (isOnDashboardSubPage) {
        if (isLoggedIn && token.isAdmin) {
          return true; // Allow access for admins
        }
        // Redirect non-admin users to /dashboard
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      // Handle other pages
      if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl)); // Redirect logged-in users to dashboard
      }

      return true; // Allow access to non-restricted pages if not logged in
    },
  },
};
