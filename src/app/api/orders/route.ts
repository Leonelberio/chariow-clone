import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { orderService } from "@/modules/orders/order.service";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const tenant = await requireTenant(session.user.id);
  const orders = await orderService.list(tenant.organization.id);
  return NextResponse.json({ data: orders });
}
