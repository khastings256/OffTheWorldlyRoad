import { createCheckout } from "@/lib/checkout";
import { MAX_QUANTITY } from "@/lib/cart-constants";

describe("createCheckout", () => {
  it("computes correct totals from canonical prices", async () => {
    const result = await createCheckout([
      { productId: "product-1", quantity: 2 },
      { productId: "product-2", quantity: 1 },
    ]);
    expect(result.items).toHaveLength(2);
    expect(result.totalItems).toBe(3);
    expect(result.totalPrice).toBeCloseTo(84.97, 2); // 2*24.99 + 34.99
  });

  it("ignores any price sent by client — uses canonical price from catalog", async () => {
    // The server action only accepts productId + quantity.
    // Even if a malicious client had tried to pass a fake price,
    // the server looks up the real price from dummy-data.
    const result = await createCheckout([
      { productId: "product-1", quantity: 1 },
    ]);
    expect(result.items[0].price).toBe(24.99);
    expect(result.totalPrice).toBeCloseTo(24.99, 2);
  });

  it("rejects unknown product IDs", async () => {
    await expect(
      createCheckout([{ productId: "fake-product", quantity: 1 }])
    ).rejects.toThrow("Invalid product");
  });

  it("rejects negative quantity", async () => {
    await expect(
      createCheckout([{ productId: "product-1", quantity: -1 }])
    ).rejects.toThrow("Invalid quantity");
  });

  it("rejects zero quantity", async () => {
    await expect(
      createCheckout([{ productId: "product-1", quantity: 0 }])
    ).rejects.toThrow("Invalid quantity");
  });

  it("rejects oversized quantity", async () => {
    await expect(
      createCheckout([{ productId: "product-1", quantity: MAX_QUANTITY + 1 }])
    ).rejects.toThrow("exceeds maximum");
  });

  it("rejects non-integer quantity", async () => {
    await expect(
      createCheckout([{ productId: "product-1", quantity: 1.5 }])
    ).rejects.toThrow("Invalid quantity");
  });

  it("rejects empty cart", async () => {
    await expect(createCheckout([])).rejects.toThrow("Cart is empty");
  });

  it("rejects null/undefined items array", async () => {
    await expect(createCheckout(null as unknown as [])).rejects.toThrow(
      "Cart is empty"
    );
  });
});
