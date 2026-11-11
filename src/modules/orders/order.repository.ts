import { prisma } from "@/lib/db/prisma";
import type { OrderStatus } from "@prisma/client";

export const orderRepository = {
  list(organizationId: string, params: { status?: OrderStatus; q?: string } = {}) {
    return prisma.order.findMany({
      where: {
        organizationId,
        ...(params.status ? { status: params.status } : {}),
        ...(params.q
          ? {
              OR: [
                { orderNumber: { contains: params.q, mode: "insensitive" } },
                { customerEmail: { contains: params.q, mode: "insensitive" } },
                { customerName: { contains: params.q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: {
        items: true,
        customer: true,
      },
      orderBy: { placedAt: "desc" },
    });
  },

  findById(organizationId: string, orderId: string) {
    return prisma.order.findFirst({
      where: { id: orderId, organizationId },
      include: {
        items: true,
        statusHistory: { orderBy: { createdAt: "asc" } },
        payments: true,
        customer: true,
      },
    });
  },

  create(data: Parameters<typeof prisma.order.create>[0]["data"]) {
    return prisma.order.create({ data });
  },

  updateStatus(
    orderId: string,
    status: OrderStatus,
    fromStatus: OrderStatus | null,
    note?: string,
  ) {
    return prisma.$transaction([
      prisma.order.update({
        where: { id: orderId },
        data: { status },
      }),
      prisma.orderStatusHistory.create({
        data: {
          orderId,
          fromStatus,
          toStatus: status,
          note,
        },
      }),
    ]);
  },
};
