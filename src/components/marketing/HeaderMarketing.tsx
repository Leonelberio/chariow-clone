import Link from "next/link";
import { LogoChariow } from "@/components/shared/LogoChariow";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function HeaderMarketing() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <LogoChariow />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link href={siteConfig.links.features} className="hover:text-foreground">
            Fonctionnalités
          </Link>
          <Link href={siteConfig.links.pricing} className="hover:text-foreground">
            Tarifs
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" render={<Link href={siteConfig.links.login} />}>
            Connexion
          </Button>
          <Button
            className="btn-chariow-primary h-10 rounded-2xl px-5 font-semibold"
            render={<Link href={siteConfig.links.register} />}
          >
            Démarrer gratuitement
          </Button>
        </div>
      </div>
    </header>
  );
}
