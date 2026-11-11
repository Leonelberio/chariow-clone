import { hash } from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { organizationService } from "@/modules/organizations/organization.service";
import type { RegisterInput } from "@/modules/auth/auth.schema";

export const authService = {
  async register(input: RegisterInput) {
    const email = input.email.toLowerCase();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error("EMAIL_EXISTS");
    }

    const passwordHash = await hash(input.password, 12);

    const user = await prisma.user.create({
      data: {
        name: input.name,
        email,
        passwordHash,
      },
    });

    const org = await organizationService.createForOwner(user.id, {
      name: input.name,
    });

    return { user, organization: org };
  },
};
