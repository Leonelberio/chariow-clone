"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth/auth";
import { authService } from "@/modules/auth/auth.service";
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@/modules/auth/auth.schema";

export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

export async function registerAction(
  input: RegisterInput,
): Promise<ActionResult<{ organizationId: string }>> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Données invalides" };
  }

  try {
    const result = await authService.register(parsed.data);
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
    return {
      success: true,
      data: { organizationId: result.organization.id },
    };
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_EXISTS") {
      return { success: false, error: "Cet email est déjà utilisé" };
    }
    return { success: false, error: "Inscription impossible" };
  }
}

export async function loginAction(input: LoginInput): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Données invalides" };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: "Email ou mot de passe incorrect" };
    }
    return { success: false, error: "Connexion impossible" };
  }
}
