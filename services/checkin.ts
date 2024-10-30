"use server";
import { auth } from "@/app/auth";
import { prisma } from "@/prisma";
import { isCompanyOwnedByUser } from "@/utils/company/isCompanyOwnedByUser";
import { isUserInCompany } from "@/utils/company/isUserInCompany";
import { Checkin } from "@prisma/client";

export async function getCheckinsByCompany({
  companyId,
}: {
  companyId: string;
}): Promise<Checkin[]> {
  try {
    const session = await auth();
    if (session?.user === undefined) throw new Error(`User not authenticated`);
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
      include: {
        users: true,
      },
    });
    if (!company)
      throw new Error(`Company not found, id provided : ${companyId}`);

    isCompanyOwnedByUser({ companyOwnerId: company.ownerId });
    return await prisma.checkin.findMany({
      where: {
        companyId,
      },
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to get checkins by company`, {
      cause: error,
    });
  }
}

export async function getCheckinById({
  id,
}: {
  id: string;
}): Promise<Checkin | null> {
  try {
    const session = await auth();
    if (session?.user === undefined) throw new Error(`User not authenticated`);
    const checkin = await prisma.checkin.findUnique({
      where: {
        id,
      },
    });
    if (!checkin) throw new Error(`Checkin not found, id provided : ${id}`);

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
    return checkin;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to get checkin by id`, {
      cause: error,
    });
  }
}

export async function createCheckin({
  name,
  activeDays,
}: {
  name: string;
  activeDays: string[];
}) {
  try {
    const session = await auth();
    if (session?.user === undefined) throw new Error(`User not authenticated`);
    const companyId = session.user.company.id;
    const company = await prisma.company.findUnique({
      where: {
        id: session.user.company.id,
      },
      include: {
        users: true,
      },
    });
    if (!company)
      throw new Error(`Company not found, id provided : ${companyId}`);

    isCompanyOwnedByUser({ companyOwnerId: company.ownerId });
    return await prisma.checkin.create({
      data: {
        name,
        activeDays,
        companyId,
      },
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to create checkin`, {
      cause: error,
    });
  }
}

export async function updateCheckin({
  id,
  activeDays,
}: {
  id: string;
  activeDays: string[];
}) {
  try {
    const session = await auth();
    if (session?.user === undefined) throw new Error(`User not authenticated`);
    const checkin = await prisma.checkin.findUnique({
      where: {
        id: id,
      },
    });
    if (!checkin) throw new Error(`Checkin not found, id provided : ${id}`);

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
    throw new Error(`Failed to update checkin`, {
      cause: error,
    });
  }
}

export async function deleteCheckin({ id }: { id: string }) {
  try {
    const session = await auth();
    if (session?.user === undefined) throw new Error(`User not authenticated`);
    const company = await prisma.company.findUnique({
      where: {
        id: id,
      },
      include: {
        users: true,
      },
    });
    if (!company) throw new Error(`Company not found, id provided : ${id}`);

    isCompanyOwnedByUser({ companyOwnerId: company.ownerId });
    return await prisma.checkin.delete({
      where: {
        id: id,
      },
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to delete checkin`, {
      cause: error,
    });
  }
}
