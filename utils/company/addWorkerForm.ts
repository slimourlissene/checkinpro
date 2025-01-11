import { z } from "zod";
import { toast } from "sonner";
import { addUsersToCompany } from "@/services/company";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const addWorkerSchema = z.object({
  workers: z.array(
    z.object({
      firstname: z.string().min(1, {
        message: "Veuillez entrer le prénom de l'employé",
      }),
      lastname: z.string().min(1, {
        message: "Veuillez entrer le nom de famille de l'employé",
      }),
      email: z.string().email({
        message: "Veuillez entrer une adresse email valide",
      }),
    })
  ),
});

async function onSubmit({
  id,
  values,
  router,
  setOpen,
  setLoading,
}: {
  id: string;
  values: z.infer<typeof addWorkerSchema>;
  router: AppRouterInstance;
  setOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}) {
  setLoading(true);
  try {
    await addUsersToCompany({ id: id, users: values.workers });
    toast.success("Les employés ont été ajoutés avec succès.");
    router.refresh();
  } catch (error: unknown) {
    console.error(error);
    toast.error(
      "Une erreur s'est produite lors de la modification de l'employé."
    );
  } finally {
    setLoading(false);
    setOpen(false);
  }
}
export { addWorkerSchema, onSubmit };
