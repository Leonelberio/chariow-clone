import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { storeService } from "@/modules/stores/store.service";
import { catalogService } from "@/modules/catalog/catalog.service";
import { formatMoney } from "@/lib/utils/money";
import { ButtonAddToCart } from "@/components/storefront/ButtonAddToCart";

type ProductPageProps = {
  params: Promise<{ slug: string; productSlug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug, productSlug } = await params;
  const store = await storeService.getPublicBySlug(slug);
  if (!store) {
    return {};
  }
  const product = await catalogService.getProductBySlug(
    store.organizationId,
    productSlug,
  );
  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description ?? undefined,
    openGraph: {
      title: product.name,
      images: product.images[0]?.url ? [product.images[0].url] : undefined,
    },
  };
}

export default async function StoreProductPage({ params }: ProductPageProps) {
  const { slug, productSlug } = await params;
  const store = await storeService.getPublicBySlug(slug);
  if (!store) {
    notFound();
  }

  const product = await catalogService.getProductBySlug(
    store.organizationId,
    productSlug,
  );

  if (!product || product.status !== "PUBLISHED") {
    notFound();
  }

  const image = product.images[0];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-white">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt ?? product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Pas d’image
          </div>
        )}
      </div>
      <div className="space-y-4 rounded-3xl border border-border bg-white p-6">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-lg font-semibold">
          {formatMoney(product.priceCents, store.organization.currency)}
        </p>
        {product.description && (
          <p className="text-sm whitespace-pre-wrap text-muted-foreground">
            {product.description}
          </p>
        )}
        <ButtonAddToCart
          storeSlug={slug}
          productId={product.id}
          slug={product.slug}
          name={product.name}
          priceCents={product.priceCents}
          imageUrl={product.images[0]?.url}
        />
      </div>
    </div>
  );
}
