import apiClient from '../api-client';

export interface ProductRecommendation {
  productId: number;
  score: number;
  reason: string;
  // 상품 정보 (백엔드에서 함께 응답)
  name: string;
  imageUrl: string;
  price: number;
  categoryId: string;
}

export interface UserInteraction {
  userId: string;
  productId: number;
  interactionType: 'VIEW' | 'CART' | 'PURCHASE' | 'LIKE';
}

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

/**
 * 상품 상세 정보 조회
 */
export const getProduct = async (productId: number): Promise<Product> => {
  const response = await apiClient.get(`/api/products/${productId}`);
  return response.data;
};

/**
 * 여러 상품 정보 일괄 조회
 */
export const getProducts = async (productIds: number[]): Promise<Product[]> => {
  const response = await apiClient.post('/api/products/batch', { productIds });
  return response.data;
};

/**
 * 사용자 맞춤 상품 추천 조회
 */
export const getPersonalizedRecommendations = async (
  userId: string,
  limit: number = 10
): Promise<ProductRecommendation[]> => {
  const response = await apiClient.get('/api/recommendations/personalized', {
    params: { userId, limit },
  });
  return response.data;
};

/**
 * 상품 기반 추천 조회 (유사 상품)
 * 백엔드 엔드포인트: GET /api/recommendations/similar/{productId}
 */
export const getProductBasedRecommendations = async (
  productId: number,
  limit: number = 10
): Promise<ProductRecommendation[]> => {
  const response = await apiClient.get(`/api/recommendations/similar/${productId}`, {
    params: { limit },
  });
  return response.data;
};

/**
 * 유사 상품 추천 조회 (함께 보면 좋은 상품)
 * 백엔드 엔드포인트: GET /api/recommendations/similar/{productId}
 */
export const getSimilarProducts = async (
  productId: number,
  limit: number = 6
): Promise<ProductRecommendation[]> => {
  const response = await apiClient.get(`/api/recommendations/similar/${productId}`, {
    params: { limit },
  });
  return response.data;
};

/**
 * 사용자 상호작용 기록
 */
export const recordInteraction = async (
  interaction: UserInteraction
): Promise<void> => {
  await apiClient.post('/api/interactions', interaction);
};
