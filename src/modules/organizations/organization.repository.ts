import { prisma } from "@/lib/db/prisma";
import type { OrganizationRole } from "@prisma/client";

export const organizationRepository = {
  findById(id: string) {
    return prisma.organization.findUnique({
      where: { id },
      include: { store: true, onboarding: true },
    });
  },

  findMember(organizationId: string, userId: string) {
    return prisma.organizationMember.findUnique({
      where: {
        organizationId_userId: { organizationId, userId },
      },
    });
  },

  listUserMemberships(userId: string) {
    return prisma.organizationMember.findMany({
      where: { userId, active: true },
      include: { organization: { include: { store: true } } },
      orderBy: { createdAt: "asc" },
    });
  },

  createWithOwner(params: {
    name: string;
    ownerUserId: string;
    extra?: Partial<{
      legalName: string;
      businessType: import("@prisma/client").BusinessType;
      email: string;
    }>;
  }) {
    return prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          name: params.name,
          legalName: params.extra?.legalName,
          businessType: params.extra?.businessType,
          email: params.extra?.email,
          onboarding: {
            create: { currentStep: "WELCOME", payload: {} },
          },
        },
      });

      await tx.organizationMember.create({
        data: {
          organizationId: organization.id,
          userId: params.ownerUserId,
          role: "OWNER",
        },
      });

      return organization;
    });
  },

  updateOrganization(id: string, data: Record<string, unknown>) {
    return prisma.organization.update({
      where: { id },
      data,
    });
  },

  updateOnboarding(
    organizationId: string,
    data: Partial<{
      currentStep: import("@prisma/client").OnboardingStep;
      payload: object;
      completedAt: Date | null;
    }>,
  ) {
    return prisma.organizationOnboarding.update({
      where: { organizationId },
      data,
    });
  },

  createInvitation(params: {
    organizationId: string;
    email: string;
    role: OrganizationRole;
    token: string;
    expiresAt: Date;
    invitedById: string;
  }) {
    return prisma.invitation.create({ data: params });
  },
};
