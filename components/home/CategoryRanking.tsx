"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS, RANKING_CATEGORIES } from "@/lib/dummy-data";

export default function CategoryRanking() {
  const [activeCategory, setActiveCategory] = useState(RANKING_CATEGORIES[0]);

  // Simulate filtered products by cycling through all products
  const rankedProducts = PRODUCTS.slice(0, 10);

  return (
    <section className="py-6">
      <h2 className="mb-4 text-lg font-bold text-foreground md:text-xl">
        카테고리 랭킹
      </h2>

      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        {/* Category Tabs - Left side */}
        <div className="flex-shrink-0 md:w-[160px]">
          <Tabs
            value={activeCategory}
            onValueChange={setActiveCategory}
            orientation="vertical"
          >
            <TabsList className="flex h-auto flex-row flex-wrap gap-1 bg-transparent md:flex-col md:items-stretch">
              {RANKING_CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="justify-start rounded-md border border-border px-3 py-2 text-xs font-normal text-muted-foreground data-[state=active]:border-secondary data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Ranking List - Right side */}
        <div className="flex-1">
          <div className="space-y-2">
            {rankedProducts.map((product, idx) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-2 transition-colors hover:bg-secondary"
              >
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-sm font-bold text-foreground">
                  {idx + 1}
                </span>
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded bg-secondary text-[8px] text-muted-foreground">
                  IMG
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-normal text-foreground md:text-sm">
                    {product.name}
                  </p>
                  <p className="text-xs font-bold text-foreground">
                    {product.price.toLocaleString()}원
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
