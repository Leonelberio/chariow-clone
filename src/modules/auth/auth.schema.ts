import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Nom requis"),
    email: z.email("Email invalide"),
    password: z.string().min(8, "Minimum 8 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
