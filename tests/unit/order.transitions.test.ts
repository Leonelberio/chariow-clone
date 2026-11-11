import { describe, expect, it } from "vitest";
import { canTransition } from "@/modules/orders/order.transitions";

describe("order status transitions", () => {
  it("allows pending to awaiting payment", () => {
    expect(canTransition("PENDING", "AWAITING_PAYMENT")).toBe(true);
  });

  it("blocks delivered to pending", () => {
    expect(canTransition("DELIVERED", "PENDING")).toBe(false);
  });

  it("allows paid to confirmed", () => {
    expect(canTransition("PAID", "CONFIRMED")).toBe(true);
  });
});
