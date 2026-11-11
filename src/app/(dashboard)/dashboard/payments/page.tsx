export default function PaymentsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Paiements</h1>
      <p className="text-sm text-muted-foreground">
        Fournisseur manuel actif (MVP). Interface commune prête pour Stripe via{" "}
        <code className="text-xs">payment-provider.interface.ts</code>.
      </p>
    </div>
  );
}
