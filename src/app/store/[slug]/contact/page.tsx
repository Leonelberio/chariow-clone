import { notFound } from "next/navigation";
import { storeService } from "@/modules/stores/store.service";

type ContactPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function StoreContactPage({ params }: ContactPageProps) {
  const { slug } = await params;
  const store = await storeService.getPublicBySlug(slug);
  if (!store) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-xl space-y-4 rounded-2xl border border-border bg-white p-8">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {store.contactEmail && <li>Email : {store.contactEmail}</li>}
        {store.contactPhone && <li>Téléphone : {store.contactPhone}</li>}
      </ul>
    </div>
  );
}
