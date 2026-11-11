import { prisma } from "@/lib/db/prisma";
import type { StoreTheme } from "@prisma/client";

export const storeRepository = {
  findBySlug(slug: string) {
    return prisma.store.findUnique({
      where: { slug },
      include: {
        organization: true,
      },
    });
  },

  findByOrganizationId(organizationId: string) {
    return prisma.store.findUnique({
      where: { organizationId },
    });
  },

  createForOrganization(params: {
    organizationId: string;
    name: string;
    slug: string;
    primaryColor?: string;
    theme?: StoreTheme;
  }) {
    return prisma.store.create({
      data: {
        organizationId: params.organizationId,
        name: params.name,
        slug: params.slug,
        primaryColor: params.primaryColor ?? "#FFCC00",
        theme: params.theme ?? "MODERN",
        published: false,
      },
    });
  },

  update(id: string, data: Record<string, unknown>) {
    return prisma.store.update({ where: { id }, data });
  },

  slugExists(slug: string) {
    return prisma.store.findUnique({ where: { slug }, select: { id: true } });
  },
};
