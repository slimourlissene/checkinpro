"use server";
import { prisma } from "@/prisma";
import { IPartialUser } from "@/types";
import { User } from "@prisma/client";

export async function getCompanyById({ id }: { id: string }) {
  try {
    return await prisma.company.findUnique({
      where: { id },
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to get company by id`, {
      cause: error,
    });
  }
}

export async function createCompany({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  try {
    const owner: User | null = await prisma.user.findFirst({
      where: { email },
    });

    if (!owner) {
      throw new Error(`User not found, email provided : ${email}`);
    }

    return await prisma.company.create({
      data: {
        name,
        ownerId: owner.id,
      },
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to create company`, {
      cause: error,
    });
  }
}

export async function addUserToCompany({
  id,
  users,
}: {
  id: string;
  users: IPartialUser[];
}) {
  try {
    const company = await prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new Error(`Company not found, id provided : ${id}`);
    }
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to add users to company`, {
      cause: error,
    });
  }
}
