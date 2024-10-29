import { z } from "zod";
import { toast } from "sonner";
import { addUsersToCompany } from "@/services/company";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { modifyUser } from "@/services/user";

const modifyWorkerSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  email: z.string().email(),
});

async function onSubmit({
  email,
  values,
  router,
  setDropdownOpen,
  setLoading,
}: {
  email: string;
  values: z.infer<typeof modifyWorkerSchema>;
  router: AppRouterInstance;
  setDropdownOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}) {
  setLoading(true);
  try {
    await modifyUser({ email, data: values });
    toast.success("Les informations de l'employé ont été modifié avec succès.");
    router.refresh();
  } catch (error: unknown) {
    console.error(error);
    toast.error("Une erreur s'est produite lors de l'ajout des employés.");
  } finally {
    setLoading(false);
    setDropdownOpen(false);
  }
}
export { modifyWorkerSchema, onSubmit };
