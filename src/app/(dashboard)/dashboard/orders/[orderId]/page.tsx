import { notFound } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { orderService } from "@/modules/orders/order.service";
import { formatMoney } from "@/lib/utils/money";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type OrderDetailPageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = await params;
  const session = await auth();
  const tenant = await requireTenant(session!.user!.id);
  const order = await orderService.getById(tenant.organization.id, orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold">{order.orderNumber}</h1>
        <Badge>{order.status}</Badge>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Client</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>{order.customerName ?? "—"}</p>
            <p className="text-muted-foreground">{order.customerEmail}</p>
            {order.customerPhone && (
              <p className="text-muted-foreground">{order.customerPhone}</p>
            )}
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Montants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>Sous-total : {formatMoney(order.subtotalCents, order.currency)}</p>
            <p>Livraison : {formatMoney(order.shippingCents, order.currency)}</p>
            <p className="text-base font-semibold">
              Total : {formatMoney(order.totalCents, order.currency)}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">Articles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between rounded-xl border border-border px-3 py-2"
            >
              <span>
                {item.productName}
                {item.variantName ? ` — ${item.variantName}` : ""} × {item.quantity}
              </span>
              <span className="font-medium">
                {formatMoney(item.lineTotalCents, order.currency)}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
