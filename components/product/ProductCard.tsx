"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Heart,
  ShoppingBag,
  Truck,
  Star,
} from "lucide-react";
import type { Product } from "@/lib/dummy-data";
import {Black_Han_Sans} from 'next/font/google'

const blackHanSans = Black_Han_Sans({ subsets: ['latin'], weight: '400' })

interface ProductCardProps {
  product: Product;
  rank?: number;
}

function formatReviewCount(n: number) {
  // 천원마켓처럼 큰 수는 9,999+로 보이게
  if (n >= 9999) return "9,999+";
  return n.toLocaleString("ko-KR");
}

export default function ProductCard({ product, rank }: ProductCardProps) {
  const [liked, setLiked] = useState(false);

  const onToggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((v) => !v);
  };

  const onAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: 장바구니 로직 연결
  };

  // 예시: 실제 Product 타입에 flags가 있으면 그걸로 교체
  const flags: Array<"택배" | "픽업" | "오늘"> = ["택배", "픽업", "오늘"];

  const stars = useMemo(() => {
    const r = Number(product.rating);
    const filled = Number.isFinite(r) ? Math.round(r) : 5;
    return Math.max(0, Math.min(5, filled));
  }, [product.rating]);

  return (
    <div className="overflow-hidden bg-card rounded-t-2xl">
      {/* 썸네일/오버레이 */}
      <div className="relative aspect-[3/4] bg-muted">
        <Link href={`/products/${product.id}`} className="block h-full w-full">
          {/* ✅ 실제 이미지가 있으면 여기만 next/image로 교체 */}
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <div className="flex flex-col items-center gap-1">
              <ShoppingBag className="h-10 w-10 opacity-30" />
              <span className="text-xs opacity-50">상품 이미지</span>
            </div>
          </div>
        </Link>

        {/* ✅ 하트(이미지 우하단, 테두리 느낌) */}
        <button
          type="button"
          aria-label={liked ? "찜하기해제" : "찜하기"}
          onClick={onToggleLike}
          className="absolute bottom-1 right-1.5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full "
        >
          <Heart
            className={`h-7 w-7 ${
              liked ? "fill-rose-500 text-rose-500" : "text-gray-100 fill-gray-500/10"
            }`}
          />
        </button>
      </div>

      {/* 담기 버튼 (이미지 아래, outline) */}
      <div className="pt-2">
        <Button
          variant="outline"
          size="lg"
          onClick={onAddToCart}
          className="w-full justify-center gap-2 rounded-none border-border bg-transparent text-base font-semibold text-foreground hover:bg-muted"
        >
          <ShoppingBag className="h-5 w-5" />
          담기
        </Button>
      </div>

      {/* 정보 영역 */}
      <div className="pt-2">
        <Link href={`/products/${product.id}`} className="block">
          {/* 가격 */}
          <div className={`text-2xl font-extrabold tracking-tight text-foreground ${blackHanSans.className}`}>
            {product.price.toLocaleString("ko-KR")}원
          </div>

          {/* 상품명 */}
          <div className="mt-2 line-clamp-2 font-medium text-[15px] leading-snug tracking-tight">
            {product.name}
          </div>

          {/* 배송 칩 */}
          <div className="mt-3 flex flex-wrap gap-1">
            {flags.includes("택배") && (
              <span className="inline-flex items-center gap-1.5  bg-gray-200/80 px-1 py-1 text-xs font-bold text-foreground">
                <Truck className="h-4 w-4" />
                택배
              </span>
            )}
            {/*{flags.includes("픽업") && (*/}
            {/*  <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-sm font-bold text-foreground">*/}
            {/*    <Store className="h-4 w-4" />*/}
            {/*    픽업*/}
            {/*  </span>*/}
            {/*)}*/}
            {/*{flags.includes("오늘") && (*/}
            {/*  <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-sm font-bold text-foreground">*/}
            {/*    <Zap className="h-4 w-4" />*/}
            {/*    오늘*/}
            {/*  </span>*/}
            {/*)}*/}
          </div>

          {/* 별점 + 리뷰수(다이소몰처럼 별 5개 + 9,999+) */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < stars;
                return (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      filled ? "fill-foreground text-foreground" : "text-muted-foreground"
                    }`}
                  />
                );
              })}
            </div>
            <div className="font-black text-foreground pb-0.5">
              {formatReviewCount(product.reviewCount)}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
