import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Nodemailer from "next-auth/providers/nodemailer";
import { prisma } from "@/prisma";
import { getUserByEmail } from "@/services/user";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      isPasswordSet: boolean;
      isChief: boolean;
      company: {
        id: string;
        name: string;
        users: User[];
      };
    };
  }
}

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
            !bcrypt.compareSync(
              credentials.password as string,
              user.password as string
            )
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
  callbacks: {
    async jwt({ token }: any) {
      const user = await prisma.user.findUnique({
        where: { email: token.email },
        include: { company: true },
      });
      if (user) {
        const { id, company, isPasswordSet, isChief } = user;
        Object.assign(token, {
          id,
          isPasswordSet,
          isChief,
          company,
        });
      }
      return token;
    },
    async session({ session, token }: any) {
      const { id, company, isPasswordSet, isChief } = token;
      Object.assign(session.user, {
        id,
        isPasswordSet,
        isChief,
        company,
      });
      return session;
    },
  },
});
