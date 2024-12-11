"use client"

import { cn } from "@/lib/utils"

export default function Loader({ className }: { className?: string }) {
  
  return (
    <div className={cn(
      "fixed inset-0 flex items-center justify-center",
      "bg-white dark:bg-black",
      className
    )}>
      {/* Background effects */}
      <div className="fixed inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-grid" />
      <div className="fixed inset-0 bg-gradient-to-b from-white via-white/90 to-white dark:from-black dark:via-black/90 dark:to-black" />
      
      {/* Loader content */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 blur-xl opacity-50">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-primary-500 to-secondary-500" />
        </div>

        {/* Spinner */}
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16">
            <svg
              className="animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </div>

        {/* Loading text */}
        <div className="mt-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-black px-4 text-sm text-gray-500 dark:text-gray-400">
                Loading...
              </span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Please wait while we load your page
          </p>
        </div>
      </div>
    </div>
  )
}