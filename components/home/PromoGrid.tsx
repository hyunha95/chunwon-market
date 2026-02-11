import React from "react";
import Image from "next/image";

type BannerProps = {
    title: string;
    subtitle?: string;
    cta?: string;
    imageUrl: string;
};

type ProductProps = {
    price: string;
    title: string;
    subtitle?: string;
    imageUrl: string;
};

function BannerTile({title, subtitle, cta = "자세히보기", imageUrl}: BannerProps) {
    return (
        <div className="relative h-[280px] md:h-[500px] overflow-hidden rounded-2xl">
            <img
                src={imageUrl}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
            />
            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"/>

            <div className="absolute left-6 bottom-6 text-white">
                <div className="text-2xl md:text-3xl font-extrabold leading-tight whitespace-pre-line">
                    {title}
                </div>
                {subtitle && <div className="mt-3 text-base md:text-lg text-white/85">{subtitle}</div>}
                <button className="mt-4 text-sm md:text-base text-white/90 underline underline-offset-4">
                    {cta}
                </button>
            </div>
        </div>
    );
}

function ProductTile({price, title, subtitle, imageUrl}: ProductProps) {
    return (
        <div className="group relative h-full bg-slate-100 overflow-hidden rounded-2xl">
            <Image
                src={imageUrl}
                alt={title}
                width={420}
                height={220}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
            />

            <div className="absolute left-5 bottom-5 md:left-6 md:bottom-6 flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <div className="text-xl font-extrabold">{price}</div>
                    <div className="mt-2 text-sm md:text-base font-semibold leading-snug">{title}</div>
                    {subtitle && <div className="mt-1 text-xs md:text-sm text-slate-600">{subtitle}</div>}
                    <button className="mt-3 text-xs md:text-sm text-slate-700 underline underline-offset-4">
                        자세히보기
                    </button>
                </div>
            </div>
        </div>
    );
}

/** 우측(또는 좌측)에 들어가는 3개 타일 묶음: (상단 1개 큰 타일) + (하단 2개) */
function SideMosaic({top, left, right}: { top: ProductProps; left: ProductProps; right: ProductProps }) {
    return (
        <div className="grid h-[280px] md:h-[500px] grid-cols-2 grid-rows-5 gap-4">
            <div className="col-span-2 row-span-2">
                <ProductTile {...top} />
            </div>
            <div className="col-span-1 row-span-3">
                <ProductTile {...left} />
            </div>
            <div className="col-span-1 row-span-3">
                <ProductTile {...right} />
            </div>
        </div>
    );
}

/** 가운데 초록 배너처럼 “배너 내부에 콜라주”가 필요한 경우 */
function LifestyleBanner() {
    return (
        <div
            className="relative h-[280px] md:h-[500px] overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl"/>
                <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl"/>
            </div>

            <div className="relative h-full p-6 flex items-end justify-between gap-4">
                <div className="text-white">
                    <div className="text-2xl md:text-3xl font-extrabold leading-tight whitespace-pre-line">
                        편리함을 주는{"\n"}다이소 생활꿀템
                    </div>
                    <button className="mt-4 text-sm md:text-base text-white/90 underline underline-offset-4">
                        자세히보기
                    </button>
                </div>

                {/* 우측 콜라주 */}
                <div className="flex items-center gap-3">
                    <div className="relative h-44 w-44 md:h-48 md:w-48 rounded-2xl bg-white/95 p-3">
                        <div
                            className="absolute -top-2 left-2 rounded-md bg-black text-white text-xs px-2 py-1 rotate-[-8deg]">
                            #정리템
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1520975958225-5d2f5f7a4d1a?auto=format&fit=crop&w=400&q=80"
                            alt="item"
                            className="h-full w-full object-cover rounded-xl"
                            loading="lazy"
                        />
                    </div>

                    <div className="grid grid-rows-3 gap-3">
                        {[
                            {
                                tag: "#아이디어템",
                                img: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=300&q=80"
                            },
                            {
                                tag: "#수납꿀템",
                                img: "https://images.unsplash.com/photo-1582582429416-9d2a04f6c3c8?auto=format&fit=crop&w=300&q=80"
                            },
                            {
                                tag: "#정돈템",
                                img: "https://images.unsplash.com/photo-1582582429222-7b7e94e58f6c?auto=format&fit=crop&w=300&q=80"
                            },
                        ].map((x) => (
                            <div key={x.tag}
                                 className="relative h-14 md:h-16 w-32 md:w-36 rounded-2xl bg-white/95 overflow-hidden">
                                <div
                                    className="absolute -top-2 left-2 rounded-md bg-black text-white text-[10px] px-2 py-1 rotate-[-8deg]">
                                    {x.tag}
                                </div>
                                <img src={x.img} alt={x.tag} className="h-full w-full object-cover" loading="lazy"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PromoGrid() {
    return (
        <div className="w-full py-6">
            <div className="space-y-4">
                {/* Row 1: (왼쪽 큰 배너 8) + (오른쪽 3타일 4) */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8">
                        <BannerTile
                            title={"편안한 저녁을 위한\n사계절 홈웨어"}
                            subtitle="부드러운 소재로 하루 마무리"
                            imageUrl="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
                        />
                    </div>
                    <div className="md:col-span-4">
                        <SideMosaic
                            top={{
                                price: "5,000원",
                                title: "부드러운\n피치 기모 원단",
                                imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            }}
                            left={{
                                price: "5,000원",
                                title: "가볍고 편안한\n면 혼방 소재",
                                imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=799&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            }}
                            right={{
                                price: "5,000원",
                                title: "세트로 입기 좋은\n체크 패턴 파자마",
                                imageUrl: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=300&q=80",
                            }}
                        />
                    </div>
                </section>

                {/* Row 2: (왼쪽 3타일 4) + (오른쪽 큰 배너 8) */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4">
                        <SideMosaic
                            top={{
                                price: "1,000원",
                                title: "속까지 깨끗한\n발포 텀블러 세제",
                                imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            }}
                            left={{
                                price: "1,000원",
                                title: "넉넉하게 사용하는\n조임끈 비닐백",
                                imageUrl: "https://plus.unsplash.com/premium_photo-1675896084254-dcb626387e1e?q=80&w=635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            }}
                            right={{
                                price: "1,000원",
                                title: "F3 사이즈의\n미술용 캔버스",
                                imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=300&q=80",
                            }}
                        />
                    </div>

                    <div className="md:col-span-8">
                        <LifestyleBanner/>
                    </div>
                </section>

                {/* Row 3: (왼쪽 큰 배너 8) + (오른쪽 3타일 4) */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8">
                        <BannerTile
                            title={"압도적 가성비\n국민 득템 UP"}
                            subtitle="놀라운 천원 살뜰구득"
                            imageUrl="https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80"
                        />
                    </div>
                    <div className="md:col-span-4">
                        <SideMosaic
                            top={{
                                price: "1,000원",
                                title: "열폭 걱정 끝!\n휴대용 렌즈클리너",
                                imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1904&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            }}
                            left={{
                                price: "1,000원",
                                title: "일상에서 간편하게\n미용티슈 280매",
                                imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=300&q=80",
                            }}
                            right={{
                                price: "1,000원",
                                title: "촘촘한 그물형\n옥수수 수세미",
                                imageUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=300&q=80",
                            }}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
