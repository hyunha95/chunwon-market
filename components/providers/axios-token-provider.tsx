"use client"

import { useEffect, useRef } from "react"
import { useUser } from "@/components/providers/user-provider"
import apiClient from "@/lib/api-client"
import { setAuthUserId, clearAuthUserId } from "@/lib/user"

let cachedToken: string | null = null
let tokenExpiresAt = 0

async function getAccessToken(): Promise<string | null> {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken
  }

  try {
    const res = await fetch("/auth/access-token")
    if (!res.ok) return null

    const data = await res.json()
    cachedToken = data.token
    tokenExpiresAt = data.expires_at
      ? data.expires_at * 1000 - 60_000
      : Date.now() + 3600_000

    return cachedToken
  } catch {
    return null
  }
}

export function AxiosTokenProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  const interceptorId = useRef<number | null>(null)

  // Auth0 사용자 ID를 localStorage에 동기화
  useEffect(() => {
    if (user?.sub) {
      setAuthUserId(user.sub)
    } else {
      clearAuthUserId()
    }
  }, [user?.sub])

  // 로그인 상태일 때만 토큰 인터셉터 등록
  useEffect(() => {
    if (user) {
      interceptorId.current = apiClient.interceptors.request.use(async (config) => {
        const token = await getAccessToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      })
    }

    return () => {
      if (interceptorId.current !== null) {
        apiClient.interceptors.request.eject(interceptorId.current)
        interceptorId.current = null
      }
      cachedToken = null
      tokenExpiresAt = 0
    }
  }, [user])

  return <>{children}</>
}
