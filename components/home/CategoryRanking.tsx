"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Star,
  Store,
  Truck,
  Zap,
} from "lucide-react";

type RankingItem = {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isHot?: boolean;
};

const CATEGORIES = [
  "주방용품",
  "시즌/시리즈",
  "청소/욕실",
  "스포츠/레저/취미",
  "뷰티/위생",
  "문구/팬시",
  "수납/정리",
  "공구/디지털",
  "반려동물",
  "인테리어/소품",
];

const RANKING_ITEMS: RankingItem[] = [
  {
    id: 1,
    category: "주방용품",
    name: "[고객 요청 개발 상품] 푸칭 분리기 소형",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1590794056466-ec6d5f09a4f4?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewCount: 8345,
    isNew: true,
  },
  {
    id: 2,
    category: "주방용품",
    name: "리빙 뽑아쓰는 키친타월 150매입",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviewCount: 8345,
    isHot: true,
  },
  {
    id: 3,
    category: "주방용품",
    name: "진공저장용기(1350 ml)(결착형)",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80",
    rating: 4.5,
    reviewCount: 857,
  },
  {
    id: 4,
    category: "주방용품",
    name: "옥수수 망사 수세미",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
    reviewCount: 4066,
    isHot: true,
  },
  {
    id: 5,
    category: "주방용품",
    name: "원터치 무선 전동 거품기",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=900&q=80",
    rating: 4.4,
    reviewCount: 60,
  },
  {
    id: 6,
    category: "주방용품",
    name: "진공 저장 용기 결착형 640 ml",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=900&q=80",
    rating: 4.5,
    reviewCount: 708,
  },
  {
    id: 7,
    category: "수납/정리",
    name: "쌓아쓰는 투명 수납함",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=900&q=80",
    rating: 4.2,
    reviewCount: 321,
  },
  {
    id: 8,
    category: "문구/팬시",
    name: "플래너 스티커팩 80매",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80",
    rating: 4.3,
    reviewCount: 1004,
  },
];

function formatNumber(n: number) {
  return n.toLocaleString("ko-KR");
}

