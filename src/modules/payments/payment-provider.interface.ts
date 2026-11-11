export type PaymentIntentInput = {
  orderId: string;
  amountCents: number;
  currency: string;
  metadata?: Record<string, string>;
};

export type PaymentIntentResult = {
  provider: string;
  status: "pending" | "succeeded" | "failed";
  externalId?: string;
  clientSecret?: string;
};

export interface PaymentProvider {
  readonly id: string;
  createPaymentIntent(input: PaymentIntentInput): Promise<PaymentIntentResult>;
  capturePayment?(externalId: string): Promise<PaymentIntentResult>;
  refundPayment?(externalId: string): Promise<PaymentIntentResult>;
}
