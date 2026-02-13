'use client';

import { useSimilarProductsWithDetails } from '@/hooks/use-product-recommendations';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from "@/components/product/ProductCard";

interface SimilarProductsProps {
  productId: number;
  limit?: number;
}

export function SimilarProducts({ productId, limit = 6 }: SimilarProductsProps) {
  const { recommendations, products, isLoading, error } = useSimilarProductsWithDetails(productId, limit);

  if (error) {
    console.error('유사 상품 추천 조회 실패:', error);
    return null;
  }

  if (isLoading) {
    return (
      <section className="py-8">
        <h2 className="text-xl font-bold mb-4 px-4">함께 보면 좋은 상품</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between px-4 mb-4">
          <h2 className="text-xl font-bold">함께 보면 좋은 상품</h2>
          {process.env.NODE_ENV === 'development' && (
            <span className="text-xs text-gray-500">
              API 기반 추천 ({recommendations.length}개)
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
          {products.map((product, index) => {
            const recommendation = recommendations?.find(rec => rec.productId === product.id);
            return (
              <div key={product.id} className="relative">
                <ProductCard product={product} />

                {/* 개발 모드에서 추천 점수 표시 */}
                {process.env.NODE_ENV === 'development' && recommendation && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow">
                    {recommendation.score.toFixed(1)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 추천 이유 (개발 모드) */}
        {process.env.NODE_ENV === 'development' && recommendations && recommendations.length > 0 && (
          <div className="mt-4 px-4 text-xs text-gray-600">
            추천 이유: {recommendations[0].reason}
          </div>
        )}
      </div>
    </section>
  );
}
