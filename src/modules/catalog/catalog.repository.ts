import { prisma } from "@/lib/db/prisma";
import type { ProductStatus } from "@prisma/client";

export const catalogRepository = {
  listProducts(
    organizationId: string,
    params: {
      status?: ProductStatus;
      search?: string;
      skip?: number;
      take?: number;
    } = {},
  ) {
    return prisma.product.findMany({
      where: {
        organizationId,
        ...(params.status ? { status: params.status } : {}),
        ...(params.search
          ? {
              OR: [
                { name: { contains: params.search, mode: "insensitive" } },
                { sku: { contains: params.search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: {
        images: { orderBy: { sortOrder: "asc" }, take: 1 },
        category: true,
      },
      orderBy: { updatedAt: "desc" },
      skip: params.skip,
      take: params.take ?? 20,
    });
  },

  listPublishedForStore(organizationId: string) {
    return prisma.product.findMany({
      where: {
        organizationId,
        status: "PUBLISHED",
      },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        category: true,
        variants: true,
      },
      orderBy: { name: "asc" },
    });
  },

  findProductBySlug(organizationId: string, slug: string) {
    return prisma.product.findUnique({
      where: { organizationId_slug: { organizationId, slug } },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        variants: true,
        category: true,
      },
    });
  },

  createProduct(data: Parameters<typeof prisma.product.create>[0]["data"]) {
    return prisma.product.create({ data });
  },

  updateProduct(id: string, data: Record<string, unknown>) {
    return prisma.product.update({ where: { id }, data });
  },

  deleteProduct(id: string) {
    return prisma.product.delete({ where: { id } });
  },

  listCategories(organizationId: string) {
    return prisma.category.findMany({
      where: { organizationId },
      orderBy: { sortOrder: "asc" },
    });
  },

  createCategory(data: Parameters<typeof prisma.category.create>[0]["data"]) {
    return prisma.category.create({ data });
  },
};
