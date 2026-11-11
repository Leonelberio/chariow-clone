import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Mot de passe oublié</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          La réinitialisation par email sera branchée avec Resend en Phase 1.1.
        </p>
      </div>
      <Button
        variant="secondary"
        className="w-full rounded-xl"
        render={<Link href="/login" />}
      >
        Retour à la connexion
      </Button>
    </div>
  );
}
