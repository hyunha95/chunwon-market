"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Phone, ExternalLink } from "lucide-react";

function SocialIcon({ label }: { label: string }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground transition-colors hover:bg-primary/30 hover:text-secondary">
      {label.slice(0, 2)}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card pb-20 md:pb-0">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:py-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5 md:gap-8">
          {/* A) 고객센터 */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-foreground">
              고객센터
            </h4>
            <div className="mb-2 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-accent" />
              <span className="text-sm font-bold text-foreground">
                1599-2211
              </span>
            </div>
            <p className="mb-3 text-[11px] text-muted-foreground">
              온라인 천원마켓
              <br />
              평일 09:00 ~ 18:00
            </p>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  주문조회
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  취소/교환/반품 신청
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  1:1문의
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  공지사항
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  제휴문의
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  고객센터
                </Link>
              </li>
            </ul>
          </div>

          {/* B) 다이소 매장 */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-foreground">
              천원마켓 매장
            </h4>
            <div className="mb-2 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-accent" />
              <span className="text-sm font-bold text-foreground">
                1522-4400
              </span>
            </div>
            <p className="mb-3 text-[11px] text-muted-foreground">
              평일 09:00 ~ 18:00
            </p>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  매장위치/재고
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  매장 안내
                </Link>
              </li>
            </ul>
          </div>

          {/* C) 멤버십 */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-foreground">멤버십</h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  멤버십 소개
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  포인트 적립/사용내역
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  포인트 선물하기
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  멤버십 패밀리
                </Link>
              </li>
            </ul>
          </div>

          {/* D) 회사소개 */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-foreground">
              회사소개
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  기업 소개
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  국민가게, 천원마켓
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  경영이념
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  인재채용
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  납품문의
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  제휴문의
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  가맹문의
                </Link>
              </li>
            </ul>
          </div>

          {/* E) 소셜/앱 */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-foreground">
              소셜/앱
            </h4>
            <div className="mb-4 flex flex-wrap gap-2">
              <SocialIcon label="블로그" />
              <SocialIcon label="인스타" />
              <SocialIcon label="페북" />
              <SocialIcon label="유튜브" />
              <SocialIcon label="틱톡" />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start gap-1 text-xs border-border text-foreground bg-transparent hover:text-accent"
              >
                <ExternalLink className="h-3 w-3" />
                Google Play
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start gap-1 text-xs border-border text-foreground bg-transparent hover:text-accent"
              >
                <ExternalLink className="h-3 w-3" />
                App Store
              </Button>
            </div>
            <Separator className="my-3" />
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="#"
                  className="text-[11px] text-muted-foreground transition-colors hover:text-accent"
                >
                  사이트 장애 신고
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      {/* Footer Bottom */}
      <div className="mx-auto max-w-[1200px] px-4 py-6">
        {/* Links Row */}
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            서비스이용약관
          </Link>
          <span className="text-border">|</span>
          <Link
            href="#"
            className="font-bold text-foreground transition-colors hover:text-accent"
          >
            개인정보처리방침
          </Link>
          <span className="text-border">|</span>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            청소년보호정책
          </Link>
          <span className="text-border">|</span>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            위치기반서비스 이용약관
          </Link>
        </div>

        {/* Company Info */}
        <div className="mb-4 text-[11px] leading-relaxed text-muted-foreground">
          <p>
            (주)천원마켓 | 대표이사: OOO | 사업자등록번호: 000-00-00000
          </p>
          <p>
            통신판매업신고: 제0000-서울강남-00000호 | 주소: 서울특별시 강남구
            테헤란로 000, 00층
          </p>
          <p>개인정보 보호책임자: OOO</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link
              href="#"
              className="text-muted-foreground underline transition-colors hover:text-accent"
            >
              사업자정보 확인
            </Link>
            <Link
              href="#"
              className="text-muted-foreground underline transition-colors hover:text-accent"
            >
              구매안전 서비스 가입 확인
            </Link>
          </div>
        </div>

        {/* Certification Badges */}
        <div className="mb-4 flex gap-3">
          {["인증 1", "인증 2", "인증 3"].map((badge) => (
            <div
              key={badge}
              className="flex h-10 w-20 items-center justify-center rounded border border-border bg-secondary text-[10px] text-muted-foreground"
            >
              {badge}
            </div>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-[11px] text-muted-foreground">
          Copyright (c) 2026 천원마켓. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
