"use server";
import { auth } from "@/app/auth";
import { prisma } from "@/prisma";
import { IPartialUser } from "@/types";
import { isCompanyOwnedByUser } from "@/utils/companies/isCompanyOwnedByUser";
import { isUserInCompany } from "@/utils/companies/isUserInCompany";
import { validateCompanyAndUser } from "@/utils/companies/validateCompanyAndUser";
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

    if (!session) {
      throw new Error(`User not authenticated`);
    }

    const email = session?.user?.email as string;
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
              companyId: company.id,
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

export async function deleteUserFromCompany({
  id,
  email,
}: {
  id: string;
  email: string;
}) {
  try {
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });

    isCompanyOwnedByUser({ companyOwnerId: company?.ownerId });
    validateCompanyAndUser(company, email, id);

    return await prisma.company.update({
      where: { id },
      data: {
        users: {
          delete: {
            email,
          },
        },
      },
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to delete user from company`, {
      cause: error,
    });
  }
}
