import { z } from "zod";
import { ProductStatus, ProductType } from "@prisma/client";

export const productSchema = z.object({
  type: z.nativeEnum(ProductType),
  status: z.nativeEnum(ProductStatus).default("DRAFT"),
  name: z.string().min(2).max(200),
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  description: z.string().max(10000).optional(),
  priceCents: z.number().int().min(0),
  compareAtCents: z.number().int().min(0).optional(),
  sku: z.string().max(64).optional(),
  stockQuantity: z.number().int().min(0).optional(),
  durationMinutes: z.number().int().min(0).optional(),
  categoryId: z.string().cuid().optional(),
});

export const categorySchema = z.object({
  name: z.string().min(2).max(120),
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  description: z.string().max(1000).optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
