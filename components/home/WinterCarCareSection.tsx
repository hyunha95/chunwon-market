"use client";

import Link from "next/link";
import { blackHanSans } from "@/lib/fonts";
import {
  ChevronRight,
  Heart,
  ShoppingBag,
  Star,
  Store,
  Truck,
  Zap,
} from "lucide-react";

type WinterCarCareItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
};

const WINTER_CAR_CARE_ITEMS: WinterCarCareItem[] = [
  {
    id: 1,
    name: "드로잉 습식 코팅제 500ml",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80",
    rating: 5,
    reviewCount: 21,
  },
  {
    id: 2,
    name: "스노우체인 스프레이 450ml",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&w=800&q=80",
    rating: 5,
    reviewCount: 66,
  },
  {
    id: 3,
    name: "카렉스 유리 발수 코팅제 300ml",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1584473457409-ce1f48ea7e6b?auto=format&fit=crop&w=800&q=80",
    rating: 5,
    reviewCount: 20,
  },
  {
    id: 4,
    name: "워셔액 발수 코팅제 1.8L",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
    rating: 4,
    reviewCount: 15,
  },
  {
    id: 5,
    name: "극세사 차량용 타월 40x60",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80",
    rating: 5,
    reviewCount: 48,
  },
  {
    id: 6,
    name: "차량 실내 클리너 폼 500ml",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1609470087493-fb2f2f5cb4f6?auto=format&fit=crop&w=800&q=80",
    rating: 4,
    reviewCount: 39,
  },
  {
    id: 7,
    name: "타이어 광택 보호제 750ml",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=800&q=80",
    rating: 5,
    reviewCount: 82,
  },
  {
    id: 8,
    name: "성에 제거 스크래퍼 세트",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    rating: 4,
    reviewCount: 29,
  },
];

function formatNumber(n: number) {
  return n.toLocaleString("ko-KR");
}

export default function WinterCarCareSection() {
  return (
    <section className="py-6">
      <Link
        href="/exhCtgr/C208/CTGR_00013/CTGR_00100"
        className="mb-4 flex items-center justify-between"
      >
        <h2 className="text-base font-black leading-tight text-foreground md:text-lg">
          <span className="block">겨울에도</span>
          <span className="block">안전한 차량 관리♡</span>
        </h2>
        <ChevronRight className="h-7 w-7 text-foreground" />
      </Link>

      <div className="scrollbar-hide flex gap-1.5 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible">
        {WINTER_CAR_CARE_ITEMS.map((item) => (
          <article key={item.id} className="w-[118px] flex-shrink-0 md:w-auto">
            <div className="group relative aspect-[4/5] overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <button
                type="button"
                aria-label={`${item.name} 찜하기`}
                className="absolute bottom-1.5 right-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/15 text-white backdrop-blur-sm md:h-8 md:w-8"
              >
                <Heart className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>

            <button
              type="button"
              className="mt-1 inline-flex h-7 w-full items-center justify-center gap-1 border border-slate-200 text-[10px] font-semibold text-slate-800 hover:bg-slate-50 md:h-9 md:text-sm"
            >
              <ShoppingBag className="h-3.5 w-3.5 md:h-4 md:w-4" />
              담기
            </button>

            <div className="pt-1">
              <p
                className={`text-xl font-extrabold leading-none tracking-tight text-foreground sm:text-2xl ${blackHanSans.className}`}
              >
                {formatNumber(item.price)}원
              </p>
              <p className="mt-1 line-clamp-2 text-xs leading-snug text-slate-800 md:text-sm">
                {item.name}
              </p>

              <div className="mt-1.5 flex flex-wrap gap-0.5 text-[8px] font-semibold text-slate-700 md:gap-1 md:text-[11px]">
                <span className="inline-flex items-center gap-0.5 bg-slate-100 px-1 py-0.5 md:gap-1 md:px-1.5 md:py-1">
                  <Truck className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  택배
                </span>
                <span className="inline-flex items-center gap-0.5 bg-slate-100 px-1 py-0.5 md:gap-1 md:px-1.5 md:py-1">
                  <Store className="h-3 w-3 text-red-500 md:h-3.5 md:w-3.5" />
                  픽업
                </span>
                <span className="inline-flex items-center gap-0.5 bg-slate-100 px-1 py-0.5 md:gap-1 md:px-1.5 md:py-1">
                  <Zap className="h-3 w-3 text-violet-500 md:h-3.5 md:w-3.5" />
                  오늘
                </span>
              </div>

              <div className="mt-1.5 flex items-center gap-1">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`h-3 w-3 md:h-3.5 md:w-3.5 ${
                        idx < item.rating
                          ? "fill-slate-900 text-slate-900"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-semibold text-slate-700 md:text-sm">
                  {formatNumber(item.reviewCount)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
