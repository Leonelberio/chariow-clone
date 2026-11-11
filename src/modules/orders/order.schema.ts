import { z } from "zod";
import { OrderStatus } from "@prisma/client";

export const orderStatusUpdateSchema = z.object({
  orderId: z.string().cuid(),
  status: z.nativeEnum(OrderStatus),
  note: z.string().max(1000).optional(),
});

export const checkoutCustomerSchema = z.object({
  email: z.email(),
  phone: z.string().optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  shippingAddress: z
    .object({
      line1: z.string().min(3),
      line2: z.string().optional(),
      city: z.string().min(2),
      postalCode: z.string().min(2),
      country: z.string().min(2),
    })
    .optional(),
});

export const checkoutLineSchema = z.object({
  productId: z.string().cuid(),
  variantId: z.string().cuid().optional(),
  quantity: z.number().int().min(1).max(99),
});

export const checkoutSchema = z.object({
  storeSlug: z.string().min(2),
  customer: checkoutCustomerSchema,
  lines: z.array(checkoutLineSchema).min(1),
  shippingCents: z.number().int().min(0).optional(),
  promoCode: z.string().max(64).optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
