"use client";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function MagicLinkButton() {
  const magicLinkSchema = z.object({
    email: z.string().email(),
  });

  const magicLinkForm = useForm<z.infer<typeof magicLinkSchema>>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof magicLinkSchema>) {
    try {
      await signIn("resend", {
        email: values.email,
        redirectTo: "/",
      });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue, veuillez réessayer plus tard");
    }
  }

  return (
    <Form {...magicLinkForm}>
      <form
        className="flex flex-row gap-3 justify-center items-end"
        onSubmit={magicLinkForm.handleSubmit(onSubmit)}
      >
        <FormField
          control={magicLinkForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Entrez votre email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Envoyer</Button>
      </form>
    </Form>
  );
}
