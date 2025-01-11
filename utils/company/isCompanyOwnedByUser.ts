import { auth } from "@/app/auth";
import { ActionError } from "@/lib/safe-actions";

export async function isCompanyOwnedByUser({
  companyOwnerId,
}: {
  companyOwnerId: string | null | undefined;
}): Promise<void> {
  const session = await auth();
  if (session?.user === undefined) {
    throw new ActionError(`User not authenticated`);
  }

  if (session.user?.id !== companyOwnerId) {
    throw new ActionError(`User is not the owner of the company`);
  }
}
