import HeroCarousel from "@/components/home/HeroCarousel";
import QuickShortcuts from "@/components/home/QuickShortcuts";
import RecommendedProducts from "@/components/home/RecommendedProducts";
import CategoryRanking from "@/components/home/CategoryRanking";
import PromoGrid from "@/components/home/PromoGrid";
import AppDownloadCTA from "@/components/home/AppDownloadCTA";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <div className="py-4 md:py-6">
      <HeroCarousel />
      <QuickShortcuts />
      <Separator />
      <RecommendedProducts />
      <Separator />
      <CategoryRanking />
      <Separator />
      <PromoGrid />
      <Separator />
      <AppDownloadCTA />
    </div>
  );
}
