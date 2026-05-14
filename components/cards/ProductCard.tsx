"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import type { ProductItem } from "@/lib/dummy-data";

export interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleCardClick = useCallback(() => {
    router.push(`/shop/${product.id}`);
  }, [router, product.id]);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
      });
      setAdded(true);
      const timer = setTimeout(() => setAdded(false), 1500);
      return () => clearTimeout(timer);
    },
    [addItem, product]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      // Don't trigger card navigation when a child button/link is focused
      if (e.target !== e.currentTarget) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick();
      }
    },
    [handleCardClick]
  );

  return (
    <article
      className="group bg-surface border border-border rounded-xl overflow-hidden
                 hover:shadow-md hover:-translate-y-0.5
                 transition-all duration-200 cursor-pointer
                 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none"
      role="group"
      aria-label={product.name}
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      data-testid="product-card"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.imageSrc}
          alt={product.name}
          className="w-full h-full object-cover rounded-t-xl"
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-foreground font-semibold text-base leading-snug">
          {product.name}
        </h3>
        <p className="text-primary font-bold" aria-live="polite">
          ${product.price.toFixed(2)}
        </p>
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-1 w-full bg-primary text-inverse rounded-lg px-4 py-2
                     text-sm font-medium
                     hover:bg-primary-muted
                     focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none
                     transition-colors duration-200"
          aria-label={`Add ${product.name} to cart`}
          data-testid="add-to-cart"
        >
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
