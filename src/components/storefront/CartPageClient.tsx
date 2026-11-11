"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/use-cart-store";
import { formatMoney } from "@/lib/utils/money";

export function CartPageClient({
  storeSlug,
  currency,
}: {
  storeSlug: string;
  currency: string;
}) {
  const lines = useCartStore((s) => s.lines);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const subtotal = useCartStore((s) => s.subtotalCents());

  if (lines.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-white p-10 text-center text-sm text-muted-foreground">
        Votre panier est vide.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <ul className="space-y-3">
        {lines.map((line) => (
          <li
            key={`${line.productId}-${line.variantId ?? "base"}`}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-sm"
          >
            <div>
              <p className="font-medium">{line.name}</p>
              <p className="text-muted-foreground">
                {formatMoney(line.priceCents, currency)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  updateQuantity(line.productId, line.quantity - 1, line.variantId)
                }
              >
                −
              </Button>
              <span className="w-6 text-center">{line.quantity}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  updateQuantity(line.productId, line.quantity + 1, line.variantId)
                }
              >
                +
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeLine(line.productId, line.variantId)}
              >
                Retirer
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-white px-4 py-4">
        <p className="text-base font-semibold">
          Sous-total : {formatMoney(subtotal, currency)}
        </p>
        <Button
          className="btn-chariow-primary rounded-2xl font-semibold"
          render={<Link href={`/store/${storeSlug}/checkout`} />}
        >
          Passer au checkout
        </Button>
      </div>
    </div>
  );
}
