import { notFound } from "next/navigation";
import { storeService } from "@/modules/stores/store.service";
import { CartPageClient } from "@/components/storefront/CartPageClient";

type CartPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function StoreCartPage({ params }: CartPageProps) {
  const { slug } = await params;
  const store = await storeService.getPublicBySlug(slug);
  if (!store) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Panier</h1>
      <CartPageClient storeSlug={slug} currency={store.organization.currency} />
    </div>
  );
}
