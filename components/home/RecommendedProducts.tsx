"use client";

import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/dummy-data";
import Link from "next/link";
import {ChevronRight} from "lucide-react";

export default function RecommendedProducts() {
  const items = PRODUCTS.slice(0, 6);

  return (
    <section className="py-6">
      <Link href="/" className="mb-4 flex items-center justify-center">
        <h2 className="text-lg font-bold text-foreground md:text-2xl">
          고객님을 위한 오늘 추천상품
        </h2>
        <ChevronRight className="h-8 w-8 text-foreground" />
      </Link>

      {/* Mobile: horizontal scroll */}
      <div className="flex gap-1 overflow-x-auto scrollbar-hide md:hidden pb-2">
        {items.map((product) => (
          <div key={product.id} className="w-[160px] flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden grid-cols-6 gap-4 md:grid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
