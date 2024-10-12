import NextAuth from "next-auth"

import { db } from "./src/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session  }) {
      if(token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token }) {
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt"},
  ...authConfig,
})