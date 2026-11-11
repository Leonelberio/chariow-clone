import type {
  PaymentIntentInput,
  PaymentIntentResult,
  PaymentProvider,
} from "@/modules/payments/payment-provider.interface";

export const manualPaymentProvider: PaymentProvider = {
  id: "MANUAL",

  async createPaymentIntent(
    input: PaymentIntentInput,
  ): Promise<PaymentIntentResult> {
    return {
      provider: "MANUAL",
      status: "pending",
      externalId: `manual_${input.orderId}`,
    };
  },
};
