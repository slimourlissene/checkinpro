import { z } from "zod";

const createCheckinSchema = z.object({
  name: z.string().min(2),
  activeDays: z.array(z.string()),
});

export { createCheckinSchema };
