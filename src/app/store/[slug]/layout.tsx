import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { storeService } from "@/modules/stores/store.service";
import { StoreHeader } from "@/components/storefront/StoreHeader";
import { StoreCartInit } from "@/components/storefront/StoreCartInit";

type StoreLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const store = await storeService.getPublicBySlug(slug);
  if (!store) {
    return { title: "Boutique" };
  }

  return {
    title: store.name,
    description: store.description ?? `${store.name} — boutique en ligne`,
    openGraph: {
      title: store.name,
      description: store.description ?? undefined,
    },
  };
}

export default async function StoreLayout({ children, params }: StoreLayoutProps) {
  const { slug } = await params;
  const store = await storeService.getPublicBySlug(slug);

  if (!store || !store.published) {
    notFound();
  }

  return (
    <div
      className="min-h-screen bg-background"
      style={{ ["--store-primary" as string]: store.primaryColor }}
    >
      <StoreCartInit storeSlug={slug} />
      <StoreHeader store={store} />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
