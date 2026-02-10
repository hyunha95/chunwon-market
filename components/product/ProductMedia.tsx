"use client";

import React from "react"

import { useState, useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductMediaProps {
  images: string[];
  productName: string;
}

/* --- placeholder box ------------------------------------------------ */
function ImagePlaceholder({
  index,
  className,
  size = "lg",
}: {
  index: number;
  className?: string;
  size?: "sm" | "lg";
}) {
  return (
    <div
      className={cn(
        "flex select-none items-center justify-center bg-muted",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-1 text-muted-foreground">
        <ImageIcon
          className={size === "sm" ? "h-5 w-5 opacity-30" : "h-10 w-10 opacity-30"}
        />
        <span className={size === "sm" ? "text-[9px] opacity-40" : "text-xs opacity-50"}>
          {"상품 이미지 "}
          {index + 1}
        </span>
      </div>
    </div>
  );
}

/* ==================================================================== */
export default function ProductMedia({
  images,
  productName,
}: ProductMediaProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  /* ---- touch swipe for mobile ---- */
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const goTo = useCallback(
    (dir: "prev" | "next", current: number) => {
      if (dir === "prev") return current === 0 ? images.length - 1 : current - 1;
      return current === images.length - 1 ? 0 : current + 1;
    },
    [images.length],
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 40) {
      setSelectedIndex((prev) =>
        touchDeltaX.current < 0 ? goTo("next", prev) : goTo("prev", prev),
      );
    }
  };

  /* ================================================================== */
  return (
    <>
      {/* ---- Desktop Gallery ---- */}
      <div className="hidden md:block">
        {/* Main Image */}
        <button
          type="button"
          className="group relative mb-3 block aspect-square w-full cursor-zoom-in overflow-hidden rounded-lg border border-border bg-card"
          onClick={() => setLightboxOpen(true)}
          aria-label={`${productName} 이미지 확대`}
        >
          <ImagePlaceholder index={selectedIndex} className="h-full w-full" />
          <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all group-hover:bg-foreground/5 group-hover:opacity-100">
            <ZoomIn className="h-8 w-8 text-foreground/60" />
          </span>
        </button>

        {/* Thumbnails */}
        <div className="flex gap-2" role="listbox" aria-label="상품 이미지 목록">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded border-2 transition-all",
                selectedIndex === i
                  ? "border-primary ring-1 ring-primary/30"
                  : "border-border hover:border-muted-foreground/40",
              )}
              role="option"
              aria-selected={selectedIndex === i}
              aria-label={`이미지 ${i + 1} 선택`}
            >
              <ImagePlaceholder index={i} className="h-full w-full" size="sm" />
            </button>
          ))}
        </div>
      </div>

      {/* ---- Mobile Swipe Gallery ---- */}
      <div className="relative md:hidden">
        <div
          className="relative aspect-square overflow-hidden bg-card"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ImagePlaceholder index={selectedIndex} className="h-full w-full" />

          {/* Arrows */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card/80 p-0 text-foreground shadow-sm hover:bg-card"
            onClick={() => setSelectedIndex((p) => goTo("prev", p))}
            aria-label="이전 이미지"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-card/80 p-0 text-foreground shadow-sm hover:bg-card"
            onClick={() => setSelectedIndex((p) => goTo("next", p))}
            aria-label="다음 이미지"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Counter pill */}
          <span className="absolute bottom-3 right-3 rounded-full bg-foreground/60 px-2.5 py-0.5 text-[11px] font-medium tabular-nums text-card">
            {selectedIndex + 1}
            {" / "}
            {images.length}
          </span>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 py-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                selectedIndex === i ? "w-5 bg-secondary" : "w-1.5 bg-border",
              )}
              aria-label={`이미지 ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ---- Lightbox Dialog ---- */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-h-[90vh] w-[calc(100%-1rem)] max-w-3xl border-none bg-foreground/95 p-0 text-card sm:w-full [&>button]:hidden">
          <DialogTitle className="sr-only">
            {productName} 이미지 확대
          </DialogTitle>
          <DialogDescription className="sr-only">
            상품 이미지를 확대하여 볼 수 있습니다.
          </DialogDescription>

          <div className="relative flex items-center justify-center p-4">
            {/* Close */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-3 top-3 z-10 h-8 w-8 rounded-full p-0 text-card/80 hover:bg-card/10 hover:text-card"
              onClick={() => setLightboxOpen(false)}
              aria-label="닫기"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Prev */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-3 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full p-0 text-card/80 hover:bg-card/10 hover:text-card"
              onClick={() => setSelectedIndex((p) => goTo("prev", p))}
              aria-label="이전 이미지"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {/* Image */}
            <div className="aspect-square w-full max-w-lg">
              <ImagePlaceholder
                index={selectedIndex}
                className="h-full w-full rounded-lg"
              />
            </div>

            {/* Next */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-3 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full p-0 text-card/80 hover:bg-card/10 hover:text-card"
              onClick={() => setSelectedIndex((p) => goTo("next", p))}
              aria-label="다음 이미지"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Counter */}
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-card/10 px-3 py-1 text-sm tabular-nums text-card/80">
              {selectedIndex + 1}
              {" / "}
              {images.length}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
