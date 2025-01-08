import { createCheckin } from "@/services/checkin";
import { toast } from "sonner";
import { z } from "zod";
import { resolveActionResult } from "../next-safe-action/resolveActionResult";

const createCheckinSchema = z.object({
  name: z.string().min(2),
  activeDays: z.array(z.string()),
});

async function onSubmit({
  values,
  setLoading,
  setOpen,
}: {
  values: z.infer<typeof createCheckinSchema>;
  setLoading: (loading: boolean) => void;
  setOpen: (open: boolean) => void;
}) {
  setLoading(true);
  try {
    await resolveActionResult(
      createCheckin({
        name: values.name,
        activeDays: values.activeDays,
      })
    );
    toast.success("Votre émargement a été créé avec succès.");
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Failed to create checkin`, {
      cause: error,
    });
  } finally {
    setLoading(false);
    setOpen(false);
  }
}

export { createCheckinSchema, onSubmit };
