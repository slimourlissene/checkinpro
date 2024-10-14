import { getCsrfToken } from "next-auth/react";
import { api } from "./api";

export async function sendMagicLink({ email }: { email: string }) {
  return await api.post("api/auth/signin/nodemailer", {
    json: {
      email: email,
    },
  });
}
