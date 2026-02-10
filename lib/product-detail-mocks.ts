/* ------------------------------------------------------------------ */
/*  Product Detail Page – mock data                                    */
/* ------------------------------------------------------------------ */

export interface ProductDetail {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  pointRate: string;
  pointText: string;
  rating: number;
  reviewCount: number;
  category: string[];
  badges: string[];
  images: string[];
  sku: string;
  deliveryInfo: {
    method: string;
    estimatedDate: string;
    fee: string;
    freeThreshold: string;
  };
  pickupInfo: {
    available: boolean;
    message: string;
  };
  description: string[];
  specifications: { label: string; value: string }[];
  starDistribution: number[]; // [1star, 2star, 3star, 4star, 5star]
}

export interface ReviewItem {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  hasPhoto: boolean;
  helpfulCount: number;
  purchaseOption?: string;
}

export interface SatisfactionItem {
  label: string;
  percent: number;
  emoji: string;
}

/* ------------------------------------------------------------------ */
/*  Product                                                            */
/* ------------------------------------------------------------------ */
export const PRODUCT_DETAIL: ProductDetail = {
  id: "1017947",
  name: "에끌라 깨끗한 물티슈 150매 (캡형)",
  price: 3000,
  originalPrice: 5000,
  pointRate: "0.1%",
  pointText: "최대 30P 적립",
  rating: 4.6,
  reviewCount: 12847,
  category: ["홈", "생활용품", "욕실/세탁", "물티슈/화장솜"],
  badges: ["BEST", "인기"],
  images: [
    "/placeholder-pdp-1.jpg",
    "/placeholder-pdp-2.jpg",
    "/placeholder-pdp-3.jpg",
    "/placeholder-pdp-4.jpg",
    "/placeholder-pdp-5.jpg",
    "/placeholder-pdp-6.jpg",
  ],
  sku: "8809123456789",
  deliveryInfo: {
    method: "택배배송",
    estimatedDate: "2/12(수) 도착 예정",
    fee: "3,000원",
    freeThreshold: "30,000원 이상 무료배송",
  },
  pickupInfo: {
    available: true,
    message: "로그인 후 매장 재고를 확인하세요",
  },
  description: [
    "넉넉한 150매로 온 가족이 사용하기 좋습니다.",
    "피부 자극 테스트 완료, 민감한 피부에도 안심 사용 가능합니다.",
    "캡형 디자인으로 건조 방지 효과가 뛰어납니다.",
    "순수 정제수 99.9% 사용, 무향 무파라벤 처방입니다.",
    "외출 시 가방에 넣어 간편하게 휴대 가능합니다.",
    "아이들 손과 얼굴 닦기에 적합합니다.",
  ],
  specifications: [
    { label: "품번", value: "8809123456789" },
    { label: "상품명", value: "에끌라 깨끗한 물티슈 150매 (캡형)" },
    { label: "원산지", value: "대한민국" },
    { label: "재질", value: "폴리에스터, 레이온" },
    { label: "규격", value: "200mm x 150mm" },
    { label: "매수", value: "150매" },
    { label: "제조사", value: "(주)에끌라코스메틱" },
    { label: "소비자상담전화", value: "1599-2211" },
    { label: "주의사항", value: "직사광선을 피해 서늘한 곳에 보관하세요." },
  ],
  starDistribution: [128, 256, 897, 3845, 7721], // 1~5 star counts
};

/* ------------------------------------------------------------------ */
/*  Satisfaction                                                       */
/* ------------------------------------------------------------------ */
export const SATISFACTION_DATA: SatisfactionItem[] = [
  { label: "품질", percent: 92, emoji: "S" },
  { label: "가성비", percent: 96, emoji: "S" },
  { label: "디자인", percent: 78, emoji: "A" },
];

