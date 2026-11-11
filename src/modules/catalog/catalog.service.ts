import slugify from "slugify";
import { catalogRepository } from "@/modules/catalog/catalog.repository";
import type { CategoryInput, ProductInput } from "@/modules/catalog/catalog.schema";

async function uniqueProductSlug(organizationId: string, name: string) {
  const base = slugify(name, { lower: true, strict: true }) || "produit";
  let slug = base;
  let index = 1;
  while (await catalogRepository.findProductBySlug(organizationId, slug)) {
    slug = `${base}-${index}`;
    index += 1;
  }
  return slug;
}

export const catalogService = {
  listForOrganization(
    organizationId: string,
    params?: Parameters<typeof catalogRepository.listProducts>[1],
  ) {
    return catalogRepository.listProducts(organizationId, params);
  },

  listStorefrontProducts(organizationId: string) {
    return catalogRepository.listPublishedForStore(organizationId);
  },

  async createProduct(organizationId: string, input: ProductInput) {
    const slug =
      input.slug ?? (await uniqueProductSlug(organizationId, input.name));

    return catalogRepository.createProduct({
      organizationId,
      type: input.type,
      status: input.status,
      name: input.name,
      slug,
      description: input.description,
      priceCents: input.priceCents,
      compareAtCents: input.compareAtCents,
      sku: input.sku,
      stockQuantity: input.stockQuantity,
      durationMinutes: input.durationMinutes,
      categoryId: input.categoryId,
      publishedAt: input.status === "PUBLISHED" ? new Date() : null,
    });
  },

  getProductBySlug(organizationId: string, slug: string) {
    return catalogRepository.findProductBySlug(organizationId, slug);
  },

  async createCategory(organizationId: string, input: CategoryInput) {
    const slug =
      input.slug ?? slugify(input.name, { lower: true, strict: true });

    return catalogRepository.createCategory({
      organizationId,
      name: input.name,
      slug,
      description: input.description,
    });
  },

  listCategories(organizationId: string) {
    return catalogRepository.listCategories(organizationId);
  },
};
