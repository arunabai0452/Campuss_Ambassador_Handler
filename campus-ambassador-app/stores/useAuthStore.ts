import { fetchAuthSession } from "aws-amplify/auth"
import { create } from "zustand"

import { handleSignOut } from "../lib/authHandlers"

interface AuthState {
  accessToken: string | undefined
  userId: string | undefined
  email: string | undefined
  instagramCode: string | undefined
  isLoggedIn: boolean
  setAccessToken: (accessToken: string | undefined) => void
  setUserId: (value: string) => void
  setEmail: (email: string) => void
  setInstagramCode: (value: string) => void
  setLoggedIn: (authorized: boolean) => void
  refreshToken: () => Promise<void>
  checkTokenExpiry: () => () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: undefined,
  userId: undefined,
  email: undefined,
  instagramCode: undefined,
  isLoggedIn: false,
  setAccessToken: (accessToken) => set({ accessToken: accessToken }),
  setUserId: (value) => set({ userId: value }),
  setEmail: (email) => set({ email: email }),
  setInstagramCode: (value) => set({ instagramCode: value }),
  setLoggedIn: (authorized) => set({ isLoggedIn: authorized }),
  refreshToken: async () => {
    try {
      const session = await fetchAuthSession({ forceRefresh: true })
      const newAccessToken = session.tokens?.accessToken.toString()
      set({ accessToken: newAccessToken })
    } catch (error) {
      await handleSignOut()
      console.error("Failed to refresh token", error)
    }
  },
  checkTokenExpiry: () => {
    const interval = setInterval(async () => {
      const session = await fetchAuthSession()
      const currentTime = Math.floor(Date.now() / 1000)
      const tokenExpiry = session.tokens?.accessToken?.payload?.exp

      if (tokenExpiry && tokenExpiry - currentTime < 300) {
        await useAuthStore.getState().refreshToken()
      }
    }, 60000)

    return () => clearInterval(interval)
  },
}))
