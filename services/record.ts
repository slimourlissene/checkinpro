"use server";
import { prisma } from "@/prisma";
import { isUserInCompany } from "@/utils/company/isUserInCompany";
import jwt from "jsonwebtoken";
import { ActionError, safeAuthenticatedAction } from "@/lib/safe-actions";
import { z } from "zod";

export const getRecordsByCheckin = safeAuthenticatedAction
  .schema(z.object({ checkinSessionId: z.string() }))
  .action(async ({ parsedInput: { checkinSessionId }, ctx: { user } }) => {
    try {
      const company = await prisma.company.findUnique({
        where: {
          ownerId: user.id,
        },
      });
      if (!company)
        throw new ActionError(`Société non trouvée, id fourni : ${user.id}`);

      return await prisma.record.findMany({
        where: {
          checkinSessionId,
        },
      });
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError(
        `Erreur lors de la récupération des enregistrements`,
        {
          cause: error,
        }
      );
    }
  });

export const createRecord = safeAuthenticatedAction
  .schema(z.object({ token: z.string() }))
  .action(async ({ parsedInput: { token }, ctx: { user } }) => {
    try {
      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) {
        throw new ActionError(
          "JWT_SECRET introuvable, veuillez contacter l'administrateur"
        );
      }

      const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
      const { sessionId: checkinSessionId } = decoded;

      const checkinSession = await prisma.checkinSession.findUnique({
        where: {
          id: checkinSessionId,
        },
        include: {
          checkin: true,
        },
      });
      if (!checkinSession)
        throw new ActionError(
          `Session d'émargement non trouvée, id fourni : ${checkinSessionId}`
        );

      const company = await prisma.company.findUnique({
        where: {
          id: checkinSession.checkin.companyId,
        },
        include: {
          users: true,
        },
      });
      if (!company)
        throw new ActionError(
          `La société n'a pas été trouvée, id fourni : ${checkinSession.checkin.companyId}`
        );

      isUserInCompany({ company });

      const existingRecord = await prisma.record.findFirst({
        where: {
          checkinSessionId: checkinSessionId,
          userId: user.id,
        },
      });
      if (existingRecord) {
        throw new ActionError("Vous avez déjà émargé pour cette session");
      }

      return await prisma.record.create({
        data: {
          checkinSessionId: checkinSessionId,
          userId: user.id,
        },
      });
    } catch (error: any) {
      console.error(error);
      throw new ActionError(error);
    }
  });
