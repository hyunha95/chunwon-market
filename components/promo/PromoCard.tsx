"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { PromoItem } from "@/lib/dummy-data";

interface PromoCardProps {
  promo: PromoItem;
}

export default function PromoCard({ promo }: PromoCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md">
      {/* Image Placeholder */}
      <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          <span className="text-sm opacity-50">기획전 이미지</span>
        </div>
        <Badge className="absolute right-3 top-3 bg-foreground text-card text-[10px]">
          {promo.period}
        </Badge>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="mb-1 text-sm font-bold text-foreground md:text-base">
          {promo.title}
        </h3>
        <p className="mb-3 text-xs text-muted-foreground">{promo.subtitle}</p>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 text-xs border-border text-foreground hover:border-accent hover:text-accent bg-transparent"
        >
          자세히 보기
          <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
