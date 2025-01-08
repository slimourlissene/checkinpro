import { auth } from "@/auth";
import { Session } from "next-auth";
import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {}

export const safeAction = createSafeActionClient();

export const safeAuthenticatedAction = safeAction.use(async ({ next }) => {
  const session: Session | null = await auth();

  if (session === null) {
    throw new ActionError(
      "Vous devez être connecté pour effectuer cette action"
    );
  }

  return next({
    ctx: { user: session.user },
  });
});
