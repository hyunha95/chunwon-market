import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS, type Product } from "@/lib/dummy-data";
import {
  ArrowLeft,
  Boxes,
  Camera,
  ChevronDown,
  ChevronUp,
  Clock3,
  Grid2x2,
  Heart,
  History,
  MapPin,
  Package,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Store,
  X,
} from "lucide-react";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

type KeywordItem = {
  label: string;
  image: string;
};

type TrendItem = {
  rank: number;
  label: string;
  movement: "up" | "same" | "new";
};

type ResultItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  reviewCount: number;
  watchingCount: number;
  isNew?: boolean;
  deliveryTags: Array<"택배" | "픽업" | "오늘">;
};

const RECENT_KEYWORDS = ["일본제"];

const RECOMMENDED_KEYWORDS: KeywordItem[] = [
  {
    label: "수납",
    image:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=300&auto=format&fit=crop",
  },
  {
    label: "복맞이",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=300&auto=format&fit=crop",
  },
  {
    label: "짱구",
    image:
      "https://images.unsplash.com/photo-1602524203081-ec8c7f353e6f?q=80&w=300&auto=format&fit=crop",
  },
  {
    label: "코인독템",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=300&auto=format&fit=crop",
  },
  {
    label: "천원의행복",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=300&auto=format&fit=crop",
  },
  {
    label: "생활꿀템",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=300&auto=format&fit=crop",
  },
];

const TRENDING_KEYWORDS: TrendItem[] = [
  { rank: 1, label: "[고객 요청] 개밥 상...", movement: "up" },
  { rank: 2, label: "일본제", movement: "up" },
  { rank: 3, label: "포장", movement: "new" },
  { rank: 4, label: "초콜릿", movement: "up" },
  { rank: 5, label: "수납함", movement: "up" },
  { rank: 6, label: "젤리", movement: "up" },
  { rank: 7, label: "퍼프", movement: "up" },
  { rank: 8, label: "바구니", movement: "same" },
  { rank: 9, label: "스티커", movement: "same" },
  { rank: 10, label: "박스", movement: "same" },
];

const OPENRUN_PRODUCTS: Product[] = PRODUCTS.slice(0, 4);

const RESULT_ITEMS: ResultItem[] = [
  {
    id: 1,
    name: "일본제 키링 디스플레이 케이스",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=600&auto=format&fit=crop",
    reviewCount: 266,
    watchingCount: 127,
    deliveryTags: ["택배", "픽업", "오늘"],
  },
  {
    id: 2,
    name: "일본제 뚜껑 수납 케이스 M(약1.7 L)",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop",
    reviewCount: 196,
    watchingCount: 52,
    deliveryTags: ["택배", "픽업"],
  },
  {
    id: 3,
    name: "일본제 계란 분리 용기 350 ml",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop",
    reviewCount: 124,
    watchingCount: 38,
    isNew: true,
    deliveryTags: ["택배", "오늘"],
  },
];

