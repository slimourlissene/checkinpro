import { z } from "zod";

const createCheckinSchema = z.object({
  name: z.string().min(2),
  activeDays: z.array(z.string()),
});

async function onSubmit({
  values,
  setOpen,
}: {
  values: z.infer<typeof createCheckinSchema>;
  setOpen: (open: boolean) => void;
}) {
  console.log(values);
}

export { createCheckinSchema, onSubmit };