export default function CategoryRanking() {
  const ITEMS_PER_PAGE = 12;
  const MAX_RANKING_ITEMS = 36;
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const categoryScrollRef = useRef<HTMLDivElement | null>(null);
  const categoryDragRef = useRef<{
    pointerId: number | null;
    startX: number;
    startScrollLeft: number;
  }>({
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
  });
  const preventClickAfterDragRef = useRef(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDraggingCategories, setIsDraggingCategories] = useState(false);

  const updateCategoryScrollState = useCallback(() => {
    const node = categoryScrollRef.current;
    if (!node) return;

    const maxLeft = node.scrollWidth - node.clientWidth;
    setCanScrollLeft(node.scrollLeft > 0);
    setCanScrollRight(node.scrollLeft < maxLeft - 1);
  }, []);

  const scrollCategories = (direction: "left" | "right") => {
    const node = categoryScrollRef.current;
    if (!node) return;
    const amount = Math.max(220, Math.floor(node.clientWidth * 0.5));
    node.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const onCategoryPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const node = categoryScrollRef.current;
    if (!node) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    categoryDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: node.scrollLeft,
    };
    preventClickAfterDragRef.current = false;
    setIsDraggingCategories(true);

    if (event.pointerType === "mouse") {
      event.preventDefault();
    }

    node.setPointerCapture(event.pointerId);
  };

  const onCategoryPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const node = categoryScrollRef.current;
    const drag = categoryDragRef.current;
    if (!node || !isDraggingCategories || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    if (Math.abs(deltaX) > 4) {
      preventClickAfterDragRef.current = true;
    }
    node.scrollLeft = drag.startScrollLeft - deltaX;
  };

  const endCategoryDrag = (event: PointerEvent<HTMLDivElement>) => {
    const node = categoryScrollRef.current;
    const drag = categoryDragRef.current;
    if (drag.pointerId !== event.pointerId) return;

    if (node?.hasPointerCapture(event.pointerId)) {
      node.releasePointerCapture(event.pointerId);
    }
    categoryDragRef.current.pointerId = null;
    setIsDraggingCategories(false);

    if (preventClickAfterDragRef.current) {
      window.setTimeout(() => {
        preventClickAfterDragRef.current = false;
      }, 0);
    }
  };

  const filtered = RANKING_ITEMS.filter((item) => item.category === activeCategory);
  const rankingSource = (filtered.length ? filtered : RANKING_ITEMS).slice(
    0,
    MAX_RANKING_ITEMS,
  );
  const rankingPages = Array.from(
    { length: Math.ceil(rankingSource.length / ITEMS_PER_PAGE) },
    (_, pageIndex) =>
      rankingSource.slice(
        pageIndex * ITEMS_PER_PAGE,
        (pageIndex + 1) * ITEMS_PER_PAGE,
      ),
  );
  const canSlidePrev = currentPage > 0;
  const canSlideNext = currentPage < rankingPages.length - 1;

  useEffect(() => {
    updateCategoryScrollState();
    const onResize = () => updateCategoryScrollState();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateCategoryScrollState]);

  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, Math.max(0, rankingPages.length - 1)));
  }, [rankingPages.length]);

  return (
    <section className="py-8 md:py-12">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-foreground md:mb-8 md:text-4xl">
        카테고리 랭킹
      </h2>

      <div className="relative isolate mx-1 mb-6 md:mx-2 md:mb-8">
        {canScrollLeft && (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-20 bg-gradient-to-r from-background/60 via-background/25 to-transparent backdrop-blur-[1px] md:block" />
            <button
              type="button"
              onClick={() => scrollCategories("left")}
              className="pointer-events-auto absolute left-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/60 text-slate-600 shadow-[0_2px_10px_rgba(15,23,42,0.08)] backdrop-blur-sm md:inline-flex"
              aria-label="이전 카테고리"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </>
        )}

        <div
          ref={categoryScrollRef}
          onScroll={updateCategoryScrollState}
          onPointerDown={onCategoryPointerDown}
          onPointerMove={onCategoryPointerMove}
          onPointerUp={endCategoryDrag}
          onPointerCancel={endCategoryDrag}
          onClickCapture={(event) => {
            if (!preventClickAfterDragRef.current) return;
            event.preventDefault();
            event.stopPropagation();
            preventClickAfterDragRef.current = false;
          }}
          className={`scrollbar-hide relative z-0 flex items-center gap-2 overflow-x-auto pb-1 select-none touch-pan-y md:px-12 md:mx-6 ${
            isDraggingCategories ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {canScrollRight && (
          <>
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-20 bg-gradient-to-l from-background/60 via-background/25 to-transparent backdrop-blur-[1px] md:block" />
            <button
              type="button"
              onClick={() => scrollCategories("right")}
              className="pointer-events-auto absolute right-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/60 text-slate-600 shadow-[0_2px_10px_rgba(15,23,42,0.08)] backdrop-blur-sm md:inline-flex"
              aria-label="다음 카테고리"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <div className="relative">
        <div className="mb-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={!canSlidePrev}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-35"
            aria-label="이전 랭킹 페이지"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs font-semibold text-slate-500">
            {rankingPages.length === 0 ? 0 : currentPage + 1}/{rankingPages.length}
          </span>
          <button
            type="button"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(rankingPages.length - 1, prev + 1),
              )
            }
            disabled={!canSlideNext}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-35"
            aria-label="다음 랭킹 페이지"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {rankingPages.map((pageItems, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-5">
                  {pageItems.map((product, idx) => {
                    const absoluteRank = pageIndex * ITEMS_PER_PAGE + idx + 1;
                    return (
                      <article key={product.id} className="min-w-0">
                        <div className="mb-2 w-fit border-b border-slate-500 pb-1 text-4xl font-bold leading-none tracking-tight text-slate-900">
                          {absoluteRank}
                        </div>

                        <div className="group relative aspect-[4/5] overflow-hidden bg-slate-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                          {product.isHot && (
                            <div className="absolute bottom-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 text-[10px] font-black leading-tight text-yellow-300">
                              국민
                              <br />
                              특템
                            </div>
                          )}
                          <button
                            type="button"
                            aria-label={`${product.name} 찜하기`}
                            className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/15 text-white backdrop-blur-sm"
                          >
                            <Heart className="h-5 w-5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          className={`mt-2 inline-flex w-full items-center justify-center gap-1.5 border py-2 text-base font-semibold ${
                            absoluteRank === 1
                              ? "border-rose-400 text-rose-600"
                              : "border-slate-200 text-slate-800 hover:bg-slate-50"
                          }`}
                        >
                          <ShoppingBag className="h-4 w-4" />
                          담기
                        </button>

                        <div className="pt-3">
                          {product.isNew && (
                            <div className="mb-2 inline-flex items-center border border-slate-300 px-2 py-0.5 text-xs font-bold text-slate-700">
                              NEW
                            </div>
                          )}
                          <p className="text-4xl font-extrabold leading-none text-slate-900">
                            {formatNumber(product.price)}원
                          </p>
                          <p className="mt-2 line-clamp-2 text-base font-medium leading-snug text-slate-800">
                            {product.name}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-semibold text-slate-700">
                            <span className="inline-flex items-center gap-1 bg-slate-100 px-1.5 py-1">
                              <Truck className="h-3.5 w-3.5" />
                              택배
                            </span>
                            <span className="inline-flex items-center gap-1 bg-slate-100 px-1.5 py-1">
                              <Store className="h-3.5 w-3.5 text-red-500" />
                              픽업
                            </span>
                            <span className="inline-flex items-center gap-1 bg-slate-100 px-1.5 py-1">
                              <Zap className="h-3.5 w-3.5 text-violet-500" />
                              오늘
                            </span>
                          </div>

                          <div className="mt-3 flex items-center gap-1.5">
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, starIdx) => (
                                <Star
                                  key={starIdx}
                                  className={`h-3.5 w-3.5 ${
                                    starIdx < Math.round(product.rating)
                                      ? "fill-slate-900 text-slate-900"
                                      : "text-slate-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-semibold text-slate-700">
                              {formatNumber(product.reviewCount)}
                            </span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
