"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import LoginForm from "@/components/shared/forms/LoginForm"
import MotionDiv from "@/components/animations/MotionDiv"
import MotionH1 from "@/components/animations/MotionH1"
import MotionP from "@/components/animations/MotionP"
import { AuthPageWrapper } from "@/components/wrappers/AuthPageWrappers"

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <main className="relative min-h-screen bg-black">
      {/* Animated grid background */}
      <MotionDiv 
        className="fixed inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 w-full h-full bg-grid-white/[0.05] bg-grid" />
      </MotionDiv>
      
      <AuthPageWrapper>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-3xl blur-xl" />
        
        {/* Card */}
        <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-800">
            <div className="text-center mb-8">
              <MotionH1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl font-bold text-white mb-2"
              >
                Welcome Back
              </MotionH1>
              <MotionP 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-400"
              >
                Sign in to continue to your dashboard
              </MotionP>
            </div>

          <LoginForm />
        </div>
      </AuthPageWrapper>
    </main>
  )
}
