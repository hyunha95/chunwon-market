export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: "NEW" | "인기" | "BEST" | "할인";
  category: string;
}

export interface PromoItem {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  image: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "스테인리스 텀블러 500ml 보온보냉",
    price: 3000,
    originalPrice: 5000,
    image: "/placeholder-product.jpg",
    rating: 4.5,
    reviewCount: 1234,
    badge: "인기",
    category: "주방",
  },
  {
    id: 2,
    name: "다용도 수납박스 대형 정리함",
    price: 5000,
    image: "/placeholder-product.jpg",
    rating: 4.2,
    reviewCount: 892,
    badge: "NEW",
    category: "수납",
  },
  {
    id: 3,
    name: "극세사 청소포 10매 물걸레 청소",
    price: 2000,
    image: "/placeholder-product.jpg",
    rating: 4.8,
    reviewCount: 2156,
    badge: "BEST",
    category: "청소",
  },
  {
    id: 4,
    name: "형광펜 세트 5색 파스텔톤 학용품",
    price: 1000,
    image: "/placeholder-product.jpg",
    rating: 4.0,
    reviewCount: 456,
    category: "문구",
  },
  {
    id: 5,
    name: "LED 무드등 USB 충전식 조명",
    price: 5000,
    image: "/placeholder-product.jpg",
    rating: 4.6,
    reviewCount: 678,
    badge: "NEW",
    category: "인테리어",
  },
  {
    id: 6,
    name: "실리콘 주방장갑 내열 오븐장갑",
    price: 3000,
    image: "/placeholder-product.jpg",
    rating: 4.3,
    reviewCount: 345,
    category: "주방",
  },
  {
    id: 7,
    name: "보습 핸드크림 시어버터 50ml",
    price: 2000,
    image: "/placeholder-product.jpg",
    rating: 4.7,
    reviewCount: 1567,
    badge: "인기",
    category: "뷰티",
  },
  {
    id: 8,
    name: "접이식 빨래건조대 스탠드형",
    price: 5000,
    image: "/placeholder-product.jpg",
    rating: 4.1,
    reviewCount: 234,
    badge: "BEST",
    category: "생활",
  },
  {
    id: 9,
    name: "미니 가습기 USB 데스크 사무실용",
    price: 5000,
    originalPrice: 8000,
    image: "/placeholder-product.jpg",
    rating: 4.4,
    reviewCount: 890,
    badge: "할인",
    category: "계절",
  },
  {
    id: 10,
    name: "트래블 파우치 세트 여행용 정리백",
    price: 3000,
    image: "/placeholder-product.jpg",
    rating: 4.5,
    reviewCount: 567,
    category: "수납",
  },
  {
    id: 11,
    name: "천원마켓 마스킹 테이프 세트 데코",
    price: 1000,
    image: "/placeholder-product.jpg",
    rating: 4.9,
    reviewCount: 3210,
    badge: "BEST",
    category: "문구",
  },
  {
    id: 12,
    name: "스프레이 물병 공병 화장품 용기",
    price: 1000,
    image: "/placeholder-product.jpg",
    rating: 4.2,
    reviewCount: 789,
    category: "뷰티",
  },
];

export const PROMOS: PromoItem[] = [
  {
    id: 1,
    title: "봄맞이 대청소 기획전",
    subtitle: "청소용품 모음전 최대 40% 할인",
    period: "2026.02.01 ~ 2026.02.28",
    image: "/placeholder-promo.jpg",
  },
  {
    id: 2,
    title: "새학기 문구 페스타",
    subtitle: "학용품 특가 모음",
    period: "2026.02.10 ~ 2026.03.10",
    image: "/placeholder-promo.jpg",
  },
  {
    id: 3,
    title: "주방 리뉴얼 기획전",
    subtitle: "주방용품 신상 런칭",
    period: "2026.02.01 ~ 2026.02.28",
    image: "/placeholder-promo.jpg",
  },
  {
    id: 4,
    title: "뷰티 베스트 모음전",
    subtitle: "인기 뷰티 아이템 추천",
    period: "2026.01.15 ~ 2026.02.28",
    image: "/placeholder-promo.jpg",
  },
];

