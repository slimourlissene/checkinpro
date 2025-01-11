"use server";

import { ActionError, safeAuthenticatedAction } from "@/lib/safe-actions";
import { z } from "zod";
import nodemailer from "nodemailer";
import { contactSchema } from "@/utils/contact/contactForm";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  from: process.env.EMAIL_FROM,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = safeAuthenticatedAction
  .schema(contactSchema)
  .action(async ({ parsedInput: { firstname, lastname, email, message } }) => {
    try {
      const isVerified = await transporter.verify();
      if (!isVerified) {
        throw new ActionError("Erreur lors de la vérification du serveur", {
          cause: isVerified,
        });
      }

      const info = await transporter.sendMail({
        to: process.env.EMAIL_FROM,
        from: email,
        subject: `${firstname} ${lastname} vous a envoyé un message via CheckInPro`,
        text: message,
      });

      console.info(`Message sent: ${info.messageId}`);
      console.info(`Mail send from ${email}`);

      return info;
    } catch (error: unknown) {
      console.error(error);
      throw new ActionError(`Erreur lors de l'envoi du message`, {
        cause: error,
      });
    }
  });
