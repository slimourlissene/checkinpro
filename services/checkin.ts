"use server";
import { prisma } from "@/prisma";
import { isCompanyOwnedByUser } from "@/utils/company/isCompanyOwnedByUser";
import { isUserInCompany } from "@/utils/company/isUserInCompany";
import { Company } from "@prisma/client";
import QRCode from "qrcode";
import jwt from "jsonwebtoken";
import {
  ActionError,
  safeAction,
  safeAuthenticatedAction,
} from "@/lib/safe-actions";
import { z } from "zod";

export const getCheckinsByCompany = safeAuthenticatedAction.action(
  async ({ ctx: { user } }) => {
    try {
      const company: Company | null = await prisma.company.findUnique({
        where: {
          id: user.company.id,
        },
        include: {
          users: true,
        },
      });

      if (!company)
        throw new ActionError(
          `La société n'a pas été trouvée, id fourni : ${user.company.id}`
        );

      isCompanyOwnedByUser({ companyOwnerId: company.ownerId });

      return await prisma.checkin.findMany({
        where: {
          companyId: user.company.id,
        },
        include: {
          company: {
            include: {
              users: true,
            },
          },
          sessions: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              records: {
                include: {
                  user: {
                    omit: {
                      password: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError(
        `Impossible de récupérer les émargements par société`,
        {
          cause: error,
        }
      );
    }
  }
);

export const getCheckinById = safeAction
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const checkin = await prisma.checkin.findUnique({
        where: {
          id,
        },
      });
      if (!checkin)
        throw new ActionError(
          `L'émargement n'a pas été trouvé, id fourni : ${id}`
        );

      const company = await prisma.company.findUnique({
        where: {
          id: checkin.companyId,
        },
        include: {
          users: true,
        },
      });
      if (!company)
        throw new ActionError(
          `La société n'a pas été trouvée, id fourni : ${checkin.companyId}`
        );

      isUserInCompany({ company });
      return checkin;
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError(`Impossible de récupérer l'émargement par ID`, {
        cause: error,
      });
    }
  });

export const createCheckin = safeAuthenticatedAction
  .schema(
    z.object({
      name: z.string(),
      activeDays: z.array(z.string()),
    })
  )
  .action(async ({ parsedInput: { name, activeDays }, ctx: { user } }) => {
    try {
      const company = await prisma.company.findUnique({
        where: {
          id: user.company.id,
        },
        include: {
          users: true,
        },
      });

      if (!company)
        throw new ActionError(
          `La société n'a pas été trouvée, id fourni : ${user.company.id}`
        );

      isCompanyOwnedByUser({ companyOwnerId: company.ownerId });

      return await prisma.checkin.create({
        data: {
          name,
          activeDays,
          company: {
            connect: {
              id: user.company.id,
            },
          },
        },
      });
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError(`Impossible de créer l'émargement`, {
        cause: error,
      });
    }
  });

export const launchCheckin = safeAction
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const checkin = await prisma.checkin.findUnique({
        where: {
          id,
        },
        include: {
          company: true,
        },
      });
      if (!checkin)
        throw new ActionError(
          `L'émargement n'a pas été trouvé, id fourni : ${id}`
        );

      isCompanyOwnedByUser({ companyOwnerId: checkin.company.ownerId });

      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      let checkinSession = await prisma.checkinSession.findFirst({
        where: {
          checkinId: checkin.id,
          createdAt: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
      });

      if (!checkinSession) {
        checkinSession = await prisma.checkinSession.create({
          data: {
            checkinId: checkin.id,
          },
        });
      }

      const tokenPayload = {
        sessionId: checkinSession.id,
        checkinId: checkin.id,
      };

      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) {
        throw new ActionError(
          "JWT_SECRET n'est pas défini dans les variables d'environnement"
        );
      }

      const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "24h" });

      return await QRCode.toDataURL(token, {
        errorCorrectionLevel: "H",
        width: 300,
      });
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError(`Impossible de lancer l'émargement`, {
        cause: error,
      });
    }
  });

export const updateCheckin = safeAction
  .schema(
    z.object({
      id: z.string(),
      activeDays: z.array(z.string()),
    })
  )
  .action(async ({ parsedInput: { id, activeDays } }) => {
    try {
      const checkin = await prisma.checkin.findUnique({
        where: {
          id,
        },
      });
      if (!checkin)
        throw new ActionError(
          `L'émargement n'a pas été trouvé, id fourni : ${id}`
        );

      const company = await prisma.company.findUnique({
        where: {
          id: checkin.companyId,
        },
        include: {
          users: true,
        },
      });
      if (!company)
        throw new ActionError(
          `La société n'a pas été trouvée, id fourni : ${checkin.companyId}`
        );

      isUserInCompany({ company });
      return await prisma.checkin.update({
        where: {
          id: checkin.id,
        },
        data: {
          activeDays,
        },
      });
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError(`Impossible de mettre à jour l'émargement`, {
        cause: error,
      });
    }
  });

export const deleteCheckin = safeAction
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const company = await prisma.company.findUnique({
        where: {
          id: id,
        },
        include: {
          users: true,
        },
      });
      if (!company)
        throw new ActionError(
          `La société n'a pas été trouvée, id fourni : ${id}`
        );

      isCompanyOwnedByUser({ companyOwnerId: company.ownerId });
      return await prisma.checkin.delete({
        where: {
          id: id,
        },
      });
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError(`Impossible de supprimer l'émargement`, {
        cause: error,
      });
    }
  });
