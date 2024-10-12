import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/prisma";
import { getUserByEmail } from "@/services/users";
import { users } from "@prisma/client";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<users | null> => {
        try {
          let user: users | null = null;
          user = await getUserByEmail({
            email: credentials.email as string,
          });

          if (
            !user ||
            !bcrypt.compareSync(credentials.password as string, user.password)
          ) {
            throw new Error("User not found or password is incorrect");
          }

          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
});
