import Image from "next/image";
import Link from "next/link";
import type { Product, ProductImage, Category } from "@prisma/client";
import { formatMoney } from "@/lib/utils/money";
import { ButtonAddToCart } from "@/components/storefront/ButtonAddToCart";

type ProductWithRelations = Product & {
  images: ProductImage[];
  category: Category | null;
};

type CardProductStoreProps = {
  storeSlug: string;
  product: ProductWithRelations;
  currency: string;
  theme: "CLASSIC" | "MODERN";
};

export function CardProductStore({
  storeSlug,
  product,
  currency,
  theme,
}: CardProductStoreProps) {
  const image = product.images[0];
  const cardClass =
    theme === "MODERN"
      ? "rounded-3xl border border-border bg-white p-4 shadow-sm"
      : "rounded-lg border-2 border-foreground/10 bg-white p-3";

  return (
    <article className={cardClass}>
      <Link href={`/store/${storeSlug}/product/${product.slug}`}>
        <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt ?? product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              Pas d’image
            </div>
          )}
        </div>
      </Link>
      <div className="space-y-2">
        <Link
          href={`/store/${storeSlug}/product/${product.slug}`}
          className="block font-semibold hover:underline"
        >
          {product.name}
        </Link>
        <p className="text-sm font-medium">{formatMoney(product.priceCents, currency)}</p>
        <ButtonAddToCart
          storeSlug={storeSlug}
          productId={product.id}
          slug={product.slug}
          name={product.name}
          priceCents={product.priceCents}
          imageUrl={product.images[0]?.url}
        />
      </div>
    </article>
  );
}
