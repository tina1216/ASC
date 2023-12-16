import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";

const prisma = new PrismaClient();

export default NuxtAuthHandler({
  pages: {
    signIn: "/login",
  },
  secret: "secret",
  callbacks: {
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user ? (user as any).access_token || "" : "";
        token.id = user ? user.id || "" : "";
        token.role = user ? (user as any).role || "" : "";
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      (session as any).role = token.role;
      (session as any).uid = token.id;
      return Promise.resolve(session);
    },
  },

  providers: [
    CredentialsProvider.default({
      name: "Credentials",

      async authorize(credentials: any) {
        const body = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const user = await $fetch("/api/auth/me", {
          method: "POST",
          body: body,
        });

        if (!user) return null;

        return user;
      },
    }),
  ],
});
