"use client";

import PromoCard from "@/components/promo/PromoCard";
import { PROMOS } from "@/lib/dummy-data";

export default function PromoGrid() {
  return (
    <section className="py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground md:text-xl">
          기획전
        </h2>
        <button className="text-xs text-muted-foreground hover:text-accent transition-colors">
          전체보기 &gt;
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PROMOS.map((promo) => (
          <PromoCard key={promo.id} promo={promo} />
        ))}
      </div>
    </section>
  );
}
