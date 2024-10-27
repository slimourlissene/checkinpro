"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  createCompanySchema,
  onSubmit,
} from "@/utils/company/createCompanyForm";
import { useState } from "react";
import { toast } from "sonner";
import { createCompany } from "@/services/company";
import LoadingSpinner from "../ui/loading-spinner";
import { useRouter } from "next/navigation";

export default function CreateCompanyDialog() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <div className="flex gap-3 items-center">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Plus className="size-5" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Créer votre entreprise
                </span>
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Créer une entreprise </DialogTitle>
          <DialogDescription>
            Vous n'avez pas encore d'entreprise, créez-en une pour pouvoir
            ensuite y ajouter vos employés.
          </DialogDescription>
        </DialogHeader>
        <CreateCompanyForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

function CreateCompanyForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const createCompanyForm = useForm<z.infer<typeof createCompanySchema>>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Form {...createCompanyForm}>
      <form
        onSubmit={createCompanyForm.handleSubmit((values) =>
          onSubmit({ values, router, setLoading, setOpen })
        )}
        className="space-y-6"
      >
        <FormField
          control={createCompanyForm.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Nom de l'entreprise</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'entreprise" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex flex-row justify-end">
          <Button className="w-[150px]" type="submit">
            {loading ? <LoadingSpinner /> : "Créer l'entreprise"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
