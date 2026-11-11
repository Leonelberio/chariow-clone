"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Vue d’ensemble", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Produits", icon: Package },
  { href: "/dashboard/orders", label: "Commandes", icon: ShoppingBag },
  { href: "/dashboard/customers", label: "Clients", icon: Users },
  { href: "/dashboard/payments", label: "Paiements", icon: CreditCard },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {links.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/dashboard"
            ? pathname === href
            : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary/15 text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