function formatPrice(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

function DeliveryTag({ tag }: { tag: "택배" | "픽업" | "오늘" }) {
  const styleMap = {
    택배: "bg-[#f0f2f5] text-[#1f2937]",
    픽업: "bg-[#ffe8ea] text-[#b4232a]",
    오늘: "bg-[#ecf2ff] text-[#2f63cf]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-sm px-1.5 py-[2px] text-[10px] font-semibold ${styleMap[tag]}`}
    >
      {tag}
    </span>
  );
}

function SearchDiscoveryView() {
  const leftTrends = TRENDING_KEYWORDS.slice(0, 5);
  const rightTrends = TRENDING_KEYWORDS.slice(5);

  return (
    <main className="px-4 pb-14 pt-5">
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#1f2937]">최근 검색어</h2>
          <button
            type="button"
            className="text-[12px] font-medium text-[#8d95a5] hover:text-[#4b5563]"
          >
            모두 지우기
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {RECENT_KEYWORDS.map((keyword) => (
            <button
              key={keyword}
              type="button"
              className="inline-flex items-center gap-1 rounded-full bg-[#f3f4f6] px-3 py-1.5 text-[13px] font-semibold text-[#4b5563]"
            >
              {keyword}
              <X className="h-4 w-4 text-[#9ca3af]" />
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-[18px] font-bold text-[#1f2937]">추천 키워드</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {RECOMMENDED_KEYWORDS.map((keyword) => (
            <button
              key={keyword.label}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-[#e6e8ec] bg-white px-2 py-1.5 text-[13px] font-medium text-[#374151]"
            >
              <span className="relative h-6 w-6 overflow-hidden rounded-full">
                <Image
                  src={keyword.image}
                  alt={keyword.label}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </span>
              {keyword.label}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-8 rounded-sm bg-[#0f1116] px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-extrabold text-white">
            신상은 못 참지! 구독하러 가기
          </span>
          <span className="text-[14px] font-black text-[#8ea3ff]">신상클럽</span>
        </div>
      </div>

      <section className="mt-9">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#1f2937]">급상승 검색어</h2>
          <span className="text-[11px] text-[#8d95a5]">최근 1시간, 검색 횟수 급상승</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
          <div className="space-y-3">
            {leftTrends.map((item) => (
              <TrendRow key={item.rank} item={item} />
            ))}
          </div>
          <div className="space-y-3">
            {rightTrends.map((item) => (
              <TrendRow key={item.rank} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-9">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#1f2937]">오픈런</h2>
          <button type="button" className="text-[#4b5563]">
            <ChevronDown className="h-5 w-5 -rotate-90" />
          </button>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {OPENRUN_PRODUCTS.map((item) => (
            <div key={`openrun-${item.id}`} className="w-[168px] flex-shrink-0">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function TrendRow({ item }: { item: TrendItem }) {
  return (
    <div className="flex items-center text-[15px] leading-none">
      <span className="w-5 font-extrabold text-[#1f2937]">{item.rank}</span>
      <span className="flex-1 truncate font-medium text-[#374151]">{item.label}</span>
      <span className="w-4 text-right text-[10px]">
        {item.movement === "up" ? (
          <span className="text-[#d92c34]">▲</span>
        ) : item.movement === "new" ? (
          <span className="font-bold text-[#d92c34]">N</span>
        ) : (
          <span className="text-[#9ca3af]">-</span>
        )}
      </span>
    </div>
  );
}

function SearchResultView() {
  return (
    <main className="relative pb-28">
      <div className="px-4 pt-2">
        <div className="flex items-end gap-6 border-b border-[#e8eaee]">
          <button
            type="button"
            className="border-b-[3px] border-[#1f2937] pb-3 text-[18px] font-bold text-[#1f2937]"
          >
            상품
          </button>
          <button
            type="button"
            className="pb-3 text-[16px] font-medium text-[#5f6b7b]"
          >
            쇼핑
          </button>
          <button
            type="button"
            className="pb-3 text-[16px] font-medium text-[#5f6b7b]"
          >
            매장상품찾기
          </button>
        </div>
      </div>

      <section className="px-4 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0f253f] px-3 py-1.5 text-[13px] font-bold text-white"
          >
            <Package className="h-4 w-4" />
            택배
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e4e7ec] bg-white px-3 py-1.5 text-[13px] font-semibold text-[#4b5563]"
          >
            <Store className="h-4 w-4 text-[#d22a34]" />
            픽업
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e4e7ec] bg-white px-3 py-1.5 text-[13px] font-semibold text-[#4b5563]"
          >
            <Clock3 className="h-4 w-4 text-[#8547d9]" />
            오늘
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e4e7ec] bg-white px-3 py-1.5 text-[13px] font-semibold text-[#4b5563]"
          >
            <Boxes className="h-4 w-4 text-[#2f63cf]" />
            대량
          </button>
        </div>
      </section>

      <section className="px-4 pt-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e4e7ec] text-[#5f6b7b]"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          <span className="h-4 w-px bg-[#e5e7eb]" />
          <FilterChip label="브랜드" />
          <FilterChip label="카테고리" />
          <FilterChip label="상품유형" />
          <FilterChip label="별점" />
        </div>
      </section>

      <section className="px-4 pt-3">
        <div className="flex items-center gap-2 border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2.5 text-[13px] text-[#4b5563]">
          <MapPin className="h-4 w-4 text-[#1f2937]" />
          로그인 후 배송지를 확인하세요.
        </div>
      </section>

      <section className="px-4 pt-4">
        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-[13px] text-[#374151]">
            <input
              type="checkbox"
              className="h-5 w-5 rounded-sm border border-[#cbd5e1]"
            />
            품절제외
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-[13px] text-[#4b5563]"
            >
              추천순
              <ChevronDown className="h-4 w-4" />
            </button>
            <button type="button" className="text-[#6b7280]">
              <Grid2x2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="mt-1">
        {RESULT_ITEMS.map((item) => (
          <article key={item.id} className="border-t border-[#eceef2] px-4 py-4">
            <div className="flex gap-4">
              <div className="relative h-[128px] w-[128px] flex-shrink-0 overflow-hidden bg-[#f3f4f6]">
                <span className="absolute left-1.5 top-1.5 z-10 rounded-sm bg-[#1f2937] px-1.5 py-[2px] text-[9px] font-bold text-white">
                  구매 1.6만+
                </span>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/85 text-[#9ca3af]"
                >
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {item.isNew && (
                    <span className="rounded-sm border border-[#111827] px-1 py-[1px] text-[9px] font-bold text-[#111827]">
                      NEW
                    </span>
                  )}
                  <p className="text-[26px] font-black leading-none text-[#111827]">
                    {formatPrice(item.price)}
                  </p>
                </div>
                <p className="mt-1 line-clamp-2 text-[13px] leading-tight text-[#111827]">
                  {item.name}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  {item.deliveryTags.map((tag) => (
                    <DeliveryTag key={`${item.id}-${tag}`} tag={tag} />
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[#111827]">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={`${item.id}-star-${idx}`}
                        className="h-3.5 w-3.5 fill-[#111827] text-[#111827]"
                      />
                    ))}
                  </div>
                  <span className="text-[13px] font-semibold">{item.reviewCount}</span>
                </div>
                <p className="mt-0.5 text-[12px] font-semibold text-[#374151]">
                  {item.watchingCount}명 보는 중
                </p>
                <button
                  type="button"
                  className="mt-2 inline-flex h-10 w-full items-center justify-center gap-1 rounded-none border border-[#d1d5db] bg-white text-[14px] font-medium text-[#1f2937]"
                >
                  <ShoppingBag className="h-4 w-4" />
                  담기
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="pointer-events-none fixed bottom-6 right-4 flex flex-col gap-2 md:right-[calc(50%-199px)]">
        <button
          type="button"
          className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d1d5db] bg-white text-[#374151] shadow-sm"
          aria-label="맨 위로"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d1d5db] bg-white text-[#374151] shadow-sm"
          aria-label="최근 본 상품"
        >
          <History className="h-5 w-5" />
        </button>
      </div>
    </main>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 rounded-full bg-[#f1f3f6] px-3 py-2 text-[13px] text-[#4b5563]"
    >
      {label}
      <ChevronDown className="h-4 w-4" />
    </button>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const hasQuery = query.length > 0;

  return (
    <div className="min-h-screen bg-[#ebedf2] md:py-4">
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.08)]">
        <header className="border-b border-[#e8eaef] px-4 pb-2 pt-3">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex h-9 w-9 items-center justify-center text-[#1f2937]"
              aria-label="뒤로가기"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <form action="/search" className="relative flex-1">
              <input
                name="q"
                defaultValue={query}
                placeholder="검색어를 입력하세요"
                className="h-10 w-full rounded-none border border-[#5f6470] bg-white pl-3 pr-16 text-[15px] font-medium text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none"
              />
              {hasQuery && (
                <Link
                  href="/search"
                  className="absolute right-9 top-1/2 inline-flex -translate-y-1/2 items-center justify-center text-[#6b7280]"
                  aria-label="검색어 지우기"
                >
                  <X className="h-4 w-4" />
                </Link>
              )}
              <button
                type="submit"
                className="absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center justify-center text-[#1f2937]"
                aria-label="검색"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#111827] text-white"
              aria-label="카메라 검색"
            >
              <Camera className="h-5 w-5" />
            </button>
          </div>
        </header>

        {hasQuery ? <SearchResultView /> : <SearchDiscoveryView />}
      </div>
    </div>
  );
}
