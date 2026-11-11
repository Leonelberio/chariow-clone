"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/use-cart-store";

type ButtonAddToCartProps = {
  storeSlug: string;
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  imageUrl?: string;
};

export function ButtonAddToCart(props: ButtonAddToCartProps) {
  const addLine = useCartStore((s) => s.addLine);
  const setStore = useCartStore((s) => s.setStore);

  function handleClick() {
    setStore(props.storeSlug);
    addLine({
      productId: props.productId,
      slug: props.slug,
      name: props.name,
      priceCents: props.priceCents,
      imageUrl: props.imageUrl,
    });
    toast.success("Ajouté au panier");
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      className="btn-chariow-primary h-9 w-full rounded-2xl text-sm font-semibold"
    >
      Ajouter au panier
    </Button>
  );
}
