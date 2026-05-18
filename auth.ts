import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

if (
  process.env.NODE_ENV === "production" &&
  !process.env.AUTH_SECRET &&
  process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD
) {
  throw new Error(
    "AUTH_SECRET is required in production. Set it in your environment variables."
  );
}

export const { handlers, auth } = NextAuth({
  providers: [GitHub, Google],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    // Users land back on the homepage; the dropdown will reflect the new session.
    signIn: "/",
  },
});
