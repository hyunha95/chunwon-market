"use client";

import Link from "next/link";
import {
  Home,
  LayoutGrid,
  Search,
  ClipboardList,
  ShoppingCart,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "홈", icon: Home, href: "/" },
  { label: "카테고리", icon: LayoutGrid, href: "#" },
  { label: "검색", icon: Search, href: "/search" },
  { label: "주문", icon: ClipboardList, href: "#" },
  { label: "장바구니", icon: ShoppingCart, href: "#" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card md:hidden">
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-0.5 text-muted-foreground transition-colors hover:text-accent"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
