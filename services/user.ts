"use server";
import { prisma } from "@/prisma";
import { saltAndHashPasword } from "@/utils/auth/password";
import {
  ActionError,
  safeAction,
  safeAuthenticatedAction,
} from "@/lib/safe-actions";
import { z } from "zod";

export const getUserByEmail = safeAction
  .schema(z.object({ email: z.string() }))
  .action(async ({ parsedInput: { email } }) => {
    try {
      const user = await prisma.user.findFirst({
        where: { email },
      });
      if (!user) {
        throw new ActionError(
          `Utilisateur non trouvé, email fourni : ${email}`
        );
      }
      return user;
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError("Erreur lors de la récupération de l'utilisateur", {
        cause: error,
      });
    }
  });

export const modifyUser = safeAuthenticatedAction
  .schema(
    z.object({
      email: z.string(),
      data: z.object({
        email: z.string().optional(),
        firstname: z.string().optional(),
        lastname: z.string().optional(),
        isPasswordSet: z.boolean().optional(),
      }),
    })
  )
  .action(async ({ parsedInput: { email, data } }) => {
    try {
      return await prisma.user.update({
        where: { email },
        data,
      });
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError("Erreur lors de la modification de l'utilisateur", {
        cause: error,
      });
    }
  });

export const deleteUser = safeAuthenticatedAction
  .schema(z.object({ email: z.string() }))
  .action(async ({ parsedInput: { email } }) => {
    try {
      return await prisma.user.delete({
        where: { email },
      });
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError("Erreur lors de la suppression de l'utilisateur", {
        cause: error,
      });
    }
  });

export const resetPassword = safeAuthenticatedAction
  .schema(
    z.object({
      email: z.string(),
      password: z.string(),
    })
  )
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const hashedPassword = await saltAndHashPasword({ password });
      return await prisma.user.update({
        where: { email },
        data: { password: hashedPassword, isPasswordSet: true },
      });
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError(
        "Erreur lors de la réinitialisation du mot de passe",
        {
          cause: error,
        }
      );
    }
  });
