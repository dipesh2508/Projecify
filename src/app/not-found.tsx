"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"
import MotionDiv from "@/components/animations/MotionDiv"

export default function NotFound() {
  return (
    <main className="relative min-h-screen">
      {/* Background effects - matching dashboard style */}
      <div className="fixed inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-grid" />
      <div className="fixed inset-0 bg-gradient-to-b from-white via-white/90 to-white dark:from-black dark:via-black/90 dark:to-black" />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center px-4"
        >
          {/* Gradient number */}
          <h1 className="text-[150px] font-bold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
            404
          </h1>

          {/* Content */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="outline"
              className="gap-2"
            >
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Link>
            </Button>
            <Button
              asChild
              className="gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500"
            >
              <Link href="/dashboard">
                <Home className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </MotionDiv>
      </div>
    </main>
  )
}