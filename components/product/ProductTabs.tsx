"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, ChevronUp, ImageIcon } from "lucide-react";
import ReviewSummary from "@/components/review/ReviewSummary";
import ReviewList from "@/components/review/ReviewList";
import type {
  ProductDetail,
  ReviewItem,
  SatisfactionItem,
} from "@/lib/product-detail-mocks";

interface ProductTabsProps {
  product: ProductDetail;
  reviews: ReviewItem[];
  satisfaction: SatisfactionItem[];
}

/* ---- Tab Keys ---- */
const TAB_KEYS = ["description", "detail-images", "reviews", "info"] as const;
type TabKey = (typeof TAB_KEYS)[number];

function tabLabel(key: TabKey, reviewCount: number) {
  switch (key) {
    case "description":
      return "상품설명";
    case "detail-images":
      return "상세이미지";
    case "reviews":
      return `리뷰 (${reviewCount.toLocaleString("ko-KR")})`;
    case "info":
      return "상품정보";
  }
}

/* ==================================================================== */
/*  Description Tab                                                     */
/* ==================================================================== */
function DescriptionTab({ product }: { product: ProductDetail }) {
  const [expanded, setExpanded] = useState(false);
  const displayItems = expanded
    ? product.description
    : product.description.slice(0, 3);

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2.5 pl-1">
        {displayItems.map((desc, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-xs leading-relaxed text-foreground md:text-sm"
          >
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
            {desc}
          </li>
        ))}
      </ul>
      {product.description.length > 3 && (
        <Button
          variant="ghost"
          size="sm"
          className="mx-auto gap-1 text-xs text-muted-foreground hover:text-foreground"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              {"접기"} <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              {"더보기"} <ChevronDown className="h-3 w-3" />
            </>
          )}
        </Button>
      )}
    </div>
  );
}

