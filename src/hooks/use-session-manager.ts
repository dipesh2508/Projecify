"use client"

import { signOut as nextAuthSignOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useSessionManager() {
  const router = useRouter()

  const signOut = async () => {
    try {
      // First sign out from NextAuth which will trigger the signOut event
      await nextAuthSignOut({
        callbackUrl: "/login",
        redirect: false
      })
      
      // Then delete session from database
      await fetch('/api/auth/session', {
        method: 'DELETE',
      })
      
      router.push("/login")
    } catch (error) {
      console.error("Error during sign out:", error)
    }
  }

  return {
    signOut,
  }
} 