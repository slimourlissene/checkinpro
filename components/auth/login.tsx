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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoadingSpinner from "../ui/loading-spinner";

export default function Login() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Se connecter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Se connecter</DialogTitle>
          <DialogDescription>
            Connectez-vous pour accéder à votre espace personnel.
          </DialogDescription>
        </DialogHeader>
        <LoginForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}

function LoginForm({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!result?.error) {
        setIsOpen(false);
        toast.success("Vous êtes désormais connecté.");
        router.refresh();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la connexion.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
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
            {isLoading ? <LoadingSpinner /> : "Se connecter"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
