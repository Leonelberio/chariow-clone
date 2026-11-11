import Link from "next/link";
import { FormRegister } from "@/components/auth/FormRegister";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Créer un compte</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Lancez votre boutique en quelques minutes.
        </p>
      </div>
      <FormRegister />
      <p className="text-center text-sm text-muted-foreground">
        Déjà inscrit ?{" "}
        <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
