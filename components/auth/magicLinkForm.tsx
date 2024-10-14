"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { sendMagicLink } from "@/api/sendMagicLink";

export default function MagicLinkForm() {
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
      const result = await sendMagicLink({ email: values.email });
      if (result.ok) {
        toast.success(
          "Un lien de connexion a été envoyé à votre adresse email"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue, veuillez réessayer plus tard");
    }
  }

  return (
    <Form {...magicLinkForm}>
      <form
        className="flex flex-row gap-3 items-end"
        onSubmit={magicLinkForm.handleSubmit(onSubmit)}
      >
        <FormField
          control={magicLinkForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-[250px]"
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
