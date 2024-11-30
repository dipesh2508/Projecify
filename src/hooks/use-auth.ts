import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useAuth(requireAuth?: boolean) {
  const { data: session, status } = useSession()
  const router = useRouter()

  const isLoading = status === "loading"
  const isAuthenticated = !!session

  // If authentication is required and user is not authenticated
  if (requireAuth && !isLoading && !isAuthenticated) {
    router.push("/login")
  }

  return {
    session,
    status,
    isLoading,
    isAuthenticated,
  }
} 