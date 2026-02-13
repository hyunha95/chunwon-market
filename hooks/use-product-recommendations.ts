import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPersonalizedRecommendations,
  getProductBasedRecommendations,
  getSimilarProducts,
  recordInteraction,
  getProduct,
  getProducts,
  ProductRecommendation,
  UserInteraction,
  Product,
} from '@/lib/api/product-api';

// Query Keys
export const productKeys = {
  all: ['products'] as const,
  detail: (productId: number) => [...productKeys.all, 'detail', productId] as const,
  batch: (productIds: number[]) => [...productKeys.all, 'batch', productIds] as const,
  recommendations: () => [...productKeys.all, 'recommendations'] as const,
  personalized: (userId: string, limit?: number) =>
    [...productKeys.recommendations(), 'personalized', userId, limit] as const,
  productBased: (productId: number, limit?: number) =>
    [...productKeys.recommendations(), 'product-based', productId, limit] as const,
  similar: (productId: number, limit?: number) =>
    [...productKeys.recommendations(), 'similar', productId, limit] as const,
};

/**
 * 사용자 맞춤 상품 추천 조회 훅
 */
export function usePersonalizedRecommendations(
  userId: string,
  limit: number = 10,
  options?: {
    enabled?: boolean;
  }
) {
  return useQuery<ProductRecommendation[], Error>({
    queryKey: productKeys.personalized(userId, limit),
    queryFn: () => getPersonalizedRecommendations(userId, limit),
    enabled: options?.enabled !== false && !!userId,
  });
}

/**
 * 상품 기반 추천 조회 훅
 */
export function useProductBasedRecommendations(
  productId: number,
  limit: number = 10,
  options?: {
    enabled?: boolean;
  }
) {
  return useQuery<ProductRecommendation[], Error>({
    queryKey: productKeys.productBased(productId, limit),
    queryFn: () => getProductBasedRecommendations(productId, limit),
    enabled: options?.enabled !== false && !!productId,
  });
}

/**
 * 유사 상품 추천 조회 훅 (함께 보면 좋은 상품)
 */
export function useSimilarProducts(
  productId: number,
  limit: number = 6,
  options?: {
    enabled?: boolean;
  }
) {
  return useQuery<ProductRecommendation[], Error>({
    queryKey: productKeys.similar(productId, limit),
    queryFn: () => getSimilarProducts(productId, limit),
    enabled: options?.enabled !== false && !!productId,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
}

/**
 * 상품 상세 정보 조회 훅
 */
export function useProduct(
  productId: number,
  options?: {
    enabled?: boolean;
  }
) {
  return useQuery<Product, Error>({
    queryKey: productKeys.detail(productId),
    queryFn: () => getProduct(productId),
    enabled: options?.enabled !== false && !!productId,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
}

/**
 * 여러 상품 정보 일괄 조회 훅
 */
export function useProducts(
  productIds: number[],
  options?: {
    enabled?: boolean;
  }
) {
  return useQuery<Product[], Error>({
    queryKey: productKeys.batch(productIds),
    queryFn: () => getProducts(productIds),
    enabled: options?.enabled !== false && productIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
}

/**
 * 개인화 추천 + 상품 상세 정보 통합 조회 훅
 * 백엔드 응답에 상품 정보가 포함되어 있으므로 별도 조회 없이 변환만 수행
 */
export function usePersonalizedRecommendationsWithDetails(
  userId: string,
  limit: number = 10
) {
  const recommendationsQuery = usePersonalizedRecommendations(userId, limit);

  // ProductRecommendation을 Product 형식으로 변환
  const products: Product[] | undefined = recommendationsQuery.data?.map((rec) => ({
    id: rec.productId,
    name: rec.name,
    price: rec.price,
    image: rec.imageUrl,
    category: rec.categoryId,
    rating: 0, // TODO: 리뷰 정보 추가 시 백엔드에서 포함
    reviewCount: 0, // TODO: 리뷰 정보 추가 시 백엔드에서 포함
  }));

  return {
    recommendations: recommendationsQuery.data,
    products,
    isLoading: recommendationsQuery.isLoading,
    error: recommendationsQuery.error,
  };
}

/**
 * 추천 상품 + 상품 상세 정보 통합 조회 훅
 * 백엔드 응답에 상품 정보가 포함되어 있으므로 별도 조회 없이 변환만 수행
 */
export function useProductBasedRecommendationsWithDetails(
  productId: number,
  limit: number = 6
) {
  const recommendationsQuery = useProductBasedRecommendations(productId, limit);

  // ProductRecommendation을 Product 형식으로 변환
  const products: Product[] | undefined = recommendationsQuery.data?.map((rec) => ({
    id: rec.productId,
    name: rec.name,
    price: rec.price,
    image: rec.imageUrl,
    category: rec.categoryId,
    rating: 0, // TODO: 리뷰 정보 추가 시 백엔드에서 포함
    reviewCount: 0, // TODO: 리뷰 정보 추가 시 백엔드에서 포함
  }));

  return {
    recommendations: recommendationsQuery.data,
    products,
    isLoading: recommendationsQuery.isLoading,
    error: recommendationsQuery.error,
  };
}

/**
 * 유사 상품 추천 + 상품 상세 정보 통합 조회 훅
 * 백엔드 응답에 상품 정보가 포함되어 있으므로 별도 조회 없이 변환만 수행
 */
export function useSimilarProductsWithDetails(
  productId: number,
  limit: number = 6
) {
  const recommendationsQuery = useSimilarProducts(productId, limit);

  // ProductRecommendation을 Product 형식으로 변환
  const products: Product[] | undefined = recommendationsQuery.data?.map((rec) => ({
    id: rec.productId,
    name: rec.name,
    price: rec.price,
    image: rec.imageUrl,
    category: rec.categoryId,
    rating: 0, // TODO: 리뷰 정보 추가 시 백엔드에서 포함
    reviewCount: 0, // TODO: 리뷰 정보 추가 시 백엔드에서 포함
  }));

  return {
    recommendations: recommendationsQuery.data,
    products,
    isLoading: recommendationsQuery.isLoading,
    error: recommendationsQuery.error,
  };
}

/**
 * 사용자 상호작용 기록 훅
 */
export function useRecordInteraction() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UserInteraction>({
    mutationFn: recordInteraction,
    onSuccess: (_, variables) => {
      // 상호작용 기록 후 관련 추천 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: productKeys.personalized(variables.userId),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.productBased(variables.productId),
      });
    },
  });
}
