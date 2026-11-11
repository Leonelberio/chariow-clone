"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  imageUrl?: string;
  quantity: number;
  variantId?: string;
  variantName?: string;
};

type CartState = {
  storeSlug: string | null;
  lines: CartLine[];
  setStore: (slug: string) => void;
  addLine: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  removeLine: (productId: string, variantId?: string) => void;
  clear: () => void;
  subtotalCents: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      storeSlug: null,
      lines: [],
      setStore: (slug) => set({ storeSlug: slug }),
      addLine: (line, quantity = 1) => {
        const { lines, storeSlug } = get();
        if (storeSlug && storeSlug !== get().storeSlug) {
          set({ lines: [], storeSlug });
        }
        const existing = lines.find(
          (l) =>
            l.productId === line.productId && l.variantId === line.variantId,
        );
        if (existing) {
          set({
            lines: lines.map((l) =>
              l.productId === line.productId && l.variantId === line.variantId
                ? { ...l, quantity: l.quantity + quantity }
                : l,
            ),
          });
          return;
        }
        set({ lines: [...lines, { ...line, quantity }] });
      },
      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeLine(productId, variantId);
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.productId === productId && l.variantId === variantId
              ? { ...l, quantity }
              : l,
          ),
        });
      },
      removeLine: (productId, variantId) => {
        set({
          lines: get().lines.filter(
            (l) =>
              !(l.productId === productId && l.variantId === variantId),
          ),
        });
      },
      clear: () => set({ lines: [], storeSlug: null }),
      subtotalCents: () =>
        get().lines.reduce(
          (acc, line) => acc + line.priceCents * line.quantity,
          0,
        ),
    }),
    { name: "chariow-cart" },
  ),
);
