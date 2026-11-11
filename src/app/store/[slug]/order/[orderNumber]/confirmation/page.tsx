import Link from "next/link";
import { Button } from "@/components/ui/button";

type ConfirmationPageProps = {
  params: Promise<{ slug: string; orderNumber: string }>;
};

export default async function OrderConfirmationPage({
  params,
}: ConfirmationPageProps) {
  const { slug, orderNumber } = await params;

  return (
    <div className="mx-auto max-w-lg space-y-4 rounded-3xl border border-border bg-white p-8 text-center">
      <h1 className="text-2xl font-semibold">Merci pour votre commande</h1>
      <p className="text-sm text-muted-foreground">
        Référence <span className="font-mono font-medium">{orderNumber}</span>
      </p>
      <Button
        className="btn-chariow-primary rounded-2xl font-semibold"
        render={<Link href={`/store/${slug}`} />}
      >
        Retour à la boutique
      </Button>
    </div>
  );
}
