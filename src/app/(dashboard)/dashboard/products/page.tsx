import { auth } from "@/lib/auth/auth";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { catalogService } from "@/modules/catalog/catalog.service";
import { formatMoney } from "@/lib/utils/money";
import { CardProductCreate } from "@/components/dashboard/CardProductCreate";
import { Badge } from "@/components/ui/badge";

export default async function ProductsPage() {
  const session = await auth();
  const tenant = await requireTenant(session!.user!.id);
  const products = await catalogService.listForOrganization(tenant.organization.id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Produits & services</h1>
        <p className="text-sm text-muted-foreground">
          CRUD catalogue, statuts brouillon / publié / archivé.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
        <section className="space-y-3">
          {products.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-white p-8 text-center text-sm text-muted-foreground">
              Aucun produit. Créez votre premier article à droite.
            </p>
          ) : (
            products.map((product) => (
              <article
                key={product.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-white px-4 py-3"
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.slug}</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Badge variant="secondary">{product.status}</Badge>
                  <span className="font-semibold">
                    {formatMoney(product.priceCents, tenant.organization.currency)}
                  </span>
                </div>
              </article>
            ))
          )}
        </section>
        <CardProductCreate />
      </div>
    </div>
  );
}