/* ==================================================================== */
/*  Detail Images Tab                                                   */
/* ==================================================================== */
function DetailImagesTab() {
  return (
    <div className="flex flex-col items-center gap-3 md:gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex w-full max-w-lg flex-col items-center justify-center gap-2 rounded-lg bg-muted py-16 md:py-24"
        >
          <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
          <span className="text-xs text-muted-foreground/50">
            {"상세 이미지 "}
            {i + 1}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ==================================================================== */
/*  Specifications Tab                                                  */
/* ==================================================================== */
function SpecificationsTab({ product }: { product: ProductDetail }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full">
          <tbody>
            {product.specifications.map((spec, i) => (
              <tr
                key={spec.label}
                className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}
              >
                <td className="w-24 px-2.5 py-2 text-[11px] font-medium text-muted-foreground md:w-40 md:px-4 md:py-2.5 md:text-xs">
                  {spec.label}
                </td>
                <td className="px-2.5 py-2 text-[11px] text-foreground md:px-4 md:py-2.5 md:text-xs">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Separator />

      {/* Shipping / Exchange / Return Accordion */}
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="shipping" className="border-border">
          <AccordionTrigger className="py-3 text-sm font-medium text-foreground hover:no-underline">
            {"배송 안내"}
          </AccordionTrigger>
          <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
            <ul className="flex flex-col gap-1.5 pl-2">
              <li>{"- 택배배송: 주문 후 2~3일 이내 배송 (영업일 기준)"}</li>
              <li>{"- 배송비: 3,000원 (30,000원 이상 무료배송)"}</li>
              <li>{"- 도서산간 지역은 추가 배송비가 발생할 수 있습니다."}</li>
              <li>
                {"- 매장픽업: 주문 후 1시간 이내 수령 가능 (매장 재고 기준)"}
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="exchange" className="border-border">
          <AccordionTrigger className="py-3 text-sm font-medium text-foreground hover:no-underline">
            {"교환/반품 안내"}
          </AccordionTrigger>
          <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
            <ul className="flex flex-col gap-1.5 pl-2">
              <li>{"- 교환/반품 신청: 수령 후 7일 이내"}</li>
              <li>{"- 고객 단순 변심: 반품 배송비 고객 부담 (6,000원)"}</li>
              <li>
                {
                  "- 상품 하자/오배송: 반품 배송비 무료 (고객센터 1599-2211 접수)"
                }
              </li>
              <li>
                {"- 포장 개봉/사용 흔적이 있는 상품은 교환/반품이 불가합니다."}
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="return" className="border-border">
          <AccordionTrigger className="py-3 text-sm font-medium text-foreground hover:no-underline">
            {"환불 안내"}
          </AccordionTrigger>
          <AccordionContent className="text-xs leading-relaxed text-muted-foreground">
            <ul className="flex flex-col gap-1.5 pl-2">
              <li>
                {"- 환불은 반품 상품 회수 확인 후 3영업일 이내 처리됩니다."}
              </li>
              <li>
                {
                  "- 카드 결제 시 카드사 처리 기준에 따라 2~5일 소요될 수 있습니다."
                }
              </li>
              <li>{"- 포인트 결제 시 즉시 포인트로 환불됩니다."}</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

/* ==================================================================== */
/*  Main ProductTabs Component                                          */
/* ==================================================================== */
export default function ProductTabs({
  product,
  reviews,
  satisfaction,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const tabBarRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<TabKey, HTMLDivElement | null>>({
    description: null,
    "detail-images": null,
    reviews: null,
    info: null,
  });

  /* Scroll to section on tab click */
  const handleTabClick = useCallback((key: TabKey) => {
    setActiveTab(key);
    const el = sectionRefs.current[key];
    if (el) {
      const tabBarHeight = 56; // approximate sticky bar height
      const headerHeight = 72;
      const y =
        el.getBoundingClientRect().top +
        window.scrollY -
        tabBarHeight -
        headerHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  /* Intersection Observer for scroll-spy */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const key of TAB_KEYS) {
      const el = sectionRefs.current[key];
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveTab(key);
          }
        },
        { rootMargin: "-140px 0px -60% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="flex flex-col">
      {/* ---- Sticky Tab Bar ---- */}
      <div
        ref={tabBarRef}
        className="sticky z-20 -mx-4 border-b border-border bg-card px-4 top-0"
      >
        <div className="flex">
          {TAB_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => handleTabClick(key)}
              className={`relative flex-1 py-3 text-center text-xs font-medium transition-colors md:text-sm ${
                activeTab === key
                  ? "text-secondary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tabLabel(key, product.reviewCount)}
              {activeTab === key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ---- Sections ---- */}
      <div className="flex flex-col gap-0">
        {/* Description */}
        <div
          ref={(el) => {
            sectionRefs.current.description = el;
          }}
          className="py-6"
          id="tab-description"
        >
          <DescriptionTab product={product} />
        </div>

        <Separator />

        {/* Detail Images */}
        <div
          ref={(el) => {
            sectionRefs.current["detail-images"] = el;
          }}
          className="py-6"
          id="tab-detail-images"
        >
          <DetailImagesTab />
        </div>

        <Separator />

        {/* Reviews */}
        <div
          ref={(el) => {
            sectionRefs.current.reviews = el;
          }}
          className="py-6"
          id="tab-reviews"
        >
          <div className="flex flex-col gap-6">
            <ReviewSummary
              rating={product.rating}
              reviewCount={product.reviewCount}
              satisfaction={satisfaction}
              starDistribution={product.starDistribution}
            />
            <Separator />
            <ReviewList reviews={reviews} />
          </div>
        </div>

        <Separator />

        {/* Specifications */}
        <div
          ref={(el) => {
            sectionRefs.current.info = el;
          }}
          className="py-6"
          id="tab-info"
        >
          <SpecificationsTab product={product} />
        </div>
      </div>
    </div>
  );
}
