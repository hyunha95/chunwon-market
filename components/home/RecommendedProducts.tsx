"use client";

import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/dummy-data";

export default function RecommendedProducts() {
  const items = PRODUCTS.slice(0, 8);

  return (
    <section className="py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground md:text-xl">
          오늘 추천 상품
        </h2>
        <button className="text-xs text-muted-foreground hover:text-accent transition-colors">
          전체보기 &gt;
        </button>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide md:hidden pb-2">
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
