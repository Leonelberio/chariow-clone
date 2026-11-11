"use client";

import { useEffect } from "react";
import { useCartStore } from "@/hooks/use-cart-store";

export function StoreCartInit({ storeSlug }: { storeSlug: string }) {
  const setStore = useCartStore((s) => s.setStore);

  useEffect(() => {
    setStore(storeSlug);
  }, [setStore, storeSlug]);

  return null;
}
