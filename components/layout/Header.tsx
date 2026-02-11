"use client";

import React from "react"

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import TopBar from "./TopBar";
import CategoryMegaMenu from "./CategoryMegaMenu";
import AddressPickupModal from "@/components/modals/AddressPickupModal";
import { NAV_ITEMS } from "@/lib/dummy-data";

type RisingKeyword = {
  rank: number;
  label: string;
  movement: "up" | "same" | "new";
};

const DESKTOP_RECOMMENDED_KEYWORDS = [
  { label: "수납", symbol: "수", color: "bg-[#f1f5f9] text-[#334155]" },
  { label: "복맞이", symbol: "복", color: "bg-[#fff7ed] text-[#9a3412]" },
  { label: "짱구", symbol: "짱", color: "bg-[#eef2ff] text-[#4338ca]" },
  { label: "국민독템", symbol: "국", color: "bg-[#fef2f2] text-[#b91c1c]" },
  { label: "천원의행복", symbol: "천", color: "bg-[#ecfeff] text-[#155e75]" },
  { label: "생활꿀템", symbol: "생", color: "bg-[#fdf4ff] text-[#86198f]" },
];

const DESKTOP_RISING_KEYWORDS: RisingKeyword[] = [
  { rank: 1, label: "[고객 요청 개발 상품] ...", movement: "new" },
  { rank: 2, label: "일본제", movement: "new" },
  { rank: 3, label: "포장", movement: "new" },
  { rank: 4, label: "초코펜", movement: "up" },
  { rank: 5, label: "천원의행복", movement: "up" },
  { rank: 6, label: "젤리", movement: "up" },
  { rank: 7, label: "수납함", movement: "up" },
  { rank: 8, label: "정리함", movement: "up" },
  { rank: 9, label: "퍼프", movement: "same" },
  { rank: 10, label: "선반", movement: "same" },
];

export default function Header() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchFocused(false);
        setMegaMenuOpen(false);
      }
    },
    []
  );

  return (
    <header
      onKeyDown={handleKeyDown}
    >
      <TopBar />

      {/* Main Header Row */}
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="flex items-center gap-4 py-3 md:gap-6 md:py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 text-xl font-bold tracking-tight text-foreground md:text-2xl"
          >
            <span className="text-primary">천원</span>
            <span className="text-secondary">마켓</span>
          </Link>

          {/* Search Bar */}
          <div ref={searchRef} className="relative hidden w-full max-w-[520px] md:block">
            <form action="/search" className="relative z-[60]">
              <Input
                name="q"
                type="text"
                placeholder="검색어를 입력해 주세요"
                className={`h-11 rounded-none border border-[#3f4652] bg-white pr-11 pl-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 ${searchFocused ? "border-b-0" : ""}`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center text-[#1f2937]"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">검색</span>
              </button>
            </form>

            {/* Search Dropdown */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-full z-50 border border-t-0 border-[#3f4652] bg-white">
                <div className="px-6 pb-6 pt-8">
                  <div>
                    <h3 className="text-[18px] font-bold tracking-tight text-[#0f172a]">
                      추천 검색어
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {DESKTOP_RECOMMENDED_KEYWORDS.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full border border-[#d8dde5] bg-white px-3 py-1.5 text-[14px] font-medium text-[#334155] transition-colors hover:border-[#b8c1cf]"
                          onClick={() => setSearchValue(item.label)}
                        >
                          <span
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${item.color}`}
                          >
                            {item.symbol}
                          </span>
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-9">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[18px] font-bold tracking-tight text-[#0f172a]">
                        급상승 검색어
                      </h3>
                      <span className="text-[11px] text-[#75849a]">
                        최근 1시간, 검색횟수 급상승
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
                      {DESKTOP_RISING_KEYWORDS.map((item) => (
                        <div key={item.rank} className="flex items-center gap-2 text-[16px]">
                          <span className="w-7 text-right font-extrabold text-[#0f172a]">
                            {item.rank}
                          </span>
                          <span className="flex-1 truncate font-medium text-[#334155]">
                            {item.label}
                          </span>
                          <span className="w-4 text-right text-[10px]">
                            {item.movement === "up" ? (
                              <span className="font-semibold text-[#dc2626]">▲</span>
                            ) : item.movement === "new" ? (
                              <span className="font-black text-[#dc2626]">N</span>
                            ) : (
                              <span className="font-semibold text-[#9ca3af]">-</span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end border-t border-[#e5e7eb] px-5 py-3">
                  <button
                    type="button"
                    onClick={() => setSearchFocused(false)}
                    className="inline-flex items-center justify-center text-[#4b5563] transition-colors hover:text-[#111827]"
                    aria-label="검색 패널 닫기"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Mobile Search */}
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="md:hidden text-foreground hover:text-accent"
            >
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">검색</span>
              </Link>
            </Button>

            <AddressPickupModal>
              <Button
                variant="ghost"
                size="sm"
                className="hidden flex-col items-center gap-0.5 text-foreground hover:text-accent md:flex"
              >
                <User className="h-5 w-5" />
                <span className="text-[10px]">로그인</span>
              </Button>
            </AddressPickupModal>
            <Button
              variant="ghost"
              size="sm"
              className="hidden flex-col items-center gap-0.5 text-foreground hover:text-accent md:flex"
            >
              <Heart className="h-5 w-5" />
              <span className="text-[10px]">찜</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="relative flex flex-col items-center gap-0.5 text-foreground hover:text-accent"
            >
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent p-0 text-[10px] text-accent-foreground">
                  3
                </Badge>
              </div>
              <span className="hidden text-[10px] md:block">장바구니</span>
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Primary Nav */}
      <div className="relative mx-auto hidden max-w-[1200px] px-4 md:block">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 font-medium text-foreground hover:text-accent"
            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
          >
            <Menu className="h-4 w-4" />
            카테고리
          </Button>
          <Separator orientation="vertical" className="mx-1 h-4" />
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/20 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <CategoryMegaMenu
          open={megaMenuOpen}
          onClose={() => setMegaMenuOpen(false)}
        />
      </div>

      <Separator className="hidden md:block" />
    </header>
  );
}
