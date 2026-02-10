"use client";

import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

export default function AppDownloadCTA() {
  return (
    <section className="py-6">
      <div className="flex flex-col items-center justify-between gap-4 rounded-xl bg-secondary px-6 py-6 md:flex-row md:px-10 md:py-8">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="hidden rounded-xl bg-secondary-foreground/10 p-3 md:block">
            <Smartphone className="h-8 w-8 text-secondary-foreground" />
          </div>
          <div>
            <h3 className="text-base font-bold text-secondary-foreground md:text-lg">
              천원마켓 앱 다운로드
            </h3>
            <p className="text-xs text-secondary-foreground/70 md:text-sm">
              앱에서 더 빠르고 편리하게 쇼핑하세요! 앱 전용 혜택도 놓치지
              마세요.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
          >
            Google Play
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
          >
            App Store
          </Button>
        </div>
      </div>
    </section>
  );
}
