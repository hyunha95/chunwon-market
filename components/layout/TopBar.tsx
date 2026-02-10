"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden border-b border-border bg-card text-xs text-muted-foreground md:block">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-1.5">
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-0.5 hover:text-accent transition-colors">
              고객센터
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <span className="text-xs">온라인몰 1599-2211</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="text-xs">매장 1522-4400</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-3">
          <Link href="#" className="hover:text-accent transition-colors">
            주문조회
          </Link>
          <span className="text-border">|</span>
          <Link href="#" className="hover:text-accent transition-colors">
            취소/교환/반품
          </Link>
          <span className="text-border">|</span>
          <Link href="#" className="hover:text-accent transition-colors">
            공지사항
          </Link>
          <span className="text-border">|</span>
          <Link href="#" className="hover:text-accent transition-colors">
            1:1문의
          </Link>
        </div>
      </div>
    </div>
  );
}
