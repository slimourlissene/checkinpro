import { z } from "zod";
import { toast } from "sonner";
import { createCompany } from "@/services/company";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const createCompanySchema = z.object({
  name: z.string().min(3, {
    message: "Le nom de l'entreprise doit contenir au moins 3 caractères",
  }),
});

async function onSubmit({
  values,
  router,
  setLoading,
  setOpen,
}: {
  values: z.infer<typeof createCompanySchema>;
  router: AppRouterInstance;
  setLoading: (loading: boolean) => void;
  setOpen: (open: boolean) => void;
}) {
  setLoading(true);
  try {
    await createCompany({ name: values.name });
    toast.success("Votre entreprise a été crée avec succès.");
    router.refresh();
  } catch (error: unknown) {
    console.error(error);
    toast.error(
      "Une erreur est survenue lors de la création de votre entreprise."
    );
  } finally {
    setLoading(false);
    setOpen(false);
  }
}
export { createCompanySchema, onSubmit };
