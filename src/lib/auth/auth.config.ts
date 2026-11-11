import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    newUser: "/onboarding",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnboarding = nextUrl.pathname.startsWith("/onboarding");

      if (isDashboard || isOnboarding) {
        return isLoggedIn;
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [],
  trustHost: true,
};
