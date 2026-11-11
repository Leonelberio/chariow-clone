import Link from "next/link";
import { LogoChariow } from "@/components/shared/LogoChariow";
import { chariowDesignSystem } from "@/config/design-system";

export function FooterMarketing() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="space-y-3">
          <LogoChariow href="/" />
          <p className="text-sm text-muted-foreground">
            {chariowDesignSystem.brandName}
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Produit</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/features">Fonctionnalités</Link>
            </li>
            <li>
              <Link href="/pricing">Tarifs</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Légal</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/legal/privacy">Confidentialité</Link>
            </li>
            <li>
              <Link href="/legal/terms">CGU</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Support</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="mailto:support@chariow.com">support@chariow.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 Chariow. Tous droits réservés.
      </div>
    </footer>
  );
}
