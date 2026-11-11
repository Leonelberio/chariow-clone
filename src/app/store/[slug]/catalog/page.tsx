import { notFound } from "next/navigation";
import { storeService } from "@/modules/stores/store.service";
import { catalogService } from "@/modules/catalog/catalog.service";
import { CardProductStore } from "@/components/storefront/CardProductStore";

type CatalogPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function StoreCatalogPage({ params }: CatalogPageProps) {
  const { slug } = await params;
  const store = await storeService.getPublicBySlug(slug);
  if (!store) {
    notFound();
  }

  const products = await catalogService.listStorefrontProducts(store.organizationId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Catalogue</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <CardProductStore
            key={product.id}
            storeSlug={store.slug}
            product={product}
            currency={store.organization.currency}
            theme={store.theme}
          />
        ))}
      </div>
    </div>
  );
}
