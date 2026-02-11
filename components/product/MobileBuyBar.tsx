"use client";

import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Zap } from "lucide-react";
import { blackHanSans } from "@/lib/fonts";

interface MobileBuyBarProps {
  price: number;
  quantity: number;
}

export default function MobileBuyBar({ price, quantity }: MobileBuyBarProps) {
  const total = price * quantity;

  return (
    <div className="fixed bottom-[52px] left-0 right-0 z-40 border-t border-border bg-card px-3 pb-1 pt-2 md:hidden">
      <div className="flex items-center gap-2">
        {/* Wish */}
        <Button
          variant="ghost"
          size="sm"
          className="h-11 w-11 flex-shrink-0 rounded-lg border border-border bg-transparent p-0 text-muted-foreground hover:text-accent"
          aria-label="찜하기"
        >
          <Heart className="h-5 w-5" />
        </Button>

        {/* Price */}
        <div className="flex min-w-0 flex-col">
          <span className="text-[10px] leading-tight text-muted-foreground">
            {"총 상품금액"}
          </span>
          <span
            className={`text-xl font-extrabold leading-none tracking-tight tabular-nums text-foreground sm:text-2xl ${blackHanSans.className}`}
          >
            {total.toLocaleString("ko-KR")}
            {"원"}
          </span>
        </div>

        {/* Buttons */}
        <div className="ml-auto flex gap-1.5">
          <Button
            variant="outline"
            size="sm"
            className="h-11 gap-1 rounded-lg border-secondary px-3 text-xs font-bold text-secondary bg-transparent hover:bg-secondary/5"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {"담기"}
          </Button>
          <Button
            size="sm"
            className="h-11 gap-1 rounded-lg bg-accent px-3 text-xs font-bold text-accent-foreground hover:bg-accent/90"
          >
            <Zap className="h-3.5 w-3.5" />
            {"구매"}
          </Button>
        </div>
      </div>
    </div>
  );
}
