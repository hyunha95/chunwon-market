"use client";

import { MEGA_MENU_CATEGORIES } from "@/lib/dummy-data";
import Link from "next/link";

interface CategoryMegaMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function CategoryMegaMenu({
  open,
  onClose,
}: CategoryMegaMenuProps) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-foreground/20"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="메가메뉴 닫기"
      />
      <div className="absolute left-0 right-0 top-full z-50 border-b border-border bg-card shadow-lg">
        <div className="mx-auto max-w-[1200px] px-4 py-6">
          <div className="grid grid-cols-3 gap-8 lg:grid-cols-6">
            {MEGA_MENU_CATEGORIES.map((category) => (
              <div key={category.title}>
                <h3 className="mb-3 text-sm font-bold text-foreground">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-xs text-muted-foreground transition-colors hover:text-accent"
                        onClick={onClose}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
