import { auth } from "@/lib/auth/auth";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { prisma } from "@/lib/db/prisma";

export default async function CustomersPage() {
  const session = await auth();
  const tenant = await requireTenant(session!.user!.id);
  const customers = await prisma.customer.findMany({
    where: { organizationId: tenant.organization.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Clients</h1>
      {customers.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Les profils sont créés automatiquement au checkout.
        </p>
      ) : (
        <ul className="space-y-2">
          {customers.map((customer) => (
            <li
              key={customer.id}
              className="rounded-xl border border-border bg-white px-4 py-3 text-sm"
            >
              <p className="font-medium">
                {[customer.firstName, customer.lastName].filter(Boolean).join(" ") ||
                  customer.email}
              </p>
              <p className="text-muted-foreground">{customer.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
