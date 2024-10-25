import { auth } from "@/app/auth";

export async function isCompanyOwnedByUser({
  companyOwnerId,
}: {
  companyOwnerId: string | null | undefined;
}): Promise<void> {
  const session = await auth();
  if (!session) {
    throw new Error(`User not authenticated`);
  }

  if (session.user?.id !== companyOwnerId) {
    throw new Error(`User is not the owner of the company`);
  }
}
