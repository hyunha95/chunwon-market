"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import {
  PRODUCTS,
  FILTER_SUBCATEGORIES,
} from "@/lib/dummy-data";

type ViewState = "loaded" | "loading" | "empty";

export default function CategoryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [deliveryMethods, setDeliveryMethods] = useState<string[]>([]);
  const [viewState, setViewState] = useState<ViewState>("loaded");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProducts =
    activeFilter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => {
          const cat = FILTER_SUBCATEGORIES.find(
            (c) => c.id === activeFilter
          );
          return cat
            ? p.category ===
                cat.label.split("/")[0].replace("용품", "").replace("/", "")
            : true;
        });

  const toggleDelivery = (method: string) => {
    setDeliveryMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  return (
    <div className="py-4 md:py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">홈</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">기획전</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>봄맞이 생활용품 기획전</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex gap-6">
        {/* Filter Panel - Desktop */}
        <aside className="hidden w-[220px] flex-shrink-0 md:block">
          <div className="sticky top-[140px] rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-bold text-foreground">
              카테고리
            </h3>
            <ul className="mb-4 space-y-1">
              {FILTER_SUBCATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setActiveFilter(cat.id)}
                    className={`w-full rounded px-2 py-1.5 text-left text-xs transition-colors ${
                      activeFilter === cat.id
                        ? "bg-primary/20 font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {cat.label}{" "}
                    <span className="text-muted-foreground">
                      ({cat.count})
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <Separator className="mb-4" />

            <h3 className="mb-3 text-sm font-bold text-foreground">정렬</h3>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="mb-4 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">인기순</SelectItem>
                <SelectItem value="newest">최신순</SelectItem>
                <SelectItem value="price-asc">낮은 가격순</SelectItem>
                <SelectItem value="price-desc">높은 가격순</SelectItem>
                <SelectItem value="review">리뷰 많은순</SelectItem>
              </SelectContent>
            </Select>

            <Separator className="mb-4" />

            <h3 className="mb-3 text-sm font-bold text-foreground">
              가격대
            </h3>
            <div className="mb-4 space-y-2">
              {["1,000원", "2,000원", "3,000원", "5,000원"].map((price) => (
                <label
                  key={price}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <Checkbox className="h-3.5 w-3.5" />
                  {price}
                </label>
              ))}
            </div>

            <Separator className="mb-4" />

            <h3 className="mb-3 text-sm font-bold text-foreground">
              배송방법
            </h3>
            <div className="space-y-2">
              {["택배배송", "매장픽업"].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <Checkbox
                    className="h-3.5 w-3.5"
                    checked={deliveryMethods.includes(method)}
                    onCheckedChange={() => toggleDelivery(method)}
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Title + Sort */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-foreground md:text-xl">
                봄맞이 생활용품 기획전
              </h1>
              <p className="text-xs text-muted-foreground">
                총 {filteredProducts.length}개 상품
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                className="gap-1 text-xs md:hidden border-border text-foreground bg-transparent"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              >
                <SlidersHorizontal className="h-3 w-3" />
                필터
              </Button>

              {/* State Toggle (for demo) */}
              <div className="hidden items-center gap-1 md:flex">
                {(["loaded", "loading", "empty"] as const).map((state) => (
                  <Button
                    key={state}
                    variant={viewState === state ? "default" : "outline"}
                    size="sm"
                    className={`text-[10px] ${viewState === state ? "bg-secondary text-secondary-foreground" : "border-border text-foreground bg-transparent"}`}
                    onClick={() => setViewState(state)}
                  >
                    {state}
                  </Button>
                ))}
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="hidden h-8 w-[120px] text-xs md:flex">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">인기순</SelectItem>
                  <SelectItem value="newest">최신순</SelectItem>
                  <SelectItem value="price-asc">낮은 가격순</SelectItem>
                  <SelectItem value="price-desc">높은 가격순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile Filters */}
          {mobileFilterOpen && (
            <div className="mb-4 rounded-lg border border-border bg-card p-4 md:hidden">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">
                  필터
                </span>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {FILTER_SUBCATEGORIES.map((cat) => (
                  <Badge
                    key={cat.id}
                    variant={activeFilter === cat.id ? "default" : "outline"}
                    className={`cursor-pointer text-xs ${activeFilter === cat.id ? "bg-secondary text-secondary-foreground" : "border-border text-foreground"}`}
                    onClick={() => setActiveFilter(cat.id)}
                  >
                    {cat.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Promo Banners */}
          <div className="mb-6 space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex h-24 w-full items-center justify-center rounded-lg bg-secondary text-sm text-muted-foreground md:h-32"
              >
                프로모션 배너 {i}
              </div>
            ))}
          </div>

          {/* Product Grid */}
          {viewState === "loading" && (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="rounded-lg border border-border bg-card p-3"
                >
                  <Skeleton className="mb-3 aspect-square w-full rounded" />
                  <Skeleton className="mb-2 h-4 w-3/4" />
                  <Skeleton className="mb-1 h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              ))}
            </div>
          )}

          {viewState === "empty" && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <SlidersHorizontal className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="mb-1 text-sm font-medium text-foreground">
                검색 결과가 없습니다
              </p>
              <p className="text-xs text-muted-foreground">
                다른 조건으로 검색해 보세요
              </p>
            </div>
          )}

          {viewState === "loaded" && (
            <>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load More */}
              <div className="mt-8 flex justify-center">
                <Button
                  className="w-full max-w-xs bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  더보기
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
