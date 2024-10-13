import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Nodemailer from "next-auth/providers/nodemailer";
import { prisma } from "@/prisma";
import { getUserByEmail } from "@/services/users";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const user: User | null = await getUserByEmail({
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
