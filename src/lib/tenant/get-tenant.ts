import "server-only";

import { cookies } from "next/headers";
import { ORGANIZATION_COOKIE } from "@/lib/tenant/constants";
import { prisma } from "@/lib/db/prisma";
import type {
  Organization,
  OrganizationMember,
  OrganizationOnboarding,
  OrganizationRole,
  Store,
} from "@prisma/client";

export type TenantOrganization = Organization & {
  onboarding: OrganizationOnboarding | null;
  store: Store | null;
};

export type TenantContext = {
  organization: TenantOrganization;
  membership: OrganizationMember;
  role: OrganizationRole;
};

export async function getActiveTenantForUser(
  userId: string,
): Promise<TenantContext | null> {
  const cookieStore = await cookies();
  const orgIdFromCookie = cookieStore.get(ORGANIZATION_COOKIE)?.value;

  const memberships = await prisma.organizationMember.findMany({
    where: { userId, active: true },
    include: {
      organization: { include: { onboarding: true, store: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  if (memberships.length === 0) {
    return null;
  }

  const selected =
    memberships.find((m) => m.organizationId === orgIdFromCookie) ??
    memberships[0];

  return {
    organization: selected.organization,
    membership: selected,
    role: selected.role,
  };
}

export async function requireTenant(userId: string): Promise<TenantContext> {
  const tenant = await getActiveTenantForUser(userId);
  if (!tenant) {
    throw new Error("NO_ORGANIZATION");
  }
  return tenant;
}
