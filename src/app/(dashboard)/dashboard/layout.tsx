import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { getActiveTenantForUser } from "@/lib/tenant/get-tenant";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const tenant = await getActiveTenantForUser(session.user.id);
  if (!tenant) {
    redirect("/onboarding");
  }

  if (tenant.organization.onboarding?.currentStep !== "COMPLETED") {
    redirect("/onboarding");
  }

  return (
    <DashboardShell organizationName={tenant.organization.name}>
      {children}
    </DashboardShell>
  );
}
