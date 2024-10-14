"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import LoadingSpinner from "../ui/loading-spinner";

const resetPasswordSchema = z
  .object({
    email: z.string().email({ message: "Votre adresse email est invalide." }),
    newPassword: z.string().min(8, {
      message: "Votre mot de passe doit faire au minimum 8 caractères.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Votre mot de passe doit faire au minimum 8 caractères.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Réinitialiser le mot de passe</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Réinitialiser le mot de passe</DialogTitle>
          <DialogDescription>
            Définissez un nouveau mot de passe pour votre compte.
          </DialogDescription>
        </DialogHeader>
        <ResetPasswordForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}

function ResetPasswordForm({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setIsLoading(true);
    try {
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur est survenue lors de la réinitialisation du mot de passe."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...resetPasswordForm}>
      <form
        onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={resetPasswordForm.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={resetPasswordForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirmer le nouveau mot de passe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-row gap-4 justify-end">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => setIsOpen(false)}
          >
            Annuler
          </Button>
          <Button className="w-[125px]" type="submit" disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : "Envoyer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
