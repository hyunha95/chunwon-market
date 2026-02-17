"use client";

import { Star } from "lucide-react";

interface ReviewSummaryProps {
  rating: number;
  reviewCount: number;
  starDistribution: number[]; // [1star, 2star, 3star, 4star, 5star]
}

export default function ReviewSummary({
  rating,
  reviewCount,
  starDistribution,
}: ReviewSummaryProps) {
  const totalStars = starDistribution.reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* --- Row 1: Average + Star Distribution --- */}
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        {/* Average Rating Card */}
        <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-6 py-5 sm:px-10 sm:py-6">
          <span className="text-4xl font-bold tabular-nums text-foreground">
            {rating}
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-primary text-primary"
                    : i < rating
                      ? "fill-primary/50 text-primary"
                      : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {reviewCount.toLocaleString("ko-KR")}
            {"개 리뷰"}
          </span>
        </div>

        {/* Star Distribution Bars */}
        <div className="flex flex-1 flex-col justify-center gap-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = starDistribution[star - 1];
            const percent = totalStars > 0 ? (count / totalStars) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="w-8 text-right text-xs tabular-nums text-muted-foreground">
                  {star}
                  {"점"}
                </span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-12 text-right text-[11px] tabular-nums text-muted-foreground">
                  {count.toLocaleString("ko-KR")}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
