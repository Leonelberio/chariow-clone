import { prisma } from "@/lib/db/prisma";

export const analyticsService = {
  async getDashboardSummary(organizationId: string) {
    const [orderCount, revenueAgg, productCount, customerCount] =
      await Promise.all([
        prisma.order.count({ where: { organizationId } }),
        prisma.order.aggregate({
          where: {
            organizationId,
            status: { in: ["PAID", "CONFIRMED", "PROCESSING", "READY", "SHIPPED", "DELIVERED"] },
          },
          _sum: { totalCents: true },
        }),
        prisma.product.count({
          where: { organizationId, status: "PUBLISHED" },
        }),
        prisma.customer.count({ where: { organizationId } }),
      ]);

    const recentOrders = await prisma.order.findMany({
      where: { organizationId },
      orderBy: { placedAt: "desc" },
      take: 5,
      select: {
        id: true,
        orderNumber: true,
        status: true,
        totalCents: true,
        placedAt: true,
        customerName: true,
      },
    });

    return {
      orderCount,
      revenueCents: revenueAgg._sum.totalCents ?? 0,
      productCount,
      customerCount,
      recentOrders,
    };
  },
};
