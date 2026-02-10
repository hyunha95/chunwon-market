import React from "react"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 pb-5 sm:pb-28">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
