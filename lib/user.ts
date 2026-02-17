/**
 * 사용자 ID 관리 유틸리티
 * Auth0 로그인 시 user.sub를 사용하고, 비로그인 시 임시 ID를 생성
 */

const USER_ID_KEY = 'chunwon_user_id';
const AUTH_USER_ID_KEY = 'chunwon_auth_user_id';

/**
 * Auth0 사용자 ID 설정 (로그인 시 호출)
 */
export function setAuthUserId(sub: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_USER_ID_KEY, sub);
}

/**
 * Auth0 사용자 ID 삭제 (로그아웃 시 호출)
 */
export function clearAuthUserId(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_USER_ID_KEY);
}

/**
 * 사용자 ID 가져오기
 * Auth0 로그인 상태이면 auth user ID, 아니면 임시 ID 반환
 */
export function getUserId(): string {
  if (typeof window === 'undefined') {
    return 'guest'; // SSR 환경
  }

  // Auth0 로그인 사용자 ID 우선
  const authUserId = localStorage.getItem(AUTH_USER_ID_KEY);
  if (authUserId) {
    return authUserId;
  }

  // 비로그인 시 임시 사용자 ID
  let userId = localStorage.getItem(USER_ID_KEY);

  if (!userId) {
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