export const QUICK_SHORTCUTS = [
  { id: 1, name: "매장픽업", icon: "Store" },
  { id: 2, name: "오늘배송", icon: "Truck" },
  { id: 3, name: "대량주문", icon: "Package" },
  { id: 4, name: "이벤트", icon: "Gift" },
  { id: 5, name: "쿠폰", icon: "Ticket" },
  { id: 6, name: "신상품", icon: "Sparkles" },
  { id: 7, name: "랭킹", icon: "TrendingUp" },
  { id: 8, name: "기획전", icon: "LayoutGrid" },
];

export const RANKING_CATEGORIES = [
  "주방",
  "수납",
  "청소",
  "문구",
  "뷰티",
  "인테리어",
  "생활",
  "계절",
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: "봄맞이 신상품 출시",
    subtitle: "천원마켓에서 만나는 합리적인 가격의 새로운 상품",
    bgColor: "bg-secondary",
  },
  {
    id: 2,
    title: "매장픽업 서비스 오픈",
    subtitle: "온라인 주문 후 가까운 매장에서 픽업하세요",
    bgColor: "bg-accent",
  },
  {
    id: 3,
    title: "새학기 준비 기획전",
    subtitle: "문구류부터 수납용품까지 한 번에",
    bgColor: "bg-secondary",
  },
];

export const NAV_ITEMS = [
  { label: "홈", href: "/" },
  { label: "신상", href: "#" },
  { label: "기획전", href: "/exhCtgr/C208/CTGR_00013/CTGR_00100" },
  { label: "랭킹", href: "#" },
  { label: "뷰티", href: "#" },
  { label: "주방", href: "#" },
  { label: "수납/정리", href: "#" },
];

export const MEGA_MENU_CATEGORIES = [
  {
    title: "주방용품",
    items: [
      "냄비/프라이팬",
      "주방수납",
      "조리도구",
      "식기/컵",
      "보관용기",
      "행주/수세미",
    ],
  },
  {
    title: "수납/정리",
    items: [
      "수납박스",
      "서랍정리",
      "옷걸이/행거",
      "바구니",
      "다용도수납",
      "공간활용",
    ],
  },
  {
    title: "청소용품",
    items: ["청소도구", "세제/세정", "걸레/청소포", "쓰레기봉투", "빗자루/쓰레받기"],
  },
  {
    title: "문구/사무",
    items: ["필기류", "노트/메모", "파일/폴더", "학용품", "테이프/접착", "사무용품"],
  },
  {
    title: "뷰티/헬스",
    items: [
      "스킨케어",
      "메이크업",
      "바디케어",
      "헤어케어",
      "네일",
      "뷰티소품",
    ],
  },
  {
    title: "인테리어",
    items: [
      "조명",
      "디퓨저/캔들",
      "액자/포스터",
      "쿠션/패브릭",
      "화분/조화",
      "인테리어소품",
    ],
  },
];

export const FILTER_SUBCATEGORIES = [
  { id: "all", label: "전체", count: 156 },
  { id: "kitchen", label: "주방용품", count: 42 },
  { id: "storage", label: "수납/정리", count: 38 },
  { id: "cleaning", label: "청소용품", count: 25 },
  { id: "stationery", label: "문구/사무", count: 31 },
  { id: "beauty", label: "뷰티/헬스", count: 20 },
];

export const POPULAR_SEARCHES = [
  "텀블러",
  "수납박스",
  "청소포",
  "마스킹테이프",
  "무드등",
  "핸드크림",
  "빨래건조대",
  "가습기",
  "주방장갑",
  "형광펜",
];
