"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Separator} from "@/components/ui/separator";
import {Skeleton} from "@/components/ui/skeleton";
import ProductMedia from "@/components/product/ProductMedia";
import PurchasePanel from "@/components/product/PurchasePanel";
import MobileBuyBar from "@/components/product/MobileBuyBar";
import ProductTabs from "@/components/product/ProductTabs";
import ProductCard from "@/components/product/ProductCard";
import {ChevronRight} from "lucide-react";
import {
  PRODUCT_DETAIL,
  REVIEWS,
  SATISFACTION_DATA,
  RELATED_PRODUCTS,
} from "@/lib/product-detail-mocks";

/* ================================================================== */
/*  Skeleton Components                                                */

/* ================================================================== */

function MediaSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-square w-full rounded-lg"/>
      <div className="flex justify-center gap-1.5 md:hidden">
        {Array.from({length: 4}).map((_, i) => (
          <Skeleton key={i} className="h-1.5 w-1.5 rounded-full"/>
        ))}
      </div>
      <div className="hidden gap-2 md:flex">
        {Array.from({length: 6}).map((_, i) => (
          <Skeleton key={i} className="h-[72px] w-[72px] rounded"/>
        ))}
      </div>
    </div>
  );
}

function PanelSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1.5">
        <Skeleton className="h-5 w-12 rounded-sm"/>
        <Skeleton className="h-5 w-10 rounded-sm"/>
      </div>
      <Skeleton className="h-6 w-4/5"/>
      <Skeleton className="h-6 w-3/5"/>
      <Skeleton className="h-4 w-44"/>
      <div className="flex gap-1">
        {Array.from({length: 5}).map((_, i) => (
          <Skeleton key={i} className="h-4 w-4 rounded-full"/>
        ))}
        <Skeleton className="ml-2 h-4 w-24"/>
      </div>
      <Skeleton className="h-px w-full"/>
      <Skeleton className="h-5 w-20"/>
      <Skeleton className="h-9 w-40"/>
      <Skeleton className="h-8 w-full rounded"/>
      <Skeleton className="h-px w-full"/>
      <div className="flex flex-wrap gap-1.5">
        {Array.from({length: 3}).map((_, i) => (
          <Skeleton key={i} className="h-6 w-28 rounded-full"/>
        ))}
      </div>
      <Skeleton className="h-px w-full"/>
      <Skeleton className="h-20 w-full rounded-lg"/>
      <Skeleton className="h-16 w-full rounded-lg"/>
      <Skeleton className="h-px w-full"/>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-10"/>
        <Skeleton className="h-9 w-28 rounded"/>
      </div>
      <Skeleton className="h-12 w-full rounded-lg"/>
      <div className="hidden gap-2 md:flex">
        <Skeleton className="h-12 w-12 rounded-lg"/>
        <Skeleton className="h-12 flex-1 rounded-lg"/>
        <Skeleton className="h-12 flex-1 rounded-lg"/>
      </div>
    </div>
  );
}

function TabsSkeleton() {
  return (
    <div className="flex flex-col gap-3 pt-4 md:gap-4 md:pt-6">
      <div className="-mx-4 flex border-b border-border px-4">
        {Array.from({length: 4}).map((_, i) => (
          <Skeleton key={i} className="h-9 flex-1 rounded-none md:h-10"/>
        ))}
      </div>
      <div className="flex flex-col gap-2.5 pt-3 md:gap-3 md:pt-4">
        {Array.from({length: 4}).map((_, i) => (
          <Skeleton
            key={i}
            className="h-3.5 md:h-4"
            style={{width: `${85 - i * 10}%`}}
          />
        ))}
      </div>
    </div>
  );
}

function RelatedSkeleton() {
  return (
    <div className="flex gap-2.5 overflow-hidden md:grid md:grid-cols-4 lg:grid-cols-6 md:gap-3">
      {Array.from({length: 6}).map((_, i) => (
        <div key={i} className="w-36 flex-shrink-0 md:w-auto">
          <Skeleton className="aspect-square w-full rounded-lg"/>
          <div className="mt-1.5 flex flex-col gap-1 md:mt-2 md:gap-1.5">
            <Skeleton className="h-3 w-full"/>
            <Skeleton className="h-3 w-3/4"/>
            <Skeleton className="h-3.5 w-14 md:h-4 md:w-16"/>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/*  Main Page                                                          */
/* ================================================================== */

export default function ProductDetailPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const product = PRODUCT_DETAIL;

  return (
    <>
      <div className="md:pb-10">
        {/* ---- Breadcrumb ---- */}
        <nav className="overflow-x-auto py-3 scrollbar-hide" aria-label="경로">
          <Breadcrumb>
            <BreadcrumbList>
              {product.category.map((cat, i) => {
                const isLast = i === product.category.length - 1;
                return isLast ? (
                  <BreadcrumbItem key={cat}>
                    <BreadcrumbPage className="text-xs text-foreground">
                      {cat}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem key={cat}>
                    <BreadcrumbLink asChild>
                      <Link
                        href={i === 0 ? "/public" : "#"}
                        className="text-xs text-muted-foreground hover:text-accent"
                      >
                        {cat}
                      </Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-3 w-3"/>
                    </BreadcrumbSeparator>
                  </BreadcrumbItem>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
      </div>

      {/* ---- Main 2-Column Layout ---- */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8 lg:gap-10">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-[60%]">
          {/* Media */}
          <section>
            {loading ? (
              <MediaSkeleton/>
            ) : (
              <ProductMedia images={product.images} productName={product.name}/>
            )}
          </section>

          {/* ✅ MOBILE: PurchasePanel 바로 아래 */}
          <div className="md:hidden">
            <Separator className="my-6"/>
            {loading ? <PanelSkeleton/> : <PurchasePanel product={product}/>}
          </div>

          <Separator className="my-6 md:my-8"/>

          {/* Tabs / Detail */}
          {loading ? (
            <TabsSkeleton/>
          ) : (
            <ProductTabs
              product={product}
              reviews={REVIEWS}
              satisfaction={SATISFACTION_DATA}
            />
          )}

          <Separator className="my-6 md:my-8"/>

          {/* Related Products */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground md:text-lg">
                함께 보면 좋은 상품
              </h2>
              <Link
                href="#"
                className="flex items-center text-xs text-muted-foreground hover:text-accent"
              >
                전체보기
                <ChevronRight className="h-3.5 w-3.5"/>
              </Link>
            </div>

            {loading ? (
              <RelatedSkeleton/>
            ) : (
              <>
                {/* Mobile: horizontal scroll */}
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide md:hidden">
                  {RELATED_PRODUCTS.map((p) => (
                    <div key={p.id} className="w-36 flex-shrink-0">
                      <ProductCard product={p}/>
                    </div>
                  ))}
                </div>

                {/* Desktop: grid */}
                <div className="hidden grid-cols-2 gap-3 md:grid lg:grid-cols-4 xl:grid-cols-5">
                  {RELATED_PRODUCTS.map((p) => (
                    <ProductCard key={p.id} product={p}/>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>

        {/* ✅ DESKTOP ONLY: sticky PurchasePanel */}
        <aside className="hidden w-full md:block md:w-1/2 lg:w-[40%] md:sticky md:top-[40px] md:self-start">
          {loading ? <PanelSkeleton/> : <PurchasePanel product={product}/>}
        </aside>
      </div>

      {/* ---- Mobile Bottom Buy Bar ---- */}
      <MobileBuyBar price={product.price} quantity={1}/>
    </>
  );
}
