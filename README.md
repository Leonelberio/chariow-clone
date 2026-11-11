# Chariow Clone — SaaS Commerce MVP (Phase 1)

Modular monolith **Next.js App Router** + **PostgreSQL** + **Prisma** + **Auth.js**, aligné sur le cahier des charges Phase 1.

## Stack

- Next.js 16, React 19, TypeScript strict
- Tailwind CSS 4 + shadcn/ui (design system Chariow)
- Prisma ORM, multi-tenant par `organizationId`
- Auth.js (credentials + Prisma adapter)
- TanStack Query, Zustand (panier vitrine)
- Vitest (unit), Playwright (prévu)

## Démarrage

1. Copier `.env.example` vers `.env` et renseigner `DATABASE_URL` + `AUTH_SECRET`.
2. Appliquer le schéma :

```bash
pnpm db:push
```

3. Lancer le dev server :

```bash
pnpm dev
```

## Parcours MVP

1. `/register` → compte + organisation
2. `/onboarding` → infos entreprise + création boutique (non publiée)
3. `/dashboard/products` → publier des produits
4. `/dashboard/settings` → publier la boutique, thème Classic / Modern
5. `/store/[slug]` → vitrine, panier, checkout (prix recalculés serveur)

## Structure

Voir `src/modules/*` (auth, organizations, stores, catalog, orders, checkout, payments, analytics) et `prisma/schema.prisma`.

## Phases suivantes (non implémentées)

CRM avancé, stocks, facturation, WhatsApp, agents IA — architecture prête via modules indépendants.
