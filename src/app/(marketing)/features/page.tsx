export default function FeaturesPage() {
  const items = [
    "Authentification multi-organisation et rôles",
    "Store builder avec thèmes Classic & Modern",
    "Catalogue produits / services",
    "Boutique publique SEO-friendly",
    "Panier & checkout avec recalcul serveur",
    "Gestion des commandes et paiements manuels",
    "Dashboard ventes & analytics MVP",
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="mb-4 text-3xl font-semibold">Fonctionnalités Phase 1</h1>
      <p className="mb-8 text-muted-foreground">
        Tout ce dont une PME a besoin pour vendre en ligne, sans ERP complet.
      </p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
