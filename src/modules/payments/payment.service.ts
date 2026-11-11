import { prisma } from "@/lib/db/prisma";
import { manualPaymentProvider } from "@/modules/payments/providers/manual.provider";

const providers = {
  MANUAL: manualPaymentProvider,
} as const;

export const paymentService = {
  async createManualPayment(orderId: string, amountCents: number, currency: string) {
    const intent = await providers.MANUAL.createPaymentIntent({
      orderId,
      amountCents,
      currency,
    });

    return prisma.payment.create({
      data: {
        orderId,
        provider: "MANUAL",
        status: "PENDING",
        amountCents,
        currency,
        externalId: intent.externalId,
        metadata: { provider: intent.provider, status: intent.status },
      },
    });
  },

  getProvider(provider: keyof typeof providers) {
    return providers[provider];
  },
};
