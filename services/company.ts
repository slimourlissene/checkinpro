"use server";
import {
  ActionError,
  safeAction,
  safeAuthenticatedAction,
} from "@/lib/safe-actions";
import { prisma } from "@/prisma";
import { isCompanyOwnedByUser } from "@/utils/company/isCompanyOwnedByUser";
import { isUserInCompany } from "@/utils/company/isUserInCompany";
import { validateCompanyAndUser } from "@/utils/company/validateCompanyAndUser";
import { User } from "@prisma/client";
import { z } from "zod";

export const getCompanyById = safeAction
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const company = await prisma.company.findUnique({
        where: { id },
        include: { users: true },
      });

      if (!company) {
        throw new ActionError(
          `La société n'a pas été trouvée, id fourni : ${id}`
        );
      }

      isUserInCompany({ company });
      return company;
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError(`Impossible de récupérer la société`, {
        cause: error,
      });
    }
  });

export const createCompany = safeAuthenticatedAction
  .schema(z.object({ name: z.string() }))
  .action(async ({ parsedInput: { name }, ctx: { user } }) => {
    try {
      const owner: User | null = await prisma.user.findFirst({
        where: { email: user.email },
      });

      if (owner === null) {
        throw new ActionError(`User not found, email provided : ${user.email}`);
      }

      return await prisma.company.create({
        data: {
          name,
          ownerId: owner.id,
          users: {
            connect: {
              id: owner.id,
            },
          },
        },
      });
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError(`Failed to create company`, {
        cause: error,
      });
    }
  });

export const addUsersToCompany = safeAuthenticatedAction
  .schema(
    z.object({
      id: z.string(),
      users: z.array(
        z.object({
          email: z.string(),
          firstname: z.string(),
          lastname: z.string(),
        })
      ),
    })
  )
  .action(async ({ parsedInput: { id, users } }) => {
    try {
      const company = await prisma.company.findUnique({
        where: { id },
      });

      if (!company) {
        throw new ActionError(
          `La société n'a pas été trouvée, id fourni : ${id}`
        );
      }

      isCompanyOwnedByUser({ companyOwnerId: company.ownerId });

      return await prisma.company.update({
        where: { id },
        data: {
          users: {
            connectOrCreate: users.map((user) => ({
              where: { email: user.email },
              create: {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
              },
            })),
          },
        },
      });
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError(`Erreur lors de l'ajout d'utilisateurs`, {
        cause: error,
      });
    }
  });

export const deleteUsersFromCompany = safeAuthenticatedAction
  .schema(z.object({ emails: z.array(z.string()) }))
  .action(async ({ parsedInput: { emails }, ctx: { user } }) => {
    try {
      const id = user.company.id;
      const company = await prisma.company.findUnique({
        where: { id },
        include: {
          users: true,
        },
      });

      if (!company) {
        throw new ActionError(
          `La société n'a pas été trouvée, id fourni : ${id}`
        );
      }

      isCompanyOwnedByUser({ companyOwnerId: company.ownerId });

      for (const email of emails) {
        validateCompanyAndUser({ company, email });
        await prisma.company.update({
          where: { id },
          data: {
            users: {
              delete: {
                email,
              },
            },
          },
        });
      }
      return company;
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError(`Erreur lors de la suppression d'utilisateurs`, {
        cause: error,
      });
    }
  });
