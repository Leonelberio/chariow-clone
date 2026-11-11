import { organizationRepository } from "@/modules/organizations/organization.repository";
import { storeService } from "@/modules/stores/store.service";
import type { OnboardingBusinessInput } from "@/modules/organizations/organization.schema";

export const organizationService = {
  createForOwner(userId: string, input: { name: string }) {
    return organizationRepository.createWithOwner({
      name: input.name,
      ownerUserId: userId,
    });
  },

  async completeBusinessStep(
    organizationId: string,
    input: OnboardingBusinessInput,
  ) {
    await organizationRepository.updateOrganization(organizationId, {
      name: input.name,
      legalName: input.legalName,
      businessType: input.businessType,
      description: input.description,
      phone: input.phone,
      email: input.email,
      address: input.address,
      country: input.country,
      city: input.city,
      currency: input.currency,
      language: input.language,
    });

    await storeService.ensureStoreForOrganization(organizationId, {
      name: input.name,
      primaryColor: "#FFCC00",
    });

    return organizationRepository.updateOnboarding(organizationId, {
      currentStep: "BRANDING",
      payload: input,
    });
  },

  async completeOnboarding(organizationId: string) {
    await organizationRepository.updateOnboarding(organizationId, {
      currentStep: "COMPLETED",
      completedAt: new Date(),
    });

    return organizationRepository.findById(organizationId);
  },

  listForUser(userId: string) {
    return organizationRepository.listUserMemberships(userId);
  },
};
