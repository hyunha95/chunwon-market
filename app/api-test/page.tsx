'use client';

import { useState } from 'react';
import {
  usePersonalizedRecommendations,
  useProductBasedRecommendations,
  useRecordInteraction,
} from '@/hooks/use-product-recommendations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ApiTestPage() {
  const [userId, setUserId] = useState('user1');
  const [productId, setProductId] = useState('1');
  const [interactionStatus, setInteractionStatus] = useState<string>('');

  // React Query 훅 사용
  const {
    data: personalizedRecs = [],
    isLoading: isLoadingPersonalized,
    error: personalizedError,
    refetch: refetchPersonalized,
  } = usePersonalizedRecommendations(userId, 5);

  const {
    data: productRecs = [],
    isLoading: isLoadingProductBased,
    error: productBasedError,
    refetch: refetchProductBased,
  } = useProductBasedRecommendations(parseInt(productId), 5, {
    enabled: false, // 수동으로 트리거
  });

  const recordInteractionMutation = useRecordInteraction();

  const handleRecordInteraction = (type: 'VIEW' | 'CART' | 'PURCHASE' | 'LIKE') => {
    setInteractionStatus('');
    recordInteractionMutation.mutate(
      {
        userId,
        productId: parseInt(productId),
        interactionType: type,
      },
      {
        onSuccess: () => {
          setInteractionStatus(`✓ ${type} 상호작용 기록 성공`);
          setTimeout(() => setInteractionStatus(''), 3000);
        },
        onError: (error: any) => {
          setInteractionStatus(`✗ 실패: ${error.message}`);
        },
      }
    );
  };

  const isLoading = isLoadingPersonalized || isLoadingProductBased;
  const error = personalizedError || productBasedError;

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">🧪 Microservices API 테스트</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 사용자 맞춤 추천 */}
        <Card>
          <CardHeader>
            <CardTitle>👤 사용자 맞춤 추천</CardTitle>
            <CardDescription>API Gateway → Product Service</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="userId">사용자 ID</Label>
              <Input
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="user1"
              />
            </div>
            <Button
              onClick={() => refetchPersonalized()}
              disabled={isLoadingPersonalized}
              className="w-full"
            >
              {isLoadingPersonalized ? '로딩 중...' : '추천 조회'}
            </Button>

            {personalizedRecs.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">추천 결과:</h4>
                {personalizedRecs.map((rec, idx) => (
                  <div key={idx} className="text-sm p-2 bg-gray-50 rounded">
                    <div>상품 ID: <strong>{rec.productId}</strong></div>
                    <div>점수: {rec.score.toFixed(2)}</div>
                    <div className="text-gray-600">{rec.reason}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 상품 기반 추천 */}
        <Card>
          <CardHeader>
            <CardTitle>🛍️ 상품 기반 추천</CardTitle>
            <CardDescription>유사 상품 추천</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="productId">상품 ID</Label>
              <Input
                id="productId"
                type="number"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="1"
              />
            </div>
            <Button
              onClick={() => refetchProductBased()}
              disabled={isLoadingProductBased}
              className="w-full"
            >
              {isLoadingProductBased ? '로딩 중...' : '유사 상품 조회'}
            </Button>

            {productRecs.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">추천 결과:</h4>
                {productRecs.map((rec, idx) => (
                  <div key={idx} className="text-sm p-2 bg-gray-50 rounded">
                    <div>상품 ID: <strong>{rec.productId}</strong></div>
                    <div>점수: {rec.score.toFixed(2)}</div>
                    <div className="text-gray-600">{rec.reason}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 상호작용 기록 */}
      <Card>
        <CardHeader>
          <CardTitle>📊 사용자 상호작용 기록</CardTitle>
          <CardDescription>상품 ID: {productId}, 사용자 ID: {userId}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button onClick={() => handleRecordInteraction('VIEW')} variant="outline">
              👁️ 조회
            </Button>
            <Button onClick={() => handleRecordInteraction('CART')} variant="outline">
              🛒 장바구니
            </Button>
            <Button onClick={() => handleRecordInteraction('PURCHASE')} variant="outline">
              💳 구매
            </Button>
            <Button onClick={() => handleRecordInteraction('LIKE')} variant="outline">
              ❤️ 좋아요
            </Button>
          </div>
          {interactionStatus && (
            <div className="mt-4 text-sm font-medium">{interactionStatus}</div>
          )}
        </CardContent>
      </Card>

      {/* API 엔드포인트 정보 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>🔌 API 엔드포인트</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm font-mono">
            <div>Base URL: <strong>{process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}</strong></div>
            <div>개인화 추천: <code>GET /api/recommendations/personalized?userId=user1&limit=5</code></div>
            <div>상품 기반 추천: <code>GET /api/recommendations/product-based?productId=1&limit=5</code></div>
            <div>상호작용 기록: <code>POST /api/interactions</code></div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="font-semibold text-green-800 mb-2">✅ 마이크로서비스 아키텍처</h3>
          <div className="text-sm text-green-700 space-y-1">
            <div>1. chunwon-market (Frontend) → API Gateway (8080)</div>
            <div>2. API Gateway → Eureka Server (8761) → Product Service (9090)</div>
            <div>3. 모든 요청이 API Gateway를 통해 라우팅됩니다</div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">⚡ React Query 기능</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <div>• 자동 캐싱 (1분 staleTime, 5분 gcTime)</div>
            <div>• 중복 요청 제거 (자동 데이터 공유)</div>
            <div>• 백그라운드 재검증</div>
            <div>• React Query Devtools 사용 가능</div>
          </div>
        </div>
      </div>
    </div>
  );
}
