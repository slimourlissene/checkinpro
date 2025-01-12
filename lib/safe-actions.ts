import { auth } from "@/app/auth";
import { Session } from "next-auth";
import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {}

export const safeAction = createSafeActionClient({
  handleServerError: (error: Error) => {
    if (error instanceof ActionError) {
      console.error(`L'action error est :${error}`);
      return error.message.replace("Error: ", "");
    }

    return "An error occurred. Please try again later.";
  },
});

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
