import { prisma } from "@/lib/db/prisma";
import { orderRepository } from "@/modules/orders/order.repository";
import { canTransition } from "@/modules/orders/order.transitions";
import type { CheckoutInput } from "@/modules/orders/order.schema";
import { storeService } from "@/modules/stores/store.service";
import { paymentService } from "@/modules/payments/payment.service";

function formatOrderNumber(sequence: number) {
  const date = new Date();
  const y = date.getFullYear().toString().slice(-2);
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  return `CMD-${y}${m}-${sequence.toString().padStart(5, "0")}`;
}

export const orderService = {
  list(organizationId: string, params?: Parameters<typeof orderRepository.list>[1]) {
    return orderRepository.list(organizationId, params);
  },

  getById(organizationId: string, orderId: string) {
    return orderRepository.findById(organizationId, orderId);
  },

  async updateStatus(
    organizationId: string,
    orderId: string,
    status: import("@prisma/client").OrderStatus,
    note?: string,
  ) {
    const order = await orderRepository.findById(organizationId, orderId);
    if (!order) {
      throw new Error("ORDER_NOT_FOUND");
    }

    if (!canTransition(order.status, status)) {
      throw new Error("INVALID_STATUS_TRANSITION");
    }

    await orderRepository.updateStatus(orderId, status, order.status, note);
    return orderRepository.findById(organizationId, orderId);
  },

  async createFromCheckout(input: CheckoutInput) {
    const store = await storeService.getPublicBySlug(input.storeSlug);
    if (!store || !store.published) {
      throw new Error("STORE_NOT_AVAILABLE");
    }

    const organizationId = store.organizationId;
    const productIds = input.lines.map((l) => l.productId);

    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        organizationId,
        status: "PUBLISHED",
      },
      include: { variants: true },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    let subtotalCents = 0;
    const orderItems: Array<{
      productId: string;
      variantId?: string;
      productName: string;
      variantName?: string;
      sku?: string;
      quantity: number;
      unitPriceCents: number;
      lineTotalCents: number;
    }> = [];

    for (const line of input.lines) {
      const product = productMap.get(line.productId);
      if (!product) {
        throw new Error("INVALID_PRODUCT");
      }

      let unitPriceCents = product.priceCents;
      let variantName: string | undefined;
      let variantId: string | undefined;

      if (line.variantId) {
        const variant = product.variants.find((v) => v.id === line.variantId);
        if (!variant) {
          throw new Error("INVALID_VARIANT");
        }
        unitPriceCents = variant.priceCents ?? product.priceCents;
        variantName = variant.name;
        variantId = variant.id;

        if (
          variant.stockQuantity != null &&
          variant.stockQuantity < line.quantity
        ) {
          throw new Error("INSUFFICIENT_STOCK");
        }
      } else if (
        product.stockQuantity != null &&
        product.stockQuantity < line.quantity
      ) {
        throw new Error("INSUFFICIENT_STOCK");
      }

      const lineTotalCents = unitPriceCents * line.quantity;
      subtotalCents += lineTotalCents;

      orderItems.push({
        productId: product.id,
        variantId,
        productName: product.name,
        variantName,
        sku: product.sku ?? undefined,
        quantity: line.quantity,
        unitPriceCents,
        lineTotalCents,
      });
    }

    const shippingCents = input.shippingCents ?? 0;
    const discountCents = 0;
    const totalCents = subtotalCents + shippingCents - discountCents;

    const customerName = [input.customer.firstName, input.customer.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    const customer = await prisma.customer.upsert({
      where: {
        organizationId_email: {
          organizationId,
          email: input.customer.email.toLowerCase(),
        },
      },
      create: {
        organizationId,
        email: input.customer.email.toLowerCase(),
        phone: input.customer.phone,
        firstName: input.customer.firstName,
        lastName: input.customer.lastName,
      },
      update: {
        phone: input.customer.phone,
        firstName: input.customer.firstName,
        lastName: input.customer.lastName,
      },
    });

    const orderCount = await prisma.order.count({ where: { organizationId } });
    const orderNumber = formatOrderNumber(orderCount + 1);

    const order = await orderRepository.create({
      organizationId,
      customerId: customer.id,
      orderNumber,
      status: "AWAITING_PAYMENT",
      currency: store.organization.currency,
      subtotalCents,
      shippingCents,
      discountCents,
      totalCents,
      customerEmail: customer.email,
      customerPhone: input.customer.phone,
      customerName: customerName || undefined,
      shippingAddress: input.customer.shippingAddress,
      promoCode: input.promoCode,
      items: {
        create: orderItems,
      },
      statusHistory: {
        create: {
          fromStatus: null,
          toStatus: "AWAITING_PAYMENT",
          note: "Commande créée depuis le checkout",
        },
      },
    });

    await paymentService.createManualPayment(order.id, totalCents, store.organization.currency);

    await prisma.notification.create({
      data: {
        organizationId,
        type: "NEW_ORDER",
        title: "Nouvelle commande",
        body: `Commande ${orderNumber} reçue`,
        metadata: { orderId: order.id },
      },
    });

    return order;
  },
};
