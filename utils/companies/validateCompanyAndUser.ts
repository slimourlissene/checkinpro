import { Company, User } from "@prisma/client";

export function validateCompanyAndUser(
  company: (Company & { users: User[] }) | null,
  email: string,
  id: string
) {
  if (!company) {
    throw new Error(`Company not found, id provided: ${id}`);
  }

  if (company.ownerId === email) {
    throw new Error(`Cannot delete owner from company`);
  }

  const userExists = company.users.some((user) => user.email === email);
  if (!userExists) {
    throw new Error(`User not found in company, email provided: ${email}`);
  }
}
