import React from "react"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { auth0 } from "@/lib/auth0";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();
  const user = session?.user
    ? {
        name: session.user.name as string | undefined,
        email: session.user.email as string | undefined,
        picture: session.user.picture as string | undefined,
        sub: session.user.sub as string | undefined,
      }
    : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 pb-5 sm:pb-28">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
