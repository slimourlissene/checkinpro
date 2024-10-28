import { auth } from "@/app/auth";
import { Company, User } from "@prisma/client";

export async function isUserInCompany({
  company,
}: {
  company: Company & { users: User[] };
}) {
  const session = await auth();

  if (session?.user === undefined) {
    throw new Error(`User not authenticated`);
  }

  if (!company.users.some((user) => user.id === session.user?.id)) {
    throw new Error(`User is not in the company`);
  }
}
