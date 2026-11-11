import { notFound } from "next/navigation";
import { storeService } from "@/modules/stores/store.service";
import { FormStoreCheckout } from "@/components/storefront/FormStoreCheckout";

type CheckoutPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function StoreCheckoutPage({ params }: CheckoutPageProps) {
  const { slug } = await params;
  const store = await storeService.getPublicBySlug(slug);
  if (!store) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <p className="text-sm text-muted-foreground">
        Les montants sont recalculés côté serveur à la validation.
      </p>
      <FormStoreCheckout
        storeSlug={slug}
        currency={store.organization.currency}
        shippingCents={0}
      />
    </div>
  );
}
