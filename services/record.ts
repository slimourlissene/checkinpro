"use server";
import { auth } from "@/app/auth";
import { prisma } from "@/prisma";
import { isUserInCompany } from "@/utils/company/isUserInCompany";
import { Record } from "@prisma/client";

export async function getRecordsByCheckin({
  checkinId,
}: {
  checkinId: string;
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
        checkinId,
      },
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to get records by company`, {
      cause: error,
    });
  }
}

export async function createRecord({ checkinId }: { checkinId: string }) {
  try {
    const session = await auth();
    if (session?.user === undefined) throw new Error(`User not authenticated`);

    const checkin = await prisma.checkin.findUnique({
      where: {
        id: checkinId,
      },
    });
    if (!checkin)
      throw new Error(`Checkin not found, id provided : ${checkinId}`);

    const company = await prisma.company.findUnique({
      where: {
        id: checkin.companyId,
      },
      include: {
        users: true,
      },
    });
    if (!company)
      throw new Error(`Company not found, id provided : ${checkin.companyId}`);
    isUserInCompany({ company });

    return await prisma.record.create({
      data: {
        checkinId,
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
