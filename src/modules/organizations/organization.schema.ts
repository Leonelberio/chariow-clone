import { z } from "zod";
import { BusinessType, OnboardingStep, OrganizationRole } from "@prisma/client";

export const createOrganizationSchema = z.object({
  name: z.string().min(2).max(120),
});

export const onboardingBusinessSchema = z.object({
  name: z.string().min(2),
  legalName: z.string().optional(),
  businessType: z.nativeEnum(BusinessType),
  description: z.string().max(2000).optional(),
  phone: z.string().optional(),
  email: z.email().optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  currency: z.string().length(3),
  language: z.string().min(2).max(5),
});

export const onboardingBrandingSchema = z.object({
  logoUrl: z.url().optional().or(z.literal("")),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
});

export const inviteMemberSchema = z.object({
  email: z.email(),
  role: z.nativeEnum(OrganizationRole),
});

export const onboardingStepSchema = z.nativeEnum(OnboardingStep);

export type OnboardingBusinessInput = z.infer<typeof onboardingBusinessSchema>;
