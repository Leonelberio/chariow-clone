"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessType } from "@prisma/client";
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
import { saveOnboardingBusinessAction } from "@/modules/organizations/organization.actions";
import {
  onboardingBusinessSchema,
  type OnboardingBusinessInput,
} from "@/modules/organizations/organization.schema";

const businessTypeLabels: Record<BusinessType, string> = {
  RETAIL: "Commerce de détail",
  RESTAURANT: "Restaurant",
  SERVICES: "Services",
  DISTRIBUTION: "Distribution",
  TRAINING: "Formation",
  OTHER: "Autre",
};

export function FormOnboardingBusiness() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<OnboardingBusinessInput>({
    resolver: zodResolver(onboardingBusinessSchema),
    defaultValues: {
      name: "",
      businessType: "RETAIL",
      currency: "EUR",
      language: "fr",
    },
  });

  async function onSubmit(values: OnboardingBusinessInput) {
    setIsLoading(true);
    const result = await saveOnboardingBusinessAction(values);
    setIsLoading(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Votre boutique est prête");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Nom commercial</Label>
          <Input id="name" {...form.register("name")} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Type d’activité</Label>
          <Select
            value={form.watch("businessType")}
            onValueChange={(value) =>
              form.setValue("businessType", value as BusinessType)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(businessTypeLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" rows={4} {...form.register("description")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" {...form.register("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email entreprise</Label>
          <Input id="email" type="email" {...form.register("email")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Ville</Label>
          <Input id="city" {...form.register("city")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Pays</Label>
          <Input id="country" {...form.register("country")} />
        </div>
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="btn-chariow-primary h-11 rounded-2xl px-8 font-semibold"
      >
        {isLoading ? "Enregistrement..." : "Générer ma boutique"}
      </Button>
    </form>
  );
}
