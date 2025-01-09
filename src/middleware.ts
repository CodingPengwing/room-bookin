import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ token, req }) {
      if (!token) {
        return false;
      }
      // Only allow admin users to access /users
      if (
        req.nextUrl.pathname.startsWith("/users") &&
        token?.role !== "ADMIN"
      ) {
        return false;
      }
      return true;
    },
  },
});

export const config = {
  matcher: ["/:path*"],
  missing: "/login",
};
