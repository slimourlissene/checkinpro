"use server";
import { auth } from "@/app/auth";
import { prisma } from "@/prisma";
import { isUserInCompany } from "@/utils/company/isUserInCompany";
import { Record } from "@prisma/client";

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

export async function createRecord({
  checkinSessionId,
}: {
  checkinSessionId: string;
}) {
  try {
    const session = await auth();
    if (session?.user === undefined) throw new Error(`User not authenticated`);

    const checkinSession = await prisma.checkin.findUnique({
      where: {
        id: checkinSessionId,
      },
    });
    if (!checkinSession)
      throw new Error(
        `Checkin session not found, id provided : ${checkinSessionId}`
      );

    const company = await prisma.company.findUnique({
      where: {
        id: checkinSession.companyId,
      },
      include: {
        users: true,
      },
    });
    if (!company)
      throw new Error(
        `Company not found, id provided : ${checkinSession.companyId}`
      );
    isUserInCompany({ company });
    return await prisma.record.create({
      data: {
        checkinSessionId,
        userId: session.user.id,
      },
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to create record`, {
      cause: error,
    });
  }
}
