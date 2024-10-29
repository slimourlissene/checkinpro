import { deleteUsersFromCompany } from "@/services/company";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export async function onClick({
  emails,
  router,
  setOpen,
  setLoading,
}: {
  emails: string[];
  router: AppRouterInstance;
  setOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}) {
  setLoading(true);
  try {
    await deleteUsersFromCompany({ emails });
    toast.success(
      emails.length > 1
        ? "Les employés ont été supprimés."
        : "L'employé a été supprimé."
    );
  } catch (error: unknown) {
    console.error(error);
    toast.error("Une erreur est survenue lors de la suppression.");
  } finally {
    setLoading(false);
    setOpen(false);
    router.refresh();
  }
}
