/**
 * 사용자 ID 관리 유틸리티
 * 실제로는 인증 시스템에서 가져와야 하지만, 현재는 localStorage 사용
 */

const USER_ID_KEY = 'chunwon_user_id';

/**
 * 사용자 ID 가져오기 (없으면 생성)
 */
export function getUserId(): string {
  if (typeof window === 'undefined') {
    return 'guest'; // SSR 환경
  }

  let userId = localStorage.getItem(USER_ID_KEY);

  if (!userId) {
    // 임시 사용자 ID 생성 (예: user_1234567890)
    userId = `user_${Date.now()}`;
    localStorage.setItem(USER_ID_KEY, userId);
  }

  return userId;
}

/**
 * 사용자 ID 설정
 */
export function setUserId(userId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_ID_KEY, userId);
}

/**
 * 사용자 ID 초기화
 */
export function clearUserId(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_ID_KEY);
}
