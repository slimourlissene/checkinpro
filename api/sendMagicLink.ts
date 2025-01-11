import { getCsrfToken } from "next-auth/react";
import { api } from "./api";

export async function sendMagicLink({ email }: { email: string }) {
  try {
    const csrfToken = await getCsrfToken();
    return await api.post("api/auth/signin/nodemailer", {
      json: {
        email: email,
        csrfToken: csrfToken,
      },
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Erreur lors de l'envoi du Magic Link`, {
      cause: error,
    });
  }
}
