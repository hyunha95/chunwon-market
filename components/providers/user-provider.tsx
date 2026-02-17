"use client"

import React, { createContext, useContext } from "react"

interface UserContextValue {
  user: Record<string, unknown> | null
  isLoading: boolean
}

const UserContext = createContext<UserContextValue>({
  user: null,
  isLoading: false,
})

export function UserProvider({
  user,
  children,
}: {
  user: Record<string, unknown> | null
  children: React.ReactNode
}) {
  return (
    <UserContext.Provider value={{ user, isLoading: false }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
