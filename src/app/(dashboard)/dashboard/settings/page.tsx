import { notFound } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { storeRepository } from "@/modules/stores/store.repository";
import { FormStoreSettings } from "@/components/dashboard/FormStoreSettings";

export default async function SettingsPage() {
  const session = await auth();
  const tenant = await requireTenant(session!.user!.id);
  const store = await storeRepository.findByOrganizationId(tenant.organization.id);

  if (!store) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Store Builder</h1>
        <p className="text-sm text-muted-foreground">
          {store.name} — <span className="font-mono text-xs">/store/{store.slug}</span>
        </p>
      </div>
      <FormStoreSettings store={store} />
    </div>
  );
}
