import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { getActiveTenantForUser } from "@/lib/tenant/get-tenant";
import { FormOnboardingBusiness } from "@/components/onboarding/FormOnboardingBusiness";

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const tenant = await getActiveTenantForUser(session.user.id);
  if (tenant?.organization.onboarding?.currentStep === "COMPLETED") {
    redirect("/dashboard");
  }

  const organizationName = tenant?.organization.name ?? "Votre entreprise";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="space-y-8 rounded-3xl border border-border bg-white p-8 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Onboarding
          </p>
          <h1 className="mt-2 text-2xl font-semibold">
            Configurez {organizationName}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Vos réponses sont sauvegardées à chaque étape. Nous créerons une boutique
            non publiée automatiquement.
          </p>
        </div>
        <FormOnboardingBusiness />
      </div>
    </div>
  );
}
