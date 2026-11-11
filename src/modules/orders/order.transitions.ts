import type { OrderStatus } from "@prisma/client";

const transitions: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["AWAITING_PAYMENT", "CANCELLED"],
  AWAITING_PAYMENT: ["PAID", "CANCELLED"],
  PAID: ["CONFIRMED", "REFUNDED", "CANCELLED"],
  CONFIRMED: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["READY", "CANCELLED"],
  READY: ["SHIPPED", "DELIVERED", "CANCELLED"],
  SHIPPED: ["DELIVERED", "CANCELLED"],
  DELIVERED: ["REFUNDED"],
  CANCELLED: [],
  REFUNDED: [],
};

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  if (from === to) {
    return true;
  }
  return transitions[from]?.includes(to) ?? false;
}
