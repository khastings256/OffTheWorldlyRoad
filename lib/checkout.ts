"use server";

import { products } from "./dummy-data";
import { MAX_QUANTITY } from "./cart-constants";

export interface CheckoutItem {
  productId: string;
  quantity: number;
}

export interface ValidatedCheckoutItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CheckoutResult {
  items: ValidatedCheckoutItem[];
  totalPrice: number;
  totalItems: number;
}

export async function createCheckout(
  items: CheckoutItem[]
): Promise<CheckoutResult> {
  if (!items || items.length === 0) {
    throw new Error("Cart is empty");
  }

  const validatedItems: ValidatedCheckoutItem[] = [];
  let totalPrice = 0;
  let totalItems = 0;

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`Invalid product: ${item.productId}`);
    }

    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      throw new Error(
        `Invalid quantity for ${item.productId}: must be a positive integer`
      );
    }

    if (item.quantity > MAX_QUANTITY) {
      throw new Error(
        `Invalid quantity for ${item.productId}: exceeds maximum of ${MAX_QUANTITY}`
      );
    }

    validatedItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });

    totalPrice += product.price * item.quantity;
    totalItems += item.quantity;
  }

  return {
    items: validatedItems,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    totalItems,
  };
}
