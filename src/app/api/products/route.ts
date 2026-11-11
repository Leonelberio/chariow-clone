import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { requireTenant } from "@/lib/tenant/get-tenant";
import { catalogService } from "@/modules/catalog/catalog.service";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const tenant = await requireTenant(session.user.id);
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;

  const products = await catalogService.listForOrganization(tenant.organization.id, {
    search: q,
  });

  return NextResponse.json({ data: products });
}
