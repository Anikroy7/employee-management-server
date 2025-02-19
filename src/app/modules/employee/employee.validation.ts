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

export const updateEmployeeValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    imageUrl: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    status: z.enum(["ACTIVE", "BLOCKED"]).optional(),
  }),
});