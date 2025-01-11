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
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addWorkerSchema, onSubmit } from "@/utils/company/addWorkerForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { onClick, onFileChange } from "@/utils/company/parseWorkerCSV";

export default function AddWorker({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="sm:w-[300px] w-full" variant={"outline"}>
          {" "}
          Ajouter des employés{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-w-[95%] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Ajouter des employés
          </DialogTitle>
          <DialogDescription>
            Vous pouvez ajouter des employés en important un fichier CSV ou en
            les ajoutant manuellement.
          </DialogDescription>
        </DialogHeader>
        <AddWorkerForm id={id} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

function AddWorkerForm({
  id,
  setOpen,
}: {
  id: string;
  setOpen: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: z.infer<typeof addWorkerSchema>) =>
          onSubmit({ id, values, router, setOpen, setLoading })
        )}
        className="space-y-4"
      >
        <ScrollArea className="h-56">
          <div className="w-full space-y-2 p-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="w-full flex flex-row items-center gap-3"
              >
                <FormField
                  control={form.control}
                  name={`workers.${index}.firstname`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          required
                          type="text"
                          placeholder="Prénom"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`workers.${index}.lastname`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          required
                          type="text"
                          placeholder="Nom"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`workers.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className={`flex flex-row w-[125px] gap-3 items-center`}>
                  {fields.length > 1 && (
                    <MinusCircle
                      className="cursor-pointer hover:text-muted-foreground transition-colors"
                      size={22}
                      onClick={() => removeWorker(index)}
                    />
                  )}
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
          </div>
        </ScrollArea>
        <DialogFooter className="flex sm:flex-row flex-col gap-2">
          <DialogClose asChild>
            <Button type="button" variant={"outline"}>
              Annuler
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant={"secondary"}
            onClick={() => onClick({ fileInputRef })}
          >
            Importer un fichier CSV
          </Button>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onFileChange({ event, append, remove })
            }
          />
          <Button loading={loading} className="sm:w-[100px]" type="submit">
            Ajouter
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
