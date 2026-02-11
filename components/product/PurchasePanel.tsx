"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AddressPickupModal from "@/components/modals/AddressPickupModal";
import {
  Star,
  Heart,
  Share2,
  Copy,
  Minus,
  Plus,
  Truck,
  Store,
  ChevronRight,
  ShoppingCart,
  Zap,
  CreditCard,
  Check,
  Info,
} from "lucide-react";
import type { ProductDetail } from "@/lib/product-detail-mocks";
import { PAYMENT_BENEFITS } from "@/lib/product-detail-mocks";
import { useToast } from "@/hooks/use-toast";
import { blackHanSans } from "@/lib/fonts";

interface PurchasePanelProps {
  product: ProductDetail;
}

export default function PurchasePanel({ product }: PurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [wished, setWished] = useState(false);
  const [copied, setCopied] = useState(false);
  const [benefitsExpanded, setBenefitsExpanded] = useState(false);
  const { toast } = useToast();

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  const totalPrice = product.price * quantity;

  const handleCopySku = async () => {
    try {
      await navigator.clipboard.writeText(product.sku);
      setCopied(true);
      toast({ title: "품번이 복사되었습니다.", description: product.sku });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "복사 실패",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  const visibleBenefits = benefitsExpanded
    ? PAYMENT_BENEFITS
    : PAYMENT_BENEFITS.slice(0, 3);

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {/* ---- Badges ---- */}
      {product.badges.length > 0 && (
        <div className="flex gap-1.5">
          {product.badges.map((badge) => (
            <Badge
              key={badge}
              className={
                badge === "BEST"
                  ? "rounded-sm bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground"
                  : "rounded-sm bg-accent px-2 py-0.5 text-[11px] text-accent-foreground"
              }
            >
              {badge}
            </Badge>
          ))}
        </div>
      )}

      {/* ---- Product Name ---- */}
      <h1 className="text-balance text-base font-bold leading-snug text-foreground md:text-xl">
        {product.name}
      </h1>

      {/* ---- SKU + Copy ---- */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {"품번 "}
          {product.sku}
        </span>
        <button
          onClick={handleCopySku}
          className="flex min-h-[44px] items-center gap-0.5 text-xs text-muted-foreground transition-colors hover:text-accent md:min-h-0"
          aria-label="품번 복사"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-600" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          <span>{copied ? "복사됨" : "복사"}</span>
        </button>
      </div>

      {/* ---- Rating + Review Count ---- */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating)
                  ? "fill-primary text-primary"
                  : i < product.rating
                    ? "fill-primary/50 text-primary"
                    : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-bold text-foreground">
          {product.rating}
        </span>
        <Separator orientation="vertical" className="h-3" />
        <span className="text-sm text-accent">
          {product.reviewCount.toLocaleString("ko-KR")}
          {"개 리뷰"}
        </span>
      </div>

      <Separator />

      {/* ---- Price Block ---- */}
      <div className="flex flex-col gap-1.5">
        {product.originalPrice && (
          <span
            className={`text-xl font-extrabold leading-none tracking-tight text-muted-foreground line-through sm:text-2xl ${blackHanSans.className}`}
          >
            {product.originalPrice.toLocaleString("ko-KR")}
            {"원"}
          </span>
        )}
        <div className="flex items-baseline gap-2">
          {discountPercent && (
            <span className="text-xl font-bold text-accent md:text-2xl">
              {discountPercent}
              {"%"}
            </span>
          )}
          <span
            className={`text-xl font-extrabold leading-none tracking-tight text-foreground sm:text-2xl ${blackHanSans.className}`}
          >
            {product.price.toLocaleString("ko-KR")}
            {"원"}
          </span>
        </div>

        {/* Point */}
        <div className="mt-0.5 flex items-center gap-1.5 rounded bg-primary/15 px-2.5 py-1.5">
          <CreditCard className="h-3.5 w-3.5 flex-shrink-0 text-foreground" />
          <span className="text-xs font-medium text-foreground">
            {product.pointRate}
            {" 포인트 적립"}
          </span>
          <span className="text-xs text-muted-foreground">
            {"("}
            {product.pointText}
            {")"}
          </span>
        </div>
      </div>

      <Separator />

      {/* ---- Payment Benefits ---- */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <Info className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">
            {"결제 혜택"}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {visibleBenefits.map((b) => (
            <Badge
              key={b.label}
              variant="outline"
              className="cursor-default gap-1 border-border bg-card px-2 py-1 text-[11px] text-muted-foreground hover:border-muted-foreground/40"
            >
              <span className="font-medium text-foreground">{b.label}</span>
              {b.desc}
            </Badge>
          ))}
        </div>
        {PAYMENT_BENEFITS.length > 3 && (
          <button
            className="self-start text-[11px] text-muted-foreground underline hover:text-accent"
            onClick={() => setBenefitsExpanded(!benefitsExpanded)}
          >
            {benefitsExpanded ? "접기" : `+${PAYMENT_BENEFITS.length - 3}개 더보기`}
          </button>
        )}
      </div>

      <Separator />

      {/* ---- Delivery Section ---- */}
      <div className="flex flex-col gap-2">
        {/* Standard */}
        <div className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-2.5 md:gap-3 md:p-3">
          <Truck className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-xs font-medium text-foreground md:text-sm">
              {product.deliveryInfo.method}
            </span>
            <span className="text-[11px] font-medium text-accent md:text-xs">
              {product.deliveryInfo.estimatedDate}
            </span>
            <span className="text-[10px] text-muted-foreground md:text-[11px]">
              {"배송비 "}
              {product.deliveryInfo.fee}
              {" / "}
              {product.deliveryInfo.freeThreshold}
            </span>
          </div>
          <AddressPickupModal>
            <button className="flex min-h-[44px] flex-shrink-0 items-center text-[11px] text-muted-foreground hover:text-accent md:min-h-0 md:text-xs">
              {"변경"}
              <ChevronRight className="h-3 w-3" />
            </button>
          </AddressPickupModal>
        </div>

        {/* Pickup */}
        <div className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-2.5 md:gap-3 md:p-3">
          <Store className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-xs font-medium text-foreground md:text-sm">
              {"매장픽업"}
            </span>
            <span className="text-[10px] text-muted-foreground md:text-[11px]">
              {product.pickupInfo.message}
            </span>
          </div>
          <AddressPickupModal>
            <button className="flex min-h-[44px] flex-shrink-0 items-center text-[11px] text-muted-foreground hover:text-accent md:min-h-0 md:text-xs">
              {"선택"}
              <ChevronRight className="h-3 w-3" />
            </button>
          </AddressPickupModal>
        </div>
      </div>

      <Separator />

      {/* ---- Quantity Stepper ---- */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{"수량"}</span>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 rounded-r-none border-border bg-transparent p-0 text-foreground hover:bg-muted"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label="수량 줄이기"
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <div className="flex h-9 w-12 items-center justify-center border-y border-border text-sm font-medium tabular-nums text-foreground">
            {quantity}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 rounded-l-none border-border bg-transparent p-0 text-foreground hover:bg-muted"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            disabled={quantity >= 99}
            aria-label="수량 늘리기"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* ---- Total ---- */}
      <div className="flex items-center justify-between rounded-lg bg-primary/10 px-3 py-2.5 md:px-4 md:py-3">
        <span className="text-xs font-medium text-foreground md:text-sm">
          {"총 상품금액"}
        </span>
        <div className="flex items-baseline gap-0.5">
          <span
            className={`text-xl font-extrabold leading-none tracking-tight tabular-nums text-foreground sm:text-2xl ${blackHanSans.className}`}
          >
            {totalPrice.toLocaleString("ko-KR")}
            {"원"}
          </span>
        </div>
      </div>

      {/* ---- CTA Row (desktop only — mobile uses MobileBuyBar) ---- */}
      <div className="hidden gap-2 md:flex">
        {/* Wish */}
        <Button
          variant="ghost"
          size="sm"
          className={`h-12 w-12 flex-shrink-0 rounded-lg border p-0 ${
            wished
              ? "border-accent bg-accent/10 text-accent hover:bg-accent/20"
              : "border-border bg-transparent text-muted-foreground hover:text-accent"
          }`}
          onClick={() => {
            setWished(!wished);
            toast({
              title: wished
                ? "찜 해제되었습니다."
                : "찜 목록에 추가되었습니다.",
            });
          }}
          aria-label={wished ? "찜 해제" : "찜하기"}
        >
          <Heart className={`h-5 w-5 ${wished ? "fill-accent" : ""}`} />
        </Button>

        {/* Cart */}
        <Button
          variant="outline"
          className="h-12 flex-1 gap-2 rounded-lg border-secondary text-sm font-bold text-secondary bg-transparent hover:bg-secondary/5"
        >
          <ShoppingCart className="h-4 w-4" />
          {"장바구니"}
        </Button>

        {/* Buy Now */}
        <Button className="h-12 flex-1 gap-2 rounded-lg bg-accent text-sm font-bold text-accent-foreground hover:bg-accent/90">
          <Zap className="h-4 w-4" />
          {"바로구매"}
        </Button>
      </div>

      {/* ---- Mobile: quick share + wish row ---- */}
      <div className="flex items-center justify-center gap-4 md:hidden">
        <button
          className="flex min-h-[44px] items-center gap-1 text-xs text-muted-foreground hover:text-accent"
          onClick={() => {
            setWished(!wished);
            toast({
              title: wished
                ? "찜 해제되었습니다."
                : "찜 목록에 추가되었습니다.",
            });
          }}
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-accent text-accent" : ""}`} />
          {wished ? "찜 해제" : "찜하기"}
        </button>
        <Separator orientation="vertical" className="h-3" />
        <button
          className="flex min-h-[44px] items-center gap-1 text-xs text-muted-foreground hover:text-accent"
          onClick={() => toast({ title: "공유 링크가 복사되었습니다." })}
        >
          <Share2 className="h-3.5 w-3.5" />
          {"공유하기"}
        </button>
      </div>

      {/* ---- Share (desktop) ---- */}
      <div className="hidden justify-center md:flex">
        <button
          className="flex min-h-[44px] items-center gap-1 text-xs text-muted-foreground hover:text-accent"
          onClick={() => toast({ title: "공유 링크가 복사되었습니다." })}
        >
          <Share2 className="h-3.5 w-3.5" />
          {"공유하기"}
        </button>
      </div>
    </div>
  );
}
