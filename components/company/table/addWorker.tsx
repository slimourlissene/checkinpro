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
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

export default function AddWorker() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}> Ajouter des employés </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Ajouter des employés
          </DialogTitle>
          <DialogDescription>
            Vous pouvez ajouter des employés en important un fichier CSV ou en
            les ajoutant manuellement.
          </DialogDescription>
        </DialogHeader>
        <AddWorkerForm />
      </DialogContent>
    </Dialog>
  );
}

function AddWorkerForm() {
  const addWorkerSchema = z.object({
    workers: z.array(
      z.object({
        firstname: z.string(),
        lastname: z.string(),
        email: z.string().email(),
      })
    ),
  });

  const form = useForm<z.infer<typeof addWorkerSchema>>({
    resolver: zodResolver(addWorkerSchema),
    defaultValues: {
      workers: [{ firstname: "", lastname: "", email: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workers",
  });

  function addWorker() {
    append({ firstname: "", lastname: "", email: "" });
  }

  function removeWorker(index: number) {
    remove(index);
  }

  function onSubmit(values: z.infer<typeof addWorkerSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-row items-center gap-3">
            <Input
              required
              placeholder="Prénom"
              {...form.register(`workers.${index}.firstname`)}
            />
            <Input
              required
              placeholder="Nom"
              {...form.register(`workers.${index}.lastname`)}
            />
            <Input
              required
              placeholder="Email"
              {...form.register(`workers.${index}.email`)}
            />
            <div className={`flex flex-row gap-3 w-[60px]`}>
              {fields.length > 1 && (
                <MinusCircle
                  className="cursor-pointer hover:text-muted-foreground transition-colors"
                  size={22}
                  onClick={() => removeWorker(index)}
                />
              )}{" "}
              {index === fields.length - 1 && (
                <PlusCircle
                  className="cursor-pointer hover:text-muted-foreground transition-colors"
                  size={22}
                  onClick={addWorker}
                />
              )}
            </div>
          </div>
        ))}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Annuler</Button>
          </DialogClose>
          <Button variant={"secondary"}>Importer un fichier CSV</Button>
          <Button type="submit">Confirmer</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
