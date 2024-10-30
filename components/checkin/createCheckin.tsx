"use client";
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
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCheckinSchema } from "@/utils/checkin/createCheckinForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";

export default function CreateCheckin() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          size={"sm"}
          className="w-full rounded-md py-1.5 px-2 justify-start font-normal text-sm"
          variant={"ghost"}
        >
          <PlusCircle size={16} className="mr-2" />
          Créer un émargement
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer un émargement</DialogTitle>
          <DialogDescription>
            Créez un émargement pour enregistrer la présence de vos employés.
          </DialogDescription>
        </DialogHeader>
        <CreateCheckinForm />
        <DialogFooter className="mt-2">
          <DialogClose>
            <Button variant={"outline"}>Annuler</Button>
          </DialogClose>
          <Button> Créer un émargement </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CreateCheckinForm() {
  const form = useForm<z.infer<typeof createCheckinSchema>>({
    resolver: zodResolver(createCheckinSchema),
    defaultValues: {
      name: "",
      activeDays: [],
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Nom de l'émargement</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'émargement" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activeDays"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Jours actifs</FormLabel>
              <FormControl>
                <Input placeholder="Jours actifs" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
