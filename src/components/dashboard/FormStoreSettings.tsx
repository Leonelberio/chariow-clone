"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Store, StoreTheme } from "@prisma/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateStoreSettingsAction } from "@/modules/organizations/organization.actions";

type FormStoreSettingsProps = {
  store: Store;
};

export function FormStoreSettings({ store }: FormStoreSettingsProps) {
  const router = useRouter();
  const [theme, setTheme] = useState<StoreTheme>(store.theme);
  const [published, setPublished] = useState(store.published);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    const result = await updateStoreSettingsAction(
      {
        name: String(formData.get("name") ?? store.name),
        slug: String(formData.get("slug") ?? store.slug),
        description: String(formData.get("description") ?? ""),
        primaryColor: String(formData.get("primaryColor") ?? store.primaryColor),
        theme,
        contactEmail: String(formData.get("contactEmail") ?? ""),
        contactPhone: String(formData.get("contactPhone") ?? ""),
        deliveryInfo: String(formData.get("deliveryInfo") ?? ""),
        paymentInfo: String(formData.get("paymentInfo") ?? ""),
        published,
      },
      store.id,
    );
    setIsLoading(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Boutique mise à jour");
    router.refresh();
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(new FormData(e.currentTarget));
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nom boutique</Label>
          <Input id="name" name="name" defaultValue={store.name} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug URL</Label>
          <Input id="slug" name="slug" defaultValue={store.slug} required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={store.description ?? ""} rows={3} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="primaryColor">Couleur principale</Label>
          <Input id="primaryColor" name="primaryColor" defaultValue={store.primaryColor} />
        </div>
        <div className="space-y-2">
          <Label>Thème vitrine</Label>
          <Select value={theme} onValueChange={(v) => setTheme(v as StoreTheme)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MODERN">Modern</SelectItem>
              <SelectItem value="CLASSIC">Classic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Email boutique</Label>
          <Input
            id="contactEmail"
            name="contactEmail"
            defaultValue={store.contactEmail ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactPhone">Téléphone</Label>
          <Input
            id="contactPhone"
            name="contactPhone"
            defaultValue={store.contactPhone ?? ""}
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="deliveryInfo">Livraison</Label>
          <Textarea
            id="deliveryInfo"
            name="deliveryInfo"
            defaultValue={store.deliveryInfo ?? ""}
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="paymentInfo">Paiement</Label>
          <Textarea
            id="paymentInfo"
            name="paymentInfo"
            defaultValue={store.paymentInfo ?? ""}
            rows={2}
          />
        </div>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
        <div>
          <p className="text-sm font-medium">Publier la boutique</p>
          <p className="text-xs text-muted-foreground">
            Rendre la vitrine accessible sur /store/[slug]
          </p>
        </div>
        <Switch checked={published} onCheckedChange={setPublished} />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="btn-chariow-primary rounded-2xl font-semibold"
      >
        {isLoading ? "Enregistrement..." : "Enregistrer"}
      </Button>
    </form>
  );
}
