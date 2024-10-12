"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import LoadingSpinner from "../ui/loading-spinner";

export default function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setIsLoading(true);
    try {
      await signOut({
        redirect: false,
      });
      toast.success("Vous avez été déconnecté avec succès.");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la connexion.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"}>Se déconnecter</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir vous déconnecter ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Vous pourrez toujours vous reconnecter en utilisant votre adresse
            email et votre mot de passe.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={"outline"}>Annuler</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="w-[125px]"
              variant={"destructive"}
              onClick={() => handleLogout()}
            >
              {isLoading ? <LoadingSpinner /> : "Se déconnecter"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
