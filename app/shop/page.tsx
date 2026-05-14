"use client";

import { Carousel } from "@/components/carousel";
import { ProductCard } from "@/components/cards/ProductCard";
import { products, type ProductItem } from "@/lib/dummy-data";

export default function ShopPage() {
  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <Carousel<ProductItem>
        items={products}
        title="OTWR Gear"
        subtitle="Curated essentials for the trail and beyond"
        visibleCount={3}
        renderItem={(item) => <ProductCard product={item} />}
      />
    </main>
  );
}
