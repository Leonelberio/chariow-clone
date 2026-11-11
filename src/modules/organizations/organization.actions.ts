"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth/auth";
import { ORGANIZATION_COOKIE } from "@/lib/tenant/constants";
import { organizationService } from "@/modules/organizations/organization.service";
import {
  onboardingBusinessSchema,
  type OnboardingBusinessInput,
} from "@/modules/organizations/organization.schema";
import { storeRepository } from "@/modules/stores/store.repository";
import { storeUpdateSchema } from "@/modules/stores/store.schema";
import { storeService } from "@/modules/stores/store.service";

export async function saveOnboardingBusinessAction(
  input: OnboardingBusinessInput,
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const parsed = onboardingBusinessSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: "Données invalides" };
  }

  const memberships = await organizationService.listForUser(session.user.id);
  const organizationId = memberships[0]?.organizationId;
  if (!organizationId) {
    return { success: false as const, error: "Organisation introuvable" };
  }

  await organizationService.completeBusinessStep(organizationId, parsed.data);
  await organizationService.completeOnboarding(organizationId);

  revalidatePath("/dashboard");
  revalidatePath("/onboarding");

  return { success: true as const };
}

export async function switchOrganizationAction(organizationId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const memberships = await organizationService.listForUser(session.user.id);
  const allowed = memberships.some((m) => m.organizationId === organizationId);
  if (!allowed) {
    return { success: false as const, error: "Accès refusé" };
  }

  const cookieStore = await cookies();
  cookieStore.set(ORGANIZATION_COOKIE, organizationId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  revalidatePath("/dashboard");
  return { success: true as const };
}

export async function updateStoreSettingsAction(
  input: unknown,
  storeId: string,
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const parsed = storeUpdateSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: "Données invalides" };
  }

  try {
    await storeService.updateStore(storeId, parsed.data);
    revalidatePath("/dashboard/settings");
    revalidatePath(`/store/${parsed.data.slug}`);
    return { success: true as const };
  } catch {
    return { success: false as const, error: "Mise à jour impossible" };
  }
}

export async function getStoreForActiveTenant() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const memberships = await organizationService.listForUser(session.user.id);
  const orgId = memberships[0]?.organizationId;
  if (!orgId) {
    return null;
  }

  return storeRepository.findByOrganizationId(orgId);
}
