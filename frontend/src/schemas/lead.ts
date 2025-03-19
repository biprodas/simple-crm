import { z } from "zod";

export const LeadSchema = z.object({
  name: z.string().min(1, {
    message: "Lead name is required",
  }),
  email: z.string().optional(),
});
