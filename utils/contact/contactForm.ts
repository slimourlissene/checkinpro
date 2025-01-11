import { sendEmail } from "@/services/contact";
import { z } from "zod";
import { resolveActionResult } from "../next-safe-action/resolveActionResult";
import { toast } from "sonner";

const contactSchema = z.object({
  firstname: z.string().min(1, {
    message: "Veuillez entrer votre prénom",
  }),
  lastname: z.string().min(1, {
    message: "Veuillez entrer votre nom de famille",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  message: z.string().min(1, {
    message: "Veuillez entrer un message",
  }),
});

async function onSubmit({
  values,
  setLoading,
}: {
  values: z.infer<typeof contactSchema>;
  setLoading: (loading: boolean) => void;
}) {
  setLoading(true);
  try {
    await resolveActionResult(sendEmail(values));
    toast.success("Message envoyé avec succès");
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to send message`, {
      cause: error,
    });
  } finally {
    setLoading(false);
  }
}

export { contactSchema, onSubmit };
