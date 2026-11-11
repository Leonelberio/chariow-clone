import Link from "next/link";
import { FormLogin } from "@/components/auth/FormLogin";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Connexion</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Accédez à votre espace entreprise.
        </p>
      </div>
      <FormLogin />
      <p className="text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <Link href="/register" className="font-medium text-foreground underline-offset-4 hover:underline">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}
