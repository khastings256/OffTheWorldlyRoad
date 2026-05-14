"use client";

import { useState, useCallback } from "react";
import { useCart } from "@/lib/cart";
import type { ProductItem } from "@/lib/dummy-data";

export function AddToCartButton({ product }: { product: ProductItem }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback(() => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
    });
    setAdded(true);
    const timer = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [addItem, product]);

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="mt-2 w-full sm:w-auto bg-primary text-inverse rounded-lg px-6 py-3
                 text-base font-medium
                 hover:bg-primary-muted
                 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none
                 transition-colors duration-200"
      aria-label={`Add ${product.name} to cart`}
      data-testid="add-to-cart-detail"
    >
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}
