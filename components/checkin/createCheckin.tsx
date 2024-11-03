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
import {
  createCheckinSchema,
  onSubmit,
} from "@/utils/checkin/createCheckinForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { MultiSelect } from "../ui/multi-select";
import { useState } from "react";

export default function CreateCheckin() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
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
        <CreateCheckinForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

function CreateCheckinForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const days: { value: string; label: string }[] = [
    {
      value: "monday",
      label: "Lundi",
    },
    {
      value: "tuesday",
      label: "Mardi",
    },
    {
      value: "wednesday",
      label: "Mercredi",
    },
    {
      value: "thursday",
      label: "Jeudi",
    },
    {
      value: "friday",
      label: "Vendredi",
    },
    {
      value: "saturday",
      label: "Samedi",
    },
    {
      value: "sunday",
      label: "Dimanche",
    },
  ];
  const form = useForm<z.infer<typeof createCheckinSchema>>({
    resolver: zodResolver(createCheckinSchema),
    defaultValues: {
      name: "",
      activeDays: [],
    },
  });

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((values) => onSubmit({ values, setOpen }))}
      >
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
                <MultiSelect
                  options={days}
                  onValueChange={field.onChange}
                  animation={0}
                  maxCount={7}
                  placeholder="Sélectionnez les jours actifs"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button variant={"outline"}>Annuler</Button>
          </DialogClose>
          <Button type="submit">Créer</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
