"use server";
import { auth } from "@/auth";
import { ActionError } from "@/lib/safe-actions";
import { Company, User } from "@prisma/client";

export async function isUserInCompany({
  company,
}: {
  company: Company & { users: User[] };
}) {
  const session = await auth();

  if (session?.user === undefined) {
    throw new ActionError(`User not authenticated`);
  }

  if (!company.users.some((user) => user.id === session.user?.id)) {
    throw new ActionError(`User is not in the company`);
  }
}
