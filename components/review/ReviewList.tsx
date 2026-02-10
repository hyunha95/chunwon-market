"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ThumbsUp, Camera, ImageIcon, ChevronDown } from "lucide-react";
import type { ReviewItem } from "@/lib/product-detail-mocks";

interface ReviewListProps {
  reviews: ReviewItem[];
}

type SortKey = "latest" | "highRating" | "lowRating" | "helpful";
type FilterKey = "all" | "photo";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "latest", label: "최신순" },
  { key: "helpful", label: "도움순" },
  { key: "highRating", label: "평점 높은순" },
  { key: "lowRating", label: "평점 낮은순" },
];

const PAGE_SIZE = 5;

export default function ReviewList({ reviews }: ReviewListProps) {
  const [sort, setSort] = useState<SortKey>("latest");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [page, setPage] = useState(1);

  const photoCount = useMemo(
    () => reviews.filter((r) => r.hasPhoto).length,
    [reviews],
  );

  const filtered = useMemo(
    () => (filter === "photo" ? reviews.filter((r) => r.hasPhoto) : reviews),
    [reviews, filter],
  );

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "highRating":
        return arr.sort((a, b) => b.rating - a.rating);
      case "lowRating":
        return arr.sort((a, b) => a.rating - b.rating);
      case "helpful":
        return arr.sort((a, b) => b.helpfulCount - a.helpfulCount);
      default:
        return arr; // already in date order
    }
  }, [filtered, sort]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const visible = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = page < totalPages;

  return (
    <div className="flex flex-col gap-4">
      {/* ---- Controls ---- */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Filter */}
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            className={
              filter === "all"
                ? "h-8 text-xs bg-secondary text-secondary-foreground hover:bg-secondary/90"
                : "h-8 text-xs border-border text-foreground bg-transparent hover:bg-muted"
            }
            onClick={() => {
              setFilter("all");
              setPage(1);
            }}
          >
            {"전체 ("}
            {reviews.length}
            {")"}
          </Button>
          <Button
            variant={filter === "photo" ? "default" : "outline"}
            size="sm"
            className={
              filter === "photo"
                ? "h-8 gap-1 text-xs bg-secondary text-secondary-foreground hover:bg-secondary/90"
                : "h-8 gap-1 text-xs border-border text-foreground bg-transparent hover:bg-muted"
            }
            onClick={() => {
              setFilter("photo");
              setPage(1);
            }}
          >
            <Camera className="h-3 w-3" />
            {"사진/동영상 ("}
            {photoCount}
            {")"}
          </Button>
        </div>

        {/* Sort */}
        <div className="flex flex-wrap gap-0.5">
          {SORT_OPTIONS.map((opt, idx) => (
            <span key={opt.key} className="flex items-center">
              <button
                onClick={() => {
                  setSort(opt.key);
                  setPage(1);
                }}
                className={`rounded px-1.5 py-1 text-[11px] transition-colors sm:px-2 sm:text-xs ${
                  sort === opt.key
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
              {idx < SORT_OPTIONS.length - 1 && (
                <span className="text-border">{"/"}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <Separator />

      {/* ---- Review Items ---- */}
      <div className="flex flex-col">
        {visible.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            {"조건에 맞는 리뷰가 없습니다."}
          </p>
        )}

        {visible.map((review, idx) => (
          <div key={review.id}>
            <article className="flex flex-col gap-2.5 py-4">
              {/* Header Row */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < review.rating
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    {review.author}
                  </span>
                  {review.purchaseOption && (
                    <Badge
                      variant="outline"
                      className="border-border px-1.5 py-0 text-[10px] text-muted-foreground"
                    >
                      {review.purchaseOption}
                    </Badge>
                  )}
                </div>
                <span className="flex-shrink-0 text-[11px] tabular-nums text-muted-foreground">
                  {review.date}
                </span>
              </div>

              {/* Photo Placeholder */}
              {review.hasPhoto && (
                <div className="flex gap-1.5">
                  {[0, 1].map((pIdx) => (
                    <div
                      key={pIdx}
                      className="flex h-14 w-14 items-center justify-center rounded-md bg-muted md:h-16 md:w-16"
                    >
                      <ImageIcon className="h-4 w-4 text-muted-foreground/40 md:h-5 md:w-5" />
                    </div>
                  ))}
                </div>
              )}

              {/* Content */}
              <p className="text-xs leading-relaxed text-foreground md:text-sm">
                {review.content}
              </p>

              {/* Helpful */}
              <button className="flex min-h-[44px] items-center gap-1 self-start text-xs text-muted-foreground transition-colors hover:text-accent md:min-h-0">
                <ThumbsUp className="h-3 w-3" />
                {"도움이 돼요 ("}
                {review.helpfulCount}
                {")"}
              </button>
            </article>
            {idx < visible.length - 1 && <Separator />}
          </div>
        ))}
      </div>

      {/* ---- Load More ---- */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            className="w-full max-w-xs gap-1 border-border text-sm text-foreground bg-transparent hover:bg-muted"
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronDown className="h-4 w-4" />
            {"리뷰 더보기 ("}
            {sorted.length - visible.length}
            {"개 남음)"}
          </Button>
        </div>
      )}

      {/* ---- Pagination indicator ---- */}
      {sorted.length > 0 && (
        <p className="text-center text-[11px] tabular-nums text-muted-foreground">
          {visible.length}
          {" / "}
          {sorted.length}
          {"개 리뷰"}
        </p>
      )}
    </div>
  );
}
