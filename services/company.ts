"use server";
import { auth } from "@/app/auth";
import { prisma } from "@/prisma";
import { IPartialUser } from "@/types";
import { isCompanyOwnedByUser } from "@/utils/company/isCompanyOwnedByUser";
import { isUserInCompany } from "@/utils/company/isUserInCompany";
import { validateCompanyAndUser } from "@/utils/company/validateCompanyAndUser";
import { User } from "@prisma/client";

export async function getCompanyById({ id }: { id: string }) {
  try {
    const company = await prisma.company.findUnique({
      where: { id },
      include: { users: true },
    });

    if (!company) {
      throw new Error(`Company not found, id provided : ${id}`);
    }

    isUserInCompany({ company });
    return company;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to get company by id`, {
      cause: error,
    });
  }
}

export async function createCompany({ name }: { name: string }) {
  try {
    const session = await auth();

    if (session?.user === undefined) {
      throw new Error(`User not authenticated`);
    }

    const email = session?.user?.email as string;
    const owner: User | null = await prisma.user.findFirst({
      where: { email },
    });

    if (owner === null) {
      throw new Error(`User not found, email provided : ${email}`);
    }

    const company = await prisma.company.create({
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
    return company;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to create company`, {
      cause: error,
    });
  }
}

export async function addUsersToCompany({
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
    isCompanyOwnedByUser({ companyOwnerId: company?.ownerId });
    if (!company) {
      throw new Error(`Company not found, id provided : ${id}`);
    }
    /* 
      We use connectOrCreate to save a huge amount of lines & logic, 
      we can connect the user if it already exists in the database,
      or create it if it doesn't exist
    */
    return await prisma.company.update({
      where: { id },
      data: {
        users: {
          connectOrCreate: users.map((user: IPartialUser) => ({
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
    throw new Error(`Failed to add users to company`, {
      cause: error,
    });
  }
}

export async function deleteUsersFromCompany({ emails }: { emails: string[] }) {
  try {
    const session = await auth();
    if (session?.user === undefined) {
      throw new Error(`User not authenticated`);
    }
    const id = session.user.company.id;
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });

    isCompanyOwnedByUser({ companyOwnerId: company?.ownerId });
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
    throw new Error(`Failed to delete user from company`, {
      cause: error,
    });
  }
}
