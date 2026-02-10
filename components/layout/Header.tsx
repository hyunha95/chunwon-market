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
import { NAV_ITEMS, POPULAR_SEARCHES } from "@/lib/dummy-data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <div ref={searchRef} className="relative hidden flex-1 md:block">
            <div className="relative">
              <Input
                type="text"
                placeholder="검색어를 입력해 주세요"
                className="h-10 rounded-full border-2 border-primary bg-card pr-10 pl-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
              />
              <Button
                size="sm"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full text-accent-foreground hover:bg/90"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">검색</span>
              </Button>
            </div>

            {/* Search Dropdown */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-border bg-card p-4 shadow-lg">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">
                    인기 검색어
                  </span>
                  <button
                    onClick={() => setSearchFocused(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term, idx) => (
                    <button
                      key={term}
                      className="flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
                      onClick={() => {
                        setSearchValue(term);
                        setSearchFocused(false);
                      }}
                    >
                      <span className="font-medium text-accent">
                        {idx + 1}
                      </span>
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-foreground hover:text-accent"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">검색</span>
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
