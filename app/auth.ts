import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Nodemailer from "next-auth/providers/nodemailer";
import { prisma } from "@/prisma";
import { Company, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { createTransport } from "nodemailer";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstname: string;
      lastname: string;
      password: string;
      email: string;
      emailVerified: Date;
      isPasswordSet: boolean;
      isChief: boolean;
      companyId: string;
      createdAt: Date;
      updatedAt: Date;
      company: Company & { user: User[] };
    };
  }
}

export async function sendVerificationRequest(params: any) {
  try {
    const { identifier, url, provider } = params;
    const transport = createTransport(provider.server);
    const result = await transport.sendMail({
      to: identifier,
      from: "Slim de CheckInPro <contact@checkinpro.fr>",
      subject: "Définissez votre mot de passe sur CheckInPro",
      text: `Pour définir votre mot de passe, cliquez sur le lien suivant : ${url}`,
      html: `<p>Pour définir votre mot de passe, cliquez sur le lien suivant : <a href="${url}">${url}</a></p>`,
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error("Erreur lors de l'envoi du mail de vérification");
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
      sendVerificationRequest,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const user: User | null = await prisma.user.findUnique({
            where: { email: credentials.email as string },
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
