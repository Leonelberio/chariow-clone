"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth/auth";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { canManageCatalog } from "@/lib/permissions/roles";
import { catalogService } from "@/modules/catalog/catalog.service";
import { productSchema } from "@/modules/catalog/catalog.schema";

export async function createProductAction(input: unknown) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const tenant = await requireTenant(session.user.id);
  if (!canManageCatalog(tenant.role)) {
    return { success: false as const, error: "Permission refusée" };
  }

  const parsed = productSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: "Données invalides" };
  }

  const product = await catalogService.createProduct(
    tenant.organization.id,
    parsed.data,
  );

  revalidatePath("/dashboard/products");
  return { success: true as const, data: { id: product.id, slug: product.slug } };
}
