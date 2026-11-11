import { auth } from "@/lib/auth/auth";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { analyticsService } from "@/modules/analytics/analytics.service";
import { formatMoney } from "@/lib/utils/money";

export default async function AnalyticsPage() {
  const session = await auth();
  const tenant = await requireTenant(session!.user!.id);
  const summary = await analyticsService.getDashboardSummary(tenant.organization.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-6">
          <p className="text-xs text-muted-foreground">Revenu validé</p>
          <p className="mt-2 text-3xl font-semibold">
            {formatMoney(summary.revenueCents, tenant.organization.currency)}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-6">
          <p className="text-xs text-muted-foreground">Taux de conversion (MVP)</p>
          <p className="mt-2 text-3xl font-semibold">
            {summary.customerCount > 0
              ? `${Math.round((summary.orderCount / summary.customerCount) * 100)}%`
              : "—"}
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Graphiques Recharts et analytics avancés prévus en Phase 2.
      </p>
    </div>
  );
}
