import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/dummy-data";
import { AddToCartButton } from "./AddToCartButton";

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <Link
        href="/shop"
        className="inline-flex items-center text-sm text-muted hover:text-foreground transition-colors mb-6"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden border border-border bg-surface">
          <img
            src={product.imageSrc}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {product.name}
          </h1>
          <p className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-muted leading-relaxed">{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}
