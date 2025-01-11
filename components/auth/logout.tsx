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
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import LoadingSpinner from "../ui/loading-spinner";

export default function Logout() {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await signOut({
        redirect: true,
        redirectTo: "/",
      });
      toast.success("Vous allez être déconnecté dans un instant.");
    } catch (error) {
      toast.error("Une erreur est survenue lors de la connexion.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={"sm"}
          className="w-full rounded-sm py-1.5 px-2 justify-start font-normal text-sm"
          variant={"ghost"}
        >
          <LogOut size={21} className="mr-2" />
          Se déconnecter
        </Button>
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
              loading={loading}
              className="w-[150px]"
              variant={"destructive"}
              onClick={() => handleLogout()}
            >
              Se déconnecter
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
