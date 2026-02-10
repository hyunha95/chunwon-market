"use client";

import React from "react"

import {
  Store,
  Truck,
  Package,
  Gift,
  Ticket,
  Sparkles,
  TrendingUp,
  LayoutGrid,
} from "lucide-react";
import { QUICK_SHORTCUTS } from "@/lib/dummy-data";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Store,
  Truck,
  Package,
  Gift,
  Ticket,
  Sparkles,
  TrendingUp,
  LayoutGrid,
};

export default function QuickShortcuts() {
  return (
    <section className="py-6">
      <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
        {QUICK_SHORTCUTS.map((shortcut) => {
          const Icon = ICON_MAP[shortcut.icon] || Package;
          return (
            <button
              key={shortcut.id}
              className="flex flex-col items-center gap-2 rounded-lg bg-card p-3 transition-colors hover:bg-secondary"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/30">
                <Icon className="h-5 w-5 text-secondary" />
              </div>
              <span className="text-xs font-medium text-foreground">
                {shortcut.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
