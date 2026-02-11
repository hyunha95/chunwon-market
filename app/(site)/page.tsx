import HeroCarousel from "@/components/home/HeroCarousel";
import QuickShortcuts from "@/components/home/QuickShortcuts";
import RecommendedProducts from "@/components/home/RecommendedProducts";
import CategoryRanking from "@/components/home/CategoryRanking";
import AppDownloadCTA from "@/components/home/AppDownloadCTA";
import { Separator } from "@/components/ui/separator";
import PromoGrid from "@/components/home/PromoGrid";
import WinterCarCareSection from "@/components/home/WinterCarCareSection";

export default function HomePage() {
  return (
    <div className="py-4 md:py-6">
      <HeroCarousel />
      <QuickShortcuts />
      <Separator />
      <RecommendedProducts />
      <Separator />
      <PromoGrid />
      <Separator />
      <WinterCarCareSection />
      <Separator />
      <CategoryRanking />
      <Separator />
      <AppDownloadCTA />
    </div>
  );
}
