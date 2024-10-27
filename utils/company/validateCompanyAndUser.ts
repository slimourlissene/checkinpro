import { Company, User } from "@prisma/client";

export function validateCompanyAndUser({
  userId,
  company,
  email,
}: {
  userId: string | undefined;
  company: (Company & { users: User[] }) | null;
  email: string;
}) {
  if (company === null) {
    throw new Error(`Company not found`);
  }

  if (company.ownerId === userId) {
    throw new Error(`Cannot delete owner from company`);
  }

  const userExists = company.users.some((user: User) => user.email === email);
  if (!userExists) {
    throw new Error(`User not found in company, email provided: ${email}`);
  }
}
