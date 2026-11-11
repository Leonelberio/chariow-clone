"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductType, ProductStatus } from "@prisma/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createProductAction } from "@/modules/catalog/catalog.actions";

export function CardProductCreate() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<ProductType>("PHYSICAL");
  const [status, setStatus] = useState<ProductStatus>("DRAFT");

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    const price = Number(formData.get("price"));
    const result = await createProductAction({
      type,
      status,
      name: String(formData.get("name") ?? ""),
      description: String(formData.get("description") ?? ""),
      priceCents: Math.round(price * 100),
      stockQuantity:
        type === "PHYSICAL" ? Number(formData.get("stock") ?? 0) : undefined,
    });
    setIsLoading(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Produit créé");
    router.refresh();
  }

  return (
    <Card className="rounded-2xl border-border">
      <CardHeader>
        <CardTitle className="text-base">Nouveau produit</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit(new FormData(e.currentTarget));
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as ProductType)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PHYSICAL">Produit physique</SelectItem>
                <SelectItem value="SERVICE">Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Statut</Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as ProductStatus)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Brouillon</SelectItem>
                <SelectItem value="PUBLISHED">Publié</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Prix (€)</Label>
            <Input id="price" name="price" type="number" min="0" step="0.01" required />
          </div>
          {type === "PHYSICAL" && (
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" name="stock" type="number" min="0" defaultValue={0} />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={3} />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="btn-chariow-primary w-full rounded-2xl font-semibold"
          >
            {isLoading ? "Création..." : "Ajouter"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
