import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "./auth.config"
import { db } from "./lib/db";
import { getAccountByUserId, getUserById } from "@/features/auth/actions";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
  
  callbacks: {
    // 1. SIGN IN CALLBACK
    // The PrismaAdapter automatically creates the User and Account in MongoDB.
    // We only need this callback if we want to block certain users from logging in.
    async signIn({ user, account, profile }) {
      if (!user || !account) return false;
      
      // Allow the sign-in to proceed. PrismaAdapter takes over from here!
      return true; 
    },

    // 2. JWT CALLBACK
    // This runs whenever a JSON Web Token is created or updated.
    async jwt({ token }) {
      if (!token.sub) return token;
      
      // Fetch the latest user data from the database
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      // Pass database values to the token
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role; 

      return token;
    },

    // 3. SESSION CALLBACK
    // This runs whenever useSession() or auth() is called in your app.
    async session({ session, token }) {
      // Attach the custom data from the JWT to the actual session object
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      } 

      return session;
    },
  },
})