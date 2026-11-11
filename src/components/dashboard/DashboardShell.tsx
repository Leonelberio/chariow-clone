import Link from "next/link";
import { LogoChariow } from "@/components/shared/LogoChariow";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { Button } from "@/components/ui/button";

type DashboardShellProps = {
  children: React.ReactNode;
  organizationName: string;
};

export function DashboardShell({
  children,
  organizationName,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-64 shrink-0 border-r border-border bg-white px-4 py-6 lg:block">
          <div className="mb-8">
            <LogoChariow href="/dashboard" />
            <p className="mt-3 truncate text-xs font-medium text-muted-foreground">
              {organizationName}
            </p>
          </div>
          <DashboardNav />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-border bg-white px-4 sm:px-6 lg:hidden">
            <LogoChariow href="/dashboard" className="h-7 w-auto" />
            <Button variant="outline" size="sm" render={<Link href="/dashboard/settings" />}>
              Réglages
            </Button>
          </header>
          <main className="flex-1 px-4 py-6 sm:px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
