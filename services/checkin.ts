"use server";
import { auth } from "@/app/auth";
import { prisma } from "@/prisma";
import { isCompanyOwnedByUser } from "@/utils/company/isCompanyOwnedByUser";
import { isUserInCompany } from "@/utils/company/isUserInCompany";
import { Checkin, Company, User } from "@prisma/client";
import bcrypt from "bcrypt";
import QRCode from "qrcode";
import jwt from "jsonwebtoken";

export async function getCheckinsByCompany(): Promise<
  (Checkin & { company: Company & { users: User[] } })[]
> {
  try {
    const session = await auth();
    if (session?.user === undefined) throw new Error(`User not authenticated`);
    const companyId = session.user.company.id;
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
      include: {
        company: {
          include: {
            users: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
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

export async function launchCheckin({ id }: { id: string }) {
  try {
    const session = await auth();
    if (session?.user === undefined) throw new Error(`User not authenticated`);
    const checkin = await prisma.checkin.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
      },
    });
    if (!checkin) throw new Error(`Checkin not found, id provided : ${id}`);
    if (checkin.company.ownerId !== session.user.id)
      throw new Error(`User not authorized to launch checkin`);
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
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "24h" });

    return await QRCode.toDataURL(token, {
      errorCorrectionLevel: "H",
      width: 300,
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to launch checkin`, {
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
