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
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IPartialUser } from "@/types";
import { modifyWorkerSchema, onSubmit } from "@/utils/company/modifyWorkerForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ModifyWorker({
  user,
  setDropdownOpen,
}: {
  user: IPartialUser;
  setDropdownOpen: (open: boolean) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          className="w-full rounded-sm py-0 px-2 justify-start font-normal text-sm"
          variant={"ghost"}
        >
          Modifier
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-w-[95%] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Modifier un employé
          </DialogTitle>
          <DialogDescription>
            Modifier les informations de l&apos;employé en remplissant le
            formulaire ci-dessous.
          </DialogDescription>
        </DialogHeader>
        <ModifyWorkerForm user={user} setDropdownOpen={setDropdownOpen} />
      </DialogContent>
    </Dialog>
  );
}

function ModifyWorkerForm({
  user,
  setDropdownOpen,
}: {
  user: IPartialUser;
  setDropdownOpen: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof modifyWorkerSchema>>({
    resolver: zodResolver(modifyWorkerSchema),
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit({
            email: user.email,
            values,
            router,
            setDropdownOpen,
            setLoading,
          })
        )}
        className="flex flex-col space-y-4"
      >
        <div className="w-full flex lg:flex-row lg:space-x-2 lg:space-y-0 lg:*:w-1/3 flex-col space-y-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Prénom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row justify-end">
          <DialogFooter className="flex flex-row max-sm:gap-2">
            <DialogClose asChild>
              <Button variant={"outline"}>Annuler</Button>
            </DialogClose>
            <Button loading={loading} className="w-[100px]">
              Modifier
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
}
