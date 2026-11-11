import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Store, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { chariowDesignSystem } from "@/config/design-system";

export default function MarketingHomePage() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-foreground">
              <Sparkles className="size-3.5" />
              Phase 1 · MVP Commerce
            </span>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Lancez votre boutique, encaissez et pilotez votre activité depuis un
              seul espace.
            </h1>
            <p className="max-w-lg text-base text-muted-foreground">
              {chariowDesignSystem.brandName} Plateforme multi-tenant pensée pour les
              PME : catalogue, commandes, paiements et tableau de bord.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                className="btn-chariow-primary h-11 rounded-2xl px-6 font-semibold"
                render={<Link href="/register" />}
              >
                Créer ma boutique
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="secondary"
                className="btn-chariow-secondary h-11 rounded-xl px-6"
                render={<Link href="/features" />}
              >
                Voir les fonctionnalités
              </Button>
            </div>
          </div>
          <div className="relative rounded-3xl border border-border bg-white p-4 shadow-sm">
            <Image
              src={chariowDesignSystem.images.ogImage}
              alt="Aperçu Chariow"
              width={960}
              height={540}
              className="h-auto w-full rounded-2xl object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Store,
              title: "Boutique en minutes",
              text: "Onboarding guidé, thèmes Classic & Modern, publication en un clic.",
            },
            {
              icon: Wallet,
              title: "Encaissement modulaire",
              text: "Architecture de paiement extensible (manuel dès le MVP, Stripe ready).",
            },
            {
              icon: Sparkles,
              title: "Pilotage clair",
              text: "Commandes, clients, analytics — sans complexité ERP au départ.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm"
            >
              <FeatureHighlight
                icon={<Icon className="size-5 text-primary" />}
                title={title}
                text={text}
              />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function FeatureHighlight({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
  <div className="space-y-3">
    <div className="inline-flex rounded-xl bg-primary/15 p-2">{icon}</div>
    <h2 className="text-base font-semibold">{title}</h2>
    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
  );
}
