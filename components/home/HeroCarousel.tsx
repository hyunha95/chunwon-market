"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/dummy-data";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  if (!loaded) {
    return (
      <div className="aspect-[21/9] w-full animate-pulse rounded-xl bg-secondary md:aspect-[21/7]" />
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {HERO_SLIDES.map((slide) => (
          <div
            key={slide.id}
            className={`w-full flex-shrink-0 ${slide.bgColor} flex aspect-[21/9] items-center justify-center md:aspect-[21/7]`}
          >
            <div className="px-6 text-center">
              <h2 className="mb-2 text-xl font-bold text-secondary-foreground md:text-3xl lg:text-4xl">
                {slide.title}
              </h2>
              <p className="text-sm text-secondary-foreground/80 md:text-base">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 bg-card/60 p-0 text-foreground hover:bg-card/90 md:inline-flex md:h-10 md:w-10 md:rounded-full"
        onClick={prev}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">이전</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 bg-card/60 p-0 text-foreground hover:bg-card/90 md:inline-flex md:h-10 md:w-10 md:rounded-full"
        onClick={next}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">다음</span>
      </Button>

      {/* Pagination Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            className={`h-2 rounded-full transition-all ${
              idx === current
                ? "w-6 bg-card"
                : "w-2 bg-card/50"
            }`}
            onClick={() => setCurrent(idx)}
            aria-label={`슬라이드 ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
