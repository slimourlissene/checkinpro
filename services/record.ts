"use server";
import { auth } from "@/app/auth";
import { prisma } from "@/prisma";
import { isUserInCompany } from "@/utils/company/isUserInCompany";
import { Record } from "@prisma/client";
import jwt from "jsonwebtoken";

export async function getRecordsByCheckin({
  checkinSessionId,
}: {
  checkinSessionId: string;
}): Promise<Record[]> {
  try {
    const session = await auth();
    if (session?.user === undefined) throw new Error(`User not authenticated`);
    const company = await prisma.company.findUnique({
      where: {
        ownerId: session.user.id,
      },
    });
    if (!company)
      throw new Error(`Company not found, id provided : ${session.user.id}`);

    return await prisma.record.findMany({
      where: {
        checkinSessionId,
      },
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to get records by company`, {
      cause: error,
    });
  }
}

export async function createRecord({ token }: { token: string }) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("User not authenticated");

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("JWT_SECRET is not defined in environment variables");
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
      throw new Error(
        `Checkin session not found, provided ID: ${checkinSessionId}`
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
      throw new Error(
        `Company not found, provided ID: ${checkinSession.checkin.companyId}`
      );
    isUserInCompany({ company });
    const existingRecord = await prisma.record.findFirst({
      where: {
        checkinSessionId: checkinSessionId,
        userId: session.user.id,
      },
    });
    if (existingRecord) {
      throw new Error("You have already checked in for this session");
    }

    return await prisma.record.create({
      data: {
        checkinSessionId: checkinSessionId,
        userId: session.user.id,
      },
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error("Failed to process checkin", {
      cause: error,
    });
  }
}
