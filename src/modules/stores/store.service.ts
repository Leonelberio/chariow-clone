import slugify from "slugify";
import { storeRepository } from "@/modules/stores/store.repository";
import type { StoreUpdateInput } from "@/modules/stores/store.schema";

async function generateUniqueSlug(name: string): Promise<string> {
  const base = slugify(name, { lower: true, strict: true }) || "boutique";
  let slug = base;
  let counter = 1;

  while (await storeRepository.slugExists(slug)) {
    slug = `${base}-${counter}`;
    counter += 1;
  }

  return slug;
}

export const storeService = {
  async ensureStoreForOrganization(
    organizationId: string,
    input: { name: string; primaryColor?: string },
  ) {
    const existing = await storeRepository.findByOrganizationId(organizationId);
    if (existing) {
      return existing;
    }

    const slug = await generateUniqueSlug(input.name);
    return storeRepository.createForOrganization({
      organizationId,
      name: input.name,
      slug,
      primaryColor: input.primaryColor,
    });
  },

  getPublicBySlug(slug: string) {
    return storeRepository.findBySlug(slug);
  },

  async updateStore(storeId: string, input: StoreUpdateInput) {
    const taken = await storeRepository.slugExists(input.slug);
    if (taken && taken.id !== storeId) {
      throw new Error("SLUG_TAKEN");
    }

    return storeRepository.update(storeId, {
      ...input,
      logoUrl: input.logoUrl || null,
      coverImageUrl: input.coverImageUrl || null,
    });
  },
};
