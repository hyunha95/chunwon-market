"use client";

import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { useSimilarProductsWithDetails } from "@/hooks/use-product-recommendations";

interface RelatedProductsProps {
  productId: string;
  limit?: number;
}

export default function RelatedProducts({
  productId,
  limit = 10,
}: RelatedProductsProps) {
  const { recommendations, products, isLoading, error } =
    useSimilarProductsWithDetails(productId, limit);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground md:text-lg">
          함께 보면 좋은 상품
        </h2>
        <Link
          href="#"
          className="flex items-center text-xs text-muted-foreground hover:text-accent"
        >
          전체보기
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="py-8 text-center text-sm text-muted-foreground">
          추천 상품을 불러올 수 없습니다.
        </div>
      ) : products && products.length > 0 ? (
        <>
          {/* Mobile: horizontal scroll */}
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide md:hidden">
            {products.map((p) => (
              <div key={p.id} className="w-36 flex-shrink-0">
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          {/* Desktop: grid */}
          <div className="hidden grid-cols-2 gap-3 md:grid lg:grid-cols-4 xl:grid-cols-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      ) : (
        <div className="py-8 text-center text-sm text-muted-foreground">
          추천 상품이 없습니다.
        </div>
      )}

      {/* 디버깅용 - 개발 환경에서만 표시 */}
      {process.env.NODE_ENV === 'development' && recommendations && recommendations.length > 0 && (
        <div className="mt-4 rounded-lg bg-muted p-3 text-xs">
          <p className="font-semibold mb-2">🔍 추천 점수 (개발 모드)</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {recommendations.map((rec) => (
              <div key={rec.productId} className="text-muted-foreground">
                #{rec.productId}: {rec.score.toFixed(2)}점 - {rec.reason}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
