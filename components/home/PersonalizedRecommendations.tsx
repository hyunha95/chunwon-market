"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
import { usePersonalizedRecommendationsWithDetails } from "@/hooks/use-product-recommendations";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUserId } from "@/lib/user";

interface PersonalizedRecommendationsProps {
  userId?: string;
  limit?: number;
}

export default function PersonalizedRecommendations({
  userId: userIdProp,
  limit = 6,
}: PersonalizedRecommendationsProps) {
  const { user, isLoading: isAuthLoading } = useUser();
  const [userId, setUserId] = useState<string>("");

  // Auth0 로딩 완료 후 userId 결정: 로그인 → user.sub, 비로그인 → 임시 ID
  useEffect(() => {
    if (isAuthLoading) return;
    setUserId(userIdProp || user?.sub || getUserId());
  }, [userIdProp, user?.sub, isAuthLoading]);

  const { recommendations, products, isLoading, error } =
    usePersonalizedRecommendationsWithDetails(userId, limit);

  // 로딩 상태
  if (isLoading) {
    return (
      <section className="py-6">
        <div className="mb-4 flex items-center justify-center">
          <h2 className="text-lg font-bold text-foreground md:text-2xl">
            고객님을 위한 AI 추천상품
          </h2>
          <ChevronRight className="h-8 w-8 text-foreground" />
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">추천 상품을 불러오는 중...</span>
        </div>
      </section>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <section className="py-6">
        <div className="mb-4 flex items-center justify-center">
          <h2 className="text-lg font-bold text-foreground md:text-2xl">
            고객님을 위한 AI 추천상품
          </h2>
          <ChevronRight className="h-8 w-8 text-foreground" />
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-muted-foreground">
            추천 상품을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.
          </p>
        </div>
      </section>
    );
  }

  // 추천 상품이 없는 경우
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-6">
      <Link href="/" className="mb-4 flex items-center justify-center">
        <h2 className="text-lg font-bold text-foreground md:text-2xl">
          고객님을 위한 AI 추천상품
        </h2>
        <ChevronRight className="h-8 w-8 text-foreground" />
      </Link>

      {/* Mobile: horizontal scroll */}
      <div className="flex gap-1 overflow-x-auto scrollbar-hide md:hidden pb-2">
        {products.map((product) => (
          <div key={product.id} className="w-[160px] flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden grid-cols-6 gap-4 md:grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 디버깅용 - 개발 환경에서만 표시 */}
      {process.env.NODE_ENV === 'development' && recommendations && (
        <div className="mt-4 rounded-lg bg-muted p-4 text-xs">
          <p className="font-semibold mb-2">🔍 추천 점수 (개발 모드)</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {recommendations.map((rec) => (
              <div key={rec.productId} className="text-muted-foreground">
                상품 #{rec.productId}: {rec.score.toFixed(2)}점
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
