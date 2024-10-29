import { Company, User } from "@prisma/client";

export function validateCompanyAndUser({
  company,
  email,
}: {
  company: (Company & { users: User[] }) | null;
  email: string;
}) {
  if (company === null) {
    throw new Error(`Company not found`);
  }

  const userToDelete = company.users.find((user: User) => user.email === email);
  if (company.ownerId === userToDelete?.id) {
    throw new Error(`Cannot delete owner from company`);
  }

  const userExists = company.users.some((user: User) => user.email === email);
  if (!userExists) {
    throw new Error(`User not found in company, email provided: ${email}`);
  }
}
