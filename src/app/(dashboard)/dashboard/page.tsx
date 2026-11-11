import Link from "next/link";
import { auth } from "@/lib/auth/auth";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { analyticsService } from "@/modules/analytics/analytics.service";
import { storeRepository } from "@/modules/stores/store.repository";
import { formatMoney } from "@/lib/utils/money";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function DashboardHomePage() {
  const session = await auth();
  const tenant = await requireTenant(session!.user!.id);
  const summary = await analyticsService.getDashboardSummary(tenant.organization.id);
  const store = await storeRepository.findByOrganizationId(tenant.organization.id);
  const currency = tenant.organization.currency;

  const cards = [
    { label: "Commandes", value: summary.orderCount.toString() },
    {
      label: "Chiffre d’affaires",
      value: formatMoney(summary.revenueCents, currency),
    },
    { label: "Produits publiés", value: summary.productCount.toString() },
    { label: "Clients", value: summary.customerCount.toString() },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Vue d’ensemble</h1>
          <p className="text-sm text-muted-foreground">
            Suivez vos ventes et gérez {tenant.organization.name}.
          </p>
        </div>
        {store && (
          <Button
            variant="outline"
            className="rounded-xl"
            render={
              <Link
                href={store.published ? `/store/${store.slug}` : "/dashboard/settings"}
                target={store.published ? "_blank" : undefined}
              />
            }
          >
            {store.published ? "Voir la boutique" : "Publier la boutique"}
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label} className="rounded-2xl border-border bg-white">
            <CardContent className="p-5">
              <p className="text-xs font-medium text-muted-foreground">{card.label}</p>
              <p className="mt-2 text-2xl font-semibold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl border-border">
        <CardHeader>
          <CardTitle className="text-base">Dernières commandes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {summary.recentOrders.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune commande pour le moment.</p>
          ) : (
            summary.recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border px-3 py-2 text-sm"
              >
                <div>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.customerName ?? "Client invité"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{order.status}</Badge>
                  <span className="font-semibold">
                    {formatMoney(order.totalCents, currency)}
                  </span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
