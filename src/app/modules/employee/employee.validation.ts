import { z } from "zod";

export const createEmployeeValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    imageUrl: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    status: z.enum(["ACTIVE", "BLOCKED"]).default('ACTIVE'),
  }),
});