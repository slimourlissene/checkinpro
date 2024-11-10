import { launchCheckin } from "@/services/checkin";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import Image from "next/image";
import LoadingSpinner from "../ui/loading-spinner";

export default function LaunchCheckin({ id }: { id: string }) {
  const [qrCode, setQrCode] = useState<string | null>(null);

  async function onClick() {
    const result = await launchCheckin({ id });
    setQrCode(result);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" onClick={onClick} variant={"secondary"}>
          Lancer l'émargement
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-[450px]">
        <DialogHeader>
          <DialogTitle>Émargement lancé avec succès !</DialogTitle>
          <DialogDescription>
            Vos employés peuvent maintenant s'émarger en scannant le QR code.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-center justify-center min-h-[300px]">
          {qrCode ? (
            <Image
              className="rounded-xl antialiased invert mix-blend-difference"
              src={qrCode}
              alt="QR code"
              width={300}
              height={300}
            />
          ) : (
            <LoadingSpinner />
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Arrêter l'émargement</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
