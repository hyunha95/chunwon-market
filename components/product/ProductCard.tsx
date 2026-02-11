"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Truck, Star } from "lucide-react";
import type { Product } from "@/lib/dummy-data";
import { blackHanSans } from "@/lib/fonts";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  rank?: number;
}

function formatReviewCount(n: number) {
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
  };

  const flags: Array<"택배" | "픽업" | "오늘"> = ["택배", "픽업", "오늘"];

  const stars = useMemo(() => {
    const r = Number(product.rating);
    const filled = Number.isFinite(r) ? Math.round(r) : 5;
    return Math.max(0, Math.min(5, filled));
  }, [product.rating]);

  return (
      <div className="overflow-hidden rounded-t-xl bg-card sm:rounded-t-2xl">
        {/* 썸네일/오버레이 */}
        <div className="relative aspect-square sm:aspect-[3/4] bg-muted">
          {/* ✅ group 추가: group-hover 정상 동작 */}
          <Link href={`/products/${product.id}`} className="group block h-full w-full">
            <Image
                src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=1122&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="product image"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                width={1122}
                height={4000}
            />
          </Link>

          {/* 하트: 모바일 축소 */}
          <button
              type="button"
              aria-label={liked ? "찜하기해제" : "찜하기"}
              onClick={onToggleLike}
              className="absolute bottom-1 right-1 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full sm:bottom-1.5 sm:right-1.5 sm:h-10 sm:w-10"
          >
            <Heart
                className={`h-5 w-5 sm:h-7 sm:w-7 ${
                    liked ? "fill-rose-500 text-rose-500" : "fill-gray-500/10 text-gray-100"
                }`}
            />
          </button>
        </div>

        {/* 담기 버튼: 모바일 축소 */}
        <div className="pt-1.5 sm:pt-2">
          <Button
              variant="outline"
              onClick={onAddToCart}
              className="
            w-full justify-center gap-1.5 rounded-none border-border bg-transparent
            text-sm font-semibold text-foreground hover:bg-muted
            h-9 sm:h-11 sm:gap-2 sm:text-base
          "
          >
            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            담기
          </Button>
        </div>

        {/* 정보 영역: 모바일 간격/폰트 축소 */}
        <div className="pt-1.5 sm:pt-2">
          <Link href={`/products/${product.id}`} className="block">
            {/* 가격: 모바일 text-xl */}
            <div
                className={`text-xl font-extrabold tracking-tight text-foreground sm:text-2xl ${blackHanSans.className}`}
            >
              {product.price.toLocaleString("ko-KR")}원
            </div>

            {/* 상품명: 모바일 text-sm */}
            <div className="mt-1.5 line-clamp-2 text-sm font-medium leading-snug tracking-tight sm:mt-2 sm:text-[15px]">
              {product.name}
            </div>

            {/* 배송 칩: 모바일 더 작게 */}
            <div className="mt-2 flex flex-wrap gap-1 sm:mt-3">
              {flags.includes("택배") && (
                  <span className="inline-flex items-center gap-1 bg-gray-200/80 px-1 py-0.5 text-[10px] font-bold text-foreground sm:px-1.5 sm:py-1 sm:text-xs">
                <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                택배
              </span>
              )}
            </div>

            {/* 별점 + 리뷰수: 모바일 축소 */}
            <div className="mt-2.5 flex items-center gap-1.5 sm:mt-4 sm:gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => {
                  const filled = i < stars;
                  return (
                      <Star
                          key={i}
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                              filled ? "fill-foreground text-foreground" : "text-muted-foreground"
                          }`}
                      />
                  );
                })}
              </div>
              <div className="pb-0.5 text-xs font-black text-foreground sm:text-sm">
                {formatReviewCount(product.reviewCount)}
              </div>
            </div>
          </Link>
        </div>
      </div>
  );
}
