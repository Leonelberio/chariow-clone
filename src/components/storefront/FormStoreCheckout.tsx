"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/hooks/use-cart-store";
import { submitCheckoutAction } from "@/modules/checkout/checkout.actions";
import { formatMoney } from "@/lib/utils/money";

type FormStoreCheckoutProps = {
  storeSlug: string;
  currency: string;
  shippingCents?: number;
};

export function FormStoreCheckout({
  storeSlug,
  currency,
  shippingCents = 0,
}: FormStoreCheckoutProps) {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const clear = useCartStore((s) => s.clear);
  const getSubtotalCents = useCartStore((s) => s.subtotalCents);
  const [isLoading, setIsLoading] = useState(false);

  const subtotalCents = getSubtotalCents();
  const totalCents = subtotalCents + shippingCents;

  async function handleSubmit(formData: FormData) {
    if (lines.length === 0) {
      toast.error("Panier vide");
      return;
    }

    setIsLoading(true);
    const result = await submitCheckoutAction({
      storeSlug,
      shippingCents,
      customer: {
        email: String(formData.get("email") ?? ""),
        firstName: String(formData.get("firstName") ?? ""),
        lastName: String(formData.get("lastName") ?? ""),
        phone: String(formData.get("phone") ?? ""),
      },
      lines: lines.map((line) => ({
        productId: line.productId,
        variantId: line.variantId,
        quantity: line.quantity,
      })),
    });
    setIsLoading(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    clear();
    toast.success("Commande enregistrée");
    router.push(
      `/store/${storeSlug}/order/${result.data.orderNumber}/confirmation`,
    );
  }

  return (
    <form
      className="space-y-4 rounded-2xl border border-border bg-white p-6"
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(new FormData(e.currentTarget));
      }}
    >
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Sous-total</span>
          <span>{formatMoney(subtotalCents, currency)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Livraison</span>
          <span>{formatMoney(shippingCents, currency)}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
          <span>Total</span>
          <span>{formatMoney(totalCents, currency)}</span>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input id="firstName" name="firstName" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input id="lastName" name="lastName" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" name="phone" />
        </div>
      </div>
      <Button
        type="submit"
        disabled={isLoading || lines.length === 0}
        className="btn-chariow-primary h-11 w-full rounded-2xl font-semibold"
      >
        {isLoading ? "Validation..." : "Valider la commande"}
      </Button>
    </form>
  );
}
