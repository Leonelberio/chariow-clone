import { z } from "zod";
import { StoreTheme } from "@prisma/client";

export const storeUpdateSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z
    .string()
    .min(3)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug invalide"),
  description: z.string().max(5000).optional(),
  logoUrl: z.url().optional().or(z.literal("")),
  coverImageUrl: z.url().optional().or(z.literal("")),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  theme: z.nativeEnum(StoreTheme),
  contactEmail: z.email().optional(),
  contactPhone: z.string().optional(),
  deliveryInfo: z.string().max(5000).optional(),
  paymentInfo: z.string().max(5000).optional(),
  published: z.boolean().optional(),
});

export type StoreUpdateInput = z.infer<typeof storeUpdateSchema>;
