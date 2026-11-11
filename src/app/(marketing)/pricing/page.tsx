import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="mb-4 text-3xl font-semibold">Tarifs</h1>
      <p className="mb-10 text-muted-foreground">
        MVP : démarrez gratuitement pendant la phase de lancement.
      </p>
      <article className="rounded-3xl border border-border bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-muted-foreground">Starter</p>
        <p className="mt-2 text-4xl font-semibold">
          0€
          <span className="text-base font-normal text-muted-foreground">/mois</span>
        </p>
        <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
          <li>1 organisation · collaborateurs illimités (MVP)</li>
          <li>Boutique publique & checkout</li>
          <li>Paiement manuel / virement</li>
        </ul>
        <Button
          className="btn-chariow-primary mt-8 h-11 rounded-2xl px-6 font-semibold"
          render={<Link href="/register" />}
        >
          Commencer
        </Button>
      </article>
    </div>
  );
}
