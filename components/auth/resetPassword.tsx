"use client";
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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { resetPassword } from "@/services/users";

export default function ResetPassword({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="sm:max-w-[475px]">
        <AlertDialogHeader className="space-y-0">
          <AlertDialogTitle>Bienvenue sur CheckInPro !</AlertDialogTitle>
          <AlertDialogDescription>
            Définissez votre mot de passe pour accéder à la plateforme.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ResetPasswordForm email={email} setIsOpen={setIsOpen} />
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ResetPasswordForm({
  email,
  setIsOpen,
}: {
  email: string;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const resetPasswordSchema = z.object({
    newPassword: z.string().min(8, {
      message: "Votre mot de passe doit faire au minimum 8 caractères.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Votre mot de passe doit faire au minimum 8 caractères.",
    }),
  });
  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setIsLoading(true);
    const { newPassword, confirmPassword } = values;
    try {
      if (newPassword !== confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas.");
        return;
      }
      await resetPassword({ email, password: newPassword });
      toast.success("Votre mot de passe a été défini avec succès.");
      setIsOpen(false);
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
                  required
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
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-row gap-4 justify-end">
          <Button type="submit">
            {isLoading ? <LoadingSpinner /> : "Envoyer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
