import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { onClick } from "@/utils/company/deleteWorker";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteWorker({
  emails,
  isDropdownButton,
  setDropdownOpen,
  deselectAllRows,
}: {
  emails: string[];
  isDropdownButton: boolean;
  setDropdownOpen?: (open: boolean) => void;
  deselectAllRows?: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isDropdownButton ? (
          <Button
            size={"sm"}
            className="w-full rounded-sm py-0 px-2 justify-start font-normal text-sm"
            variant={"ghost"}
          >
            Supprimer
          </Button>
        ) : (
          <Button className="w-full h-9" variant={"destructive"}>
            Supprimer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="rounded-lg sm:max-w-xl max-w-[95%]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Supprimer {emails.length > 1 ? "des employés" : "un employé"}
          </DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer{" "}
            {emails.length > 1 ? "ces employés" : "cet employé"} ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex sm:flex-row sm:gap-0 flex-col-reverse gap-2">
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button
            loading={loading}
            className="sm:w-[100px] w-full"
            onClick={() =>
              onClick({ emails, router, setOpen, setLoading }).then(() => {
                setDropdownOpen && setDropdownOpen(false);
                deselectAllRows && deselectAllRows();
              })
            }
            variant="destructive"
          >
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
