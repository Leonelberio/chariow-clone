"use server";

import { checkoutSchema, type CheckoutInput } from "@/modules/orders/order.schema";
import { orderService } from "@/modules/orders/order.service";

export async function submitCheckoutAction(input: CheckoutInput) {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: "Panier invalide" };
  }

  try {
    const order = await orderService.createFromCheckout(parsed.data);
    return {
      success: true as const,
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "CHECKOUT_FAILED";
    const labels: Record<string, string> = {
      STORE_NOT_AVAILABLE: "Boutique indisponible",
      INVALID_PRODUCT: "Produit invalide",
      INSUFFICIENT_STOCK: "Stock insuffisant",
    };
    return {
      success: false as const,
      error: labels[message] ?? "Impossible de valider la commande",
    };
  }
}
