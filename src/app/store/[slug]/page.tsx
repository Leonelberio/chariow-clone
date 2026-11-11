import Link from "next/link";
import { notFound } from "next/navigation";
import { storeService } from "@/modules/stores/store.service";
import { catalogService } from "@/modules/catalog/catalog.service";
import { CardProductStore } from "@/components/storefront/CardProductStore";
import { Button } from "@/components/ui/button";

type StoreHomePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function StoreHomePage({ params }: StoreHomePageProps) {
  const { slug } = await params;
  const store = await storeService.getPublicBySlug(slug);
  if (!store) {
    notFound();
  }

  const products = await catalogService.listStorefrontProducts(store.organizationId);
  const gridClass =
    store.theme === "MODERN"
      ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="space-y-10">
      <section
        className={
          store.theme === "MODERN"
            ? "rounded-3xl border border-border bg-white p-8 shadow-sm"
            : "rounded-lg border-2 border-foreground/10 bg-white p-8"
        }
        style={{
          borderColor: store.theme === "MODERN" ? undefined : store.primaryColor,
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {store.theme === "MODERN" ? "Thème Modern" : "Thème Classic"}
        </p>
        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{store.name}</h1>
        {store.description && (
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{store.description}</p>
        )}
        <Button
          className="btn-chariow-primary mt-6 rounded-2xl font-semibold"
          render={<Link href={`/store/${slug}/catalog`} />}
        >
          Voir le catalogue
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Produits en vedette</h2>
        {products.length === 0 ? (
          <p className="text-sm text-muted-foreground">Catalogue en cours de préparation.</p>
        ) : (
          <div className={gridClass}>
            {products.slice(0, 6).map((product) => (
              <CardProductStore
                key={product.id}
                storeSlug={store.slug}
                product={product}
                currency={store.organization.currency}
                theme={store.theme}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