/* ------------------------------------------------------------------ */
/*  Reviews                                                            */
/* ------------------------------------------------------------------ */
export const REVIEWS: ReviewItem[] = [
  {
    id: 1,
    author: "행복한***",
    rating: 5,
    date: "2026.02.08",
    content:
      "물티슈 두께가 적당하고 물기도 촉촉해서 아이 손발 닦을 때 정말 좋아요. 캡형이라 마르지 않고 오래 쓸 수 있습니다. 가격 대비 매수도 넉넉해서 재구매 의사 100%입니다!",
    hasPhoto: true,
    helpfulCount: 48,
    purchaseOption: "단품",
  },
  {
    id: 2,
    author: "깔끔한***",
    rating: 5,
    date: "2026.02.07",
    content:
      "이 가격에 150매라니 가성비가 정말 좋습니다. 냄새도 없고 아이 피부에 사용해도 트러블이 없어서 안심이에요.",
    hasPhoto: false,
    helpfulCount: 32,
    purchaseOption: "3개 세트",
  },
  {
    id: 3,
    author: "알뜰한***",
    rating: 4,
    date: "2026.02.06",
    content:
      "전체적으로 만족합니다. 다만 물기가 조금 더 많았으면 좋겠어요. 그래도 이 가격에 이 정도면 충분히 훌륭합니다. 주변에도 추천하고 있어요.",
    hasPhoto: true,
    helpfulCount: 21,
    purchaseOption: "단품",
  },
  {
    id: 4,
    author: "천원마켓***",
    rating: 5,
    date: "2026.02.05",
    content:
      "천원마켓 물티슈 중 제일 좋아하는 제품이에요! 캡이 있어서 보관이 편하고, 화장대 옆에 항상 두고 씁니다.",
    hasPhoto: false,
    helpfulCount: 15,
    purchaseOption: "단품",
  },
  {
    id: 5,
    author: "살림의***",
    rating: 3,
    date: "2026.02.04",
    content:
      "보통이에요. 크기가 조금 작은 편이라 어른이 쓰기엔 아쉽지만, 가격을 생각하면 나쁘지 않습니다.",
    hasPhoto: false,
    helpfulCount: 8,
    purchaseOption: "단품",
  },
  {
    id: 6,
    author: "육아맘***",
    rating: 5,
    date: "2026.02.03",
    content:
      "아기 기저귀 갈 때 항상 사용하고 있어요. 부드럽고 자극 없어서 좋습니다. 매번 천원마켓에서 대량으로 사옵니다.",
    hasPhoto: true,
    helpfulCount: 56,
    purchaseOption: "3개 세트",
  },
  {
    id: 7,
    author: "꼼꼼한***",
    rating: 4,
    date: "2026.02.02",
    content:
      "집안 곳곳에 물티슈를 놔두고 쓰는 편인데, 이 제품이 가성비가 제일 좋아요. 물기 유지력은 중간 정도입니다.",
    hasPhoto: false,
    helpfulCount: 12,
    purchaseOption: "단품",
  },
  {
    id: 8,
    author: "실용파***",
    rating: 5,
    date: "2026.02.01",
    content:
      "사무실에서도 쓰고 집에서도 쓰고. 만능 물티슈입니다. 향이 없어서 음식 먹고 나서 손 닦기에도 좋아요.",
    hasPhoto: true,
    helpfulCount: 29,
    purchaseOption: "단품",
  },
  {
    id: 9,
    author: "절약왕***",
    rating: 5,
    date: "2026.01.31",
    content:
      "천원마켓 물티슈 여러 종류 써봤는데 이게 제일 낫습니다. 두껍고 크기도 적당해요. 항상 3개씩 삽니다.",
    hasPhoto: false,
    helpfulCount: 19,
    purchaseOption: "3개 세트",
  },
  {
    id: 10,
    author: "정리정***",
    rating: 4,
    date: "2026.01.30",
    content:
      "책상 위 먼지 닦을 때 딱 좋아요. 얇지도 두껍지도 않은 적당한 두께. 캡이 꽉 닫혀서 마르는 걱정 없습니다.",
    hasPhoto: true,
    helpfulCount: 14,
    purchaseOption: "단품",
  },
  {
    id: 11,
    author: "깨끗이***",
    rating: 2,
    date: "2026.01.29",
    content:
      "물기가 좀 부족하다고 느꼈어요. 이전에 샀던 것보다 마른 느낌이 나서 아쉽습니다.",
    hasPhoto: false,
    helpfulCount: 5,
    purchaseOption: "단품",
  },
  {
    id: 12,
    author: "알뜰살***",
    rating: 5,
    date: "2026.01.28",
    content:
      "천원짜리 물티슈인데 이 정도면 대만족이에요! 아이 간식 먹고 닦아줄 때 편하고, 무향이라 안심됩니다.",
    hasPhoto: true,
    helpfulCount: 42,
    purchaseOption: "단품",
  },
];

/* ------------------------------------------------------------------ */
/*  Payment Benefits                                                   */
/* ------------------------------------------------------------------ */
export const PAYMENT_BENEFITS = [
  { label: "토스페이", desc: "첫 결제 시 2,000원 할인" },
  { label: "퀵계좌이체", desc: "1,000원 즉시 할인" },
  { label: "KB카드", desc: "5% 청구할인 (최대 3만원)" },
  { label: "삼성카드", desc: "무이자 2~6개월" },
  { label: "현대카드", desc: "M포인트 사용 가능" },
];

/* ------------------------------------------------------------------ */
/*  Related Products                                                   */
/* ------------------------------------------------------------------ */
export const RELATED_PRODUCTS = [
  {
    id: 101,
    name: "에끌라 순한 물티슈 100매 (캡형)",
    price: 2000,
    image: "/placeholder-product.jpg",
    rating: 4.4,
    reviewCount: 8921,
    badge: "인기" as const,
    category: "생활",
  },
  {
    id: 102,
    name: "다용도 물티슈 80매 캐릭터 에디션",
    price: 1000,
    image: "/placeholder-product.jpg",
    rating: 4.2,
    reviewCount: 3456,
    badge: "NEW" as const,
    category: "생활",
  },
  {
    id: 103,
    name: "유아 전용 물티슈 70매 무향 저자극",
    price: 3000,
    originalPrice: 5000,
    image: "/placeholder-product.jpg",
    rating: 4.8,
    reviewCount: 15230,
    badge: "BEST" as const,
    category: "생활",
  },
  {
    id: 104,
    name: "주방용 기름때 제거 물티슈 40매",
    price: 2000,
    image: "/placeholder-product.jpg",
    rating: 4.1,
    reviewCount: 2134,
    category: "주방",
  },
  {
    id: 105,
    name: "항균 물티슈 대용량 200매 리필형",
    price: 5000,
    image: "/placeholder-product.jpg",
    rating: 4.7,
    reviewCount: 6789,
    badge: "인기" as const,
    category: "생활",
  },
];
