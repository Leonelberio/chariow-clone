import Link from "next/link";
import type { Store } from "@prisma/client";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

type StoreHeaderProps = {
  store: Store;
};

export function StoreHeader({ store }: StoreHeaderProps) {
  return (
    <header
      className="border-b border-border bg-white"
      style={{ borderBottomColor: `${store.primaryColor}33` }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href={`/store/${store.slug}`} className="font-semibold">
          {store.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <Link href={`/store/${store.slug}/catalog`}>Catalogue</Link>
          <Link href={`/store/${store.slug}/contact`}>Contact</Link>
        </nav>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl"
          render={<Link href={`/store/${store.slug}/cart`} />}
        >
          <ShoppingBag className="size-4" />
          Panier
        </Button>
      </div>
    </header>
  );
}
