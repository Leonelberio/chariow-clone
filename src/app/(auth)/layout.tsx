import Link from "next/link";
import { LogoChariow } from "@/components/shared/LogoChariow";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="px-4 py-6 sm:px-8">
        <LogoChariow />
      </header>
      <div className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md rounded-3xl border border-border bg-white p-8 shadow-sm">
          {children}
        </div>
      </div>
      <footer className="pb-8 text-center text-xs text-muted-foreground">
        <Link href="/">Retour à l’accueil</Link>
      </footer>
    </div>
  );
}
