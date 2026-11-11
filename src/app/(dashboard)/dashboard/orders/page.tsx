import Link from "next/link";
import { auth } from "@/lib/auth/auth";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { orderService } from "@/modules/orders/order.service";
import { formatMoney } from "@/lib/utils/money";
import { Badge } from "@/components/ui/badge";

export default async function OrdersPage() {
  const session = await auth();
  const tenant = await requireTenant(session!.user!.id);
  const orders = await orderService.list(tenant.organization.id);
  const currency = tenant.organization.currency;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Commandes</h1>
        <p className="text-sm text-muted-foreground">
          Recherche, filtres et transitions de statut métier.
        </p>
      </div>
      {orders.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-white p-10 text-center text-sm text-muted-foreground">
          Aucune commande reçue.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Commande</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="font-medium hover:underline"
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {order.customerName ?? order.customerEmail}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">{order.status}</Badge>
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {formatMoney(order.totalCents, currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
