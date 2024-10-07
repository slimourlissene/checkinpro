import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/prisma";
import { saltAndHashPasword } from "@/utils/password";
import { UsersActions } from "@/services/users";
import { users } from "@prisma/client";

const usersActions = new UsersActions();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<users | null> => {
        let user: users | null = null;
        const hashedPassword = saltAndHashPasword({
          password: credentials.password as string,
        });

        user = await usersActions.getUserByEmail({
          email: credentials.email as string,
        });

        if (!user || user.password !== hashedPassword) {
          throw new Error("User not found or password is incorrect");
        }

        return user;
      },
    }),
  ],
});
