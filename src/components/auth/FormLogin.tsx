"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/modules/auth/auth.actions";
import { loginSchema, type LoginInput } from "@/modules/auth/auth.schema";

export function FormLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginInput) {
    setIsLoading(true);
    const result = await loginAction(values);
    setIsLoading(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Bon retour !");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...form.register("email")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          {...form.register("password")}
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="btn-chariow-primary h-11 w-full rounded-2xl font-semibold"
      >
        {isLoading ? "Connexion..." : "Se connecter"}
      </Button>
    </form>
  );
}
